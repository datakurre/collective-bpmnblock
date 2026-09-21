import { describe, expect, it } from 'vitest';
import BPMNBlockInfo, { BPMNSchema } from './index';

describe('BPMN block', () => {
  it('defines token simulation as an opt-in setting', () => {
    expect(BPMNSchema.properties?.enableTokenSimulation).toMatchObject({
      type: 'boolean',
      default: false,
    });
  });

  it('supports all block anatomy widths', () => {
    expect(BPMNSchema.properties?.blockWidth).toMatchObject({
      widget: 'width',
      default: 'default',
      actions: ['narrow', 'default', 'layout', 'full'],
      styleField: true,
    });
  });

  it('supports block alignments', () => {
    expect(BPMNSchema.properties?.align).toMatchObject({
      widget: 'align',
      default: 'center',
      actions: ['left', 'right', 'center'],
      styleField: true,
    });
  });

  it('supports height sizing vocabulary', () => {
    expect(BPMNSchema.properties?.height).toMatchObject({
      widget: 'size',
      default: 'm',
      actions: ['s', 'm', 'l'],
      styleField: true,
    });
  });

  it('exposes complete block metadata and components conforming to Aurora conventions', () => {
    expect(BPMNBlockInfo.id).toBe('bpmn');
    expect(BPMNBlockInfo.title).toBe('BPMN diagram');
    expect(BPMNBlockInfo.category).toBe('common');
    expect(BPMNBlockInfo.group).toBe('common');
    expect(BPMNBlockInfo.defaultBlockWidth).toBe('default');
    expect(BPMNBlockInfo.icon).toBeDefined();
    expect(BPMNBlockInfo.edit).toBeDefined();
    expect(BPMNBlockInfo.view).toBeDefined();
  });
});
