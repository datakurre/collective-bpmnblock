const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./NavigatedViewer-D6MPf4kr.js","./rolldown-runtime-DkW27tQK.js","./dist-CE12o5TX.js","./ModelUtil-DX6IxnK-.js","./dist-DWYfoWfj.js","./EscapeUtil-CrmYfRMF.js","./viewer-C9h1-yWT.js","./EventHelper-BnHyL9BC.js","./Animation-B9KJzOO0.js","./TokenCount-C9yb5XCU.js"])))=>i.map(i=>d[i]);
import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{n as t,t as n}from"./preload-helper-VEOc_cSF.js";import{t as r}from"./react-Q1GcV6wX.js";import{t as i}from"./jsx-runtime-DeHZSEgm.js";function a(){if(typeof document>`u`)return;let e={"--token-simulation-green-base-44":`#10D070`,"--token-simulation-grey-base-40":`#666666`,"--token-simulation-grey-darken-30":`#212121`,"--token-simulation-grey-lighten-56":`#909090`,"--token-simulation-red-base-62":`#FF3D3D`,"--token-simulation-silver-base-97":`#F8F8F8`,"--token-simulation-silver-darken-94":`#EFEFEF`,"--token-simulation-white":`#FFFFFF`},t=document.documentElement,n=getComputedStyle(t);for(let[r,i]of Object.entries(e))n.getPropertyValue(r).trim()||t.style.setProperty(r,i)}function o(e){let t=e.get(`eventBus`,!1);if(!t)return;let n=1;t.on(`tokenSimulation.simulator.createScope`,({scope:e})=>{if(e){if(e.parent){let t=e.parent.tokenNumber;t!=null&&(e.tokenNumber=t)}else e.tokenNumber=n++}}),t.on(`tokenSimulation.resetSimulation`,()=>{n=1})}function s(e,t){if(e?.prototype&&!e.prototype.__patchedTokenNumber){let t=e.prototype._getTokenSVG;e.prototype._getTokenSVG=function(e){let n=t.call(this,e),r=e?.tokenNumber==null?1:e.tokenNumber;return n.replace(/(<text[^>]*class="[^"]*bts-text[^"]*"[^>]*>)\s*1\s*(<\/text>)/,`$1${r}$2`)},e.prototype.__patchedTokenNumber=!0}if(t?.prototype&&!t.prototype.__patchedTokenNumber){let e=t.prototype._getTokenHTML;t.prototype._getTokenHTML=function(t,n){let r=e.call(this,t,n),i=n?.tokenNumber;return i==null?r:r.replace(/(<div[^>]*class="[^"]*bts-token-count[^"]*"[^>]*>)\s*[\d.]+\s*(<\/div>)/,`$1${i}$2`)},t.prototype.__patchedTokenNumber=!0}}function c(e){if(!e)return null;let t=1/0,n=1/0,r=-1/0,i=-1/0,a=(e,a)=>{e<t&&(t=e),a<n&&(n=a),e>r&&(r=e),a>i&&(i=a)};for(let t of e.getAll())if(t.waypoints)for(let e of t.waypoints)a(e.x,e.y);else t.x!=null&&t.y!=null&&t.width&&t.height&&(a(t.x,t.y),a(t.x+t.width,t.y+t.height));return isFinite(t)?{x:t,y:n,width:r-t,height:i-n}:null}function l(e){try{let t=e.get(`canvas`),n=c(e.get(`elementRegistry`));if(!n||!n.width||!n.height){t.zoom(`fit-viewport`);return}let r=t.getSize();if(!r.width||!r.height){t.zoom(`fit-viewport`);return}let i=n.width+40,a=n.height+40,o=Math.min(r.width/i,r.height/a),s=r.width/o,l=r.height/o;t.viewbox({x:n.x+n.width/2-s/2,y:n.y+n.height/2-l/2,width:s,height:l})}catch{try{e.get(`canvas`)?.zoom(`fit-viewport`)}catch{}}}var u,d,f;function p(){return(p=e((()=>{u=r(),d=i(),t(),f=({className:e,data:t})=>{let r=(0,u.useRef)(null),i=(0,u.useRef)(null),c=t,[f,p]=(0,u.useState)(!1),m=c.height?`height-${c.height}`:`height-m`;return(0,u.useEffect)(()=>{if(typeof window>`u`||!r.current||!c.xml)return;let e=!1,t=null;return p(!1),Promise.all([n(()=>import(`./NavigatedViewer-D6MPf4kr.js`),__vite__mapDeps([0,1,2,3,4,5]),import.meta.url),c.enableTokenSimulation?n(()=>import(`./viewer-C9h1-yWT.js`),__vite__mapDeps([6,1,2,3,7,8,4,9,5]),import.meta.url):Promise.resolve(null),c.enableTokenSimulation?n(()=>import(`./Animation-B9KJzOO0.js`).then(e=>(e.r(),e.n)),__vite__mapDeps([8,1,2,3,4,7]),import.meta.url):Promise.resolve(null),c.enableTokenSimulation?n(()=>import(`./TokenCount-C9yb5XCU.js`).then(e=>(e.r(),e.n)),__vite__mapDeps([9,1,2,3,7]),import.meta.url):Promise.resolve(null)]).then(([n,u,d,f])=>{if(e||!r.current)return;d&&f&&s(d.default||d,f.default||f);let p=n.default||n,m=u?.default||u,h=new p({container:r.current,additionalModules:m?[m]:[]});return i.current=h,c.enableTokenSimulation&&(a(),o(h)),h.importXML(c.xml).then(()=>{if(!e){if(l(h),c.enableTokenSimulation)try{let e=h.get(`toggleMode`,!1);if(e)e.toggleMode(!0);else{let e=r.current?.querySelector(`.bts-toggle-mode`);e&&e.click()}}catch{let e=r.current?.querySelector(`.bts-toggle-mode`);e&&e.click()}typeof ResizeObserver<`u`&&r.current&&(t=new ResizeObserver(()=>{!e&&i.current&&l(i.current)}),t.observe(r.current))}})}).catch(t=>{e||(console.error(`Failed to render BPMN diagram:`,t),p(!0))}),()=>{e=!0,t&&t.disconnect(),i.current&&=(i.current.destroy(),null)}},[c.enableTokenSimulation,c.xml]),c.xml?f?(0,d.jsx)(`div`,{className:[`bpmnBlock`,m,e].filter(Boolean).join(` `),children:(0,d.jsx)(`div`,{className:`bpmnMessage`,role:`alert`,children:(0,d.jsx)(`p`,{children:`Failed to load BPMN diagram.`})})}):(0,d.jsx)(`div`,{className:[`bpmnBlock`,m,e].filter(Boolean).join(` `),children:(0,d.jsx)(`div`,{ref:r,className:`bpmnCanvas`,role:`region`,"aria-label":`BPMN diagram`,children:(0,d.jsx)(`button`,{type:`button`,className:`bpmn-simulator-fit`,title:`Fit diagram to view`,"aria-label":`Fit diagram to view`,onClick:()=>{i.current&&l(i.current)},children:(0,d.jsx)(`svg`,{viewBox:`0 0 20 20`,width:`16`,height:`16`,fill:`none`,stroke:`currentColor`,strokeWidth:`1.5`,strokeLinecap:`round`,children:(0,d.jsx)(`path`,{d:`M7 3H4.5A1.5 1.5 0 0 0 3 4.5V7M13 3h2.5A1.5 1.5 0 0 1 17 4.5V7M7 17H4.5A1.5 1.5 0 0 1 3 15.5V13M13 17h2.5a1.5 1.5 0 0 0 1.5-1.5V13`})})})})}):null},f.__docgenInfo={description:``,methods:[],displayName:`BPMNBlockView`}})))()}var m,h,g,_,v,y,b;function x(){return(x=e((()=>{p(),m=`<?xml version="1.0" encoding="UTF-8"?>
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
</definitions>`,h={title:`Components/BPMNBlock`,component:f,parameters:{layout:`padded`},tags:[`autodocs`]},g={args:{data:{xml:m,enableTokenSimulation:!1,height:`m`}}},_={args:{data:{xml:m,enableTokenSimulation:!0,height:`m`}}},v={args:{data:{xml:m,enableTokenSimulation:!0,height:`s`}}},y={args:{data:{xml:m,enableTokenSimulation:!0,height:`l`}}},b=[`Default`,`WithTokenSimulation`,`SmallHeight`,`LargeHeight`],g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    data: {
      xml: SAMPLE_DIAGRAM,
      enableTokenSimulation: false,
      height: 'm'
    }
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    data: {
      xml: SAMPLE_DIAGRAM,
      enableTokenSimulation: true,
      height: 'm'
    }
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    data: {
      xml: SAMPLE_DIAGRAM,
      enableTokenSimulation: true,
      height: 's'
    }
  }
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    data: {
      xml: SAMPLE_DIAGRAM,
      enableTokenSimulation: true,
      height: 'l'
    }
  }
}`,...y.parameters?.docs?.source}}}})))()}x();export{g as Default,y as LargeHeight,v as SmallHeight,_ as WithTokenSimulation,b as __namedExportsOrder,h as default};