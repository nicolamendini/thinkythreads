(this.webpackJsonpthinkythreads=this.webpackJsonpthinkythreads||[]).push([[8],{295:function(e,t,o){"use strict";o.r(t);var n=o(5),r=o(0),c=o(147),s=o.n(c),a=(o(235),o(236)),i=o.n(a),l=(o(237),o(280)),d=o(141),b=o(143),u=o(291),j=o(140),h=o(7),f=function(e){var t=e.selectedNote,o=e.setBackColor;return Object(h.jsx)(j.a,{trigger:Object(h.jsx)("div",{children:Object(h.jsx)(d.a,{className:"tools-btn",size:"1.6em"})}),nested:!0,modal:!0,position:"right",children:Object(h.jsx)("div",{className:"picker",children:Object(h.jsx)(u.a,{onChange:function(e){return function(e,t,o){switch(t.colorPreview=e.hex,e.hex){case"#b80000":t.color="#EB9694";break;case"#db3e00":t.color="#FAD0C3";break;case"#fccb00":t.color="#FEF3BD";break;case"#008b02":t.color="#C1E1C5";break;case"#006b76":t.color="#BEDADC";break;case"#1273de":t.color="#C4DEF6";break;case"#5300eb":t.color="#d4c4fb";break;case"#ededed":t.color="#ffffff"}o(t.color)}(e,t,o)},colors:["#B80000","#DB3E00","#FCCB00","#008B02","#006B76","#1273DE","#5300EB","#ededed"],triangle:"hide"})})})},p=o(142),x=function(e){var t=e.selectedNote,o=e.open,n=e.setOpen,r=e.saveAndExit,c=e.exportThread;return Object(h.jsx)(j.a,{trigger:Object(h.jsx)("div",{children:Object(h.jsx)(p.a,{className:"tools-btn",size:"1.5em",onClick:function(){return n(!0)}})}),nested:!0,modal:!0,open:o,children:Object(h.jsx)("div",{className:"blurrer",onClick:function(){return n(!1)},children:Object(h.jsxs)("div",{className:"modal menu-popup",children:[Object(h.jsx)("button",{className:"popup-btn tools-btn",onClick:function(){return r("get-occurrences")},children:"Show Threads or Collections that contain this Note"}),t.thread.length?Object(h.jsx)("div",{children:Object(h.jsx)("button",{className:"popup-btn tools-btn",onClick:function(){return c()},children:"Print or Export whole Thread"})}):null]})})})},m=o(3),g=function(e){var t=e.setCurrentPage,o=e.selectedNote,c=e.updateNote,s=e.editorState,a=e.deleteNote,i=e.exportThread,u=e.setBackColor,j=Object(r.useState)(o.pinned),p=Object(n.a)(j,2),g=p[0],O=p[1],k=Object(r.useState)(!1),C=Object(n.a)(k,2),N=C[0],v=C[1],w=function(){o.pinned=!o.pinned,O(o.pinned)},B=function(e){return o.text=s,Object(m.i)(o),"empty note kept for its links"!==o.preview||o.thread.length||o.collection.length||o.branches.length||o.attachedImg?(c(o,e),t("notes"),!0):(a(o.id),t("notes"),!1)};return Object(h.jsx)("div",{children:Object(h.jsxs)("div",{className:"page-footer",children:[Object(h.jsx)(b.a,{className:"tools-btn",onClick:function(){return B()},size:"2.5em"}),g?Object(h.jsx)(l.a,{className:"tools-btn",onClick:function(){return w()},size:"1.75em",style:{transform:"rotate(-45deg)"}}):Object(h.jsx)(l.b,{className:"tools-btn",onClick:function(){return w()},size:"1.75em"}),Object(h.jsx)(f,{selectedNote:o,setBackColor:u}),Object(h.jsx)(d.b,{className:"tools-btn",onClick:function(){window.confirm("Are you sure you want to delete the note?")&&(a(o.id),t("notes"))},size:"1.65em"}),Object(h.jsx)(x,{selectedNote:o,open:N,setOpen:v,saveAndExit:B,exportThread:i})]})})},O=o(281),k=o.n(O),C=o(13),N=o(9);window.katex=i.a,c.Quill.register("modules/imageCompressor",k.a);var v={toolbar:["bold","italic",{color:[]},{background:[]},{list:"ordered"},{list:"bullet"},{align:[]},"image","code-block","formula","blockquote"],imageCompressor:{maxWidth:800,maxHeight:800,imageType:"image/jpeg",debug:!1}},w=function(e,t,o,n){o.current&&(!function(e,t){var o=e.ops,n=t.getSelection();if(n){var r=n.index,c=n.length;if(void 0===o[0].retain||!o[1]||!o[1].insert||!o[1].insert||"\n"!==o[1].insert||c>0)return;setTimeout((function(){t.getSelection().index===r&&(console.log("Change selection bad pos"),t.setSelection(t.getSelection().index+1,0))}),30)}}(t,o.current.editor),e.length<C.c?n(e):alert(N.c))};t.default=function(e){var t=e.setCurrentPage,o=e.selectedNote,c=e.updateNote,a=e.deleteNote,i=e.darkMode,l=e.exportThread,d=Object(r.useState)(o.text?o.text:""),b=Object(n.a)(d,2),u=b[0],j=b[1],f=Object(r.useState)(o.color),p=Object(n.a)(f,2),x=p[0],m=p[1],O=Object(r.useRef)(null);return Object(h.jsxs)("div",{className:"container",style:i?"#ffffff"!==x?{backgroundImage:"linear-gradient(35deg, #999999 90%, "+x+" 90%)",color:"white"}:{backgroundColor:"#999999",color:"white"}:{backgroundColor:x},children:[Object(h.jsx)("div",{className:"editor no-scrollbar",id:"editor",children:Object(h.jsx)(s.a,{style:{zoom:1.4},theme:"snow",value:u,onChange:function(e,t){return w(e,t,O,j)},modules:v,placeholder:"Write your next idea here...",ref:O})}),Object(h.jsx)(g,{setCurrentPage:t,selectedNote:o,updateNote:c,editorState:u,deleteNote:a,darkMode:i,exportThread:l,setBackColor:m})]})}}}]);
//# sourceMappingURL=8.1ee51418.chunk.js.map