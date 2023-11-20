"use strict";(self.webpackChunkcrm=self.webpackChunkcrm||[]).push([[452],{2452:(G,I,b)=>{b.d(I,{zx:()=>Y,hJ:()=>$});var m=b(6814),i=b(6242),C=b(5219);class E{static equals(s,t,e){return e?this.resolveFieldData(s,e)===this.resolveFieldData(t,e):this.equalsByValue(s,t)}static equalsByValue(s,t){if(s===t)return!0;if(s&&t&&"object"==typeof s&&"object"==typeof t){var l,a,r,e=Array.isArray(s),n=Array.isArray(t);if(e&&n){if((a=s.length)!=t.length)return!1;for(l=a;0!=l--;)if(!this.equalsByValue(s[l],t[l]))return!1;return!0}if(e!=n)return!1;var c=this.isDate(s),h=this.isDate(t);if(c!=h)return!1;if(c&&h)return s.getTime()==t.getTime();var d=s instanceof RegExp,g=t instanceof RegExp;if(d!=g)return!1;if(d&&g)return s.toString()==t.toString();var u=Object.keys(s);if((a=u.length)!==Object.keys(t).length)return!1;for(l=a;0!=l--;)if(!Object.prototype.hasOwnProperty.call(t,u[l]))return!1;for(l=a;0!=l--;)if(!this.equalsByValue(s[r=u[l]],t[r]))return!1;return!0}return s!=s&&t!=t}static resolveFieldData(s,t){if(s&&t){if(this.isFunction(t))return t(s);if(-1==t.indexOf("."))return s[t];{let e=t.split("."),n=s;for(let l=0,a=e.length;l<a;++l){if(null==n)return null;n=n[e[l]]}return n}}return null}static isFunction(s){return!!(s&&s.constructor&&s.call&&s.apply)}static reorderArray(s,t,e){s&&t!==e&&(e>=s.length&&(e%=s.length,t%=s.length),s.splice(e,0,s.splice(t,1)[0]))}static insertIntoOrderedArray(s,t,e,n){if(e.length>0){let l=!1;for(let a=0;a<e.length;a++)if(this.findIndexInList(e[a],n)>t){e.splice(a,0,s),l=!0;break}l||e.push(s)}else e.push(s)}static findIndexInList(s,t){let e=-1;if(t)for(let n=0;n<t.length;n++)if(t[n]==s){e=n;break}return e}static contains(s,t){if(null!=s&&t&&t.length)for(let e of t)if(this.equals(s,e))return!0;return!1}static removeAccents(s){return s&&s.search(/[\xC0-\xFF]/g)>-1&&(s=s.replace(/[\xC0-\xC5]/g,"A").replace(/[\xC6]/g,"AE").replace(/[\xC7]/g,"C").replace(/[\xC8-\xCB]/g,"E").replace(/[\xCC-\xCF]/g,"I").replace(/[\xD0]/g,"D").replace(/[\xD1]/g,"N").replace(/[\xD2-\xD6\xD8]/g,"O").replace(/[\xD9-\xDC]/g,"U").replace(/[\xDD]/g,"Y").replace(/[\xDE]/g,"P").replace(/[\xE0-\xE5]/g,"a").replace(/[\xE6]/g,"ae").replace(/[\xE7]/g,"c").replace(/[\xE8-\xEB]/g,"e").replace(/[\xEC-\xEF]/g,"i").replace(/[\xF1]/g,"n").replace(/[\xF2-\xF6\xF8]/g,"o").replace(/[\xF9-\xFC]/g,"u").replace(/[\xFE]/g,"p").replace(/[\xFD\xFF]/g,"y")),s}static isDate(s){return"[object Date]"===Object.prototype.toString.call(s)}static isEmpty(s){return null==s||""===s||Array.isArray(s)&&0===s.length||!this.isDate(s)&&"object"==typeof s&&0===Object.keys(s).length}static isNotEmpty(s){return!this.isEmpty(s)}static compare(s,t,e,n=1){let l=-1;const a=this.isEmpty(s),r=this.isEmpty(t);return l=a&&r?0:a?n:r?-n:"string"==typeof s&&"string"==typeof t?s.localeCompare(t,e,{numeric:!0}):s<t?-1:s>t?1:0,l}static sort(s,t,e=1,n,l=1){return(1===l?e:l)*E.compare(s,t,n,e)}static merge(s,t){if(null!=s||null!=t)return null!=s&&"object"!=typeof s||null!=t&&"object"!=typeof t?null!=s&&"string"!=typeof s||null!=t&&"string"!=typeof t?t||s:[s||"",t||""].join(" "):{...s||{},...t||{}}}static isPrintableCharacter(s=""){return this.isNotEmpty(s)&&1===s.length&&s.match(/\S| /)}static getItemValue(s,...t){return this.isFunction(s)?s(...t):s}static findLastIndex(s,t){let e=-1;if(this.isNotEmpty(s))try{e=s.findLastIndex(t)}catch{e=s.lastIndexOf([...s].reverse().find(t))}return e}static findLast(s,t){let e;if(this.isNotEmpty(s))try{e=s.findLast(t)}catch{e=[...s].reverse().find(t)}return e}}var _=0;!function T(){let o=[];const n=l=>l&&parseInt(l.style.zIndex,10)||0}();const L=["*"];let O=(()=>{class o{label;spin=!1;styleClass;role;ariaLabel;ariaHidden;ngOnInit(){this.getAttributes()}getAttributes(){const t=E.isEmpty(this.label);this.role=t?void 0:"img",this.ariaLabel=t?void 0:this.label,this.ariaHidden=t}getClassNames(){return`p-icon ${this.styleClass?this.styleClass+" ":""}${this.spin?"p-icon-spin":""}`}static \u0275fac=function(e){return new(e||o)};static \u0275cmp=i.Xpm({type:o,selectors:[["ng-component"]],hostAttrs:[1,"p-element","p-icon-wrapper"],inputs:{label:"label",spin:"spin",styleClass:"styleClass"},standalone:!0,features:[i.jDz],ngContentSelectors:L,decls:1,vars:0,template:function(e,n){1&e&&(i.F$t(),i.Hsn(0))},encapsulation:2,changeDetection:0})}return o})(),v=(()=>{class o extends O{pathId;ngOnInit(){this.pathId="url(#"+function S(o="pn_id_"){return`${o}${++_}`}()+")"}static \u0275fac=(()=>{let t;return function(n){return(t||(t=i.n5z(o)))(n||o)}})();static \u0275cmp=i.Xpm({type:o,selectors:[["SpinnerIcon"]],standalone:!0,features:[i.qOj,i.jDz],decls:6,vars:7,consts:[["width","14","height","14","viewBox","0 0 14 14","fill","none","xmlns","http://www.w3.org/2000/svg"],["d","M6.99701 14C5.85441 13.999 4.72939 13.7186 3.72012 13.1832C2.71084 12.6478 1.84795 11.8737 1.20673 10.9284C0.565504 9.98305 0.165424 8.89526 0.041387 7.75989C-0.0826496 6.62453 0.073125 5.47607 0.495122 4.4147C0.917119 3.35333 1.59252 2.4113 2.46241 1.67077C3.33229 0.930247 4.37024 0.413729 5.4857 0.166275C6.60117 -0.0811796 7.76026 -0.0520535 8.86188 0.251112C9.9635 0.554278 10.9742 1.12227 11.8057 1.90555C11.915 2.01493 11.9764 2.16319 11.9764 2.31778C11.9764 2.47236 11.915 2.62062 11.8057 2.73C11.7521 2.78503 11.688 2.82877 11.6171 2.85864C11.5463 2.8885 11.4702 2.90389 11.3933 2.90389C11.3165 2.90389 11.2404 2.8885 11.1695 2.85864C11.0987 2.82877 11.0346 2.78503 10.9809 2.73C9.9998 1.81273 8.73246 1.26138 7.39226 1.16876C6.05206 1.07615 4.72086 1.44794 3.62279 2.22152C2.52471 2.99511 1.72683 4.12325 1.36345 5.41602C1.00008 6.70879 1.09342 8.08723 1.62775 9.31926C2.16209 10.5513 3.10478 11.5617 4.29713 12.1803C5.48947 12.7989 6.85865 12.988 8.17414 12.7157C9.48963 12.4435 10.6711 11.7264 11.5196 10.6854C12.3681 9.64432 12.8319 8.34282 12.8328 7C12.8328 6.84529 12.8943 6.69692 13.0038 6.58752C13.1132 6.47812 13.2616 6.41667 13.4164 6.41667C13.5712 6.41667 13.7196 6.47812 13.8291 6.58752C13.9385 6.69692 14 6.84529 14 7C14 8.85651 13.2622 10.637 11.9489 11.9497C10.6356 13.2625 8.85432 14 6.99701 14Z","fill","currentColor"],[3,"id"],["width","14","height","14","fill","white"]],template:function(e,n){1&e&&(i.O4$(),i.TgZ(0,"svg",0)(1,"g"),i._UZ(2,"path",1),i.qZA(),i.TgZ(3,"defs")(4,"clipPath",2),i._UZ(5,"rect",3),i.qZA()()()),2&e&&(i.Tol(n.getClassNames()),i.uIk("aria-label",n.ariaLabel)("aria-hidden",n.ariaHidden)("role",n.role),i.xp6(1),i.uIk("clip-path",n.pathId),i.xp6(3),i.Q6J("id",n.pathId))},encapsulation:2})}return o})(),p=(()=>{class o{static zindex=1e3;static calculatedScrollbarWidth=null;static calculatedScrollbarHeight=null;static browser;static addClass(t,e){t&&e&&(t.classList?t.classList.add(e):t.className+=" "+e)}static addMultipleClasses(t,e){if(t&&e)if(t.classList){let n=e.trim().split(" ");for(let l=0;l<n.length;l++)t.classList.add(n[l])}else{let n=e.split(" ");for(let l=0;l<n.length;l++)t.className+=" "+n[l]}}static removeClass(t,e){t&&e&&(t.classList?t.classList.remove(e):t.className=t.className.replace(new RegExp("(^|\\b)"+e.split(" ").join("|")+"(\\b|$)","gi")," "))}static hasClass(t,e){return!(!t||!e)&&(t.classList?t.classList.contains(e):new RegExp("(^| )"+e+"( |$)","gi").test(t.className))}static siblings(t){return Array.prototype.filter.call(t.parentNode.children,function(e){return e!==t})}static find(t,e){return Array.from(t.querySelectorAll(e))}static findSingle(t,e){return this.isElement(t)?t.querySelector(e):null}static index(t){let e=t.parentNode.childNodes,n=0;for(var l=0;l<e.length;l++){if(e[l]==t)return n;1==e[l].nodeType&&n++}return-1}static indexWithinGroup(t,e){let n=t.parentNode?t.parentNode.childNodes:[],l=0;for(var a=0;a<n.length;a++){if(n[a]==t)return l;n[a].attributes&&n[a].attributes[e]&&1==n[a].nodeType&&l++}return-1}static appendOverlay(t,e,n="self"){"self"!==n&&t&&e&&this.appendChild(t,e)}static alignOverlay(t,e,n="self",l=!0){t&&e&&(l&&(t.style.minWidth=`${o.getOuterWidth(e)}px`),"self"===n?this.relativePosition(t,e):this.absolutePosition(t,e))}static relativePosition(t,e){const n=w=>{if(w)return"relative"===getComputedStyle(w).getPropertyValue("position")?w:n(w.parentElement)},l=t.offsetParent?{width:t.offsetWidth,height:t.offsetHeight}:this.getHiddenElementDimensions(t),a=e.offsetHeight,r=e.getBoundingClientRect(),c=this.getWindowScrollTop(),h=this.getWindowScrollLeft(),d=this.getViewport(),u=n(t)?.getBoundingClientRect()||{top:-1*c,left:-1*h};let f,y;r.top+a+l.height>d.height?(f=r.top-u.top-l.height,t.style.transformOrigin="bottom",r.top+f<0&&(f=-1*r.top)):(f=a+r.top-u.top,t.style.transformOrigin="top");const x=r.left+l.width-d.width;y=l.width>d.width?-1*(r.left-u.left):x>0?r.left-u.left-x:r.left-u.left,t.style.top=f+"px",t.style.left=y+"px"}static absolutePosition(t,e){const n=t.offsetParent?{width:t.offsetWidth,height:t.offsetHeight}:this.getHiddenElementDimensions(t),l=n.height,a=n.width,r=e.offsetHeight,c=e.offsetWidth,h=e.getBoundingClientRect(),d=this.getWindowScrollTop(),g=this.getWindowScrollLeft(),u=this.getViewport();let f,y;h.top+r+l>u.height?(f=h.top+d-l,t.style.transformOrigin="bottom",f<0&&(f=d)):(f=r+h.top+d,t.style.transformOrigin="top"),y=h.left+a>u.width?Math.max(0,h.left+g+c-a):h.left+g,t.style.top=f+"px",t.style.left=y+"px"}static getParents(t,e=[]){return null===t.parentNode?e:this.getParents(t.parentNode,e.concat([t.parentNode]))}static getScrollableParents(t){let e=[];if(t){let n=this.getParents(t);const l=/(auto|scroll)/,a=r=>{let c=window.getComputedStyle(r,null);return l.test(c.getPropertyValue("overflow"))||l.test(c.getPropertyValue("overflowX"))||l.test(c.getPropertyValue("overflowY"))};for(let r of n){let c=1===r.nodeType&&r.dataset.scrollselectors;if(c){let h=c.split(",");for(let d of h){let g=this.findSingle(r,d);g&&a(g)&&e.push(g)}}9!==r.nodeType&&a(r)&&e.push(r)}}return e}static getHiddenElementOuterHeight(t){t.style.visibility="hidden",t.style.display="block";let e=t.offsetHeight;return t.style.display="none",t.style.visibility="visible",e}static getHiddenElementOuterWidth(t){t.style.visibility="hidden",t.style.display="block";let e=t.offsetWidth;return t.style.display="none",t.style.visibility="visible",e}static getHiddenElementDimensions(t){let e={};return t.style.visibility="hidden",t.style.display="block",e.width=t.offsetWidth,e.height=t.offsetHeight,t.style.display="none",t.style.visibility="visible",e}static scrollInView(t,e){let n=getComputedStyle(t).getPropertyValue("borderTopWidth"),l=n?parseFloat(n):0,a=getComputedStyle(t).getPropertyValue("paddingTop"),r=a?parseFloat(a):0,c=t.getBoundingClientRect(),d=e.getBoundingClientRect().top+document.body.scrollTop-(c.top+document.body.scrollTop)-l-r,g=t.scrollTop,u=t.clientHeight,f=this.getOuterHeight(e);d<0?t.scrollTop=g+d:d+f>u&&(t.scrollTop=g+d-u+f)}static fadeIn(t,e){t.style.opacity=0;let n=+new Date,l=0,a=function(){l=+t.style.opacity.replace(",",".")+((new Date).getTime()-n)/e,t.style.opacity=l,n=+new Date,+l<1&&(window.requestAnimationFrame&&requestAnimationFrame(a)||setTimeout(a,16))};a()}static fadeOut(t,e){var n=1,r=50/e;let c=setInterval(()=>{(n-=r)<=0&&(n=0,clearInterval(c)),t.style.opacity=n},50)}static getWindowScrollTop(){let t=document.documentElement;return(window.pageYOffset||t.scrollTop)-(t.clientTop||0)}static getWindowScrollLeft(){let t=document.documentElement;return(window.pageXOffset||t.scrollLeft)-(t.clientLeft||0)}static matches(t,e){var n=Element.prototype;return(n.matches||n.webkitMatchesSelector||n.mozMatchesSelector||n.msMatchesSelector||function(a){return-1!==[].indexOf.call(document.querySelectorAll(a),this)}).call(t,e)}static getOuterWidth(t,e){let n=t.offsetWidth;if(e){let l=getComputedStyle(t);n+=parseFloat(l.marginLeft)+parseFloat(l.marginRight)}return n}static getHorizontalPadding(t){let e=getComputedStyle(t);return parseFloat(e.paddingLeft)+parseFloat(e.paddingRight)}static getHorizontalMargin(t){let e=getComputedStyle(t);return parseFloat(e.marginLeft)+parseFloat(e.marginRight)}static innerWidth(t){let e=t.offsetWidth,n=getComputedStyle(t);return e+=parseFloat(n.paddingLeft)+parseFloat(n.paddingRight),e}static width(t){let e=t.offsetWidth,n=getComputedStyle(t);return e-=parseFloat(n.paddingLeft)+parseFloat(n.paddingRight),e}static getInnerHeight(t){let e=t.offsetHeight,n=getComputedStyle(t);return e+=parseFloat(n.paddingTop)+parseFloat(n.paddingBottom),e}static getOuterHeight(t,e){let n=t.offsetHeight;if(e){let l=getComputedStyle(t);n+=parseFloat(l.marginTop)+parseFloat(l.marginBottom)}return n}static getHeight(t){let e=t.offsetHeight,n=getComputedStyle(t);return e-=parseFloat(n.paddingTop)+parseFloat(n.paddingBottom)+parseFloat(n.borderTopWidth)+parseFloat(n.borderBottomWidth),e}static getWidth(t){let e=t.offsetWidth,n=getComputedStyle(t);return e-=parseFloat(n.paddingLeft)+parseFloat(n.paddingRight)+parseFloat(n.borderLeftWidth)+parseFloat(n.borderRightWidth),e}static getViewport(){let t=window,e=document,n=e.documentElement,l=e.getElementsByTagName("body")[0];return{width:t.innerWidth||n.clientWidth||l.clientWidth,height:t.innerHeight||n.clientHeight||l.clientHeight}}static getOffset(t){var e=t.getBoundingClientRect();return{top:e.top+(window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0),left:e.left+(window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft||0)}}static replaceElementWith(t,e){let n=t.parentNode;if(!n)throw"Can't replace element";return n.replaceChild(e,t)}static getUserAgent(){if(navigator&&this.isClient())return navigator.userAgent}static isIE(){var t=window.navigator.userAgent;return t.indexOf("MSIE ")>0||(t.indexOf("Trident/")>0?(t.indexOf("rv:"),!0):t.indexOf("Edge/")>0)}static isIOS(){return/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream}static isAndroid(){return/(android)/i.test(navigator.userAgent)}static isTouchDevice(){return"ontouchstart"in window||navigator.maxTouchPoints>0}static appendChild(t,e){if(this.isElement(e))e.appendChild(t);else{if(!(e&&e.el&&e.el.nativeElement))throw"Cannot append "+e+" to "+t;e.el.nativeElement.appendChild(t)}}static removeChild(t,e){if(this.isElement(e))e.removeChild(t);else{if(!e.el||!e.el.nativeElement)throw"Cannot remove "+t+" from "+e;e.el.nativeElement.removeChild(t)}}static removeElement(t){"remove"in Element.prototype?t.remove():t.parentNode.removeChild(t)}static isElement(t){return"object"==typeof HTMLElement?t instanceof HTMLElement:t&&"object"==typeof t&&null!==t&&1===t.nodeType&&"string"==typeof t.nodeName}static calculateScrollbarWidth(t){if(t){let e=getComputedStyle(t);return t.offsetWidth-t.clientWidth-parseFloat(e.borderLeftWidth)-parseFloat(e.borderRightWidth)}{if(null!==this.calculatedScrollbarWidth)return this.calculatedScrollbarWidth;let e=document.createElement("div");e.className="p-scrollbar-measure",document.body.appendChild(e);let n=e.offsetWidth-e.clientWidth;return document.body.removeChild(e),this.calculatedScrollbarWidth=n,n}}static calculateScrollbarHeight(){if(null!==this.calculatedScrollbarHeight)return this.calculatedScrollbarHeight;let t=document.createElement("div");t.className="p-scrollbar-measure",document.body.appendChild(t);let e=t.offsetHeight-t.clientHeight;return document.body.removeChild(t),this.calculatedScrollbarWidth=e,e}static invokeElementMethod(t,e,n){t[e].apply(t,n)}static clearSelection(){if(window.getSelection)window.getSelection().empty?window.getSelection().empty():window.getSelection().removeAllRanges&&window.getSelection().rangeCount>0&&window.getSelection().getRangeAt(0).getClientRects().length>0&&window.getSelection().removeAllRanges();else if(document.selection&&document.selection.empty)try{document.selection.empty()}catch{}}static getBrowser(){if(!this.browser){let t=this.resolveUserAgent();this.browser={},t.browser&&(this.browser[t.browser]=!0,this.browser.version=t.version),this.browser.chrome?this.browser.webkit=!0:this.browser.webkit&&(this.browser.safari=!0)}return this.browser}static resolveUserAgent(){let t=navigator.userAgent.toLowerCase(),e=/(chrome)[ \/]([\w.]+)/.exec(t)||/(webkit)[ \/]([\w.]+)/.exec(t)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(t)||/(msie) ([\w.]+)/.exec(t)||t.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(t)||[];return{browser:e[1]||"",version:e[2]||"0"}}static isInteger(t){return Number.isInteger?Number.isInteger(t):"number"==typeof t&&isFinite(t)&&Math.floor(t)===t}static isHidden(t){return!t||null===t.offsetParent}static isVisible(t){return t&&null!=t.offsetParent}static isExist(t){return null!==t&&typeof t<"u"&&t.nodeName&&t.parentNode}static focus(t,e){t&&document.activeElement!==t&&t.focus(e)}static getFocusableElements(t){let e=o.find(t,'button:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden]),\n                [href]:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden]),\n                input:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden]), select:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden]),\n                textarea:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden]), [tabIndex]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden]),\n                [contenteditable]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden]):not(.p-disabled)'),n=[];for(let l of e)(l.offsetWidth||l.offsetHeight||l.getClientRects().length)&&n.push(l);return n}static getNextFocusableElement(t,e=!1){const n=o.getFocusableElements(t);let l=0;if(n&&n.length>0){const a=n.indexOf(n[0].ownerDocument.activeElement);e?l=-1==a||0===a?n.length-1:a-1:-1!=a&&a!==n.length-1&&(l=a+1)}return n[l]}static generateZIndex(){return this.zindex=this.zindex||999,++this.zindex}static getSelection(){return window.getSelection?window.getSelection().toString():document.getSelection?document.getSelection().toString():document.selection?document.selection.createRange().text:null}static getTargetElement(t,e){if(!t)return null;switch(t){case"document":return document;case"window":return window;case"@next":return e?.nextElementSibling;case"@prev":return e?.previousElementSibling;case"@parent":return e?.parentElement;case"@grandparent":return e?.parentElement.parentElement;default:const n=typeof t;if("string"===n)return document.querySelector(t);if("object"===n&&t.hasOwnProperty("nativeElement"))return this.isExist(t.nativeElement)?t.nativeElement:void 0;const a=(r=t)&&r.constructor&&r.call&&r.apply?t():t;return a&&9===a.nodeType||this.isExist(a)?a:null}var r}static isClient(){return!!(typeof window<"u"&&window.document&&window.document.createElement)}static getAttribute(t,e){if(t){const n=t.getAttribute(e);return isNaN(n)?"true"===n||"false"===n?"true"===n:n:+n}}}return o})(),D=(()=>{class o{document;platformId;renderer;el;zone;config;constructor(t,e,n,l,a,r){this.document=t,this.platformId=e,this.renderer=n,this.el=l,this.zone=a,this.config=r}animationListener;mouseDownListener;timeout;ngAfterViewInit(){(0,m.NF)(this.platformId)&&this.config&&this.config.ripple&&this.zone.runOutsideAngular(()=>{this.create(),this.mouseDownListener=this.renderer.listen(this.el.nativeElement,"mousedown",this.onMouseDown.bind(this))})}onMouseDown(t){let e=this.getInk();if(!e||"none"===this.document.defaultView?.getComputedStyle(e,null).display)return;if(p.removeClass(e,"p-ink-active"),!p.getHeight(e)&&!p.getWidth(e)){let r=Math.max(p.getOuterWidth(this.el.nativeElement),p.getOuterHeight(this.el.nativeElement));e.style.height=r+"px",e.style.width=r+"px"}let n=p.getOffset(this.el.nativeElement),l=t.pageX-n.left+this.document.body.scrollTop-p.getWidth(e)/2,a=t.pageY-n.top+this.document.body.scrollLeft-p.getHeight(e)/2;this.renderer.setStyle(e,"top",a+"px"),this.renderer.setStyle(e,"left",l+"px"),p.addClass(e,"p-ink-active"),this.timeout=setTimeout(()=>{let r=this.getInk();r&&p.removeClass(r,"p-ink-active")},401)}getInk(){const t=this.el.nativeElement.children;for(let e=0;e<t.length;e++)if("string"==typeof t[e].className&&-1!==t[e].className.indexOf("p-ink"))return t[e];return null}resetInk(){let t=this.getInk();t&&p.removeClass(t,"p-ink-active")}onAnimationEnd(t){this.timeout&&clearTimeout(this.timeout),p.removeClass(t.currentTarget,"p-ink-active")}create(){let t=this.renderer.createElement("span");this.renderer.addClass(t,"p-ink"),this.renderer.appendChild(this.el.nativeElement,t),this.renderer.setAttribute(t,"aria-hidden","true"),this.renderer.setAttribute(t,"role","presentation"),this.animationListener||(this.animationListener=this.renderer.listen(t,"animationend",this.onAnimationEnd.bind(this)))}remove(){let t=this.getInk();t&&(this.mouseDownListener&&this.mouseDownListener(),this.animationListener&&this.animationListener(),this.mouseDownListener=null,this.animationListener=null,p.removeElement(t))}ngOnDestroy(){this.config&&this.config.ripple&&this.remove()}static \u0275fac=function(e){return new(e||o)(i.Y36(m.K0),i.Y36(i.Lbi),i.Y36(i.Qsj),i.Y36(i.SBq),i.Y36(i.R0b),i.Y36(C.b4,8))};static \u0275dir=i.lG2({type:o,selectors:[["","pRipple",""]],hostAttrs:[1,"p-ripple","p-element"]})}return o})(),B=(()=>{class o{static \u0275fac=function(e){return new(e||o)};static \u0275mod=i.oAB({type:o});static \u0275inj=i.cJS({imports:[m.ez]})}return o})();function N(o,s){1&o&&i.GkF(0)}function A(o,s){if(1&o&&i._UZ(0,"span",8),2&o){const t=i.oxw(3);i.Tol("p-button-loading-icon pi-spin "+t.loadingIcon),i.Q6J("ngClass",t.iconClass()),i.uIk("aria-hidden",!0)("data-pc-section","loadingicon")}}function F(o,s){if(1&o&&i._UZ(0,"SpinnerIcon",9),2&o){const t=i.oxw(3);i.Q6J("styleClass",t.spinnerIconClass())("spin",!0),i.uIk("aria-hidden",!0)("data-pc-section","loadingicon")}}function H(o,s){if(1&o&&(i.ynx(0),i.YNc(1,A,1,5,"span",6)(2,F,1,4,"SpinnerIcon",7),i.BQk()),2&o){const t=i.oxw(2);i.xp6(1),i.Q6J("ngIf",t.loadingIcon),i.xp6(1),i.Q6J("ngIf",!t.loadingIcon)}}function P(o,s){}function k(o,s){1&o&&i.YNc(0,P,0,0,"ng-template")}function W(o,s){if(1&o&&(i.TgZ(0,"span",10),i.YNc(1,k,1,0,null,1),i.qZA()),2&o){const t=i.oxw(2);i.Q6J("ngClass",t.iconClass()),i.uIk("aria-hidden",!0)("data-pc-section","loadingicon"),i.xp6(1),i.Q6J("ngTemplateOutlet",t.loadingIconTemplate)}}function R(o,s){if(1&o&&(i.ynx(0),i.YNc(1,H,3,2,"ng-container",2)(2,W,2,4,"span",5),i.BQk()),2&o){const t=i.oxw();i.xp6(1),i.Q6J("ngIf",!t.loadingIconTemplate),i.xp6(1),i.Q6J("ngIf",t.loadingIconTemplate)}}function M(o,s){if(1&o&&i._UZ(0,"span",8),2&o){const t=i.oxw(2);i.Tol(t.icon),i.Q6J("ngClass",t.iconClass()),i.uIk("data-pc-section","icon")}}function z(o,s){}function Q(o,s){if(1&o&&i.YNc(0,z,0,0,"ng-template",12),2&o){const t=i.oxw(3);i.Q6J("ngIf",!t.icon)}}function Z(o,s){if(1&o&&(i.TgZ(0,"span",8),i.YNc(1,Q,1,1,null,1),i.qZA()),2&o){const t=i.oxw(2);i.Q6J("ngClass",t.iconClass()),i.uIk("data-pc-section","icon"),i.xp6(1),i.Q6J("ngTemplateOutlet",t.iconTemplate)}}function J(o,s){if(1&o&&(i.ynx(0),i.YNc(1,M,1,4,"span",6)(2,Z,2,3,"span",11),i.BQk()),2&o){const t=i.oxw();i.xp6(1),i.Q6J("ngIf",t.icon&&!t.iconTemplate),i.xp6(1),i.Q6J("ngIf",!t.icon&&t.iconTemplate)}}function U(o,s){if(1&o&&(i.TgZ(0,"span",13),i._uU(1),i.qZA()),2&o){const t=i.oxw();i.uIk("aria-hidden",t.icon&&!t.label)("data-pc-section","label"),i.xp6(1),i.Oqu(t.label)}}function V(o,s){if(1&o&&(i.TgZ(0,"span",8),i._uU(1),i.qZA()),2&o){const t=i.oxw();i.Tol(t.badgeClass),i.Q6J("ngClass",t.badgeStyleClass()),i.uIk("data-pc-section","badge"),i.xp6(1),i.Oqu(t.badge)}}const q=["*"];let Y=(()=>{class o{type="button";iconPos="left";icon;badge;label;disabled;loading=!1;loadingIcon;style;styleClass;badgeClass;ariaLabel;onClick=new i.vpe;onFocus=new i.vpe;onBlur=new i.vpe;contentTemplate;loadingIconTemplate;iconTemplate;templates;spinnerIconClass(){return Object.entries(this.iconClass()).filter(([,t])=>!!t).reduce((t,[e])=>t+` ${e}`,"p-button-loading-icon")}iconClass(){return{"p-button-icon":!0,"p-button-icon-left":"left"===this.iconPos&&this.label,"p-button-icon-right":"right"===this.iconPos&&this.label,"p-button-icon-top":"top"===this.iconPos&&this.label,"p-button-icon-bottom":"bottom"===this.iconPos&&this.label}}buttonClass(){return{"p-button p-component":!0,"p-button-icon-only":(this.icon||this.iconTemplate||this.loadingIcon||this.loadingIconTemplate)&&!this.label,"p-button-vertical":("top"===this.iconPos||"bottom"===this.iconPos)&&this.label,"p-disabled":this.disabled||this.loading,"p-button-loading":this.loading,"p-button-loading-label-only":this.loading&&!this.icon&&this.label&&!this.loadingIcon&&"left"===this.iconPos}}ngAfterContentInit(){this.templates?.forEach(t=>{switch(t.getType()){case"content":default:this.contentTemplate=t.template;break;case"icon":this.iconTemplate=t.template;break;case"loadingicon":this.loadingIconTemplate=t.template}})}badgeStyleClass(){return{"p-badge p-component":!0,"p-badge-no-gutter":this.badge&&1===String(this.badge).length}}static \u0275fac=function(e){return new(e||o)};static \u0275cmp=i.Xpm({type:o,selectors:[["p-button"]],contentQueries:function(e,n,l){if(1&e&&i.Suo(l,C.jx,4),2&e){let a;i.iGM(a=i.CRH())&&(n.templates=a)}},hostAttrs:[1,"p-element"],hostVars:2,hostBindings:function(e,n){2&e&&i.ekj("p-disabled",n.disabled)},inputs:{type:"type",iconPos:"iconPos",icon:"icon",badge:"badge",label:"label",disabled:"disabled",loading:"loading",loadingIcon:"loadingIcon",style:"style",styleClass:"styleClass",badgeClass:"badgeClass",ariaLabel:"ariaLabel"},outputs:{onClick:"onClick",onFocus:"onFocus",onBlur:"onBlur"},ngContentSelectors:q,decls:7,vars:14,consts:[["pRipple","",3,"ngStyle","disabled","ngClass","click","focus","blur"],[4,"ngTemplateOutlet"],[4,"ngIf"],["class","p-button-label",4,"ngIf"],[3,"ngClass","class",4,"ngIf"],["class","p-button-loading-icon",3,"ngClass",4,"ngIf"],[3,"class","ngClass",4,"ngIf"],[3,"styleClass","spin",4,"ngIf"],[3,"ngClass"],[3,"styleClass","spin"],[1,"p-button-loading-icon",3,"ngClass"],[3,"ngClass",4,"ngIf"],[3,"ngIf"],[1,"p-button-label"]],template:function(e,n){1&e&&(i.F$t(),i.TgZ(0,"button",0),i.NdJ("click",function(a){return n.onClick.emit(a)})("focus",function(a){return n.onFocus.emit(a)})("blur",function(a){return n.onBlur.emit(a)}),i.Hsn(1),i.YNc(2,N,1,0,"ng-container",1)(3,R,3,2,"ng-container",2)(4,J,3,2,"ng-container",2)(5,U,2,3,"span",3)(6,V,2,5,"span",4),i.qZA()),2&e&&(i.Tol(n.styleClass),i.Q6J("ngStyle",n.style)("disabled",n.disabled||n.loading)("ngClass",n.buttonClass()),i.uIk("type",n.type)("aria-label",n.ariaLabel)("data-pc-name","button")("data-pc-section","root"),i.xp6(2),i.Q6J("ngTemplateOutlet",n.contentTemplate),i.xp6(1),i.Q6J("ngIf",n.loading),i.xp6(1),i.Q6J("ngIf",!n.loading),i.xp6(1),i.Q6J("ngIf",!n.contentTemplate&&n.label),i.xp6(1),i.Q6J("ngIf",!n.contentTemplate&&n.badge))},dependencies:()=>[m.mk,m.O5,m.tP,m.PC,D,v],encapsulation:2,changeDetection:0})}return o})(),$=(()=>{class o{static \u0275fac=function(e){return new(e||o)};static \u0275mod=i.oAB({type:o});static \u0275inj=i.cJS({imports:[m.ez,B,C.m8,v,C.m8]})}return o})()}}]);