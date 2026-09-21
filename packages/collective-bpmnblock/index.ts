import type { ConfigType } from '@plone/registry';
import installBlocks from './config/blocks';

export default function install(config: ConfigType) {
  installBlocks(config);

  return config;
}
