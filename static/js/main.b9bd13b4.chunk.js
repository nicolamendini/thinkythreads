(this.webpackJsonpthinkythreads=this.webpackJsonpthinkythreads||[]).push([[2],{13:function(e,t,n){"use strict";n.d(t,"a",(function(){return te})),n.d(t,"d",(function(){return ne})),n.d(t,"c",(function(){return re})),n.d(t,"b",(function(){return oe})),n.d(t,"g",(function(){return ie})),n.d(t,"h",(function(){return ce})),n.d(t,"e",(function(){return ae}));var r=n(1),o=n.n(r),i=n(6),c=n(2),a=n(4),s=n(5),d=n(0),l=n.n(d),u=n(25),f=n(3),h=n(9);function p(e,t){return window.gapi.client.request({path:"upload/drive/v3/files/"+t,method:"PATCH",params:{uploadType:"media"},body:e.text})}function g(e){return{description:JSON.stringify({id:e.id,preview:e.preview,branches:e.branches,roots:e.roots,thread:e.thread,collection:e.collection,pinned:e.pinned,color:e.color,colorPreview:e.colorPreview,attachedImg:e.attachedImg}),appProperties:{version:e.version}}}function b(e,t){return window.gapi.client.request({path:"drive/v3/files/"+t,method:"PATCH",body:g(e)})}function v(e,t){return t||(t=g(e)),t.mimeType="application/json",t.name=e.id,t.fields="id",t.parents=[ce],window.gapi.client.drive.files.create({resource:t})}function w(e){return window.gapi.client.drive.files.list({q:"name='"+e.id+"' and mimeType='application/json' and trashed=false and '"+ce+"' in parents"})}function O(e){return window.gapi.client.drive.files.get({mimeType:"application/json",fileId:e,alt:"media"})}function m(e,t,n){for(var r=arguments.length,o=new Array(r>3?r-3:0),i=3;i<r;i++)o[i-3]=arguments[i];if(console.error(e),t+=1,e.result&&-1===e.result.error.code&&t<2||t<4)setTimeout((function(){n.apply(void 0,o.concat([t]))}),1e3);else if(n===y){var c=o[2];c((function(e){return e-1}))}}function j(e,t,n){e.version+=1;var r=Object(a.a)({},e);Object(f.d)(e),ie&&(n((function(e){return e+1})),y(r,t,n)),"meta"===t?(delete r.text,ae.notes.update(r.id,r)):ae.notes.put(r)}function I(e,t,n){ae.notes.get(e).then((function(e){return setTimeout((function(){n((function(e){return e+1})),y(e,"both",n)}),200*t)}))}function k(e,t,n){n||(n=0),p({text:JSON.stringify({notesOrder:e.notesOrder})},t).then().catch((function(t){return m(t,n,k,e)}))}function y(e,t,n,r){r||(r=0),w(e).then((function(o){if(o.result.files.length){var i=o.result.files[0].id,c=null;"media"===t||"both"===t?c=p:"meta"===t&&(c=b),c(e,i).then((function(){"both"===t?y(e,"meta",n):(console.log("updated"),n((function(e){return e-1})))})).catch((function(o){return m(o,r,y,e,t,n)}))}else v(e).then((function(){"meta"!==t?y(e,"media",n):n((function(e){return e-1}))})).catch((function(o){return m(o,r,y,e,t,n)}))})).catch((function(o){return m(o,r,y,e,t,n)}))}function x(e,t){e.checkedAgainstDrive?(console.log("updateconfig"),t||(t=0),window.gapi.client.drive.files.list({fields:"files(id)",q:"name='___config' and mimeType='application/json' and trashed=false"}).then((function(n){if(n.result.files.length)k(e,n.result.files[0].id);else{v({id:"___config"},{}).then((function(t){k(e,t.result.id)})).catch((function(n){return m(n,t,x,e)}))}})).catch((function(n){return m(n,t,x,e)}))):console.log("blocked")}function S(e,t,n){console.log("deleted");var r=t.findIndex((function(t){return t===e.id}));if(-1!==r){var o=Object(f.h)(t,r);n(o),window.localStorage.setItem("deleted-notes",JSON.stringify(o))}}function P(e,t,n,r,o){o||(o=0),w(e).then((function(i){i.result.files.length?window.gapi.client.drive.files.delete({fileId:i.result.files[0].id}).then((function(){S(e,t,n)})).catch((function(i){return m(i,o,P,e,t,n,r)})):S(e,t,n)})).catch((function(i){return m(i,o,P,e,t,n,r)}))}function N(e){ae.notes.bulkGet(e.notes.get(e.selectedNoteId).thread).then((function(e){var t=e.map((function(e){return e.text})),n=h.g+t.reduce((function(e,t){return e+h.m+t})),r=document.getElementById("ifmcontentstoprint").contentWindow;r.document.open(),r.document.write(n),r.document.close(),r.focus(),r.print()}))}function T(e,t){console.log("checkingfolder"),t||(t=0),window.gapi.client.drive.files.list({q:"name='thinkythreads-data' and mimeType='application/vnd.google-apps.folder' and trashed=false"}).then((function(n){if(n.result.files.length)n.result.files[0].id!==ce&&e(n.result.files[0].id);else{window.gapi.client.drive.files.create({resource:{name:"thinkythreads-data",mimeType:"application/vnd.google-apps.folder"},fields:"id"}).then((function(t){e(t.result.id)})).catch((function(n){return m(n,t,T,e)}))}})).catch((function(n){return m(n,t,T,e)}))}var E=n(10);function A(e,t,n,r,o,i,a,s,d){var l=JSON.parse(n.result.files[o].description);l.text=r.body,l.version=n.result.files[o].appProperties.version,e.notes.set(l.id,l),ae.notes.put(l).then(Object(f.d)(l)),t.finishedProcesses+=1,s((function(e){return e-1})),t.finishedProcesses===n.result.files.length&&(n.result.nextPageToken?F(e,t,i,a,s,d,n.result.nextPageToken):t.configFound?O(t.configFound).then((function(t){return function(e,t,n){if(""!==t.body){var r=JSON.parse(t.body).notesOrder;r.length===e.notesOrder.length?e.notesOrder=r:e.notesOrder=Object(c.a)(new Set([].concat(Object(c.a)(e.notesOrder),Object(c.a)(r))))}e.checkedAgainstDrive=!0,n(e),window.localStorage.setItem("notes-order",JSON.stringify(e.notesOrder))}(e,t,d)})):(e.notesOrder=Object(c.a)(e.notes.keys()),e.checkedAgainstDrive=!0,x(e),d(e)))}function C(e,t,n,r,o,i,c,a,s){s||(s=0),O(n.result.files[r].id).then((function(s){return A(e,t,n,s,r,o,i,c,a)})).catch((function(d){return m(d,s,C,e,t,n,r,o,i,c,a)}))}function W(e,t,n,r,o,i,c){t.finishedProcesses=0;for(var a=0;a<n.result.files.length;a++){var d=n.result.files[a],l=d.name;if("___config"===l)t.configFound=d.id,t.finishedProcesses+=1;else if(r.includes(l))t.finishedProcesses+=1;else{t.set(l,d.appProperties.version);var u=e.notes.get(l);!u||d.appProperties.version>u.version?(t.mightNeedUpdate=!1,C(e,t,n,a,r,o,i,c),i((function(e){return e+1}))):t.finishedProcesses+=1}}t.mightNeedUpdate&&(n.result.nextPageToken?F(e,t,r,o,i,c,n.result.nextPageToken):function(e,t,n,r,o,i){var c,a=0,d=Object(E.a)(e.notes);try{for(d.s();!(c=d.n()).done;){var l=Object(s.a)(c.value,2),u=l[0],f=l[1],h=t.get(u);(!h||h<f.version)&&I(u,a+=1,o)}}catch(v){d.e(v)}finally{d.f()}var p,g=Object(E.a)(n);try{var b=function(){var e=p.value;a+=1,setTimeout((function(){P({id:e},n,r)}),200*a)};for(g.s();!(p=g.n()).done;)b()}catch(v){g.e(v)}finally{g.f()}e.checkedAgainstDrive=!0,(a||!t.configFound)&&x(e);i(e)}(e,t,r,o,i,c))}function F(e,t,n,r,o,i,c,a){a||(a=0),window.gapi.client.drive.files.list({fields:"nextPageToken, files(description, id, name, appProperties)",q:"mimeType='application/json' and trashed=false and '"+ce+"' in parents",pageToken:c}).then((function(c){W(e,t,c,n,r,o,i)})).catch((function(s){return m(s,a,F,e,t,n,r,o,i,c)}))}function M(e,t){for(var n=[],r=[],o=[],i=0;i<e.notesOrder.length;i++){var a=e.notesOrder[i],s=e.notes.get(a);s?(r=[],s.preview.replace(/(<([^>]+)>)/gi,"").toLowerCase().includes(t.searchText)&&((r=[s]).length&&t.collectionFilter&&t.threadFilter?s.thread.length||s.collection.length||(r=[]):r.length&&t.threadFilter?s.thread.length||(r=[]):r.length&&t.collectionFilter&&(s.collection.length||(r=[])),r.length&&e.openedCollectionId&&(e.notes.get(e.openedCollectionId).collection.includes(s.id)||(r=[])),r.length&&(n=s.pinned?[Object(f.c)(r[0])].concat(Object(c.a)(n)):[].concat(Object(c.a)(n),[Object(f.c)(r[0])])))):(o.push(i),J("noteOfSearchNotFoundError!",a,e))}o.length&&(e.notesOrder=L(o,e.notesOrder),window.localStorage.setItem("notes-order",JSON.stringify(e.notesOrder))),e.notesOrder.length!==e.notes.size&&(e.notesOrder=Object(c.a)(e.notes.keys()),window.localStorage.setItem("notes-order",JSON.stringify(e.notesOrder)),window.alert("-------- BETA VERSION ERROR REPORT ------- \n---- PLEASE SHARE WITH THE DEVELOPER --- \nalong with some info about what you did to get here \nEMAIL: nicolamendini0@gmail.com \nTHANK YOU!\n\nERROR: \nThe order of the notes was lost")),e.search=n}function R(e){var t=[],n=e.workspaceIds.flatMap((function(n,r){return D(e,n,r,t,"noteOfWorkspaceNotFoundError!")}));e.workspace=n,t.length&&(e.workspaceIds=L(t,e.workspaceIds))}function U(e,t,n){if(e.selectedNoteId){var r=e.notes.get(e.selectedNoteId),o=[];t?(e.links=r.roots.flatMap((function(t,n){return D(e,t,n,o,"noteOfLinksNotFoundError")})),o.length&&(r.roots=L(o,r.roots),j(r,"meta",n))):(e.links=r.branches.flatMap((function(t,n){return D(e,t,n,o,"noteOfLinksNotFoundError")})),o.length&&(r.branches=L(o,r.branches),j(r,"meta",n)))}else e.links=[]}function L(e,t){return t.filter((function(t,n){return!e.includes(n)}))}function D(e,t,n,r,o){return e.notes.get(t)?[Object(f.c)(e.notes.get(t))]:(r.push(n),J(o,t,e),[])}function J(e,t,n){window.alert("-------- BETA VERSION ERROR REPORT ------- \n---- PLEASE SHARE WITH THE DEVELOPER --- \nalong with some info about what you did to get here \nEMAIL: nicolamendini0@gmail.com \nTHANK YOU!\n\nERROR: \n"+e+"\n\nNOTE: \n"+t+"\n\n\nNOTES-ORDER: \n"+n.notesOrder+"\n\nLINKS: \n"+n.links+"\n\nWORKSPACE-IDS: \n"+n.workspaceIds)}function G(e,t,n){e.openedWorkspaceId===t||(e.workspaceIds=Object(f.a)(e.workspaceIds,n,t),e.selectedNoteId=t)}function H(e,t){var n=!e.branches.includes(t.id),r=e.id!==t.id,o=e.branches.length<te,i=!t.roots.includes(e.id),c=t.roots.length<te;if(n&&r&&o&&i&&c)return e.branches.push(t.id),t.roots.push(e.id),!0}function B(e,t,n){var r,o=Object(E.a)(e.notes);try{for(o.s();!(r=o.n()).done;)for(var i=Object(s.a)(r.value,2)[1],c=1;c<i.thread.length;c++)if(i.thread[c-1]===t.id&&i.thread[c]===n.id)return alert("The link you are tying to delete is used in the Thread : "+Object(f.e)(i)+"... \nPlease restructure this Thread it if you desire to proceed."),!1}catch(d){o.e(d)}finally{o.f()}var a=t.branches.findIndex((function(e){return e===n.id}));return-1!==a&&(t.branches=Object(f.h)(t.branches,a)),-1!==(a=n.roots.findIndex((function(e){return e===t.id})))&&(n.roots=Object(f.h)(n.roots,a)),!0}function _(e,t,n){for(var r=1;r<t.length;r++){var o=e.notes.get(t[r-1]),i=e.notes.get(t[r]);H(o,i)&&(j(o,"meta",n),j(i,"meta",n))}}function z(e,t,n,r){q(!0,t,n,r);var o=t.notes.get(t.selectedNoteId);t.workspaceIds=e?o.thread:o.collection,t.openedWorkspaceId=t.selectedNoteId}function q(e,t,n,r){if(t.openedWorkspaceId||!t.workspaceIds.length||e||window.confirm("You have an "+(r?"unsaved thread":"unsaved collection")+", do you wish to delete it and clean the Workspace?")){if(t.openedWorkspaceId){var o=t.notes.get(t.openedWorkspaceId);r?(o.thread=t.workspaceIds,_(t,o.thread,n)):o.collection=t.workspaceIds,t.openedWorkspaceId=null,j(o,"meta",n)}t.workspaceIds=[]}}function K(e,t,n,r,o,i,c){if(t)e.id!==r.selectedNoteId?e.thread.length&&r.notes.get(r.selectedNoteId).collection.length||r.notes.get(r.selectedNoteId).thread.length&&e.collection.length?alert(h.h):c(r.notes.get(r.selectedNoteId),e):n(!1);else if(!r.selectedNoteId||r.selectedNoteId!==e.id){var s=Object(a.a)({},r);s.selectedNoteId=e.id,i(s),o(s)}}function V(e,t,n,r,o,i,c,s,d,l){if(null!==l.destination)if(n)alert(h.a);else if("search-area"===l.source.droppableId){if("workspace-area"===l.destination.droppableId){var u=e.search[l.source.index].id;if(e.workspaceIds.length>ne)alert(h.n);else if(r){var p=Object(a.a)({},e);G(p,u,l.destination.index),U(p,i,s),R(p),t(p)}else if((!e.openedWorkspaceId||e.openedWorkspaceId&&e.openedWorkspaceId!==u)&&!e.workspaceIds.includes(u)){var g=Object(a.a)({},e);g.workspaceIds.push(u),R(g),t(g)}}else if("branches-area"===l.destination.droppableId){var b=Object(a.a)({},e),v=b.notes.get(e.search[l.source.index].id),w=b.notes.get(e.selectedNoteId);i?H(v,w)&&(j(w,"meta",s),j(v,"meta",s)):H(w,v)&&(j(w,"meta",s),j(v,"meta",s)),U(b,i,s),t(b)}else if("wrapper-area"===l.destination.droppableId){var O=Object(a.a)({},e),m=e.search[l.source.index];e.workspaceIds.length>0?function(e,t,n,r){if(!e.notes.get(t).thread.length&&!e.notes.get(t).collection.length)if(e.workspaceIds.includes(t))alert(h.b);else{var o=e.notes.get(t);r?(o.thread=e.workspaceIds,o.color="#fef3bd",o.colorPreview="#fccb00",_(e,o.thread,n)):(o.collection=e.workspaceIds,o.color="#c4def6",o.colorPreview="#1273de"),e.selectedNoteId=t,z(r,e,n,r),j(o,"meta",n)}}(O,m.id,s,r):m.thread.length?(O.selectedNoteId=m.id,z(!0,O,s,r),o(!0)):m.collection.length&&(O.selectedNoteId=m.id,z(!1,O,s,r),o(!1)),d(O)}else if("search-area"===l.destination.droppableId){if(l.source.index!==l.destination.index){var I=e.search[l.source.index],k=e.search[l.destination.index];if(!k.pinned&&!I.pinned){var y=Object(a.a)({},e);y.notesOrder=Object(f.g)(e.notesOrder,e.notesOrder.findIndex((function(e){return e===I.id})),e.notesOrder.findIndex((function(e){return e===k.id}))),window.localStorage.setItem("notes-order",JSON.stringify(y.notesOrder)),ie&&x(y),M(y,c),t(y)}}}else if("search-bar"===l.destination.droppableId){var S=Object(a.a)({},e),P=e.search[l.source.index];S.openedCollectionId=P.id,M(S,c),t(S)}}else if("workspace-area"===l.source.droppableId){if("search-area"===l.destination.droppableId){var N=Object(a.a)({},e);N.workspaceIds=Object(f.h)(N.workspaceIds,l.source.index),l.source.index>0&&r&&(N.selectedNoteId=N.workspaceIds[l.source.index-1],U(N,i,s)),R(N),t(N)}else if("workspace-area"===l.destination.droppableId){var T=Object(a.a)({},e);T.workspaceIds=Object(f.g)(T.workspaceIds,l.source.index,l.destination.index),R(T),t(T)}}else if("branches-area"===l.source.droppableId)if("search-area"===l.destination.droppableId){var E=Object(a.a)({},e),A=E.notes.get(e.links[l.source.index].id),C=E.notes.get(e.selectedNoteId);i?B(E,A,C)&&(j(C,"meta",s),j(A,"meta",s)):B(E,C,A)&&(j(C,"meta",s),j(A,"meta",s)),U(E,i,s),M(E,c),t(E)}else if("workspace-area"===l.destination.droppableId)if(e.workspaceIds.length>ne)alert(h.n);else{var W=Object(a.a)({},e);G(e.links[l.source.index].id,l.destination.index),U(W,i,s),R(W),t(W)}}function Y(e,t,n,r,o,i,a,d,l){var u=n.notes.get(e);if(Object(f.b)(n,e)||r){n.notes.delete(e),n.notesOrder=Object(f.h)(n.notesOrder,n.notesOrder.findIndex((function(t){return t===e})));var p=[].concat(Object(c.a)(i),[e]);if(a(p),window.localStorage.setItem("notes-order",JSON.stringify(n.notesOrder)),window.localStorage.setItem("deleted-notes",JSON.stringify(i)),r)o(!1);else{var g,b=Object(E.a)(n.notes);try{for(b.s();!(g=b.n()).done;){var v=Object(s.a)(g.value,2)[1],w=v.collection.findIndex((function(t){return t===e}));-1!==w&&(v.collection=Object(f.h)(v.collection,w),j(v,"meta",d))}}catch(O){b.e(O)}finally{b.f()}n.openedWorkspaceId===e&&(n.openedWorkspaceId=null),n.openedCollectionId===e&&(n.openedCollectionId=null),n.selectedNoteId===e&&(n.selectedNoteId=null)}ie&&(P(u,p,a,d),x(n)),ae.notes.delete(e),l(n)}else(t||window.confirm(h.e))&&(!function(e,t,n){var r,o=!1,i=Object(E.a)(e.notes);try{for(i.s();!(r=i.n()).done;){var c=Object(s.a)(r.value,2)[1];c.branches.includes(t)&&(c.branches=c.branches.filter((function(e){return e!==t})),o=!0),c.roots.includes(t)&&(c.roots=c.roots.filter((function(e){return e!==t})),o=!0),c.thread.includes(t)&&(c.thread=c.thread.filter((function(e){return e!==t})),_(e,c.thread,n),o=!0),o&&j(c,"meta",n),o=!1}}catch(O){i.e(O)}finally{i.f()}}(n,e,d),Y(e,!1,n,r,o,i,a,d,l))}function $(e,t,n,r,o,i,d,l){var u=Object(c.a)(new Set([].concat(Object(c.a)(e.branches),Object(c.a)(t.branches)))),p=Object(c.a)(new Set([].concat(Object(c.a)(e.roots),Object(c.a)(t.roots)))),g=Object(c.a)(new Set([].concat(Object(c.a)(e.collection),Object(c.a)(t.collection)))),b=[].concat(Object(c.a)(e.thread),Object(c.a)(t.thread));return u.length>te||p.length>te?(alert(h.i),void n(!1)):g.length>ne||b.length>ne?(alert(h.l),void n(!1)):void ae.notes.get(e.id).then((function(c){return ae.notes.get(t.id).then((function(v){var w=c.text+" "+v.text;if(w.length>re)return alert(h.k),void n(!1);var O=Object(a.a)({},r),m={id:e.id,text:w,branches:u,roots:p,thread:b,collection:g,pinned:e.pinned||t.pinned,color:"#ffffff"!==e.color?e.color:t.color,colorPreview:"#ffffff"!==e.colorPreview?e.colorPreview:t.colorPreview,version:e.version};Object(f.i)(m),m.branches=m.branches.filter((function(n){return n!==e.id&&n!==t.id})),m.roots=m.roots.filter((function(n){return n!==e.id&&n!==t.id})),m.collection=m.collection.filter((function(n){return n!==e.id&&n!==t.id})),m.thread=m.thread.filter((function(n){return n!==e.id&&n!==t.id})),_(O,m.thread,o),O.notes.set(m.id,m);var I,k=!1,y=Object(E.a)(O.notes);try{for(y.s();!(I=y.n()).done;){var x=Object(s.a)(I.value,2)[1];x.thread.includes(t.id)&&(x.thread=x.thread.flatMap((function(n){return n===t.id?[e.id]:[n]})),k=!0),x.collection.includes(t.id)&&(x.collection.includes(m.id)||x.collection.push(m.id),x.collection=x.collection.filter((function(e){return e!==t.id})),k=!0),x.branches.includes(t.id)&&(x.branches.includes(m.id)||H(x,m),x.branches=x.branches.filter((function(e){return e!==t.id})),k=!0),x.roots.includes(t.id)&&(x.roots.includes(m.id)||H(m,x),x.roots=x.roots.filter((function(e){return e===t.id})),k=!0),k&&j(x,"meta",o),k=!1}}catch(S){y.e(S)}finally{y.f()}!i&&r.workspaceIds.includes(e.id)?O.workspaceIds=O.workspaceIds.filter((function(e){return e!==t.id})):O.workspaceIds=O.workspaceIds.flatMap((function(n){return n===t.id?[e.id]:[n]})),O.openedCollectionId===t.id&&(O.openedCollectionId=m.id),O.openedWorkspaceId!==t.id&&O.openedWorkspaceId!==e.id||(O.openedWorkspaceId=m.id,O.workspaceIds=O.workspaceIds.filter((function(n){return n!==t.id&&n!==e.id}))),O.selectedNoteId=m.id,j(m,"both",o),l(t.id,!1,O),d(O)}))}))}var Q=n(7),X=l.a.lazy((function(){return Promise.all([n.e(0),n.e(1),n.e(4),n.e(8)]).then(n.bind(null,295))})),Z=l.a.lazy((function(){return Promise.all([n.e(0),n.e(7)]).then(n.bind(null,296))})),ee=l.a.lazy((function(){return Promise.all([n.e(1),n.e(6),n.e(9)]).then(n.bind(null,294))})),te=150,ne=300,re=1048576,oe=200,ie=!1,ce="",ae=new u.a("notes-db");ae.version(1).stores({notes:"id, text, preview, branches, roots, thread, collection, pinned, color, colorPreview, attachedImg, version"});t.f=function(e){var t=e.signInFunction,n=e.signOutFunction,r=e.GAPIloaded,l=e.currentUser,u=Object(d.useState)({notes:new Map,notesOrder:[],workspaceIds:[],selectedNoteId:null,openedCollectionId:null,openedWorkspaceId:null,search:[],links:[],workspace:[],checkedAgainstDrive:!1}),p=Object(s.a)(u,2),g=p[0],b=p[1],v=Object(d.useState)({searchText:"",threadFilter:!1,collectionFilter:!1}),w=Object(s.a)(v,2),O=w[0],m=w[1],I=Object(d.useState)([]),k=Object(s.a)(I,2),y=k[0],S=k[1],P=Object(d.useState)(!1),E=Object(s.a)(P,2),A=E[0],C=E[1],W=Object(d.useState)(!1),L=Object(s.a)(W,2),D=L[0],J=L[1],G=Object(d.useState)(!1),H=Object(s.a)(G,2),B=H[0],_=H[1],z=Object(d.useState)("notes"),te=Object(s.a)(z,2),ne=te[0],re=te[1],oe=Object(d.useState)(null),se=Object(s.a)(oe,2),de=se[0],le=se[1],ue=Object(d.useState)(!1),fe=Object(s.a)(ue,2),he=fe[0],pe=fe[1],ge=Object(d.useState)(0),be=Object(s.a)(ge,2),ve=be[0],we=be[1];Object(d.useEffect)((function(){var e=Object(a.a)({},g);ae.notes.toArray().then((function(t){t.forEach((function(t){e.notes.set(t.id,t),Object(f.d)(t)}));var n=JSON.parse(window.localStorage.getItem("notes-order")),r=JSON.parse(window.localStorage.getItem("deleted-notes"));e.notesOrder=n||Object(c.a)(e.notes.keys()),r&&S(r),je(e)}))}),[]),Object(d.useEffect)((function(){var e=Object(a.a)({},g);ke(e),b(e)}),[A]),Object(d.useEffect)((function(){var e=Object(a.a)({},g);Ie(e),b(e)}),[O]),Object(d.useEffect)((function(){ie=!1,r&&l&&(ie=!0,T(le))}),[r,l]),Object(d.useEffect)((function(){ce=de,r&&l&&de&&Oe()}),[de,r,l]);var Oe=function(){!function(e,t,n,r,o,i){i||(i=0);var c=new Map;c.configFound=!1,c.finishedProcesses=0,c.mightNeedUpdate=!0,F(e,c,t,n,r,o)}(Object(a.a)({},g),y,S,we,je)},me=function(){var e=Object(i.a)(o.a.mark((function e(t,n){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:j(t,n,we);case 1:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),je=function(){var e=Object(i.a)(o.a.mark((function e(t){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:Ie(t),ke(t),R(t),b(t);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),Ie=function(){var e=Object(i.a)(o.a.mark((function e(t){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:M(t,O);case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),ke=function(){var e=Object(i.a)(o.a.mark((function e(t){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:U(t,A,we);case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),ye=function(){var e=Object(i.a)(o.a.mark((function e(){var t,n,r;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=Object(a.a)({},g),n=Object(f.f)(),t.notesOrder=[n.id].concat(Object(c.a)(t.notesOrder)),window.localStorage.setItem("notes-order",JSON.stringify(t.notesOrder)),t.notes.set(n.id,n),t.selectedNoteId=n.id,t.openedCollectionId&&((r=t.notes.get(t.openedCollectionId)).collection.push(n.id),me(r,"meta")),je(t),re("editor"),me(n,"meta"),ie&&x(t);case 11:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),xe=function(){var e=Object(i.a)(o.a.mark((function e(t,n){var r;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:r=Object(a.a)({},g),"get-occurrences"===n&&Ce(r),r.notes.set(t.id,t),r.selectedNoteId=t.id,me(t,"both"),je(r);case 6:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),Se=function(){var e=Object(i.a)(o.a.mark((function e(t,n,r){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:r||(r=Object(a.a)({},g)),Y(t,n,r,B,_,y,S,we,je),B&&_(!1);case 3:case"end":return e.stop()}}),e)})));return function(t,n,r){return e.apply(this,arguments)}}(),Pe=function(){var e=Object(i.a)(o.a.mark((function e(t){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:V(g,b,B,D,J,A,O,we,je,t);case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),Ne=function(){var e=Object(i.a)(o.a.mark((function e(){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:g.workspaceIds.length?alert(h.d):J(!D);case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),Te=function(){var e=Object(i.a)(o.a.mark((function e(t){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:K(t,B,_,g,b,ke,Ee);case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),Ee=function(){var e=Object(i.a)(o.a.mark((function e(t,n){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:$(t,n,_,g,we,D,je,Se);case 1:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),Ae=function(){var e=Object(i.a)(o.a.mark((function e(t,n){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n||(n=Object(a.a)({},g)),q(t,n,we,D),t||je(n);case 3:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),Ce=function(){var e=Object(i.a)(o.a.mark((function e(t){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:Ae(!0,t),t.workspaceIds=g.notesOrder.filter((function(e){return g.notes.get(e).thread.includes(g.selectedNoteId)||g.notes.get(e).collection.includes(g.selectedNoteId)})),J(!1);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),We=function(){var e=Object(i.a)(o.a.mark((function e(){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:N(g);case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),Fe=function(){var e=Object(i.a)(o.a.mark((function e(){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:ae.notes.get(g.selectedNoteId).then((function(e){g.notes.set(g.selectedNoteId,e),re("editor")}));case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),Me=function(){var e=Object(i.a)(o.a.mark((function e(){var t;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:(t=Object(a.a)({},g)).openedCollectionId=null,Ie(t),b(t);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(Q.jsxs)("div",{children:["notes"===ne&&Object(Q.jsx)(d.Suspense,{fallback:f.j,children:Object(Q.jsx)(ee,{darkMode:he,dashboard:g,handleOnDragEnd:Pe,GAPIloaded:r,currentUser:l,setCurrentPage:re,notesUpdating:ve,setDarkMode:pe,closeCollection:Me,addNote:ye,selectNote:Te,mergeMode:B,setMergeMode:_,openEditor:Fe,rootsOrBranches:A,closeAndSave:Ae,threadOrCollection:D,threadOrCollectionManage:Ne,setRootsOrBranches:C,searchProps:O,setSearchProps:m,synchNotes:Oe})}),"editor"===ne&&g.selectedNoteId&&Object(Q.jsx)(d.Suspense,{fallback:f.j,children:Object(Q.jsx)(X,{setCurrentPage:re,selectedNote:g.notes.get(g.selectedNoteId),updateNote:xe,deleteNote:Se,darkMode:he,exportThread:We})}),Object(Q.jsx)("iframe",{title:"printer",id:"ifmcontentstoprint",style:{height:"0px",width:"0px",position:"absolute",border:"0"}}),"settings"===ne&&Object(Q.jsx)(d.Suspense,{fallback:f.j,children:Object(Q.jsx)(Z,{setCurrentPage:re,signInFunction:t,signOutFunction:n,loadedUser:l,GAPIloaded:r})})]})}},3:function(e,t,n){"use strict";n.d(t,"a",(function(){return u})),n.d(t,"h",(function(){return f})),n.d(t,"g",(function(){return h})),n.d(t,"e",(function(){return p})),n.d(t,"b",(function(){return g})),n.d(t,"c",(function(){return b})),n.d(t,"d",(function(){return v})),n.d(t,"f",(function(){return w})),n.d(t,"i",(function(){return O})),n.d(t,"j",(function(){return m}));var r=n(5),o=n(2),i=n(16),c=n(13),a=n(18),s=n.n(a),d=n(7),l=n(55);function u(e,t,n){return[].concat(Object(o.a)(e.slice(0,t)),[n],Object(o.a)(e.slice(t)))}function f(e,t){return[].concat(Object(o.a)(e.slice(0,t)),Object(o.a)(e.slice(t+1)))}function h(e,t,n){var r=f(e,t),i=e[t];return r=[].concat(Object(o.a)(r.slice(0,n)),[i],Object(o.a)(r.slice(n)))}function p(e){return t=e.preview.replace(/<[^>]*>?/gm,""),n=35,t.substr(0,n-1)+(t.length>n?"...":"");var t,n}function g(e,t){return e.notesOrder.reduce((function(n,r){return n&&!e.notes.get(r).thread.includes(t)&&!e.notes.get(r).branches.includes(t)}),!0)}function b(e){return{ui_id:Object(i.a)(),id:e.id,text:e.text,preview:e.preview,branches:e.branches,roots:e.roots,thread:e.thread,collection:e.collection,pinned:e.pinned,color:e.color,colorPreview:e.colorPreview,attachedImg:e.attachedImg}}function v(e){if(e.attachedImg.length){var t=Object(r.a)(e.attachedImg,3),n=t[0],o=t[1];t[2]&&e.text.length>o-n&&(e.text=e.text.substring(n,o))}else delete e.text}function w(){return{id:Object(i.a)(),text:"",preview:"",branches:[],roots:[],thread:[],collection:[],pinned:!1,color:"#ffffff",colorPreview:"#ffffff",attachedImg:!1,version:0}}function O(e){var t=/<img src=.*?>/gm.exec(e.text);if(t){var n=""===e.text.substring(0,t.index).replace(/(<([^>]+)>)|(\s|(&nbsp))*/gm,"");e.attachedImg=[t.index+10,t.index+t[0].length-2,n]}else e.attachedImg=!1;var r=l(e.text.replace(/<p><br\/><\/p>|<p>(\s|(&nbsp))*<\/p>|<img .*?>/gm,""),c.b).html;""===r.replace(/(<([^>]+)>)/gi,"")&&(r=e.attachedImg?"image only note":"empty note kept for its links"),e.preview=r}var m=Object(d.jsx)("div",{style:{justifyContent:"center",display:"flex"},children:Object(d.jsx)(s.a,{type:"ThreeDots",color:"#c6c6c6",height:50,width:50,style:{marginTop:"25%"}})})},32:function(e,t,n){},63:function(e,t,n){"use strict";n.r(t);var r=n(0),o=n.n(r),i=n(17),c=n.n(i),a=(n(32),n(1)),s=n.n(a),d=n(6),l=n(23),u=n(24),f=n(27),h=n(26),p=n(13),g=n(7),b="https://www.googleapis.com/auth/drive.file",v="https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",w=function(e){Object(f.a)(n,e);var t=Object(h.a)(n);function n(){var e;Object(l.a)(this,n);for(var r=arguments.length,o=new Array(r),i=0;i<r;i++)o[i]=arguments[i];return(e=t.call.apply(t,[this].concat(o))).state={googleAuth:"",currentUser:localStorage.getItem("currentUser"),loaded:!1,driveFolderId:"",onlineState:window.navigator.onLine},e.initScript=Object(d.a)(s.a.mark((function t(){var n;return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:(n=document.querySelector("meta[name=viewport]")).setAttribute("content",n.content+", height="+window.innerHeight+", user-scalable=no"),window.addEventListener("online",(function(){return e.setState({onlineState:!0})})),window.addEventListener("offline",(function(){return e.setState({onlineState:!1})})),e.state.onlineState&&e.loadGAPI();case 5:case"end":return t.stop()}}),t)}))),e.loadGAPI=Object(d.a)(s.a.mark((function t(){var n;return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:(n=document.createElement("script")).onload=e.handleClientLoad,n.src="https://apis.google.com/js/api.js",document.body.appendChild(n),console.log("loadingGAPI");case 5:case"end":return t.stop()}}),t)}))),e.initClient=Object(d.a)(s.a.mark((function t(){return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:try{window.gapi.client.init({apiKey:"AIzaSyDmfaKWGbmsMVLYu1nu83egzWI30vgyD-0",clientId:"455375017729-n44ea0ohjt7hb6jpi5ks56ej89cppv93.apps.googleusercontent.com",scope:b,discoveryDocs:[v]}).then((function(){e.setState({googleAuth:window.gapi.auth2.getAuthInstance(),loaded:!0}),e.state.googleAuth.isSignedIn.listen(e.updateSigninStatus),e.state.googleAuth.then(e.setSigninStatus())}))}catch(n){console.log(n)}case 1:case"end":return t.stop()}}),t)}))),e.signInFunction=function(){e.state.googleAuth.signIn()},e.signOutFunction=function(){e.state.googleAuth.signOut()},e.updateSigninStatus=function(){e.setSigninStatus()},e.setSigninStatus=function(){var t=e.state.googleAuth.currentUser.get();t.isSignedIn()?t.hasGrantedScopes(b)&&localStorage.setItem("currentUser",t.getBasicProfile().getName()):localStorage.setItem("currentUser",null);e.setState({currentUser:localStorage.getItem("currentUser")})},e.handleClientLoad=function(){window.gapi.load("client:auth2",e.initClient)},e}return Object(u.a)(n,[{key:"componentDidMount",value:function(){this.initScript()}},{key:"componentDidUpdate",value:function(){this.state.onlineState&&!this.state.loaded&&this.loadGAPI()}},{key:"render",value:function(){console.log(localStorage.getItem("currentPage")),console.log(localStorage.getItem("currentUser"));var e=null!==this.state.currentUser&&"null"!==this.state.currentUser;return Object(g.jsx)(p.f,{signInFunction:this.signInFunction,signOutFunction:this.signOutFunction,GAPIloaded:this.state.loaded&&this.state.onlineState,currentUser:e})}}]),n}(r.Component),O=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function m(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://cra.link/PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}var j=function(e){e&&e instanceof Function&&n.e(10).then(n.bind(null,293)).then((function(t){var n=t.getCLS,r=t.getFID,o=t.getFCP,i=t.getLCP,c=t.getTTFB;n(e),r(e),o(e),i(e),c(e)}))};c.a.render(Object(g.jsx)(o.a.StrictMode,{children:Object(g.jsx)(w,{})}),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/thinkythreads",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="".concat("/thinkythreads","/service-worker.js");O?(!function(e,t){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(n){var r=n.headers.get("content-type");404===n.status||null!=r&&-1===r.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):m(e,t)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://cra.link/PWA")}))):m(t,e)}))}}(),j()},9:function(e,t,n){"use strict";n.d(t,"b",(function(){return r})),n.d(t,"d",(function(){return o})),n.d(t,"c",(function(){return i})),n.d(t,"j",(function(){return c})),n.d(t,"f",(function(){return a})),n.d(t,"m",(function(){return s})),n.d(t,"g",(function(){return d})),n.d(t,"a",(function(){return l})),n.d(t,"n",(function(){return u})),n.d(t,"e",(function(){return f})),n.d(t,"i",(function(){return h})),n.d(t,"l",(function(){return p})),n.d(t,"k",(function(){return g})),n.d(t,"h",(function(){return b}));var r="cannot insert a note inside its own Thread or Collection",o="Please clean your workspace before changing between Thread Mode and Collection Mode.",i="Character limit reached. Additional content will not be saved. Please start a new note instead.",c="Merge Mode is on, please select another card to merge to the pink card. The content, links and references of the card you select will be copied. If you want to exit it, press the button again.",a="Google Drive is not connected. Please Login from the Settings page to allow the backup.",s="------------------------------------------------------------ new note ---------------------------------------------------",d="--------------------------------------------------------- exported thread -------------------------------------------\n",l="Merge Mode is on. Please finish merging or exit the Merge Mode before doing anything else.",u="Workspace length limit reached. Please save and start a new Workspace instead.",f="The note you want to delete compares in the branches of other notes. If you proceed, the system will automatically redirect the links of the other notes to preserve the connectivity. Otherwise, please restructure your links manually until this alert disappears.",h="The number of links of the resulting note would exceed the limit. Please remove some links to continue.",p="The size of the Thread or Collection of the resulting note would exceed the limit. Please remove some notes manually to continue.",g="The size of the resulting text exceeds the limit. Please shorten some text to continue.",b="Both the cards contain a Thread or a Collection and this generates a conflict in the mergin process. Please empty the Thread or Collection of one of the two notes and try again."}},[[63,3,5]]]);
//# sourceMappingURL=main.b9bd13b4.chunk.js.map