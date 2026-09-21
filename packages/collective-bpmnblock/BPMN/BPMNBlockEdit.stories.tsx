import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import BPMNBlockEdit from './BPMNBlockEdit';
import { SAMPLE_DIAGRAM } from './fixtures';

type EditorData = { xml?: string; height?: string };

const EditorWithXml = ({ initial }: { initial: EditorData }) => {
  const [data, setData] = useState<EditorData>(initial);

  return (
    <>
      <BPMNBlockEdit
        {...({
          block: 'story-block',
          data,
          setBlock: setData,
        } as any)}
      />
      <details style={{ marginTop: '1rem' }}>
        <summary>Block data (xml)</summary>
        <pre style={{ overflow: 'auto', maxHeight: '20rem' }}>{data.xml}</pre>
      </details>
    </>
  );
};

const meta: Meta<typeof EditorWithXml> = {
  title: 'Components/BPMNBlock/Editor',
  component: EditorWithXml,
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof EditorWithXml>;

export const Default: Story = {
  args: { initial: { xml: SAMPLE_DIAGRAM, height: 'l' } },
};

export const EmptyDiagram: Story = {
  args: { initial: { height: 'l' } },
};
