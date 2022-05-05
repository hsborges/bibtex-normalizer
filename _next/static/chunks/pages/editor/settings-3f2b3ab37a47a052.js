(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[421],{6652:function(e,n,t){"use strict";function r(e,n,{checkForDefaultPrevented:t=!0}={}){return function(r){if(null==e||e(r),!1===t||!r.defaultPrevented)return null==n?void 0:n(r)}}t.d(n,{M:function(){return r}})},6093:function(e,n,t){"use strict";t.d(n,{fC:function(){return N},z$:function(){return w}});var r=t(3655),o=t(3216),u=t(2602),c=t(2935),i=t(7571),s=t(9920),a=t(6652),l=t(2707),d=t(7255),f=t(7294),p=t(7462);const[m,b]=(0,l.b)("Checkbox"),[h,v]=m("Checkbox"),E=f.forwardRef(((e,n)=>{const{__scopeCheckbox:t,"aria-labelledby":o,name:c,checked:i,defaultChecked:l,required:m,disabled:b,value:v="on",onCheckedChange:E,...N}=e,[w,g]=f.useState(null),_=(0,d.e)(n,(e=>g(e))),O=(0,u.t0)(w),S=o||O,M=f.useRef(!1),P=!w||Boolean(w.closest("form")),[T=!1,R]=(0,s.T)({prop:i,defaultProp:l,onChange:E});return f.createElement(h,{scope:t,state:T,disabled:b},f.createElement(r.W.button,(0,p.Z)({type:"button",role:"checkbox","aria-checked":k(T)?"mixed":T,"aria-labelledby":S,"aria-required":m,"data-state":C(T),"data-disabled":b?"":void 0,disabled:b,value:v},N,{ref:_,onKeyDown:(0,a.M)(e.onKeyDown,(e=>{"Enter"===e.key&&e.preventDefault()})),onClick:(0,a.M)(e.onClick,(e=>{R((e=>!!k(e)||!e)),P&&(M.current=e.isPropagationStopped(),M.current||e.stopPropagation())}))})),P&&f.createElement(y,{control:w,bubbles:!M.current,name:c,value:v,checked:T,required:m,disabled:b,style:{transform:"translateX(-100%)"}}))})),y=e=>{const{control:n,checked:t,bubbles:r=!0,...o}=e,u=f.useRef(null),s=(0,i.D)(t),a=(0,c.t)(n);return f.useEffect((()=>{const e=u.current,n=window.HTMLInputElement.prototype,o=Object.getOwnPropertyDescriptor(n,"checked").set;if(s!==t&&o){const n=new Event("click",{bubbles:r});e.indeterminate=k(t),o.call(e,!k(t)&&t),e.dispatchEvent(n)}}),[s,t,r]),f.createElement("input",(0,p.Z)({type:"checkbox","aria-hidden":!0,defaultChecked:!k(t)&&t},o,{tabIndex:-1,ref:u,style:{...e.style,...a,position:"absolute",pointerEvents:"none",opacity:0,margin:0}}))};function k(e){return"indeterminate"===e}function C(e){return k(e)?"indeterminate":e?"checked":"unchecked"}const N=E,w=f.forwardRef(((e,n)=>{const{__scopeCheckbox:t,forceMount:u,...c}=e,i=v("CheckboxIndicator",t);return f.createElement(o.z,{present:u||k(i.state)||!0===i.state},f.createElement(r.W.span,(0,p.Z)({"data-state":C(i.state),"data-disabled":i.disabled?"":void 0},c,{ref:n,style:{pointerEvents:"none",...e.style}})))}))},7255:function(e,n,t){"use strict";t.d(n,{F:function(){return o},e:function(){return u}});var r=t(7294);function o(...e){return n=>e.forEach((e=>function(e,n){"function"==typeof e?e(n):null!=e&&(e.current=n)}(e,n)))}function u(...e){return r.useCallback(o(...e),e)}},2707:function(e,n,t){"use strict";t.d(n,{k:function(){return o},b:function(){return u}});var r=t(7294);function o(e,n){const t=r.createContext(n);function o(e){const{children:n,...o}=e,u=r.useMemo((()=>o),Object.values(o));return r.createElement(t.Provider,{value:u},n)}return o.displayName=e+"Provider",[o,function(o){const u=r.useContext(t);if(u)return u;if(void 0!==n)return n;throw new Error(`\`${o}\` must be used within \`${e}\``)}]}function u(e,n=[]){let t=[];const o=()=>{const n=t.map((e=>r.createContext(e)));return function(t){const o=(null==t?void 0:t[e])||n;return r.useMemo((()=>({[`__scope${e}`]:{...t,[e]:o}})),[t,o])}};return o.scopeName=e,[function(n,o){const u=r.createContext(o),c=t.length;function i(n){const{scope:t,children:o,...i}=n,s=(null==t?void 0:t[e][c])||u,a=r.useMemo((()=>i),Object.values(i));return r.createElement(s.Provider,{value:a},o)}return t=[...t,o],i.displayName=n+"Provider",[i,function(t,i){const s=(null==i?void 0:i[e][c])||u,a=r.useContext(s);if(a)return a;if(void 0!==o)return o;throw new Error(`\`${t}\` must be used within \`${n}\``)}]},c(o,...n)]}function c(...e){const n=e[0];if(1===e.length)return n;const t=()=>{const t=e.map((e=>({useScope:e(),scopeName:e.scopeName})));return function(e){const o=t.reduce(((n,{useScope:t,scopeName:r})=>({...n,...t(e)[`__scope${r}`]})),{});return r.useMemo((()=>({[`__scope${n.scopeName}`]:o})),[o])}};return t.scopeName=n.scopeName,t}},2602:function(e,n,t){"use strict";t.d(n,{t0:function(){return i}});var r=t(2707),o=t(7294);const[u,c]=(0,r.k)("Label",{id:void 0,controlRef:{current:null}}),i=e=>{const n=c("LabelConsumer"),{controlRef:t}=n;return o.useEffect((()=>{e&&(t.current=e)}),[e,t]),n.id}},3216:function(e,n,t){"use strict";t.d(n,{z:function(){return c}});var r=t(9563),o=t(7255),u=t(7294);const c=e=>{const{present:n,children:t}=e,c=function(e){const[n,t]=u.useState(),o=u.useRef({}),c=u.useRef(e),s=u.useRef("none"),a=e?"mounted":"unmounted",[l,d]=function(e,n){return u.useReducer(((e,t)=>{const r=n[e][t];return null!=r?r:e}),e)}(a,{mounted:{UNMOUNT:"unmounted",ANIMATION_OUT:"unmountSuspended"},unmountSuspended:{MOUNT:"mounted",ANIMATION_END:"unmounted"},unmounted:{MOUNT:"mounted"}});return u.useEffect((()=>{const e=i(o.current);s.current="mounted"===l?e:"none"}),[l]),(0,r.b)((()=>{const n=o.current,t=c.current;if(t!==e){const r=s.current,o=i(n);if(e)d("MOUNT");else if("none"===o||"none"===(null==n?void 0:n.display))d("UNMOUNT");else{const e=r!==o;d(t&&e?"ANIMATION_OUT":"UNMOUNT")}c.current=e}}),[e,d]),(0,r.b)((()=>{if(n){const e=e=>{const t=i(o.current).includes(e.animationName);e.target===n&&t&&d("ANIMATION_END")},t=e=>{e.target===n&&(s.current=i(o.current))};return n.addEventListener("animationstart",t),n.addEventListener("animationcancel",e),n.addEventListener("animationend",e),()=>{n.removeEventListener("animationstart",t),n.removeEventListener("animationcancel",e),n.removeEventListener("animationend",e)}}d("ANIMATION_END")}),[n,d]),{isPresent:["mounted","unmountSuspended"].includes(l),ref:u.useCallback((e=>{e&&(o.current=getComputedStyle(e)),t(e)}),[])}}(n),s="function"==typeof t?t({present:c.isPresent}):u.Children.only(t),a=(0,o.e)(c.ref,s.ref);return"function"==typeof t||c.isPresent?u.cloneElement(s,{ref:a}):null};function i(e){return(null==e?void 0:e.animationName)||"none"}c.displayName="Presence"},3655:function(e,n,t){"use strict";t.d(n,{W:function(){return d}});var r=t(7255),o=t(7294),u=t(7462);const c=o.forwardRef(((e,n)=>{const{children:t,...r}=e;return o.Children.toArray(t).some(a)?o.createElement(o.Fragment,null,o.Children.map(t,(e=>a(e)?o.createElement(i,(0,u.Z)({},r,{ref:n}),e.props.children):e))):o.createElement(i,(0,u.Z)({},r,{ref:n}),t)}));c.displayName="Slot";const i=o.forwardRef(((e,n)=>{const{children:t,...u}=e;return o.isValidElement(t)?o.cloneElement(t,{...l(u,t.props),ref:(0,r.F)(n,t.ref)}):o.Children.count(t)>1?o.Children.only(null):null}));i.displayName="SlotClone";const s=({children:e})=>o.createElement(o.Fragment,null,e);function a(e){return o.isValidElement(e)&&e.type===s}function l(e,n){const t={...n};for(const r in n){const o=e[r],u=n[r];/^on[A-Z]/.test(r)?t[r]=(...e)=>{null==u||u(...e),null==o||o(...e)}:"style"===r?t[r]={...o,...u}:"className"===r&&(t[r]=[o,u].filter(Boolean).join(" "))}return{...e,...t}}const d=["a","button","div","h2","h3","img","li","nav","ol","p","span","svg","ul"].reduce(((e,n)=>({...e,[n]:o.forwardRef(((e,t)=>{const{asChild:r,...i}=e,s=r?c:n;return o.useEffect((()=>{window[Symbol.for("radix-ui")]=!0}),[]),o.createElement(s,(0,u.Z)({},i,{ref:t}))}))})),{})},5039:function(e,n,t){"use strict";t.d(n,{fC:function(){return k},bU:function(){return C}});var r=t(2602),o=t(3655),u=t(2935),c=t(7571),i=t(9920),s=t(2707),a=t(7255),l=t(6652),d=t(7294),f=t(7462);const[p,m]=(0,s.b)("Switch"),[b,h]=p("Switch"),v=d.forwardRef(((e,n)=>{const{__scopeSwitch:t,"aria-labelledby":u,name:c,checked:s,defaultChecked:p,required:m,disabled:h,value:v="on",onCheckedChange:k,...C}=e,[N,w]=d.useState(null),g=(0,a.e)(n,(e=>w(e))),_=(0,r.t0)(N),O=u||_,S=d.useRef(!1),M=!N||Boolean(N.closest("form")),[P=!1,T]=(0,i.T)({prop:s,defaultProp:p,onChange:k});return d.createElement(b,{scope:t,checked:P,disabled:h},d.createElement(o.W.button,(0,f.Z)({type:"button",role:"switch","aria-checked":P,"aria-labelledby":O,"aria-required":m,"data-state":y(P),"data-disabled":h?"":void 0,disabled:h,value:v},C,{ref:g,onClick:(0,l.M)(e.onClick,(e=>{T((e=>!e)),M&&(S.current=e.isPropagationStopped(),S.current||e.stopPropagation())}))})),M&&d.createElement(E,{control:N,bubbles:!S.current,name:c,value:v,checked:P,required:m,disabled:h,style:{transform:"translateX(-100%)"}}))})),E=e=>{const{control:n,checked:t,bubbles:r=!0,...o}=e,i=d.useRef(null),s=(0,c.D)(t),a=(0,u.t)(n);return d.useEffect((()=>{const e=i.current,n=window.HTMLInputElement.prototype,o=Object.getOwnPropertyDescriptor(n,"checked").set;if(s!==t&&o){const n=new Event("click",{bubbles:r});o.call(e,t),e.dispatchEvent(n)}}),[s,t,r]),d.createElement("input",(0,f.Z)({type:"checkbox","aria-hidden":!0,defaultChecked:t},o,{tabIndex:-1,ref:i,style:{...e.style,...a,position:"absolute",pointerEvents:"none",opacity:0,margin:0}}))};function y(e){return e?"checked":"unchecked"}const k=v,C=d.forwardRef(((e,n)=>{const{__scopeSwitch:t,...r}=e,u=h("SwitchThumb",t);return d.createElement(o.W.span,(0,f.Z)({"data-state":y(u.checked),"data-disabled":u.disabled?"":void 0},r,{ref:n}))}))},5355:function(e,n,t){"use strict";t.d(n,{W:function(){return o}});var r=t(7294);function o(e){const n=r.useRef(e);return r.useEffect((()=>{n.current=e})),r.useMemo((()=>(...e)=>{var t;return null===(t=n.current)||void 0===t?void 0:t.call(n,...e)}),[])}},9920:function(e,n,t){"use strict";t.d(n,{T:function(){return u}});var r=t(5355),o=t(7294);function u({prop:e,defaultProp:n,onChange:t=(()=>{})}){const[u,c]=function({defaultProp:e,onChange:n}){const t=o.useState(e),[u]=t,c=o.useRef(u),i=(0,r.W)(n);return o.useEffect((()=>{c.current!==u&&(i(u),c.current=u)}),[u,c,i]),t}({defaultProp:n,onChange:t}),i=void 0!==e,s=i?e:u,a=(0,r.W)(t);return[s,o.useCallback((n=>{if(i){const t=n,r="function"==typeof n?t(e):n;r!==e&&a(r)}else c(n)}),[i,e,c,a])]}},9563:function(e,n,t){"use strict";t.d(n,{b:function(){return o}});var r=t(7294);const o=Boolean(null===globalThis||void 0===globalThis?void 0:globalThis.document)?r.useLayoutEffect:()=>{}},7571:function(e,n,t){"use strict";t.d(n,{D:function(){return o}});var r=t(7294);function o(e){const n=r.useRef({value:e,previous:e});return r.useMemo((()=>(n.current.value!==e&&(n.current.previous=n.current.value,n.current.value=e),n.current.previous)),[e])}},2935:function(e,n,t){"use strict";t.d(n,{t:function(){return o}});var r=t(7294);function o(e){const[n,t]=r.useState(void 0);return r.useEffect((()=>{if(e){const n=new ResizeObserver((n=>{if(!Array.isArray(n))return;if(!n.length)return;const r=n[0];let o,u;if("borderBoxSize"in r){const e=r.borderBoxSize,n=Array.isArray(e)?e[0]:e;o=n.inlineSize,u=n.blockSize}else{const n=e.getBoundingClientRect();o=n.width,u=n.height}t({width:o,height:u})}));return n.observe(e,{box:"border-box"}),()=>n.unobserve(e)}t(void 0)}),[e]),n}},5312:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/editor/settings",function(){return t(8621)}])},7462:function(e,n,t){"use strict";function r(){return r=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e},r.apply(this,arguments)}t.d(n,{Z:function(){return r}})}},function(e){e.O(0,[662,621,774,888,179],(function(){return n=5312,e(e.s=n);var n}));var n=e.O();_N_E=n}]);