(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[154],{6448:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/editor",function(){return n(6023)}])},6625:function(e,t,n){"use strict";var r=n(6744);t.Z=(0,r.zo)("button",{display:"flex",justifyContent:"center",alignItems:"center",columnGap:5,padding:"0.5em 1em",border:"1px solid",borderRadius:"8px",fontWeight:"bolder",cursor:"pointer",variants:{rounded:{true:{padding:"0.5em",borderRadius:"100%"}},bordered:{true:{backgroundColor:"transparent !important"}},disabled:{true:{opacity:.5,cursor:"not-allowed"}},color:{transparent:{backgroundColor:"transparent",borderColor:"transparent"},normal:{backgroundColor:"$gray11",borderColor:"$gray11",color:"White"},primary:{backgroundColor:"$teal9",borderColor:"$teal10",color:"White"},warning:{color:"White",border:"1px solid $tomato10",backgroundColor:"$tomato10",fontWeight:"bolder"}},size:{small:{fontSize:"0.8em"},normal:{fontSize:"1em"},large:{fontSize:"1.2em"}}},compoundVariants:[{color:"normal",bordered:!0,css:{color:"$gray11",borderColor:"$gray11"}},{color:"primary",bordered:!0,css:{color:"$teal9",borderColor:"$teal9"}},{color:"warning",bordered:!0,css:{color:"$tomato10",borderColor:"$tomato10"}}],defaultVariants:{color:"primary",size:"normal",rounded:!1,bordered:!1}})},6023:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return Le}});var r=n(5893),o=n(6486),i=n(9008),a=n(7294),s=n(2370),c=n(4125),l=n(8519),u=n(9207),d=n(6722),p=n(6625),f=n(7629),m=n(6744),h=(0,m.F4)({"0%":{opacity:1},"100%":{opacity:0}}),y=(0,m.F4)({from:{transform:"translateX(calc(100% + ".concat(25,"px))")},to:{transform:"translateX(0)"}}),b=(0,m.F4)({from:{transform:"translateX(var(--radix-toast-swipe-end-x))"},to:{transform:"translateX(calc(100% + ".concat(25,"px))")}}),g=(0,m.zo)(f.l_,{position:"fixed",bottom:0,right:0,display:"flex",flexDirection:"column",padding:25,gap:10,width:390,maxWidth:"100vw",margin:0,listStyle:"none",zIndex:2147483647,outline:"none"}),v=(0,m.zo)(f.fC,{backgroundColor:"White",borderRadius:6,border:"1px solid $teal8",boxShadow:"hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",padding:15,display:"grid",gridTemplateAreas:'"title action" "description action"',gridTemplateColumns:"auto max-content",columnGap:15,alignItems:"center","@media (prefers-reduced-motion: no-preference)":{'&[data-state="open"]':{animation:"".concat(y," 150ms cubic-bezier(0.16, 1, 0.3, 1)")},'&[data-state="closed"]':{animation:"".concat(h," 100ms ease-in forwards")},'&[data-swipe="move"]':{transform:"translateX(var(--radix-toast-swipe-move-x))"},'&[data-swipe="cancel"]':{transform:"translateX(0)",transition:"transform 200ms ease-out"},'&[data-swipe="end"]':{animation:"".concat(b," 100ms ease-out forwards")}}}),w=(0,m.zo)(f.Dx,{gridArea:"title",marginBottom:5,fontWeight:"bolder",fontSize:"1.1em"}),x=(0,m.zo)(f.dk,{gridArea:"description",margin:0,color:"$gray10",fontSize:"0.9em",lineHeight:1.3}),j=(0,m.zo)(f.aU,{gridArea:"action"}),k=f.zt,C=g,S=v,O=w,z=x,E=j,A=(f.x8,n(4051)),L=n.n(A);n(982);function P(e,t,n,r,o,i,a){try{var s=e[i](a),c=s.value}catch(l){return void n(l)}s.done?t(c):Promise.resolve(c).then(r,o)}function $(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var N,F=(0,n(5152).default)((N=L().mark((function e(){var t;return L().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Promise.all([n.e(774),n.e(364)]).then(n.bind(n,7762));case 2:return t=e.sent.Steps,e.abrupt("return",t);case 4:case"end":return e.stop()}}),e)})),function(){var e=this,t=arguments;return new Promise((function(n,r){var o=N.apply(e,t);function i(e){P(o,n,r,i,a,"next",e)}function a(e){P(o,n,r,i,a,"throw",e)}i(void 0)}))}),{loadableGenerated:{webpack:function(){return[7762]}},ssr:!1});function _(e){var t=(0,a.useState)(!1),n=t[0],o=t[1];return(0,a.useEffect)((function(){setTimeout((function(){return o(!0)}),500)}),[]),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("style",{children:"\n        .introjs-custom .introjs-tooltiptext {\n          text-align: center;\n          vertical-align: middle;\n        }\n\n        .introjs-custom .introjs-tooltip-title {\n          color: var(--colors-teal9);\n        }\n      "}),(0,r.jsx)(F,{enabled:("undefined"===typeof localStorage||"1"!==localStorage.getItem("tour.".concat(e.tourName)))&&n,steps:e.steps.map((function(e){return function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})))),r.forEach((function(t){$(e,t,n[t])}))}return e}({},e,{tooltipClass:"introjs-custom"})})),initialStep:0,onBeforeChange:e.onBeforeChange,onExit:function(t){void 0!==t&&localStorage.setItem("tour.".concat(e.tourName),"1")}})]})}var I=n(1061),R=n(5442);function T(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function B(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function D(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}function q(e,t,n){return q=D()?Reflect.construct:function(e,t,n){var r=[null];r.push.apply(r,t);var o=new(Function.bind.apply(e,r));return n&&X(o,n.prototype),o},q.apply(null,arguments)}function V(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function Z(e){return Z=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},Z(e)}function U(e,t){return null!=t&&"undefined"!==typeof Symbol&&t[Symbol.hasInstance]?!!t[Symbol.hasInstance](e):e instanceof t}function W(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})))),r.forEach((function(t){V(e,t,n[t])}))}return e}function M(e,t){return!t||"object"!==J(t)&&"function"!==typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function X(e,t){return X=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},X(e,t)}function H(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,i=[],a=!0,s=!1;try{for(n=n.call(e);!(a=(r=n.next()).done)&&(i.push(r.value),!t||i.length!==t);a=!0);}catch(c){s=!0,o=c}finally{try{a||null==n.return||n.return()}finally{if(s)throw o}}return i}}(e,t)||Y(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function G(e){return function(e){if(Array.isArray(e))return T(e)}(e)||function(e){if("undefined"!==typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||Y(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var J=function(e){return e&&"undefined"!==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e};function Y(e,t){if(e){if("string"===typeof e)return T(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(n):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?T(e,t):void 0}}function Q(e){var t="function"===typeof Map?new Map:void 0;return Q=function(e){if(null===e||!function(e){return-1!==Function.toString.call(e).indexOf("[native code]")}(e))return e;if("function"!==typeof e)throw new TypeError("Super expression must either be null or a function");if("undefined"!==typeof t){if(t.has(e))return t.get(e);t.set(e,n)}function n(){return q(e,arguments,Z(this).constructor)}return n.prototype=Object.create(e.prototype,{constructor:{value:n,enumerable:!1,writable:!0,configurable:!0}}),X(n,e)},Q(e)}function K(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=Z(e);if(t){var o=Z(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return M(this,n)}}var ee=function e(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];B(this,e),this.init=t,this.children=n,this.type="root"},te=function e(t,n,r){B(this,e),this.init=t,this.parent=n,this.text=r,this.type="text",n.children.push(this)},ne=function e(t,n){B(this,e),this.init=t,this.parent=n,this.type="block",this.command="",n.children.push(this)},re=function e(t,n,r,o,i){B(this,e),this.init=t,this.parent=n,this.raw=r,this.braces=o,this.parens=i,this.type="comment",n.block=this},oe=function e(t,n,r,o,i){B(this,e),this.init=t,this.parent=n,this.raw=r,this.braces=o,this.parens=i,this.type="preamble",n.block=this},ie=function e(t,n,r,o,i){B(this,e),this.init=t,this.parent=n,this.raw=r,this.braces=o,this.parens=i,this.type="string",n.block=this},ae=function e(t,n){B(this,e),this.init=t,this.parent=n,this.type="entry",n.block=this,this.fields=[]},se=function e(t,n){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"";B(this,e),this.init=t,this.parent=n,this.name=r,this.type="field",this.value=new ce(t,this)},ce=function(){function e(t,n){B(this,e),this.init=t,this.parent=n,this.type="concat",this.canConsumeValue=!0,this.concat=[]}return e.prototype.toString=function(){return this.concat.map((function(e){return e.value})).join("").trim()},e}(),le=function e(t,n,r){B(this,e),this.init=t,this.parent=n,this.value=r,this.type="literal",n.concat.push(this)},ue=function e(t,n){B(this,e),this.init=t,this.parent=n,this.type="braced",this.value="",this.depth=0,n.concat.push(this)},de=function e(t,n){B(this,e),this.init=t,this.parent=n,this.type="quoted",this.value="",this.depth=0,n.concat.push(this)};function pe(e,t){for(var n=function(n){var o=e[n],i=e[n-1];switch("\n"===o&&(c++,l=0),l++,s.type){case"root":s="@"===o?new ne(n,s):new te(n,s,o);break;case"text":"@"===o&&/[\s\r\n}]/.test(i)?s=new ne(n,s.parent):s.text+=o;break;case"block":if("@"===o){var a=s.parent.children[s.parent.children.length-2];"text"===(null===a||void 0===a?void 0:a.type)?a.text+="@"+s.command:(s.parent.children.pop(),new te(n,s.parent,"@"+s.command),s.parent.children.push(s)),s.command=""}else if("{"===o||"("===o){var u=s.command.trim();if(""===u||/\s/.test(u))s.parent.children.pop(),s=new te(n,s.parent,"@"+s.command+o);else{s.command=u;var d=s.command.toLowerCase(),p=H("{"===o?[1,0]:[0,1],2),f=p[0],m=p[1],h="@"+d+o;switch(d){case"string":s=new ie(n,s,h,f,m);break;case"preamble":s=new oe(n,s,h,f,m);break;case"comment":s=new re(n,s,h,f,m);break;default:s=new ae(n+1,s)}}}else o.match(/[=#,})\[\]]/)?(s.parent.children.pop(),s=new te(n,s.parent,"@"+s.command+o)):s.command+=o;break;case"comment":case"string":case"preamble":"{"===o?s.braces++:"}"===o?s.braces--:"("===o?s.parens++:")"===o&&s.parens--,s.raw+=o,0===s.braces&&0===s.parens&&(s=s.parent.parent);break;case"entry":if("}"===o||")"===o)s=s.parent.parent;else if(","===o)s=new se(n+1,s);else if("="===o){if(!s.key)throw new me(e,s,n,c,l,r);var y=new se(n+1,s,s.key);s.fields.push(y),s.key=void 0,s=y.value}else if(fe(o));else{if(o.match(/[=#,{}()\[\]]/))throw new me(e,s,n,c,l,r);var b;s.key=(null!==(b=s.key)&&void 0!==b?b:"")+o}break;case"field":null===t||void 0===t||t.find((function(e){return e.entry===s.parent.parent.command.trim().toLocaleLowerCase()}));if("}"===o||")"===o)s.name=s.name.trim(),s=s.parent.parent.parent;else if("="===o)s.name=s.name.trim(),s=s.value;else if(","===o)s.name=s.name.trim(),s=new se(n+1,s.parent);else{if(/[=,{}()\[\]]/.test(o))throw new me(e,s,n,c,l,r);s.name?s.name+=o:fe(o)?s.init+=1:(s.parent.fields.push(s),s.name=o)}break;case"concat":if(fe(o))break;if(s.canConsumeValue){if(/[#=,}()\[\]]/.test(o))throw new me(e,s,n,c,l,r);s.canConsumeValue=!1,s="{"===o?new ue(n,s):'"'===o?new de(n,s):new le(n,s,o)}else if(","===o)s=new se(n+1,s.parent.parent);else if("}"===o||")"===o){var g=t.find((function(e){return e.entry===s.parent.parent.parent.command.trim().toLocaleLowerCase()}));if(g){var v=s.parent.parent.fields.map((function(e){return e.name.trim().toLowerCase()})),w=s.parent.parent.parent.init,x=w+s.parent.parent.parent.command.length+1;g.requiredFields.forEach((function(e){v.filter((function(t){return"string"===typeof e?t===e:e.includes(t)})).length>0||r.push({from:w,to:x,message:"Missing required field ".concat(("string"===typeof e?[e]:e).map((function(e){return'"'.concat(e,'"')})).join(" or ")),severity:"error"})}))}s=s.parent.parent.parent.parent}else{if("#"!==o)throw new me(e,s,n,c,l,r);s.canConsumeValue=!0}break;case"literal":fe(o)?s=s.parent:","===o?s=new se(n+1,s.parent.parent.parent):"}"===o?s=s.parent.parent.parent.parent.parent:"#"===o?(s=s.parent).canConsumeValue=!0:s.value+=o;break;case"braced":if("}"===o&&0===s.depth){s=s.parent;break}"{"===o?s.depth++:"}"===o&&s.depth--,s.value+=o;break;case"quoted":if('"'===o&&0===s.depth){s=s.parent;break}if("{"===o)s.depth++;else if("}"===o&&(s.depth--,s.depth<0))throw new me(e,s,n,c,l,r);s.value+=o}},r=Array(),i=new Set,a=new ee(0),s=a,c=1,l=0,u=0;u<e.length;u++)n(u);return function e(n){if(U(n,ee))return n.children.forEach(e);if(U(n,ne)){var a={from:n.init,to:n.init+n.command.trim().length+1};return G(["string","comment","preamble"]).concat(G(Object.values(I).map((function(e){return e.name})))).includes(n.command.trim().toLowerCase())?n.command.trim()!==n.command.trim().toLowerCase()&&r.push(W({},a,{message:"Bibtex entries should be lower case letters",severity:"warning"})):r.push(W({},a,{message:'Unknown bibtex entry "'.concat(n.command.trim(),'"'),severity:"error"})),e(n.block)}if(U(n,ae))return""===(n.key||"").trim()?r.push({from:n.init,to:n.init,message:"No key provided to the reference",severity:"error"}):i.has(n.key)?r.push({from:n.init,to:n.init+n.key.length,message:"Duplicated reference key",severity:"error"}):i.add(n.key),n.fields.forEach(e);if(U(n,se)){var s=t.find((function(e){return e.entry===n.parent.parent.command.trim().toLowerCase()})),c=n.name.trim().toLowerCase(),l={from:n.init,to:n.init+c.length};if((null===R||void 0===R?void 0:R[(0,o.capitalize)(c)])?(n.name.trim()!==c&&r.push(W({},l,{message:"Field names should on lower case",severity:"warning"})),n.parent.fields.map((function(e){return e.name.trim().toLowerCase()})).filter((function(e){return c===e})).length>1&&r.push(W({},l,{message:"Duplicated field on the reference",severity:"error"})),s&&s.normalize&&!(0,o.flatten)(s.requiredFields).includes(c)&&r.push(W({},l,{message:'Field "'.concat(n.name.trim(),'" is not mandatory on @').concat(n.parent.parent.command.toLocaleLowerCase()),severity:"info"}))):r.push(W({},l,{message:"Invalid bibtex field name",severity:"error"})),s.validators){var u,d=null===(u=s.validators)||void 0===u?void 0:u[c];d&&!d.test(n.value.toString())&&r.push({from:n.init,to:n.init+n.name.length,message:"Validation failed for '".concat(n.name,"' (validator: ").concat(d.toString(),")"),severity:"error"})}return n.value.concat.forEach(e)}}(a),[a,r]}function fe(e){return/^[ \t\n\r]*$/.test(e)}var me=function(e){!function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&X(e,t)}(n,e);var t=K(n);function n(e,r,o,i,a,s){var c;return B(this,n),(c=t.call(this,"Line ".concat(i,":").concat(a,": Syntax Error in ").concat(r.type,"\n")+e.slice(Math.max(0,o-20),o)+">>"+e[o]+"<<"+e.slice(o+1,o+20))).node=r,c.line=i,c.column=a,c.diagnostic=s,c.name="Syntax Error",c.char=e[o],c}return n}(Q(Error));function he(e,t){if(U(e,ee))return e.children.map((function(e){return he(e,t)})).join("\n");if(U(e,te))return e.text.trim();if(U(e,ne))return"@".concat(e.command.toLowerCase()," {").concat(he(e.block,t),"}");if(U(e,re)||U(e,oe)||U(e,ie)){var n=H(e.raw.trim().match(/^@\w+[{"](.*)[}"]$/i),2)[1];return" ".concat(n.trim()," ")}if(U(e,ae))return"".concat(e.key,",\n  ").concat(e.fields.sort((function(t,n){return function(e,t,n){var r=Object.values(I).find((function(t){return t.name===e.trim().toLowerCase()}));if(!r)return 0;var i=(0,o.flatten)(G(r.requiredFields).concat(G(r.optionalFields))),a=[i.indexOf(t.trim().toLowerCase()),i.indexOf(n.trim().toLowerCase())],s=a[0],c=a[1];return(s>=0?s:Number.MAX_VALUE)-(c>=0?c:Number.MAX_VALUE)}(e.parent.command,t.name,n.name)})).filter((function(e){if(!(null===t||void 0===t?void 0:t.normalizer.removeNotRequiredFields))return!0;var n=null===t||void 0===t?void 0:t.entries.find((function(t){return t.entry===e.parent.parent.command.trim().toLowerCase()}));return(0,o.flatten)((null===n||void 0===n?void 0:n.requiredFields)||[]).includes(e.name.trim().toLowerCase())})).map((function(e){var n=e.value.concat.map((function(n){var r=["month","year"].includes(e.name.trim().toLowerCase())?"literal":(null===t||void 0===t?void 0:t.normalizer.awaysUseBraces)?"braced":n.type,o=n.value.trim();return"title"===e.name.trim().toLowerCase()&&t.normalizer.escapeProperNames.enabled&&t.normalizer.escapeProperNames.names.forEach((function(e){o=" ".concat(o," ").replaceAll(new RegExp("^(.*)([\\s{]+|^)(".concat(e,")([\\s}]+|$)(.*)$"),"gi"),"$1 {".concat(e,"} $5")).replaceAll(/\s+/g," ").trim()})),"author"===e.name.trim().toLowerCase()&&t.normalizer.formatAuthorField&&(o=o.split(/\sand\s/i).map((function(e){return e.replace(/(.*),(.*)/,"$2 $1").replaceAll(/\s+/g," ").trim()})).join(" and ")),function(e,t){return"braced"===t?"{ ".concat(e," }"):"quoted"===t?'"'.concat(e,'"'):e}(o,r)})).join("");return"".concat(function(e){var t,n=(t=Math).max.apply(t,G(Object.keys(R).map((function(e){return e.length}))));return e.padEnd(n," ")}(e.name.toLowerCase())," = ").concat(n)})).join(",\n  "),"\n");throw new Error("Unknown Bibtex AST Node (".concat(e.type,")"))}var ye=n(9943),be=n(454),ge=n(7612);function ve(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function we(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function xe(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})))),r.forEach((function(t){we(e,t,n[t])}))}return e}function je(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}function ke(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,i=[],a=!0,s=!1;try{for(n=n.call(e);!(a=(r=n.next()).done)&&(i.push(r.value),!t||i.length!==t);a=!0);}catch(c){s=!0,o=c}finally{try{a||null==n.return||n.return()}finally{if(s)throw o}}return i}}(e,t)||function(e,t){if(!e)return;if("string"===typeof e)return ve(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return ve(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var Ce,Se=(0,ge.zo)("div",{height:"100%",display:"flex",flexFlow:"row",columnGap:"1em",fontSize:"14px",width:"calc(100% + 15px)","@sm":{flexFlow:"column"},"@md":{paddingTop:"1em",paddingBottom:"2em"}}),Oe=(0,ge.zo)(d.ZP,{width:"100%",maxHeight:"100%",border:"1px solid $teal6","& .cm-scroller":{overflow:"scroll"}}),ze=(0,ge.zo)((function(e){var t=e.hasSyntaxError,n=void 0!==t&&t,o=e.infos,i=void 0===o?0:o,a=e.warnings,s=void 0===a?0:a,c=e.errors,l=void 0===c?0:c,u=je(e,["hasSyntaxError","infos","warnings","errors"]);return(0,r.jsxs)("div",xe({},u,{className:"".concat(u.className," ").concat(n?"has-syntax-error":""),children:[e.children,(0,r.jsxs)("span",{id:"bn-editor-summary",children:[(0,r.jsx)("span",{hidden:!n,children:"Syntax Error!"}),(0,r.jsxs)("span",{hidden:n||!i,children:[i," info(s)"]}),(0,r.jsxs)("span",{hidden:n||!s,children:[s," warning(s)"]}),(0,r.jsxs)("span",{hidden:n||!l,children:[l," error(s)"]})]})]}))}),{display:"flex",position:"relative",width:"100%",opacity:.75,fontWeight:"bolder",border:"2px solid transparent","&.has-syntax-error":{border:"2px solid $tomato8"},"& > span":{position:"absolute",bottom:15,right:"50%",transform:"translate(50%)","& > span:nth-child(2)":{color:"$purple8"},"& > span:nth-child(3)":{color:"$amber8"},"& > span:nth-child(1), & > span:nth-child(4)":{color:"$tomato8"},"& > span + span":{marginLeft:10,textAlign:"end"},"@sm":{width:"100%",right:"inherit",transform:"inherit",textAlign:"center"}},"@sm":{height:"100%"}}),Ee=(0,ge.zo)("div",{display:"flex",flexFlow:"column",rowGap:10,"@sm":(Ce={marginTop:15,rowGap:5,flexFlow:"row",justifyContent:"center"},we(Ce,"& > ".concat(p.Z),{display:"inline-flex","& > span":{display:"none"}}),we(Ce,"& > ".concat(p.Z," + ").concat(p.Z),{marginLeft:"1em"}),Ce)}),Ae={start:[{regex:/.*@comment/i,token:"comment",push:"comment"},{regex:/(\s*)(@preamble)(\s*{)/i,token:["","variable-2"],push:"braced"},{regex:/(\s*)(@preamble)(\s*\()/i,token:["","variable-2"],push:"parenthesised"},{regex:/(\s*)(@string)(\s*{)/i,token:["","variable-2"],push:"braced"},{regex:/(\s*)(@string)(\s*\()/i,token:["","variable-2"],push:"parenthesised"},{regex:/(\s*)(@[^=#,{}()[\] \t\n\r]+)(\s*\{\s*)([^=#,{}()[\] \t\n\r]+)(\s*,)/,token:["","variable-2"],push:"entry"},{regex:/.*/,token:"comment"}],entry:[{regex:/([^=,{}()[\]\t\n\r]+)(\s*)(=)/,token:["keyword","","operator"]},{regex:/"/,push:"quoted"},{regex:/\d+/i,token:"number"},{regex:/\{/,push:"braced"},{regex:/}/,pop:!0}],quoted:[{regex:/\{/,push:"braced"},{regex:/[^{"]+/,token:"string"},{regex:/"/,pop:!0}],braced:[{regex:/\{/,push:"braced"},{regex:/[^{}]+/,token:"string"},{regex:/\}/,pop:!0}],parenthesised:[{regex:/\{/,token:"comment",push:"braced"},{regex:/[^{)]+/,token:"string"},{regex:/\)/,pop:!0}],comment:[{regex:/.*\}/,token:"comment",pop:!0},{regex:/.*/,token:"comment"}]};function Le(){var e=(0,a.useContext)(ye.Z).config,t=(0,a.useContext)(be.Z),n=t.content,d=t.updateContent,f=(0,a.useRef)(),m=(0,a.useRef)(),h=(0,a.useState)(null),y=h[0],b=h[1],g=(0,a.useState)(null),v=g[0],w=g[1],x=(0,a.useState)({opened:!1}),j=x[0],A=x[1],L=function(e){A({opened:!1}),setTimeout((function(){return A(e)}),250)};(0,a.useEffect)((function(){var e=document.getElementById("bn-editor-codemirror").children[0];b(null===e||void 0===e?void 0:e.clientHeight),w(null===e||void 0===e?void 0:e.clientWidth)}),[]);var P=(0,a.useState)({errors:0,warnings:0,hasSyntaxError:!1}),$=P[0],N=P[1];return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(i.default,{children:(0,r.jsx)("title",{children:"Bibtex Normalizer - Editor"})}),(0,r.jsxs)(k,{swipeDirection:"right",children:[(0,r.jsx)(_,{tourName:"editorTour",steps:[{element:"#bn-editor-codemirror",intro:"You can start by copying your references to this editor.",title:"Bibtex editor"},{element:"#bn-editor-summary",intro:"The editor validates the content and puts marks on important parts",title:"Summary"},{element:"#bn-editor-normalize",intro:'Click on "Normalize" to automatically fix several issues',title:"Normalize"},{element:"#bn-editor-codemirror",intro:(0,r.jsxs)("div",{children:[(0,r.jsx)("div",{style:{marginBottom:25},children:"Several issues can be fixed and other ones may need your help. Here, we performed a:"}),(0,r.jsxs)("ul",{style:{textAlign:"start",marginBottom:25},children:[(0,r.jsx)("li",{children:"Code Identation"}),(0,r.jsx)("li",{children:"Fields normalization"}),(0,r.jsx)("li",{children:"Fields sorting"}),(0,r.jsx)("li",{children:"Preserved proper names"})]}),(0,r.jsx)("div",{children:"You can use your own settings acessing the menu"})]}),title:"Bibtex editor"},{element:"#bn-editor-clipboard",intro:"Finally, you can copy the normalized references to clipboard",title:"Download or copy"},{element:"#bn-editor-download",intro:"... or download directly <br> \u270c(-\u203f-)\u270c",title:"Download or copy"}],onBeforeChange:function(e){switch(e){case 0:var t,n;null===(t=f.current)||void 0===t||t.view.update([null===(n=f.current)||void 0===n?void 0:n.view.state.update({changes:{from:0,to:f.current.view.state.doc.length,insert:'@Article{borges2019developers,\n  title="How do developers promote open source projects?",\n  author={Borges, Hudson Silva and Marco Tulio Valente},\n  journal={Computer}, pages={27--33},\n  year={19}\n}'}})]);break;case 3:m.current.click()}}}),(0,r.jsxs)(Se,{children:[(0,r.jsx)(ze,xe({},$,{id:"bn-editor-codemirror",children:(0,r.jsx)(Oe,{ref:f,height:y?"".concat(y,"px"):"100%",maxHeight:y?"".concat(y,"px"):"100%",width:v?"".concat(v,"px"):"100%",maxWidth:v?"".concat(v,"px"):"100%",basicSetup:!0,placeholder:'// Paste your bibtex content and click on "Normalize"',value:n||"",extensions:[(0,l.ir)((function(t){var n,r,i,a;try{r=ke(pe(t.state.doc.toJSON().join("\n"),e.entries),2)[1]}catch(c){i=c,(null!=(a=me)&&"undefined"!==typeof Symbol&&a[Symbol.hasInstance]?a[Symbol.hasInstance](i):i instanceof a)&&(r=(n=c).diagnostic)}var s={infos:r.filter((function(e){return"info"===e.severity})).length,warnings:r.filter((function(e){return"warning"===e.severity})).length,errors:r.filter((function(e){return"error"===e.severity})).length,hasSyntaxError:void 0!==n};return(0,o.isEqual)(s,$)||N(s),r})),(0,l.Q2)(),u.i.define((0,c.Q)(Ae))],onChange:function(e){return d(e)}})})),(0,r.jsxs)(Ee,{children:[(0,r.jsxs)(p.Z,{id:"bn-editor-normalize",ref:m,size:"normal",onClick:function(){if(0!==n.length){var t=he(pe(f.current.view.state.doc.toString(),e.entries)[0],e);f.current.view.update([f.current.view.state.update({changes:{from:0,to:f.current.view.state.doc.length,insert:t}})]),L({opened:!0,title:"Normalized",description:"References normalized and editor updated"})}},children:[(0,r.jsx)(s.LTV,{style:{height:"1em",width:"1em"}})," Normalize"]}),(0,r.jsxs)(p.Z,{id:"bn-editor-clipboard",size:"normal",color:"normal",bordered:!0,onClick:function(){0!==n.length&&(navigator.clipboard.writeText(f.current.view.state.doc.toJSON().join("\n")),L({opened:!0,title:"Copied",description:"Content copied to clipboard"}))},children:[(0,r.jsx)(s.mcF,{style:{height:"1em",width:"1em"}})," ",(0,r.jsx)("span",{children:"Copy"})]}),(0,r.jsxs)(p.Z,{id:"bn-editor-download",size:"normal",color:"normal",bordered:!0,onClick:function(){if(0!==n.length){var e=document.createElement("a"),t=new Blob([f.current.view.state.doc.toJSON().join("\n")],{type:"application/x-bibtex",endings:"transparent"});e.href=URL.createObjectURL(t),e.download="references.bib",document.body.appendChild(e),e.click(),e.remove()}},children:[(0,r.jsx)(s.P9U,{style:{height:"1em",width:"1em"}})," ",(0,r.jsx)("span",{children:"Download"})]}),(0,r.jsxs)(p.Z,{id:"bn-editor-clear",size:"normal",bordered:!0,color:"warning",onClick:function(){0!==n.length&&(f.current.view.update([f.current.view.state.update({changes:{from:0,to:f.current.view.state.doc.length,insert:""}})]),L({opened:!0,title:"Cleared",description:"Content cleared"}))},children:[(0,r.jsx)(s.YFK,{style:{height:"1em",width:"1em"}})," ",(0,r.jsx)("span",{children:"Clear"})]})]}),(0,r.jsxs)(S,{open:j.opened,onOpenChange:function(e){return A(xe({},j,{opened:e}))},duration:3e3,children:[(0,r.jsxs)(O,{css:{color:"$teal9"},children:["\u2714 | ",j.title]}),(0,r.jsx)(z,{children:j.description}),(0,r.jsx)(E,{asChild:!0,altText:"Close",children:(0,r.jsx)(p.Z,{color:"transparent",children:(0,r.jsx)(s.bjh,{})})})]}),(0,r.jsx)(C,{})]})]})]})}}},function(e){e.O(0,[662,762,711,774,888,179],(function(){return t=6448,e(e.s=t);var t}));var t=e.O();_N_E=t}]);