import type { Meta, StoryObj } from '@storybook/react';
import BPMNBlockView from './BPMNBlockView';
import { SAMPLE_DIAGRAM } from './fixtures';

const meta: Meta<typeof BPMNBlockView> = {
  title: 'Components/BPMNBlock',
  component: BPMNBlockView,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof BPMNBlockView>;

export const Default: Story = {
  args: {
    data: {
      xml: SAMPLE_DIAGRAM,
      enableTokenSimulation: false,
      height: 'm',
    },
  },
};

export const WithTokenSimulation: Story = {
  args: {
    data: {
      xml: SAMPLE_DIAGRAM,
      enableTokenSimulation: true,
      height: 'm',
    },
  },
};

export const SmallHeight: Story = {
  args: {
    data: {
      xml: SAMPLE_DIAGRAM,
      enableTokenSimulation: true,
      height: 's',
    },
  },
};

export const LargeHeight: Story = {
  args: {
    data: {
      xml: SAMPLE_DIAGRAM,
      enableTokenSimulation: true,
      height: 'l',
    },
  },
};
