(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[154],{6281:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/editor",function(){return n(1778)}])},1778:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return fe}});var r=n(5893),o=n(6486),i=n(9008),a=n.n(i),s=n(7294),l=n(2370),c=n(9119),d=n(4125),u=n(8519),m=n(9825),f=n(6625),p=n(2488),h=n(6744),g=(0,h.F4)({"0%":{opacity:1},"100%":{opacity:0}}),y=(0,h.F4)({from:{transform:"translateX(calc(100% + ".concat(25,"px))")},to:{transform:"translateX(0)"}}),b=(0,h.F4)({from:{transform:"translateX(var(--radix-toast-swipe-end-x))"},to:{transform:"translateX(calc(100% + ".concat(25,"px))")}}),v=(0,h.zo)(p.l_,{position:"fixed",bottom:0,right:0,display:"flex",flexDirection:"column",padding:25,gap:10,width:390,maxWidth:"100vw",margin:0,listStyle:"none",zIndex:2147483647,outline:"none"}),x=(0,h.zo)(p.fC,{backgroundColor:"White",borderRadius:6,border:"1px solid $teal8",boxShadow:"hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",padding:15,display:"grid",gridTemplateAreas:'"title action" "description action"',gridTemplateColumns:"auto max-content",columnGap:15,alignItems:"center","@media (prefers-reduced-motion: no-preference)":{'&[data-state="open"]':{animation:"".concat(y," 150ms cubic-bezier(0.16, 1, 0.3, 1)")},'&[data-state="closed"]':{animation:"".concat(g," 100ms ease-in forwards")},'&[data-swipe="move"]':{transform:"translateX(var(--radix-toast-swipe-move-x))"},'&[data-swipe="cancel"]':{transform:"translateX(0)",transition:"transform 200ms ease-out"},'&[data-swipe="end"]':{animation:"".concat(b," 100ms ease-out forwards")}}}),w=(0,h.zo)(p.Dx,{gridArea:"title",marginBottom:5,fontWeight:"bolder",fontSize:"1.1em"}),j=(0,h.zo)(p.dk,{gridArea:"description",margin:0,color:"$gray10",fontSize:"0.9em",lineHeight:1.3}),S=(0,h.zo)(p.aU,{gridArea:"action"}),O=p.zt,E=v,C=x,k=w,N=j,_=S,L=(p.x8,n(4051)),z=n.n(L),I=(n(982),n(5152));function A(e,t,n,r,o,i,a){try{var s=e[i](a),l=s.value}catch(c){return void n(c)}s.done?t(l):Promise.resolve(l).then(r,o)}function F(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var T,D=n.n(I)()((T=z().mark((function e(){var t;return z().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Promise.all([n.e(774),n.e(364)]).then(n.bind(n,7762));case 2:return t=e.sent.Steps,e.abrupt("return",t);case 4:case"end":return e.stop()}}),e)})),function(){var e=this,t=arguments;return new Promise((function(n,r){var o=T.apply(e,t);function i(e){A(o,n,r,i,a,"next",e)}function a(e){A(o,n,r,i,a,"throw",e)}i(void 0)}))}),{loadableGenerated:{webpack:function(){return[7762]}},ssr:!1});function P(e){var t=(0,s.useState)(!1),n=t[0],o=t[1];return(0,s.useEffect)((function(){setTimeout((function(){return o(!0)}),500)}),[]),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("style",{children:"\n        .introjs-custom .introjs-tooltiptext {\n          text-align: center;\n          vertical-align: middle;\n        }\n\n        .introjs-custom .introjs-tooltip-title {\n          color: var(--colors-teal9);\n        }\n      "}),(0,r.jsx)(D,{enabled:("undefined"===typeof localStorage||"1"!==localStorage.getItem("tour.".concat(e.tourName)))&&n,steps:e.steps.map((function(e){return function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})))),r.forEach((function(t){F(e,t,n[t])}))}return e}({},e,{tooltipClass:"introjs-custom"})})),initialStep:0,onBeforeChange:e.onBeforeChange,onExit:function(t){void 0!==t&&localStorage.setItem("tour.".concat(e.tourName),"1")},options:{doneLabel:"Done",disableInteraction:!0}})]})}var R=n(1113),B=n(152),Z=n(4120);function W(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function U(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function $(e,t){return null!=t&&"undefined"!==typeof Symbol&&t[Symbol.hasInstance]?!!t[Symbol.hasInstance](e):e instanceof t}function X(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})))),r.forEach((function(t){U(e,t,n[t])}))}return e}function q(e){return function(e){if(Array.isArray(e))return W(e)}(e)||function(e){if("undefined"!==typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"===typeof e)return W(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return W(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var M={TO_LOWER_CASE:{name:"toLowerCase",apply:function(e,t,n){e.update([e.state.update({changes:{from:t,to:n,insert:e.state.doc.toJSON().join("\n").substring(t,n).toLocaleLowerCase()}})])}},REMOVE_FIELD:{name:"remove",apply:function(e,t){var n=e.state.doc.toJSON().join("\n");e.update([e.state.update({changes:{from:n.substring(0,t).trimEnd().length,to:n.indexOf("\n",t),insert:""}})])}}};function V(e,t){var n=new Set,r=[];return function e(i){if($(i,Z.Zr))return i.children.forEach(e);if($(i,Z.CW)){var a={from:i.init,to:i.init+i.command.trim().length+1};if(q(["string","comment","preamble"]).concat(q(Object.values(R).map((function(e){return e.name})))).includes(i.command.trim().toLowerCase())){if(i.command.trim()!==i.command.trim().toLowerCase()&&r.push(X({},a,{message:"Bibtex entries should be on lowercase letters",severity:"warning",actions:[M.TO_LOWER_CASE],type:"NOT_LOWER_CASE",node:i})),$(i.block,Z.$X)){var s=t.find((function(e){return e.entry===i.command.trim().toLowerCase()})),l=!0,c=!1,d=void 0;try{for(var u,m=s.requiredFields[Symbol.iterator]();!(l=(u=m.next()).done);l=!0){var f=u.value,p="string"===typeof f?[f]:f;0===(0,o.intersection)(i.block.fields.map((function(e){return e.name.trim().toLowerCase()})),p).length&&r.push(X({},a,{message:"Entry missing required field(s) ".concat(p.map((function(e){return'"'.concat(e,'"')})).join(" or ")),severity:"error",type:"MISSING_FIELD",node:i}))}}catch(x){c=!0,d=x}finally{try{l||null==m.return||m.return()}finally{if(c)throw d}}}}else r.push(X({},a,{message:'Unknown bibtex entry type "'.concat(i.command.trim(),'"'),severity:"error",type:"UNKNOWN_ENTRY",node:i}));return e(i.block)}if($(i,Z.$X))return""===(i.key||"").trim()?r.push({from:i.init,to:i.init,message:"No key provided to the entry",severity:"error",type:"NO_KEY",node:i}):n.has(i.key)?r.push({from:i.init,to:i.init+i.key.length,message:"Duplicated entry key",severity:"error",type:"DUPLICATED_KEY",node:i}):n.add(i.key),i.fields.forEach(e);if($(i,Z.wm)){var h=t.find((function(e){return e.entry===i.parent.parent.command.trim().toLowerCase()})),g=i.name.trim().toLowerCase(),y={from:i.init,to:i.init+g.length};if((null===B||void 0===B?void 0:B[(0,o.capitalize)(g)])?(i.name.trim()!==g&&r.push(X({},y,{message:"Field names should on lowercase letters",severity:"warning",actions:[M.TO_LOWER_CASE],type:"NOT_LOWER_CASE",node:i})),i.parent.fields.map((function(e){return e.name.trim().toLowerCase()})).filter((function(e){return g===e})).length>1&&r.push(X({},y,{message:"Duplicated field on the entry",severity:"error",actions:[M.REMOVE_FIELD],type:"DUPLICATED_FIELD",node:i})),h&&h.normalize&&!(0,o.flatten)(h.requiredFields).includes(g)&&r.push(X({},y,{message:'Field "'.concat(i.name.trim(),'" is not mandatory on @').concat(i.parent.parent.command.toLocaleLowerCase()),severity:"info",actions:[M.REMOVE_FIELD],type:"NOT_REQUIRED",node:i}))):r.push(X({},y,{message:"Unknown bibtex field",severity:"error",type:"UNKNOWN_FIELD",node:i,actions:[M.REMOVE_FIELD]})),h.validators){var b,v=null===(b=h.validators)||void 0===b?void 0:b[g];v&&!v.test(i.value.toString())&&r.push({from:i.init,to:i.init+i.name.length,message:"Validation failed for '".concat(i.name,"' (validator: ").concat(v.toString(),")"),severity:"error",type:"VALIDATION_ERROR",node:i})}return i.value.concat.forEach(e)}}(e),r}var G=n(2965),H=n(4454),Y=n(9943),J=n(1691),K=n(7612),Q=n(8621);function ee(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function te(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function ne(e,t){return null!=t&&"undefined"!==typeof Symbol&&t[Symbol.hasInstance]?!!t[Symbol.hasInstance](e):e instanceof t}function re(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})))),r.forEach((function(t){te(e,t,n[t])}))}return e}function oe(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}function ie(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,i=[],a=!0,s=!1;try{for(n=n.call(e);!(a=(r=n.next()).done)&&(i.push(r.value),!t||i.length!==t);a=!0);}catch(l){s=!0,o=l}finally{try{a||null==n.return||n.return()}finally{if(s)throw o}}return i}}(e,t)||function(e,t){if(!e)return;if("string"===typeof e)return ee(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return ee(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var ae,se=(0,K.zo)("div",{height:"100%",display:"flex",flexFlow:"row",columnGap:"1em",fontSize:"14px",width:"calc(100% + 15px)","@sm":{flexFlow:"column"},"@md":{paddingTop:"1em",paddingBottom:"2em"}}),le=(0,K.zo)(Q.default,{position:"absolute",zIndex:999,top:0,height:"100%",width:"100%",backgroundColor:"rgba(255, 255, 255, 0.75)",backdropFilter:"blur(2px)"}),ce=(0,K.zo)(m.ZP,{width:"100%",maxHeight:"100%",border:"1px solid $teal6","& .cm-scroller":{overflow:"scroll"}}),de=(0,K.zo)((function(e){var t=e.hasSyntaxError,n=void 0!==t&&t,o=e.infos,i=void 0===o?0:o,a=e.warnings,s=void 0===a?0:a,l=e.errors,c=void 0===l?0:l,d=oe(e,["hasSyntaxError","infos","warnings","errors"]);return(0,r.jsxs)("div",re({},d,{className:"".concat(d.className," ").concat(n?"has-syntax-error":""),children:[e.children,(0,r.jsxs)("span",{id:"bn-editor-summary",children:[(0,r.jsx)("span",{hidden:!n,children:"Syntax Error!"}),(0,r.jsxs)("span",{hidden:n||!i,children:[i," info(s)"]}),(0,r.jsxs)("span",{hidden:n||!s,children:[s," warning(s)"]}),(0,r.jsxs)("span",{hidden:n||!c,children:[c," error(s)"]})]})]}))}),{display:"flex",position:"relative",width:"100%",opacity:.75,fontWeight:"bolder",border:"2px solid transparent","&.has-syntax-error":{border:"2px solid $tomato8"},"& > span":{position:"absolute",bottom:15,right:"50%",transform:"translate(50%)","& > span:nth-child(2)":{color:"$purple8"},"& > span:nth-child(3)":{color:"$amber8"},"& > span:nth-child(1), & > span:nth-child(4)":{color:"$tomato8"},"& > span + span":{marginLeft:10,textAlign:"end"},"@sm":{width:"100%",right:"inherit",transform:"inherit",textAlign:"center"}},"@sm":{height:"100%"}}),ue=(0,K.zo)("div",{display:"flex",flexFlow:"column",rowGap:10,"@sm":(ae={marginTop:15,rowGap:5,flexFlow:"row",justifyContent:"center"},te(ae,"& > ".concat(f.Z),{display:"inline-flex","& > span":{display:"none"}}),te(ae,"& > ".concat(f.Z," + ").concat(f.Z),{marginLeft:"1em"}),ae)}),me={start:[{regex:/.*@comment/i,token:"comment",push:"comment"},{regex:/(\s*)(@preamble)(\s*{)/i,token:["","variable-2"],push:"braced"},{regex:/(\s*)(@preamble)(\s*\()/i,token:["","variable-2"],push:"parenthesised"},{regex:/(\s*)(@string)(\s*{)/i,token:["","variable-2"],push:"braced"},{regex:/(\s*)(@string)(\s*\()/i,token:["","variable-2"],push:"parenthesised"},{regex:/(\s*)(@[^=#,{}()[\] \t\n\r]+)(\s*\{\s*)([^=#,{}()[\] \t\n\r]+)(\s*,)/,token:["","variable-2"],push:"entry"},{regex:/.*/,token:"comment"}],entry:[{regex:/([^=,{}()[\]\t\n\r]+)(\s*)(=)/,token:["keyword","","operator"]},{regex:/"/,push:"quoted"},{regex:/\d+/i,token:"number"},{regex:/\{/,push:"braced"},{regex:/}/,pop:!0}],quoted:[{regex:/\{/,push:"braced"},{regex:/[^{"]+/,token:"string"},{regex:/"/,pop:!0}],braced:[{regex:/\{/,push:"braced"},{regex:/[^{}]+/,token:"string"},{regex:/\}/,pop:!0}],parenthesised:[{regex:/\{/,token:"comment",push:"braced"},{regex:/[^{)]+/,token:"string"},{regex:/\)/,pop:!0}],comment:[{regex:/.*\}/,token:"comment",pop:!0},{regex:/.*/,token:"comment"}]};function fe(){var e=(0,s.useContext)(Y.Z).config,t=(0,s.useContext)(J.Z),n=t.content,i=t.updateContent,m=t.updateEntry,p=t.findEntry,h=(0,s.useRef)(),g=(0,s.useRef)(),y=(0,s.useState)(!1),b=y[0],v=y[1],x=(0,s.useState)(null),w=x[0],j=x[1],S=(0,s.useState)(null),L=S[0],z=S[1],I=(0,s.useState)({opened:!1}),A=I[0],F=I[1],T=function(e){F({opened:!1}),setTimeout((function(){return F(e)}),250)};(0,s.useEffect)((function(){var e=document.getElementById("bn-editor-codemirror").children[0];j(null===e||void 0===e?void 0:e.clientHeight),z(null===e||void 0===e?void 0:e.clientWidth)}),[]);var D=(0,s.useState)({errors:0,warnings:0,hasSyntaxError:!1}),R=D[0],B=D[1];return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(a(),{children:(0,r.jsx)("title",{children:"Bibtex Normalizer - Editor"})}),(0,r.jsx)(le,{hidden:!b,onClose:function(){return v(!1)}}),(0,r.jsxs)(O,{swipeDirection:"right",children:[(0,r.jsx)(P,{tourName:"editorTour",steps:[{element:"#bn-editor-codemirror",intro:"You can start by copying your references to this editor.",title:"Bibtex editor"},{element:"#bn-editor-summary",intro:"The tool validates the content and puts marks on important parts",title:"Summary"},{element:"#bn-editor-settings",intro:"You can change the settings (e.g., set the required fields, use custom validators, and enable/disable options)",title:"Settings"},{element:"#bn-editor-normalize",intro:'Then, click on "Normalize" to automatically fix several issues',title:"Normalize"},{element:"#bn-editor-codemirror",intro:(0,r.jsxs)("div",{children:[(0,r.jsx)("div",{style:{marginBottom:25},children:"Several issues can be fixed and other ones may need your help. Here, we performed a:"}),(0,r.jsxs)("ul",{style:{textAlign:"start",marginBottom:25},children:[(0,r.jsx)("li",{children:"Code Identation"}),(0,r.jsx)("li",{children:"Fields normalization"}),(0,r.jsx)("li",{children:"Fields sorting"}),(0,r.jsx)("li",{children:"Preserved proper names"})]}),(0,r.jsx)("div",{children:"You can use your own settings acessing the menu"})]}),title:"Bibtex editor"},{element:"#bn-editor-clipboard",intro:"Finally, you can copy the normalized references to clipboard",title:"Download or copy"},{element:"#bn-editor-download",intro:"... or download directly <br> \u270c(-\u203f-)\u270c",title:"Download or copy"}],onBeforeChange:function(e){switch(e){case 0:var t,n,r;if(""===(null===(t=h.current)||void 0===t?void 0:t.view.state.doc.toJSON().join("").trim()))null===(n=h.current)||void 0===n||n.view.update([null===(r=h.current)||void 0===r?void 0:r.view.state.update({changes:{from:0,to:h.current.view.state.doc.length,insert:'@Article{borges2019developers,\n  title="How do developers promote open source projects?",\n  author={Borges, Hudson Silva and Marco Tulio Valente},\n  journal={Computer}, pages={27--33},\n  year={19}\n}'}})]);break;case 4:g.current.click()}}}),(0,r.jsxs)(se,{children:[(0,r.jsx)(de,re({},R,{id:"bn-editor-codemirror",children:(0,r.jsx)(ce,{ref:h,height:w?"".concat(w,"px"):"100%",maxHeight:w?"".concat(w,"px"):"100%",width:L?"".concat(L,"px"):"100%",maxWidth:L?"".concat(L,"px"):"100%",basicSetup:!0,placeholder:'// Paste your bibtex content and click on "Normalize"',value:n||"",extensions:[(0,u.ir)((function(t){var n,r=[];try{r=V((0,Z.C1)(t.state.doc.toJSON().join("\n")),e.entries)}catch(a){ne(a,Z.PZ)&&(n=a)}var i={infos:r.filter((function(e){return"info"===e.severity})).length,warnings:r.filter((function(e){return"warning"===e.severity})).length,errors:r.filter((function(e){return"error"===e.severity})).length,hasSyntaxError:void 0!==n};return(0,o.isEqual)(i,R)||B(i),r})),(0,u.Q2)(),c.il.define((0,d.Q)(me))],onChange:function(e){return i(e)}})})),(0,r.jsxs)(ue,{children:[(0,r.jsxs)(f.Z,{id:"bn-editor-normalize",ref:g,size:"normal",disabled:b,onClick:function(){if(0!==n.length){var t=h.current.view.state.doc.toString(),r=(0,Z.C1)(t);r.children.map((function(e){return ne(e,Z.CW)&&ne(e.block,Z.$X)?e.block:null})).filter((function(e){return null!==e})).forEach((function(e){return m(e)}));var i=!0,a=!1,s=void 0;try{for(var l,c=function(t,n){var r=n.value.node,i=r.block,a=e.entries.find((function(e){return e.entry===r.command.toLowerCase()})),s=p(i.key,(0,G.Z)(i.fields.find((function(e){return"title"===e.name.trim().toLowerCase()})).value));if(!a||!s)return"continue";var l=(0,o.flatten)(a.requiredFields),c=(0,o.difference)(l,i.fields.map((function(e){return e.name.trim().toLowerCase()}))),d=!0,u=!1,m=void 0;try{for(var f,h=c[Symbol.iterator]();!(d=(f=h.next()).done);d=!0){var g=f.value;if(void 0!==(null===s||void 0===s?void 0:s[g])){var y=new Z.wm(NaN,i,g);i.fields.push(y),new Z.q4(NaN,y.value,null===s||void 0===s?void 0:s[g])}}}catch(b){u=!0,m=b}finally{try{d||null==h.return||h.return()}finally{if(u)throw m}}},d=V(r,e.entries).filter((function(e){return"MISSING_FIELD"===e.type}))[Symbol.iterator]();!(i=(l=d.next()).done);i=!0)c(0,l)}catch(u){a=!0,s=u}finally{try{i||null==d.return||d.return()}finally{if(a)throw s}}h.current.view.update([h.current.view.state.update({changes:{from:0,to:h.current.view.state.doc.length,insert:(0,G.Z)(r,e)}})]),Object.entries((0,o.countBy)(V(r,e.entries),"severity")).forEach((function(e){var t=ie(e,2),n=t[0],r=t[1];return H.B({action:"normalize",category:"editor",label:n,value:Number(r).toString()})})),T({opened:!0,title:"Normalized",description:"References normalized and editor updated"})}},children:[(0,r.jsx)(l.LTV,{style:{height:"1.25em",width:"1.25em"}})," ",(0,r.jsx)("span",{children:"Normalize"})]}),(0,r.jsxs)(f.Z,{id:"bn-editor-settings",size:"normal",color:"normal",bordered:!0,onClick:function(){return v(!b)},children:[(0,r.jsx)(l.N_v,{style:{height:"1.25em",width:"1.25em"}})," ",(0,r.jsx)("span",{children:"Settings"})]}),(0,r.jsxs)(f.Z,{id:"bn-editor-clipboard",size:"normal",color:"normal",bordered:!0,disabled:b,onClick:function(){navigator.clipboard.writeText(h.current.view.state.doc.toJSON().join("\n")),H.B({action:"copy_to_clipboard",category:"editor",label:"length",value:Number(h.current.view.state.doc.length).toString()}),T({opened:!0,title:"Copied",description:"Content copied to clipboard"})},children:[(0,r.jsx)(l.mcF,{style:{height:"1.25em",width:"1.25em"}})," ",(0,r.jsx)("span",{children:"Copy"})]}),(0,r.jsxs)(f.Z,{id:"bn-editor-download",size:"normal",color:"normal",bordered:!0,disabled:b,onClick:function(){var e=document.createElement("a"),t=new Blob([h.current.view.state.doc.toJSON().join("\n")],{type:"application/x-bibtex",endings:"transparent"});e.href=URL.createObjectURL(t),e.download="references.bib",document.body.appendChild(e),e.click(),e.remove(),H.B({action:"download",category:"editor",label:"length",value:Number(h.current.view.state.doc.length).toString()})},children:[(0,r.jsx)(l.P9U,{style:{height:"1.25em",width:"1.25em"}})," ",(0,r.jsx)("span",{children:"Download"})]}),(0,r.jsxs)(f.Z,{id:"bn-editor-clear",size:"normal",bordered:!0,color:"warning",disabled:b,onClick:function(){h.current.view.update([h.current.view.state.update({changes:{from:0,to:h.current.view.state.doc.length,insert:""}})]),H.B({action:"editor_clear",category:"editor",label:"length",value:Number(h.current.view.state.doc.length).toString()}),T({opened:!0,title:"Cleared",description:"Content cleared"})},children:[(0,r.jsx)(l.YFK,{style:{height:"1em",width:"1em"}})," ",(0,r.jsx)("span",{children:"Clear"})]})]}),(0,r.jsxs)(C,{open:A.opened,onOpenChange:function(e){return F(re({},A,{opened:e}))},duration:3e3,children:[(0,r.jsxs)(k,{css:{color:"$teal9"},children:["\u2714 | ",A.title]}),(0,r.jsx)(N,{children:A.description}),(0,r.jsx)(_,{asChild:!0,altText:"Close",children:(0,r.jsx)(f.Z,{color:"transparent",children:(0,r.jsx)(l.bjh,{})})})]}),(0,r.jsx)(E,{})]})]})]})}}},function(e){e.O(0,[762,189,222,621,774,888,179],(function(){return t=6281,e(e.s=t);var t}));var t=e.O();_N_E=t}]);