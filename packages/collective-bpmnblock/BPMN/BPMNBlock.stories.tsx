import type { Meta, StoryObj } from '@storybook/react';
import BPMNBlockView from './BPMNBlockView';

const SAMPLE_DIAGRAM = `<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL"
  xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI"
  xmlns:dc="http://www.omg.org/spec/DD/20100524/DC"
  xmlns:di="http://www.omg.org/spec/DD/20100524/DI"
  id="Definitions_1" targetNamespace="http://bpmn.io/schema/bpmn">
  <process id="Process_1" isExecutable="false">
    <startEvent id="StartEvent_1" name="Order Received">
      <outgoing>Flow_1</outgoing>
    </startEvent>
    <task id="Activity_1" name="Process Order">
      <incoming>Flow_1</incoming>
      <outgoing>Flow_2</outgoing>
    </task>
    <exclusiveGateway id="Gateway_1" name="Approved?">
      <incoming>Flow_2</incoming>
      <outgoing>Flow_3</outgoing>
    </exclusiveGateway>
    <endEvent id="EndEvent_1" name="Order Completed">
      <incoming>Flow_3</incoming>
    </endEvent>
    <sequenceFlow id="Flow_1" sourceRef="StartEvent_1" targetRef="Activity_1" />
    <sequenceFlow id="Flow_2" sourceRef="Activity_1" targetRef="Gateway_1" />
    <sequenceFlow id="Flow_3" sourceRef="Gateway_1" targetRef="EndEvent_1" />
  </process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">
      <bpmndi:BPMNShape id="StartEvent_1_di" bpmnElement="StartEvent_1">
        <dc:Bounds x="180" y="102" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="160" y="145" width="77" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_1_di" bpmnElement="Activity_1">
        <dc:Bounds x="270" y="80" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Gateway_1_di" bpmnElement="Gateway_1" isMarkerVisible="true">
        <dc:Bounds x="425" y="95" width="50" height="50" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="424" y="152" width="53" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="EndEvent_1_di" bpmnElement="EndEvent_1">
        <dc:Bounds x="532" y="102" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="510" y="145" width="83" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="Flow_1_di" bpmnElement="Flow_1">
        <di:waypoint x="216" y="120" />
        <di:waypoint x="270" y="120" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_2_di" bpmnElement="Flow_2">
        <di:waypoint x="370" y="120" />
        <di:waypoint x="425" y="120" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_3_di" bpmnElement="Flow_3">
        <di:waypoint x="475" y="120" />
        <di:waypoint x="532" y="120" />
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</definitions>`;

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
