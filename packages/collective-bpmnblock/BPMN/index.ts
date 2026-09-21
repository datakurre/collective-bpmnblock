import React from 'react';
import type { BlockConfigBase } from '@plone/types';
import { AutomatedcontentIcon } from '@plone/components/Icons';
import { BPMNSchema } from './schema';

const BPMNBlockInfo = {
  id: 'bpmn',
  title: 'BPMN diagram',
  icon: AutomatedcontentIcon,
  group: 'common',
  category: 'common',
  view: React.lazy(() => import('./BPMNBlockView')),
  edit: React.lazy(() => import('./BPMNBlockEdit')),
  blockSchema: BPMNSchema,
  defaultBlockWidth: 'default',
} satisfies Partial<BlockConfigBase>;

export { BPMNSchema } from './schema';
export default BPMNBlockInfo;
