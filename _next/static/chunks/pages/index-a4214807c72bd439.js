(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{5301:function(r,e,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return n(4186)}])},6625:function(r,e,n){"use strict";var o=n(6744);e.Z=(0,o.zo)("button",{display:"flex",justifyContent:"center",alignItems:"center",columnGap:5,padding:"0.5em 1em",border:"1px solid",borderRadius:"8px",fontWeight:"bolder",cursor:"pointer",variants:{rounded:{true:{padding:"0.5em",borderRadius:"100%"}},bordered:{true:{backgroundColor:"transparent !important"}},disabled:{true:{opacity:.5,cursor:"not-allowed"}},color:{transparent:{backgroundColor:"transparent",borderColor:"transparent"},normal:{backgroundColor:"$gray11",borderColor:"$gray11",color:"White"},primary:{backgroundColor:"$teal9",borderColor:"$teal10",color:"White"},warning:{color:"White",border:"1px solid $tomato10",backgroundColor:"$tomato10",fontWeight:"bolder"}},size:{small:{fontSize:"0.8em"},normal:{fontSize:"1em"},large:{fontSize:"1.2em"}}},compoundVariants:[{color:"normal",bordered:!0,css:{color:"$gray11",borderColor:"$gray11"}},{color:"primary",bordered:!0,css:{color:"$teal9",borderColor:"$teal9"}},{color:"warning",bordered:!0,css:{color:"$tomato10",borderColor:"$tomato10"}}],defaultVariants:{color:"primary",size:"normal",rounded:!1,bordered:!1}})},4186:function(r,e,n){"use strict";n.r(e),n.d(e,{default:function(){return C}});var o=n(5893),t=n(1163),i=n(7294),a=n(2370),l=n(6625),c=n(454),s=n(7612);function u(r,e){(null==e||e>r.length)&&(e=r.length);for(var n=0,o=new Array(e);n<e;n++)o[n]=r[n];return o}function d(r,e,n){return e in r?Object.defineProperty(r,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):r[e]=n,r}function f(r){return function(r){if(Array.isArray(r))return u(r)}(r)||function(r){if("undefined"!==typeof Symbol&&null!=r[Symbol.iterator]||null!=r["@@iterator"])return Array.from(r)}(r)||function(r,e){if(!r)return;if("string"===typeof r)return u(r,e);var n=Object.prototype.toString.call(r).slice(8,-1);"Object"===n&&r.constructor&&(n=r.constructor.name);if("Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return u(r,e)}(r)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var m=(0,s.zo)("section",{display:"flex",justifyItems:"center",fontSize:"1.1em",height:"90%",minHeight:350,width:"80%",margin:"auto","@sm":{display:"flex",flexFlow:"column",fontSize:"1em",width:"calc(100% + 15px)"},"@md":{width:"100%"}}),p=(0,s.zo)("div",{flexGrow:1,textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}),g=(0,s.zo)(p,{}),h=(0,s.zo)("h1",{fontWeight:"bolder",fontSize:"2em",margin:0,marginBottom:15,color:"$teal9","@sm":{fontSize:"1.75em"}}),b=(0,s.zo)((function(r){return(0,o.jsxs)("span",function(r){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},o=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(n).filter((function(r){return Object.getOwnPropertyDescriptor(n,r).enumerable})))),o.forEach((function(e){d(r,e,n[e])}))}return r}({},r,{children:[(0,o.jsx)(a.VQF,{}),r.children]}))}),{display:"flex",alignItems:"center",lineHeight:"1.25em","& svg":{color:"$teal9",height:"1em",width:"1em",fontWeight:"bolder",fontSize:"1.5em"},"@sm":{lineHeight:"1em"}}),y=(0,s.zo)(p,{display:"none","@sm":{display:"flex"}}),x=(0,s.zo)(l.Z,{}),v=(0,s.zo)(p,{"@sm":{display:"none"},"@md":{fontSize:"0.9em",width:"min-content"}}),j=(0,s.zo)("span",{padding:"25px 0"}),w=(0,s.zo)("div",{padding:"2em 4em",border:"2px dashed $gray8",backgroundColor:"$teal2",color:"$gray10",borderRadius:"5px","&:hover, &.hover":{borderColor:"$teal7",color:"$teal9",cursor:"pointer"}}),z=(0,s.zo)(l.Z,{});function C(){var r=(0,i.useRef)(),e=(0,i.useRef)(),n=(0,t.useRouter)(),l=(0,i.useContext)(c.Z).updateContent,s=function(r){r.preventDefault(),r.stopPropagation()},u=function(r,e){return function(){for(var n=arguments.length,o=new Array(n),t=0;t<n;t++)o[t]=arguments[t];r.apply(void 0,f(o)),e.apply(void 0,f(o))}},d=function(r){var e=new FileReader;e.onload=function(r){l(r.target.result.toString()),n.push({pathname:"/editor"})},e.readAsText(r)};return(0,o.jsxs)(m,{children:[(0,o.jsxs)(g,{children:[(0,o.jsx)(h,{children:"Normalize your .bib"}),(0,o.jsx)(b,{children:"Remove unnecessary fields"}),(0,o.jsx)(b,{children:"Get warnings on missing fields"}),(0,o.jsx)(b,{children:"Check formatting"}),(0,o.jsx)(b,{children:"Auto-formatting basic fields"}),(0,o.jsx)(b,{children:"Custom validation rules"})]}),(0,o.jsx)(y,{children:(0,o.jsxs)(x,{size:"large",color:"normal",bordered:!0,onMouseEnter:function(){return n.prefetch("/editor")},onClick:function(){return n.push("/editor")},children:["Open editor ",(0,o.jsx)(a.SZ3,{})]})}),(0,o.jsxs)(v,{children:[(0,o.jsx)("input",{ref:r,type:"file",accept:".bib",hidden:!0,onInput:function(r){r.preventDefault(),d(r.target.files[0])}}),(0,o.jsxs)(z,{size:"large",onClick:function(){return r.current.click()},children:[(0,o.jsx)(a.v8B,{style:{marginRight:5}})," Choose a bibtex file"]}),(0,o.jsx)(j,{children:"-- or --"}),(0,o.jsx)(w,{ref:e,onClick:function(){return r.current.click()},onDragEnter:u(s,(function(){return e.current.classList.add("hover")})),onDragLeave:u(s,(function(){return e.current.classList.remove("hover")})),onDragOver:s,onDrop:u(s,(function(r){return r.dataTransfer.files&&r.dataTransfer.files.length>0?d(r.dataTransfer.files[0]):null})),children:"Drop your file here"})]})]})}}},function(r){r.O(0,[774,888,179],(function(){return e=5301,r(r.s=e);var e}));var e=r.O();_N_E=e}]);