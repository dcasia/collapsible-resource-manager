!function(t){var e={};function n(a){if(e[a])return e[a].exports;var o=e[a]={i:a,l:!1,exports:{}};return t[a].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,a){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(a,o,function(e){return t[e]}.bind(null,o));return a},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/",n(n.s=5)}([function(t,e,n){var a=n(7);"string"==typeof a&&(a=[[t.i,a,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};n(4)(a,o);a.locals&&(t.exports=a.locals)},function(t,e,n){var a=n(10);"string"==typeof a&&(a=[[t.i,a,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};n(4)(a,o);a.locals&&(t.exports=a.locals)},function(t,e,n){var a=n(12);"string"==typeof a&&(a=[[t.i,a,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};n(4)(a,o);a.locals&&(t.exports=a.locals)},function(t,e){t.exports=function(t){var e=[];return e.toString=function(){return this.map((function(e){var n=function(t,e){var n=t[1]||"",a=t[3];if(!a)return n;if(e&&"function"==typeof btoa){var o=(s=a,"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(s))))+" */"),i=a.sources.map((function(t){return"/*# sourceURL="+a.sourceRoot+t+" */"}));return[n].concat(i).concat([o]).join("\n")}var s;return[n].join("\n")}(e,t);return e[2]?"@media "+e[2]+"{"+n+"}":n})).join("")},e.i=function(t,n){"string"==typeof t&&(t=[[null,t,""]]);for(var a={},o=0;o<this.length;o++){var i=this[o][0];"number"==typeof i&&(a[i]=!0)}for(o=0;o<t.length;o++){var s=t[o];"number"==typeof s[0]&&a[s[0]]||(n&&!s[2]?s[2]=n:n&&(s[2]="("+s[2]+") and ("+n+")"),e.push(s))}},e}},function(t,e,n){var a,o,i={},s=(a=function(){return window&&document&&document.all&&!window.atob},function(){return void 0===o&&(o=a.apply(this,arguments)),o}),r=function(t,e){return e?e.querySelector(t):document.querySelector(t)},l=function(t){var e={};return function(t,n){if("function"==typeof t)return t();if(void 0===e[t]){var a=r.call(this,t,n);if(window.HTMLIFrameElement&&a instanceof window.HTMLIFrameElement)try{a=a.contentDocument.head}catch(t){a=null}e[t]=a}return e[t]}}(),c=null,d=0,u=[],m=n(8);function f(t,e){for(var n=0;n<t.length;n++){var a=t[n],o=i[a.id];if(o){o.refs++;for(var s=0;s<o.parts.length;s++)o.parts[s](a.parts[s]);for(;s<a.parts.length;s++)o.parts.push(b(a.parts[s],e))}else{var r=[];for(s=0;s<a.parts.length;s++)r.push(b(a.parts[s],e));i[a.id]={id:a.id,refs:1,parts:r}}}}function p(t,e){for(var n=[],a={},o=0;o<t.length;o++){var i=t[o],s=e.base?i[0]+e.base:i[0],r={css:i[1],media:i[2],sourceMap:i[3]};a[s]?a[s].parts.push(r):n.push(a[s]={id:s,parts:[r]})}return n}function h(t,e){var n=l(t.insertInto);if(!n)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var a=u[u.length-1];if("top"===t.insertAt)a?a.nextSibling?n.insertBefore(e,a.nextSibling):n.appendChild(e):n.insertBefore(e,n.firstChild),u.push(e);else if("bottom"===t.insertAt)n.appendChild(e);else{if("object"!=typeof t.insertAt||!t.insertAt.before)throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");var o=l(t.insertAt.before,n);n.insertBefore(e,o)}}function v(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t);var e=u.indexOf(t);e>=0&&u.splice(e,1)}function y(t){var e=document.createElement("style");if(void 0===t.attrs.type&&(t.attrs.type="text/css"),void 0===t.attrs.nonce){var a=function(){0;return n.nc}();a&&(t.attrs.nonce=a)}return g(e,t.attrs),h(t,e),e}function g(t,e){Object.keys(e).forEach((function(n){t.setAttribute(n,e[n])}))}function b(t,e){var n,a,o,i;if(e.transform&&t.css){if(!(i="function"==typeof e.transform?e.transform(t.css):e.transform.default(t.css)))return function(){};t.css=i}if(e.singleton){var s=d++;n=c||(c=y(e)),a=T.bind(null,n,s,!1),o=T.bind(null,n,s,!0)}else t.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=function(t){var e=document.createElement("link");return void 0===t.attrs.type&&(t.attrs.type="text/css"),t.attrs.rel="stylesheet",g(e,t.attrs),h(t,e),e}(e),a=w.bind(null,n,e),o=function(){v(n),n.href&&URL.revokeObjectURL(n.href)}):(n=y(e),a=O.bind(null,n),o=function(){v(n)});return a(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;a(t=e)}else o()}}t.exports=function(t,e){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(e=e||{}).attrs="object"==typeof e.attrs?e.attrs:{},e.singleton||"boolean"==typeof e.singleton||(e.singleton=s()),e.insertInto||(e.insertInto="head"),e.insertAt||(e.insertAt="bottom");var n=p(t,e);return f(n,e),function(t){for(var a=[],o=0;o<n.length;o++){var s=n[o];(r=i[s.id]).refs--,a.push(r)}t&&f(p(t,e),e);for(o=0;o<a.length;o++){var r;if(0===(r=a[o]).refs){for(var l=0;l<r.parts.length;l++)r.parts[l]();delete i[r.id]}}}};var x,_=(x=[],function(t,e){return x[t]=e,x.filter(Boolean).join("\n")});function T(t,e,n,a){var o=n?"":a.css;if(t.styleSheet)t.styleSheet.cssText=_(e,o);else{var i=document.createTextNode(o),s=t.childNodes;s[e]&&t.removeChild(s[e]),s.length?t.insertBefore(i,s[e]):t.appendChild(i)}}function O(t,e){var n=e.css,a=e.media;if(a&&t.setAttribute("media",a),t.styleSheet)t.styleSheet.cssText=n;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}function w(t,e,n){var a=n.css,o=n.sourceMap,i=void 0===e.convertToAbsoluteUrls&&o;(e.convertToAbsoluteUrls||i)&&(a=m(a)),o&&(a+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */");var s=new Blob([a],{type:"text/css"}),r=t.href;t.href=URL.createObjectURL(s),r&&URL.revokeObjectURL(r)}},function(t,e,n){t.exports=n(13)},function(t,e,n){"use strict";var a=n(0);n.n(a).a},function(t,e,n){(t.exports=n(3)(!1)).push([t.i,"\n.badge[data-v-3e9987e0] {\n    background: var(--collapsible-menu-badge-color, var(--primary));\n    padding: 0.15rem 0.35rem;\n    align-self: center;\n}\n.text-xxs[data-v-3e9987e0] {\n    font-size: .60rem\n}\n\n",""])},function(t,e){t.exports=function(t){var e="undefined"!=typeof window&&window.location;if(!e)throw new Error("fixUrls requires window.location");if(!t||"string"!=typeof t)return t;var n=e.protocol+"//"+e.host,a=n+e.pathname.replace(/\/[^\/]*$/,"/");return t.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,(function(t,e){var o,i=e.trim().replace(/^"(.*)"$/,(function(t,e){return e})).replace(/^'(.*)'$/,(function(t,e){return e}));return/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(i)?t:(o=0===i.indexOf("//")?i:0===i.indexOf("/")?n+i:a+i.replace(/^\.\//,""),"url("+JSON.stringify(o)+")")}))}},function(t,e,n){"use strict";var a=n(1);n.n(a).a},function(t,e,n){(t.exports=n(3)(!1)).push([t.i,"\n.resource-list-icon {\n    width: 15px;\n    top: 2px;\n    left: -25px;\n}\n.custom-tools * {\n    margin: 0;\n    padding: 0;\n    font-size: inherit;\n    position: inherit;\n}\n.custom-tools svg, .custom-tools img {\n    display: none;\n}\n\n",""])},function(t,e,n){"use strict";var a=n(2);n.n(a).a},function(t,e,n){(t.exports=n(3)(!1)).push([t.i,"\n.collapsible-indicator {\n    top: -6px;\n    left: -30px;\n}\n.top_level ul li:first-child {\n    padding-top: 0;\n}\n.group ul li:first-child {\n    padding-top: 1rem;\n}\n.group h4 {\n    margin-left: 0;\n}\n.group h4:first-child {\n    margin-top: 0;\n}\n.group-icon {\n    margin-right: 5px;\n    margin-left: -10px;\n}\n\n",""])},function(t,e,n){"use strict";n.r(e);var a={inheritAttrs:!1,props:{duration:{type:[Number,Object],default:300},delay:{type:[Number,Object],default:0},group:Boolean,tag:{type:String,default:"span"},origin:{type:String,default:""},styles:{type:Object,default:function(){return{animationFillMode:"both",animationTimingFunction:"ease-out"}}}},computed:{componentType:function(){return this.group?"transition-group":"transition"},hooks:function(){return Object.assign({beforeEnter:this.beforeEnter,afterEnter:this.cleanUpStyles,beforeLeave:this.beforeLeave,leave:this.leave,afterLeave:this.cleanUpStyles},this.$listeners)}},methods:{beforeEnter:function(t){var e=this.duration.enter?this.duration.enter:this.duration;t.style.animationDuration=e+"ms";var n=this.delay.enter?this.delay.enter:this.delay;t.style.animationDelay=n+"ms",this.setStyles(t)},cleanUpStyles:function(t){var e=this;Object.keys(this.styles).forEach((function(n){e.styles[n]&&(t.style[n]="")})),t.style.animationDuration="",t.style.animationDelay=""},beforeLeave:function(t){var e=this.duration.leave?this.duration.leave:this.duration;t.style.animationDuration=e+"ms";var n=this.delay.leave?this.delay.leave:this.delay;t.style.animationDelay=n+"ms",this.setStyles(t)},leave:function(t){this.setAbsolutePosition(t)},setStyles:function(t){var e=this;this.setTransformOrigin(t),Object.keys(this.styles).forEach((function(n){var a=e.styles[n];a&&(t.style[n]=a)}))},setAbsolutePosition:function(t){return this.group&&(t.style.position="absolute"),this},setTransformOrigin:function(t){return this.origin&&(t.style.transformOrigin=this.origin),this}}};!function(){if("undefined"!=typeof document){var t=document.head||document.getElementsByTagName("head")[0],e=document.createElement("style"),n=" @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } } .fadeIn { animation-name: fadeIn; } @keyframes fadeOut { from { opacity: 1; } to { opacity: 0; } } .fadeOut { animation-name: fadeOut; } .fade-move { transition: transform .3s ease-out; } ";e.type="text/css",e.styleSheet?e.styleSheet.cssText=n:e.appendChild(document.createTextNode(n)),t.appendChild(e)}}();var o={render:function(){var t=this.$createElement;return(this._self._c||t)(this.componentType,this._g(this._b({tag:"component",attrs:{tag:this.tag,"enter-active-class":"fadeIn","move-class":"fade-move","leave-active-class":"fadeOut"}},"component",this.$attrs,!1),this.hooks),[this._t("default")],2)},staticRenderFns:[],name:"fade-transition",mixins:[a]};!function(){if("undefined"!=typeof document){var t=document.head||document.getElementsByTagName("head")[0],e=document.createElement("style"),n=".zoom-move { transition: transform .3s ease-out; } @keyframes zoomIn { from { opacity: 0; transform: scale3d(0.3, 0.3, 0.3); } 50% { opacity: 1; } } .zoomIn { animation-name: zoomIn; } @keyframes zoomOut { from { opacity: 1; } 50% { opacity: 0; transform: scale3d(0.3, 0.3, 0.3); } to { opacity: 0; } } .zoomOut { animation-name: zoomOut; } ";e.type="text/css",e.styleSheet?e.styleSheet.cssText=n:e.appendChild(document.createTextNode(n)),t.appendChild(e)}}();var i={render:function(){var t=this.$createElement;return(this._self._c||t)(this.componentType,this._g(this._b({tag:"component",attrs:{tag:this.tag,"enter-active-class":"zoomIn","move-class":"zoom-move","leave-active-class":"zoomOut"}},"component",this.$attrs,!1),this.hooks),[this._t("default")],2)},staticRenderFns:[],name:"zoom-center-transition",mixins:[a]};!function(){if("undefined"!=typeof document){var t=document.head||document.getElementsByTagName("head")[0],e=document.createElement("style"),n=".zoom-move { transition: transform .3s ease-out; } @keyframes zoomInX { from { opacity: 0; transform: scaleX(0); } 50% { opacity: 1; } } .zoomInX { animation-name: zoomInX; } @keyframes zoomOutX { from { opacity: 1; } 50% { opacity: 0; transform: scaleX(0); } to { opacity: 0; } } .zoomOutX { animation-name: zoomOutX; } ";e.type="text/css",e.styleSheet?e.styleSheet.cssText=n:e.appendChild(document.createTextNode(n)),t.appendChild(e)}}();var s={render:function(){var t=this.$createElement;return(this._self._c||t)(this.componentType,this._g(this._b({tag:"component",attrs:{tag:this.tag,"enter-active-class":"zoomInX","move-class":"zoom-move","leave-active-class":"zoomOutX"}},"component",this.$attrs,!1),this.hooks),[this._t("default")],2)},staticRenderFns:[],name:"zoom-x-transition",props:{styles:{type:Object,default:function(){return{animationFillMode:"both",animationTimingFunction:"cubic-bezier(.55,0,.1,1)"}}}},mixins:[a]};!function(){if("undefined"!=typeof document){var t=document.head||document.getElementsByTagName("head")[0],e=document.createElement("style"),n=".zoom-move { transition: transform .3s ease-out; } @keyframes zoomInY { from { opacity: 0; transform: scaleY(0); } 50% { opacity: 1; tranform: scaleY(1); } } .zoomInY { animation-name: zoomInY; } @keyframes zoomOutY { from { opacity: 1; } 50% { opacity: 0; transform: scaleY(0); } to { opacity: 0; } } .zoomOutY { animation-name: zoomOutY; } ";e.type="text/css",e.styleSheet?e.styleSheet.cssText=n:e.appendChild(document.createTextNode(n)),t.appendChild(e)}}();var r={render:function(){var t=this.$createElement;return(this._self._c||t)(this.componentType,this._g(this._b({tag:"component",attrs:{tag:this.tag,"enter-active-class":"zoomInY","move-class":"zoom-move","leave-active-class":"zoomOutY"}},"component",this.$attrs,!1),this.hooks),[this._t("default")],2)},staticRenderFns:[],name:"zoom-y-transition",mixins:[a],props:{styles:{type:Object,default:function(){return{animationFillMode:"both",animationTimingFunction:"cubic-bezier(.55,0,.1,1)"}}}}};!function(){if("undefined"!=typeof document){var t=document.head||document.getElementsByTagName("head")[0],e=document.createElement("style"),n=" .collapse-move { transition: transform .3s ease-in-out; } ";e.type="text/css",e.styleSheet?e.styleSheet.cssText=n:e.appendChild(document.createTextNode(n)),t.appendChild(e)}}();var l={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)(t.componentType,t._g(t._b({tag:"component",attrs:{tag:t.tag,"move-class":"collapse-move"},on:{"before-enter":t.beforeEnter,"after-enter":t.afterEnter,enter:t.enter,"before-leave":t.beforeLeave,leave:t.leave,"after-leave":t.afterLeave}},"component",t.$attrs,!1),t.$listeners),[t._t("default")],2)},staticRenderFns:[],name:"collapse-transition",mixins:[a],methods:{transitionStyle:function(t){void 0===t&&(t=300);var e=t/1e3;return e+"s height ease-in-out, "+e+"s padding-top ease-in-out, "+e+"s padding-bottom ease-in-out"},beforeEnter:function(t){var e=this.duration.enter?this.duration.enter:this.duration;t.style.transition=this.transitionStyle(e),t.dataset||(t.dataset={}),t.dataset.oldPaddingTop=t.style.paddingTop,t.dataset.oldPaddingBottom=t.style.paddingBottom,t.style.height="0",t.style.paddingTop=0,t.style.paddingBottom=0,this.setStyles(t)},enter:function(t){t.dataset.oldOverflow=t.style.overflow,0!==t.scrollHeight?(t.style.height=t.scrollHeight+"px",t.style.paddingTop=t.dataset.oldPaddingTop,t.style.paddingBottom=t.dataset.oldPaddingBottom):(t.style.height="",t.style.paddingTop=t.dataset.oldPaddingTop,t.style.paddingBottom=t.dataset.oldPaddingBottom),t.style.overflow="hidden"},afterEnter:function(t){t.style.transition="",t.style.height="",t.style.overflow=t.dataset.oldOverflow},beforeLeave:function(t){t.dataset||(t.dataset={}),t.dataset.oldPaddingTop=t.style.paddingTop,t.dataset.oldPaddingBottom=t.style.paddingBottom,t.dataset.oldOverflow=t.style.overflow,t.style.height=t.scrollHeight+"px",t.style.overflow="hidden",this.setStyles(t)},leave:function(t){var e=this.duration.leave?this.duration.leave:this.duration;0!==t.scrollHeight&&(t.style.transition=this.transitionStyle(e),t.style.height=0,t.style.paddingTop=0,t.style.paddingBottom=0),this.setAbsolutePosition(t)},afterLeave:function(t){t.style.transition="",t.style.height="",t.style.overflow=t.dataset.oldOverflow,t.style.paddingTop=t.dataset.oldPaddingTop,t.style.paddingBottom=t.dataset.oldPaddingBottom}}};!function(){if("undefined"!=typeof document){var t=document.head||document.getElementsByTagName("head")[0],e=document.createElement("style"),n=" @keyframes scaleIn { from { opacity: 0; transform: scale(0) } to { opacity: 1; } } .scaleIn { animation-name: scaleIn; } @keyframes scaleOut { from { opacity: 1; } to { opacity: 0; transform: scale(0); } } .scaleOut { animation-name: scaleOut; } .scale-move { transition: transform .3s cubic-bezier(.25, .8, .50, 1); } ";e.type="text/css",e.styleSheet?e.styleSheet.cssText=n:e.appendChild(document.createTextNode(n)),t.appendChild(e)}}();var c={render:function(){var t=this.$createElement;return(this._self._c||t)(this.componentType,this._g(this._b({tag:"component",attrs:{tag:this.tag,"enter-active-class":"scaleIn","move-class":"scale-move","leave-active-class":"scaleOut"}},"component",this.$attrs,!1),this.hooks),[this._t("default")],2)},staticRenderFns:[],name:"scale-transition",mixins:[a],props:{origin:{type:String,default:"top left"},styles:{type:Object,default:function(){return{animationFillMode:"both",animationTimingFunction:"cubic-bezier(.25,.8,.50,1)"}}}}};!function(){if("undefined"!=typeof document){var t=document.head||document.getElementsByTagName("head")[0],e=document.createElement("style"),n=".slide-move { transition: transform .3s; } @keyframes slideYIn { from { opacity: 0; transform: translateY(-15px); } to { opacity: 1; } } .slideYIn { animation-name: slideYIn; } @keyframes slideYOut { from { opacity: 1; } to { opacity: 0; transform: translateY(-15px); } } .slideYOut { animation-name: slideYOut; } ";e.type="text/css",e.styleSheet?e.styleSheet.cssText=n:e.appendChild(document.createTextNode(n)),t.appendChild(e)}}();var d={render:function(){var t=this.$createElement;return(this._self._c||t)(this.componentType,this._g(this._b({tag:"component",attrs:{tag:this.tag,type:"animation","enter-active-class":"slideYIn","move-class":"slide-move","leave-active-class":"slideYOut"}},"component",this.$attrs,!1),this.hooks),[this._t("default")],2)},staticRenderFns:[],name:"slide-y-up-transition",mixins:[a],props:{styles:{type:Object,default:function(){return{animationFillMode:"both",animationTimingFunction:"cubic-bezier(.25,.8,.50,1)"}}}}};!function(){if("undefined"!=typeof document){var t=document.head||document.getElementsByTagName("head")[0],e=document.createElement("style"),n=".slide-move { transition: transform .3s; } @keyframes slideYDownIn { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; } } .slideYDownIn { animation-name: slideYDownIn; } @keyframes slideYDownOut { from { opacity: 1; } to { opacity: 0; transform: translateY(15px); } } .slideYDownOut { animation-name: slideYDownOut; } ";e.type="text/css",e.styleSheet?e.styleSheet.cssText=n:e.appendChild(document.createTextNode(n)),t.appendChild(e)}}();var u={render:function(){var t=this.$createElement;return(this._self._c||t)(this.componentType,this._g(this._b({tag:"component",attrs:{tag:this.tag,"enter-active-class":"slideYDownIn","leave-active-class":"slideYDownOut"}},"component",this.$attrs,!1),this.hooks),[this._t("default")],2)},staticRenderFns:[],name:"slide-y-down-transition",mixins:[a],props:{styles:{type:Object,default:function(){return{animationFillMode:"both",animationTimingFunction:"cubic-bezier(.25,.8,.50,1)"}}}}};!function(){if("undefined"!=typeof document){var t=document.head||document.getElementsByTagName("head")[0],e=document.createElement("style"),n=".slide-move { transition: transform .3s; } @keyframes slideXLeftIn { from { opacity: 0; transform: translateX(-15px); } to { opacity: 1; } } .slideXLeftIn { animation-name: slideXLeftIn; } @keyframes slideXLeftOut { from { opacity: 1; } to { opacity: 0; transform: translateX(-15px); } } .slideXLeftOut { animation-name: slideXLeftOut; } ";e.type="text/css",e.styleSheet?e.styleSheet.cssText=n:e.appendChild(document.createTextNode(n)),t.appendChild(e)}}();var m={render:function(){var t=this.$createElement;return(this._self._c||t)(this.componentType,this._g(this._b({tag:"component",attrs:{tag:this.tag,"enter-active-class":"slideXLeftIn","move-class":"slide-move","leave-active-class":"slideXLeftOut"}},"component",this.$attrs,!1),this.hooks),[this._t("default")],2)},staticRenderFns:[],name:"slide-x-left-transition",mixins:[a],props:{styles:{type:Object,default:function(){return{animationFillMode:"both",animationTimingFunction:"cubic-bezier(.25,.8,.50,1)"}}}}};!function(){if("undefined"!=typeof document){var t=document.head||document.getElementsByTagName("head")[0],e=document.createElement("style"),n=".slide-move { transition: transform .3s; } @keyframes slideXRightIn { from { opacity: 0; transform: translateX(15px); } to { opacity: 1; } } .slideXRightIn { animation-name: slideXRightIn; } @keyframes slideXRightOut { from { opacity: 1; } to { opacity: 0; transform: translateX(15px); } } .slideXRightOut { animation-name: slideXRightOut; } ";e.type="text/css",e.styleSheet?e.styleSheet.cssText=n:e.appendChild(document.createTextNode(n)),t.appendChild(e)}}();var f={render:function(){var t=this.$createElement;return(this._self._c||t)(this.componentType,this._g(this._b({tag:"component",attrs:{tag:this.tag,"enter-active-class":"slideXRightIn","move-class":"slide-move","leave-active-class":"slideXRightOut"}},"component",this.$attrs,!1),this.hooks),[this._t("default")],2)},staticRenderFns:[],name:"slide-x-right-transition",mixins:[a],props:{styles:{type:Object,default:function(){return{animationFillMode:"both",animationTimingFunction:"cubic-bezier(.25,.8,.50,1)"}}}}},p={};function h(t,e){e&&e.components?e.components.forEach((function(e){return t.component(e.name,p[e.name])})):Object.keys(p).forEach((function(e){t.component(e,p[e])}))}p[o.name]=o,p[i.name]=i,p[s.name]=s,p[r.name]=r,p[l.name]=l,p[c.name]=c,p[d.name]=d,p[u.name]=u,p[m.name]=m,p[f.name]=f,"undefined"!=typeof window&&window.Vue&&window.Vue.use({install:h});var v={name:"Badge",props:{label:{type:String}}};n(6);function y(t,e,n,a,o,i,s,r){var l,c="function"==typeof t?t.options:t;if(e&&(c.render=e,c.staticRenderFns=n,c._compiled=!0),a&&(c.functional=!0),i&&(c._scopeId="data-v-"+i),s?(l=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),o&&o.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(s)},c._ssrRegister=l):o&&(l=r?function(){o.call(this,this.$root.$options.shadowRoot)}:o),l)if(c.functional){c._injectStyles=l;var d=c.render;c.render=function(t,e){return l.call(e),d(t,e)}}else{var u=c.beforeCreate;c.beforeCreate=u?[].concat(u,l):[l]}return{exports:t,options:c}}var g=y(v,(function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"flex items-center"},[e("div",{staticClass:"dim"},[this._t("default")],2),this._v(" "),this.label?e("div",{staticClass:"badge rounded-full text-xxs ml-2 self-start"},[this._v("\n        "+this._s(this.label)+"\n    ")]):this._e()])}),[],!1,null,"3e9987e0",null).exports,b={name:"ResourceList",components:{Badge:g},props:{resources:{type:Array,required:!0},recursive:{type:Boolean,default:!1},rememberMenuState:{type:Boolean,required:!0}}};n(9);var x={name:"CollapsibleResourceManager",components:{CollapseTransition:l,ResourceList:y(b,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("ul",{staticClass:"list-reset"},t._l(t.resources,(function(e){return n("li",{staticClass:"leading-tight pt-4 text-sm",class:{"ml-8":!t.recursive}},["group"===e.type?n("collapsible-resource-manager",{attrs:{data:e,"remember-menu-state":t.rememberMenuState,recursive:""}}):"external_link"===e.type?n("div",[n("a",{staticClass:"relative text-white text-left no-underline dim block",attrs:{href:e.url,target:e.target}},[n("Badge",{attrs:{label:e.badge}},[t._v("\n                    "+t._s(e.label)+"\n                ")]),t._v(" "),e.icon?n("div",{staticClass:"absolute resource-list-icon flex",domProps:{innerHTML:t._s(e.icon)}}):n("svg",{staticClass:"absolute resource-list-icon",attrs:{viewBox:"0 0 24 24",width:"24",height:"24"}},[n("path",{attrs:{fill:"currentColor",d:"M19 6.41L8.7 16.71a1 1 0 1 1-1.4-1.42L17.58 5H14a1 1 0 0 1 0-2h6a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0V6.41zM17 14a1 1 0 0 1 2 0v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7c0-1.1.9-2 2-2h5a1 1 0 0 1 0 2H5v12h12v-5z"}})])],1)]):n("router-link",{staticClass:"relative text-white text-left no-underline dim block",attrs:{to:e.router,target:e.target}},[e.icon?n("div",{staticClass:"absolute resource-list-icon flex",domProps:{innerHTML:t._s(e.icon)}}):t._e(),t._v(" "),n("Badge",{attrs:{label:e.badge}},[t._v("\n                "+t._s(e.label)+"\n            ")])],1)],1)})),0)}),[],!1,null,null,null).exports,Badge:g},props:{data:{type:Object,required:!0},rememberMenuState:{type:Boolean,default:!1},recursive:{type:Boolean,default:!1}},data:function(){return{activeMenu:(t={},e=this.data.id,n=this.data.expanded,e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t)};var t,e,n},created:function(){var t=this;if(this.rememberMenuState){var e=localStorage.getItem(this.cacheKey);e&&(this.activeMenu[this.data.id]=JSON.parse(e)),this.$watch((function(){return t.activeMenu[t.data.id]}),(function(e){localStorage.setItem(t.cacheKey,e)}))}},computed:{isGroup:function(){return"group"===this.data.type},isTopLevel:function(){return"top_level"===this.data.type},cacheKey:function(){return"menu-state.".concat(this.data.id)},isEmpty:function(){return 0===this.data.resources.length},topLevelLink:function(){return this.data.linkTo?{is:"router-link",to:this.data.linkTo.router,target:this.data.linkTo.target,class:["cursor-pointer","dim"]}:{is:"h3"}}},methods:{toggleGroup:function(t){this.activeMenu[t]=!this.activeMenu[t]}}},_=(n(11),y(x,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return!t.isEmpty||t.data.linkTo?n("div",{class:[t.data.type,{"mb-8":t.isTopLevel}]},[t.data.label&&t.isTopLevel?n("component",t._b({staticClass:"flex items-center font-normal text-white mb-6 text-base no-underline"},"component",t.topLevelLink,!1),[t.data.icon?n("div",{staticClass:"sidebar-icon",domProps:{innerHTML:t._s(t.data.icon)}}):n("svg",{staticClass:"sidebar-icon",attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20"}},[n("path",{attrs:{fill:"var(--sidebar-icon)",d:"M3 1h4c1.1045695 0 2 .8954305 2 2v4c0 1.1045695-.8954305 2-2 2H3c-1.1045695 0-2-.8954305-2-2V3c0-1.1045695.8954305-2 2-2zm0 2v4h4V3H3zm10-2h4c1.1045695 0 2 .8954305 2 2v4c0 1.1045695-.8954305 2-2 2h-4c-1.1045695 0-2-.8954305-2-2V3c0-1.1045695.8954305-2 2-2zm0 2v4h4V3h-4zM3 11h4c1.1045695 0 2 .8954305 2 2v4c0 1.1045695-.8954305 2-2 2H3c-1.1045695 0-2-.8954305-2-2v-4c0-1.1045695.8954305-2 2-2zm0 2v4h4v-4H3zm10-2h4c1.1045695 0 2 .8954305 2 2v4c0 1.1045695-.8954305 2-2 2h-4c-1.1045695 0-2-.8954305-2-2v-4c0-1.1045695.8954305-2 2-2zm0 2v4h4v-4h-4z"}})]),t._v(" "),n("Badge",{attrs:{label:t.data.badge}},[n("span",{staticClass:"text-white sidebar-label"},[t._v("\n                "+t._s(t.data.label)+"\n            ")])])],1):t._e(),t._v(" "),t.isTopLevel&&t.data.resources.length?n("ResourceList",{staticClass:"resources-only",attrs:{resources:t.data.resources,recursive:t.recursive,"remember-menu-state":t.rememberMenuState}}):t._e(),t._v(" "),t.isGroup&&t.data.resources.length?[t.data.label?n("h4",{staticClass:"relative select-none ml-8 mt-4 text-xs text-white-50% uppercase tracking-wide cursor-pointer",on:{click:function(e){return t.toggleGroup(t.data.id)}}},[n("div",{staticClass:"absolute flex flex-auto collapsible-indicator"},[n("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",width:"24",height:"24"}},[t.activeMenu[t.data.id]?n("path",{attrs:{fill:"currentColor",d:"M16 12c0 .55-.45 1-1 1H9c-.55 0-1-.45-1-1s.45-1 1-1h6c.55 0 1 .45 1 1z"}}):n("path",{attrs:{fill:"currentColor",d:"M13 11h2c.55 0 1 .45 1 1s-.45 1-1 1h-2v2c0 .55-.45 1-1 1s-1-.45-1-1v-2H9c-.55 0-1-.45-1-1s.45-1 1-1h2V9c0-.55.45-1 1-1s1 .45 1 1v2z"}})])]),t._v(" "),n("div",{staticClass:"flex flex-auto"},[t.data.icon?n("div",{staticClass:"group-icon",domProps:{innerHTML:t._s(t.data.icon)}}):t._e(),t._v(" "),n("Badge",{attrs:{label:t.data.badge}},[t._v("\n                    "+t._s(t.data.label)+"\n                ")])],1)]):t._e(),t._v(" "),n("CollapseTransition",{attrs:{duration:150}},[t.activeMenu[t.data.id]?n("ResourceList",{attrs:{resources:t.data.resources,recursive:t.recursive,"remember-menu-state":t.rememberMenuState}}):t._e()],1)]:t._e()],2):t._e()}),[],!1,null,null,null).exports);Nova.booting((function(t,e,n){t.component("collapsible-resource-manager",_)}))}]);