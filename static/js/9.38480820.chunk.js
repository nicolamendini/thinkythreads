(this.webpackJsonpthinkythreads=this.webpackJsonpthinkythreads||[]).push([[9],{381:function(e,r,t){"use strict";t.r(r);var o=t(1),s=t(336),c=t(344),n=t(373),a=t(334),l=t(335),d=(t(372),t(80)),i=t.n(d),b=t(14),h=t(12),j=t(18),g=t(9),u=function(){return j.c.toasts&&Object(h.b)(b.i)},O=function(){return j.c.toasts&&Object(h.b)(b.e)},f=function(){return j.c.toasts&&Object(h.b)("Synchronising your notes...")},m=function(e){var r=e.threadOrCollectionManage,t=e.threadOrCollection,o=e.setRootsOrBranches,d=e.rootsOrBranches,b=e.setDarkMode,m=e.mergeMode,p=e.setMergeMode,x=e.selectedNote,k=e.setCurrentPage,N=e.notesUpdating,C=e.loadedUser,v=e.synchNotes,w=e.darkMode,S=function(){window.localStorage.setItem("dark-mode",!w),b((function(e){return!e}))};return Object(g.jsxs)("div",{className:"page-footer",style:w?{borderTop:"1px solid #2a2a2a",backgroundColor:"#1b1b1b"}:{borderTop:"#dddddd",background:"linear-gradient(#eeeeee, white)",boxShadow:"0 0 3px #bbbbbb"},children:[w?Object(g.jsx)(a.c,{className:"tools-btn",onClick:function(){return k("settings")},size:"2.5em",style:{transform:"scale(0.75)"}}):Object(g.jsx)(s.l,{className:"tools-btn",onClick:function(){return k("settings")},size:"2.5em"}),t?w?Object(g.jsx)(c.d,{onClick:function(){return r(!t)},size:"2.5em",className:"tools-btn",style:{transform:"rotate(45deg) scale(0.85)"}}):Object(g.jsx)(s.f,{onClick:function(){return r(!t)},size:"2.5em",className:"tools-btn"}):w?Object(g.jsx)(c.b,{onClick:function(){return r(!t)},size:"2.5em",className:"tools-btn",style:{transform:"rotate(45deg) scale(0.85)"}}):Object(g.jsx)(s.a,{onClick:function(){return r(!t)},size:"2.5em",className:"tools-btn"}),w?Object(g.jsx)(l.b,{onClick:function(){return o((function(e){return!e}))},size:"2em",className:"tools-btn",style:!d&&{transform:"scaleY(-1)"}}):Object(g.jsx)(s.h,{onClick:function(){return o((function(e){return j.c.toasts&&Object(h.b)(e?"The Branches Mode is on, now you will see the effectual links between notes":"The Roots Mode is on, now you will see the causal links between notes"),!e}))},size:"2.3em",className:"tools-btn",style:d?{transform:"scaleY(-1) rotate(90deg)"}:{transform:"rotate(90deg)"}}),x?w?Object(g.jsx)(c.c,{onClick:function(){p((function(e){return!e})),m||u()},size:"1.8em",className:"tools-btn",style:{transform:"scaleX(1.1) rotate(-90deg)"}}):Object(g.jsx)(s.e,{onClick:function(){p((function(e){return!e})),m||u()},size:"2.3em",className:"tools-btn",style:{transform:"scaleY(1.15) rotate(-90deg)"}}):null,w?Object(g.jsx)(n.a,{onClick:function(){return S()},size:"2.5em",className:"tools-btn",style:{transform:"scaleY(0.7) scaleX(0.7)"}}):Object(g.jsx)(s.d,{onClick:function(){return S()},size:"2.5em",className:"tools-btn"}),C?N>0?w?Object(g.jsx)(a.d,{size:"2em"}):Object(g.jsx)(i.a,{type:"Circles",color:"#00BFFF",height:"1.8em",width:"2.3em"}):w?Object(g.jsx)(a.a,{size:"2em",className:"tools-btn",onClick:function(){f(),v()},style:{transform:"scaleY(0.85)"}}):Object(g.jsx)(s.c,{size:"2.3em",className:"tools-btn",onClick:function(){f(),v()}}):w?Object(g.jsx)(c.f,{size:"1.8em",onClick:function(){return O()},style:{transform:"scaleX(-1)"}}):Object(g.jsx)(s.b,{size:"2.3em",onClick:function(){return O()}})]})},p=t(6),x=t(333),k=t(4),N=t(376),C=t(24),v=t(77),w=function(e){var r=e.setSearchProps,t=e.searchProps,c=e.isDropDisabled,n=e.darkMode;Object(o.useEffect)((function(){if(t.goClean&&!t.areSlicesScrolled){var e=Object(k.a)({},t);e.goClean=!1,r(e)}}),[t]);return Object(g.jsx)(x.c,{droppableId:"search-bar",isDropDisabled:c,children:function(e,o){return Object(g.jsxs)("div",Object(k.a)(Object(k.a)({className:n?"search-dark":"search-bright"},e.droppableProps),{},{ref:e.innerRef,children:[t.threadFilter||t.collectionFilter||t.imgFilter||"#ededed"!==t.colorFilter||t.searchText||t.areSlicesScrolled?Object(g.jsx)(a.b,{size:"1.6em",className:"tools-btn search-icons",onClick:function(){var e=Object(k.a)({},j.j);e.areSlicesScrolled=t.areSlicesScrolled,j.j.goClean=!0,r(e)},color:n?"#666666":"#464646",style:{paddingTop:"3px",transform:"scale(0.8)"}}):n?Object(g.jsx)(N.a,{className:"search-icons",size:"2em"}):Object(g.jsx)(s.k,{className:"search-icons",size:"2em"}),e.placeholder,Object(g.jsx)("input",{onChange:function(e){var o=Object(k.a)({},t);o.searchText=e.target.value.toLowerCase(),r(o),j.c["search-area-scroll"]=0},type:"text",placeholder:o.isDraggingOver?"Work within this collection":"Type to search",value:t.searchText}),Object(g.jsx)("span",{className:"search-filter tools-btn",style:t.imgFilter?{color:"red"}:{},onClick:function(){var e=Object(k.a)({},t);e.imgFilter=!e.imgFilter,r(e),j.c["search-area-scroll"]=0},children:Object(g.jsx)(v.d,{size:"0.9em",style:{marginTop:"4px",transform:"rotate(180deg)"}})}),Object(g.jsx)("span",{className:"search-filter tools-btn",style:t.threadFilter?{color:"red"}:{},onClick:function(){var e=Object(k.a)({},t);e.threadFilter=!e.threadFilter,r(e),j.c["search-area-scroll"]=0},children:"T"}),Object(g.jsx)("span",{className:"search-filter tools-btn",style:t.collectionFilter?{color:"red"}:{},onClick:function(){var e=Object(k.a)({},t);e.collectionFilter=!e.collectionFilter,r(e),j.c["search-area-scroll"]=0},children:"C"}),Object(g.jsx)("span",{style:{margin:"0 5px 0 0"},children:Object(g.jsx)(C.a,{setBackColor:{},setHasChanged:{},searchProps:t,setSearchProps:r})})]}))}})},S=t(5),M=function(e){var r=e.searchProps,t=e.closeCollection,o=e.dashboard,s=e.darkMode;return Object(g.jsxs)("div",{className:"stripe-label",children:[Object(g.jsxs)("div",{className:"stripe-not-overflow",style:{width:"80vw"},children:["NOTE FINDER",r.threadFilter&&" - THREADS",r.collectionFilter&&" - COLLECTIONS",o.openedCollectionId&&" : "+Object(S.h)(o.notes.get(o.openedCollectionId))]}),o.openedCollectionId&&Object(g.jsx)("div",{children:Object(g.jsx)(a.b,{size:"2em",className:"tools-btn close-btn",onClick:function(){return t()},color:s?"white":"black"})})]})},I=t(377),y=t(378),P=t(379),E=t(343),z=function(e){var r=e.note,t=e.areaName,o=e.index,s=e.handleNotePress,c=e.darkMode,n=e.selectedNote,a=e.mergeMode,l=e.openEditor,d=e.rootsOrBranches,i=e.triggerRerender;return Object(g.jsx)(x.b,{draggableId:r.ui_id,index:o,children:function(e,o){return Object(g.jsx)("div",{children:Object(g.jsxs)("li",Object(k.a)(Object(k.a)(Object(k.a)({className:(a&&n.id===r.id?"note no-scrollbar merge-mode":c&&n&&n.id===r.id&&!j.c.usingScrollKeys&&"note note-dark no-scrollbar selected-note-dark")||c&&(!n||n.id!==r.id)&&"note note-dark no-scrollbar"||!c&&n&&n.id===r.id&&!j.c.usingScrollKeys&&"note note-bright no-scrollbar selected-note"||!c&&(!n||n.id!==r.id)&&"note note-bright no-scrollbar",name:r.id,id:r.ui_id,ref:e.innerRef},e.draggableProps),e.dragHandleProps),{},{onClick:function(){return s(r)},onDoubleClick:function(){return l(r)},style:a&&n.id===r.id?e.draggableProps.style:c||"#ffffff"===r.color?"#ffffff"!==r.color?Object(k.a)({backgroundImage:"linear-gradient(25deg, rgb(92, 92, 92) 92%, "+r.colorPreview+" 92%)"},e.draggableProps.style):e.draggableProps.style:n&&n.id===r.id?Object(k.a)({backgroundColor:r.color},e.draggableProps.style):Object(k.a)({backgroundColor:r.color,border:"1px solid "+r.color},e.draggableProps.style),children:[o.isDropAnimating,n&&n.id===r.id&&i,Object(g.jsxs)("div",{children:[r.pinned&&"search-area"===t&&Object(g.jsx)(I.a,{size:"10px",className:"header-icon"}),r.thread.length?Object(g.jsx)(y.b,{size:"10px",className:"header-icon"}):"",r.collection.length?Object(g.jsx)(y.a,{size:"10px",className:"header-icon"}):"",!d&&r.branches.length?Object(g.jsx)(P.a,{size:"10px",className:"header-icon"}):"",d&&r.roots.length?Object(g.jsx)(P.a,{size:"10px",className:"header-icon",style:{transform:"scaleY(-1)"}}):"",r.attachedImg&&!r.attachedImg[2]?Object(g.jsx)(E.b,{size:"10px",className:"header-icon",style:{transform:"rotate(-45deg)"}}):""]}),r.attachedImg&&r.attachedImg[2]?Object(g.jsx)("div",{className:"just-background-note",style:{backgroundImage:"url("+r.text+")"}}):Object(g.jsx)("div",{className:"note-content no-scrollbar",dangerouslySetInnerHTML:{__html:r.preview}})]}))})}},r.ui_id)},R=function(e){var r=e.threadOrCollection,t=e.notesLength,o=e.draggableInfo,s=e.notes,c=e.darkMode,n="search-area"!==o.sourceArea||(t>0?o.note.thread.length>0||o.note.collection.length>0:!o.note.thread.length&&!o.note.collection.length)||void 0!==s.find((function(e){return e.id===o.note.id}));return Object(g.jsx)(x.c,{droppableId:"wrapper-area",isDropDisabled:n,children:function(e,s){return Object(g.jsxs)("div",Object(k.a)(Object(k.a)({className:"wrapper"},e.droppableProps),{},{ref:e.innerRef,style:t>0?Object(k.a)(Object(k.a)({},c?r?{backgroundColor:"#fccb00",color:"black"}:{backgroundColor:"#1273de",color:"white"}:r?{backgroundColor:"#fef3bd",color:"black"}:{backgroundColor:"#c4def6",color:"black"}),!s.isDraggingOver&&{minWidth:"8vh"}):c?{backgroundColor:"#2e2e2e",minWidth:"8vh",color:"#666666"}:{backgroundColor:"#f4f4f4",minWidth:"8vh",boxShadow:"1px 0px 1px #dddddd"},children:[Object(g.jsx)("div",{className:"vertical-text",children:t>0?"WRAP":"drop to expand"}),e.placeholder,s.isDraggingOver?t>0?Object(g.jsxs)("div",{className:"vertical-text",children:["wrap ",Object(g.jsx)("br",{}),r?" thread ":" collection ",Object(g.jsx)("br",{}),"inside note"]}):Object(g.jsxs)("div",{className:"vertical-text",children:["expand",Object(g.jsx)("br",{}),o.note.thread.length?"thread":"collection"]}):null]}))}})},D=function(e,r,t,o,s){var c=-1===e?{inline:"start"}:{inline:"end"},n=r*j.d+j.d-1;n>o.length-1&&(n=o.length-1),document.getElementById(o[n].ui_id).scrollIntoView(c),t(r+e),window.sessionStorage.setItem("current-slice-"+s,r+e),"search-area"===s&&(j.c.currentSearchSlice=r+e)},B=function(e,r){if(e){var t=r.find((function(r){return r.id===e.id}));if(t){var o=document.getElementById(t.ui_id);if(o)return o.scrollIntoView({block:"nearest"}),!0}}},F=function(e){var r=e.notes,t=e.handleAddNote,c=e.areaName,n=e.handleNotePress,a=e.darkMode,l=e.selectedNote,d=e.mergeMode,i=e.threadOrCollection,b=e.openEditor,h=e.workspaceFlag,u=e.rootsOrBranches,O=e.isDropDisabled,f=e.draggableInfo,m=e.searchProps,N=e.setSearchProps,C=e.triggerRerender,w=window.sessionStorage.getItem("current-slice-"+c),S=Object(o.useState)(w?parseInt(w):0),M=Object(p.a)(S,2),I=M[0],y=M[1],P=Object(o.useState)(!1),E=Object(p.a)(P,2),F=E[0],A=E[1];Object(o.useEffect)((function(){if(!j.c.usingScrollKeys)if("search-area"===c||j.c.closingEditor){var e=document.getElementById(c);e&&(j.c.resetSearchScroll?(e.scrollLeft=0,j.c.resetSearchScroll=!1):e.scrollLeft=j.c[c+"-scroll"])}else B(l,T);T.length||0===I||(y(0),window.sessionStorage.setItem("current-slice-"+c,0),j.c[c+"-scroll"]=0,"search-area"===c&&(j.c.currentSearchSlice=0)),A(!0)}),[r]),Object(o.useEffect)((function(){"search-area"===c&&j.c.usingScrollKeys&&(B(l,T),j.c.usingScrollKeys=!1,A(!0))}),[l]),Object(o.useEffect)((function(){"search-area"===c&&m.goClean&&I>0&&(y(0),window.sessionStorage.setItem("current-slice-"+c,0),j.c.currentSearchSlice=0)}),[m]),Object(o.useEffect)((function(){if("search-area"===c){var e=Object(k.a)({},m);if(e.areSlicesScrolled=I>0,m.goClean)document.getElementById(c).scrollLeft=0,e.goClean=!1;N(e)}}),[I]),Object(o.useEffect)((function(){F&&(j.c.closingEditor=!1)}),[F]);var T=r.slice(I*j.d,(I+1)*j.d+j.d);return Object(g.jsx)("div",{style:{visibility:F?"visible":"hidden"},children:Object(g.jsx)(x.c,{droppableId:c,direction:"horizontal",className:"droppable-wrapper",isDropDisabled:O,children:function(e){return Object(g.jsxs)("ul",Object(k.a)(Object(k.a)({className:"notes-list"},e.droppableProps),{},{ref:e.innerRef,id:c,onScroll:function(){return function(){var e=document.getElementById(c);e&&(j.c[c+"-scroll"]=e.scrollLeft)}()},children:[Object(g.jsx)("div",{children:I>0?a?Object(g.jsx)(v.a,{className:"tools-btn arrow-btn",onClick:function(){return D(-1,I,y,r,c)},size:"2.5em",color:"#666666"}):Object(g.jsx)(s.j,{className:"tools-btn arrow-btn",onClick:function(){return D(-1,I,y,r,c)},size:"2.5em"}):null}),"workspace-area"===c&&h&&Object(g.jsx)(R,{threadOrCollection:i,notesLength:r.length,draggableInfo:f,notes:r,darkMode:a}),Object(g.jsx)("div",{children:"search-area"===c&&0===I&&(a?Object(g.jsx)(v.e,{className:"tools-btn arrow-btn add-btn",onClick:function(){return t()},size:"2.25em",color:"#555555",style:{transform:"scale(0.8)"},id:"plus"}):Object(g.jsx)(s.i,{className:"tools-btn arrow-btn add-btn",onClick:function(){return t()},size:"2.25em",id:"plus"}))}),T.map((function(e,r){return Object(g.jsx)(z,{note:e,areaName:c,index:r+I*j.d,handleNotePress:n,darkMode:a,selectedNote:l,mergeMode:d,openEditor:b,rootsOrBranches:u,triggerRerender:C},e.ui_id)})),e.placeholder,Object(g.jsx)("div",{children:(I+1)*j.d+j.d<r.length?a?Object(g.jsx)(v.b,{className:"tools-btn arrow-btn",onClick:function(){return D(1,I,y,r,c)},size:"2.5em",color:"#666666"}):Object(g.jsx)(s.g,{className:"tools-btn arrow-btn",onClick:function(){return D(1,I,y,r,c)},size:"2.5em"}):null})]}))}})})},A=function(e){var r=e.closeCollection,t=e.dashboard,o=e.darkMode,s=e.addNote,c=e.selectNote,n=e.mergeMode,a=e.threadOrCollection,l=e.openEditor,d=e.rootsOrBranches,i=e.searchProps,b=e.setSearchProps,h=e.draggableInfo,j=e.triggerRerender,u=!h.note||!h.note.collection||!h.note.collection.length;return Object(g.jsxs)("div",{children:[Object(g.jsx)(w,{setSearchProps:b,searchProps:i,isDropDisabled:u,darkMode:o}),Object(g.jsxs)("div",{children:[Object(g.jsx)(M,{searchProps:i,closeCollection:r,dashboard:t,darkMode:o}),Object(g.jsx)(F,{notes:t.search,handleAddNote:s,areaName:"search-area",handleNotePress:c,darkMode:o,selectedNote:t.notes.get(t.selectedNoteId),mergeMode:n,threadOrCollection:a,openEditor:l,rootsOrBranches:d,searchProps:i,setSearchProps:b,triggerRerender:j})]})]})},T=function(e){var r=e.dashboard,t=e.threadOrCollection,o=e.closeAndSave,s=e.darkMode;return Object(g.jsxs)("div",{className:"stripe-label",children:[Object(g.jsxs)("div",{className:"stripe-not-overflow",style:{width:"80vw"},children:["CURRENT ",t?" THREAD ":" COLLECTION ",r.openedWorkspaceId?" : "+Object(S.h)(r.notes.get(r.openedWorkspaceId)):r.workspaceIds.length?t?" : unsaved thread ":" : unsaved collection ":null]}),r.workspaceIds.length||r.openedWorkspaceId?Object(g.jsx)("div",{children:Object(g.jsx)(a.b,{size:"2em",className:"tools-btn close-btn",onClick:function(){return o()},color:s?"white":"black"})}):null]})},L=function(e){var r=e.dashboard,t=e.darkMode,o=e.selectNote,s=e.mergeMode,c=e.threadOrCollection,n=e.openEditor,a=e.rootsOrBranches,l=e.closeAndSave,d=e.draggableInfo,i=e.triggerRerender;return Object(g.jsxs)("div",{children:[Object(g.jsx)(T,{dashboard:r,threadOrCollection:c,closeAndSave:l,darkMode:t}),Object(g.jsx)(F,{notes:r.workspace,areaName:"workspace-area",handleNotePress:o,darkMode:t,selectedNote:r.notes.get(r.selectedNoteId),mergeMode:s,threadOrCollection:c,openEditor:n,workspaceFlag:!r.openedWorkspaceId,rootsOrBranches:a,draggableInfo:d,triggerRerender:i})]})},W=function(e){var r=e.dashboard,t=e.darkMode,o=e.mergeMode,s=e.threadOrCollection,c=e.openEditor,n=e.rootsOrBranches,a=e.draggableInfo,l=e.triggerRerender,d="workspace-area"===a.sourceArea||a.note&&a.note.id===r.selectedNoteId;return Object(g.jsxs)("div",{children:[Object(g.jsxs)("label",{className:"stripe-label stripe-not-overflow",style:{width:"90vw"},children:[n?" ROOTS":" BRANCHES",r.selectedNoteId&&" - "+Object(S.h)(r.notes.get(r.selectedNoteId))]}),Object(g.jsx)(F,{notes:r.links,areaName:"branches-area",darkMode:t,handleNotePress:function(){},selectedNote:r.notes.get(r.selectedNoteId),mergeMode:o,threadOrCollection:s,openEditor:function(e){o||(j.c.editorModeSelection="prev",r.prevSelectedNoteId=r.selectedNoteId,r.selectedNoteId=e.id,c())},rootsOrBranches:n,isDropDisabled:d,triggerRerender:l})]})},_=function(e){var r=e.handleOnDragEnd,t=e.closeCollection,s=e.dashboard,c=e.darkMode,n=e.addNote,a=e.selectNote,l=e.mergeMode,d=e.threadOrCollection,i=e.openEditor,b=e.rootsOrBranches,h=e.closeAndSave,j=e.searchProps,u=e.setSearchProps,O=e.triggerRerender,f=Object(o.useState)({sourceArea:"",note:{id:null}}),m=Object(p.a)(f,2),k=m[0],N=m[1];return Object(g.jsxs)(x.a,{onDragEnd:r,onDragStart:function(e){return function(e,r,t){window.navigator.vibrate&&window.navigator.vibrate(25);var o={},s=e.source.droppableId;o.sourceArea=s;var c=e.source.index,n=null;"workspace-area"===s?n=r.workspace[c]:"search-area"===s?n=r.search[c]:"branches-area"===s&&(n=r.links[c]),n&&(o.note=n),t(o)}(e,s,N)},children:[Object(g.jsx)(A,{closeCollection:t,dashboard:s,darkMode:c,addNote:n,selectNote:a,mergeMode:l,threadOrCollection:d,openEditor:i,rootsOrBranches:b,searchProps:j,setSearchProps:u,draggableInfo:k,triggerRerender:O}),Object(g.jsx)(L,{dashboard:s,darkMode:c,selectNote:a,mergeMode:l,threadOrCollection:d,openEditor:i,rootsOrBranches:b,closeAndSave:h,draggableInfo:k,triggerRerender:O}),Object(g.jsx)(W,{dashboard:s,darkMode:c,mergeMode:l,threadOrCollection:d,openEditor:i,rootsOrBranches:b,draggableInfo:k,triggerRerender:O})]})};r.default=function(e){var r=e.darkMode,t=e.dashboard,o=e.handleOnDragEnd,s=e.GAPIloaded,c=e.currentUser,n=e.setCurrentPage,a=e.notesUpdating,l=e.setDarkMode,d=e.closeCollection,i=e.addNote,b=e.selectNote,h=e.mergeMode,j=e.setMergeMode,u=e.openEditor,O=e.rootsOrBranches,f=e.closeAndSave,p=e.threadOrCollection,x=e.threadOrCollectionManage,k=e.setRootsOrBranches,N=e.searchProps,C=e.setSearchProps,v=e.synchNotes,w=e.editorMode,S=e.triggerRerender;return Object(g.jsxs)("div",{className:r?"container dark-mode":"container",children:[Object(g.jsx)(_,{handleOnDragEnd:o,closeCollection:d,dashboard:t,darkMode:r,addNote:i,selectNote:b,mergeMode:h,threadOrCollection:p,openEditor:u,rootsOrBranches:O,closeAndSave:f,searchProps:N,setSearchProps:C,editorMode:w,triggerRerender:S}),Object(g.jsx)(m,{threadOrCollectionManage:x,threadOrCollection:p,setRootsOrBranches:k,rootsOrBranches:O,setDarkMode:l,mergeMode:h,setMergeMode:j,selectedNote:t.notes.get(t.selectedNoteId),setCurrentPage:n,notesUpdating:a,loadedUser:s&&c,synchNotes:v,darkMode:r})]})}}}]);
//# sourceMappingURL=9.38480820.chunk.js.map