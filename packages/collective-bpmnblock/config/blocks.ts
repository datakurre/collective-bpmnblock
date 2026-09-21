import React from 'react';
import type { ConfigType } from '@plone/registry';
import type { BlockConfigBase } from '@plone/types';
import { Checkbox } from '@plone/components/quanta';
import BPMNBlockInfo from '../BPMN';

const LabeledCheckbox = (props: any) => {
  return React.createElement(
    Checkbox,
    props,
    props.children ?? props.label ?? props.title,
  );
};

export default function install(config: ConfigType) {
  config.blocks.blocksConfig.bpmn = BPMNBlockInfo as unknown as BlockConfigBase;

  config.registerWidget({
    key: 'widget',
    definition: { boolean: LabeledCheckbox },
  });

  config.registerUtility({
    type: 'styleFieldDefinition',
    name: 'height',
    method: () => [
      {
        name: 's',
        label: 'Small',
        style: {
          '--bpmn-height': 'var(--bpmn-height-s, 40vh)',
        },
      },
      {
        name: 'm',
        label: 'Medium',
        style: {
          '--bpmn-height': 'var(--bpmn-height-m, 60vh)',
        },
      },
      {
        name: 'l',
        label: 'Large',
        style: {
          '--bpmn-height': 'var(--bpmn-height-l, 80vh)',
        },
      },
    ],
  });

  return config;
}
