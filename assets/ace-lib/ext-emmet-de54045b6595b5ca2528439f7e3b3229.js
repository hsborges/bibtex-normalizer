ace.define("ace/snippets",["require","exports","module","ace/lib/oop","ace/lib/event_emitter","ace/lib/lang","ace/range","ace/anchor","ace/keyboard/hash_handler","ace/tokenizer","ace/lib/dom","ace/editor"],function(e,t,n){"use strict";var i=e("./lib/oop"),r=e("./lib/event_emitter").EventEmitter,s=e("./lib/lang"),a=e("./range").Range,o=e("./anchor").Anchor,c=e("./keyboard/hash_handler").HashHandler,h=e("./tokenizer").Tokenizer,u=a.comparePoints,l=function(){this.snippetMap={},this.snippetNameMap={}};(function(){i.implement(this,r),this.getTokenizer=function(){function e(e,t,n){return e=e.substr(1),/^\d+$/.test(e)&&!n.inFormatString?[{tabstopId:parseInt(e,10)}]:[{text:e}]}function t(e){return"(?:[^\\\\"+e+"]|\\\\.)"}return l.$tokenizer=new h({start:[{regex:/:/,onMatch:function(e,t,n){return n.length&&n[0].expectIf?(n[0].expectIf=!1,n[0].elseBranch=n[0],[n[0]]):":"}},{regex:/\\./,onMatch:function(e,t,n){var i=e[1];return"}"==i&&n.length?e=i:"`$\\".indexOf(i)!=-1?e=i:n.inFormatString&&("n"==i?e="\n":"t"==i?e="\n":"ulULE".indexOf(i)!=-1&&(e={changeCase:i,local:i>"a"})),[e]}},{regex:/}/,onMatch:function(e,t,n){return[n.length?n.shift():e]}},{regex:/\$(?:\d+|\w+)/,onMatch:e},{regex:/\$\{[\dA-Z_a-z]+/,onMatch:function(t,n,i){var r=e(t.substr(1),n,i);return i.unshift(r[0]),r},next:"snippetVar"},{regex:/\n/,token:"newline",merge:!1}],snippetVar:[{regex:"\\|"+t("\\|")+"*\\|",onMatch:function(e,t,n){n[0].choices=e.slice(1,-1).split(",")},next:"start"},{regex:"/("+t("/")+"+)/(?:("+t("/")+"*)/)(\\w*):?",onMatch:function(e,t,n){var i=n[0];return i.fmtString=e,e=this.splitRegex.exec(e),i.guard=e[1],i.fmt=e[2],i.flag=e[3],""},next:"start"},{regex:"`"+t("`")+"*`",onMatch:function(e,t,n){return n[0].code=e.splice(1,-1),""},next:"start"},{regex:"\\?",onMatch:function(e,t,n){n[0]&&(n[0].expectIf=!0)},next:"start"},{regex:"([^:}\\\\]|\\\\.)*:?",token:"",next:"start"}],formatString:[{regex:"/("+t("/")+"+)/",token:"regex"},{regex:"",onMatch:function(e,t,n){n.inFormatString=!0},next:"start"}]}),l.prototype.getTokenizer=function(){return l.$tokenizer},l.$tokenizer},this.tokenizeTmSnippet=function(e,t){return this.getTokenizer().getLineTokens(e,t).tokens.map(function(e){return e.value||e})},this.$getDefaultValue=function(e,t){if(/^[A-Z]\d+$/.test(t)){var n=t.substr(1);return(this.variables[t[0]+"__"]||{})[n]}if(/^\d+$/.test(t))return(this.variables.__||{})[t];if(t=t.replace(/^TM_/,""),e){var i=e.session;switch(t){case"CURRENT_WORD":var r=i.getWordRange();case"SELECTION":case"SELECTED_TEXT":return i.getTextRange(r);case"CURRENT_LINE":return i.getLine(e.getCursorPosition().row);case"PREV_LINE":return i.getLine(e.getCursorPosition().row-1);case"LINE_INDEX":return e.getCursorPosition().column;case"LINE_NUMBER":return e.getCursorPosition().row+1;case"SOFT_TABS":return i.getUseSoftTabs()?"YES":"NO";case"TAB_SIZE":return i.getTabSize();case"FILENAME":case"FILEPATH":return"";case"FULLNAME":return"Ace"}}},this.variables={},this.getVariableValue=function(e,t){return this.variables.hasOwnProperty(t)?this.variables[t](e,t)||"":this.$getDefaultValue(e,t)||""},this.tmStrFormat=function(e,t,n){var i=t.flag||"",r=t.guard;r=new RegExp(r,i.replace(/[^gi]/,""));var s=this.tokenizeTmSnippet(t.fmt,"formatString"),a=this,o=e.replace(r,function(){a.variables.__=arguments;for(var e=a.resolveVariables(s,n),t="E",i=0;i<e.length;i++){var r=e[i];if("object"==typeof r)if(e[i]="",r.changeCase&&r.local){var o=e[i+1];o&&"string"==typeof o&&("u"==r.changeCase?e[i]=o[0].toUpperCase():e[i]=o[0].toLowerCase(),e[i+1]=o.substr(1))}else r.changeCase&&(t=r.changeCase);else"U"==t?e[i]=r.toUpperCase():"L"==t&&(e[i]=r.toLowerCase())}return e.join("")});return this.variables.__=null,o},this.resolveVariables=function(e,t){function n(t){var n=e.indexOf(t,r+1);n!=-1&&(r=n)}for(var i=[],r=0;r<e.length;r++){var s=e[r];if("string"==typeof s)i.push(s);else{if("object"!=typeof s)continue;if(s.skip)n(s);else{if(s.processed<r)continue;if(s.text){var a=this.getVariableValue(t,s.text);a&&s.fmtString&&(a=this.tmStrFormat(a,s)),s.processed=r,null==s.expectIf?a&&(i.push(a),n(s)):a?s.skip=s.elseBranch:n(s)}else null!=s.tabstopId?i.push(s):null!=s.changeCase&&i.push(s)}}}return i},this.insertSnippetForSelection=function(e,t){function n(e){for(var t=[],n=0;n<e.length;n++){var i=e[n];if("object"==typeof i){if(h[i.tabstopId])continue;var r=e.lastIndexOf(i,n-1);i=t[r]||{tabstopId:i.tabstopId}}t[n]=i}return t}var i=e.getCursorPosition(),r=e.session.getLine(i.row),s=e.session.getTabString(),a=r.match(/^\s*/)[0];i.column<a.length&&(a=a.slice(0,i.column)),t=t.replace(/\r/g,"");var o=this.tokenizeTmSnippet(t);o=this.resolveVariables(o,e),o=o.map(function(e){return"\n"==e?e+a:"string"==typeof e?e.replace(/\t/g,s):e});var c=[];o.forEach(function(e,t){if("object"==typeof e){var n=e.tabstopId,i=c[n];if(i||(i=c[n]=[],i.index=n,i.value=""),i.indexOf(e)===-1){i.push(e);var r=o.indexOf(e,t+1);if(r!==-1){var s=o.slice(t+1,r),a=s.some(function(e){return"object"==typeof e});a&&!i.value?i.value=s:s.length&&(!i.value||"string"!=typeof i.value)&&(i.value=s.join(""))}}}}),c.forEach(function(e){e.length=0});for(var h={},u=0;u<o.length;u++){var l=o[u];if("object"==typeof l){var d=l.tabstopId,g=o.indexOf(l,u+1);if(h[d])h[d]===l&&(h[d]=null);else{var f=c[d],m="string"==typeof f.value?[f.value]:n(f.value);m.unshift(u+1,Math.max(0,g-u)),m.push(l),h[d]=l,o.splice.apply(o,m),f.indexOf(l)===-1&&f.push(l)}}}var b=0,v=0,x="";o.forEach(function(e){if("string"==typeof e){var t=e.split("\n");t.length>1?(v=t[t.length-1].length,b+=t.length-1):v+=e.length,x+=e}else e.start?e.end={row:b,column:v}:e.start={row:b,column:v}});var S=e.getSelectionRange(),_=e.session.replace(S,x),w=new p(e),T=e.inVirtualSelectionMode&&e.selection.index;w.addTabstops(c,S.start,_,T)},this.insertSnippet=function(e,t){var n=this;return e.inVirtualSelectionMode?n.insertSnippetForSelection(e,t):(e.forEachSelection(function(){n.insertSnippetForSelection(e,t)},null,{keepOrder:!0}),void(e.tabstopManager&&e.tabstopManager.tabNext()))},this.$getScope=function(e){var t=e.session.$mode.$id||"";if(t=t.split("/").pop(),"html"===t||"php"===t){"php"===t&&!e.session.$mode.inlinePhp&&(t="html");var n=e.getCursorPosition(),i=e.session.getState(n.row);"object"==typeof i&&(i=i[0]),i.substring&&("js-"==i.substring(0,3)?t="javascript":"css-"==i.substring(0,4)?t="css":"php-"==i.substring(0,4)&&(t="php"))}return t},this.getActiveScopes=function(e){var t=this.$getScope(e),n=[t],i=this.snippetMap;return i[t]&&i[t].includeScopes&&n.push.apply(n,i[t].includeScopes),n.push("_"),n},this.expandWithTab=function(e,t){var n=this,i=e.forEachSelection(function(){return n.expandSnippetForSelection(e,t)},null,{keepOrder:!0});return i&&e.tabstopManager&&e.tabstopManager.tabNext(),i},this.expandSnippetForSelection=function(e,t){var n,i=e.getCursorPosition(),r=e.session.getLine(i.row),s=r.substring(0,i.column),a=r.substr(i.column),o=this.snippetMap;return this.getActiveScopes(e).some(function(e){var t=o[e];return t&&(n=this.findMatchingSnippet(t,s,a)),!!n},this),!!n&&(!(!t||!t.dryRun)||(e.session.doc.removeInLine(i.row,i.column-n.replaceBefore.length,i.column+n.replaceAfter.length),this.variables.M__=n.matchBefore,this.variables.T__=n.matchAfter,this.insertSnippetForSelection(e,n.content),this.variables.M__=this.variables.T__=null,!0))},this.findMatchingSnippet=function(e,t,n){for(var i=e.length;i--;){var r=e[i];if((!r.startRe||r.startRe.test(t))&&(!r.endRe||r.endRe.test(n))&&(r.startRe||r.endRe))return r.matchBefore=r.startRe?r.startRe.exec(t):[""],r.matchAfter=r.endRe?r.endRe.exec(n):[""],r.replaceBefore=r.triggerRe?r.triggerRe.exec(t)[0]:"",r.replaceAfter=r.endTriggerRe?r.endTriggerRe.exec(n)[0]:"",r}},this.snippetMap={},this.snippetNameMap={},this.register=function(e,t){function n(e){return e&&!/^\^?\(.*\)\$?$|^\\b$/.test(e)&&(e="(?:"+e+")"),e||""}function i(e,t,i){return e=n(e),t=n(t),i?(e=t+e,e&&"$"!=e[e.length-1]&&(e+="$")):(e+=t,e&&"^"!=e[0]&&(e="^"+e)),new RegExp(e)}function r(e){e.scope||(e.scope=t||"_"),t=e.scope,a[t]||(a[t]=[],o[t]={});var n=o[t];if(e.name){var r=n[e.name];r&&c.unregister(r),n[e.name]=e}a[t].push(e),e.tabTrigger&&!e.trigger&&(!e.guard&&/^\w/.test(e.tabTrigger)&&(e.guard="\\b"),e.trigger=s.escapeRegExp(e.tabTrigger)),(e.trigger||e.guard||e.endTrigger||e.endGuard)&&(e.startRe=i(e.trigger,e.guard,!0),e.triggerRe=new RegExp(e.trigger,"",!0),e.endRe=i(e.endTrigger,e.endGuard,!0),e.endTriggerRe=new RegExp(e.endTrigger,"",!0))}var a=this.snippetMap,o=this.snippetNameMap,c=this;e||(e=[]),e&&e.content?r(e):Array.isArray(e)&&e.forEach(r),this._signal("registerSnippets",{scope:t})},this.unregister=function(e,t){function n(e){var n=r[e.scope||t];if(n&&n[e.name]){delete n[e.name];var s=i[e.scope||t],a=s&&s.indexOf(e);a>=0&&s.splice(a,1)}}var i=this.snippetMap,r=this.snippetNameMap;e.content?n(e):Array.isArray(e)&&e.forEach(n)},this.parseSnippetFile=function(e){e=e.replace(/\r/g,"");for(var t,n=[],i={},r=/^#.*|^({[\s\S]*})\s*$|^(\S+) (.*)$|^((?:\n*\t.*)+)/gm;t=r.exec(e);){if(t[1])try{i=JSON.parse(t[1]),n.push(i)}catch(e){}if(t[4])i.content=t[4].replace(/^\t/gm,""),n.push(i),i={};else{var s=t[2],a=t[3];if("regex"==s){var o=/\/((?:[^\/\\]|\\.)*)|$/g;i.guard=o.exec(a)[1],i.trigger=o.exec(a)[1],i.endTrigger=o.exec(a)[1],i.endGuard=o.exec(a)[1]}else"snippet"==s?(i.tabTrigger=a.match(/^\S*/)[0],i.name||(i.name=a)):i[s]=a}}return n},this.getSnippetByName=function(e,t){var n,i=this.snippetNameMap;return this.getActiveScopes(t).some(function(t){var r=i[t];return r&&(n=r[e]),!!n},this),n}}).call(l.prototype);var p=function(e){return e.tabstopManager?e.tabstopManager:(e.tabstopManager=this,this.$onChange=this.onChange.bind(this),this.$onChangeSelection=s.delayedCall(this.onChangeSelection.bind(this)).schedule,this.$onChangeSession=this.onChangeSession.bind(this),this.$onAfterExec=this.onAfterExec.bind(this),this.attach(e),void 0)};(function(){this.attach=function(e){this.index=0,this.ranges=[],this.tabstops=[],this.$openTabstops=null,this.selectedTabstop=null,this.editor=e,this.editor.on("change",this.$onChange),this.editor.on("changeSelection",this.$onChangeSelection),this.editor.on("changeSession",this.$onChangeSession),this.editor.commands.on("afterExec",this.$onAfterExec),this.editor.keyBinding.addKeyboardHandler(this.keyboardHandler)},this.detach=function(){this.tabstops.forEach(this.removeTabstopMarkers,this),this.ranges=null,this.tabstops=null,this.selectedTabstop=null,this.editor.removeListener("change",this.$onChange),this.editor.removeListener("changeSelection",this.$onChangeSelection),this.editor.removeListener("changeSession",this.$onChangeSession),this.editor.commands.removeListener("afterExec",this.$onAfterExec),this.editor.keyBinding.removeKeyboardHandler(this.keyboardHandler),this.editor.tabstopManager=null,this.editor=null},this.onChange=function(e){var t="r"==e.action[0],n=e.start,i=e.end,r=n.row,s=i.row,a=s-r,o=i.column-n.column;if(t&&(a=-a,o=-o),!this.$inChange&&t){var c=this.selectedTabstop,h=c&&!c.some(function(e){return u(e.start,n)<=0&&u(e.end,i)>=0});if(h)return this.detach()}for(var l=this.ranges,p=0;p<l.length;p++){var d=l[p];d.end.row<n.row||(t&&u(n,d.start)<0&&u(i,d.end)>0?(this.removeRange(d),p--):(d.start.row==r&&d.start.column>n.column&&(d.start.column+=o),d.end.row==r&&d.end.column>=n.column&&(d.end.column+=o),d.start.row>=r&&(d.start.row+=a),d.end.row>=r&&(d.end.row+=a),u(d.start,d.end)>0&&this.removeRange(d)))}l.length||this.detach()},this.updateLinkedFields=function(){var e=this.selectedTabstop;if(e&&e.hasLinkedRanges){this.$inChange=!0;for(var n=this.editor.session,i=n.getTextRange(e.firstNonLinked),r=e.length;r--;){var s=e[r];if(s.linked){var a=t.snippetManager.tmStrFormat(i,s.original);n.replace(s,a)}}this.$inChange=!1}},this.onAfterExec=function(e){e.command&&!e.command.readOnly&&this.updateLinkedFields()},this.onChangeSelection=function(){if(this.editor){for(var e=this.editor.selection.lead,t=this.editor.selection.anchor,n=this.editor.selection.isEmpty(),i=this.ranges.length;i--;)if(!this.ranges[i].linked){var r=this.ranges[i].contains(e.row,e.column),s=n||this.ranges[i].contains(t.row,t.column);if(r&&s)return}this.detach()}},this.onChangeSession=function(){this.detach()},this.tabNext=function(e){var t=this.tabstops.length,n=this.index+(e||1);n=Math.min(Math.max(n,1),t),n==t&&(n=0),this.selectTabstop(n),0===n&&this.detach()},this.selectTabstop=function(e){this.$openTabstops=null;var t=this.tabstops[this.index];if(t&&this.addTabstopMarkers(t),this.index=e,t=this.tabstops[this.index],t&&t.length){if(this.selectedTabstop=t,this.editor.inVirtualSelectionMode)this.editor.selection.setRange(t.firstNonLinked);else{var n=this.editor.multiSelect;n.toSingleRange(t.firstNonLinked.clone());for(var i=t.length;i--;)t.hasLinkedRanges&&t[i].linked||n.addRange(t[i].clone(),!0);n.ranges[0]&&n.addRange(n.ranges[0].clone())}this.editor.keyBinding.addKeyboardHandler(this.keyboardHandler)}},this.addTabstops=function(e,t,n){if(this.$openTabstops||(this.$openTabstops=[]),!e[0]){var i=a.fromPoints(n,n);f(i.start,t),f(i.end,t),e[0]=[i],e[0].index=0}var r=this.index,s=[r+1,0],o=this.ranges;e.forEach(function(e,n){for(var i=this.$openTabstops[n]||e,r=e.length;r--;){var c=e[r],h=a.fromPoints(c.start,c.end||c.start);g(h.start,t),g(h.end,t),h.original=c,h.tabstop=i,o.push(h),i!=e?i.unshift(h):i[r]=h,c.fmtString?(h.linked=!0,i.hasLinkedRanges=!0):i.firstNonLinked||(i.firstNonLinked=h)}i.firstNonLinked||(i.hasLinkedRanges=!1),i===e&&(s.push(i),this.$openTabstops[n]=i),this.addTabstopMarkers(i)},this),s.length>2&&(this.tabstops.length&&s.push(s.splice(2,1)[0]),this.tabstops.splice.apply(this.tabstops,s))},this.addTabstopMarkers=function(e){var t=this.editor.session;e.forEach(function(e){e.markerId||(e.markerId=t.addMarker(e,"ace_snippet-marker","text"))})},this.removeTabstopMarkers=function(e){var t=this.editor.session;e.forEach(function(e){t.removeMarker(e.markerId),e.markerId=null})},this.removeRange=function(e){var t=e.tabstop.indexOf(e);e.tabstop.splice(t,1),t=this.ranges.indexOf(e),this.ranges.splice(t,1),this.editor.session.removeMarker(e.markerId),e.tabstop.length||(t=this.tabstops.indexOf(e.tabstop),t!=-1&&this.tabstops.splice(t,1),this.tabstops.length||this.detach())},this.keyboardHandler=new c,this.keyboardHandler.bindKeys({Tab:function(e){t.snippetManager&&t.snippetManager.expandWithTab(e)||e.tabstopManager.tabNext(1)},"Shift-Tab":function(e){e.tabstopManager.tabNext(-1)},Esc:function(e){e.tabstopManager.detach()},Return:function(e){return!1}})}).call(p.prototype);var d={};d.onChange=o.prototype.onChange,d.setPosition=function(e,t){this.pos.row=e,this.pos.column=t},d.update=function(e,t,n){this.$insertRight=n,this.pos=e,this.onChange(t)};var g=function(e,t){0==e.row&&(e.column+=t.column),e.row+=t.row},f=function(e,t){e.row==t.row&&(e.column-=t.column),e.row-=t.row};e("./lib/dom").importCssString(".ace_snippet-marker {    -moz-box-sizing: border-box;    box-sizing: border-box;    background: rgba(194, 193, 208, 0.09);    border: 1px dotted rgba(211, 208, 235, 0.62);    position: absolute;}"),t.snippetManager=new l;var m=e("./editor").Editor;(function(){this.insertSnippet=function(e,n){return t.snippetManager.insertSnippet(this,e,n)},this.expandSnippet=function(e){return t.snippetManager.expandWithTab(this,e)}}).call(m.prototype)}),ace.define("ace/ext/emmet",["require","exports","module","ace/keyboard/hash_handler","ace/editor","ace/snippets","ace/range","resources","resources","tabStops","resources","utils","actions","ace/config","ace/config"],function(e,t,n){"use strict";function i(){}var r,s,a=e("ace/keyboard/hash_handler").HashHandler,o=e("ace/editor").Editor,c=e("ace/snippets").snippetManager,h=e("ace/range").Range;i.prototype={setupContext:function(e){this.ace=e,this.indentation=e.session.getTabString(),r||(r=window.emmet);var t=r.resources||r.require("resources");t.setVariable("indentation",this.indentation),this.$syntax=null,this.$syntax=this.getSyntax()},getSelectionRange:function(){var e=this.ace.getSelectionRange(),t=this.ace.session.doc;return{start:t.positionToIndex(e.start),end:t.positionToIndex(e.end)}},createSelection:function(e,t){var n=this.ace.session.doc;this.ace.selection.setRange({start:n.indexToPosition(e),end:n.indexToPosition(t)})},getCurrentLineRange:function(){var e=this.ace,t=e.getCursorPosition().row,n=e.session.getLine(t).length,i=e.session.doc.positionToIndex({row:t,column:0});return{start:i,end:i+n}},getCaretPos:function(){var e=this.ace.getCursorPosition();return this.ace.session.doc.positionToIndex(e)},setCaretPos:function(e){var t=this.ace.session.doc.indexToPosition(e);this.ace.selection.moveToPosition(t)},getCurrentLine:function(){var e=this.ace.getCursorPosition().row;return this.ace.session.getLine(e)},replaceContent:function(e,t,n,i){null==n&&(n=null==t?this.getContent().length:t),null==t&&(t=0);var r=this.ace,s=r.session.doc,a=h.fromPoints(s.indexToPosition(t),s.indexToPosition(n));r.session.remove(a),a.end=a.start,e=this.$updateTabstops(e),c.insertSnippet(r,e)},getContent:function(){return this.ace.getValue()},getSyntax:function(){if(this.$syntax)return this.$syntax;var e=this.ace.session.$modeId.split("/").pop();if("html"==e||"php"==e){var t=this.ace.getCursorPosition(),n=this.ace.session.getState(t.row);"string"!=typeof n&&(n=n[0]),n&&(n=n.split("-"),n.length>1?e=n[0]:"php"==e&&(e="html"))}return e},getProfileName:function(){var e=r.resources||r.require("resources");switch(this.getSyntax()){case"css":return"css";case"xml":case"xsl":return"xml";case"html":var t=e.getVariable("profile");return t||(t=this.ace.session.getLines(0,2).join("").search(/<!DOCTYPE[^>]+XHTML/i)!=-1?"xhtml":"html"),t;default:var n=this.ace.session.$mode;return n.emmetConfig&&n.emmetConfig.profile||"xhtml"}},prompt:function(e){return prompt(e)},getSelection:function(){return this.ace.session.getTextRange()},getFilePath:function(){return""},$updateTabstops:function(e){var t=1e3,n=0,i=null,s=r.tabStops||r.require("tabStops"),a=r.resources||r.require("resources"),o=a.getVocabulary("user"),c={tabstop:function(e){var r=parseInt(e.group,10),a=0===r;a?r=++n:r+=t;var o=e.placeholder;o&&(o=s.processText(o,c));var h="${"+r+(o?":"+o:"")+"}";return a&&(i=[e.start,h]),h},escape:function(e){return"$"==e?"\\$":"\\"==e?"\\\\":e}};if(e=s.processText(e,c),o.variables.insert_final_tabstop&&!/\$\{0\}$/.test(e))e+="${0}";else if(i){var h=r.utils?r.utils.common:r.require("utils");e=h.replaceSubstring(e,"${0}",i[0],i[1])}return e}};var u={expand_abbreviation:{mac:"ctrl+alt+e",win:"alt+e"},match_pair_outward:{mac:"ctrl+d",win:"ctrl+,"},match_pair_inward:{mac:"ctrl+j",win:"ctrl+shift+0"},matching_pair:{mac:"ctrl+alt+j",win:"alt+j"},next_edit_point:"alt+right",prev_edit_point:"alt+left",toggle_comment:{mac:"command+/",win:"ctrl+/"},split_join_tag:{mac:"shift+command+'",win:"shift+ctrl+`"},remove_tag:{mac:"command+'",win:"shift+ctrl+;"},evaluate_math_expression:{mac:"shift+command+y",win:"shift+ctrl+y"},increment_number_by_1:"ctrl+up",decrement_number_by_1:"ctrl+down",increment_number_by_01:"alt+up",decrement_number_by_01:"alt+down",increment_number_by_10:{mac:"alt+command+up",win:"shift+alt+up"},decrement_number_by_10:{mac:"alt+command+down",win:"shift+alt+down"},select_next_item:{mac:"shift+command+.",win:"shift+ctrl+."},select_previous_item:{mac:"shift+command+,",win:"shift+ctrl+,"},reflect_css_value:{mac:"shift+command+r",win:"shift+ctrl+r"},encode_decode_data_url:{mac:"shift+ctrl+d",win:"ctrl+'"},expand_abbreviation_with_tab:"Tab",wrap_with_abbreviation:{mac:"shift+ctrl+a",win:"shift+ctrl+a"}},l=new i;t.commands=new a,t.runEmmetCommand=function e(t){try{l.setupContext(t);var n=r.actions||r.require("actions");if("expand_abbreviation_with_tab"==this.action){if(!t.selection.isEmpty())return!1;var i=t.selection.lead,s=t.session.getTokenAt(i.row,i.column);if(s&&/\btag\b/.test(s.type))return!1}if("wrap_with_abbreviation"==this.action)return setTimeout(function(){n.run("wrap_with_abbreviation",l)},0);var a=n.run(this.action,l)}catch(n){if(!r)return g(e.bind(this,t)),!0;t._signal("changeStatus","string"==typeof n?n:n.message),console.log(n),a=!1}return a};for(var p in u)t.commands.addCommand({name:"emmet:"+p,action:p,bindKey:u[p],exec:t.runEmmetCommand,multiSelectAction:"forEach"});t.updateCommands=function(e,n){n?e.keyBinding.addKeyboardHandler(t.commands):e.keyBinding.removeKeyboardHandler(t.commands)},t.isSupportedMode=function(e){if(!e)return!1;if(e.emmetConfig)return!0;var t=e.$id||e;return/css|less|scss|sass|stylus|html|php|twig|ejs|handlebars/.test(t)},t.isAvailable=function(e,n){if(/(evaluate_math_expression|expand_abbreviation)$/.test(n))return!0;var i=e.session.$mode,r=t.isSupportedMode(i);if(r&&i.$modes)try{l.setupContext(e),/js|php/.test(l.getSyntax())&&(r=!1)}catch(e){}return r};var d=function(e,n){var i=n;if(i){var r=t.isSupportedMode(i.session.$mode);e.enableEmmet===!1&&(r=!1),r&&g(),t.updateCommands(i,r)}},g=function(t){"string"==typeof s&&e("ace/config").loadModule(s,function(){s=null,t&&t()})};t.AceEmmetEditor=i,e("ace/config").defineOptions(o.prototype,"editor",{enableEmmet:{set:function(e){this[e?"on":"removeListener"]("changeMode",d),d({enableEmmet:!!e},this)},value:!0}}),t.setCore=function(e){"string"==typeof e?s=e:r=e}}),function(){ace.require(["ace/ext/emmet"],function(){})}();