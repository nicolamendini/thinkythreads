(this.webpackJsonpthinkythreads=this.webpackJsonpthinkythreads||[]).push([[9],{294:function(e,r,t){"use strict";t.r(r);var o=t(0),a=t(107),s=(t(285),t(18)),n=t.n(s),c=t(9),l=t(7),d=function(e){var r=e.threadOrCollectionManage,t=e.threadOrCollection,o=e.setRootsOrBranches,s=e.rootsOrBranches,d=e.setDarkMode,i=e.mergeMode,h=e.setMergeMode,b=e.selectedNote,j=e.setCurrentPage,O=e.notesUpdating,g=e.loadedUser,p=e.synchNotes;return Object(l.jsxs)("div",{className:"page-footer",children:[Object(l.jsx)(a.l,{className:"tools-btn",onClick:function(){return j("settings")},size:"2.5em"}),!t&&Object(l.jsx)(a.a,{onClick:function(){return r(!t)},size:"2.5em",className:"tools-btn"}),t&&Object(l.jsx)(a.f,{onClick:function(){return r(!t)},size:"2.5em",className:"tools-btn"}),t&&Object(l.jsx)(a.h,{onClick:function(){return o((function(e){return!e}))},size:"2.5em",className:"tools-btn",style:s&&{transform:"scaleX(-1)"}}),b?Object(l.jsx)(a.e,{onClick:function(){h((function(e){return!e})),i||alert(c.j)},size:"2.3em",className:"tools-btn",style:{transform:"scaleX(1.2)"}}):null,Object(l.jsx)(a.d,{onClick:function(){return d((function(e){return!e}))},size:"2.5em",className:"tools-btn"}),g?O>0?Object(l.jsx)(n.a,{type:"Circles",color:"#00BFFF",height:"1.8em",width:"2.3em"}):Object(l.jsx)(a.c,{size:"2.3em",className:"tools-btn",onClick:function(){return p()}}):Object(l.jsx)(a.b,{size:"2.3em",onClick:function(){return alert(c.f)}})]})},i=t(5),h=t(76),b=t(4),j=function(e){var r=e.setSearchProps,t=e.searchProps,o=e.isDropDisabled;return Object(l.jsx)(h.c,{droppableId:"search-bar",isDropDisabled:o,children:function(e,o){return Object(l.jsxs)("div",Object(b.a)(Object(b.a)({className:"search"},e.droppableProps),{},{ref:e.innerRef,children:[Object(l.jsx)(a.k,{className:"search-icons",size:"2em"}),e.placeholder,Object(l.jsx)("input",{onChange:function(e){return r({searchText:e.target.value.toLowerCase(),threadFilter:t.threadFilter,collectionFilter:t.collectionFilter})},type:"text",placeholder:o.isDraggingOver?"Work within this collection":"Type to search",value:t.searchText}),Object(l.jsx)("span",{className:"searchFilter tools-btn",style:t.threadFilter?{color:"red"}:{},onClick:function(){return r({searchText:t.searchText,threadFilter:!t.threadFilter,collectionFilter:t.collectionFilter})},children:"T"}),Object(l.jsx)("span",{className:"searchFilter tools-btn",style:t.collectionFilter?{color:"red"}:{},onClick:function(){return r({searchText:t.searchText,threadFilter:t.threadFilter,collectionFilter:!t.collectionFilter})},children:"C"})]}))}})},O=t(3),g=t(146),p=function(e){var r=e.searchProps,t=e.closeCollection,o=e.dashboard,a=e.darkMode;return Object(l.jsxs)("div",{className:"stripe-label",children:[Object(l.jsxs)("div",{className:"stripe-not-overflow",children:["NOTE FINDER",r.threadFilter&&" - THREADS",r.collectionFilter&&" - COLLECTIONS",o.openedCollectionId&&" : "+Object(O.e)(o.notes.get(o.openedCollectionId))]}),o.openedCollectionId&&Object(l.jsx)("div",{children:Object(l.jsx)(g.a,{size:"2em",className:"tools-btn close-btn",onClick:function(){return t()},color:a?"white":"black"})})]})},u=t(288),m=t(289),x=t(290),f=t(142),N=function(e){var r=e.note,t=e.areaName,o=e.index,a=e.handleNotePress,s=e.darkMode,n=e.selectedNote,c=e.mergeMode,d=e.openEditor,i=e.rootsOrBranches,j=e.threadOrCollection;return Object(l.jsx)(h.b,{draggableId:r.ui_id,index:o,children:function(e,o){return Object(l.jsx)("div",{children:Object(l.jsxs)("li",Object(b.a)(Object(b.a)(Object(b.a)({className:"".concat((c&&n.id===r.id?"note no-scrollbar merge-mode":s&&n&&n.id===r.id&&"note note-dark no-scrollbar selected-note-dark")||s&&(!n||n.id!==r.id)&&"note note-dark no-scrollbar"||!s&&n&&n.id===r.id&&"note note-bright no-scrollbar selected-note"||!s&&(!n||n.id!==r.id)&&"note note-bright no-scrollbar"),name:r.id,id:r.ui_id,ref:e.innerRef},e.draggableProps),e.dragHandleProps),{},{onClick:function(){a(r)},onDoubleClick:function(){return"branches-area"!==t?d():{}},style:c&&n.id===r.id?e.draggableProps.style:s||"#ffffff"===r.color?"#ffffff"!==r.color?Object(b.a)({backgroundImage:"linear-gradient(25deg, rgb(92, 92, 92) 92%, "+r.colorPreview+" 92%)"},e.draggableProps.style):e.draggableProps.style:n&&n.id===r.id?Object(b.a)({backgroundColor:r.color},e.draggableProps.style):Object(b.a)({backgroundColor:r.color,border:"1px solid "+r.color},e.draggableProps.style),children:[o.isDropAnimating,Object(l.jsxs)("div",{children:[r.pinned&&"search-area"===t&&Object(l.jsx)(u.a,{size:"10px",className:"header-icon"}),r.thread.length?Object(l.jsx)(m.b,{size:"10px",className:"header-icon"}):"",r.collection.length?Object(l.jsx)(m.a,{size:"10px",className:"header-icon"}):"",j&&!i&&r.branches.length?Object(l.jsx)(x.a,{size:"10px",className:"header-icon"}):"",j&&i&&r.roots.length?Object(l.jsx)(x.a,{size:"10px",className:"header-icon"}):"",r.attachedImg&&!r.attachedImg[2]?Object(l.jsx)(f.b,{size:"10px",className:"header-icon",style:{transform:"rotate(-45deg)"}}):""]}),r.attachedImg&&r.attachedImg[2]?Object(l.jsx)("div",{className:"just-background-note",style:{backgroundImage:"url("+r.text+")"}}):Object(l.jsx)("div",{className:"note-content no-scrollbar",dangerouslySetInnerHTML:{__html:r.preview}})]}))})}},r.ui_id)},k=function(e){var r=e.threadOrCollection,t=e.notesLength,o=e.draggableInfo,a=e.notes,s="search-area"!==o.sourceArea||(t>0?o.note.thread.length>0||o.note.collection.length>0:!o.note.thread.length&&!o.note.collection.length)||void 0!==a.find((function(e){return e.id===o.note.id}));return Object(l.jsx)(h.c,{droppableId:"wrapper-area",isDropDisabled:s,children:function(e,a){return Object(l.jsxs)("div",Object(b.a)(Object(b.a)({className:"wrapper"},e.droppableProps),{},{ref:e.innerRef,style:t>0?Object(b.a)(Object(b.a)({},r?{backgroundColor:"#fef3bd"}:{backgroundColor:"#c4def6"}),!a.isDraggingOver&&{minWidth:"2em"}):{backgroundColor:"#e7e7e7",minWidth:"2em"},children:[Object(l.jsx)("div",{className:"vertical-text",children:t>0?"WRAP":"Drop to Expand"}),e.placeholder,a.isDraggingOver?t>0?Object(l.jsxs)("div",{style:{paddingLeft:"15px"},children:["wrap ",Object(l.jsx)("br",{}),r?" thread ":" collection ",Object(l.jsx)("br",{}),"inside note"]}):Object(l.jsxs)("div",{style:{paddingLeft:"15px"},children:["expand",Object(l.jsx)("br",{}),o.note.thread.length?"thread":"collection"]}):null]}))}})},C=12,v=function(e){var r=e.notes,t=e.handleAddNote,s=e.areaName,n=e.handleNotePress,c=e.darkMode,d=e.selectedNote,j=e.mergeMode,O=e.threadOrCollection,g=e.openEditor,p=e.workspaceFlag,u=e.rootsOrBranches,m=e.isDropDisabled,x=e.draggableInfo,f=Object(o.useState)(0),v=Object(i.a)(f,2),M=v[0],I=v[1],P=function(e){var t=-1===e?{inline:"start"}:{inline:"end"},o=M*C+C-1;o>r.length-1&&(o=r.length-1),document.getElementById(r[o].ui_id).scrollIntoView(t),I(M+e)};return Object(l.jsx)(h.c,{droppableId:s,direction:"horizontal",className:"droppable-wrapper",isDropDisabled:m,children:function(e){return Object(l.jsxs)("ul",Object(b.a)(Object(b.a)({className:"notes-list"},e.droppableProps),{},{ref:e.innerRef,id:s,children:[Object(l.jsx)("div",{children:M>0&&Object(l.jsx)(a.j,{className:"tools-btn arrow-btn",onClick:function(){return P(-1)},size:"2.5em"})}),"workspace-area"===s&&p&&Object(l.jsx)(k,{threadOrCollection:O,notesLength:r.length,draggableInfo:x,notes:r}),Object(l.jsx)("div",{children:"search-area"===s&&0===M&&Object(l.jsx)(a.i,{className:"tools-btn arrow-btn add-btn",onClick:function(){return t()},size:"2.5em"})}),r.slice(M*C,(M+1)*C+C).map((function(e,r){return Object(l.jsx)(N,{note:e,areaName:s,index:r+M*C,handleNotePress:n,darkMode:c,selectedNote:d,mergeMode:j,openEditor:g,rootsOrBranches:u,threadOrCollection:O},e.ui_id)})),e.placeholder,Object(l.jsx)("div",{children:(M+1)*C+C<r.length&&Object(l.jsx)(a.g,{className:"tools-btn arrow-btn",onClick:function(){return P(1)},size:"2.5em"})})]}))}})},M=function(e){var r=e.closeCollection,t=e.dashboard,o=e.darkMode,a=e.addNote,s=e.selectNote,n=e.mergeMode,c=e.threadOrCollection,d=e.openEditor,i=e.rootsOrBranches,h=e.searchProps,b=e.setSearchProps,O=e.draggableInfo,g="search-area"!==O.sourceArea||!O.note.collection.length;return Object(l.jsxs)("div",{children:[Object(l.jsx)(j,{setSearchProps:b,searchProps:h,isDropDisabled:g}),c?null:Object(l.jsx)("div",{className:"search-spacer"}),Object(l.jsxs)("div",{children:[Object(l.jsx)(p,{searchProps:h,closeCollection:r,dashboard:t,darkMode:o}),Object(l.jsx)(v,{notes:t.search,handleAddNote:a,areaName:"search-area",handleNotePress:s,darkMode:o,selectedNote:t.notes.get(t.selectedNoteId),mergeMode:n,threadOrCollection:c,openEditor:d,rootsOrBranches:i})]})]})},I=function(e){var r=e.dashboard,t=e.threadOrCollection,o=e.closeAndSave,a=e.darkMode;return Object(l.jsxs)("div",{className:"stripe-label",children:[Object(l.jsxs)("div",{className:"stripe-not-overflow",children:["CURRENT ",t?" THREAD ":" COLLECTION ",r.openedWorkspaceId?" : "+Object(O.e)(r.notes.get(r.openedWorkspaceId)):r.workspaceIds.length?t?" : unsaved thread ":" : unsaved collection ":null]}),r.workspaceIds.length||r.openedWorkspaceId?Object(l.jsx)("div",{children:Object(l.jsx)(g.a,{size:"2em",className:"tools-btn close-btn",onClick:function(){return o()},color:a?"white":"black"})}):null]})},P=function(e){var r=e.dashboard,t=e.darkMode,o=e.selectNote,a=e.mergeMode,s=e.threadOrCollection,n=e.openEditor,c=e.rootsOrBranches,d=e.closeAndSave,i=e.draggableInfo;return Object(l.jsxs)("div",{children:[Object(l.jsx)(I,{dashboard:r,threadOrCollection:s,closeAndSave:d,darkMode:t}),Object(l.jsx)(v,{notes:r.workspace,areaName:"workspace-area",handleNotePress:o,darkMode:t,selectedNote:r.notes.get(r.selectedNoteId),mergeMode:a,threadOrCollection:s,openEditor:n,workspaceFlag:!r.openedWorkspaceId,rootsOrBranches:c,draggableInfo:i})]})},w=function(e){var r=e.dashboard,t=e.darkMode,o=e.mergeMode,a=e.threadOrCollection,s=e.openEditor,n=e.rootsOrBranches,c=e.draggableInfo,d="search-area"!==c.sourceArea||c.note.id===r.selectedNoteId;return Object(l.jsx)("div",{children:r.notes.get(r.selectedNoteId)&&a&&Object(l.jsxs)("div",{children:[Object(l.jsxs)("label",{className:"stripe-label",children:[n?" ROOT LINKS - ":" BRANCH LINKS - ",Object(O.e)(r.notes.get(r.selectedNoteId))]}),Object(l.jsx)(v,{notes:r.links,areaName:"branches-area",darkMode:t,handleNotePress:function(){},selectedNote:r.notes.get(r.selectedNoteId),mergeMode:o,threadOrCollection:a,openEditor:s,rootsOrBranches:n,isDropDisabled:d})]})})},D=function(e){var r=e.handleOnDragEnd,t=e.closeCollection,a=e.dashboard,s=e.darkMode,n=e.addNote,c=e.selectNote,d=e.mergeMode,b=e.threadOrCollection,j=e.openEditor,O=e.rootsOrBranches,g=e.closeAndSave,p=e.searchProps,u=e.setSearchProps,m=Object(o.useState)({sourceArea:"",note:null}),x=Object(i.a)(m,2),f=x[0],N=x[1];return Object(l.jsxs)(h.a,{onDragEnd:r,onDragStart:function(e){return function(e,r,t){window.navigator.vibrate&&window.navigator.vibrate(25);var o={},a=e.source.droppableId;o.sourceArea=a;var s=e.source.index,n=null;"workspace-area"===a?n=r.workspace[s]:"search-area"===a?n=r.search[s]:"links-area"===a&&(n=r.links[s]),n&&(o.note=n),t(o)}(e,a,N)},children:[Object(l.jsx)(M,{closeCollection:t,dashboard:a,darkMode:s,addNote:n,selectNote:c,mergeMode:d,threadOrCollection:b,openEditor:j,rootsOrBranches:O,searchProps:p,setSearchProps:u,draggableInfo:f}),Object(l.jsx)(P,{dashboard:a,darkMode:s,selectNote:c,mergeMode:d,threadOrCollection:b,openEditor:j,rootsOrBranches:O,closeAndSave:g,draggableInfo:f}),Object(l.jsx)(w,{dashboard:a,darkMode:s,mergeMode:d,threadOrCollection:b,openEditor:j,rootsOrBranches:O,draggableInfo:f})]})};r.default=function(e){var r=e.darkMode,t=e.dashboard,o=e.handleOnDragEnd,a=e.GAPIloaded,s=e.currentUser,n=e.setCurrentPage,c=e.notesUpdating,i=e.setDarkMode,h=e.closeCollection,b=e.addNote,j=e.selectNote,O=e.mergeMode,g=e.setMergeMode,p=e.openEditor,u=e.rootsOrBranches,m=e.closeAndSave,x=e.threadOrCollection,f=e.threadOrCollectionManage,N=e.setRootsOrBranches,k=e.searchProps,C=e.setSearchProps,v=e.synchNotes;return Object(l.jsxs)("div",{className:r?"container dark-mode":"container",children:[Object(l.jsx)(D,{handleOnDragEnd:o,closeCollection:h,dashboard:t,darkMode:r,addNote:b,selectNote:j,mergeMode:O,threadOrCollection:x,openEditor:p,rootsOrBranches:u,closeAndSave:m,searchProps:k,setSearchProps:C}),Object(l.jsx)(d,{threadOrCollectionManage:f,threadOrCollection:x,setRootsOrBranches:N,rootsOrBranches:u,setDarkMode:i,mergeMode:O,setMergeMode:g,selectedNote:t.notes.get(t.selectedNoteId),setCurrentPage:n,notesUpdating:c,loadedUser:a&&s,synchNotes:v})]})}}}]);
//# sourceMappingURL=9.35ea355e.chunk.js.map