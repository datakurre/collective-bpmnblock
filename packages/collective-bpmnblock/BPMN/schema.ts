import type { JSONSchema } from '@plone/types';

export const BPMNSchema: JSONSchema = {
  title: 'BPMN diagram',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['enableTokenSimulation', 'blockWidth', 'height', 'align'],
    },
  ],
  properties: {
    enableTokenSimulation: {
      title: 'Enable token simulation',
      type: 'boolean',
      default: false,
    },
    blockWidth: {
      title: 'Block width',
      widget: 'width',
      default: 'default',
      actions: ['narrow', 'default', 'layout', 'full'],
      styleField: true,
    },
    height: {
      title: 'Diagram height',
      widget: 'size',
      default: 'm',
      actions: ['s', 'm', 'l'],
      styleField: true,
    },
    align: {
      title: 'Alignment',
      widget: 'align',
      default: 'center',
      actions: ['left', 'right', 'center'],
      styleField: true,
    },
  },
  required: [],
};
