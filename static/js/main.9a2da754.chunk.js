(this.webpackJsonpthinkythreads=this.webpackJsonpthinkythreads||[]).push([[2],{13:function(e,t,n){"use strict";n.d(t,"a",(function(){return te})),n.d(t,"d",(function(){return ne})),n.d(t,"c",(function(){return oe})),n.d(t,"b",(function(){return re})),n.d(t,"g",(function(){return ie})),n.d(t,"h",(function(){return ce})),n.d(t,"e",(function(){return ae}));var o=n(1),r=n.n(o),i=n(6),c=n(2),a=n(4),s=n(5),d=n(0),l=n.n(d),u=n(25),f=n(3),h=n(9);function p(e,t){return window.gapi.client.request({path:"upload/drive/v3/files/"+t,method:"PATCH",params:{uploadType:"media"},body:e.text})}function g(e){return{description:JSON.stringify({id:e.id,preview:e.preview,branches:e.branches,roots:e.roots,thread:e.thread,collection:e.collection,pinned:e.pinned,color:e.color,colorPreview:e.colorPreview,attachedImg:e.attachedImg}),appProperties:{version:e.version}}}function v(e,t){return window.gapi.client.request({path:"drive/v3/files/"+t,method:"PATCH",body:g(e)})}function b(e,t){return t||(t=g(e)),t.mimeType="application/json",t.name=e.id,t.fields="id",t.parents=[ce],window.gapi.client.drive.files.create({resource:t})}function w(e){return window.gapi.client.drive.files.list({q:"name='"+e.id+"' and mimeType='application/json' and trashed=false and '"+ce+"' in parents"})}function O(e){return window.gapi.client.drive.files.get({mimeType:"application/json",fileId:e,alt:"media"})}function m(e,t,n){for(var o=arguments.length,r=new Array(o>3?o-3:0),i=3;i<o;i++)r[i-3]=arguments[i];if(console.error(e),t+=1,e.result&&-1===e.result.error.code&&t<2||t<4)setTimeout((function(){n.apply(void 0,r.concat([t]))}),1e3);else if(n===y){var c=r[2];c((function(e){return e-1}))}}function I(e,t,n){e.version+=1;var o=Object(a.a)({},e);Object(f.d)(e),ie&&(n((function(e){return e+1})),y(o,t,n)),"meta"===t?(delete o.text,ae.notes.update(o.id,o)):ae.notes.put(o)}function j(e,t,n){ae.notes.get(e).then((function(e){return setTimeout((function(){n((function(e){return e+1})),y(e,"both",n)}),200*t)}))}function k(e,t,n){n||(n=0),p({text:JSON.stringify({notesOrder:e.notesOrder,notesEverDeleted:e.notesEverDeleted})},t).then().catch((function(t){return m(t,n,k,e)}))}function y(e,t,n,o){o||(o=0),w(e).then((function(r){if(r.result.files.length){var i=r.result.files[0].id,c=null;"media"===t||"both"===t?c=p:"meta"===t&&(c=v),c(e,i).then((function(){"both"===t?y(e,"meta",n):(console.log("updated"),n((function(e){return e-1})))})).catch((function(r){return m(r,o,y,e,t,n)}))}else b(e).then((function(){"meta"!==t?y(e,"media",n):n((function(e){return e-1}))})).catch((function(r){return m(r,o,y,e,t,n)}))})).catch((function(r){return m(r,o,y,e,t,n)}))}function x(e,t){e.checkedAgainstDrive?(console.log("updateconfig"),t||(t=0),window.gapi.client.drive.files.list({fields:"files(id)",q:"name='___config' and mimeType='application/json' and trashed=false"}).then((function(n){if(n.result.files.length)k(e,n.result.files[0].id);else{b({id:"___config"},{}).then((function(t){k(e,t.result.id)})).catch((function(n){return m(n,t,x,e)}))}})).catch((function(n){return m(n,t,x,e)}))):console.log("blocked")}function S(e,t,n){console.log("deleted");var o=t.findIndex((function(t){return t===e.id}));if(-1!==o){var r=Object(f.h)(t,o);n(r),window.localStorage.setItem("deleted-notes",JSON.stringify(r))}}function N(e,t,n,o,r){r||(r=0),w(e).then((function(i){i.result.files.length?window.gapi.client.drive.files.delete({fileId:i.result.files[0].id}).then((function(){S(e,t,n)})).catch((function(i){return m(i,r,N,e,t,n,o)})):S(e,t,n)})).catch((function(i){return m(i,r,N,e,t,n,o)}))}function P(e){ae.notes.bulkGet(e.notes.get(e.selectedNoteId).thread).then((function(e){var t=e.map((function(e){return e.text})),n=h.g+t.reduce((function(e,t){return e+h.m+t})),o=document.getElementById("ifmcontentstoprint").contentWindow;o.document.open(),o.document.write(n),o.document.close(),o.focus(),o.print()}))}function E(e,t){console.log("checkingfolder"),t||(t=0),window.gapi.client.drive.files.list({q:"name='thinkythreads-data' and mimeType='application/vnd.google-apps.folder' and trashed=false"}).then((function(n){if(n.result.files.length)n.result.files[0].id!==ce&&e(n.result.files[0].id);else{window.gapi.client.drive.files.create({resource:{name:"thinkythreads-data",mimeType:"application/vnd.google-apps.folder"},fields:"id"}).then((function(t){e(t.result.id)})).catch((function(n){return m(n,t,E,e)}))}})).catch((function(n){return m(n,t,E,e)}))}var T=n(10);function A(e,t,n,o,r,i,a){e.configFound?O(e.configFound).then((function(s){if(""!==s.body){var d=JSON.parse(s.body),l=Object(c.a)(t.notes.keys()),u=l.filter((function(e){return!d.notesEverDeleted.includes(e)}));a||l.length!==u.length?function(e,t,n){e.notesEverDeleted=t.notesEverDeleted;var o,r=Object(T.a)(e.notesEverDeleted);try{for(r.s();!(o=r.n()).done;){var i=o.value;e.notes.get(i)&&e.notes.delete(i)}}catch(a){r.e(a)}finally{r.f()}e.notesEverDeleted.includes(e.selectedNoteId)&&(e.selectedNoteId=null);e.notesEverDeleted.includes(e.openedCollectionId)&&(e.openedCollectionId=null);e.notesEverDeleted.includes(e.openedWorkspaceId)&&(e.openedWorkspaceId=null);e.workspaceIds=e.workspaceIds.filter((function(t){return!e.notesEverDeleted.includes(t)})),t.notesOrder.length===e.notes.size?e.notesOrder=t.notesOrder:e.notesOrder=Object(c.a)(new Set([].concat(Object(c.a)(e.notesOrder),Object(c.a)(t.notesOrder))));window.localStorage.setItem("notes-order",JSON.stringify(e.notesOrder)),window.localStorage.setItem("notes-ever-deleted",JSON.stringify(e.notesEverDeleted)),e.checkedAgainstDrive=!0,n(e)}(t,d,n):W(t,e,o,r,i,n)}else W(t,e,o,r,i,n)})):a?(t.notesOrder=Object(c.a)(t.notes.keys()),t.checkedAgainstDrive=!0,x(t),n(t)):W(t,e,o,r,i,n)}function C(e,t,n,o,r,i,c,a,s){s||(s=0),O(n.result.files[o].id).then((function(s){return function(e,t,n,o,r,i,c,a,s){var d=JSON.parse(n.result.files[r].description);d.text=o.body,d.version=n.result.files[r].appProperties.version,e.notes.set(d.id,d),ae.notes.put(d).then(Object(f.d)(d)),t.finishedProcesses+=1,a((function(e){return e-1})),t.finishedProcesses===n.result.files.length&&(n.result.nextPageToken?D(e,t,i,c,a,s,n.result.nextPageToken):A(t,e,s,i,c,a,!0))}(e,t,n,s,o,r,i,c,a)})).catch((function(d){return m(d,s,C,e,t,n,o,r,i,c,a)}))}function D(e,t,n,o,r,i,c,a){a||(a=0),window.gapi.client.drive.files.list({fields:"nextPageToken, files(description, id, name, appProperties)",q:"mimeType='application/json' and trashed=false and '"+ce+"' in parents",pageToken:c}).then((function(c){!function(e,t,n,o,r,i,c){t.finishedProcesses=0;for(var a=0;a<n.result.files.length;a++){var s=n.result.files[a],d=s.name;if("___config"===d)t.configFound=s.id,t.finishedProcesses+=1;else if(o.includes(d))t.finishedProcesses+=1;else{t.set(d,s.appProperties.version);var l=e.notes.get(d);!l||s.appProperties.version>l.version?(t.mightNeedUpdate=!1,C(e,t,n,a,o,r,i,c),i((function(e){return e+1}))):t.finishedProcesses+=1}}t.mightNeedUpdate?n.result.nextPageToken?D(e,t,o,r,i,c,n.result.nextPageToken):A(t,e,c,o,r,i):t.mightNeedUpdate||n.result.nextPageToken||t.finishedProcesses!==n.result.files.length||A(t,e,c,o,r,i,!0)}(e,t,c,n,o,r,i)})).catch((function(s){return m(s,a,D,e,t,n,o,r,i,c)}))}function W(e,t,n,o,r,i){var c,a=0,d=Object(T.a)(e.notes);try{for(d.s();!(c=d.n()).done;){var l=Object(s.a)(c.value,2),u=l[0],f=l[1],h=t.get(u);(!h||h<f.version)&&j(u,a+=1,r)}}catch(b){d.e(b)}finally{d.f()}var p,g=Object(T.a)(n);try{var v=function(){var e=p.value;a+=1,setTimeout((function(){N({id:e},n,o)}),200*a)};for(g.s();!(p=g.n()).done;)v()}catch(b){g.e(b)}finally{g.f()}e.checkedAgainstDrive=!0,!a&&t.configFound||x(e),i(e)}function F(e,t){for(var n=[],o=[],r=[],i=0;i<e.notesOrder.length;i++){var a=e.notesOrder[i],s=e.notes.get(a);s?(o=[],s.preview.replace(/(<([^>]+)>)/gi,"").toLowerCase().includes(t.searchText)&&((o=[s]).length&&t.collectionFilter&&t.threadFilter?s.thread.length||s.collection.length||(o=[]):o.length&&t.threadFilter?s.thread.length||(o=[]):o.length&&t.collectionFilter&&(s.collection.length||(o=[])),o.length&&e.openedCollectionId&&(e.notes.get(e.openedCollectionId).collection.includes(s.id)||(o=[])),o.length&&(n=s.pinned?[Object(f.c)(o[0])].concat(Object(c.a)(n)):[].concat(Object(c.a)(n),[Object(f.c)(o[0])])))):(r.push(i),J("noteOfSearchNotFoundError!",a,e))}r.length&&(e.notesOrder=U(r,e.notesOrder),window.localStorage.setItem("notes-order",JSON.stringify(e.notesOrder))),e.notesOrder.length!==e.notes.size&&(e.notesOrder=Object(c.a)(e.notes.keys()),window.localStorage.setItem("notes-order",JSON.stringify(e.notesOrder)),window.alert("-------- BETA VERSION ERROR REPORT ------- \n---- PLEASE SHARE WITH THE DEVELOPER --- \nalong with some info about what you did to get here \nEMAIL: nicolamendini0@gmail.com \nTHANK YOU!\n\nERROR: \nThe order of the notes was lost")),e.search=n}function M(e){var t=[],n=e.workspaceIds.flatMap((function(n,o){return L(e,n,o,t,"noteOfWorkspaceNotFoundError!")}));e.workspace=n,t.length&&(e.workspaceIds=U(t,e.workspaceIds))}function R(e,t,n){if(e.selectedNoteId){var o=e.notes.get(e.selectedNoteId),r=[];t?(e.links=o.roots.flatMap((function(t,n){return L(e,t,n,r,"noteOfLinksNotFoundError")})),r.length&&(o.roots=U(r,o.roots),I(o,"meta",n))):(e.links=o.branches.flatMap((function(t,n){return L(e,t,n,r,"noteOfLinksNotFoundError")})),r.length&&(o.branches=U(r,o.branches),I(o,"meta",n)))}else e.links=[]}function U(e,t){return t.filter((function(t,n){return!e.includes(n)}))}function L(e,t,n,o,r){return e.notes.get(t)?[Object(f.c)(e.notes.get(t))]:(o.push(n),J(r,t,e),[])}function J(e,t,n){window.alert("-------- BETA VERSION ERROR REPORT ------- \n---- PLEASE SHARE WITH THE DEVELOPER --- \nalong with some info about what you did to get here \nEMAIL: nicolamendini0@gmail.com \nTHANK YOU!\n\nERROR: \n"+e+"\n\nNOTE: \n"+t+"\n\n\nNOTES-ORDER: \n"+n.notesOrder+"\n\nLINKS: \n"+n.links+"\n\nWORKSPACE-IDS: \n"+n.workspaceIds)}function G(e,t,n){e.openedWorkspaceId===t||(e.workspaceIds=Object(f.a)(e.workspaceIds,n,t),e.selectedNoteId=t)}function H(e,t){var n=!e.branches.includes(t.id),o=e.id!==t.id,r=e.branches.length<te,i=!t.roots.includes(e.id),c=t.roots.length<te;if(n&&o&&r&&i&&c)return e.branches.push(t.id),t.roots.push(e.id),!0}function B(e,t,n){var o,r=Object(T.a)(e.notes);try{for(r.s();!(o=r.n()).done;)for(var i=Object(s.a)(o.value,2)[1],c=1;c<i.thread.length;c++)if(i.thread[c-1]===t.id&&i.thread[c]===n.id)return alert("The link you are tying to delete is used in the Thread : "+Object(f.e)(i)+"... \nPlease restructure this Thread it if you desire to proceed."),!1}catch(d){r.e(d)}finally{r.f()}var a=t.branches.findIndex((function(e){return e===n.id}));return-1!==a&&(t.branches=Object(f.h)(t.branches,a)),-1!==(a=n.roots.findIndex((function(e){return e===t.id})))&&(n.roots=Object(f.h)(n.roots,a)),!0}function _(e,t,n){for(var o=1;o<t.length;o++){var r=e.notes.get(t[o-1]),i=e.notes.get(t[o]);H(r,i)&&(I(r,"meta",n),I(i,"meta",n))}}function z(e,t,n,o){q(!0,t,n,o);var r=t.notes.get(t.selectedNoteId);t.workspaceIds=e?r.thread:r.collection,t.openedWorkspaceId=t.selectedNoteId}function q(e,t,n,o){if(t.openedWorkspaceId||!t.workspaceIds.length||e||window.confirm("You have an "+(o?"unsaved thread":"unsaved collection")+", do you wish to delete it and clean the Workspace?")){if(t.openedWorkspaceId){var r=t.notes.get(t.openedWorkspaceId);o?(r.thread=t.workspaceIds,_(t,r.thread,n)):r.collection=t.workspaceIds,t.openedWorkspaceId=null,I(r,"meta",n)}t.workspaceIds=[]}}function K(e,t,n,o,r,i,c){if(t)e.id!==o.selectedNoteId?e.thread.length&&o.notes.get(o.selectedNoteId).collection.length||o.notes.get(o.selectedNoteId).thread.length&&e.collection.length?alert(h.h):c(o.notes.get(o.selectedNoteId),e):n(!1);else if(!o.selectedNoteId||o.selectedNoteId!==e.id){var s=Object(a.a)({},o);s.selectedNoteId=e.id,i(s),r(s)}}function V(e,t,n,o,r,i,c,s,d,l){if(null!==l.destination)if(n)alert(h.a);else if("search-area"===l.source.droppableId){if("workspace-area"===l.destination.droppableId){var u=e.search[l.source.index].id;if(e.workspaceIds.length>ne)alert(h.n);else if(o){var p=Object(a.a)({},e);G(p,u,l.destination.index),R(p,i,s),M(p),t(p)}else if((!e.openedWorkspaceId||e.openedWorkspaceId&&e.openedWorkspaceId!==u)&&!e.workspaceIds.includes(u)){var g=Object(a.a)({},e);g.workspaceIds.push(u),M(g),t(g)}}else if("branches-area"===l.destination.droppableId){var v=Object(a.a)({},e),b=v.notes.get(e.search[l.source.index].id),w=v.notes.get(e.selectedNoteId);i?H(b,w)&&(I(w,"meta",s),I(b,"meta",s)):H(w,b)&&(I(w,"meta",s),I(b,"meta",s)),R(v,i,s),t(v)}else if("wrapper-area"===l.destination.droppableId){var O=Object(a.a)({},e),m=e.search[l.source.index];e.workspaceIds.length>0?function(e,t,n,o){if(!e.notes.get(t).thread.length&&!e.notes.get(t).collection.length)if(e.workspaceIds.includes(t))alert(h.b);else{var r=e.notes.get(t);o?(r.thread=e.workspaceIds,r.color="#fef3bd",r.colorPreview="#fccb00",_(e,r.thread,n)):(r.collection=e.workspaceIds,r.color="#c4def6",r.colorPreview="#1273de"),e.selectedNoteId=t,z(o,e,n,o),I(r,"meta",n)}}(O,m.id,s,o):m.thread.length?(O.selectedNoteId=m.id,z(!0,O,s,o),r(!0)):m.collection.length&&(O.selectedNoteId=m.id,z(!1,O,s,o),r(!1)),d(O)}else if("search-area"===l.destination.droppableId){if(l.source.index!==l.destination.index){var j=e.search[l.source.index],k=e.search[l.destination.index];if(!k.pinned&&!j.pinned){var y=Object(a.a)({},e);y.notesOrder=Object(f.g)(e.notesOrder,e.notesOrder.findIndex((function(e){return e===j.id})),e.notesOrder.findIndex((function(e){return e===k.id}))),window.localStorage.setItem("notes-order",JSON.stringify(y.notesOrder)),ie&&x(y),F(y,c),t(y)}}}else if("search-bar"===l.destination.droppableId){var S=Object(a.a)({},e),N=e.search[l.source.index];S.openedCollectionId=N.id,F(S,c),t(S)}}else if("workspace-area"===l.source.droppableId){if("search-area"===l.destination.droppableId){var P=Object(a.a)({},e);P.workspaceIds=Object(f.h)(P.workspaceIds,l.source.index),l.source.index>0&&o&&(P.selectedNoteId=P.workspaceIds[l.source.index-1],R(P,i,s)),M(P),t(P)}else if("workspace-area"===l.destination.droppableId){var E=Object(a.a)({},e);E.workspaceIds=Object(f.g)(E.workspaceIds,l.source.index,l.destination.index),M(E),t(E)}}else if("branches-area"===l.source.droppableId)if("search-area"===l.destination.droppableId){var T=Object(a.a)({},e),A=T.notes.get(e.links[l.source.index].id),C=T.notes.get(e.selectedNoteId);i?B(T,A,C)&&(I(C,"meta",s),I(A,"meta",s)):B(T,C,A)&&(I(C,"meta",s),I(A,"meta",s)),R(T,i,s),F(T,c),t(T)}else if("workspace-area"===l.destination.droppableId)if(e.workspaceIds.length>ne)alert(h.n);else{var D=Object(a.a)({},e);G(e.links[l.source.index].id,l.destination.index),R(D,i,s),M(D),t(D)}}function Y(e,t,n,o,r,i,a,d,l){var u=n.notes.get(e);if(Object(f.b)(n,e)||o){n.notes.delete(e),n.notesOrder=Object(f.h)(n.notesOrder,n.notesOrder.findIndex((function(t){return t===e})));var p=[].concat(Object(c.a)(i),[e]);if(a(p),n.notesEverDeleted.push(e),window.localStorage.setItem("notes-order",JSON.stringify(n.notesOrder)),window.localStorage.setItem("deleted-notes",JSON.stringify(p)),window.localStorage.setItem("notes-ever-deleted",JSON.stringify(n.notesEverDeleted)),o)r(!1);else{var g,v=Object(T.a)(n.notes);try{for(v.s();!(g=v.n()).done;){var b=Object(s.a)(g.value,2)[1],w=b.collection.findIndex((function(t){return t===e}));-1!==w&&(b.collection=Object(f.h)(b.collection,w),I(b,"meta",d))}}catch(O){v.e(O)}finally{v.f()}n.openedWorkspaceId===e&&(n.openedWorkspaceId=null),n.openedCollectionId===e&&(n.openedCollectionId=null),n.selectedNoteId===e&&(n.selectedNoteId=null)}ie&&(N(u,p,a,d),x(n)),ae.notes.delete(e),l(n)}else(t||window.confirm(h.e))&&(!function(e,t,n){var o,r=!1,i=Object(T.a)(e.notes);try{for(i.s();!(o=i.n()).done;){var c=Object(s.a)(o.value,2)[1];c.branches.includes(t)&&(c.branches=c.branches.filter((function(e){return e!==t})),r=!0),c.roots.includes(t)&&(c.roots=c.roots.filter((function(e){return e!==t})),r=!0),c.thread.includes(t)&&(c.thread=c.thread.filter((function(e){return e!==t})),_(e,c.thread,n),r=!0),r&&I(c,"meta",n),r=!1}}catch(O){i.e(O)}finally{i.f()}}(n,e,d),Y(e,!1,n,o,r,i,a,d,l))}function $(e,t,n,o,r,i,d,l){var u=Object(c.a)(new Set([].concat(Object(c.a)(e.branches),Object(c.a)(t.branches)))),p=Object(c.a)(new Set([].concat(Object(c.a)(e.roots),Object(c.a)(t.roots)))),g=Object(c.a)(new Set([].concat(Object(c.a)(e.collection),Object(c.a)(t.collection)))),v=[].concat(Object(c.a)(e.thread),Object(c.a)(t.thread));return u.length>te||p.length>te?(alert(h.i),void n(!1)):g.length>ne||v.length>ne?(alert(h.l),void n(!1)):void ae.notes.get(e.id).then((function(c){return ae.notes.get(t.id).then((function(b){var w=c.text+" "+b.text;if(w.length>oe)return alert(h.k),void n(!1);var O=Object(a.a)({},o),m={id:e.id,text:w,branches:u,roots:p,thread:v,collection:g,pinned:e.pinned||t.pinned,color:"#ffffff"!==e.color?e.color:t.color,colorPreview:"#ffffff"!==e.colorPreview?e.colorPreview:t.colorPreview,version:e.version};Object(f.i)(m),m.branches=m.branches.filter((function(n){return n!==e.id&&n!==t.id})),m.roots=m.roots.filter((function(n){return n!==e.id&&n!==t.id})),m.collection=m.collection.filter((function(n){return n!==e.id&&n!==t.id})),m.thread=m.thread.filter((function(n){return n!==e.id&&n!==t.id})),_(O,m.thread,r),O.notes.set(m.id,m);var j,k=!1,y=Object(T.a)(O.notes);try{for(y.s();!(j=y.n()).done;){var x=Object(s.a)(j.value,2)[1];x.thread.includes(t.id)&&(x.thread=x.thread.flatMap((function(n){return n===t.id?[e.id]:[n]})),k=!0),x.collection.includes(t.id)&&(x.collection.includes(m.id)||x.collection.push(m.id),x.collection=x.collection.filter((function(e){return e!==t.id})),k=!0),x.branches.includes(t.id)&&(x.branches.includes(m.id)||H(x,m),x.branches=x.branches.filter((function(e){return e!==t.id})),k=!0),x.roots.includes(t.id)&&(x.roots.includes(m.id)||H(m,x),x.roots=x.roots.filter((function(e){return e===t.id})),k=!0),k&&I(x,"meta",r),k=!1}}catch(S){y.e(S)}finally{y.f()}!i&&o.workspaceIds.includes(e.id)?O.workspaceIds=O.workspaceIds.filter((function(e){return e!==t.id})):O.workspaceIds=O.workspaceIds.flatMap((function(n){return n===t.id?[e.id]:[n]})),O.openedCollectionId===t.id&&(O.openedCollectionId=m.id),O.openedWorkspaceId!==t.id&&O.openedWorkspaceId!==e.id||(O.openedWorkspaceId=m.id,O.workspaceIds=O.workspaceIds.filter((function(n){return n!==t.id&&n!==e.id}))),O.selectedNoteId=m.id,I(m,"both",r),l(t.id,!1,O),d(O)}))}))}var Q=n(7),X=l.a.lazy((function(){return Promise.all([n.e(0),n.e(1),n.e(4),n.e(8)]).then(n.bind(null,295))})),Z=l.a.lazy((function(){return Promise.all([n.e(0),n.e(7)]).then(n.bind(null,296))})),ee=l.a.lazy((function(){return Promise.all([n.e(1),n.e(6),n.e(9)]).then(n.bind(null,294))})),te=150,ne=300,oe=1048576,re=200,ie=!1,ce="",ae=new u.a("notes-db");ae.version(1).stores({notes:"id, text, preview, branches, roots, thread, collection, pinned, color, colorPreview, attachedImg, version"});t.f=function(e){var t=e.signInFunction,n=e.signOutFunction,o=e.GAPIloaded,l=e.currentUser,u=Object(d.useState)({notes:new Map,notesOrder:[],notesEverDeleted:[],workspaceIds:[],selectedNoteId:null,openedCollectionId:null,openedWorkspaceId:null,search:[],links:[],workspace:[],checkedAgainstDrive:!0}),p=Object(s.a)(u,2),g=p[0],v=p[1],b=Object(d.useState)({searchText:"",threadFilter:!1,collectionFilter:!1}),w=Object(s.a)(b,2),O=w[0],m=w[1],j=Object(d.useState)([]),k=Object(s.a)(j,2),y=k[0],S=k[1],N=Object(d.useState)(!1),T=Object(s.a)(N,2),A=T[0],C=T[1],W=Object(d.useState)(!1),U=Object(s.a)(W,2),L=U[0],J=U[1],G=Object(d.useState)(!1),H=Object(s.a)(G,2),B=H[0],_=H[1],z=Object(d.useState)("notes"),te=Object(s.a)(z,2),ne=te[0],oe=te[1],re=Object(d.useState)(null),se=Object(s.a)(re,2),de=se[0],le=se[1],ue=Object(d.useState)(!1),fe=Object(s.a)(ue,2),he=fe[0],pe=fe[1],ge=Object(d.useState)(0),ve=Object(s.a)(ge,2),be=ve[0],we=ve[1];Object(d.useEffect)((function(){var e=Object(a.a)({},g);ae.notes.toArray().then((function(t){t.forEach((function(t){e.notes.set(t.id,t),Object(f.d)(t)}));var n=JSON.parse(window.localStorage.getItem("notes-order")),o=JSON.parse(window.localStorage.getItem("deleted-notes")),r=JSON.parse(window.localStorage.getItem("notes-ever-deleted"));e.notesOrder=n||Object(c.a)(e.notes.keys()),o&&S(o),r&&(e.notesEverDeleted=r),Ie(e)}))}),[]),Object(d.useEffect)((function(){var e=Object(a.a)({},g);ke(e),v(e)}),[A]),Object(d.useEffect)((function(){var e=Object(a.a)({},g);je(e),v(e)}),[O]),Object(d.useEffect)((function(){ie=!1,o&&l&&(ie=!0,E(le))}),[o,l]),Object(d.useEffect)((function(){ce=de,o&&l&&de&&Oe()}),[de,o,l]);var Oe=function(){g.checkedAgainstDrive&&(console.log("synching"),g.checkedAgainstDrive=!1,function(e,t,n,o,r,i){i||(i=0);var c=new Map;c.configFound=!1,c.finishedProcesses=0,c.mightNeedUpdate=!0,D(e,c,t,n,o,r)}(Object(a.a)({},g),y,S,we,Ie))},me=function(){var e=Object(i.a)(r.a.mark((function e(t,n){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:I(t,n,we);case 1:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),Ie=function(){var e=Object(i.a)(r.a.mark((function e(t){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:je(t),ke(t),M(t),v(t);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),je=function(){var e=Object(i.a)(r.a.mark((function e(t){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:F(t,O);case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),ke=function(){var e=Object(i.a)(r.a.mark((function e(t){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:R(t,A,we);case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),ye=function(){var e=Object(i.a)(r.a.mark((function e(){var t,n,o;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=Object(a.a)({},g),n=Object(f.f)(),t.notesOrder=[n.id].concat(Object(c.a)(t.notesOrder)),window.localStorage.setItem("notes-order",JSON.stringify(t.notesOrder)),t.notes.set(n.id,n),t.selectedNoteId=n.id,t.openedCollectionId&&((o=t.notes.get(t.openedCollectionId)).collection.push(n.id),me(o,"meta")),Ie(t),oe("editor"),me(n,"meta"),ie&&x(t);case 11:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),xe=function(){var e=Object(i.a)(r.a.mark((function e(t,n){var o;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:o=Object(a.a)({},g),"get-occurrences"===n&&Ce(o),o.notes.set(t.id,t),o.selectedNoteId=t.id,me(t,"both"),Ie(o);case 6:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),Se=function(){var e=Object(i.a)(r.a.mark((function e(t,n,o){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:o||(o=Object(a.a)({},g)),Y(t,n,o,B,_,y,S,we,Ie),B&&_(!1);case 3:case"end":return e.stop()}}),e)})));return function(t,n,o){return e.apply(this,arguments)}}(),Ne=function(){var e=Object(i.a)(r.a.mark((function e(t){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:V(g,v,B,L,J,A,O,we,Ie,t);case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),Pe=function(){var e=Object(i.a)(r.a.mark((function e(){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:g.workspaceIds.length?alert(h.d):J(!L);case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),Ee=function(){var e=Object(i.a)(r.a.mark((function e(t){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:K(t,B,_,g,v,ke,Te);case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),Te=function(){var e=Object(i.a)(r.a.mark((function e(t,n){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:$(t,n,_,g,we,L,Ie,Se);case 1:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),Ae=function(){var e=Object(i.a)(r.a.mark((function e(t,n){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n||(n=Object(a.a)({},g)),q(t,n,we,L),t||Ie(n);case 3:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),Ce=function(){var e=Object(i.a)(r.a.mark((function e(t){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:Ae(!0,t),t.workspaceIds=g.notesOrder.filter((function(e){return g.notes.get(e).thread.includes(g.selectedNoteId)||g.notes.get(e).collection.includes(g.selectedNoteId)})),J(!1);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),De=function(){var e=Object(i.a)(r.a.mark((function e(){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:P(g);case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),We=function(){var e=Object(i.a)(r.a.mark((function e(){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:ae.notes.get(g.selectedNoteId).then((function(e){g.notes.set(g.selectedNoteId,e),oe("editor")}));case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),Fe=function(){var e=Object(i.a)(r.a.mark((function e(){var t;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:(t=Object(a.a)({},g)).openedCollectionId=null,je(t),v(t);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(Q.jsxs)("div",{children:["notes"===ne&&Object(Q.jsx)(d.Suspense,{fallback:f.j,children:Object(Q.jsx)(ee,{darkMode:he,dashboard:g,handleOnDragEnd:Ne,GAPIloaded:o,currentUser:l,setCurrentPage:oe,notesUpdating:be,setDarkMode:pe,closeCollection:Fe,addNote:ye,selectNote:Ee,mergeMode:B,setMergeMode:_,openEditor:We,rootsOrBranches:A,closeAndSave:Ae,threadOrCollection:L,threadOrCollectionManage:Pe,setRootsOrBranches:C,searchProps:O,setSearchProps:m,synchNotes:Oe})}),"editor"===ne&&g.selectedNoteId&&Object(Q.jsx)(d.Suspense,{fallback:f.j,children:Object(Q.jsx)(X,{setCurrentPage:oe,selectedNote:g.notes.get(g.selectedNoteId),updateNote:xe,deleteNote:Se,darkMode:he,exportThread:De})}),Object(Q.jsx)("iframe",{title:"printer",id:"ifmcontentstoprint",style:{height:"0px",width:"0px",position:"absolute",border:"0"}}),"settings"===ne&&Object(Q.jsx)(d.Suspense,{fallback:f.j,children:Object(Q.jsx)(Z,{setCurrentPage:oe,signInFunction:t,signOutFunction:n,loadedUser:l,GAPIloaded:o})})]})}},3:function(e,t,n){"use strict";n.d(t,"a",(function(){return u})),n.d(t,"h",(function(){return f})),n.d(t,"g",(function(){return h})),n.d(t,"e",(function(){return p})),n.d(t,"b",(function(){return g})),n.d(t,"c",(function(){return v})),n.d(t,"d",(function(){return b})),n.d(t,"f",(function(){return w})),n.d(t,"i",(function(){return O})),n.d(t,"j",(function(){return m}));var o=n(5),r=n(2),i=n(16),c=n(13),a=n(18),s=n.n(a),d=(n(0),n(7)),l=n(55);function u(e,t,n){return[].concat(Object(r.a)(e.slice(0,t)),[n],Object(r.a)(e.slice(t)))}function f(e,t){return[].concat(Object(r.a)(e.slice(0,t)),Object(r.a)(e.slice(t+1)))}function h(e,t,n){var o=f(e,t),i=e[t];return o=[].concat(Object(r.a)(o.slice(0,n)),[i],Object(r.a)(o.slice(n)))}function p(e){return t=e.preview.replace(/<[^>]*>?/gm,""),n=35,t.substr(0,n-1)+(t.length>n?"...":"");var t,n}function g(e,t){return e.notesOrder.reduce((function(n,o){return n&&!e.notes.get(o).thread.includes(t)&&!e.notes.get(o).branches.includes(t)}),!0)}function v(e){return{ui_id:Object(i.a)(),id:e.id,text:e.text,preview:e.preview,branches:e.branches,roots:e.roots,thread:e.thread,collection:e.collection,pinned:e.pinned,color:e.color,colorPreview:e.colorPreview,attachedImg:e.attachedImg}}function b(e){if(e.attachedImg.length){var t=Object(o.a)(e.attachedImg,3),n=t[0],r=t[1];t[2]&&e.text.length>r-n&&(e.text=e.text.substring(n,r))}else delete e.text}function w(){return{id:Object(i.a)(),text:"",preview:"",branches:[],roots:[],thread:[],collection:[],pinned:!1,color:"#ffffff",colorPreview:"#ffffff",attachedImg:!1,version:0}}function O(e){var t=/<img src=.*?>/gm.exec(e.text);if(t){var n=""===e.text.substring(0,t.index).replace(/(<([^>]+)>)|(\s|(&nbsp))*/gm,"");e.attachedImg=[t.index+10,t.index+t[0].length-2,n]}else e.attachedImg=!1;var o=l(e.text.replace(/<p><br\/><\/p>|<p>(\s|(&nbsp))*<\/p>|<img .*?>/gm,""),c.b).html;""===o.replace(/(<([^>]+)>)/gi,"")&&(o=e.attachedImg?"image only note":"empty note kept for its links"),e.preview=o}var m=Object(d.jsx)("div",{style:{justifyContent:"center",display:"flex"},children:Object(d.jsx)(s.a,{type:"ThreeDots",color:"#c6c6c6",height:50,width:50,style:{marginTop:"25%"}})})},32:function(e,t,n){},63:function(e,t,n){"use strict";n.r(t);var o=n(0),r=n.n(o),i=n(17),c=n.n(i),a=(n(32),n(1)),s=n.n(a),d=n(6),l=n(23),u=n(24),f=n(27),h=n(26),p=n(13),g=n(7),v="https://www.googleapis.com/auth/drive.file",b="https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",w=function(e){Object(f.a)(n,e);var t=Object(h.a)(n);function n(){var e;Object(l.a)(this,n);for(var o=arguments.length,r=new Array(o),i=0;i<o;i++)r[i]=arguments[i];return(e=t.call.apply(t,[this].concat(r))).state={googleAuth:"",currentUser:localStorage.getItem("currentUser"),loaded:!1,driveFolderId:"",onlineState:window.navigator.onLine},e.initScript=Object(d.a)(s.a.mark((function t(){var n;return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:(n=document.querySelector("meta[name=viewport]")).setAttribute("content",n.content+", height="+window.innerHeight+", user-scalable=no"),window.addEventListener("online",(function(){return e.setState({onlineState:!0})})),window.addEventListener("offline",(function(){return e.setState({onlineState:!1})})),e.state.onlineState&&e.loadGAPI();case 5:case"end":return t.stop()}}),t)}))),e.loadGAPI=Object(d.a)(s.a.mark((function t(){var n;return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:(n=document.createElement("script")).onload=e.handleClientLoad,n.src="https://apis.google.com/js/api.js",document.body.appendChild(n),console.log("loadingGAPI");case 5:case"end":return t.stop()}}),t)}))),e.initClient=Object(d.a)(s.a.mark((function t(){return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:try{window.gapi.client.init({apiKey:"AIzaSyDmfaKWGbmsMVLYu1nu83egzWI30vgyD-0",clientId:"455375017729-n44ea0ohjt7hb6jpi5ks56ej89cppv93.apps.googleusercontent.com",scope:v,discoveryDocs:[b]}).then((function(){e.setState({googleAuth:window.gapi.auth2.getAuthInstance(),loaded:!0}),e.state.googleAuth.isSignedIn.listen(e.updateSigninStatus),e.state.googleAuth.then(e.setSigninStatus())}))}catch(n){console.log(n)}case 1:case"end":return t.stop()}}),t)}))),e.signInFunction=function(){e.state.googleAuth.signIn()},e.signOutFunction=function(){e.state.googleAuth.signOut()},e.updateSigninStatus=function(){e.setSigninStatus()},e.setSigninStatus=function(){var t=e.state.googleAuth.currentUser.get();t.isSignedIn()?t.hasGrantedScopes(v)&&localStorage.setItem("currentUser",t.getBasicProfile().getName()):localStorage.setItem("currentUser",null);e.setState({currentUser:localStorage.getItem("currentUser")})},e.handleClientLoad=function(){window.gapi.load("client:auth2",e.initClient)},e}return Object(u.a)(n,[{key:"componentDidMount",value:function(){this.initScript()}},{key:"componentDidUpdate",value:function(){this.state.onlineState&&!this.state.loaded&&this.loadGAPI()}},{key:"render",value:function(){console.log(localStorage.getItem("currentPage")),console.log(localStorage.getItem("currentUser"));var e=null!==this.state.currentUser&&"null"!==this.state.currentUser;return Object(g.jsx)(p.f,{signInFunction:this.signInFunction,signOutFunction:this.signOutFunction,GAPIloaded:this.state.loaded&&this.state.onlineState,currentUser:e})}}]),n}(o.Component),O=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function m(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://cra.link/PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}var I=function(e){e&&e instanceof Function&&n.e(10).then(n.bind(null,293)).then((function(t){var n=t.getCLS,o=t.getFID,r=t.getFCP,i=t.getLCP,c=t.getTTFB;n(e),o(e),r(e),i(e),c(e)}))};c.a.render(Object(g.jsx)(r.a.StrictMode,{children:Object(g.jsx)(w,{})}),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/thinkythreads",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="".concat("/thinkythreads","/service-worker.js");O?(!function(e,t){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(n){var o=n.headers.get("content-type");404===n.status||null!=o&&-1===o.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):m(e,t)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://cra.link/PWA")}))):m(t,e)}))}}(),I()},9:function(e,t,n){"use strict";n.d(t,"b",(function(){return o})),n.d(t,"d",(function(){return r})),n.d(t,"c",(function(){return i})),n.d(t,"j",(function(){return c})),n.d(t,"f",(function(){return a})),n.d(t,"m",(function(){return s})),n.d(t,"g",(function(){return d})),n.d(t,"a",(function(){return l})),n.d(t,"n",(function(){return u})),n.d(t,"e",(function(){return f})),n.d(t,"i",(function(){return h})),n.d(t,"l",(function(){return p})),n.d(t,"k",(function(){return g})),n.d(t,"h",(function(){return v}));var o="cannot insert a note inside its own Thread or Collection",r="Please clean your workspace before changing between Thread Mode and Collection Mode.",i="Character limit reached. Additional content will not be saved. Please start a new note instead.",c="Merge Mode is on, please select another card to merge to the pink card. The content, links and references of the card you select will be copied. If you want to exit it, press the button again.",a="Google Drive is not connected. Please Login from the Settings page to allow the backup.",s="------------------------------------------------------------ new note ---------------------------------------------------",d="--------------------------------------------------------- exported thread -------------------------------------------\n",l="Merge Mode is on. Please finish merging or exit the Merge Mode before doing anything else.",u="Workspace length limit reached. Please save and start a new Workspace instead.",f="The note you want to delete compares in the branches of other notes. If you proceed, the system will automatically redirect the links of the other notes to preserve the connectivity. Otherwise, please restructure your links manually until this alert disappears.",h="The number of links of the resulting note would exceed the limit. Please remove some links to continue.",p="The size of the Thread or Collection of the resulting note would exceed the limit. Please remove some notes manually to continue.",g="The size of the resulting text exceeds the limit. Please shorten some text to continue.",v="Both the cards contain a Thread or a Collection and this generates a conflict in the mergin process. Please empty the Thread or Collection of one of the two notes and try again."}},[[63,3,5]]]);
//# sourceMappingURL=main.9a2da754.chunk.js.map