import { useEffect, useRef, useState } from 'react';
import type { BlockEditProps } from '@plone/types';
import 'bpmn-js/dist/assets/bpmn-js.css';
import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';
import './BPMNBlock.css';

const EMPTY_DIAGRAM = `<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL"
  xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI"
  xmlns:dc="http://www.omg.org/spec/DD/20100524/DC"
  xmlns:di="http://www.omg.org/spec/DD/20100524/DI"
  id="Definitions_1" targetNamespace="http://bpmn.io/schema/bpmn">
  <process id="Process_1" isExecutable="false" />
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1" />
  </bpmndi:BPMNDiagram>
</definitions>`;

type BPMNData = BlockEditProps['data'] & {
  xml?: string;
  height?: string;
};

const BPMNBlockEdit = ({ className, data, setBlock }: BlockEditProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const modelerRef = useRef<any>(null);
  const dataRef = useRef<BPMNData>(data);
  const setBlockRef = useRef(setBlock);
  const lastPersistedXmlRef = useRef<string | undefined>(data?.xml);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [hasError, setHasError] = useState(false);
  const bpmnData = data as BPMNData;
  const heightClass = bpmnData.height
    ? `height-${bpmnData.height}`
    : 'height-m';

  dataRef.current = data;
  setBlockRef.current = setBlock;

  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current) return;

    let cancelled = false;
    let resizeObserver: ResizeObserver | null = null;

    import('bpmn-js/lib/Modeler')
      .then((modelerModule) => {
        if (cancelled || !containerRef.current) return;

        const Modeler = modelerModule.default || modelerModule;
        const modeler = new (Modeler as any)({
          container: containerRef.current,
        });
        modelerRef.current = modeler;

        const persist = () => {
          if (cancelled) return;
          if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
          }
          debounceTimerRef.current = setTimeout(async () => {
            if (cancelled || !modelerRef.current) return;
            try {
              const { xml } = await modelerRef.current.saveXML({
                format: true,
              });
              if (!cancelled && xml && xml !== lastPersistedXmlRef.current) {
                lastPersistedXmlRef.current = xml;
                setBlockRef.current({ ...dataRef.current, xml });
              }
            } catch (err) {
              // eslint-disable-next-line no-console
              console.error('Failed to save BPMN diagram XML:', err);
            }
          }, 300);
        };

        modeler.on('commandStack.changed', persist);

        const initialXml = dataRef.current?.xml || EMPTY_DIAGRAM;
        lastPersistedXmlRef.current = dataRef.current?.xml;

        return modeler.importXML(initialXml).then(() => {
          if (cancelled) return;
          const canvas = modeler.get('canvas');
          canvas.zoom('fit-viewport');

          if (typeof ResizeObserver !== 'undefined' && containerRef.current) {
            resizeObserver = new ResizeObserver(() => {
              if (!cancelled) {
                try {
                  canvas.zoom('fit-viewport');
                } catch {
                  // Ignore zoom errors if canvas is detached
                }
              }
            });
            resizeObserver.observe(containerRef.current);
          }
        });
      })
      .catch((err) => {
        if (!cancelled) {
          // eslint-disable-next-line no-console
          console.error('Failed to initialize BPMN modeler:', err);
          setHasError(true);
        }
      });

    return () => {
      cancelled = true;
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      if (modelerRef.current) {
        modelerRef.current.destroy();
        modelerRef.current = null;
      }
    };
  }, []);

  // Handle external updates to data.xml (e.g. undo/redo from parent editor)
  useEffect(() => {
    const currentModeler = modelerRef.current;
    if (!currentModeler || !data?.xml) return;

    if (data.xml !== lastPersistedXmlRef.current) {
      lastPersistedXmlRef.current = data.xml;
      currentModeler
        .importXML(data.xml)
        .then(() => {
          try {
            currentModeler.get('canvas').zoom('fit-viewport');
          } catch {
            // Ignore zoom errors
          }
        })
        .catch(() => undefined);
    }
  }, [data?.xml]);

  if (hasError) {
    return (
      <div
        className={['bpmnBlock', heightClass, className]
          .filter(Boolean)
          .join(' ')}
      >
        <div className="bpmnMessage" role="alert">
          <p>Failed to initialize BPMN editor.</p>
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
        aria-label="BPMN diagram editor"
      />
    </div>
  );
};

export default BPMNBlockEdit;
