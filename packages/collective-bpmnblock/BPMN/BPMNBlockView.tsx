import { useEffect, useRef, useState } from 'react';
import type { BlockViewProps } from '@plone/types';
import 'bpmn-js/dist/assets/bpmn-js.css';
import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';
import 'bpmn-js-token-simulation/assets/css/bpmn-js-token-simulation.css';
import './BPMNBlock.css';

type BPMNData = BlockViewProps['data'] & {
  xml?: string;
  enableTokenSimulation?: boolean;
  height?: string;
};

const FIT_PADDING = 20;

function ensureSimulationStyleVars(): void {
  if (typeof document === 'undefined') return;
  const defaults: Record<string, string> = {
    '--token-simulation-green-base-44': '#10D070',
    '--token-simulation-grey-base-40': '#666666',
    '--token-simulation-grey-darken-30': '#212121',
    '--token-simulation-grey-lighten-56': '#909090',
    '--token-simulation-red-base-62': '#FF3D3D',
    '--token-simulation-silver-base-97': '#F8F8F8',
    '--token-simulation-silver-darken-94': '#EFEFEF',
    '--token-simulation-white': '#FFFFFF',
  };
  const root = document.documentElement;
  const computed = getComputedStyle(root);
  for (const [name, value] of Object.entries(defaults)) {
    if (!computed.getPropertyValue(name).trim()) {
      root.style.setProperty(name, value);
    }
  }
}

function installTokenNumbering(viewer: any): void {
  const eventBus = viewer.get('eventBus', false);
  if (!eventBus) return;
  let nextTokenNumber = 1;

  eventBus.on(
    'tokenSimulation.simulator.createScope',
    ({ scope }: { scope: any }) => {
      if (!scope) return;
      if (scope.parent) {
        const parentNumber = scope.parent.tokenNumber;
        if (parentNumber != null) {
          scope.tokenNumber = parentNumber;
        }
      } else {
        scope.tokenNumber = nextTokenNumber++;
      }
    },
  );

  eventBus.on('tokenSimulation.resetSimulation', () => {
    nextTokenNumber = 1;
  });
}

function patchTokenNumberDisplay(
  AnimationClass: any,
  TokenCountClass: any,
): void {
  if (
    AnimationClass?.prototype &&
    !AnimationClass.prototype.__patchedTokenNumber
  ) {
    const originalGetTokenSVG = AnimationClass.prototype._getTokenSVG;
    AnimationClass.prototype._getTokenSVG = function (
      this: unknown,
      scope: { tokenNumber?: number },
    ): string {
      const svg = originalGetTokenSVG.call(this, scope);
      const tokenNumber = scope?.tokenNumber != null ? scope.tokenNumber : 1;
      return svg.replace(
        /(<text[^>]*class="[^"]*bts-text[^"]*"[^>]*>)\s*1\s*(<\/text>)/,
        `$1${tokenNumber}$2`,
      );
    };
    AnimationClass.prototype.__patchedTokenNumber = true;
  }

  if (
    TokenCountClass?.prototype &&
    !TokenCountClass.prototype.__patchedTokenNumber
  ) {
    const originalGetTokenHTML = TokenCountClass.prototype._getTokenHTML;
    TokenCountClass.prototype._getTokenHTML = function (
      this: unknown,
      element: unknown,
      scope: { tokenNumber?: number },
    ): string {
      const html = originalGetTokenHTML.call(this, element, scope);
      const tokenNumber = scope?.tokenNumber;
      if (tokenNumber != null) {
        return html.replace(
          /(<div[^>]*class="[^"]*bts-token-count[^"]*"[^>]*>)\s*[\d.]+\s*(<\/div>)/,
          `$1${tokenNumber}$2`,
        );
      }
      return html;
    };
    TokenCountClass.prototype.__patchedTokenNumber = true;
  }
}

function computeDiagramBounds(
  elementRegistry: any,
): { x: number; y: number; width: number; height: number } | null {
  if (!elementRegistry) return null;
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  const grow = (x: number, y: number): void => {
    if (x < minX) minX = x;
    if (y < minY) minY = y;
    if (x > maxX) maxX = x;
    if (y > maxY) maxY = y;
  };

  for (const el of elementRegistry.getAll()) {
    if (el.waypoints) {
      for (const wp of el.waypoints) {
        grow(wp.x, wp.y);
      }
    } else if (el.x != null && el.y != null && el.width && el.height) {
      grow(el.x, el.y);
      grow(el.x + el.width, el.y + el.height);
    }
  }

  if (!isFinite(minX)) return null;
  return { x: minX, y: minY, width: maxX - minX, height: maxY - minY };
}

function fitDiagram(viewer: any): void {
  try {
    const canvas = viewer.get('canvas');
    const bbox = computeDiagramBounds(viewer.get('elementRegistry'));
    if (!bbox || !bbox.width || !bbox.height) {
      canvas.zoom('fit-viewport');
      return;
    }

    const outer = canvas.getSize();
    if (!outer.width || !outer.height) {
      canvas.zoom('fit-viewport');
      return;
    }

    const paddedWidth = bbox.width + FIT_PADDING * 2;
    const paddedHeight = bbox.height + FIT_PADDING * 2;
    const scale = Math.min(
      outer.width / paddedWidth,
      outer.height / paddedHeight,
    );
    const viewWidth = outer.width / scale;
    const viewHeight = outer.height / scale;

    canvas.viewbox({
      x: bbox.x + bbox.width / 2 - viewWidth / 2,
      y: bbox.y + bbox.height / 2 - viewHeight / 2,
      width: viewWidth,
      height: viewHeight,
    });
  } catch {
    try {
      viewer.get('canvas')?.zoom('fit-viewport');
    } catch {
      // Ignore zoom errors if canvas is detached
    }
  }
}

const BPMNBlockView = ({ className, data }: BlockViewProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerInstanceRef = useRef<any>(null);
  const bpmnData = data as BPMNData;
  const [hasError, setHasError] = useState(false);
  const heightClass = bpmnData.height
    ? `height-${bpmnData.height}`
    : 'height-m';

  const handleFit = () => {
    if (viewerInstanceRef.current) {
      fitDiagram(viewerInstanceRef.current);
    }
  };

  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      !containerRef.current ||
      !bpmnData.xml
    ) {
      return;
    }

    let cancelled = false;
    let resizeObserver: ResizeObserver | null = null;

    setHasError(false);

    Promise.all([
      import('bpmn-js/lib/NavigatedViewer'),
      bpmnData.enableTokenSimulation
        ? import('bpmn-js-token-simulation/lib/viewer')
        : Promise.resolve(null),
      bpmnData.enableTokenSimulation
        ? import('bpmn-js-token-simulation/lib/animation/Animation')
        : Promise.resolve(null),
      bpmnData.enableTokenSimulation
        ? import('bpmn-js-token-simulation/lib/features/token-count/TokenCount')
        : Promise.resolve(null),
    ])
      .then(
        ([viewerModule, tokenSimModule, animationModule, tokenCountModule]) => {
          if (cancelled || !containerRef.current) return;

          if (animationModule && tokenCountModule) {
            const Animation = animationModule.default || animationModule;
            const TokenCount = tokenCountModule.default || tokenCountModule;
            patchTokenNumberDisplay(Animation, TokenCount);
          }

          const NavigatedViewer = viewerModule.default || viewerModule;
          const TokenSimulation = tokenSimModule?.default || tokenSimModule;

          const viewer = new (NavigatedViewer as any)({
            container: containerRef.current,
            additionalModules: TokenSimulation ? [TokenSimulation] : [],
          });
          viewerInstanceRef.current = viewer;

          if (bpmnData.enableTokenSimulation) {
            ensureSimulationStyleVars();
            installTokenNumbering(viewer);
          }

          return viewer.importXML(bpmnData.xml!).then(() => {
            if (cancelled) return;

            fitDiagram(viewer);

            // Auto-enable token simulation mode if token simulation is enabled
            if (bpmnData.enableTokenSimulation) {
              try {
                const toggleMode = viewer.get('toggleMode', false);
                if (toggleMode) {
                  toggleMode.toggleMode(true);
                } else {
                  const toggle =
                    containerRef.current?.querySelector<HTMLElement>(
                      '.bts-toggle-mode',
                    );
                  if (toggle) {
                    toggle.click();
                  }
                }
              } catch {
                const toggle =
                  containerRef.current?.querySelector<HTMLElement>(
                    '.bts-toggle-mode',
                  );
                if (toggle) {
                  toggle.click();
                }
              }
            }

            if (typeof ResizeObserver !== 'undefined' && containerRef.current) {
              resizeObserver = new ResizeObserver(() => {
                if (!cancelled && viewerInstanceRef.current) {
                  fitDiagram(viewerInstanceRef.current);
                }
              });
              resizeObserver.observe(containerRef.current);
            }
          });
        },
      )
      .catch((err) => {
        if (!cancelled) {
          // eslint-disable-next-line no-console
          console.error('Failed to render BPMN diagram:', err);
          setHasError(true);
        }
      });

    return () => {
      cancelled = true;
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      if (viewerInstanceRef.current) {
        viewerInstanceRef.current.destroy();
        viewerInstanceRef.current = null;
      }
    };
  }, [bpmnData.enableTokenSimulation, bpmnData.xml]);

  if (!bpmnData.xml) {
    return null;
  }

  if (hasError) {
    return (
      <div
        className={['bpmnBlock', heightClass, className]
          .filter(Boolean)
          .join(' ')}
      >
        <div className="bpmnMessage" role="alert">
          <p>Failed to load BPMN diagram.</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={['bpmnBlock', heightClass, className]
        .filter(Boolean)
        .join(' ')}
    >
      <div
        ref={containerRef}
        className="bpmnCanvas"
        role="region"
        aria-label="BPMN diagram"
      >
        <button
          type="button"
          className="bpmn-simulator-fit"
          title="Fit diagram to view"
          aria-label="Fit diagram to view"
          onClick={handleFit}
        >
          <svg
            viewBox="0 0 20 20"
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          >
            <path d="M7 3H4.5A1.5 1.5 0 0 0 3 4.5V7M13 3h2.5A1.5 1.5 0 0 1 17 4.5V7M7 17H4.5A1.5 1.5 0 0 1 3 15.5V13M13 17h2.5a1.5 1.5 0 0 0 1.5-1.5V13" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default BPMNBlockView;
