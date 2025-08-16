import{r as e,a as r,R as t,f as n,d as i,b as s,m as a,o}from"./vendor-DaVC9sma.js";!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver((e=>{for(const t of e)if("childList"===t.type)for(const e of t.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&r(e)})).observe(document,{childList:!0,subtree:!0})}function r(e){if(e.ep)return;e.ep=!0;const r=function(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),"use-credentials"===e.crossOrigin?r.credentials="include":"anonymous"===e.crossOrigin?r.credentials="omit":r.credentials="same-origin",r}(e);fetch(e.href,r)}}();var l={exports:{}},d={},c=e,h=Symbol.for("react.element"),x=Symbol.for("react.fragment"),p=Object.prototype.hasOwnProperty,m=c.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,g={key:!0,ref:!0,__self:!0,__source:!0};function u(e,r,t){var n,i={},s=null,a=null;for(n in void 0!==t&&(s=""+t),void 0!==r.key&&(s=""+r.key),void 0!==r.ref&&(a=r.ref),r)p.call(r,n)&&!g.hasOwnProperty(n)&&(i[n]=r[n]);if(e&&e.defaultProps)for(n in r=e.defaultProps)void 0===i[n]&&(i[n]=r[n]);return{$$typeof:h,type:e,key:s,ref:a,props:i,_owner:m.current}}d.Fragment=x,d.jsx=u,d.jsxs=u,l.exports=d;var f,b,j=l.exports,w={},v=r;
/**
 * @remix-run/router v1.23.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function y(){return y=Object.assign?Object.assign.bind():function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e},y.apply(this,arguments)}w.createRoot=v.createRoot,w.hydrateRoot=v.hydrateRoot,(b=f||(f={})).Pop="POP",b.Push="PUSH",b.Replace="REPLACE";const k="popstate";function C(e){return void 0===e&&(e={}),function(e,r,t,n){void 0===n&&(n={});let{window:i=document.defaultView,v5Compat:s=!1}=n,a=i.history,o=f.Pop,l=null,d=c();null==d&&(d=0,a.replaceState(y({},a.state,{idx:d}),""));function c(){return(a.state||{idx:null}).idx}function h(){o=f.Pop;let e=c(),r=null==e?null:e-d;d=e,l&&l({action:o,location:g.location,delta:r})}function x(e,r){o=f.Push;let t=P(g.location,e,r);d=c()+1;let n=z(t,d),h=g.createHref(t);try{a.pushState(n,"",h)}catch(x){if(x instanceof DOMException&&"DataCloneError"===x.name)throw x;i.location.assign(h)}s&&l&&l({action:o,location:g.location,delta:1})}function p(e,r){o=f.Replace;let t=P(g.location,e,r);d=c();let n=z(t,d),i=g.createHref(t);a.replaceState(n,"",i),s&&l&&l({action:o,location:g.location,delta:0})}function m(e){let r="null"!==i.location.origin?i.location.origin:i.location.href,t="string"==typeof e?e:O(e);return t=t.replace(/ $/,"%20"),S(r,"No window.location.(origin|href) available to create URL for href: "+t),new URL(t,r)}let g={get action(){return o},get location(){return e(i,a)},listen(e){if(l)throw new Error("A history only accepts one active listener");return i.addEventListener(k,h),l=e,()=>{i.removeEventListener(k,h),l=null}},createHref:e=>r(i,e),createURL:m,encodeLocation(e){let r=m(e);return{pathname:r.pathname,search:r.search,hash:r.hash}},push:x,replace:p,go:e=>a.go(e)};return g}((function(e,r){let{pathname:t,search:n,hash:i}=e.location;return P("",{pathname:t,search:n,hash:i},r.state&&r.state.usr||null,r.state&&r.state.key||"default")}),(function(e,r){return"string"==typeof r?r:O(r)}),0,e)}function S(e,r){if(!1===e||null==e)throw new Error(r)}function E(e,r){if(!e){"undefined"!=typeof console&&console.warn(r);try{throw new Error(r)}catch(t){}}}function z(e,r){return{usr:e.state,key:e.key,idx:r}}function P(e,r,t,n){return void 0===t&&(t=null),y({pathname:"string"==typeof e?e:e.pathname,search:"",hash:""},"string"==typeof r?L(r):r,{state:t,key:r&&r.key||n||Math.random().toString(36).substr(2,8)})}function O(e){let{pathname:r="/",search:t="",hash:n=""}=e;return t&&"?"!==t&&(r+="?"===t.charAt(0)?t:"?"+t),n&&"#"!==n&&(r+="#"===n.charAt(0)?n:"#"+n),r}function L(e){let r={};if(e){let t=e.indexOf("#");t>=0&&(r.hash=e.substr(t),e=e.substr(0,t));let n=e.indexOf("?");n>=0&&(r.search=e.substr(n),e=e.substr(0,n)),e&&(r.pathname=e)}return r}var D,A;function B(e,r,t){return void 0===t&&(t="/"),function(e,r,t){let n="string"==typeof r?L(r):r,i=X(n.pathname||"/",t);if(null==i)return null;let s=R(e);!function(e){e.sort(((e,r)=>e.score!==r.score?r.score-e.score:function(e,r){let t=e.length===r.length&&e.slice(0,-1).every(((e,t)=>e===r[t]));return t?e[e.length-1]-r[r.length-1]:0}(e.routesMeta.map((e=>e.childrenIndex)),r.routesMeta.map((e=>e.childrenIndex)))))}(s);let a=null;for(let o=0;null==a&&o<s.length;++o){let e=W(i);a=H(s[o],e)}return a}(e,r,t)}function R(e,r,t,n){void 0===r&&(r=[]),void 0===t&&(t=[]),void 0===n&&(n="");let i=(e,i,s)=>{let a={relativePath:void 0===s?e.path||"":s,caseSensitive:!0===e.caseSensitive,childrenIndex:i,route:e};a.relativePath.startsWith("/")&&(S(a.relativePath.startsWith(n),'Absolute route path "'+a.relativePath+'" nested under path "'+n+'" is not valid. An absolute child route path must start with the combined path of all its parent routes.'),a.relativePath=a.relativePath.slice(n.length));let o=Z([n,a.relativePath]),l=t.concat(a);e.children&&e.children.length>0&&(S(!0!==e.index,'Index routes must not have child routes. Please remove all child routes from route path "'+o+'".'),R(e.children,r,l,o)),(null!=e.path||e.index)&&r.push({path:o,score:F(o,e.index),routesMeta:l})};return e.forEach(((e,r)=>{var t;if(""!==e.path&&null!=(t=e.path)&&t.includes("?"))for(let n of M(e.path))i(e,r,n);else i(e,r)})),r}function M(e){let r=e.split("/");if(0===r.length)return[];let[t,...n]=r,i=t.endsWith("?"),s=t.replace(/\?$/,"");if(0===n.length)return i?[s,""]:[s];let a=M(n.join("/")),o=[];return o.push(...a.map((e=>""===e?s:[s,e].join("/")))),i&&o.push(...a),o.map((r=>e.startsWith("/")&&""===r?"/":r))}(A=D||(D={})).data="data",A.deferred="deferred",A.redirect="redirect",A.error="error";const $=/^:[\w-]+$/,V=3,T=2,Y=1,U=10,N=-2,G=e=>"*"===e;function F(e,r){let t=e.split("/"),n=t.length;return t.some(G)&&(n+=N),r&&(n+=T),t.filter((e=>!G(e))).reduce(((e,r)=>e+($.test(r)?V:""===r?Y:U)),n)}function H(e,r,t){let{routesMeta:n}=e,i={},s="/",a=[];for(let o=0;o<n.length;++o){let e=n[o],t=o===n.length-1,l="/"===s?r:r.slice(s.length)||"/",d=I({path:e.relativePath,caseSensitive:e.caseSensitive,end:t},l),c=e.route;if(!d)return null;Object.assign(i,d.params),a.push({params:i,pathname:Z([s,d.pathname]),pathnameBase:Q(Z([s,d.pathnameBase])),route:c}),"/"!==d.pathnameBase&&(s=Z([s,d.pathnameBase]))}return a}function I(e,r){"string"==typeof e&&(e={path:e,caseSensitive:!1,end:!0});let[t,n]=function(e,r,t){void 0===r&&(r=!1);void 0===t&&(t=!0);E("*"===e||!e.endsWith("*")||e.endsWith("/*"),'Route path "'+e+'" will be treated as if it were "'+e.replace(/\*$/,"/*")+'" because the `*` character must always follow a `/` in the pattern. To get rid of this warning, please change the route path to "'+e.replace(/\*$/,"/*")+'".');let n=[],i="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,((e,r,t)=>(n.push({paramName:r,isOptional:null!=t}),t?"/?([^\\/]+)?":"/([^\\/]+)")));e.endsWith("*")?(n.push({paramName:"*"}),i+="*"===e||"/*"===e?"(.*)$":"(?:\\/(.+)|\\/*)$"):t?i+="\\/*$":""!==e&&"/"!==e&&(i+="(?:(?=\\/|$))");let s=new RegExp(i,r?void 0:"i");return[s,n]}(e.path,e.caseSensitive,e.end),i=r.match(t);if(!i)return null;let s=i[0],a=s.replace(/(.)\/+$/,"$1"),o=i.slice(1);return{params:n.reduce(((e,r,t)=>{let{paramName:n,isOptional:i}=r;if("*"===n){let e=o[t]||"";a=s.slice(0,s.length-e.length).replace(/(.)\/+$/,"$1")}const l=o[t];return e[n]=i&&!l?void 0:(l||"").replace(/%2F/g,"/"),e}),{}),pathname:s,pathnameBase:a,pattern:e}}function W(e){try{return e.split("/").map((e=>decodeURIComponent(e).replace(/\//g,"%2F"))).join("/")}catch(r){return E(!1,'The URL path "'+e+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent encoding ('+r+")."),e}}function X(e,r){if("/"===r)return e;if(!e.toLowerCase().startsWith(r.toLowerCase()))return null;let t=r.endsWith("/")?r.length-1:r.length,n=e.charAt(t);return n&&"/"!==n?null:e.slice(t)||"/"}function _(e,r,t,n){return"Cannot include a '"+e+"' character in a manually specified `to."+r+"` field ["+JSON.stringify(n)+"].  Please separate it out to the `to."+t+'` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.'}function J(e,r){let t=function(e){return e.filter(((e,r)=>0===r||e.route.path&&e.route.path.length>0))}(e);return r?t.map(((e,r)=>r===t.length-1?e.pathname:e.pathnameBase)):t.map((e=>e.pathnameBase))}function q(e,r,t,n){let i;void 0===n&&(n=!1),"string"==typeof e?i=L(e):(i=y({},e),S(!i.pathname||!i.pathname.includes("?"),_("?","pathname","search",i)),S(!i.pathname||!i.pathname.includes("#"),_("#","pathname","hash",i)),S(!i.search||!i.search.includes("#"),_("#","search","hash",i)));let s,a=""===e||""===i.pathname,o=a?"/":i.pathname;if(null==o)s=t;else{let e=r.length-1;if(!n&&o.startsWith("..")){let r=o.split("/");for(;".."===r[0];)r.shift(),e-=1;i.pathname=r.join("/")}s=e>=0?r[e]:"/"}let l=function(e,r){void 0===r&&(r="/");let{pathname:t,search:n="",hash:i=""}="string"==typeof e?L(e):e,s=t?t.startsWith("/")?t:function(e,r){let t=r.replace(/\/+$/,"").split("/");return e.split("/").forEach((e=>{".."===e?t.length>1&&t.pop():"."!==e&&t.push(e)})),t.length>1?t.join("/"):"/"}(t,r):r;return{pathname:s,search:K(n),hash:ee(i)}}(i,s),d=o&&"/"!==o&&o.endsWith("/"),c=(a||"."===o)&&t.endsWith("/");return l.pathname.endsWith("/")||!d&&!c||(l.pathname+="/"),l}const Z=e=>e.join("/").replace(/\/\/+/g,"/"),Q=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),K=e=>e&&"?"!==e?e.startsWith("?")?e:"?"+e:"",ee=e=>e&&"#"!==e?e.startsWith("#")?e:"#"+e:"";const re=["post","put","patch","delete"];new Set(re);const te=["get",...re];
/**
 * React Router v6.30.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function ne(){return ne=Object.assign?Object.assign.bind():function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e},ne.apply(this,arguments)}new Set(te);const ie=e.createContext(null),se=e.createContext(null),ae=e.createContext(null),oe=e.createContext(null),le=e.createContext({outlet:null,matches:[],isDataRoute:!1}),de=e.createContext(null);function ce(){return null!=e.useContext(oe)}function he(){return ce()||S(!1),e.useContext(oe).location}function xe(r){e.useContext(ae).static||e.useLayoutEffect(r)}function pe(){let{isDataRoute:r}=e.useContext(le);return r?function(){let{router:r}=function(){let r=e.useContext(ie);return r||S(!1),r}(we.UseNavigateStable),t=ye(ve.UseNavigateStable),n=e.useRef(!1);return xe((()=>{n.current=!0})),e.useCallback((function(e,i){void 0===i&&(i={}),n.current&&("number"==typeof e?r.navigate(e):r.navigate(e,ne({fromRouteId:t},i)))}),[r,t])}():function(){ce()||S(!1);let r=e.useContext(ie),{basename:t,future:n,navigator:i}=e.useContext(ae),{matches:s}=e.useContext(le),{pathname:a}=he(),o=JSON.stringify(J(s,n.v7_relativeSplatPath)),l=e.useRef(!1);return xe((()=>{l.current=!0})),e.useCallback((function(e,n){if(void 0===n&&(n={}),!l.current)return;if("number"==typeof e)return void i.go(e);let s=q(e,JSON.parse(o),a,"path"===n.relative);null==r&&"/"!==t&&(s.pathname="/"===s.pathname?t:Z([t,s.pathname])),(n.replace?i.replace:i.push)(s,n.state,n)}),[t,i,o,a,r])}()}function me(r,t){let{relative:n}=void 0===t?{}:t,{future:i}=e.useContext(ae),{matches:s}=e.useContext(le),{pathname:a}=he(),o=JSON.stringify(J(s,i.v7_relativeSplatPath));return e.useMemo((()=>q(r,JSON.parse(o),a,"path"===n)),[r,o,a,n])}function ge(r,t){return function(r,t,n,i){ce()||S(!1);let{navigator:s,static:a}=e.useContext(ae),{matches:o}=e.useContext(le),l=o[o.length-1],d=l?l.params:{};!l||l.pathname;let c=l?l.pathnameBase:"/";l&&l.route;let h,x=he();if(t){var p;let e="string"==typeof t?L(t):t;"/"===c||(null==(p=e.pathname)?void 0:p.startsWith(c))||S(!1),h=e}else h=x;let m=h.pathname||"/",g=m;if("/"!==c){let e=c.replace(/^\//,"").split("/");g="/"+m.replace(/^\//,"").split("/").slice(e.length).join("/")}let u=B(r,{pathname:g}),b=function(r,t,n,i){var s;void 0===t&&(t=[]);void 0===n&&(n=null);void 0===i&&(i=null);if(null==r){var a;if(!n)return null;if(n.errors)r=n.matches;else{if(!(null!=(a=i)&&a.v7_partialHydration&&0===t.length&&!n.initialized&&n.matches.length>0))return null;r=n.matches}}let o=r,l=null==(s=n)?void 0:s.errors;if(null!=l){let e=o.findIndex((e=>e.route.id&&void 0!==(null==l?void 0:l[e.route.id])));e>=0||S(!1),o=o.slice(0,Math.min(o.length,e+1))}let d=!1,c=-1;if(n&&i&&i.v7_partialHydration)for(let e=0;e<o.length;e++){let r=o[e];if((r.route.HydrateFallback||r.route.hydrateFallbackElement)&&(c=e),r.route.id){let{loaderData:e,errors:t}=n,i=r.route.loader&&void 0===e[r.route.id]&&(!t||void 0===t[r.route.id]);if(r.route.lazy||i){d=!0,o=c>=0?o.slice(0,c+1):[o[0]];break}}}return o.reduceRight(((r,i,s)=>{let a,h=!1,x=null,p=null;var m;n&&(a=l&&i.route.id?l[i.route.id]:void 0,x=i.route.errorElement||fe,d&&(c<0&&0===s?(ke[m="route-fallback"]||(ke[m]=!0),h=!0,p=null):c===s&&(h=!0,p=i.route.hydrateFallbackElement||null)));let g=t.concat(o.slice(0,s+1)),u=()=>{let t;return t=a?x:h?p:i.route.Component?e.createElement(i.route.Component,null):i.route.element?i.route.element:r,e.createElement(je,{match:i,routeContext:{outlet:r,matches:g,isDataRoute:null!=n},children:t})};return n&&(i.route.ErrorBoundary||i.route.errorElement||0===s)?e.createElement(be,{location:n.location,revalidation:n.revalidation,component:x,error:a,children:u(),routeContext:{outlet:null,matches:g,isDataRoute:!0}}):u()}),null)}(u&&u.map((e=>Object.assign({},e,{params:Object.assign({},d,e.params),pathname:Z([c,s.encodeLocation?s.encodeLocation(e.pathname).pathname:e.pathname]),pathnameBase:"/"===e.pathnameBase?c:Z([c,s.encodeLocation?s.encodeLocation(e.pathnameBase).pathname:e.pathnameBase])}))),o,n,i);if(t&&b)return e.createElement(oe.Provider,{value:{location:ne({pathname:"/",search:"",hash:"",state:null,key:"default"},h),navigationType:f.Pop}},b);return b}(r,t)}function ue(){let r=function(){var r;let t=e.useContext(de),n=function(){let r=e.useContext(se);return r||S(!1),r}(),i=ye();if(void 0!==t)return t;return null==(r=n.errors)?void 0:r[i]}(),t=function(e){return null!=e&&"number"==typeof e.status&&"string"==typeof e.statusText&&"boolean"==typeof e.internal&&"data"in e}(r)?r.status+" "+r.statusText:r instanceof Error?r.message:JSON.stringify(r),n=r instanceof Error?r.stack:null,i={padding:"0.5rem",backgroundColor:"rgba(200,200,200, 0.5)"};return e.createElement(e.Fragment,null,e.createElement("h2",null,"Unexpected Application Error!"),e.createElement("h3",{style:{fontStyle:"italic"}},t),n?e.createElement("pre",{style:i},n):null,null)}const fe=e.createElement(ue,null);class be extends e.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,r){return r.location!==e.location||"idle"!==r.revalidation&&"idle"===e.revalidation?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:void 0!==e.error?e.error:r.error,location:r.location,revalidation:e.revalidation||r.revalidation}}componentDidCatch(e,r){console.error("React Router caught the following error during render",e,r)}render(){return void 0!==this.state.error?e.createElement(le.Provider,{value:this.props.routeContext},e.createElement(de.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function je(r){let{routeContext:t,match:n,children:i}=r,s=e.useContext(ie);return s&&s.static&&s.staticContext&&(n.route.errorElement||n.route.ErrorBoundary)&&(s.staticContext._deepestRenderedBoundaryId=n.route.id),e.createElement(le.Provider,{value:t},i)}var we=function(e){return e.UseBlocker="useBlocker",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e}(we||{}),ve=function(e){return e.UseBlocker="useBlocker",e.UseLoaderData="useLoaderData",e.UseActionData="useActionData",e.UseRouteError="useRouteError",e.UseNavigation="useNavigation",e.UseRouteLoaderData="useRouteLoaderData",e.UseMatches="useMatches",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e.UseRouteId="useRouteId",e}(ve||{});function ye(r){let t=function(){let r=e.useContext(le);return r||S(!1),r}(),n=t.matches[t.matches.length-1];return n.route.id||S(!1),n.route.id}const ke={};function Ce(r){let{to:t,replace:n,state:i,relative:s}=r;ce()||S(!1);let{future:a,static:o}=e.useContext(ae),{matches:l}=e.useContext(le),{pathname:d}=he(),c=pe(),h=q(t,J(l,a.v7_relativeSplatPath),d,"path"===s),x=JSON.stringify(h);return e.useEffect((()=>c(JSON.parse(x),{replace:n,state:i,relative:s})),[c,x,s,n,i]),null}function Se(e){S(!1)}function Ee(r){let{basename:t="/",children:n=null,location:i,navigationType:s=f.Pop,navigator:a,static:o=!1,future:l}=r;ce()&&S(!1);let d=t.replace(/^\/*/,"/"),c=e.useMemo((()=>({basename:d,navigator:a,static:o,future:ne({v7_relativeSplatPath:!1},l)})),[d,l,a,o]);"string"==typeof i&&(i=L(i));let{pathname:h="/",search:x="",hash:p="",state:m=null,key:g="default"}=i,u=e.useMemo((()=>{let e=X(h,d);return null==e?null:{location:{pathname:e,search:x,hash:p,state:m,key:g},navigationType:s}}),[d,h,x,p,m,g,s]);return null==u?null:e.createElement(ae.Provider,{value:c},e.createElement(oe.Provider,{children:n,value:u}))}function ze(e){let{children:r,location:t}=e;return ge(Pe(r),t)}function Pe(r,t){void 0===t&&(t=[]);let n=[];return e.Children.forEach(r,((r,i)=>{if(!e.isValidElement(r))return;let s=[...t,i];if(r.type===e.Fragment)return void n.push.apply(n,Pe(r.props.children,s));r.type!==Se&&S(!1),r.props.index&&r.props.children&&S(!1);let a={id:r.props.id||s.join("-"),caseSensitive:r.props.caseSensitive,element:r.props.element,Component:r.props.Component,index:r.props.index,path:r.props.path,loader:r.props.loader,action:r.props.action,errorElement:r.props.errorElement,ErrorBoundary:r.props.ErrorBoundary,hasErrorBoundary:null!=r.props.ErrorBoundary||null!=r.props.errorElement,shouldRevalidate:r.props.shouldRevalidate,handle:r.props.handle,lazy:r.props.lazy};r.props.children&&(a.children=Pe(r.props.children,s)),n.push(a)})),n}
/**
 * React Router DOM v6.30.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Oe(){return Oe=Object.assign?Object.assign.bind():function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e},Oe.apply(this,arguments)}new Promise((()=>{}));const Le=["onClick","relative","reloadDocument","replace","state","target","to","preventScrollReset","viewTransition"];try{window.__reactRouterVersion="6"}catch(eo){}const De=t.startTransition;function Ae(r){let{basename:t,children:n,future:i,window:s}=r,a=e.useRef();null==a.current&&(a.current=C({window:s,v5Compat:!0}));let o=a.current,[l,d]=e.useState({action:o.action,location:o.location}),{v7_startTransition:c}=i||{},h=e.useCallback((e=>{c&&De?De((()=>d(e))):d(e)}),[d,c]);return e.useLayoutEffect((()=>o.listen(h)),[o,h]),e.useEffect((()=>{return null==(e=i)||e.v7_startTransition,void(null==e||e.v7_relativeSplatPath);var e}),[i]),e.createElement(Ee,{basename:t,children:n,location:l.location,navigationType:l.action,navigator:o,future:i})}const Be="undefined"!=typeof window&&void 0!==window.document&&void 0!==window.document.createElement,Re=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,Me=e.forwardRef((function(r,t){let n,{onClick:i,relative:s,reloadDocument:a,replace:o,state:l,target:d,to:c,preventScrollReset:h,viewTransition:x}=r,p=function(e,r){if(null==e)return{};var t,n,i={},s=Object.keys(e);for(n=0;n<s.length;n++)t=s[n],r.indexOf(t)>=0||(i[t]=e[t]);return i}(r,Le),{basename:m}=e.useContext(ae),g=!1;if("string"==typeof c&&Re.test(c)&&(n=c,Be))try{let e=new URL(window.location.href),r=c.startsWith("//")?new URL(e.protocol+c):new URL(c),t=X(r.pathname,m);r.origin===e.origin&&null!=t?c=t+r.search+r.hash:g=!0}catch(eo){}let u=function(r,t){let{relative:n}=void 0===t?{}:t;ce()||S(!1);let{basename:i,navigator:s}=e.useContext(ae),{hash:a,pathname:o,search:l}=me(r,{relative:n}),d=o;return"/"!==i&&(d="/"===o?i:Z([i,o])),s.createHref({pathname:d,search:l,hash:a})}(c,{relative:s}),f=function(r,t){let{target:n,replace:i,state:s,preventScrollReset:a,relative:o,viewTransition:l}=void 0===t?{}:t,d=pe(),c=he(),h=me(r,{relative:o});return e.useCallback((e=>{if(function(e,r){return!(0!==e.button||r&&"_self"!==r||function(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}(e))}(e,n)){e.preventDefault();let t=void 0!==i?i:O(c)===O(h);d(r,{replace:t,state:s,preventScrollReset:a,relative:o,viewTransition:l})}}),[c,d,h,i,s,n,r,a,o,l])}(c,{replace:o,state:l,target:d,preventScrollReset:h,relative:s,viewTransition:x});return e.createElement("a",Oe({},p,{href:n||u,onClick:g||a?i:function(e){i&&i(e),e.defaultPrevented||f(e)},ref:t,target:d}))}));var $e,Ve,Te,Ye;(Ve=$e||($e={})).UseScrollRestoration="useScrollRestoration",Ve.UseSubmit="useSubmit",Ve.UseSubmitFetcher="useSubmitFetcher",Ve.UseFetcher="useFetcher",Ve.useViewTransitionState="useViewTransitionState",(Ye=Te||(Te={})).UseFetcher="useFetcher",Ye.UseFetchers="useFetchers",Ye.UseScrollRestoration="useScrollRestoration";const Ue=n`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }

  body {
    font-family: ${({theme:e})=>e.fonts.body};
    background-color: ${({theme:e})=>e.colors.background};
    color: ${({theme:e})=>e.colors.text};
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
    font-family: inherit;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  @media (max-width: ${({theme:e})=>e.breakpoints.mobile}) {
    html {
      font-size: 14px;
    }
  }
`,Ne={US:"USD",GB:"GBP",EU:"EUR"},Ge={en:"english",es:"español",fr:"français",de:"deutsch",it:"italiano",zh:"中文",ja:"日本語",pt:"português",ar:"العربية",hi:"hindi"},Fe=()=>{const e=navigator.language.split("-")[0].toLowerCase();return Ge[e]||"english"},He={english:{chooseGames:"Choose Games",language:"Language",currency:"Currency",cart:"Shopping Cart",profile:"Profile",home:"Home",games:"Games",about:"About",contact:"Contact",newUserDiscount:"🎮 20% discount for new users on first purchase",referralBonus:"👥 Bring a friend and get 500 bonus points",weeklyGamesDiscount:"🎯 15% discount on all games this week",premiumDiscount:"🌟 Premium subscription -30% today only",joinDiscord:"🎁 Join our Discord server",promoCode:"Promo code",join:"Join",buyNow:"Buy Now"},"español":{chooseGames:"Elegir Juegos",language:"Idioma",currency:"Moneda",cart:"Carrito",profile:"Perfil",home:"Inicio",games:"Juegos",about:"Acerca de",contact:"Contacto",newUserDiscount:"🎮 20% de descuento para nuevos usuarios en primera compra",referralBonus:"👥 Trae un amigo y obtén 500 puntos de bonificación",weeklyGamesDiscount:"🎯 15% de descuento en todos los juegos esta semana",premiumDiscount:"🌟 Suscripción Premium -30% solo hoy",joinDiscord:"🎁 Únete a nuestro servidor de Discord",promoCode:"Código promo",join:"Unirse",buyNow:"Comprar ahora"},"français":{chooseGames:"Choisir des Jeux",language:"Langue",currency:"Devise",cart:"Panier",profile:"Profil",home:"Accueil",games:"Jeux",about:"À propos",contact:"Contact",newUserDiscount:"🎮 20% de réduction pour les nouveaux utilisateurs",referralBonus:"👥 Parrainez un ami et obtenez 500 points bonus",weeklyGamesDiscount:"🎯 15% de réduction sur tous les jeux cette semaine",premiumDiscount:"🌟 Abonnement Premium -30% aujourd'hui uniquement",joinDiscord:"🎁 Rejoignez notre serveur Discord",promoCode:"Code promo",join:"Rejoindre",buyNow:"Acheter maintenant"},deutsch:{chooseGames:"Spiele Wählen",language:"Sprache",currency:"Währung",cart:"Warenkorb",profile:"Profil",home:"Startseite",games:"Spiele",about:"Über uns",contact:"Kontakt",newUserDiscount:"🎮 20% Rabatt für Neukunden beim ersten Kauf",referralBonus:"👥 Freund einladen und 500 Bonuspunkte erhalten",weeklyGamesDiscount:"🎯 15% Rabatt auf alle Spiele diese Woche",premiumDiscount:"🌟 Premium-Abonnement -30% nur heute",joinDiscord:"🎁 Tritt unserem Discord-Server bei",promoCode:"Promo-Code",join:"Beitreten",buyNow:"Jetzt kaufen"},italiano:{chooseGames:"Scegli Giochi",language:"Lingua",currency:"Valuta",cart:"Carrello",profile:"Profilo",home:"Home",games:"Giochi",about:"Chi siamo",contact:"Contatti",newUserDiscount:"🎮 Sconto del 20% per i nuovi utenti sul primo acquisto",referralBonus:"👥 Porta un amico e ottieni 500 punti bonus",weeklyGamesDiscount:"🎯 Sconto del 15% su tutti i giochi questa settimana",premiumDiscount:"🌟 Abbonamento Premium -30% solo oggi",joinDiscord:"🎁 Unisciti al nostro server Discord",promoCode:"Codice promo",join:"Unisciti",buyNow:"Acquista ora"},"中文":{chooseGames:"选择游戏",language:"语言",currency:"货币",cart:"购物车",profile:"个人资料",home:"首页",games:"游戏",about:"关于我们",contact:"联系我们",newUserDiscount:"🎮 新用户首次购买享20%折扣",referralBonus:"👥 邀请好友获得500奖励积分",weeklyGamesDiscount:"🎯 本周所有游戏15%折扣",premiumDiscount:"🌟 Premium会员今日特惠30%",joinDiscord:"🎁 加入我们的Discord服务器",promoCode:"优惠码",join:"加入",buyNow:"立即购买"},"日本語":{chooseGames:"ゲームを選択",language:"言語",currency:"通貨",cart:"カート",profile:"プロフィール",home:"ホーム",games:"ゲーム",about:"会社概要",contact:"お問い合わせ",newUserDiscount:"🎮 新規ユーザー初回購入20%オフ",referralBonus:"👥 友達を招待して500ボーナスポイント獲得",weeklyGamesDiscount:"🎯 今週すべてのゲーム15%オフ",premiumDiscount:"🌟 プレミアム会員30%オフ 本日限り",joinDiscord:"🎁 Discordサーバーに参加",promoCode:"プロモコード",join:"参加",buyNow:"今すぐ購入"},"português":{chooseGames:"Escolher Jogos",language:"Idioma",currency:"Moeda",cart:"Carrinho",profile:"Perfil",home:"Início",games:"Jogos",about:"Sobre nós",contact:"Contato",newUserDiscount:"🎮 20% de desconto para novos usuários na primeira compra",referralBonus:"👥 Traga um amigo e ganhe 500 pontos de bônus",weeklyGamesDiscount:"🎯 15% de desconto em todos os jogos esta semana",premiumDiscount:"🌟 Assinatura Premium -30% apenas hoje",joinDiscord:"🎁 Entre no nosso servidor Discord",promoCode:"Código promo",join:"Entrar",buyNow:"Comprar agora"},"العربية":{chooseGames:"اختر الألعاب",language:"اللغة",currency:"العملة",cart:"عربة التسوق",profile:"الملف الشخصي",home:"الرئيسية",games:"الألعاب",about:"من نحن",contact:"اتصل بنا",newUserDiscount:"🎮 خصم 20% للمستخدمين الجدد على أول عملية شراء",referralBonus:"👥 اجلب صديقًا واحصل على 500 نقطة مكافأة",weeklyGamesDiscount:"🎯 خصم 15% على جميع الألعاب هذا الأسبوع",premiumDiscount:"🌟 اشتراك بريميوم -30% اليوم فقط",joinDiscord:"🎁 انضم إلى سيرفر Discord",promoCode:"رمز ترويجي",join:"انضم",buyNow:"اشتر الآن"},hindi:{chooseGames:"गेम्स चुनें",language:"भाषा",currency:"मुद्रा",cart:"कार्ट",profile:"प्रोफाइल",home:"होम",games:"गेम्स",about:"हमारे बारे में",contact:"संपर्क करें",newUserDiscount:"🎮 नए उपयोगकर्ताओं को पहली खरीद पर 20% छूट",referralBonus:"👥 मित्र को लाएं और 500 बोनस पॉइंट्स पाएं",weeklyGamesDiscount:"🎯 इस सप्ताह सभी गेम्स पर 15% छूट",premiumDiscount:"🌟 प्रीमियम सदस्यता -30% केवल आज",joinDiscord:"🎁 हमारे Discord सर्वर से जुड़ें",promoCode:"प्रोमो कोड",join:"जुड़ें",buyNow:"अभी खरीदें"}},Ie=e.createContext({language:"english",currency:"USD",country:"US",setLanguage:()=>{},setCurrency:()=>{},t:e=>e,isLoading:!0,error:null}),We=({children:r})=>{const t=(()=>{const[r,t]=e.useState({country:"",currency:"USD",language:Fe(),isLoading:!0,error:null});return e.useEffect((()=>{(async()=>{try{const e=await fetch("https://ipapi.co/json/");if(!e.ok)throw new Error("Failed to fetch location data");const r=await e.json(),n=Ne[r.country_code]||"USD",i={US:"english",GB:"english",ES:"español",FR:"français",DE:"deutsch",IT:"italiano",CN:"中文",TW:"中文",HK:"中文",JP:"日本語",PT:"português",BR:"português",SA:"العربية",AE:"العربية",IN:"hindi"}[r.country_code]||"english";t({country:r.country_code,currency:n,language:i,isLoading:!1,error:null})}catch(d){console.error("Error detecting location:",d),t({country:"",currency:"USD",language:Fe(),isLoading:!1,error:d instanceof Error?d.message:"Failed to detect location"})}})()}),[]),r})(),[n,i]=e.useState("english"),[s,a]=e.useState("USD"),[o,l]=e.useState("US"),[d,c]=e.useState(null),[h,x]=e.useState(!0);e.useEffect((()=>{if(!t.isLoading){const e=t.language||"english";i(e),a(t.currency||"USD"),l(t.country||"US"),x(!1),localStorage.setItem("language",e);const r=new CustomEvent("languageChanged",{detail:{language:e}});window.dispatchEvent(r)}t.error&&(c(t.error),x(!1),console.error("Localization error:",t.error))}),[t]);const p={language:n,currency:s,country:o,setLanguage:e=>{i(e),localStorage.setItem("language",e);const r=new CustomEvent("languageChanged",{detail:{language:e}});window.dispatchEvent(r)},setCurrency:a,t:e=>{var r;try{const t=n.toLowerCase();return(null==(r=He[t])?void 0:r[e])||He.english[e]}catch(t){return console.error("Translation error:",t),He.english[e]}},isLoading:h,error:d};return j.jsx(Ie.Provider,{value:p,children:r})},Xe=()=>{const r=e.useContext(Ie);if(!r)throw new Error("useLocalization must be used within a LocalizationProvider");return r};function _e(){return _e=Object.assign?Object.assign.bind():function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var n in t)({}).hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e},_e.apply(null,arguments)}function Je(e){return(Je="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function qe(e){var r=function(e,r){if("object"!=Je(e)||!e)return e;var t=e[Symbol.toPrimitive];if(void 0!==t){var n=t.call(e,r);if("object"!=Je(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===r?String:Number)(e)}(e,"string");return"symbol"==Je(r)?r:r+""}var Ze=["children","iconAttrs","iconVerticalAlign","iconViewBox","size","title"];function Qe(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function Ke(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?Qe(Object(t),!0).forEach((function(r){var n,i,s;n=e,i=r,s=t[r],(i=qe(i))in n?Object.defineProperty(n,i,{value:s,enumerable:!0,configurable:!0,writable:!0}):n[i]=s})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):Qe(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}var er=i(e.forwardRef((function(r,t){var n=r.children,i=r.iconAttrs;r.iconVerticalAlign;var s=r.iconViewBox,a=r.size,o=r.title,l=function(e,r){if(null==e)return{};var t,n,i=function(e,r){if(null==e)return{};var t={};for(var n in e)if({}.hasOwnProperty.call(e,n)){if(-1!==r.indexOf(n))continue;t[n]=e[n]}return t}(e,r);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(n=0;n<s.length;n++)t=s[n],-1===r.indexOf(t)&&{}.propertyIsEnumerable.call(e,t)&&(i[t]=e[t])}return i}(r,Ze),d=Ke(Ke({viewBox:s,height:void 0!==r.height?r.height:a,width:void 0!==r.width?r.width:a,"aria-hidden":null==o?"true":void 0,focusable:"false",role:null!=o?"img":void 0},i),l);return e.createElement("svg",_e({},d,{ref:t}),o&&e.createElement("title",{key:"icon-title"},o),n)}))).withConfig({displayName:"StyledIconBase",componentId:"sc-ea9ulj-0"})(["display:inline-block;vertical-align:",";overflow:hidden;"],(function(e){return e.iconVerticalAlign})),rr=e.forwardRef((function(r,t){return e.createElement(er,_e({iconAttrs:{fill:"currentColor",xmlns:"http://www.w3.org/2000/svg"},iconVerticalAlign:"middle",iconViewBox:"0 0 24 24"},r,{ref:t}),e.createElement("path",{d:"M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"}))}));rr.displayName="KeyboardArrowDown";var tr=e.forwardRef((function(r,t){return e.createElement(er,_e({iconAttrs:{fill:"currentColor",xmlns:"http://www.w3.org/2000/svg"},iconVerticalAlign:"middle",iconViewBox:"0 0 24 24"},r,{ref:t}),e.createElement("path",{d:"M12 2A10.13 10.13 0 0 0 2 12a10 10 0 0 0 4 7.92V20h.1a9.7 9.7 0 0 0 11.8 0h.1v-.08A10 10 0 0 0 22 12 10.13 10.13 0 0 0 12 2zM8.07 18.93A3 3 0 0 1 11 16.57h2a3 3 0 0 1 2.93 2.36 7.75 7.75 0 0 1-7.86 0zm9.54-1.29A5 5 0 0 0 13 14.57h-2a5 5 0 0 0-4.61 3.07A8 8 0 0 1 4 12a8.1 8.1 0 0 1 8-8 8.1 8.1 0 0 1 8 8 8 8 0 0 1-2.39 5.64z"}),e.createElement("path",{d:"M12 6a3.91 3.91 0 0 0-4 4 3.91 3.91 0 0 0 4 4 3.91 3.91 0 0 0 4-4 3.91 3.91 0 0 0-4-4zm0 6a1.91 1.91 0 0 1-2-2 1.91 1.91 0 0 1 2-2 1.91 1.91 0 0 1 2 2 1.91 1.91 0 0 1-2 2z"}))}));tr.displayName="UserCircle";const nr=e.createContext(void 0),ir="/backend/api",sr=({children:r})=>{const[t,n]=e.useState(null),[i,s]=e.useState(!1),[a,o]=e.useState(!0);e.useEffect((()=>{const e=localStorage.getItem("user");e&&(n(JSON.parse(e)),s(!0)),o(!1);const r=e=>{if("user"===e.key){const r=e.newValue?JSON.parse(e.newValue):null;n(r),s(!!r)}};return window.addEventListener("storage",r),()=>window.removeEventListener("storage",r)}),[]);return j.jsx(nr.Provider,{value:{user:t,setUser:n,login:async(e,r)=>{try{const t=await fetch(`${ir}/login.php`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({login:e,password:r}),credentials:"include"}),i=await t.json();if(!t.ok)throw new Error(i.error||"Login failed");n(i.user),s(!0),localStorage.setItem("user",JSON.stringify(i.user))}catch(t){throw console.error("Login failed:",t),t}},register:async(e,r,t)=>{var i;try{const a=await fetch(`${ir}/register.php`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:e,username:t,password:r})}),o=await a.json();if(!a.ok)throw new Error(o.error||"Registration failed");const l={id:(null==(i=o.user_id)?void 0:i.toString())||"",email:e,username:t,avatar:null};n(l),s(!0),localStorage.setItem("user",JSON.stringify(l))}catch(a){throw console.error("Registration failed:",a),a}},logout:()=>{n(null),s(!1),localStorage.removeItem("user")},isAuthenticated:i,isAuthLoading:a},children:r})},ar=()=>{const r=e.useContext(nr);if(void 0===r)throw new Error("useAuth must be used within an AuthProvider");return r},or=i.form`
  background: rgba(26, 15, 46, 0.8);
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 400px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(157, 78, 221, 0.2);
  transform: translateY(0);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`,lr=i.h1`
  text-align: center;
  color: #ffffff;
  margin-bottom: 2rem;
  font-family: 'Rajdhani', sans-serif;
  font-size: 2.2rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`,dr=i.input`
  width: 100%;
  padding: 1rem;
  margin-bottom: 1.2rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(157, 78, 221, 0.3);
  border-radius: 8px;
  font-size: 1rem;
  color: #ffffff;
  transition: all 0.3s ease;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
  
  &:focus {
    outline: none;
    border-color: #9d4edd;
    box-shadow: 0 0 0 2px rgba(157, 78, 221, 0.2);
    background: rgba(255, 255, 255, 0.15);
  }
`,cr=i.button`
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #9d4edd, #7b2cbf);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(157, 78, 221, 0.4);
  }
  
  &:active {
    transform: translateY(0);
  }
`,hr=i.div`
  color: #ff4d4d;
  margin-bottom: 1rem;
  text-align: center;
  padding: 0.8rem;
  background: rgba(255, 77, 77, 0.1);
  border-radius: 8px;
  border: 1px solid rgba(255, 77, 77, 0.3);
`,xr=i.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #bbb;
  font-size: 1rem;
  margin-bottom: 1.2rem;
  cursor: pointer;
`,pr=i.input`
  accent-color: #9d4edd;
  width: 1.1rem;
  height: 1.1rem;
`,mr=i.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #bbb;
  font-size: 1rem;
  margin-bottom: 1.2rem;
  cursor: pointer;
  user-select: none;
`,gr=i.input`
  accent-color: #9d4edd;
  width: 1.1rem;
  height: 1.1rem;
`,ur=()=>{const[r,t]=e.useState((()=>localStorage.getItem("rememberedLogin")||"")),[n,i]=e.useState((()=>localStorage.getItem("rememberedPassword")||"")),[s,a]=e.useState((()=>!!localStorage.getItem("rememberedLogin"))),[o,l]=e.useState(""),[d,c]=e.useState(!1),h=pe(),{login:x}=ar();return j.jsxs(or,{onSubmit:async e=>{e.preventDefault(),l("");try{await x(r,n),s?(localStorage.setItem("rememberedLogin",r),localStorage.setItem("rememberedPassword",n)):(localStorage.removeItem("rememberedLogin"),localStorage.removeItem("rememberedPassword")),h("/profile")}catch(t){l("Неверный логин или пароль")}},children:[j.jsx(lr,{children:"Sign In"}),o&&j.jsx(hr,{children:o}),j.jsx(dr,{type:"text",placeholder:"Email или Username",value:r,onChange:e=>t(e.target.value),required:!0}),j.jsx(dr,{type:d?"text":"password",placeholder:"Password",value:n,onChange:e=>i(e.target.value),required:!0}),j.jsxs(mr,{children:[j.jsx(gr,{type:"checkbox",checked:d,onChange:e=>c(e.target.checked)}),"Show password"]}),j.jsxs(xr,{children:[j.jsx(pr,{type:"checkbox",checked:s,onChange:e=>a(e.target.checked)}),"Remember Me"]}),j.jsx(cr,{type:"submit",children:"Sign In"})]})},fr=i.form`
  background: rgba(26, 15, 46, 0.8);
  padding: 1.2rem 2rem 0.5rem 2rem;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 400px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(157, 78, 221, 0.2);
  transform: translateY(0);
  transition: transform 0.3s ease;
  margin-bottom: 0;
  padding-bottom: 0;

  &:hover {
    transform: translateY(-5px);
  }
`,br=i.h1`
  text-align: center;
  color: #ffffff;
  margin-bottom: 1.2rem;
  font-family: 'Rajdhani', sans-serif;
  font-size: 2.2rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  padding-bottom: 0;
`,jr=i.input`
  width: 100%;
  padding: 0.85rem;
  margin-bottom: 0.8rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(157, 78, 221, 0.3);
  border-radius: 8px;
  font-size: 1rem;
  color: #ffffff;
  transition: all 0.3s ease;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
  
  &:focus {
    outline: none;
    border-color: #9d4edd;
    box-shadow: 0 0 0 2px rgba(157, 78, 221, 0.2);
    background: rgba(255, 255, 255, 0.15);
  }
`,wr=i.button`
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #9d4edd, #7b2cbf);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 0.7rem;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(157, 78, 221, 0.4);
  }
  
  &:active {
    transform: translateY(0);
  }
`,vr=i.div`
  color: #ff4d4d;
  margin-bottom: 0.7rem;
  text-align: center;
  padding: 0.6rem;
  background: rgba(255, 77, 77, 0.1);
  border-radius: 8px;
  border: 1px solid rgba(255, 77, 77, 0.3);
`,yr=i.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #bbb;
  font-size: 1rem;
  margin-bottom: 1.2rem;
  cursor: pointer;
  user-select: none;
`,kr=i.input`
  accent-color: #9d4edd;
  width: 1.1rem;
  height: 1.1rem;
`,Cr=()=>{const[r,t]=e.useState(""),[n,i]=e.useState(""),[s,a]=e.useState(""),[o,l]=e.useState(""),[d,c]=e.useState(""),[h,x]=e.useState(!1),p=pe(),{register:m}=ar();return j.jsxs(fr,{onSubmit:async e=>{if(e.preventDefault(),c(""),n===s)try{await m(r,n,o),p("/profile")}catch(t){c("Registration error")}else c("Passwords do not match")},children:[j.jsx(br,{children:"Register"}),d&&j.jsx(vr,{children:d}),j.jsx(jr,{type:"text",placeholder:"Username",value:o,onChange:e=>l(e.target.value),required:!0}),j.jsx(jr,{type:"email",placeholder:"Email",value:r,onChange:e=>t(e.target.value),required:!0}),j.jsx(jr,{type:h?"text":"password",placeholder:"Password",value:n,onChange:e=>i(e.target.value),required:!0}),j.jsx(jr,{type:h?"text":"password",placeholder:"Confirm password",value:s,onChange:e=>a(e.target.value),required:!0}),j.jsxs(yr,{children:[j.jsx(kr,{type:"checkbox",checked:h,onChange:e=>x(e.target.checked)}),"Show password"]}),j.jsx(wr,{type:"submit",children:"Register"})]})};var Sr={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},Er=s.createContext&&s.createContext(Sr),zr=["attr","size","title"];function Pr(e,r){if(null==e)return{};var t,n,i=function(e,r){if(null==e)return{};var t={};for(var n in e)if(Object.prototype.hasOwnProperty.call(e,n)){if(r.indexOf(n)>=0)continue;t[n]=e[n]}return t}(e,r);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(n=0;n<s.length;n++)t=s[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(i[t]=e[t])}return i}function Or(){return Or=Object.assign?Object.assign.bind():function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e},Or.apply(this,arguments)}function Lr(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function Dr(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?Lr(Object(t),!0).forEach((function(r){Ar(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):Lr(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function Ar(e,r,t){var n;return(r="symbol"==typeof(n=function(e,r){if("object"!=typeof e||!e)return e;var t=e[Symbol.toPrimitive];if(void 0!==t){var n=t.call(e,r);if("object"!=typeof n)return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===r?String:Number)(e)}(r,"string"))?n:n+"")in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function Br(e){return e&&e.map(((e,r)=>s.createElement(e.tag,Dr({key:r},e.attr),Br(e.child))))}function Rr(e){return r=>s.createElement(Mr,Or({attr:Dr({},e.attr)},r),Br(e.child))}function Mr(e){var r=r=>{var t,{attr:n,size:i,title:a}=e,o=Pr(e,zr),l=i||r.size||"1em";return r.className&&(t=r.className),e.className&&(t=(t?t+" ":"")+e.className),s.createElement("svg",Or({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},r.attr,n,o,{className:t,style:Dr(Dr({color:e.color||r.color},r.style),e.style),height:l,width:l,xmlns:"http://www.w3.org/2000/svg"}),a&&s.createElement("title",null,a),e.children)};return void 0!==Er?s.createElement(Er.Consumer,null,(e=>r(e))):r(Sr)}function $r(e){return Rr({attr:{viewBox:"0 0 640 512"},child:[{tag:"path",attr:{d:"M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z"},child:[]}]})(e)}function Vr(e){return Rr({attr:{viewBox:"0 0 488 512"},child:[{tag:"path",attr:{d:"M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"},child:[]}]})(e)}function Tr(e){return Rr({attr:{viewBox:"0 0 448 512"},child:[{tag:"path",attr:{d:"M446.7 98.6l-67.6 318.8c-5.1 22.5-18.4 28.1-37.3 17.5l-103-75.9-49.7 47.8c-5.5 5.5-10.1 10.1-20.7 10.1l7.4-104.9 190.9-172.5c8.3-7.4-1.8-11.5-12.9-4.1L117.8 284 16.2 252.2c-22.1-6.9-22.5-22.1 4.6-32.7L418.2 66.4c18.4-6.9 34.5 4.1 28.5 32.2z"},child:[]}]})(e)}const Yr=i.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(20, 20, 30, 0.75);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s;
`,Ur=i.div`
  background: rgba(26, 15, 46, 0.98);
  border-radius: 18px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.35);
  padding: 2.5rem 2rem 1.5rem 2rem;
  min-width: 350px;
  max-width: 95vw;
  width: 400px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow-y: auto;
  @media (max-width: 600px) {
    min-width: 98vw;
    width: 99vw;
    padding: 1.2rem 0.5rem 1rem 0.5rem;
    max-height: 96vh;
  }
`,Nr=i.button`
  position: absolute;
  top: 18px;
  right: 18px;
  background: none;
  border: none;
  color: #fff;
  font-size: 1.7rem;
  cursor: pointer;
  z-index: 10;
  opacity: 0.7;
  transition: opacity 0.2s;
  &:hover { opacity: 1; }
`,Gr=i.div`
  text-align: center;
  margin: 1.2rem 0 0 0;
  color: #bbb;
  font-size: 1rem;
  a {
    color: #9d4edd;
    cursor: pointer;
    text-decoration: underline;
    margin-left: 0.3em;
    &:hover { color: #7b2cbf; }
  }
`,Fr=i.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  width: 100%;
  margin: 1.2rem 0 0 0;
  @media (max-width: 600px) {
    margin: 0.7rem 0 0 0;
    gap: 0.5rem;
  }
`,Hr=i.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 1.1rem 0;
  border: none;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 600;
  color: #fff;
  background: ${({color:e})=>e};
  cursor: pointer;
  transition: background 0.2s, box-shadow 0.2s;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  &:hover {
    filter: brightness(1.08);
    box-shadow: 0 4px 16px rgba(157, 78, 221, 0.13);
  }
`,Ir=({onClose:r})=>{const[t,n]=e.useState("login"),i=e=>{window.open(`#oauth-${e}`)};return j.jsx(Yr,{onClick:e=>{e.target===e.currentTarget&&r()},children:j.jsxs(Ur,{children:[j.jsx(Nr,{onClick:r,title:"Close",children:"×"}),"login"===t?j.jsxs(j.Fragment,{children:[j.jsx(ur,{}),j.jsxs(Gr,{children:["Don't have an account?",j.jsx("a",{onClick:()=>n("register"),children:"Register"})]})]}):j.jsxs(j.Fragment,{children:[j.jsx(Cr,{}),j.jsxs(Gr,{children:["Already have an account?",j.jsx("a",{onClick:()=>n("login"),children:"Sign In"})]})]}),j.jsxs(Fr,{children:[j.jsxs(Hr,{color:"#5865F2",onClick:()=>i("discord"),children:[j.jsx($r,{size:22})," Continue with Discord"]}),j.jsxs(Hr,{color:"#EA4335",onClick:()=>i("google"),children:[j.jsx(Vr,{size:22})," Continue with Google"]}),j.jsxs(Hr,{color:"#229ED9",onClick:()=>i("telegram"),children:[j.jsx(Tr,{size:22})," Continue with Telegram"]})]})]})})},Wr="/assets/images/logo_brand-BqcZX3dV.png",Xr="/assets/images/GTA5head-CYR22u8j.jpg",_r="/assets/images/POE2head-CC7g5Yzy.jpg",Jr="/assets/images/Fortnitehead-BuwJpQ1V.jpg",qr="/assets/images/CODBO6head-DhYJYkbI.jpg",Zr=a`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`,Qr=i.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 2rem;
  background-color: rgba(26, 15, 46, 0.75);
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
  backdrop-filter: blur(8px);
  animation: ${Zr} 0.8s ease-out forwards;

  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
  }
`,Kr=i.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`,et=i.img`
  height: 65px;
  width: auto;
  transition: transform 0.3s ease;
  margin: 0;
  padding-top: 0;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    height: 55px;
  }
`,rt=i(Me)`
  display: flex;
  align-items: center;
  text-decoration: none;
  margin-top: 2px;
`,tt=i.div`
  display: flex;
  align-items: center;
  gap: 3rem;

  @media (max-width: 992px) {
    gap: 1.5rem;
  }
`,nt=i.nav`
  display: flex;
  gap: 2.5rem;
  align-items: center;
  justify-content: center;
  margin: 0 2rem;

  @media (max-width: 992px) {
    display: none;
  }
`,it=i.div`
  position: relative;
  display: inline-block;
`,st=i.div`
  color: #9d4edd;
  border: 2px solid #9d4edd;
  padding: 0.5rem 1.2rem;
  border-radius: 4px;
  transition: all 0.3s;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  text-transform: uppercase;

  &:hover {
    background-color: #9d4edd;
    color: white;
  }

  svg {
    width: 12px;
    height: 12px;
    transition: transform 0.3s;
    transform: ${e=>e.isOpen?"rotate(180deg)":"rotate(0)"};
  }
`,at=i.div`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%) translateY(0) scale(0.95);
  min-width: 250px;
  background: rgba(26, 15, 46, 0.95);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  padding: 10px;
  color: #fff;
  font-family: 'Arial', sans-serif;
  
  ${e=>e.isOpen&&"\n    opacity: 1;\n    visibility: visible;\n    transform: translateX(-50%) translateY(0) scale(1);\n  "}

  div {
    display: flex;
    align-items: center;
    padding: 8px 12px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    &:last-child {
      border-bottom: none;
    }
    &:hover {
      background-color: rgba(157, 78, 221, 0.2);
    }
    input[type="checkbox"] {
      margin-right: 10px;
    }
  }

  button {
    margin-top: 10px;
    width: 100%;
    padding: 10px;
    background-color: #9d4edd;
    border: none;
    border-radius: 5px;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
    &:hover {
      background-color: #7b3cbf;
    }
  }
`,ot=i(Me)`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  color: white;
  text-decoration: none;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: rgba(157, 78, 221, 0.2);
  }
`,lt=i.img`
  width: 32px;
  height: 32px;
  border-radius: 4px;
  object-fit: cover;
`,dt=i.span`
  font-size: 0.95rem;
  font-weight: 500;
`,ct=i.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;

  @media (max-width: 992px) {
    gap: 1rem;
  }
`,ht=i.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  transition: color 0.3s;

  &:hover {
    color: #9d4edd;
  }

  span,
  span.flag {
    font-size: 1.5rem;
    line-height: 1;
    display: inline-flex;
    align-items: center;
  }

  svg {
    width: 24px;
    height: 24px;
  }

  @media (max-width: 768px) {
    padding: 0.5rem;
    gap: 0.6rem;

    span,
    span.flag {
      font-size: 2.1rem;
    }

    svg {
      width: 27px;
      height: 27px;
    }
  }

  @media (max-width: 480px) {
     padding: 0.4rem;
     gap: 0.5rem;

     span,
     span.flag {
      font-size: 1.9rem;
    }
     svg {
      width: 24px;
      height: 24px;
    }
  }
`,xt=i(Me)`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  transition: color 0.3s;
  text-decoration: none;

  &:hover {
    color: #9d4edd;
  }

  svg {
    width: 24px;
    height: 24px;
  }

  @media (max-width: 768px) {
    padding: 0.5rem;
    svg {
      width: 32px;
      height: 32px;
    }
  }

  @media (max-width: 480px) {
    padding: 0.4rem;
    svg {
      width: 29px;
      height: 29px;
    }
  }
`,pt=i.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: rgba(157, 78, 221, 0.2);
  }

  span.flag {
    font-size: 1.5rem;
  }
`,mt=i.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  background: #2a1840;
  border: 2px solid #9d4edd;
`,gt=[{code:"USD",symbol:"$"},{code:"EUR",symbol:"€"},{code:"GBP",symbol:"£"}],ut=[{code:"english",name:"English",flag:"🇬🇧"},{code:"español",name:"Español",flag:"🇪🇸"},{code:"français",name:"Français",flag:"🇫🇷"},{code:"deutsch",name:"Deutsch",flag:"🇩🇪"},{code:"italiano",name:"Italiano",flag:"🇮🇹"},{code:"中文",name:"中文",flag:"🇨🇳"},{code:"日本語",name:"日本語",flag:"🇯🇵"},{code:"português",name:"Português",flag:"🇵🇹"},{code:"العربية",name:"العربية",flag:"🇸🇦"},{code:"hindi",name:"हिंदी",flag:"🇮🇳"}],ft=()=>{var r;const{language:t,currency:n,setLanguage:i,setCurrency:s,t:a,isLoading:o}=Xe(),[l,d]=e.useState(!1),[c,h]=e.useState(!1),[x,p]=e.useState(!1),[m,g]=e.useState(!1),{isAuthenticated:u,user:f}=ar(),[b,w]=e.useState(!1),v=e.useRef(null),y=e.useRef(null),k=e.useRef(null);e.useEffect((()=>{const e=e=>{const r=e.target;l&&v.current&&!v.current.contains(r)&&d(!1),c&&y.current&&!y.current.contains(r)&&h(!1),x&&k.current&&!k.current.contains(r)&&p(!1)};if(l||c||x)return document.addEventListener("mousedown",e),()=>document.removeEventListener("mousedown",e)}),[l,c,x]),e.useEffect((()=>{}),[t]);const C=[{id:1,name:"GTA V",image:Xr,url:"/games/gta5"},{id:2,name:"Path of Exile 2",image:_r,url:"/games/path-of-exile"},{id:3,name:"Fortnite",image:Jr,url:"/games/fortnite"},{id:4,name:"Call of Duty",image:qr,url:"/games/cod"}];return o?j.jsx(Qr,{children:j.jsx(Kr,{children:j.jsx(tt,{children:j.jsx(rt,{to:"/",children:j.jsx(et,{src:m?"/fallback-logo.png":Wr,alt:"GGTips Logo",onError:()=>g(!0)})})})})}):j.jsx(Qr,{children:j.jsxs(Kr,{children:[j.jsxs(tt,{children:[j.jsx(rt,{to:"/",children:j.jsx(et,{src:m?"/fallback-logo.png":Wr,alt:"GGTips Logo",onError:()=>g(!0)})}),j.jsx(nt,{children:j.jsxs(it,{ref:v,children:[j.jsxs(st,{isOpen:l,onClick:e=>{e.stopPropagation(),d(!l)},children:[a("chooseGames"),j.jsx(rr,{size:20})]}),j.jsx(at,{isOpen:l,children:C.map((e=>j.jsxs(ot,{to:e.url,children:[j.jsx(lt,{src:e.image,alt:e.name}),j.jsx(dt,{children:e.name})]},e.id)))})]})})]}),j.jsxs(ct,{children:[j.jsxs(it,{ref:y,children:[j.jsxs(ht,{onClick:e=>{e.stopPropagation(),h(!c)},children:[j.jsx("span",{className:"flag",children:(()=>{const e=ut.find((e=>e.code===t));return(null==e?void 0:e.flag)||"🇬🇧"})()}),j.jsx(rr,{})]}),j.jsx(at,{isOpen:c,children:ut.map((e=>j.jsxs(pt,{onClick:()=>{i(e.code),h(!1)},children:[j.jsx("span",{className:"flag",children:e.flag}),e.name]},e.code)))})]}),j.jsxs(it,{ref:k,children:[j.jsxs(ht,{onClick:e=>{e.stopPropagation(),p(!x)},children:[j.jsx("span",{children:null==(r=gt.find((e=>e.code===n)))?void 0:r.symbol}),j.jsx(rr,{})]}),j.jsx(at,{isOpen:x,children:gt.map((e=>j.jsxs(pt,{onClick:()=>{s(e.code),p(!1)},children:[j.jsx("span",{style:{fontSize:"1.2rem"},children:e.symbol}),j.jsx("span",{children:e.code})]},e.code)))})]}),j.jsx(xt,{to:u?"/profile":"#",onClick:e=>{u||(e.preventDefault(),w(!0))},children:u&&((null==f?void 0:f.avatar_base64)||(null==f?void 0:f.avatar))?j.jsx(mt,{src:f.avatar_base64||f.avatar,alt:"Profile Avatar"}):j.jsx(tr,{})})]}),b&&!u&&j.jsx(Ir,{onClose:()=>w(!1)})]})})};var bt=e.forwardRef((function(r,t){return e.createElement(er,_e({iconAttrs:{fill:"currentColor",xmlns:"http://www.w3.org/2000/svg"},iconVerticalAlign:"middle",iconViewBox:"0 0 24 24"},r,{ref:t}),e.createElement("path",{d:"M9.593 10.971c-.542 0-.969.475-.969 1.055 0 .578.437 1.055.969 1.055.541 0 .968-.477.968-1.055.011-.581-.427-1.055-.968-1.055zm3.468 0c-.542 0-.969.475-.969 1.055 0 .578.437 1.055.969 1.055.541 0 .968-.477.968-1.055-.001-.581-.427-1.055-.968-1.055z"}),e.createElement("path",{d:"M17.678 3H4.947A1.952 1.952 0 0 0 3 4.957v12.844c0 1.083.874 1.957 1.947 1.957H15.72l-.505-1.759 1.217 1.131 1.149 1.064L19.625 22V4.957A1.952 1.952 0 0 0 17.678 3zM14.01 15.407s-.342-.408-.626-.771c1.244-.352 1.719-1.13 1.719-1.13-.39.256-.76.438-1.093.562a6.679 6.679 0 0 1-3.838.398 7.944 7.944 0 0 1-1.396-.41 5.402 5.402 0 0 1-.693-.321c-.029-.021-.057-.029-.085-.048a.117.117 0 0 1-.039-.03c-.171-.094-.266-.16-.266-.16s.456.76 1.663 1.121c-.285.36-.637.789-.637.789-2.099-.067-2.896-1.444-2.896-1.444 0-3.059 1.368-5.538 1.368-5.538 1.368-1.027 2.669-.998 2.669-.998l.095.114c-1.71.495-2.499 1.245-2.499 1.245s.21-.114.561-.275c1.016-.446 1.823-.57 2.156-.599.057-.009.105-.019.162-.019a7.756 7.756 0 0 1 4.778.893s-.751-.712-2.366-1.206l.133-.152s1.302-.029 2.669.998c0 0 1.368 2.479 1.368 5.538 0-.001-.807 1.376-2.907 1.443z"}))}));bt.displayName="Discord";const jt=a`
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(-50%, 0, 0);
  }
`,wt=i.div`
  width: 100%;
  height: 40px;
  background: linear-gradient(90deg, rgb(171, 102, 255) 0%, rgb(64, 224, 208) 100%);
  overflow: hidden;
  position: fixed;
  top: 81px; /* Высота десктоп хедера (65 + 16) */
  left: 0;
  z-index: 999;
  backdrop-filter: blur(8px);
  will-change: transform;
  box-shadow: 0 2px 10px rgba(171, 102, 255, 0.2);

  @media (max-width: 768px) {
    top: 71px; /* Высота мобильного хедера (55 + 16) */
    height: 35px; // Опционально: можно сделать баннер чуть ниже на мобильных
  }
`,vt=i.div`
  display: inline-flex;
  white-space: nowrap;
  animation: ${jt} 30s linear infinite;
  animation-play-state: ${e=>e.isPaused?"paused":"running"};
  height: 100%;
  align-items: center;
  transform: translate3d(0, 0, 0);
  will-change: transform;
  backface-visibility: hidden;
  -webkit-font-smoothing: antialiased;
  gap: 40px;
  padding-right: 40px; /* Добавляем отступ справа для плавного перехода */
`,yt=i.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 0 20px;
  color: white;
  font-size: 15px;
  font-weight: 500;
  height: 100%;
  transform: translate3d(0, 0, 0);
  will-change: transform;
  transition: all 0.3s;
  background: transparent;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
`,kt=i.span`
  color: rgb(171, 102, 255);
  background: white;
  padding: 2px 8px;
  border-radius: 4px;
  font-weight: bold;
  transition: all 0.3s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
`,Ct=i.a`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #5865F2;
  background: white;
  padding: 2px 10px;
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;
  transition: all 0.3s;
  border: 2px solid #5865F2;

  &:hover {
    background-color: #5865F2;
    color: white;
  }

  svg {
    width: 18px;
    height: 18px;
  }
`,St=[{id:1,textKey:"newUserDiscount",code:"WELCOME20"},{id:2,textKey:"referralBonus",code:"FRIEND500"},{id:3,textKey:"weeklyGamesDiscount",code:"GAMES15"},{id:4,textKey:"premiumDiscount",code:"PREMIUM30"},{id:5,textKey:"joinDiscord",isDiscord:!0}],Et=()=>{const[r,t]=e.useState(!1),{t:n}=Xe(),i=s.useMemo((()=>St.map((e=>j.jsxs(yt,{children:[n(e.textKey),e.code&&j.jsx(j.Fragment,{children:j.jsx(kt,{children:e.code})}),e.isDiscord&&j.jsxs(Ct,{href:"https://discord.gg/ggtips",target:"_blank",rel:"noopener noreferrer",children:[j.jsx(bt,{}),n("join")]})]},e.id)))),[n]);return j.jsx(wt,{onMouseEnter:()=>t(!0),onMouseLeave:()=>t(!1),children:j.jsxs(vt,{isPaused:r,children:[i,i,i,i," "]})})},zt="/assets/images/imagebghead-CNlfJaxP.png",Pt=a`
  0% {
    transform: translateY(0) rotate(0deg);
  }
  25% {
    transform: translateY(-5px) rotate(2deg);
  }
  50% {
    transform: translateY(-10px) rotate(0deg);
  }
  75% {
    transform: translateY(-5px) rotate(-2deg);
  }
  100% {
    transform: translateY(0) rotate(0deg);
  }
`,Ot=a`
  0% {
    transform: translateY(0) rotate(0deg);
  }
  25% {
    transform: translateY(-8px) rotate(-1deg);
  }
  50% {
    transform: translateY(-12px) rotate(0deg);
  }
  75% {
    transform: translateY(-8px) rotate(1deg);
  }
  100% {
    transform: translateY(0) rotate(0deg);
  }
`,Lt=a`
  0% {
    transform: translateY(0) rotate(0deg) scale(1);
  }
  25% {
    transform: translateY(-6px) rotate(1deg) scale(1.02);
  }
  50% {
    transform: translateY(-15px) rotate(0deg) scale(1.05);
  }
  75% {
    transform: translateY(-6px) rotate(-1deg) scale(1.02);
  }
  100% {
    transform: translateY(0) rotate(0deg) scale(1);
  }
`,Dt=a`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`,At=a`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`,Bt=a`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`,Rt=i.div`
  opacity: 0;
  animation: ${Bt} 0.8s ease-out forwards;
  animation-delay: 0.2s;
  width: 100%;
`,Mt=i.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  text-align: center;
  padding: 2rem;
  padding-top: 106px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url(${zt});
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    z-index: -2;
  }

  &::after {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(26, 15, 46, 0.65);
    z-index: -1;
  }

  @media (min-width: 769px) {
    padding-top: 0;
    justify-content: center;
  }
`,$t=i.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`,Vt=i.h1`
  font-size: 4.5rem;
  margin-bottom: 1rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  perspective: 1000px;
  width: 100%;
  line-height: 1.2;

  @media (min-width: 769px) {
    font-size: 5.2rem;
    margin-bottom: 1.3rem;
  }

  @media (max-width: 768px) {
    font-size: 3.8rem;
    margin-top: 2rem;
    margin-bottom: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 3rem;
    margin-top: 1.5rem;
    margin-bottom: 0.8rem;
  }
`,Tt=i.div`
  font-size: 2rem;
  margin-bottom: 2.5rem;
  max-width: 800px;
  font-weight: 500;
  animation: ${At} 1s ease 0.2s backwards;
  perspective: 1000px;
  width: 100%;
  line-height: 1.4;

  @media (min-width: 769px) {
    font-size: 2.1rem;
    margin-bottom: 2.8rem;
  }

  @media (max-width: 768px) {
    font-size: 1.3rem;
    margin-bottom: 4rem;
    max-width: 90%;
    & > span {
      display: block;
      margin-bottom: 0.5rem;
    }
  }

  @media (max-width: 480px) {
    font-size: 1.1rem;
    margin-bottom: 3rem;
  }
`,Yt=i.div`
  background: linear-gradient(
    90deg,
    #4ECDC4 0%,
    #45D5CD 10%,
    #40E0D0 20%,
    #48D1CC 30%,
    #7EB6FF 40%,
    #6B8BE5 50%,
    #9D4EDD 60%,
    #8B6EE5 70%,
    #48D1CC 80%,
    #45D5CD 90%,
    #4ECDC4 100%
  );
  background-size: 400%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  display: inline-block;
  animation: 
    ${e=>"title"===e.variant?Pt:Ot} 6s ease-in-out infinite,
    ${Dt} ${e=>"title"===e.variant?"12s":"14s"} linear infinite;
  transform-origin: center center;
  font-size: inherit;
  font-weight: inherit;
  perspective: 1000px;
  transform-style: preserve-3d;
  will-change: transform;
  filter: brightness(1.1);

  @media (max-width: 768px) {
    animation: ${Dt} ${e=>"title"===e.variant?"12s":"14s"} linear infinite;
    
    ${e=>"title"===e.variant&&"\n      & > span {\n        display: block;\n        line-height: 1.1;\n      }\n    "}
  }
  
  @media (min-width: 769px) {
    ${e=>"title"===e.variant&&"\n      & > span {\n        margin-right: 1rem;\n      }\n      & > span:last-child {\n        margin-right: 0;\n      }\n    "}
  }
`,Ut=i(Me)`
  padding: 1.2rem 3rem;
  font-size: 1.4rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  background: linear-gradient(
    90deg,
    #4ECDC4 0%,
    #45D5CD 10%,
    #40E0D0 20%,
    #48D1CC 30%,
    #7EB6FF 40%,
    #6B8BE5 50%,
    #9D4EDD 60%,
    #8B6EE5 70%,
    #48D1CC 80%,
    #45D5CD 90%,
    #4ECDC4 100%
  );
  background-size: 400%;
  color: white;
  transition: 0.3s ease;
  animation: ${Dt} 16s linear infinite;
  box-shadow: 0 4px 15px rgba(78, 205, 196, 0.3);
  transform-style: preserve-3d;
  perspective: 1000px;
  will-change: transform;
  filter: brightness(1.1);
  text-decoration: none;
  display: inline-block;
  text-align: center;

  @media (min-width: 769px) {
    padding: 1.3rem 3.5rem;
    font-size: 1.5rem;
    animation: 
      ${Lt} 6s ease-in-out infinite,
      ${Dt} 16s linear infinite;
  }

  &:hover {
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 6px 20px rgba(126, 182, 255, 0.4);
    filter: brightness(1.2);
  }

  @media (max-width: 768px) {
    padding: 1.1rem 2.8rem;
    font-size: 1.2rem;
  }

  @media (max-width: 480px) {
    padding: 0.9rem 2.2rem;
    font-size: 1.1rem;
  }
`,Nt=()=>{const{t:r}=Xe(),[t,n]=e.useState(!1);return e.useEffect((()=>{const e=new Image;e.src=zt,e.onload=()=>n(!0),e.onerror=()=>console.error("Failed to load background image")}),[]),j.jsx(Mt,{bgLoaded:t,children:j.jsx(Rt,{children:j.jsxs($t,{children:[j.jsx(Vt,{children:j.jsxs(Yt,{variant:"title",children:[j.jsx("span",{children:"Gang"}),j.jsx("span",{children:"Game"}),j.jsx("span",{children:"Tips"})]})}),j.jsx(Tt,{children:j.jsxs(Yt,{variant:"subtitle",children:[j.jsx("span",{children:"Professional Game"}),j.jsx("span",{children:" Boosting Services"})]})}),j.jsx(Ut,{to:"/games",children:r("chooseGames")})]})})})},Gt=i.h2`
  font-size: 3.5rem;
  margin-bottom: 1rem;
  text-transform: uppercase;
  color: white;
  font-family: 'Rajdhani', sans-serif;
  letter-spacing: 2px;
`,Ft=i.p`
  font-size: 1.2rem;
  color: white;
  margin-bottom: 4rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-family: 'Rajdhani', sans-serif;
`,Ht=i.section`
  padding: 6rem 0;
  background-color: #1a0f2e;
  text-align: center;
`,It=i.div`
  max-width: 1200px;
  margin: 2rem auto 0;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  position: relative;
  cursor: pointer;
`,Wt=i.video`
  width: 100%;
  display: block;
  object-fit: cover;
  border-radius: 16px;
`,Xt=i.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 10px;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  opacity: ${e=>e.isVisible?1:0};
  
  svg {
    width: 24px;
    height: 24px;
    fill: ${e=>e.isMuted?"#ffffff":"#ffd700"};
  }
`,_t=i.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(157, 78, 221, 0.7);
  border: none;
  border-radius: 50%;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(157, 78, 221, 0.9);
    transform: translate(-50%, -50%) scale(1.1);
  }
  
  svg {
    width: 40px;
    height: 40px;
    fill: white;
  }
  
  @media (min-width: 769px) {
    display: none;
  }
`,Jt=()=>{const[r,t]=e.useState(!0),[n,i]=e.useState(!0),[s,a]=e.useState(!1),o=e.useRef(null);let l=null;const d="undefined"!=typeof window&&window.innerWidth<=768,c=()=>{o.current&&(o.current.muted=!o.current.muted,t(!r),i(!0),l&&window.clearTimeout(l),l=window.setTimeout((()=>{i(!1)}),2e3))},h=()=>{o.current&&o.current.play().then((()=>{a(!0)})).catch((e=>{console.error("Video play failed:",e)}))};return e.useEffect((()=>{const e=window.setTimeout((()=>{i(!1)}),2e3);return o.current&&!d&&o.current.play().then((()=>{a(!0)})).catch((e=>{console.error("Video autoplay failed:",e)})),()=>{e&&window.clearTimeout(e),l&&window.clearTimeout(l)}}),[d]),j.jsxs(Ht,{className:"section",children:[j.jsx(Gt,{children:"Why Choose Gang Game Tips"}),j.jsx(Ft,{children:"Experience the difference with our professional boosting services"}),j.jsxs(It,{onClick:()=>{!d&&s?c():d&&!s&&h()},children:[j.jsxs(Wt,{ref:o,autoPlay:!d,loop:!0,muted:r,playsInline:!0,poster:"/assets/images/video-poster-D8xaOUJb.jpg",children:[j.jsx("source",{src:"/assets/media/promo-DxXzbjpE.mp4",type:"video/mp4"}),"Your browser does not support the video tag."]}),d&&!s&&j.jsx(_t,{onClick:h,"aria-label":"Play video",children:j.jsx("svg",{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",children:j.jsx("path",{d:"M8 5v14l11-7z"})})}),j.jsx(Xt,{isMuted:r,isVisible:n,children:r?j.jsx("svg",{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",children:j.jsx("path",{d:"M18.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C22.63 14.91 23 13.5 23 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"})}):j.jsx("svg",{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",children:j.jsx("path",{d:"M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"})})})]})]})},qt=i.section`
  padding: 7rem 2rem;
  background-color: #1a0f2e;
  color: #f0f0f0;

  @media (max-width: 768px) {
    padding: 4rem 1rem;
  }
`,Zt=i.div`
  max-width: 1000px;
  margin: 0 auto;
  text-align: center;
`,Qt=i.p`
  font-size: 1.4rem;
  line-height: 1.9;
  margin-bottom: 3rem;
  
  &.list-description {
    text-align: left;
  }

  @media (max-width: 768px) {
    font-size: 1.1rem;
    line-height: 1.7;
    margin-bottom: 2rem;
  }
`,Kt=i.ul`
  list-style: none;
  padding: 0;
  margin: 4rem 0;
  text-align: left;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 3rem 3.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    margin: 2rem 0;
  }
`,en=i.li`
  font-size: 1.25rem;
  line-height: 1.9;
  padding-left: 3rem;
  position: relative;

  &::before {
    content: attr(data-emoji);
    position: absolute;
    left: 0;
    top: 0.1em;
    font-size: 1.5rem;
  }

  &:last-child {
    grid-column: 1 / -1;
    justify-self: center;
    max-width: 450px;
    width: 100%;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    line-height: 1.7;
    padding-left: 2.5rem;

    &::before {
      font-size: 1.3rem;
    }

    &:last-child {
       max-width: 100%;
    }
  }
`,rn=i.strong`
  color: #9d4edd;
  font-weight: 700;
  font-size: 1.3em;
  display: block;
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 1.2em;
  }
`,tn=i.p`
  font-size: 1.7rem;
  line-height: 1.9;
  margin-top: 4rem;
  font-weight: 700;
  color: #ffd700;
  text-align: center;
  text-shadow: 0 0 12px rgba(255, 215, 0, 0.6);

  @media (max-width: 768px) {
    font-size: 1.3rem;
    line-height: 1.7;
    margin-top: 2rem;
  }
`,nn=i.h2`
  font-size: 2.8rem;
  margin-bottom: 2.5rem;
  text-transform: uppercase;
  color: white;
  font-family: 'Rajdhani', sans-serif;
  letter-spacing: 1.5px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 1.5rem;
  }
`,sn=()=>j.jsx(qt,{children:j.jsxs(Zt,{children:[j.jsx(nn,{children:"About Us"}),j.jsxs(Qt,{children:["In a world where every second can change the game, ",j.jsx("strong",{style:{color:"#ffd700"},children:"Gang Game Tips"})," is your trusted ally. We don't just offer services — we take your gaming experience to the ",j.jsx("strong",{style:{color:"#9d4edd"},children:"next level"}),". Why do thousands of players choose us?"]}),j.jsxs(Kt,{children:[j.jsxs(en,{"data-emoji":"🔒",children:[j.jsx(rn,{children:"Security First:"})," We use only safe, proven methods — no bans, no risks. Your account is always protected."]}),j.jsxs(en,{"data-emoji":"⚡",children:[j.jsx(rn,{children:"Lightning-Fast Delivery:"})," Boosting, currency, power-leveling — all done quickly and efficiently. No delays. No excuses."]}),j.jsxs(en,{"data-emoji":"🎮",children:[j.jsx(rn,{children:"Experienced Professional Boosters:"})," Only real gamers who know the mechanics inside out. We do what others can't."]}),j.jsxs(en,{"data-emoji":"💬",children:[j.jsx(rn,{children:"24/7 Customer Support:"})," Questions? Need help? Our support team is always online and ready to assist."]}),j.jsxs(en,{"data-emoji":"💵",children:[j.jsx(rn,{children:"Transparent Pricing & Quality Guarantee:"})," No hidden fees. Just honest service and real results."]})]}),j.jsxs(Qt,{children:["With ",j.jsx("strong",{style:{color:"#ffd700"},children:"Gang Game Tips"}),", you're not just getting a boost — you're gaining ",j.jsx("strong",{style:{color:"#9d4edd"},children:"confidence"}),", an ",j.jsx("strong",{style:{color:"#9d4edd"},children:"edge"}),", and pure gaming ",j.jsx("strong",{style:{color:"#9d4edd"},children:"satisfaction"}),"."]}),j.jsx(tn,{children:"👉 Join thousands of happy players. Level up your game today!"})]})}),an=({rating:e,count:r})=>{const t=Math.floor(e),n=5-t-(e%1!=0?1:0);return j.jsxs(pn,{children:[j.jsx(gn,{children:e.toFixed(1)}),[...Array(t)].map(((e,r)=>j.jsx(mn,{color:"#00b67a",children:"★"},`full-${r}`))),[...Array(n)].map(((e,r)=>j.jsx(mn,{color:"#dcdce6",children:"☆"},`empty-${r}`))),r>0&&j.jsxs(un,{children:["(",r,")"]})]})},on=a`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`,ln=i.section`
  padding: 4rem 2rem;
  background-color: #1a0f2e;
  max-width: 1140px;
  margin: 4rem auto;
  text-align: center;

  @media (max-width: 768px) {
    padding: 3rem 1rem;
    margin: 2rem auto;
  }
`,dn=i.h2`
  font-size: 2.8rem;
  margin-bottom: 3rem;
  text-transform: uppercase;
  color: white;
  font-family: 'Rajdhani', sans-serif;
  letter-spacing: 1.5px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 2rem;
  }
`,cn=i.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  background-color: #2b2b42;
  border-radius: 8px;
  border-bottom: 1px solid #4a4a6a;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 1rem;
    gap: 1rem;
  }
`,hn=i.div`
  text-align: left;
`,xn=i.h3`
  color: #ffffff;
  font-size: 1.4rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;

  @media (max-width: 768px) {
    font-size: 1.2rem;
    margin-bottom: 0.3rem;
  }
`,pn=i.div`
  display: flex;
  align-items: center;
  gap: 0.2rem;

  @media (max-width: 768px) {
    // Adjust if needed, seems okay for now
  }
`,mn=i.span`
  color: ${e=>e.color};
  font-size: 1.5rem;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`,gn=i.span`
  color: #ffffff;
  font-size: 1.5rem;
  font-weight: bold;
  margin-right: 0.5rem;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`,un=i.span`
  color: #a0a0b8;
  font-size: 1rem;
  margin-left: 0.5rem;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`,fn=i.a`
  background-image: linear-gradient(90deg, #8e44ad, #3498db, #8e44ad); // Repeat start color at end for smooth loop
  background-size: 200% auto; // Make background wider than button
  color: white;
  padding: 0.9rem 1.8rem;
  border-radius: 25px;
  text-decoration: none;
  font-weight: 700;
  font-size: 1rem;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  display: inline-block;
  animation: ${on} 4s linear infinite; // Apply the animation

  &:hover {
    filter: brightness(1.1);
    transform: translateY(-1px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    // Optional: Pause animation on hover if desired
    // animation-play-state: paused;
  }

  @media (max-width: 768px) {
    padding: 0.7rem 1.4rem;
    font-size: 0.9rem;
    width: 100%; // Кнопка на всю ширину в мобильной версии
    margin-top: 1rem; // Отступ сверху, т.к. она теперь под левой частью
  }
`,bn=i.div`
  position: relative;
  background-color: #2b2b42;
  padding: 2rem;
  border-radius: 8px;
  width: 100%;

  @media (max-width: 768px) {
    padding: 1.5rem 10px;
  }
`,jn=i.div`
  display: flex;
  gap: 1.5rem;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding: 0 0 1rem 0;
  margin: 0 auto;
  scroll-snap-type: x mandatory;
  width: 100%;
  max-width: calc(1140px - 4rem); // Учитываем паддинги контейнера

  &::-webkit-scrollbar { display: none; }
  -ms-overflow-style: none;
  scrollbar-width: none;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`,wn=i.div`
  background-color: #3a3a59;
  border-radius: 8px;
  padding: 1.5rem;
  text-align: left;
  color: #dcdce6;
  flex-shrink: 0;
  width: calc(25% - 1.125rem); // 4 карточки в ряд с учетом отступов
  scroll-snap-align: start;

  @media (max-width: 768px) {
    width: calc(100% - 20px);
    padding: 1rem;
  }
`,vn=i.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 0.8rem;
`,yn=i.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #5a5a7a; 

  @media (max-width: 768px) {
    width: 35px;
    height: 35px;
  }
`,kn=i.div``,Cn=i.div`
  color: #ffffff;
  font-weight: 600;
`,Sn=i.div`
  font-size: 0.85rem;
  color: #a0a0b8;
`,En=i(an)`
  margin-bottom: 1rem;

  ${gn} { display: none; }
  ${un} { display: none; }
  ${mn} { font-size: 1.2rem; }

  @media (max-width: 768px) {
     ${mn} { font-size: 1.1rem; }
  }
`,zn=i.h4`
  color: #ffffff;
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
`,Pn=i.p`
  font-size: 0.95rem;
  line-height: 1.5;
  margin: 0;
`,On=i.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-image: linear-gradient(90deg, #8e44ad, #3498db);
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  transition: all 0.3s ease;
  line-height: 0;
  padding: 0;
  text-align: center;

  & > span {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    margin-top: -2px;
  }

  &:hover {
    filter: brightness(1.1);
    transform: translateY(-50%) scale(1.05);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
     width: 30px;
     height: 30px;
     font-size: 1.2rem;
  }
`,Ln=i(On)`
  left: 10px;

  @media (max-width: 768px) {
    left: 5px;
  }
`,Dn=i(On)`
  right: 10px;

  @media (max-width: 768px) {
    right: 5px;
  }
`,An=[{id:1,author:"Oscar Corea",date:"today on Trustpilot",rating:5,title:"Reliable and fast service",text:"First and for most, Im happy with their performance time and reliability."},{id:2,author:"Radiocontroller",date:"today on Trustpilot",rating:5,title:"Great service",text:"Once you understand what to do you will have your money, or other items."},{id:3,author:"Liam Patterson",date:"today on Trustpilot",rating:5,title:"Dont be prejudice!!",text:"The fact that I didnt believe it was going to happen after waiting a while."},{id:4,author:"Sean Groves",date:"today on Trustpilot",rating:5,title:"Very good service and true",text:"Very good service and true to their words."},{id:5,author:"Emanuel Cruz",date:"yesterday on Trustpilot",rating:5,title:"Everything was wonderful",text:"Everything was wonderful, very helpful and supportive."}],Bn=()=>{const r=e.useRef(null),t=e=>{if(r.current){const t=.8*r.current.offsetWidth;r.current.scrollBy({left:"left"===e?-t:t,behavior:"smooth"})}};return j.jsxs(ln,{className:"section",children:[j.jsx(dn,{"data-animate":"fade-in",children:"What Our Clients Are Saying"}),j.jsxs(cn,{children:[j.jsxs(hn,{children:[j.jsx(xn,{children:"Trustpilot Reviews"}),j.jsx(an,{rating:5,count:2218})]}),j.jsx(fn,{href:"https://www.trustpilot.com/review/ganggametips.com",target:"_blank",rel:"noopener",children:"Review us on Trustpilot"})]}),j.jsxs(bn,{children:[j.jsx(Ln,{onClick:()=>t("left"),children:j.jsx("span",{children:"‹"})}),j.jsx(jn,{ref:r,children:An.map((e=>j.jsxs(wn,{children:[j.jsxs(vn,{children:[j.jsx(yn,{})," ",j.jsxs(kn,{children:[j.jsx(Cn,{children:e.author}),j.jsx(Sn,{children:e.date})]})]}),j.jsx(En,{rating:e.rating,count:0})," ",j.jsx(zn,{children:e.title}),j.jsx(Pn,{children:e.text})]},e.id)))}),j.jsx(Dn,{onClick:()=>t("right"),children:j.jsx("span",{children:"›"})})]})]})},Rn=i.footer`
  background: rgba(0, 0, 0, 0.5);
  padding: 4rem 2rem 2rem;
  color: white;
  position: relative;
  z-index: 1;
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`,Mn=i.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
  position: relative;
`,$n=i.div`
  text-align: left;
`,Vn=i.h3`
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
`,Tn=i.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`,Yn=i.li`
  margin-bottom: 0.75rem;
`,Un=i.a`
  color: #ccc;
  text-decoration: none;
  transition: color 0.3s;

  &:hover {
    color: #9d4edd;
  }
`,Nn=i.div`
  text-align: center;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: #ccc;
`,Gn=()=>j.jsxs(Rn,{children:[j.jsxs(Mn,{children:[j.jsxs($n,{children:[j.jsx(Vn,{children:"Gang Game Tips"}),j.jsxs(Tn,{children:[j.jsx(Yn,{children:j.jsx(Un,{href:"#about",children:"About Us"})}),j.jsx(Yn,{children:j.jsx(Un,{href:"#review",children:"Review"})}),j.jsx(Yn,{children:j.jsx(Un,{href:"#blog",children:"Blog"})})]})]}),j.jsxs($n,{children:[j.jsx(Vn,{children:"Support"}),j.jsxs(Tn,{children:[j.jsx(Yn,{children:j.jsx(Un,{href:"#faq",children:"FAQ"})}),j.jsx(Yn,{children:j.jsx(Un,{href:"#contact",children:"Contact Us"})}),j.jsx(Yn,{children:j.jsx(Un,{href:"#privacy",children:"Privacy Policy"})})]})]}),j.jsxs($n,{children:[j.jsx(Vn,{children:"Contact"}),j.jsx(Tn,{children:j.jsx(Yn,{children:j.jsx(Un,{href:"mailto:support@ganggametips.com",children:"support@ganggametips.com"})})})]})]}),j.jsxs(Nn,{children:["© ",(new Date).getFullYear()," Gang Game Tips. All rights reserved."]})]}),Fn=i.div`
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  
  @media (max-width: 768px) {
    right: 15px;
  }
`,Hn=i.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #9d4edd, #7b2cbf);
  border-radius: 50%;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 8px 20px rgba(157, 78, 221, 0.4);
  }
`,In=i.a`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #9d4edd, #7b2cbf);
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 18px rgba(157, 78, 221, 0.4);
  }
  
  svg {
    width: 32px;
    height: 32px;
    color: white;
  }
`,Wn=i.div`
  color: white;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  
  svg {
    width: 30px;
    height: 30px;
    fill: currentColor;
  }
`,Xn=i.div`
  position: fixed;
  bottom: 100px;
  right: 30px;
  width: 350px;
  height: 450px;
  background: linear-gradient(to bottom, rgba(26, 15, 46, 0.7), rgba(18, 7, 31, 0.7)), url(${"/assets/images/image3-Ce_Nwfpb.png"});
  background-size: cover;
  background-position: center;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 99;
  opacity: ${e=>e.isOpen?1:0};
  visibility: ${e=>e.isOpen?"visible":"hidden"};
  transform: ${e=>e.isOpen?"translateY(0)":"translateY(20px)"};
  transition: all 0.3s ease;
`,_n=i.div`
  background: linear-gradient(to right, #9d4edd, #7b2cbf);
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
`,Jn=i.h3`
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
`,qn=i.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    width: 16px;
    height: 16px;
    fill: currentColor;
  }
  
  &:hover {
    color: rgba(255, 255, 255, 0.8);
  }
`,Zn=i.div`
  flex-grow: 1;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 15px;
  
  /* Scrollbar styling */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(157, 78, 221, 0.5);
    border-radius: 3px;
  }
`,Qn=i.div`
  max-width: 80%;
  padding: 12px 16px;
  border-radius: ${e=>e.isUser?"15px 15px 0 15px":"15px 15px 15px 0"};
  background: ${e=>e.isUser?"linear-gradient(135deg, #9d4edd, #7b2cbf)":"rgba(255, 255, 255, 0.1)"};
  color: white;
  align-self: ${e=>e.isUser?"flex-end":"flex-start"};
  font-size: 0.95rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`,Kn=i.div`
  padding: 15px;
  background: rgba(0, 0, 0, 0.2);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  gap: 10px;
`,ei=i.input`
  flex-grow: 1;
  padding: 12px 15px;
  border: none;
  border-radius: 25px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  outline: none;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
  
  &:focus {
    box-shadow: 0 0 0 2px rgba(157, 78, 221, 0.5);
  }
`,ri=i.button`
  width: 42px;
  height: 42px;
  border: none;
  border-radius: 50%;
  background: linear-gradient(135deg, #9d4edd, #7b2cbf);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  
  svg {
    width: 20px;
    height: 20px;
    fill: currentColor;
  }
  
  &:hover {
    transform: scale(1.05);
  }
  
  &:active {
    transform: scale(0.95);
  }
`,ti=()=>{const[r,t]=e.useState(!1),[n,i]=e.useState(""),[s,a]=e.useState([{id:1,text:"Hello! How can we help you today?",isUser:!1}]),o=e.useRef(null),l=e.useRef(null);e.useEffect((()=>{var e;null==(e=l.current)||e.scrollIntoView({behavior:"smooth"})}),[s]),e.useEffect((()=>{const e=e=>{r&&o.current&&!o.current.contains(e.target)&&!e.target.closest(".chat-icon-container")&&t(!1)};return document.addEventListener("mousedown",e),()=>{document.removeEventListener("mousedown",e)}}),[r]);const d=()=>{if(!n.trim())return;const e={id:s.length+1,text:n,isUser:!0};a([...s,e]),i(""),setTimeout((()=>{const e={id:s.length+2,text:"Thank you for contacting us! Our operator will get in touch with you shortly.",isUser:!1};a((r=>[...r,e]))}),1e3)};return j.jsxs(j.Fragment,{children:[j.jsxs(Fn,{children:[j.jsx(In,{href:"https://discord.gg/ggtips",target:"_blank",rel:"noopener noreferrer","aria-label":"Join our Discord",children:j.jsx(bt,{})}),j.jsx(Hn,{className:"chat-icon-container",onClick:()=>{t(!r)},children:j.jsx(Wn,{children:j.jsxs("svg",{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",children:[j.jsx("path",{d:"M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H5.17L4 17.17V4H20V16Z"}),j.jsx("path",{d:"M7 9H17V11H7V9Z"}),j.jsx("path",{d:"M7 12H14V14H7V12Z"}),j.jsx("path",{d:"M7 6H17V8H7V6Z"})]})})})]}),j.jsxs(Xn,{ref:o,isOpen:r,children:[j.jsxs(_n,{children:[j.jsx(Jn,{children:"Live Chat"}),j.jsx(qn,{onClick:()=>t(!1),children:j.jsx("svg",{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",children:j.jsx("path",{d:"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"})})})]}),j.jsxs(Zn,{children:[s.map((e=>j.jsx(Qn,{isUser:e.isUser,children:e.text},e.id))),j.jsx("div",{ref:l})]}),j.jsxs(Kn,{children:[j.jsx(ei,{type:"text",placeholder:"Type your message...",value:n,onChange:e=>{i(e.target.value)},onKeyPress:e=>{"Enter"===e.key&&d()}}),j.jsx(ri,{onClick:d,children:j.jsx("svg",{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",children:j.jsx("path",{d:"M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"})})})]})]})]})},ni=i(Me)`
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
  transition: all 0.3s ease;
  height: 320px;
  cursor: pointer;
  text-decoration: none;
  display: block;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.6);
    
    .overlay {
      background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.8));
    }
    
    .game-title {
      transform: translateY(-5px);
    }
  }
  
  @media (max-width: 768px) {
    height: 250px;
  }
`,ii=i.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
`,si=i.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.8));
  transition: all 0.3s ease;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`,ai=i.h3`
  font-size: 1.8rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.5rem;
  transition: transform 0.3s ease;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  
  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
`,oi=({game:e})=>j.jsxs(ni,{to:e.url,children:[j.jsx(ii,{src:e.image,alt:e.name}),j.jsx(si,{className:"overlay",children:j.jsx(ai,{className:"game-title",children:e.name})})]}),li=i.div`
  padding: 2rem;
  max-width: 1440px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`,di=i.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 1rem;
  }
`,ci=i.h1`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: white;
  text-align: center;
  text-transform: uppercase;
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
  }
`,hi=[{id:1,name:"Call of Duty: Black Ops 6",image:qr,url:"/games/call-of-duty"},{id:2,name:"Grand Theft Auto V",image:Xr,url:"/games/gta5"},{id:3,name:"Path of Exile 2",image:_r,url:"/games/path-of-exile"},{id:4,name:"Fortnite",image:Jr,url:"/games/fortnite"}],xi=()=>j.jsxs(li,{children:[j.jsx(ci,{children:"Choose Your Game"}),j.jsx(di,{children:hi.map((e=>j.jsx(oi,{game:e},e.id)))})]}),pi=i.button`
  position: absolute;
  right: -32px;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(19, 18, 41, 0.95);
  border: none;
  border: 2px solid rgba(78, 126, 248, 0.3);
  border-radius: 0 8px 8px 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: white;
  backdrop-filter: blur(5px);
  z-index: 100;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(78, 126, 248, 0.1), transparent);
    border-radius: 0 6px 6px 0;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  svg {
    width: 16px;
    height: 16px;
    fill: currentColor;
    transition: transform 0.3s ease;
    transform: ${e=>e.$isOpen?"rotate(0deg)":"rotate(180deg)"};
  }
  
  &:hover {
    color: #4e7ef8;
    
    &:before {
      opacity: 1;
    }
    
    svg {
      transform: ${e=>e.$isOpen?"rotate(0deg) scale(1.2)":"rotate(180deg) scale(1.2)"};
    }
  }
`,mi=i.div`
  position: fixed;
  left: 0;
  top: 100px;
  width: 280px;
  height: 180px;
  background: rgba(19, 18, 41, 0.95);
  border-bottom: 1px solid rgba(78, 126, 248, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 99;
  transform: translateX(${e=>e.isOpen?"0":"-100%"});
  transition: transform 0.3s ease;
  
  @media (max-width: 768px) {
    width: 260px;
    height: 160px;
    top: 80px;
  }
`,gi=i.div`
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  
  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
  }
`,ui=i.h1`
  font-size: 1.2rem;
  font-weight: 700;
  background: linear-gradient(120deg, #ffffff, #b8c7f0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
  text-align: center;
  padding: 0 1rem;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`,fi=i.div`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 280px;
  background: rgba(19, 18, 41, 0.95);
  z-index: 97;
  transform: translateX(${e=>e.isOpen?"0":"-100%"});
  transition: transform 0.3s ease;

  @media (max-width: 768px) {
    width: 260px;
  }
`,bi=i.div`
  position: fixed;
  left: 0;
  top: 280px;
  bottom: 12px;
  width: 280px;
  z-index: 98;
  pointer-events: none;
  
  @media (max-width: 768px) {
    width: 260px;
    top: 240px;
  }
`,ji=i.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  background: transparent;
  border-right: 2px solid rgba(78, 126, 248, 0.2);
  padding: 0;
  transform: translateX(${e=>e.isOpen?"0":"-100%"});
  transition: transform 0.3s ease, height 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  overflow-y: auto;
  pointer-events: auto;
  height: ${e=>e.$footerVisible?`calc(100% - ${e.$footerOffset}px)`:"100%"};
  will-change: transform, height;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(19, 18, 41, 0.95);
  }

  &::-webkit-scrollbar-thumb {
    background: #4e7ef8;
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`,wi=i.nav`
  padding: 1.5rem 0;
`,vi=i.div`
  margin-bottom: 1.5rem;
  padding: 0 1.5rem;
`,yi=i.h3`
  color: #FFD700;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(255, 215, 0, 0.3);
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,ki=i.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`,Ci=i.li`
  margin-bottom: 0.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`,Si=i(Me)`
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  display: block;
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  transition: all 0.2s ease;
  font-size: 0.95rem;

  &:hover {
    background: rgba(78, 126, 248, 0.1);
    color: #4e7ef8;
    transform: translateX(5px);
  }

  &.active {
    background: rgba(78, 126, 248, 0.15);
    color: #4e7ef8;
  }
`,Ei=({isOpen:r,onToggle:t})=>{const[n,i]=e.useState(!1),[s,a]=e.useState(0),o=e.useRef(null),l=e.useRef(0),d=e.useRef(),c=e.useRef(0);return e.useEffect((()=>{const e=document.querySelector("footer");if(!e)return;const r=()=>{const r=e.getBoundingClientRect(),t=window.innerHeight,n=window.scrollY;if(r.top<t){const e=t-r.top,n=Math.abs(c.current-e)>1?e:c.current;i(!0),a(n),c.current=n}else i(!1),a(0),c.current=0;l.current=n},t=()=>{d.current&&cancelAnimationFrame(d.current),d.current=requestAnimationFrame(r)},n=new IntersectionObserver((e=>{e.forEach((e=>{const t=e.boundingClientRect;(e.isIntersecting||t.top<window.innerHeight)&&r()}))}),{threshold:[0,.1,.2,.3,.4,.5,.6,.7,.8,.9,1],rootMargin:"0px"});return n.observe(e),window.addEventListener("scroll",t,{passive:!0}),window.addEventListener("resize",r,{passive:!0}),r(),()=>{d.current&&cancelAnimationFrame(d.current),n.disconnect(),window.removeEventListener("scroll",t),window.removeEventListener("resize",r)}}),[]),j.jsxs(j.Fragment,{children:[j.jsx(fi,{isOpen:r}),j.jsxs(mi,{isOpen:r,children:[j.jsx(gi,{children:j.jsx("img",{src:"/poe2logo.png",alt:"Path of Exile 2 Logo"})}),j.jsx(ui,{children:"Path of Exile 2"}),j.jsx(pi,{onClick:t,$isOpen:r,"aria-label":r?"Close sidebar":"Open sidebar",children:j.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",children:j.jsx("path",{d:"M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"})})})]}),j.jsx(bi,{isOpen:r,children:j.jsx(ji,{ref:o,isOpen:r,$footerVisible:n,$footerOffset:s,height:0,children:j.jsxs(wi,{children:[j.jsxs(vi,{children:[j.jsx(yi,{children:"Currency"}),j.jsxs(ki,{children:[j.jsx(Ci,{children:j.jsx(Si,{to:"/games/path-of-exile/currency/divine-orbs",children:"Divine Orbs"})}),j.jsx(Ci,{children:j.jsx(Si,{to:"/games/path-of-exile/currency/chaos-orbs",children:"Chaos Orbs"})}),j.jsx(Ci,{children:j.jsx(Si,{to:"/games/path-of-exile/currency/exalted-orbs",children:"Exalted Orbs"})})]})]}),j.jsxs(vi,{children:[j.jsx(yi,{children:"Leveling"}),j.jsxs(ki,{children:[j.jsx(Ci,{children:j.jsx(Si,{to:"/games/path-of-exile/leveling/campaign",children:"Campaign Boost"})}),j.jsx(Ci,{children:j.jsx(Si,{to:"/games/path-of-exile/leveling/acts",children:"Acts 1-10"})}),j.jsx(Ci,{children:j.jsx(Si,{to:"/games/path-of-exile/leveling/endgame",children:"Endgame Leveling"})})]})]}),j.jsxs(vi,{children:[j.jsx(yi,{children:"Items"}),j.jsxs(ki,{children:[j.jsx(Ci,{children:j.jsx(Si,{to:"/games/path-of-exile/items/uniques",children:"Unique Items"})}),j.jsx(Ci,{children:j.jsx(Si,{to:"/games/path-of-exile/items/gems",children:"Skill Gems"})}),j.jsx(Ci,{children:j.jsx(Si,{to:"/games/path-of-exile/items/equipment",children:"Equipment"})})]})]}),j.jsxs(vi,{children:[j.jsx(yi,{children:"Services"}),j.jsxs(ki,{children:[j.jsx(Ci,{children:j.jsx(Si,{to:"/games/path-of-exile/services/coaching",children:"Coaching"})}),j.jsx(Ci,{children:j.jsx(Si,{to:"/games/path-of-exile/services/builds",children:"Build Guides"})}),j.jsx(Ci,{children:j.jsx(Si,{to:"/games/path-of-exile/services/custom",children:"Custom Orders"})})]})]})]})})})]})},zi=i.div`
  display: flex;
  min-height: 100vh;
  background: #131229;
`,Pi=i.main`
  flex: 1;
  margin-left: ${e=>e.$sidebarOpen?"280px":"0"};
  transition: margin-left 0.3s ease;
  padding: 2rem;
  color: white;
  overflow-x: hidden;
  
  @media (max-width: 768px) {
    margin-left: 0;
    padding: 1rem;
  }
  
  * {
    pointer-events: auto;
  }
`,Oi=i.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    font-size: 1.6rem;
    margin-bottom: 1.5rem;
  }
`,Li=i.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 4rem;
  perspective: 1000px;
  
  /* Убедимся, что все дети ServicesGrid получат hover события */
  > * {
    pointer-events: auto;
    position: relative;
    z-index: 2;
  }
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,Di=i.div`
  margin-bottom: 4rem;
  position: relative;
`,Ai=i.div`
  position: relative;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
  margin-bottom: 4rem;
  transform: translateY(30px);
  box-shadow: 0 10px 25px rgba(78, 126, 248, 0.1);
  border: 1px solid rgba(78, 126, 248, 0.05);
  border-radius: 16px;
  padding: 20px;
  will-change: transform, opacity;
  
  /* Обеспечиваем, что все потомки получат события */
  * {
    pointer-events: auto;
  }
  
  &.active-left {
    opacity: 1;
    transform: translateY(0) translateX(-20px);
    transition: opacity 0.8s ease-out, transform 0.8s ease-out;
  }
  
  &.active-right {
    opacity: 1;
    transform: translateY(0) translateX(20px);
    transition: opacity 0.8s ease-out, transform 0.8s ease-out;
  }
  
  &.to-left {
    opacity: 0;
    transform: translateY(-20px) translateX(-20px);
    transition: opacity 0.8s ease-out, transform 0.8s ease-out;
  }
  
  &.to-right {
    opacity: 0;
    transform: translateY(-20px) translateX(20px);
    transition: opacity 0.8s ease-out, transform 0.8s ease-out;
  }
`,Bi=i(Me)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, rgba(42, 25, 73, 0.9), rgba(19, 18, 41, 0.9));
  border-radius: 12px;
  padding: 20px;
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: hidden;
  height: 100%;
  min-height: 180px;
  border: 1px solid rgba(78, 126, 248, 0.1);
  z-index: 2;
  transform-style: preserve-3d;
  transform: perspective(1000px) rotateY(0deg) translateZ(0);
  isolation: isolate; /* Создаём новый контекст наложения для этого элемента */
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, #4e7ef8, #7f5df0);
    transform: scaleX(0);
    transform-origin: 0 0;
    transition: transform 0.4s ease;
    z-index: 0;
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
    
    &:before {
      transform: scaleX(1);
    }
    
    svg {
      transform: translateX(5px);
    }
  }
  
  /* Выравниваем наклон карточек View More под наклон родительского блока */
  ${Ai}:nth-child(2n) & {
    transform: perspective(1000px) rotateY(5deg) translateZ(0);
    
    &:hover {
      transform: translateY(-5px) perspective(1000px) rotateY(5deg);
    }
  }
  
  ${Ai}:nth-child(2n-1) & {
    transform: perspective(1000px) rotateY(-5deg) translateZ(0);
    
    &:hover {
      transform: translateY(-5px) perspective(1000px) rotateY(-5deg);
    }
  }
  
  span:first-child {
    font-size: 1.2rem;
    font-weight: 500;
    margin-bottom: 0.7rem;
    opacity: 0.8;
    letter-spacing: 0.5px;
    z-index: 1; /* Обеспечиваем, что текст будет выше псевдоэлементов */
  }
  
  span:nth-child(2) {
    font-size: 1.8rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    background: linear-gradient(90deg, #fff, #b8c7f0);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    letter-spacing: 1px;
    z-index: 1;
  }
  
  svg {
    width: 30px;
    height: 30px;
    fill: #4e7ef8;
    transition: transform 0.3s ease;
    padding: 5px;
    background: rgba(78, 126, 248, 0.1);
    border-radius: 50%;
    z-index: 1;
  }
`,Ri=i.div`
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(19, 18, 41, 0.6);
  position: relative;
  z-index: 1;
  border-top: 1px solid rgba(78, 126, 248, 0.1);
  overflow: hidden;
  transform-style: preserve-3d;
  box-shadow: 0 -5px 15px rgba(0, 0, 0, 0.1) inset;
  pointer-events: auto;
  
  &:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: radial-gradient(circle at center, rgba(78, 126, 248, 0.05), transparent 70%);
    transform: scale(0);
    transform-origin: center;
    transition: transform 0.6s ease;
    z-index: -1;
  }
`,Mi=i.div`
  font-size: 2.2rem;
  font-weight: 800;
  position: relative;
  background: linear-gradient(135deg, #fff, #b8c7f0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  transform: translateZ(0);
  transition: all 0.3s ease;
  
  span {
    font-size: 1.1rem;
    vertical-align: 5px;
    margin-left: 2px;
    opacity: 0.9;
  }
`,$i=i.button`
  background: linear-gradient(135deg, #77d247, #5fc235);
  color: white;
  border: none;
  padding: 0.7rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  position: relative;
  overflow: hidden;
  z-index: 10;
  
  &:active {
    transform: translateY(1px);
  }
`,Vi=i.ul`
  list-style: none;
  margin: 0.5rem 0 1.5rem;
  padding: 0;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.3s ease;
  position: relative;
  z-index: 2;
`,Ti=i.li`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 0.95rem;
  position: relative;
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateX(-10px);
  z-index: 2;
  
  &:after {
    content: "✓";
    color: #4e7ef8;
    font-weight: bold;
    font-size: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: rgba(78, 126, 248, 0.1);
    margin-right: 10px;
  }
`,Yi=i.div`
  position: relative;
  background: linear-gradient(180deg, #131229, rgba(19, 18, 41, 0.9));
  padding: 1.5rem;
  border-bottom: 1px solid rgba(78, 126, 248, 0.1);
  z-index: 1;
  width: 100%;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1) inset;
  transform-style: preserve-3d;
  pointer-events: auto;
  
  h3 {
    font-size: 1.4rem;
    font-weight: 700;
    background: linear-gradient(120deg, #fff, #b8c7f0);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    position: relative;
    margin: 0;
    
    &:after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 0;
      width: 40px;
      height: 3px;
      background: linear-gradient(90deg, #4e7ef8, #7f5df0);
      border-radius: 3px;
      transform: scaleX(0.6);
      transform-origin: left;
      transition: transform 0.3s ease;
    }
  }
`,Ui=i.div`
  width: 100%;
  height: 200px;
  margin: 1.5rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    transform: scale(1.5);
    transition: transform 0.3s ease;
  }
`,Ni=i.div`
  position: relative;
  background: linear-gradient(145deg, #1a0f2e, #16102a);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  border: 1px solid rgba(78, 126, 248, 0.1);
  cursor: pointer;
  height: 100%;
  transform-style: preserve-3d;
  z-index: 2;
  isolation: isolate;
  
  * {
    pointer-events: auto;
  }
  
  transform: perspective(1000px) rotateY(0deg) translateZ(0);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(78, 126, 248, 0.2), 0 0 10px rgba(78, 126, 248, 0.1);
    
    ${Ui} {
      img {
        transform: scale(1);
      }
    }
    
    ${Yi} h3:after {
      transform: scaleX(1);
    }
    
    ${Vi} {
      opacity: 1;
      transform: translateY(0);
    }
    
    ${Ti}:nth-child(1) {
      opacity: 1;
      transform: translateX(5px);
      transition-delay: 0.1s;
    }
    
    ${Ti}:nth-child(2) {
      opacity: 1;
      transform: translateX(5px);
      transition-delay: 0.2s;
    }
    
    ${Ti}:nth-child(3) {
      opacity: 1;
      transform: translateX(5px);
      transition-delay: 0.3s;
    }
    
    ${Ri}:before {
      transform: scale(2);
    }
    
    ${Mi} {
      transform: translateZ(15px) scale(1.05);
    }
    
    ${$i} {
      transform: translateY(-2px) translateZ(20px) scale(1.05);
      letter-spacing: 1px;
      background: linear-gradient(135deg, #5fc235, #77d247);
    }
  }
  
  ${Ai}:nth-child(2n) & {
    transform: perspective(1000px) rotateY(5deg) translateZ(0);
    
    &:hover {
      transform: translateY(-5px) perspective(1000px) rotateY(5deg);
    }
  }
  
  ${Ai}:nth-child(2n-1) & {
    transform: perspective(1000px) rotateY(-5deg) translateZ(0);
    
    &:hover {
      transform: translateY(-5px) perspective(1000px) rotateY(-5deg);
    }
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(78, 126, 248, 0.05), transparent);
    pointer-events: none;
  }
`,Gi=i.div`
  padding: 1.5rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
  background: radial-gradient(ellipse at top right, rgba(127, 93, 240, 0.03), transparent 80%);
  transform-style: preserve-3d;
  pointer-events: auto;
`,Fi=i.div`
  background: linear-gradient(to right, #1a0f2e, #311a54);
  border-radius: 12px;
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5rem;
  }
`,Hi=i.div`
  max-width: 60%;
  
  @media (max-width: 768px) {
    max-width: 100%;
  }
  
  h3 {
    font-size: 1.8rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }
  
  p {
    font-size: 1rem;
    line-height: 1.5;
  }
`,Ii=i.div`
  margin-bottom: 4rem;
`,Wi=i.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
  }
`,Xi=i.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 22%;
  position: relative;
  
  @media (max-width: 768px) {
    width: 100%;
    flex-direction: row;
    align-items: flex-start;
    gap: 1rem;
  }
  
  &:not(:last-child):after {
    content: "";
    position: absolute;
    top: 25px;
    right: -15%;
    width: 30%;
    height: 2px;
    background: linear-gradient(to right, #4e7ef8, transparent);
    
    @media (max-width: 768px) {
      display: none;
    }
  }
`,_i=i.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #131229;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  border: 2px solid #4e7ef8;
  
  @media (max-width: 768px) {
    margin-bottom: 0;
    flex-shrink: 0;
  }
`,Ji=i.p`
  text-align: center;
  font-size: 1rem;
  line-height: 1.4;
  
  @media (max-width: 768px) {
    text-align: left;
  }
`,qi=i.div`
  margin-bottom: 4rem;
  position: relative;
  padding: 3rem 2rem;
  border-radius: 16px;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(26, 15, 46, 0.8), rgba(49, 26, 84, 0.8));
    z-index: -2;
  }
  
  &:after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    right: -50%;
    bottom: -50%;
    background: linear-gradient(
      217deg, 
      rgba(78, 126, 248, 0.4), 
      rgba(78, 126, 248, 0) 70%
    ), linear-gradient(
      127deg, 
      rgba(127, 93, 240, 0.4), 
      rgba(127, 93, 240, 0) 70%
    ), linear-gradient(
      336deg, 
      rgba(74, 222, 222, 0.4), 
      rgba(74, 222, 222, 0) 70%
    );
    opacity: 0.8;
    z-index: -1;
    animation: gradientAnimation 15s ease infinite;
  }
  
  @keyframes gradientAnimation {
    0% {
      transform: rotate(0deg) scale(1);
    }
    50% {
      transform: rotate(180deg) scale(1.2);
    }
    100% {
      transform: rotate(360deg) scale(1);
    }
  }
`,Zi=i(Oi)`
  position: relative;
  display: inline-block;
  margin-bottom: 3rem;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 100px;
    height: 4px;
    background: linear-gradient(90deg, #4e7ef8, #7f5df0, #4adede);
    border-radius: 4px;
  }
`,Qi=i.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  width: 100%;
  
  @media (max-width: 1024px) {
    flex-wrap: wrap;
  }
`,Ki=i.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 2rem;
  justify-content: center;
  margin: 0 auto;
  margin-bottom: 80px;
  
  @media (max-width: 1024px) {
    flex-wrap: wrap;
    margin-bottom: 100px;
  }
  
  @media (max-width: 768px) {
    gap: 1.5rem;
    margin-bottom: 120px;
  }
`,es=i.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.5s ease;
  cursor: pointer;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 50%;
    background: linear-gradient(135deg, #4e7ef8, #7f5df0);
    z-index: -1;
    animation: pulseAnimation 3s infinite alternate;
    animation-play-state: paused;
  }
  
  &:after {
    content: '';
    position: absolute;
    top: -3px;
    left: -3px;
    right: -3px;
    bottom: -3px;
    border-radius: 50%;
    background: linear-gradient(135deg, #7f5df0, #4adede);
    z-index: -2;
    opacity: 0.5;
    filter: blur(8px);
  }
  
  svg {
    width: 35px;
    height: 35px;
    fill: white;
    filter: drop-shadow(0 0 3px rgba(255, 255, 255, 0.5));
    transition: transform 0.3s ease;
  }
  
  @keyframes pulseAnimation {
    0% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(78, 126, 248, 0.7);
    }
    
    70% {
      transform: scale(1);
      box-shadow: 0 0 0 10px rgba(78, 126, 248, 0);
    }
    
    100% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(78, 126, 248, 0);
    }
  }
`,rs=i.div`
  position: absolute;
  top: calc(100% + 15px);
  left: 50%;
  transform: translateX(-50%) translateY(10px);
  background: rgba(15, 10, 30, 0.95);
  border-radius: 8px;
  padding: 12px 18px;
  min-width: 220px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s ease;
  z-index: 10;
  border: 1px solid rgba(78, 126, 248, 0.3);
  backdrop-filter: blur(4px);
  
  &:before {
    content: '';
    position: absolute;
    top: -6px;
    left: 50%;
    transform: translateX(-50%) rotate(45deg);
    width: 12px;
    height: 12px;
    background: rgba(15, 10, 30, 0.95);
    border-left: 1px solid rgba(78, 126, 248, 0.3);
    border-top: 1px solid rgba(78, 126, 248, 0.3);
  }
`,ts=i.div`
  font-size: 1.1rem;
  font-weight: 600;
  background: linear-gradient(120deg, #fff, #b8c7f0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`,ns=i.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem;
  transition: transform 0.3s ease;
  height: 120px;
  z-index: 3;
  
  &:hover {
    transform: translateY(-10px);
    
    ${es} {
      &:before {
        animation-play-state: running;
      }
      
      svg {
        transform: scale(1.2);
      }
    }
    
    ${rs} {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
      pointer-events: auto;
    }
  }
  
  @media (max-width: 768px) {
    margin: 0.5rem;
    height: 110px;
  }
`,is=()=>{const[r,t]=e.useState(!0),n=e.useRef([]),i=e.useRef(null),s=(e,r,t,n=0)=>{setTimeout((()=>{e&&requestAnimationFrame((()=>{r.forEach((r=>e.classList.remove(r))),t.forEach((r=>e.classList.add(r)))}))}),n)},a=()=>{i.current&&i.current.disconnect();i.current=new IntersectionObserver((e=>{e.forEach((e=>{const r=n.current.findIndex((r=>r===e.target));if(-1===r)return;const t=r%2!=0,i=t?"from-right":"from-left",a=t?"active-right":"active-left",o=t?"to-right":"to-left";if(e.intersectionRatio>=.75)s(e.target,["from-left","from-right","to-left","to-right"],[a]);else if(e.target.classList.contains(a)){const r=e.boundingClientRect.top<0;s(e.target,["active-left","active-right"],r?[o]:[i])}}))}),{root:null,rootMargin:"0px",threshold:.75}),n.current=Array.from(document.querySelectorAll(".animated-section-marker")),n.current.forEach(((e,r)=>{var t;if(e){const n=r%2!=0?"from-right":"from-left";e.classList.remove("active-left","active-right","to-left","to-right"),e.classList.add(n),null==(t=i.current)||t.observe(e),0===r&&setTimeout((()=>{s(e,[n],["active-left"])}),100)}}))},o=((e,r)=>{let t=null;return(...n)=>{null!==t&&(clearTimeout(t),t=null),t=setTimeout((()=>e(...n)),r)}})(a,250);e.useEffect((()=>(a(),window.addEventListener("resize",o),()=>{i.current&&i.current.disconnect(),window.removeEventListener("resize",o)})),[]);return j.jsxs(zi,{children:[j.jsx(Ei,{isOpen:r,onToggle:()=>{t(!r)}}),j.jsxs(Pi,{$sidebarOpen:r,children:[j.jsx(Ai,{ref:e=>{e&&(n.current[0]=e)},className:"animated-section-marker",children:j.jsxs(Di,{children:[j.jsx(Oi,{children:"Hot Offers"}),j.jsxs(Li,{children:[j.jsxs(Ni,{children:[j.jsx(Yi,{children:j.jsx("h3",{children:"PoE 2 Exalted Orbs"})}),j.jsxs(Gi,{children:[j.jsx(Ui,{children:j.jsx("img",{src:"/poe2orb.webp",alt:"PoE 2 Exalted Orbs"})}),j.jsxs(Vi,{children:[j.jsx(Ti,{children:"Choose Any Amount"}),j.jsx(Ti,{children:"Quick Delivery"}),j.jsx(Ti,{children:"Low Priced & Safe"})]})]}),j.jsxs(Ri,{children:[j.jsxs(Mi,{children:["3",j.jsx("span",{children:"32"}),"€"]}),j.jsx($i,{children:"Order now"})]})]}),j.jsxs(Ni,{children:[j.jsx(Yi,{children:j.jsx("h3",{children:"PoE 2 Divine Orbs"})}),j.jsxs(Gi,{children:[j.jsx(Ui,{children:j.jsx("img",{src:"/poe2orb2.webp",alt:"PoE 2 Divine Orbs"})}),j.jsxs(Vi,{children:[j.jsx(Ti,{children:"Choose Any Amount"}),j.jsx(Ti,{children:"Quick Delivery"}),j.jsx(Ti,{children:"Low Priced & Safe"})]})]}),j.jsxs(Ri,{children:[j.jsxs(Mi,{children:["3",j.jsx("span",{children:"15"}),"€"]}),j.jsx($i,{children:"Order now"})]})]}),j.jsxs(Ni,{children:[j.jsx(Yi,{children:j.jsx("h3",{children:"PoE 2 Unique Items"})}),j.jsx(Gi,{children:j.jsxs(Vi,{children:[j.jsx(Ti,{children:"All PoE 2 Uniques"}),j.jsx(Ti,{children:"Quick Item Delivery"}),j.jsx(Ti,{children:"Low Priced & Safe"})]})}),j.jsxs(Ri,{children:[j.jsxs(Mi,{children:["0",j.jsx("span",{children:"50"}),"€"]}),j.jsx($i,{children:"Order now"})]})]})]})]})}),j.jsx(Ai,{ref:e=>{e&&(n.current[1]=e)},className:"animated-section-marker",children:j.jsxs(Di,{children:[j.jsx(Oi,{children:"Popular This Week"}),j.jsxs(Li,{children:[j.jsxs(Ni,{children:[j.jsx(Yi,{children:j.jsx("h3",{children:"PoE 2 Jeweller's Orbs"})}),j.jsx(Gi,{children:j.jsxs(Vi,{children:[j.jsx(Ti,{children:"All 3 Types of Orbs"}),j.jsx(Ti,{children:"Quick Delivery"}),j.jsx(Ti,{children:"Low Priced & Safe"})]})}),j.jsxs(Ri,{children:[j.jsxs(Mi,{children:["3",j.jsx("span",{children:"99"}),"€"]}),j.jsx($i,{children:"Order now"})]})]}),j.jsxs(Ni,{children:[j.jsx(Yi,{children:j.jsx("h3",{children:"PoE 2 New Character Boost + Free Ascendancy"})}),j.jsx(Gi,{children:j.jsxs(Vi,{children:[j.jsx(Ti,{children:"Campaign Boost"}),j.jsx(Ti,{children:"Up To Level 75"}),j.jsx(Ti,{children:"Free Trials"})]})}),j.jsxs(Ri,{children:[j.jsxs(Mi,{children:["15",j.jsx("span",{children:"99"}),"€"]}),j.jsx($i,{children:"Order now"})]})]}),j.jsxs(Ni,{children:[j.jsx(Yi,{children:j.jsx("h3",{children:"PoE 2 Campaign Boost"})}),j.jsx(Gi,{children:j.jsxs(Vi,{children:[j.jsx(Ti,{children:"Choose Any Act"}),j.jsx(Ti,{children:"Access Endgame Quickly"}),j.jsx(Ti,{children:"Cheap & Secure"})]})}),j.jsxs(Ri,{children:[j.jsxs(Mi,{children:["12",j.jsx("span",{children:"99"}),"€"]}),j.jsx($i,{children:"Order now"})]})]})]})]})}),j.jsx(Ai,{ref:e=>{e&&(n.current[2]=e)},className:"animated-section-marker",children:j.jsxs(Di,{children:[j.jsx(Oi,{children:"Currency"}),j.jsxs(Li,{children:[j.jsxs(Ni,{children:[j.jsx(Yi,{children:j.jsx("h3",{children:"PoE 2 Divine Orbs"})}),j.jsx(Gi,{children:j.jsxs(Vi,{children:[j.jsx(Ti,{children:"Choose Any Amount"}),j.jsx(Ti,{children:"Quick Delivery"}),j.jsx(Ti,{children:"Low Priced & Safe"})]})}),j.jsxs(Ri,{children:[j.jsxs(Mi,{children:["3",j.jsx("span",{children:"15"}),"€"]}),j.jsx($i,{children:"Order now"})]})]}),j.jsxs(Ni,{children:[j.jsx(Yi,{children:j.jsx("h3",{children:"PoE 2 Regal Orbs"})}),j.jsx(Gi,{children:j.jsxs(Vi,{children:[j.jsx(Ti,{children:"Upgrade Your Gear"}),j.jsx(Ti,{children:"Quick Delivery"}),j.jsx(Ti,{children:"Low Priced & Safe"})]})}),j.jsxs(Ri,{children:[j.jsxs(Mi,{children:["1",j.jsx("span",{children:"95"}),"€"]}),j.jsx($i,{children:"Order now"})]})]}),j.jsxs(Bi,{to:"#",children:[j.jsx("span",{children:"View more"}),j.jsx("span",{children:"Currency"}),j.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",children:j.jsx("path",{d:"M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"})})]})]})]})}),j.jsx(Ai,{ref:e=>{e&&(n.current[3]=e)},className:"animated-section-marker",children:j.jsxs(Di,{children:[j.jsx(Oi,{children:"Leveling"}),j.jsxs(Li,{children:[j.jsxs(Ni,{children:[j.jsx(Yi,{children:j.jsx("h3",{children:"PoE 2 Leveling Gear Packs"})}),j.jsx(Gi,{children:j.jsxs(Vi,{children:[j.jsx(Ti,{children:"Full Leveling Set"}),j.jsx(Ti,{children:"Smooth Leveling"}),j.jsx(Ti,{children:"All Classes"})]})}),j.jsxs(Ri,{children:[j.jsxs(Mi,{children:["13",j.jsx("span",{children:"99"}),"€"]}),j.jsx($i,{children:"Order now"})]})]}),j.jsxs(Ni,{children:[j.jsx(Yi,{children:j.jsx("h3",{children:"PoE 2 League Starter Bundle"})}),j.jsx(Gi,{children:j.jsxs(Vi,{children:[j.jsx(Ti,{children:"Custom Options"}),j.jsx(Ti,{children:"Endgame Builds"}),j.jsx(Ti,{children:"Full Campaign"})]})}),j.jsxs(Ri,{children:[j.jsxs(Mi,{children:["191",j.jsx("span",{children:"99"}),"€"]}),j.jsx($i,{children:"Order now"})]})]}),j.jsxs(Bi,{to:"#",children:[j.jsx("span",{children:"View more"}),j.jsx("span",{children:"Leveling"}),j.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",children:j.jsx("path",{d:"M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"})})]})]})]})}),j.jsx(Ai,{ref:e=>{e&&(n.current[4]=e)},className:"animated-section-marker",children:j.jsxs(Di,{children:[j.jsx(Oi,{children:"Gems"}),j.jsxs(Li,{children:[j.jsxs(Ni,{children:[j.jsx(Yi,{children:j.jsx("h3",{children:"PoE 2 Uncut Spirit Gems"})}),j.jsx(Gi,{children:j.jsxs(Vi,{children:[j.jsx(Ti,{children:"Buff Your Skill Gems"}),j.jsx(Ti,{children:"Upgrade Your Skills"}),j.jsx(Ti,{children:"Low Priced & Safe"})]})}),j.jsxs(Ri,{children:[j.jsxs(Mi,{children:["2",j.jsx("span",{children:"69"}),"€"]}),j.jsx($i,{children:"Order now"})]})]}),j.jsxs(Ni,{children:[j.jsx(Yi,{children:j.jsx("h3",{children:"PoE 2 Uncut Skill Gems"})}),j.jsx(Gi,{children:j.jsxs(Vi,{children:[j.jsx(Ti,{children:"Create Skill Gems"}),j.jsx(Ti,{children:"Upgrade Your Skills"}),j.jsx(Ti,{children:"Low Priced & Safe"})]})}),j.jsxs(Ri,{children:[j.jsxs(Mi,{children:["2",j.jsx("span",{children:"69"}),"€"]}),j.jsx($i,{children:"Order now"})]})]}),j.jsxs(Bi,{to:"#",children:[j.jsx("span",{children:"View more"}),j.jsx("span",{children:"Gems"}),j.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",children:j.jsx("path",{d:"M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"})})]})]})]})}),j.jsxs(Ai,{ref:e=>{e&&(n.current[5]=e)},className:"animated-section-marker",children:[j.jsxs(Fi,{children:[j.jsxs(Hi,{children:[j.jsx("h3",{children:"Didn't find what you need? Create a custom order"}),j.jsx("p",{children:"Contact us and a PRO player will help you out. We'll find the best deal or create a personalized order for you at a lower price."})]}),j.jsx($i,{children:"Create custom order"})]}),j.jsxs(Ii,{children:[j.jsx(Oi,{children:"How it works"}),j.jsxs(Wi,{children:[j.jsxs(Xi,{children:[j.jsx(_i,{children:"1"}),j.jsx(Ji,{children:"Choose a service and discuss details"})]}),j.jsxs(Xi,{children:[j.jsx(_i,{children:"2"}),j.jsx(Ji,{children:"Track your order status in real-time"})]}),j.jsxs(Xi,{children:[j.jsx(_i,{children:"3"}),j.jsx(Ji,{children:"Get matched with a top PRO player instantly"})]}),j.jsxs(Xi,{children:[j.jsx(_i,{children:"4"}),j.jsx(Ji,{children:"Enjoy your rewards!"})]})]})]})]}),j.jsx(Ai,{ref:e=>{e&&(n.current[6]=e)},className:"animated-section-marker",children:j.jsxs(qi,{children:[j.jsx(Zi,{children:"With GGTips you get"}),j.jsx(Qi,{children:j.jsxs(Ki,{children:[j.jsxs(ns,{children:[j.jsx(es,{children:j.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",children:j.jsx("path",{d:"M12 2a10 10 0 0 1 10 10 10 10 0 0 1-10 10A10 10 0 0 1 2 12 10 10 0 0 1 12 2m0 2a8 8 0 0 0-8 8 8 8 0 0 0 8 8 8 8 0 0 0 8-8 8 8 0 0 0-8-8m0 3a1 1 0 0 1 1 1v4h2v2h-4V8a1 1 0 0 1 1-1"})})}),j.jsx(rs,{children:j.jsx(ts,{children:"Connect with our friendly managers and PRO players"})})]}),j.jsxs(ns,{children:[j.jsx(es,{children:j.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",children:j.jsx("path",{d:"M20.2,2H19.5H18C17.1,2 16,3 16,4H8C8,3 6.9,2 6,2H4.5H3.8H2V11C2,12 3,13 4,13H6.2C6.6,15 7.9,16.7 11,17V19.1C8.8,19.3 8,20.4 8,21.7V22H16V21.7C16,20.4 15.2,19.3 13,19.1V17C16.1,16.7 17.4,15 17.8,13H20C21,13 22,12 22,11V2H20.2M4,11V4H6V6V11C5.1,11 4.3,11 4,11M20,11C19.7,11 18.9,11 18,11V6V4H20V11Z"})})}),j.jsx(rs,{children:j.jsx(ts,{children:"Benefit from 24/7 support for all your gaming needs"})})]}),j.jsxs(ns,{children:[j.jsx(es,{children:j.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",children:j.jsx("path",{d:"M12,3C7.58,3 4,4.79 4,7C4,9.21 7.58,11 12,11C16.42,11 20,9.21 20,7C20,4.79 16.42,3 12,3M4,9V12C4,14.21 7.58,16 12,16C16.42,16 20,14.21 20,12V9C20,11.21 16.42,13 12,13C7.58,13 4,11.21 4,9M4,14V17C4,19.21 7.58,21 12,21C16.42,21 20,19.21 20,17V14C20,16.21 16.42,18 12,18C7.58,18 4,16.21 4,14Z"})})}),j.jsx(rs,{children:j.jsx(ts,{children:"Trust in our secure service—your data's safety is our top priority"})})]}),j.jsxs(ns,{children:[j.jsx(es,{children:j.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",children:j.jsx("path",{d:"M15.96 10.29l-2.75 3.54-1.96-2.36L8.5 15h11l-3.54-4.71M3 5H1v16c0 1.1.9 2 2 2h16v-2H3V5m18-4H7c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2m0 16H7V3h14v14"})})}),j.jsx(rs,{children:j.jsx(ts,{children:"Enjoy peace of mind with our instant money-back guarantee"})})]}),j.jsxs(ns,{children:[j.jsx(es,{children:j.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",children:j.jsx("path",{d:"M13,2.03V2.05L13,4.05C17.39,4.59 20.5,8.58 19.96,12.97C19.5,16.61 16.64,19.5 13,19.93V21.93C18.5,21.38 22.5,16.5 21.95,11C21.5,6.25 17.73,2.5 13,2.03M11,2.06C9.05,2.25 7.19,3 5.67,4.26L7.1,5.74C8.22,4.84 9.57,4.26 11,4.06V2.06M4.26,5.67C3,7.19 2.25,9.04 2.05,11H4.05C4.24,9.58 4.8,8.23 5.69,7.1L4.26,5.67M2.06,13C2.26,14.96 3.03,16.81 4.27,18.33L5.69,16.9C4.81,15.77 4.24,14.42 4.06,13H2.06M7.1,18.37L5.67,19.74C7.18,21 9.04,21.79 11,22V20C9.58,19.82 8.23,19.25 7.1,18.37M16.82,15.19L12.71,11.08C13.12,10.04 12.89,8.82 12.03,7.97C11.13,7.06 9.78,6.88 8.69,7.38L10.63,9.32L9.28,10.68L7.29,8.73C6.75,9.82 7,11.17 7.88,12.08C8.74,12.94 9.96,13.16 11,12.76L15.11,16.86C15.29,17.05 15.56,17.05 15.74,16.86L16.78,15.83C17,15.65 17,15.33 16.82,15.19Z"})})}),j.jsx(rs,{children:j.jsx(ts,{children:"Play with one of the best PROs out there"})})]}),j.jsxs(ns,{children:[j.jsx(es,{children:j.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",children:j.jsx("path",{d:"M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2M12 20A8 8 0 1 1 20 12A8 8 0 0 1 12 20M16.2 16.2L11 13V7H12.5V12.2L17 14.9Z"})})}),j.jsx(rs,{children:j.jsx(ts,{children:"Take your gaming experience to new heights!"})})]})]})})]})})]})]})},ss=i.button`
  position: absolute;
  right: -32px;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(19, 18, 41, 0.95);
  border: none;
  border: 2px solid rgba(78, 126, 248, 0.3);
  border-radius: 0 8px 8px 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: white;
  backdrop-filter: blur(5px);
  z-index: 100;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(78, 126, 248, 0.1), transparent);
    border-radius: 0 6px 6px 0;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  svg {
    width: 16px;
    height: 16px;
    fill: currentColor;
    transition: transform 0.3s ease;
    transform: ${e=>e.$isOpen?"rotate(0deg)":"rotate(180deg)"};
  }
  
  &:hover {
    color: #4e7ef8;
    
    &:before {
      opacity: 1;
    }
    
    svg {
      transform: ${e=>e.$isOpen?"rotate(0deg) scale(1.2)":"rotate(180deg) scale(1.2)"};
    }
  }
`,as=i.div`
  position: fixed;
  left: 0;
  top: 100px;
  width: 280px;
  height: 180px;
  background: rgba(19, 18, 41, 0.95);
  border-bottom: 1px solid rgba(78, 126, 248, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 99;
  transform: translateX(${e=>e.isOpen?"0":"-100%"});
  transition: transform 0.3s ease;
  
  @media (max-width: 768px) {
    width: 260px;
    height: 160px;
    top: 80px;
  }
`,os=i.div`
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  
  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
  }
`,ls=i.h1`
  font-size: 1.2rem;
  font-weight: 700;
  background: linear-gradient(120deg, #ffffff, #b8c7f0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
  text-align: center;
  padding: 0 1rem;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`,ds=i.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  background: transparent;
  border-right: 2px solid rgba(78, 126, 248, 0.2);
  padding: 0;
  transform: translateX(${e=>e.isOpen?"0":"-100%"});
  transition: transform 0.3s ease, height 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  overflow-y: auto;
  pointer-events: auto;
  height: ${e=>e.$footerVisible?`calc(100% - ${e.$footerOffset}px)`:"100%"};
  will-change: transform, height;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(19, 18, 41, 0.95);
  }

  &::-webkit-scrollbar-thumb {
    background: #4e7ef8;
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`,cs=i.div`
  position: fixed;
  left: 0;
  top: 280px;
  width: 280px;
  z-index: 98;
  pointer-events: none;
  bottom: 12px;
  
  @media (max-width: 768px) {
    width: 260px;
    top: 240px;
  }
`,hs=i.div`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 280px;
  background: rgba(19, 18, 41, 0.95);
  z-index: 97;
  transform: translateX(${e=>e.isOpen?"0":"-100%"});
  transition: transform 0.3s ease;

  @media (max-width: 768px) {
    width: 260px;
  }
`,xs=i.nav`
  padding: 1.5rem 0;
`,ps=i.div`
  margin-bottom: 1.5rem;
  padding: 0 1.5rem;
`,ms=i.h3`
  color: #FFD700;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(255, 215, 0, 0.3);
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,gs=i.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`,us=i.li`
  margin-bottom: 0.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`,fs=i(Me)`
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  display: block;
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  transition: all 0.2s ease;
  font-size: 0.95rem;

  &:hover {
    background: rgba(78, 126, 248, 0.1);
    color: #4e7ef8;
    transform: translateX(5px);
  }

  &.active {
    background: rgba(78, 126, 248, 0.15);
    color: #4e7ef8;
  }
`,bs=({isOpen:r,onToggle:t})=>{const[n,i]=e.useState(!1),[s,a]=e.useState(0),o=e.useRef(null),l=e.useRef(),d=e.useRef(0);return e.useEffect((()=>{const e=document.querySelector("footer");if(!e)return;const r=()=>{const r=e.getBoundingClientRect(),t=window.innerHeight;if(r.top<t){const e=t-r.top,n=Math.abs(d.current-e)>1?e:d.current;i(!0),a(n),d.current=n}else i(!1),a(0),d.current=0},t=()=>{l.current&&cancelAnimationFrame(l.current),l.current=requestAnimationFrame(r)},n=new IntersectionObserver((e=>{e.forEach((e=>{const t=e.boundingClientRect;(e.isIntersecting||t.top<window.innerHeight)&&r()}))}),{threshold:[0,.1,.2,.3,.4,.5,.6,.7,.8,.9,1],rootMargin:"0px"});return n.observe(e),window.addEventListener("scroll",t,{passive:!0}),window.addEventListener("resize",r,{passive:!0}),r(),()=>{l.current&&cancelAnimationFrame(l.current),n.disconnect(),window.removeEventListener("scroll",t),window.removeEventListener("resize",r)}}),[]),j.jsxs(j.Fragment,{children:[j.jsx(hs,{isOpen:r}),j.jsxs(as,{isOpen:r,children:[j.jsx(os,{children:j.jsx("img",{src:"/gta5logo.png",alt:"GTA 5 Logo"})}),j.jsx(ls,{children:"Grand Theft Auto V"}),j.jsx(ss,{onClick:t,$isOpen:r,"aria-label":r?"Close sidebar":"Open sidebar",children:j.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",children:j.jsx("path",{d:"M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"})})})]}),j.jsx(cs,{isOpen:r,children:j.jsx(ds,{ref:o,isOpen:r,$footerVisible:n,$footerOffset:s,height:0,children:j.jsxs(xs,{children:[j.jsxs(ps,{children:[j.jsx(ms,{children:"Money"}),j.jsxs(gs,{children:[j.jsx(us,{children:j.jsx(fs,{to:"/games/gta5/money/money-boost",children:"Pure Cash"})}),j.jsx(us,{children:j.jsx(fs,{to:"/games/gta5/money/money-drop",children:"Cash/Cars"})}),j.jsx(us,{children:j.jsx(fs,{to:"/games/gta5/money/rank-boost",children:"Custom"})})]})]}),j.jsxs(ps,{children:[j.jsx(ms,{children:"RP Boost"}),j.jsxs(gs,{children:[j.jsx(us,{children:j.jsx(fs,{to:"/games/gta5/missions/heists",children:"RP Character"})}),j.jsx(us,{children:j.jsx(fs,{to:"/games/gta5/missions/cayo-perico",children:"RP Bunker"})}),j.jsx(us,{children:j.jsx(fs,{to:"/games/gta5/missions/doomsday",children:"MAX STATS"})})]})]}),j.jsxs(ps,{children:[j.jsx(ms,{children:"Custom Services"}),j.jsxs(gs,{children:[j.jsx(us,{children:j.jsx(fs,{to:"/games/gta5/items/vehicles",children:"Modded Cars"})}),j.jsx(us,{children:j.jsx(fs,{to:"/games/gta5/items/weapons",children:"Modded Outfits"})}),j.jsx(us,{children:j.jsx(fs,{to:"/games/gta5/items/properties",children:"Custom"})})]})]}),j.jsxs(ps,{children:[j.jsx(ms,{children:"Services"}),j.jsxs(gs,{children:[j.jsx(us,{children:j.jsx(fs,{to:"/games/gta5/services/account-recovery",children:"Account Recovery"})}),j.jsx(us,{children:j.jsx(fs,{to:"/games/gta5/services/modding",children:"Modding"})}),j.jsx(us,{children:j.jsx(fs,{to:"/games/gta5/services/custom",children:"Custom Orders"})})]})]})]})})})]})},js=i.div`
  display: flex;
  min-height: 100vh;
  background: #131229;
`,ws=i.main`
  flex: 1;
  margin-left: ${e=>e.$sidebarOpen?"280px":"0"};
  transition: margin-left 0.3s ease;
  padding: 2rem;
  color: white;
  overflow-x: hidden;
  
  @media (max-width: 768px) {
    margin-left: 0;
    padding: 1rem;
  }
  
  * {
    pointer-events: auto;
  }
`,vs=i.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    font-size: 1.6rem;
    margin-bottom: 1.5rem;
  }
`,ys=i.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 4rem;
  perspective: 1000px;
  
  /* Убедимся, что все дети ServicesGrid получат hover события */
  > * {
    pointer-events: auto;
    position: relative;
    z-index: 2;
  }
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,ks=i.div`
  margin-bottom: 4rem;
  position: relative;
`,Cs=i.div`
  position: relative;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
  margin-bottom: 4rem;
  transform: translateY(30px);
  box-shadow: 0 10px 25px rgba(78, 126, 248, 0.1);
  border: 1px solid rgba(78, 126, 248, 0.05);
  border-radius: 16px;
  padding: 20px;
  will-change: transform, opacity;
  
  /* Обеспечиваем, что все потомки получат события */
  * {
    pointer-events: auto;
  }
  
  &.active-left {
    opacity: 1;
    transform: translateY(0) translateX(-20px);
    transition: opacity 0.8s ease-out, transform 0.8s ease-out;
  }
  
  &.active-right {
    opacity: 1;
    transform: translateY(0) translateX(20px);
    transition: opacity 0.8s ease-out, transform 0.8s ease-out;
  }
  
  &.to-left {
    opacity: 0;
    transform: translateY(-20px) translateX(-20px);
    transition: opacity 0.8s ease-out, transform 0.8s ease-out;
  }
  
  &.to-right {
    opacity: 0;
    transform: translateY(-20px) translateX(20px);
    transition: opacity 0.8s ease-out, transform 0.8s ease-out;
  }
`,Ss=i.div`
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(19, 18, 41, 0.6);
  position: relative;
  z-index: 1;
  border-top: 1px solid rgba(78, 126, 248, 0.1);
  overflow: hidden;
  transform-style: preserve-3d;
  box-shadow: 0 -5px 15px rgba(0, 0, 0, 0.1) inset;
  pointer-events: auto;
  
  &:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: radial-gradient(circle at center, rgba(78, 126, 248, 0.05), transparent 70%);
    transform: scale(0);
    transform-origin: center;
    transition: transform 0.6s ease;
    z-index: -1;
  }
`,Es=i.div`
  font-size: 1.5rem;
  font-weight: 800;
  position: relative;
  background: linear-gradient(135deg, #fff, #b8c7f0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  transform: translateZ(0);
  transition: all 0.3s ease;
  
  span {
    font-size: 1.1rem;
    vertical-align: 5px;
    margin-left: 2px;
    opacity: 0.9;
  }
`,zs=i.button`
  background: linear-gradient(135deg, #77d247, #5fc235);
  color: white;
  border: none;
  padding: 0.7rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  position: relative;
  overflow: hidden;
  z-index: 10;
  
  &:active {
    transform: translateY(1px);
  }
`,Ps=i.ul`
  list-style: none;
  margin: 0.5rem 0 1.5rem;
  padding: 0;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.3s ease;
  position: relative;
  z-index: 2;
`,Os=i.li`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 0.95rem;
  position: relative;
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateX(-10px);
  z-index: 2;
  
  &:after {
    content: "✓";
    color: #4e7ef8;
    font-weight: bold;
    font-size: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: rgba(78, 126, 248, 0.1);
    margin-right: 10px;
  }
`,Ls=i.div`
  position: relative;
  background: linear-gradient(180deg, #131229, rgba(19, 18, 41, 0.9));
  padding: 1.5rem;
  border-bottom: 1px solid rgba(78, 126, 248, 0.1);
  z-index: 1;
  width: 100%;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1) inset;
  transform-style: preserve-3d;
  pointer-events: auto;
  
  h3 {
    font-size: 1.4rem;
    font-weight: 700;
    background: linear-gradient(120deg, #fff, #b8c7f0);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    position: relative;
    margin: 0;
    
    &:after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 0;
      width: 40px;
      height: 3px;
      background: linear-gradient(90deg, #4e7ef8, #7f5df0);
      border-radius: 3px;
      transform: scaleX(0.6);
      transform-origin: left;
      transition: transform 0.3s ease;
    }
  }
`,Ds=i.div`
  width: 100%;
  height: 200px;
  margin: 1.5rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    transform: scale(1.5);
    transition: transform 0.3s ease;
  }
`,As=i.div`
  position: relative;
  background: linear-gradient(145deg, #1a0f2e, #16102a);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  border: 1px solid rgba(78, 126, 248, 0.1);
  cursor: pointer;
  height: 100%;
  transform-style: preserve-3d;
  z-index: 2;
  isolation: isolate;
  
  * {
    pointer-events: auto;
  }
  
  transform: perspective(1000px) rotateY(0deg) translateZ(0);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(78, 126, 248, 0.2), 0 0 10px rgba(78, 126, 248, 0.1);
    
    ${Ds} {
      img {
        transform: scale(1);
      }
    }
    
    ${Ls} h3:after {
      transform: scaleX(1);
    }
    
    ${Ps} {
      opacity: 1;
      transform: translateY(0);
    }
    
    ${Os}:nth-child(1) {
      opacity: 1;
      transform: translateX(5px);
      transition-delay: 0.1s;
    }
    
    ${Os}:nth-child(2) {
      opacity: 1;
      transform: translateX(5px);
      transition-delay: 0.2s;
    }
    
    ${Os}:nth-child(3) {
      opacity: 1;
      transform: translateX(5px);
      transition-delay: 0.3s;
    }
    
    ${Ss}:before {
      transform: scale(2);
    }
    
    ${Es} {
      transform: translateZ(15px) scale(1.05);
    }
    
    ${zs} {
      transform: translateY(-2px) translateZ(20px) scale(1.05);
      letter-spacing: 1px;
      background: linear-gradient(135deg, #5fc235, #77d247);
    }
  }
  
  ${Cs}:nth-child(2n) & {
    transform: perspective(1000px) rotateY(5deg) translateZ(0);
    
    &:hover {
      transform: translateY(-5px) perspective(1000px) rotateY(5deg);
    }
  }
  
  ${Cs}:nth-child(2n-1) & {
    transform: perspective(1000px) rotateY(-5deg) translateZ(0);
    
    &:hover {
      transform: translateY(-5px) perspective(1000px) rotateY(-5deg);
    }
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(78, 126, 248, 0.05), transparent);
    pointer-events: none;
  }
`,Bs=i.div`
  padding: 1.5rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
  background: radial-gradient(ellipse at top right, rgba(127, 93, 240, 0.03), transparent 80%);
  transform-style: preserve-3d;
  pointer-events: auto;
`,Rs=i.div`
  background: linear-gradient(to right, #1a0f2e, #311a54);
  border-radius: 12px;
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5rem;
  }
`,Ms=i.div`
  max-width: 60%;
  
  @media (max-width: 768px) {
    max-width: 100%;
  }
  
  h3 {
    font-size: 1.8rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }
  
  p {
    font-size: 1rem;
    line-height: 1.5;
  }
`,$s=i.div`
  margin-bottom: 4rem;
`,Vs=i.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
  }
`,Ts=i.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 22%;
  position: relative;
  
  @media (max-width: 768px) {
    width: 100%;
    flex-direction: row;
    align-items: flex-start;
    gap: 1rem;
  }
  
  &:not(:last-child):after {
    content: "";
    position: absolute;
    top: 25px;
    right: -15%;
    width: 30%;
    height: 2px;
    background: linear-gradient(to right, #4e7ef8, transparent);
    
    @media (max-width: 768px) {
      display: none;
    }
  }
`,Ys=i.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #131229;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  border: 2px solid #4e7ef8;
  
  @media (max-width: 768px) {
    margin-bottom: 0;
    flex-shrink: 0;
  }
`,Us=i.p`
  text-align: center;
  font-size: 1rem;
  line-height: 1.4;
  
  @media (max-width: 768px) {
    text-align: left;
  }
`,Ns=i.div`
  margin-bottom: 4rem;
  position: relative;
  padding: 3rem 2rem;
  border-radius: 16px;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(26, 15, 46, 0.8), rgba(49, 26, 84, 0.8));
    z-index: -2;
  }
  
  &:after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    right: -50%;
    bottom: -50%;
    background: linear-gradient(
      217deg, 
      rgba(78, 126, 248, 0.4), 
      rgba(78, 126, 248, 0) 70%
    ), linear-gradient(
      127deg, 
      rgba(127, 93, 240, 0.4), 
      rgba(127, 93, 240, 0) 70%
    ), linear-gradient(
      336deg, 
      rgba(74, 222, 222, 0.4), 
      rgba(74, 222, 222, 0) 70%
    );
    opacity: 0.8;
    z-index: -1;
    animation: gradientAnimation 15s ease infinite;
  }
  
  @keyframes gradientAnimation {
    0% {
      transform: rotate(0deg) scale(1);
    }
    50% {
      transform: rotate(180deg) scale(1.2);
    }
    100% {
      transform: rotate(360deg) scale(1);
    }
  }
`,Gs=i(vs)`
  position: relative;
  display: inline-block;
  margin-bottom: 3rem;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 100px;
    height: 4px;
    background: linear-gradient(90deg, #4e7ef8, #7f5df0, #4adede);
    border-radius: 4px;
  }
`,Fs=i.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  width: 100%;
  
  @media (max-width: 1024px) {
    flex-wrap: wrap;
  }
`,Hs=i.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 2rem;
  justify-content: center;
  margin: 0 auto;
  margin-bottom: 80px;
  
  @media (max-width: 1024px) {
    flex-wrap: wrap;
    margin-bottom: 100px;
  }
  
  @media (max-width: 768px) {
    gap: 1.5rem;
    margin-bottom: 120px;
  }
`,Is=i.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.5s ease;
  cursor: pointer;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 50%;
    background: linear-gradient(135deg, #4e7ef8, #7f5df0);
    z-index: -1;
    animation: pulseAnimation 3s infinite alternate;
    animation-play-state: paused;
  }
  
  &:after {
    content: '';
    position: absolute;
    top: -3px;
    left: -3px;
    right: -3px;
    bottom: -3px;
    border-radius: 50%;
    background: linear-gradient(135deg, #7f5df0, #4adede);
    z-index: -2;
    opacity: 0.5;
    filter: blur(8px);
  }
  
  svg {
    width: 35px;
    height: 35px;
    fill: white;
    filter: drop-shadow(0 0 3px rgba(255, 255, 255, 0.5));
    transition: transform 0.3s ease;
  }
  
  @keyframes pulseAnimation {
    0% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(78, 126, 248, 0.7);
    }
    
    70% {
      transform: scale(1);
      box-shadow: 0 0 0 10px rgba(78, 126, 248, 0);
    }
    
    100% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(78, 126, 248, 0);
    }
  }
`,Ws=i.div`
  position: absolute;
  top: calc(100% + 15px);
  left: 50%;
  transform: translateX(-50%) translateY(10px);
  background: rgba(15, 10, 30, 0.95);
  border-radius: 8px;
  padding: 12px 18px;
  min-width: 220px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s ease;
  z-index: 10;
  border: 1px solid rgba(78, 126, 248, 0.3);
  backdrop-filter: blur(4px);
  
  &:before {
    content: '';
    position: absolute;
    top: -6px;
    left: 50%;
    transform: translateX(-50%) rotate(45deg);
    width: 12px;
    height: 12px;
    background: rgba(15, 10, 30, 0.95);
    border-left: 1px solid rgba(78, 126, 248, 0.3);
    border-top: 1px solid rgba(78, 126, 248, 0.3);
  }
`,Xs=i.div`
  font-size: 1.1rem;
  font-weight: 600;
  background: linear-gradient(120deg, #fff, #b8c7f0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`,_s=i.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem;
  transition: transform 0.3s ease;
  height: 120px;
  z-index: 3;
  
  &:hover {
    transform: translateY(-10px);
    
    ${Is} {
      &:before {
        animation-play-state: running;
      }
      
      svg {
        transform: scale(1.2);
      }
    }
    
    ${Ws} {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
      pointer-events: auto;
    }
  }
  
  @media (max-width: 768px) {
    margin: 0.5rem;
    height: 110px;
  }
`,Js=i.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(19, 18, 41, 0.7);
  border: none;
  border-radius: 50%;
  box-shadow: 0 2px 12px rgba(78, 126, 248, 0.15);
  color: #4e7ef8;
  font-size: 2rem;
  cursor: pointer;
  z-index: 20;
  transition: background 0.2s, color 0.2s, box-shadow 0.2s, opacity 0.2s;
  opacity: 1;

  &:hover:not(:disabled) {
    background: rgba(78, 126, 248, 0.9);
    color: #fff;
    box-shadow: 0 4px 16px rgba(78, 126, 248, 0.25);
  }
  &:disabled {
    opacity: 0.3;
    cursor: default;
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    font-size: 1.5rem;
    top: 60%;
  }
`,qs=({cards:e,idx:r,setIdx:t,visibleCount:n})=>j.jsxs("div",{style:{position:"relative",minHeight:420},children:[j.jsx(Js,{style:{left:12},onClick:()=>t(Math.max(0,r-1)),disabled:0===r,"aria-label":"Previous",children:"←"}),j.jsx(ys,{children:e.slice(r,r+n)}),j.jsx(Js,{style:{right:12},onClick:()=>t(Math.min(e.length-n,r+1)),disabled:r+n>=e.length,"aria-label":"Next",children:"→"})]}),Zs=()=>{const[r,t]=e.useState(!0),n=e.useRef([]),i=e.useRef(null),s=(e,r,t,n=0)=>{setTimeout((()=>{e&&requestAnimationFrame((()=>{r.forEach((r=>e.classList.remove(r))),t.forEach((r=>e.classList.add(r)))}))}),n)},a=()=>{i.current&&i.current.disconnect();i.current=new IntersectionObserver((e=>{e.forEach((e=>{const r=n.current.findIndex((r=>r===e.target));if(-1===r)return;const t=r%2!=0,i=t?"from-right":"from-left",a=t?"active-right":"active-left",o=t?"to-right":"to-left";if(e.intersectionRatio>=.75)s(e.target,["from-left","from-right","to-left","to-right"],[a]);else if(e.target.classList.contains(a)){const r=e.boundingClientRect.top<0;s(e.target,["active-left","active-right"],r?[o]:[i])}}))}),{root:null,rootMargin:"0px",threshold:.75}),n.current=Array.from(document.querySelectorAll(".animated-section-marker")),n.current.forEach(((e,r)=>{var t;if(e){const n=r%2!=0?"from-right":"from-left";e.classList.remove("active-left","active-right","to-left","to-right"),e.classList.add(n),null==(t=i.current)||t.observe(e),0===r&&setTimeout((()=>{s(e,[n],["active-left"])}),100)}}))},o=((e,r)=>{let t=null;return(...n)=>{null!==t&&(clearTimeout(t),t=null),t=setTimeout((()=>e(...n)),r)}})(a,250);e.useEffect((()=>(a(),window.addEventListener("resize",o),()=>{i.current&&i.current.disconnect(),window.removeEventListener("resize",o)})),[]);const[l,d]=e.useState(0),[c,h]=e.useState(0),[x,p]=e.useState(0),[m,g]=e.useState(0),[u,f]=e.useState(0),b=[j.jsxs(As,{children:[j.jsx(Ls,{children:j.jsx("h3",{children:"100 MILLION PURE CASH"})}),j.jsxs(Bs,{children:[j.jsx(Ds,{children:j.jsx("img",{src:"/Gta5Cash.png",alt:"Gta 5 Cash"})}),j.jsxs(Ps,{children:[j.jsx(Os,{children:"Choose Any Amount"}),j.jsx(Os,{children:"Quick Delivery"}),j.jsx(Os,{children:"Low Priced & Safe"})]})]}),j.jsxs(Ss,{children:[j.jsxs(Es,{children:["49.99",j.jsx("span",{children:"1"}),"€"]}),j.jsx(zs,{children:"Order now"})]})]},"cash1"),j.jsxs(As,{children:[j.jsx(Ls,{children:j.jsx("h3",{children:"200 MILLION CASH/CARS"})}),j.jsxs(Bs,{children:[j.jsx(Ds,{children:j.jsx("img",{src:"/Gta5CashCars.png",alt:"Gta 5 Cash/Cars"})}),j.jsxs(Ps,{children:[j.jsx(Os,{children:"Choose Any Amount"}),j.jsx(Os,{children:"Quick Delivery"}),j.jsx(Os,{children:"Low Priced & Safe"})]})]}),j.jsxs(Ss,{children:[j.jsxs(Es,{children:["49.99",j.jsx("span",{children:"1"}),"€"]}),j.jsx(zs,{children:"Order now"})]})]},"cash2"),j.jsxs(As,{children:[j.jsx(Ls,{children:j.jsx("h3",{children:"Modded Cars"})}),j.jsxs(Bs,{children:[j.jsx(Ds,{children:j.jsx("img",{src:"/Gta5ModCars.png",alt:"Gta 5 Modded Cars"})}),j.jsxs(Ps,{children:[j.jsx(Os,{children:"All Modded Cars"}),j.jsx(Os,{children:"Quick Delivery"}),j.jsx(Os,{children:"Low Priced & Safe"})]})]}),j.jsxs(Ss,{children:[j.jsxs(Es,{children:["24.99",j.jsx("span",{children:"1"}),"€"]}),j.jsx(zs,{children:"Order now"})]})]},"modcars"),j.jsxs(As,{children:[j.jsx(Ls,{children:j.jsx("h3",{children:"500 MILLION PURE CASH"})}),j.jsxs(Bs,{children:[j.jsx(Ds,{children:j.jsx("img",{src:"/Gta5Cash.png",alt:"Gta 5 Cash"})}),j.jsxs(Ps,{children:[j.jsx(Os,{children:"Massive Amount"}),j.jsx(Os,{children:"Instant Delivery"}),j.jsx(Os,{children:"Best Value"})]})]}),j.jsxs(Ss,{children:[j.jsxs(Es,{children:["99.99",j.jsx("span",{children:"1"}),"€"]}),j.jsx(zs,{children:"Order now"})]})]},"bonus1"),j.jsxs(As,{children:[j.jsx(Ls,{children:j.jsx("h3",{children:"Exclusive Modded Account"})}),j.jsxs(Bs,{children:[j.jsx(Ds,{children:j.jsx("img",{src:"/Gta5ModdedAccount.png",alt:"Exclusive Modded Account"})}),j.jsxs(Ps,{children:[j.jsx(Os,{children:"Rare Vehicles"}),j.jsx(Os,{children:"Max Level"}),j.jsx(Os,{children:"Instant Access"})]})]}),j.jsxs(Ss,{children:[j.jsxs(Es,{children:["149.99",j.jsx("span",{children:"1"}),"€"]}),j.jsx(zs,{children:"Order now"})]})]},"bonus2"),j.jsxs(As,{children:[j.jsx(Ls,{children:j.jsx("h3",{children:"VIP Bundle"})}),j.jsxs(Bs,{children:[j.jsx(Ds,{children:j.jsx("img",{src:"/Gta5VIP.png",alt:"VIP Bundle"})}),j.jsxs(Ps,{children:[j.jsx(Os,{children:"Cash + Cars + RP"}),j.jsx(Os,{children:"Priority Support"}),j.jsx(Os,{children:"Exclusive Discounts"})]})]}),j.jsxs(Ss,{children:[j.jsxs(Es,{children:["199.99",j.jsx("span",{children:"1"}),"€"]}),j.jsx(zs,{children:"Order now"})]})]},"bonus3")],w=[j.jsxs(As,{children:[j.jsx(Ls,{children:j.jsx("h3",{children:"PoE 2 Jeweller's Orbs"})}),j.jsxs(Bs,{children:[j.jsx(Ds,{children:j.jsx("img",{src:"/poe2jewellers.webp",alt:"PoE 2 Jeweller's Orbs"})}),j.jsxs(Ps,{children:[j.jsx(Os,{children:"All 3 Types of Orbs"}),j.jsx(Os,{children:"Quick Delivery"}),j.jsx(Os,{children:"Low Priced & Safe"})]})]}),j.jsxs(Ss,{children:[j.jsxs(Es,{children:["3",j.jsx("span",{children:"99"}),"€"]}),j.jsx(zs,{children:"Order now"})]})]},"jewellers"),j.jsxs(As,{children:[j.jsx(Ls,{children:j.jsx("h3",{children:"PoE 2 New Character Boost + Free Ascendancy"})}),j.jsxs(Bs,{children:[j.jsx(Ds,{children:j.jsx("img",{src:"/poe2boost.webp",alt:"PoE 2 New Character Boost"})}),j.jsxs(Ps,{children:[j.jsx(Os,{children:"Campaign Boost"}),j.jsx(Os,{children:"Up To Level 75"}),j.jsx(Os,{children:"Free Trials"})]})]}),j.jsxs(Ss,{children:[j.jsxs(Es,{children:["15",j.jsx("span",{children:"99"}),"€"]}),j.jsx(zs,{children:"Order now"})]})]},"boost"),j.jsxs(As,{children:[j.jsx(Ls,{children:j.jsx("h3",{children:"PoE 2 Campaign Boost"})}),j.jsxs(Bs,{children:[j.jsx(Ds,{children:j.jsx("img",{src:"/poe2campaign.webp",alt:"PoE 2 Campaign Boost"})}),j.jsxs(Ps,{children:[j.jsx(Os,{children:"Choose Any Act"}),j.jsx(Os,{children:"Access Endgame Quickly"}),j.jsx(Os,{children:"Cheap & Secure"})]})]}),j.jsxs(Ss,{children:[j.jsxs(Es,{children:["12",j.jsx("span",{children:"99"}),"€"]}),j.jsx(zs,{children:"Order now"})]})]},"campaign"),j.jsxs(As,{children:[j.jsx(Ls,{children:j.jsx("h3",{children:"PoE 2 Chaos Orbs"})}),j.jsxs(Bs,{children:[j.jsx(Ds,{children:j.jsx("img",{src:"/poe2chaos.webp",alt:"PoE 2 Chaos Orbs"})}),j.jsxs(Ps,{children:[j.jsx(Os,{children:"Popular Currency"}),j.jsx(Os,{children:"Fast Delivery"}),j.jsx(Os,{children:"Best Price"})]})]}),j.jsxs(Ss,{children:[j.jsxs(Es,{children:["2",j.jsx("span",{children:"49"}),"€"]}),j.jsx(zs,{children:"Order now"})]})]},"pop1"),j.jsxs(As,{children:[j.jsx(Ls,{children:j.jsx("h3",{children:"PoE 2 Skill Boost"})}),j.jsxs(Bs,{children:[j.jsx(Ds,{children:j.jsx("img",{src:"/poe2skillboost.webp",alt:"PoE 2 Skill Boost"})}),j.jsxs(Ps,{children:[j.jsx(Os,{children:"Any Skill"}),j.jsx(Os,{children:"Fast Level Up"}),j.jsx(Os,{children:"Safe & Secure"})]})]}),j.jsxs(Ss,{children:[j.jsxs(Es,{children:["7",j.jsx("span",{children:"99"}),"€"]}),j.jsx(zs,{children:"Order now"})]})]},"pop2"),j.jsxs(As,{children:[j.jsx(Ls,{children:j.jsx("h3",{children:"PoE 2 Unique Bundle"})}),j.jsxs(Bs,{children:[j.jsx(Ds,{children:j.jsx("img",{src:"/poe2uniquebundle.webp",alt:"PoE 2 Unique Bundle"})}),j.jsxs(Ps,{children:[j.jsx(Os,{children:"All Unique Items"}),j.jsx(Os,{children:"Quick Delivery"}),j.jsx(Os,{children:"Best Price"})]})]}),j.jsxs(Ss,{children:[j.jsxs(Es,{children:["9",j.jsx("span",{children:"99"}),"€"]}),j.jsx(zs,{children:"Order now"})]})]},"pop3")],v=[j.jsxs(As,{children:[j.jsx(Ls,{children:j.jsx("h3",{children:"PoE 2 Divine Orbs"})}),j.jsxs(Bs,{children:[j.jsx(Ds,{children:j.jsx("img",{src:"/poe2divine.webp",alt:"PoE 2 Divine Orbs"})}),j.jsxs(Ps,{children:[j.jsx(Os,{children:"Choose Any Amount"}),j.jsx(Os,{children:"Quick Delivery"}),j.jsx(Os,{children:"Low Priced & Safe"})]})]}),j.jsxs(Ss,{children:[j.jsxs(Es,{children:["3",j.jsx("span",{children:"15"}),"€"]}),j.jsx(zs,{children:"Order now"})]})]},"divine"),j.jsxs(As,{children:[j.jsx(Ls,{children:j.jsx("h3",{children:"PoE 2 Regal Orbs"})}),j.jsxs(Bs,{children:[j.jsx(Ds,{children:j.jsx("img",{src:"/poe2regal.webp",alt:"PoE 2 Regal Orbs"})}),j.jsxs(Ps,{children:[j.jsx(Os,{children:"Upgrade Your Gear"}),j.jsx(Os,{children:"Quick Delivery"}),j.jsx(Os,{children:"Low Priced & Safe"})]})]}),j.jsxs(Ss,{children:[j.jsxs(Es,{children:["1",j.jsx("span",{children:"95"}),"€"]}),j.jsx(zs,{children:"Order now"})]})]},"regal"),j.jsxs(As,{children:[j.jsx(Ls,{children:j.jsx("h3",{children:"More Currency"})}),j.jsxs(Bs,{children:[j.jsx(Ds,{children:j.jsx("img",{src:"/poe2currency.webp",alt:"More Currency"})}),j.jsxs(Ps,{children:[j.jsx(Os,{children:"All PoE 2 Currency"}),j.jsx(Os,{children:"Fast Delivery"}),j.jsx(Os,{children:"Best Prices"})]})]}),j.jsxs(Ss,{children:[j.jsxs(Es,{children:["от ",j.jsx("span",{children:"0.99"}),"€"]}),j.jsx(zs,{children:"Order now"})]})]},"more"),j.jsxs(As,{children:[j.jsx(Ls,{children:j.jsx("h3",{children:"PoE 2 Orb of Fusing"})}),j.jsxs(Bs,{children:[j.jsx(Ds,{children:j.jsx("img",{src:"/poe2fusing.webp",alt:"PoE 2 Orb of Fusing"})}),j.jsxs(Ps,{children:[j.jsx(Os,{children:"Socket Linking"}),j.jsx(Os,{children:"Fast Delivery"}),j.jsx(Os,{children:"Best Price"})]})]}),j.jsxs(Ss,{children:[j.jsxs(Es,{children:["1",j.jsx("span",{children:"29"}),"€"]}),j.jsx(zs,{children:"Order now"})]})]},"cur1"),j.jsxs(As,{children:[j.jsx(Ls,{children:j.jsx("h3",{children:"PoE 2 Orb of Alchemy"})}),j.jsxs(Bs,{children:[j.jsx(Ds,{children:j.jsx("img",{src:"/poe2alchemy.webp",alt:"PoE 2 Orb of Alchemy"})}),j.jsxs(Ps,{children:[j.jsx(Os,{children:"Item Upgrades"}),j.jsx(Os,{children:"Fast Delivery"}),j.jsx(Os,{children:"Best Price"})]})]}),j.jsxs(Ss,{children:[j.jsxs(Es,{children:["0",j.jsx("span",{children:"99"}),"€"]}),j.jsx(zs,{children:"Order now"})]})]},"cur2"),j.jsxs(As,{children:[j.jsx(Ls,{children:j.jsx("h3",{children:"PoE 2 Orb of Scouring"})}),j.jsxs(Bs,{children:[j.jsx(Ds,{children:j.jsx("img",{src:"/poe2scouring.webp",alt:"PoE 2 Orb of Scouring"})}),j.jsxs(Ps,{children:[j.jsx(Os,{children:"Remove Mods"}),j.jsx(Os,{children:"Fast Delivery"}),j.jsx(Os,{children:"Best Price"})]})]}),j.jsxs(Ss,{children:[j.jsxs(Es,{children:["0",j.jsx("span",{children:"79"}),"€"]}),j.jsx(zs,{children:"Order now"})]})]},"cur3")],y=[j.jsxs(As,{children:[j.jsx(Ls,{children:j.jsx("h3",{children:"PoE 2 Leveling Gear Packs"})}),j.jsxs(Bs,{children:[j.jsx(Ds,{children:j.jsx("img",{src:"/poe2leveling.webp",alt:"PoE 2 Leveling Gear Packs"})}),j.jsxs(Ps,{children:[j.jsx(Os,{children:"Full Leveling Set"}),j.jsx(Os,{children:"Smooth Leveling"}),j.jsx(Os,{children:"All Classes"})]})]}),j.jsxs(Ss,{children:[j.jsxs(Es,{children:["13",j.jsx("span",{children:"99"}),"€"]}),j.jsx(zs,{children:"Order now"})]})]},"gear"),j.jsxs(As,{children:[j.jsx(Ls,{children:j.jsx("h3",{children:"PoE 2 League Starter Bundle"})}),j.jsxs(Bs,{children:[j.jsx(Ds,{children:j.jsx("img",{src:"/poe2starter.webp",alt:"PoE 2 League Starter Bundle"})}),j.jsxs(Ps,{children:[j.jsx(Os,{children:"Custom Options"}),j.jsx(Os,{children:"Endgame Builds"}),j.jsx(Os,{children:"Full Campaign"})]})]}),j.jsxs(Ss,{children:[j.jsxs(Es,{children:["191",j.jsx("span",{children:"99"}),"€"]}),j.jsx(zs,{children:"Order now"})]})]},"starter"),j.jsxs(As,{children:[j.jsx(Ls,{children:j.jsx("h3",{children:"More Leveling"})}),j.jsxs(Bs,{children:[j.jsx(Ds,{children:j.jsx("img",{src:"/poe2levelingmore.webp",alt:"More Leveling"})}),j.jsxs(Ps,{children:[j.jsx(Os,{children:"Any Leveling Service"}),j.jsx(Os,{children:"Fast & Secure"}),j.jsx(Os,{children:"Custom Options"})]})]}),j.jsxs(Ss,{children:[j.jsxs(Es,{children:["от ",j.jsx("span",{children:"2.99"}),"€"]}),j.jsx(zs,{children:"Order now"})]})]},"more"),j.jsxs(As,{children:[j.jsx(Ls,{children:j.jsx("h3",{children:"PoE 2 Fast Level 1-50"})}),j.jsxs(Bs,{children:[j.jsx(Ds,{children:j.jsx("img",{src:"/poe2fastlevel.webp",alt:"PoE 2 Fast Level 1-50"})}),j.jsxs(Ps,{children:[j.jsx(Os,{children:"Any Class"}),j.jsx(Os,{children:"Super Fast"}),j.jsx(Os,{children:"Safe & Secure"})]})]}),j.jsxs(Ss,{children:[j.jsxs(Es,{children:["19",j.jsx("span",{children:"99"}),"€"]}),j.jsx(zs,{children:"Order now"})]})]},"lev1"),j.jsxs(As,{children:[j.jsx(Ls,{children:j.jsx("h3",{children:"PoE 2 Endgame Boost"})}),j.jsxs(Bs,{children:[j.jsx(Ds,{children:j.jsx("img",{src:"/poe2endgame.webp",alt:"PoE 2 Endgame Boost"})}),j.jsxs(Ps,{children:[j.jsx(Os,{children:"Endgame Ready"}),j.jsx(Os,{children:"Fast Completion"}),j.jsx(Os,{children:"Best Price"})]})]}),j.jsxs(Ss,{children:[j.jsxs(Es,{children:["29",j.jsx("span",{children:"99"}),"€"]}),j.jsx(zs,{children:"Order now"})]})]},"lev2"),j.jsxs(As,{children:[j.jsx(Ls,{children:j.jsx("h3",{children:"PoE 2 Custom Leveling"})}),j.jsxs(Bs,{children:[j.jsx(Ds,{children:j.jsx("img",{src:"/poe2customlevel.webp",alt:"PoE 2 Custom Leveling"})}),j.jsxs(Ps,{children:[j.jsx(Os,{children:"Any Level"}),j.jsx(Os,{children:"Flexible Options"}),j.jsx(Os,{children:"Consult with PRO"})]})]}),j.jsxs(Ss,{children:[j.jsxs(Es,{children:["от ",j.jsx("span",{children:"9.99"}),"€"]}),j.jsx(zs,{children:"Order now"})]})]},"lev3")],k=[j.jsxs(As,{children:[j.jsx(Ls,{children:j.jsx("h3",{children:"PoE 2 Uncut Spirit Gems"})}),j.jsxs(Bs,{children:[j.jsx(Ds,{children:j.jsx("img",{src:"/poe2spiritgems.webp",alt:"PoE 2 Uncut Spirit Gems"})}),j.jsxs(Ps,{children:[j.jsx(Os,{children:"Buff Your Skill Gems"}),j.jsx(Os,{children:"Upgrade Your Skills"}),j.jsx(Os,{children:"Low Priced & Safe"})]})]}),j.jsxs(Ss,{children:[j.jsxs(Es,{children:["2",j.jsx("span",{children:"69"}),"€"]}),j.jsx(zs,{children:"Order now"})]})]},"spirit"),j.jsxs(As,{children:[j.jsx(Ls,{children:j.jsx("h3",{children:"PoE 2 Uncut Skill Gems"})}),j.jsxs(Bs,{children:[j.jsx(Ds,{children:j.jsx("img",{src:"/poe2skillgems.webp",alt:"PoE 2 Uncut Skill Gems"})}),j.jsxs(Ps,{children:[j.jsx(Os,{children:"Create Skill Gems"}),j.jsx(Os,{children:"Upgrade Your Skills"}),j.jsx(Os,{children:"Low Priced & Safe"})]})]}),j.jsxs(Ss,{children:[j.jsxs(Es,{children:["2",j.jsx("span",{children:"69"}),"€"]}),j.jsx(zs,{children:"Order now"})]})]},"skill"),j.jsxs(As,{children:[j.jsx(Ls,{children:j.jsx("h3",{children:"More Gems"})}),j.jsxs(Bs,{children:[j.jsx(Ds,{children:j.jsx("img",{src:"/poe2gemsmore.webp",alt:"More Gems"})}),j.jsxs(Ps,{children:[j.jsx(Os,{children:"All Skill Gems"}),j.jsx(Os,{children:"Fast Delivery"}),j.jsx(Os,{children:"Best Prices"})]})]}),j.jsxs(Ss,{children:[j.jsxs(Es,{children:["от ",j.jsx("span",{children:"0.49"}),"€"]}),j.jsx(zs,{children:"Order now"})]})]},"more"),j.jsxs(As,{children:[j.jsx(Ls,{children:j.jsx("h3",{children:"PoE 2 Support Gems"})}),j.jsxs(Bs,{children:[j.jsx(Ds,{children:j.jsx("img",{src:"/poe2supportgems.webp",alt:"PoE 2 Support Gems"})}),j.jsxs(Ps,{children:[j.jsx(Os,{children:"All Support Gems"}),j.jsx(Os,{children:"Fast Delivery"}),j.jsx(Os,{children:"Best Price"})]})]}),j.jsxs(Ss,{children:[j.jsxs(Es,{children:["1",j.jsx("span",{children:"19"}),"€"]}),j.jsx(zs,{children:"Order now"})]})]},"gem1"),j.jsxs(As,{children:[j.jsx(Ls,{children:j.jsx("h3",{children:"PoE 2 Quality Gems"})}),j.jsxs(Bs,{children:[j.jsx(Ds,{children:j.jsx("img",{src:"/poe2qualitygems.webp",alt:"PoE 2 Quality Gems"})}),j.jsxs(Ps,{children:[j.jsx(Os,{children:"High Quality"}),j.jsx(Os,{children:"Fast Delivery"}),j.jsx(Os,{children:"Best Price"})]})]}),j.jsxs(Ss,{children:[j.jsxs(Es,{children:["2",j.jsx("span",{children:"49"}),"€"]}),j.jsx(zs,{children:"Order now"})]})]},"gem2"),j.jsxs(As,{children:[j.jsx(Ls,{children:j.jsx("h3",{children:"PoE 2 Corrupted Gems"})}),j.jsxs(Bs,{children:[j.jsx(Ds,{children:j.jsx("img",{src:"/poe2corruptedgems.webp",alt:"PoE 2 Corrupted Gems"})}),j.jsxs(Ps,{children:[j.jsx(Os,{children:"Corrupted Variants"}),j.jsx(Os,{children:"Fast Delivery"}),j.jsx(Os,{children:"Best Price"})]})]}),j.jsxs(Ss,{children:[j.jsxs(Es,{children:["3",j.jsx("span",{children:"49"}),"€"]}),j.jsx(zs,{children:"Order now"})]})]},"gem3")];return j.jsxs(js,{children:[j.jsx(bs,{isOpen:r,onToggle:()=>{t(!r)}}),j.jsxs(ws,{$sidebarOpen:r,children:[j.jsx(Cs,{ref:e=>{e&&(n.current[0]=e)},className:"animated-section-marker",children:j.jsxs(ks,{children:[j.jsx(vs,{children:"Hot Offers"}),j.jsx(qs,{cards:b,idx:l,setIdx:d,visibleCount:3})]})}),j.jsx(Cs,{ref:e=>{e&&(n.current[1]=e)},className:"animated-section-marker",children:j.jsxs(ks,{children:[j.jsx(vs,{children:"Popular This Week"}),j.jsx(qs,{cards:w,idx:c,setIdx:h,visibleCount:3})]})}),j.jsx(Cs,{ref:e=>{e&&(n.current[2]=e)},className:"animated-section-marker",children:j.jsxs(ks,{children:[j.jsx(vs,{children:"Currency"}),j.jsx(qs,{cards:v,idx:x,setIdx:p,visibleCount:3})]})}),j.jsx(Cs,{ref:e=>{e&&(n.current[3]=e)},className:"animated-section-marker",children:j.jsxs(ks,{children:[j.jsx(vs,{children:"Leveling"}),j.jsx(qs,{cards:y,idx:m,setIdx:g,visibleCount:3})]})}),j.jsx(Cs,{ref:e=>{e&&(n.current[4]=e)},className:"animated-section-marker",children:j.jsxs(ks,{children:[j.jsx(vs,{children:"Gems"}),j.jsx(qs,{cards:k,idx:u,setIdx:f,visibleCount:3})]})}),j.jsxs(Cs,{ref:e=>{e&&(n.current[5]=e)},className:"animated-section-marker",children:[j.jsxs(Rs,{children:[j.jsxs(Ms,{children:[j.jsx("h3",{children:"Didn't find what you need? Create a custom order"}),j.jsx("p",{children:"Contact us and a PRO player will help you out. We'll find the best deal or create a personalized order for you at a lower price."})]}),j.jsx(zs,{children:"Create custom order"})]}),j.jsxs($s,{children:[j.jsx(vs,{children:"How it works"}),j.jsxs(Vs,{children:[j.jsxs(Ts,{children:[j.jsx(Ys,{children:"1"}),j.jsx(Us,{children:"Choose a service and discuss details"})]}),j.jsxs(Ts,{children:[j.jsx(Ys,{children:"2"}),j.jsx(Us,{children:"Track your order status in real-time"})]}),j.jsxs(Ts,{children:[j.jsx(Ys,{children:"3"}),j.jsx(Us,{children:"Get matched with a top PRO player instantly"})]}),j.jsxs(Ts,{children:[j.jsx(Ys,{children:"4"}),j.jsx(Us,{children:"Enjoy your rewards!"})]})]})]})]}),j.jsx(Cs,{ref:e=>{e&&(n.current[6]=e)},className:"animated-section-marker",children:j.jsxs(Ns,{children:[j.jsx(Gs,{children:"With GGTips you get"}),j.jsx(Fs,{children:j.jsxs(Hs,{children:[j.jsxs(_s,{children:[j.jsx(Is,{children:j.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",children:j.jsx("path",{d:"M12 2a10 10 0 0 1 10 10 10 10 0 0 1-10 10A10 10 0 0 1 2 12 10 10 0 0 1 12 2m0 2a8 8 0 0 0-8 8 8 8 0 0 0 8 8 8 8 0 0 0 8-8 8 8 0 0 0-8-8m0 3a1 1 0 0 1 1 1v4h2v2h-4V8a1 1 0 0 1 1-1"})})}),j.jsx(Ws,{children:j.jsx(Xs,{children:"Connect with our friendly managers and PRO players"})})]}),j.jsxs(_s,{children:[j.jsx(Is,{children:j.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",children:j.jsx("path",{d:"M20.2,2H19.5H18C17.1,2 16,3 16,4H8C8,3 6.9,2 6,2H4.5H3.8H2V11C2,12 3,13 4,13H6.2C6.6,15 7.9,16.7 11,17V19.1C8.8,19.3 8,20.4 8,21.7V22H16V21.7C16,20.4 15.2,19.3 13,19.1V17C16.1,16.7 17.4,15 17.8,13H20C21,13 22,12 22,11V2H20.2M4,11V4H6V6V11C5.1,11 4.3,11 4,11M20,11C19.7,11 18.9,11 18,11V6V4H20V11Z"})})}),j.jsx(Ws,{children:j.jsx(Xs,{children:"Benefit from 24/7 support for all your gaming needs"})})]}),j.jsxs(_s,{children:[j.jsx(Is,{children:j.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",children:j.jsx("path",{d:"M12,3C7.58,3 4,4.79 4,7C4,9.21 7.58,11 12,11C16.42,11 20,9.21 20,7C20,4.79 16.42,3 12,3M4,9V12C4,14.21 7.58,16 12,16C16.42,16 20,14.21 20,12V9C20,11.21 16.42,13 12,13C7.58,13 4,11.21 4,9M4,14V17C4,19.21 7.58,21 12,21C16.42,21 20,19.21 20,17V14C20,16.21 16.42,18 12,18C7.58,18 4,16.21 4,14Z"})})}),j.jsx(Ws,{children:j.jsx(Xs,{children:"Trust in our secure service—your data's safety is our top priority"})})]}),j.jsxs(_s,{children:[j.jsx(Is,{children:j.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",children:j.jsx("path",{d:"M15.96 10.29l-2.75 3.54-1.96-2.36L8.5 15h11l-3.54-4.71M3 5H1v16c0 1.1.9 2 2 2h16v-2H3V5m18-4H7c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2m0 16H7V3h14v14"})})}),j.jsx(Ws,{children:j.jsx(Xs,{children:"Enjoy peace of mind with our instant money-back guarantee"})})]}),j.jsxs(_s,{children:[j.jsx(Is,{children:j.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",children:j.jsx("path",{d:"M13,2.03V2.05L13,4.05C17.39,4.59 20.5,8.58 19.96,12.97C19.5,16.61 16.64,19.5 13,19.93V21.93C18.5,21.38 22.5,16.5 21.95,11C21.5,6.25 17.73,2.5 13,2.03M11,2.06C9.05,2.25 7.19,3 5.67,4.26L7.1,5.74C8.22,4.84 9.57,4.26 11,4.06V2.06M4.26,5.67C3,7.19 2.25,9.04 2.05,11H4.05C4.24,9.58 4.8,8.23 5.69,7.1L4.26,5.67M2.06,13C2.26,14.96 3.03,16.81 4.27,18.33L5.69,16.9C4.81,15.77 4.24,14.42 4.06,13H2.06M7.1,18.37L5.67,19.74C7.18,21 9.04,21.79 11,22V20C9.58,19.82 8.23,19.25 7.1,18.37M16.82,15.19L12.71,11.08C13.12,10.04 12.89,8.82 12.03,7.97C11.13,7.06 9.78,6.88 8.69,7.38L10.63,9.32L9.28,10.68L7.29,8.73C6.75,9.82 7,11.17 7.88,12.08C8.74,12.94 9.96,13.16 11,12.76L15.11,16.86C15.29,17.05 15.56,17.05 15.74,16.86L16.78,15.83C17,15.65 17,15.33 16.82,15.19Z"})})}),j.jsx(Ws,{children:j.jsx(Xs,{children:"Play with one of the best PROs out there"})})]}),j.jsxs(_s,{children:[j.jsx(Is,{children:j.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",children:j.jsx("path",{d:"M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2M12 20A8 8 0 1 1 20 12A8 8 0 0 1 12 20M16.2 16.2L11 13V7H12.5V12.2L17 14.9Z"})})}),j.jsx(Ws,{children:j.jsx(Xs,{children:"Take your gaming experience to new heights!"})})]})]})})]})})]})]})};var Qs=e.forwardRef((function(r,t){return e.createElement(er,_e({iconAttrs:{fill:"currentColor",xmlns:"http://www.w3.org/2000/svg"},iconVerticalAlign:"middle",iconViewBox:"0 0 24 24"},r,{ref:t}),e.createElement("path",{d:"M12 9c-1.626 0-3 1.374-3 3s1.374 3 3 3 3-1.374 3-3-1.374-3-3-3z"}),e.createElement("path",{d:"M20 5h-2.586l-2.707-2.707A.996.996 0 0 0 14 2h-4a.996.996 0 0 0-.707.293L6.586 5H4c-1.103 0-2 .897-2 2v11c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V7c0-1.103-.897-2-2-2zm-8 12c-2.71 0-5-2.29-5-5s2.29-5 5-5 5 2.29 5 5-2.29 5-5 5z"}))}));Qs.displayName="Camera";var Ks=e.forwardRef((function(r,t){return e.createElement(er,_e({iconAttrs:{fill:"currentColor",xmlns:"http://www.w3.org/2000/svg"},iconVerticalAlign:"middle",iconViewBox:"0 0 24 24"},r,{ref:t}),e.createElement("path",{d:"M20 4H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm-7.5 12a2.5 2.5 0 1 1 0-5 2.47 2.47 0 0 1 1.5.512c-.604.456-1 1.173-1 1.988s.396 1.532 1 1.988a2.47 2.47 0 0 1-1.5.512zm4 0a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"}))}));Ks.displayName="CreditCardAlt";var ea=e.forwardRef((function(r,t){return e.createElement(er,_e({iconAttrs:{fill:"currentColor",xmlns:"http://www.w3.org/2000/svg"},iconVerticalAlign:"middle",iconViewBox:"0 0 24 24"},r,{ref:t}),e.createElement("path",{d:"M20 12c0-1.103-.897-2-2-2h-1V7c0-2.757-2.243-5-5-5S7 4.243 7 7v3H6c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-8zM9 7c0-1.654 1.346-3 3-3s3 1.346 3 3v3H9V7z"}))}));ea.displayName="LockAlt";var ra=e.forwardRef((function(r,t){return e.createElement(er,_e({iconAttrs:{fill:"currentColor",xmlns:"http://www.w3.org/2000/svg"},iconVerticalAlign:"middle",iconViewBox:"0 0 24 24"},r,{ref:t}),e.createElement("path",{d:"M18 2H6a1 1 0 0 0-1 1v9l5-4v3h6v2h-6v3l-5-4v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1z"}))}));ra.displayName="LogOut";var ta=e.forwardRef((function(r,t){return e.createElement(er,_e({iconAttrs:{fill:"currentColor",xmlns:"http://www.w3.org/2000/svg"},iconVerticalAlign:"middle",iconViewBox:"0 0 24 24"},r,{ref:t}),e.createElement("path",{d:"M5 22h14a2 2 0 0 0 2-2V9a1 1 0 0 0-1-1h-3v-.777c0-2.609-1.903-4.945-4.5-5.198A5.005 5.005 0 0 0 7 7v1H4a1 1 0 0 0-1 1v11a2 2 0 0 0 2 2zm12-12v2h-2v-2h2zM9 7c0-1.654 1.346-3 3-3s3 1.346 3 3v1H9V7zm-2 3h2v2H7v-2z"}))}));ta.displayName="ShoppingBag";var na=e.forwardRef((function(r,t){return e.createElement(er,_e({iconAttrs:{fill:"currentColor",xmlns:"http://www.w3.org/2000/svg"},iconVerticalAlign:"middle",iconViewBox:"0 0 24 24"},r,{ref:t}),e.createElement("path",{d:"M15 11h7v2h-7zm1 4h6v2h-6zm-2-8h8v2h-8zM4 19h10v-1c0-2.757-2.243-5-5-5H7c-2.757 0-5 2.243-5 5v1h2zm4-7c1.995 0 3.5-1.505 3.5-3.5S9.995 5 8 5 4.5 6.505 4.5 8.5 6.005 12 8 12z"}))}));na.displayName="UserDetail";var ia=e.forwardRef((function(r,t){return e.createElement(er,_e({iconAttrs:{fill:"currentColor",xmlns:"http://www.w3.org/2000/svg"},iconVerticalAlign:"middle",iconViewBox:"0 0 24 24"},r,{ref:t}),e.createElement("path",{d:"M20 7V5c0-1.103-.897-2-2-2H5C3.346 3 2 4.346 2 6v12c0 2.201 1.794 3 3 3h15c1.103 0 2-.897 2-2V9c0-1.103-.897-2-2-2zm-2 9h-2v-4h2v4zM5 7a1.001 1.001 0 0 1 0-2h13v2H5z"}))}));ia.displayName="Wallet";const sa=i.div`
  max-width: 1200px;
  margin: 4rem auto;
  padding: 3rem;
  background: rgba(20, 10, 35, 0.85);
  border-radius: 16px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(157, 78, 221, 0.25);
  transition: all 0.3s ease-in-out;

  @media (max-width: 992px) {
    margin: 2rem auto;
    padding: 2rem;
  }

  @media (max-width: 768px) {
    margin: 1rem;
    padding: 1.5rem;
    border-radius: 12px;
  }
`,aa=i.h1`
  color: #e0e0e0;
  margin-bottom: 2.5rem;
  font-family: 'Rajdhani', sans-serif;
  font-size: 2.5rem;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  text-shadow: 0 3px 6px rgba(0, 0, 0, 0.35);
  text-align: center;
`,oa=i.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2.5rem;
  gap: 1.5rem;
  border-bottom: 1px solid rgba(157, 78, 221, 0.2);
  padding-bottom: 1rem;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 0.5rem;
    margin-bottom: 2rem;
  }
`,la=i.nav`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`,da=i.button`
  padding: 0.75rem 1.5rem;
  background: ${({isActive:e})=>e?"linear-gradient(135deg, #9d4edd, #7b2cbf)":"rgba(255, 255, 255, 0.05)"};
  color: ${({isActive:e})=>e?"white":"#c0c0c0"};
  border: 1px solid ${({isActive:e})=>e?"#9d4edd":"rgba(157, 78, 221, 0.2)"};
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    width: 20px;
    height: 20px;
  }

  &:hover {
    background: ${({isActive:e})=>e?"linear-gradient(135deg, #ad5eff, #8c3ddf)":"rgba(255, 255, 255, 0.1)"};
    border-color: #9d4edd;
    color: white;
  }
`,ca=i.div`
  // This will hold the content of the active tab
  // No specific grid here, layout will be managed by child components or a simpler structure
`,ha=i.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;
  margin-bottom: 2rem;

  @media (min-width: 992px) {
    grid-template-columns: 350px 1fr;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`,xa=i.aside`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`,pa=i.main`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`,ma=i.section`
  padding: 2rem;
  background: rgba(255, 255, 255, 0.07);
  border-radius: 10px;
  border: 1px solid rgba(157, 78, 221, 0.2);
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(157, 78, 221, 0.4);
    transform: translateY(-3px) translateX(3px);
  }
`,ga=i.h2`
  color: #c593f5;
  margin-bottom: 1.5rem;
  font-size: 1.6rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 600;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid rgba(157, 78, 221, 0.2);

  svg {
    width: 28px;
    height: 28px;
    color: #c593f5;
  }
`,ua=i.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
`,fa=i.div`
  display: flex;
  flex-direction: column;
`,ba=i.label`
  font-weight: 500;
  color: #bda0e0;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.8px;
`,ja=i.div`
  color: #f0f0f0;
  font-size: 1.1rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(157, 78, 221, 0.15);
  word-break: break-word;

  &:last-child {
    border-bottom: none;
  }
`,wa=i.div`
  position: relative;
  width: 220px;
  height: 220px;
  border-radius: 50%;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.08);
  border: 3px solid rgba(157, 78, 221, 0.4);
  margin: 0 auto 1.5rem auto;
  flex-shrink: 0;
  box-shadow: 0 4px 15px rgba(157, 78, 221, 0.2);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`,va=i.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`,ya=i(tr)`
  width: 100%;
  height: 100%;
  color: rgba(255, 255, 255, 0.5);
`,ka=i.label`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;

  svg {
    width: 20px;
    height: 20px;
    color: white;
  }

  &:hover {
    background: rgba(157, 78, 221, 0.7);
  }
`,Ca=i.input`
  display: none;
`,Sa=i.button`
  padding: 0.9rem 1.8rem;
  background: linear-gradient(135deg, #9d4edd, #7b2cbf);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  width: 100%;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  
  svg {
    width: 20px;
    height: 20px;
  }
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(157, 78, 221, 0.45);
    background: linear-gradient(135deg, #ad5eff, #8c3ddf);
  }
  
  &:active {
    transform: translateY(-1px);
    box-shadow: 0 3px 10px rgba(157, 78, 221, 0.3);
  }

  &.secondary {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(157, 78, 221, 0.3);
    color: #e0e0e0;

    &:hover {
      background: rgba(255, 255, 255, 0.15);
      border-color: #9d4edd;
      box-shadow: 0 4px 15px rgba(157, 78, 221, 0.25);
    }
  }
`,Ea=i.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.7rem 1rem;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  margin-bottom: 1.1rem;
  border: 1px solid rgba(157, 78, 221, 0.2);
  min-height: 48px;
`,za=i.div`
  font-size: 1.25rem;
  color: #a063f0;
  font-weight: 700;
`,Pa=i.div`
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`,Oa=i.div`
  padding: 1.25rem;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  border: 1px solid rgba(157, 78, 221, 0.2);
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: translateX(4px);
    border-left: 4px solid #9d4edd;
  }
`,La=i.div`
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`,Da=i.input`
  width: 100%;
  padding: 0.9rem 1rem;
  margin-bottom: 0;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(157, 78, 221, 0.25);
  border-radius: 8px;
  font-size: 1rem;
  color: #e0e0e0;
  transition: all 0.3s ease;
  box-shadow: inset 0 1px 3px rgba(0,0,0,0.1);

  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }

  &:focus {
    outline: none;
    border-color: #9d4edd;
    box-shadow: 0 0 0 3px rgba(157, 78, 221, 0.25), inset 0 1px 3px rgba(0,0,0,0.1);
    background: rgba(255, 255, 255, 0.1);
  }
`,Aa=i.div`
  color: #ff6b6b;
  margin-bottom: 1rem;
  text-align: center;
  padding: 0.6rem;
  background: rgba(255, 77, 77, 0.1);
  border-radius: 8px;
  border: 1px solid rgba(255, 77, 77, 0.3);
`,Ba=i(Aa)`
  color: #4caf50;
  background: rgba(76, 175, 80, 0.08);
  border: 1px solid rgba(76, 175, 80, 0.3);
`,Ra=i(ma)`
  max-width: 500px;
  margin: 0 auto;
`,Ma=i.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(20, 10, 35, 0.85);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.2s;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`,$a=i.div`
  background: rgba(40, 20, 60, 0.98);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.45);
  padding: 2.5rem 2rem 2rem 2rem;
  width: 90vw;
  max-width: 1000px;
  color: #fff;
  position: relative;
  display: flex;
  flex-direction: row;
  gap: 2.5rem;
  overflow: visible;
  max-height: none;
  @media (max-width: 800px) {
    flex-direction: column;
    gap: 1.2rem;
    padding: 1.2rem 0.5rem 1.2rem 0.5rem;
    max-width: 99vw;
    width: 99vw;
  }
`,Va=i.button`
  position: absolute;
  top: 18px;
  right: 18px;
  background: none;
  border: none;
  color: #c593f5;
  font-size: 2rem;
  cursor: pointer;
  z-index: 1;
  transition: color 0.2s;
  &:hover { color: #fff; }
`,Ta=i.h3`
  color: #c593f5;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.7rem;
`,Ya=i.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.1rem;
  gap: 1.5rem;
`,Ua=i.div`
  color: #bda0e0;
  font-size: 1rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.7px;
`,Na=i.div`
  color: #fff;
  font-size: 1.1rem;
  font-weight: 600;
  word-break: break-word;
`,Ga=i.div`
  flex: 1 1 320px;
  min-width: 260px;
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
`,Fa=i.div`
  flex: 1 1 320px;
  min-width: 260px;
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
`,Ha=i($a)`
  max-width: 400px;
  width: 95vw;
  padding: 1.5rem 1.2rem 1.2rem 1.2rem;
  gap: 1.2rem;
`,Ia=()=>{const{user:r,logout:t,setUser:n}=ar(),i=pe(),[s,a]=e.useState(!1),[o,l]=e.useState((null==r?void 0:r.username)||""),[d,c]=e.useState((null==r?void 0:r.email)||""),[h,x]=e.useState(""),[p,m]=e.useState(""),[g,u]=e.useState(""),[f,b]=e.useState(""),[w,v]=e.useState(""),[y,k]=e.useState("info"),[C,S]=e.useState(null),[E,z]=e.useState(""),[P,O]=e.useState({}),[L,D]=e.useState(null),A=async()=>{const e=await fetch("/backend/api/profile.php",{credentials:"include"}),r=await e.json();r.success&&r.user&&(n(r.user),localStorage.setItem("user",JSON.stringify(r.user)))};e.useEffect((()=>{A()}),[]);if(!r)return j.jsx("div",{children:"Loading user profile..."});const B=[{id:"ORD-1001",product:"GTA V Boost",amount:50,date:"2024-03-15",status:"Completed",proofs:["https://via.placeholder.com/320x180.png?text=Proof+1","https://via.placeholder.com/320x180.png?text=Proof+2"],paymentMethod:"Card",chat:[{author:"manager",text:"Здравствуйте! Ваш заказ принят в работу.",time:"09:00"},{author:"user",text:"Спасибо, жду!",time:"09:01"}]},{id:"ORD-1002",product:"Path of Exile 2 Leveling",amount:75,date:"2024-03-10",status:"In Progress",proofs:[],paymentMethod:"Crypto",chat:[]}],R=[{id:"TOPUP-2001",amount:500,date:"2024-04-01",time:"14:23",method:"Card"},{id:"TOPUP-2002",amount:250,date:"2024-03-20",time:"10:05",method:"Crypto"}];return j.jsxs(sa,{children:[j.jsxs(aa,{children:["Hello, ",r.username,"!"]}),j.jsx(oa,{children:j.jsxs(la,{children:[j.jsxs(da,{isActive:"info"===y,onClick:()=>k("info"),children:[j.jsx(na,{})," Info"]}),j.jsxs(da,{isActive:"balance"===y,onClick:()=>k("balance"),children:[j.jsx(Ks,{})," Balance"]}),j.jsxs(da,{isActive:"history"===y,onClick:()=>k("history"),children:[j.jsx(ta,{})," History"]}),j.jsxs(da,{isActive:"password"===y,onClick:()=>k("password"),children:[j.jsx(ea,{})," Password"]}),j.jsxs(da,{isActive:!1,onClick:()=>{t(),i("/"),setTimeout((()=>{window.scrollTo({top:0,left:0,behavior:"smooth"})}),100)},style:{marginLeft:"1.5rem"},children:[j.jsx(ra,{})," Log Out"]})]})}),j.jsxs(ca,{children:["info"===y&&j.jsxs(ha,{children:[j.jsxs(xa,{children:[j.jsxs(wa,{children:[r.avatar_base64?j.jsx(va,{src:r.avatar_base64,alt:"Profile Avatar"}):j.jsx(ya,{}),j.jsxs(ka,{htmlFor:"avatar-upload",children:[j.jsx(Qs,{})," Change"]}),j.jsx(Ca,{id:"avatar-upload",type:"file",accept:"image/*",onChange:async e=>{var r;const t=null==(r=e.target.files)?void 0:r[0];if(t){const e=new FormData;e.append("avatar",t),await fetch("/backend/api/upload_avatar.php",{method:"POST",body:e,credentials:"include"}),await A()}}})]}),j.jsxs(ma,{children:[j.jsxs(ga,{children:[j.jsx(na,{}),"Personal Information"]}),s?j.jsxs(j.Fragment,{children:[j.jsxs(La,{children:[j.jsx(ba,{children:"Username"}),j.jsx(Da,{type:"text",value:o,onChange:e=>l(e.target.value)})]}),j.jsxs(La,{children:[j.jsx(ba,{children:"Email"}),j.jsx(Da,{type:"email",value:d,onChange:e=>c(e.target.value)})]}),j.jsx(Sa,{onClick:()=>{if(!r)return;const e={...r,username:o,email:d};n(e),localStorage.setItem("user",JSON.stringify(e)),a(!1),alert("Profile saved successfully!")},children:"Save Changes"}),j.jsx(Sa,{onClick:()=>a(!1),className:"secondary",style:{marginTop:"1rem"},children:"Cancel"})]}):j.jsxs(ua,{children:[j.jsxs(fa,{children:[j.jsx(ba,{children:"Username"}),j.jsx(ja,{children:r.username})]}),j.jsxs(fa,{children:[j.jsx(ba,{children:"Email"}),j.jsx(ja,{children:r.email})]}),j.jsx(fa,{style:{gridColumn:"1 / -1"},children:j.jsx(Sa,{onClick:()=>a(!0),style:{marginTop:"1rem"},children:"Edit Profile"})})]})]})]}),j.jsx(pa,{children:j.jsxs(ma,{children:[j.jsx(ga,{children:"Account Statistics"}),j.jsxs(ua,{children:[j.jsxs(fa,{children:[j.jsx(ba,{children:"Joined"}),j.jsx(ja,{children:new Date(Date.now()).toLocaleDateString()})]}),j.jsxs(fa,{children:[j.jsx(ba,{children:"Purchases Made"}),j.jsx(ja,{children:B.length})]})]})]})})]}),"balance"===y&&j.jsxs(j.Fragment,{children:[j.jsxs(ma,{children:[j.jsxs(ga,{children:[j.jsx(ia,{}),"Balance"]}),j.jsxs(Ea,{children:[j.jsx(ba,{style:{textTransform:"none",fontSize:"1.2rem",color:"#e0e0e0"},children:"Current Balance"}),j.jsxs(za,{children:["$",1250..toFixed(2)]})]}),j.jsx(Sa,{style:{maxWidth:"250px",margin:"1rem auto 0"},children:"Add Funds"}),j.jsxs("div",{style:{marginTop:"2.5rem"},children:[j.jsx(ga,{style:{fontSize:"1.15rem"},children:"Top-up History"}),R.length>0?j.jsx(Pa,{children:R.map((e=>j.jsx(Oa,{onClick:()=>D(e),style:{cursor:"pointer"},children:j.jsxs(ua,{children:[j.jsxs(fa,{children:[j.jsx(ba,{children:"Date"}),j.jsxs(ja,{style:{borderBottom:"none"},children:[e.date," ",e.time]})]}),j.jsxs(fa,{children:[j.jsx(ba,{children:"Amount"}),j.jsxs(ja,{style:{borderBottom:"none",color:"#4caf50"},children:["+$",e.amount.toFixed(2)]})]}),j.jsxs(fa,{children:[j.jsx(ba,{children:"Method"}),j.jsx(ja,{style:{borderBottom:"none"},children:e.method})]})]})},e.id)))}):j.jsx(ja,{children:"No top-ups yet."})]})]}),L&&j.jsx(Ma,{onClick:()=>D(null),children:j.jsxs(Ha,{onClick:e=>e.stopPropagation(),children:[j.jsx(Va,{onClick:()=>D(null),title:"Close",children:"×"}),j.jsxs(Ga,{children:[j.jsxs(Ta,{children:[j.jsx(ia,{style:{width:22,height:22}}),"Top-up Details"]}),j.jsxs(Ya,{children:[j.jsx(Ua,{children:"Top-up ID"}),j.jsx(Na,{children:L.id})]}),j.jsxs(Ya,{children:[j.jsx(Ua,{children:"Date"}),j.jsxs(Na,{children:[L.date," ",L.time]})]}),j.jsxs(Ya,{children:[j.jsx(Ua,{children:"Amount"}),j.jsxs(Na,{style:{color:"#4caf50"},children:["+$",L.amount.toFixed(2)]})]}),j.jsxs(Ya,{children:[j.jsx(Ua,{children:"Method"}),j.jsx(Na,{children:L.method})]})]})]})})]}),"history"===y&&j.jsx(j.Fragment,{children:j.jsxs(ma,{children:[j.jsxs(ga,{children:[j.jsx(ta,{}),"Purchase History"]}),B.length>0?j.jsx(Pa,{children:B.map((e=>j.jsx(Oa,{onClick:()=>S(e),style:{cursor:"pointer"},children:j.jsxs(ua,{children:[j.jsxs(fa,{style:{flexGrow:2},children:[j.jsx(ba,{children:"Product"}),j.jsx(ja,{style:{borderBottom:"none"},children:e.product})]}),j.jsxs(fa,{children:[j.jsx(ba,{children:"Amount"}),j.jsxs(ja,{style:{borderBottom:"none"},children:["$",e.amount.toFixed(2)]})]}),j.jsxs(fa,{children:[j.jsx(ba,{children:"Date"}),j.jsx(ja,{style:{borderBottom:"none"},children:e.date})]}),j.jsxs(fa,{children:[j.jsx(ba,{children:"Status"}),j.jsx(ja,{style:{borderBottom:"none",color:"Completed"===e.status?"#4caf50":"#f9a825"},children:e.status})]})]})},e.id)))}):j.jsx(ja,{children:"No purchase history yet."})]})}),"password"===y&&j.jsx(j.Fragment,{children:j.jsxs(Ra,{children:[j.jsxs(ga,{children:[j.jsx(ea,{}),"Change Password"]}),j.jsxs("form",{onSubmit:e=>{e.preventDefault(),b(""),v(""),h&&p&&g?p===g?p.length<6?b("Password must be at least 6 characters."):(console.log("Changing password (mock):",{currentPassword:h,newPassword:p}),setTimeout((()=>{v("Password changed successfully!"),x(""),m(""),u("")}),800)):b("New passwords do not match."):b("Please fill in all fields.")},autoComplete:"off",children:[f&&j.jsx(Aa,{children:f}),w&&j.jsx(Ba,{children:w}),j.jsxs(La,{children:[j.jsx(ba,{htmlFor:"current-password",children:"Current Password"}),j.jsx(Da,{id:"current-password",type:"password",placeholder:"Enter current password",value:h,onChange:e=>x(e.target.value),autoComplete:"current-password"})]}),j.jsxs(La,{children:[j.jsx(ba,{htmlFor:"new-password",children:"New Password"}),j.jsx(Da,{id:"new-password",type:"password",placeholder:"Enter new password (min. 6 characters)",value:p,onChange:e=>m(e.target.value),autoComplete:"new-password"})]}),j.jsxs(La,{children:[j.jsx(ba,{htmlFor:"confirm-new-password",children:"Confirm New Password"}),j.jsx(Da,{id:"confirm-new-password",type:"password",placeholder:"Confirm new password",value:g,onChange:e=>u(e.target.value),autoComplete:"new-password"})]}),j.jsx(Sa,{type:"submit",children:"Change Password"})]})]})})]}),C&&j.jsx(Ma,{onClick:()=>S(null),children:j.jsxs($a,{onClick:e=>e.stopPropagation(),children:[j.jsx(Va,{onClick:()=>S(null),title:"Close",children:"×"}),j.jsxs(Ga,{children:[j.jsxs(Ta,{children:[j.jsx(ta,{style:{width:28,height:28}}),"Order Details"]}),j.jsxs(Ya,{children:[j.jsx(Ua,{children:"Product"}),j.jsx(Na,{children:C.product})]}),j.jsxs(Ya,{children:[j.jsx(Ua,{children:"Amount"}),j.jsxs(Na,{children:["$",C.amount.toFixed(2)]})]}),j.jsxs(Ya,{children:[j.jsx(Ua,{children:"Date"}),j.jsx(Na,{children:C.date})]}),j.jsxs(Ya,{children:[j.jsx(Ua,{children:"Status"}),j.jsx(Na,{style:{color:"Completed"===C.status?"#4caf50":"#f9a825"},children:C.status})]}),j.jsxs(Ya,{children:[j.jsx(Ua,{children:"Order ID"}),j.jsx(Na,{children:C.id||"Generating..."})]}),j.jsxs(Ya,{children:[j.jsx(Ua,{children:"Payment Method"}),j.jsx(Na,{children:C.paymentMethod||"Not specified"})]})]}),j.jsxs(Fa,{children:[j.jsxs(Ya,{style:{flexDirection:"column",alignItems:"flex-start"},children:[j.jsx(Ua,{children:"Delivery Proofs"}),j.jsx("div",{style:{display:"flex",gap:"0.7rem",flexWrap:"wrap",marginTop:"0.5rem",width:"100%"},children:C.proofs&&C.proofs.length>0?C.proofs.map(((e,r)=>e.endsWith(".mp4")?j.jsx("video",{src:e,controls:!0,style:{width:window.innerWidth<600?120:180,borderRadius:8,background:"#222",maxWidth:"100%"}},r):j.jsx("img",{src:e,alt:`proof-${r}`,style:{width:window.innerWidth<600?120:180,borderRadius:8,background:"#222",maxWidth:"100%"}},r))):j.jsx("div",{style:{color:"#bda0e0"},children:"No delivery proofs yet"})})]}),j.jsxs(Ya,{style:{flexDirection:"column",alignItems:"flex-start"},children:[j.jsx(Ua,{children:"Chat with Manager"}),j.jsx("div",{style:{width:"100%",maxWidth:400,background:"rgba(255,255,255,0.04)",borderRadius:8,padding:12,marginTop:8,minHeight:120,maxHeight:220,overflowY:"auto"},children:(P[C.id]||C.chat||[]).map(((e,r)=>j.jsxs("div",{style:{marginBottom:8,textAlign:"user"===e.author?"right":"left"},children:[j.jsxs("span",{style:{color:"user"===e.author?"#9d4edd":"#ffd700",fontWeight:600},children:["user"===e.author?"You":"Manager",": "]}),j.jsx("span",{style:{color:"#fff"},children:e.text}),j.jsx("span",{style:{color:"#bda0e0",fontSize:12,marginLeft:6},children:e.time})]},r)))}),j.jsxs("form",{style:{display:"flex",gap:8,marginTop:8,width:"100%"},onSubmit:e=>{e.preventDefault(),E.trim()&&(O((e=>({...e,[C.id]:[...e[C.id]||C.chat||[],{author:"user",text:E,time:(new Date).toLocaleTimeString().slice(0,5)}]}))),z(""))},children:[j.jsx(Da,{value:E,onChange:e=>z(e.target.value),placeholder:"Message...",style:{flex:1,minWidth:0}}),j.jsx(Sa,{type:"submit",style:{width:"auto",minWidth:80},children:"Send"})]})]})]})]})})]})},Wa=i.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`,Xa=i.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${({theme:e})=>e.colors.background};
  color: ${({theme:e})=>e.colors.text};
  position: relative;
  overflow-x: hidden;
`,_a=i.main`
  flex: 1;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0;
  position: relative;
  z-index: 1;
  margin-top: 121px; /* Отступ для десктопа (81px хедер + 40px баннер) */

  @media (max-width: 768px) {
    margin-top: 106px; /* Отступ для мобильных (71px хедер + 35px баннер) */
    /* Если баннер скрывается, используйте 71px */
  }
`,Ja=()=>j.jsxs(j.Fragment,{children:[j.jsx(Nt,{}),j.jsx(Jt,{}),j.jsx(sn,{}),j.jsx(Bn,{})]}),qa=({children:e})=>{const{isAuthenticated:r,isAuthLoading:t}=ar();return t?null:r?j.jsx(j.Fragment,{children:e}):j.jsx(Ce,{to:"/login"})},Za=()=>(e.useEffect((()=>{const e=document.querySelectorAll(".section"),r=new IntersectionObserver((e=>{e.forEach((e=>{e.isIntersecting?e.target.classList.add("visible"):e.target.classList.remove("visible")}))}),{threshold:.1});return e.forEach((e=>{r.observe(e)})),()=>r.disconnect()}),[]),j.jsx(sr,{children:j.jsxs(Wa,{children:[j.jsx(Ue,{}),j.jsx(Ae,{children:j.jsx(We,{children:j.jsxs(Xa,{children:[j.jsx(ft,{}),j.jsx(Et,{}),j.jsx(_a,{children:j.jsxs(ze,{children:[j.jsx(Se,{path:"/login",element:j.jsx(ur,{})}),j.jsx(Se,{path:"/register",element:j.jsx(Cr,{})}),j.jsx(Se,{path:"/profile",element:j.jsx(qa,{children:j.jsx(Ia,{})})}),j.jsx(Se,{path:"/",element:j.jsx(Ja,{})}),j.jsx(Se,{path:"/games",element:j.jsx(xi,{})}),j.jsx(Se,{path:"/games/path-of-exile",element:j.jsx(is,{})}),j.jsx(Se,{path:"/games/gta5",element:j.jsx(Zs,{})})]})}),j.jsx(Gn,{}),j.jsx(ti,{})]})})})]})})),Qa={colors:{primary:"#9d4edd",background:"#1a0f2e",text:"#ffffff",accent:"#4ECDC4"},fonts:{body:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif'},breakpoints:{mobile:"320px",tablet:"768px",desktop:"1024px"}},Ka=document.getElementById("root");Ka&&w.createRoot(Ka).render(j.jsx(s.StrictMode,{children:j.jsx(o,{theme:Qa,children:j.jsx(Za,{})})}));
