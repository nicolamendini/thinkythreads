(this.webpackJsonpthinkythreads=this.webpackJsonpthinkythreads||[]).push([[10],{383:function(e,t,o){"use strict";o.r(t);var n=o(6),s=o(1),a=o(367),r=o.n(a),i=o(9),c=function(){return Object(i.jsxs)("div",{className:"info",children:[Object(i.jsx)("h1",{children:"Why Thinkythreads?"}),"Thinkythreads is a note-taking system designed to mimic the natural processes of thought as they happen in the human brain. Sticky notes are initially taken in the form of disconnected atoms and are then be progressively linked and grouped to form a network of notes that represents the individual's knowledge. The purposes of this app are the following.",Object(i.jsxs)("ul",{children:[Object(i.jsx)("li",{children:"To make you formalise your knowledge. You know way more things than you expect, you just never had the chance to give them an explicit form."}),Object(i.jsx)("li",{children:"To give structure and context to the new knowledge you gain. This is done by inserting it directly into a wider network of concepts and relations."}),Object(i.jsx)("li",{children:"To make you remember and retrieve things effectively. This is because the network representation of the notes makes navigation simple and efficient."}),Object(i.jsx)("li",{children:"To prompt you to improve your network of knowledge iteratively, you will be surprised to see how far you can get!"})]}),Object(i.jsx)("h1",{children:"How does it work?"}),"The system is designed to be and stay simple. Here's how it works. You can structure your atomic notes into 2 fundamental structures: Threads and Collections. Threads are ordered sequences of notes that represent 'lines of thought' and that define the causal relationships between notes. On the other hand, Collections are unordered sets of notes. Unlikely Threads, Collections cannot contain repeated notes. A note can belong to multiple Collections, and indeed Collections define the different groups a note belongs to. Every Thread or Collection must be contained, or wrapped, inside a note in a way that each note contains at most a Thread or a Collection. The Dashboard is made of 5 main components.",Object(i.jsxs)("ul",{children:[Object(i.jsx)("li",{children:"A Search Bar that allows you to search notes by matching the keywords that you input with the text of the preview of each note. In addition, the Search Bar gives you the option to apply the Thread (T) and Collection (C) filters, which only show you notes that contain a Thread or a Collection, respectively. You can also drop a note onto the Search Bar to only display notes that are contained in that note's Collection."}),Object(i.jsx)("li",{children:"A Search Area, that shows the results of your search. Notes here can be arbitrarily reordered and pinned at the beginning of the sequence."}),Object(i.jsx)("li",{children:"A Workspace, that contains the Thread or Collection you are currently working at. The Workspace can either be in Thread or Collection mode. Thread Mode means that whenever you WRAP the Workspace by dropping a note onto the Wrapper, the Workspace will be saved as a Thread inside the note you used to WRAP. In addition, the system will add a causal link between each consecutive note. On the other hand, whenever you WRAP a Workspace in Collection Mode, the Workspace will simply be saved as a Collection inside the note that you have chosen and no links will be created. You cannot wrap the Workspace within a note that is contained in it, or with a note that already has a Thread or a Collection. As a complementary functionality, whenever the Workspace is empty you can drop a note onto the Wrapper to expand the Thread or Collection that is contained into the note."}),Object(i.jsx)("li",{children:"A Links Area, that shows you all the links related to a note that your system has recorded so far. The Links Area can be in Branch or Root Mode. The first mode shows you the causal relations that start FROM the note that you selected (Branches) whereas the second mode shows you all the causal relations that land TO the note that you selected (Roots)"}),Object(i.jsx)("li",{children:"A Footer, that allows you to access the settings as well as allow you to swap between modes and see your backup status."})]}),"Here's how you use the App.",Object(i.jsxs)("ol",{children:[Object(i.jsx)("li",{children:"First of all, make sure you log in with your Google Account. Thinkythreads uses your Google Drive to store an online backup of all your notes so that you never lose them. Without this, your notes will only be stored locally and will be lost everytime you clean your browser's data."}),Object(i.jsx)("li",{children:"From the Dashboard, you can create as many notes as you want by pressing the 'Add' button. The notes will appear in the Search Area, which contains all the notes you ever created filtered by the options that you specify."}),Object(i.jsx)("li",{children:"Let's say you've created enough notes and now you want to structure them. All you have to do is to set whether you want the Thread or Collection mode and then drag the notes you desire to structure from the Search Area into the Workspace. For Threads, you can reorder the notes in the Workspace by dragging them in the desired position. If you want to remove a note from the Workspace, you can just drag it back into the Search Area. Once you're done with your Workspace, you can wrap it into an existing note by dragging the note that you want to use onto the Wrapper Area at the very left of the Workspace Area."}),Object(i.jsx)("li",{children:"As you keep adding structure to your notes, especially Threads, you'll notice that some Links will appear in the Links area when you select certain notes. The Links recommend the notes that you can use to build Threads, or simply give you contextual hints about the ideas that you are working at. This is when the system starts giving you back the knowledge that you inserted. If you want to use a note of the Links Area inside the Workspace, just drag it on it. If you want to manually add or remove a link, just drag notes between the Links Area and the Search Area."}),Object(i.jsx)("li",{children:"The last functionality implemented by this system is the Merge Mode. The Merge Mode allows you to merge the content and context of any two arbitrary notes provided that at most one of the two notes already contain a Thread or a Collection. Merging notes in this way is much simpler than doing it manually. All you have to do is to select a note by clicking on it, enable the Merge Mode from the button on the footer, and then select the note you want to merge the previous note with."}),Object(i.jsx)("li",{children:"You've made it! This is all you need to know to start using Thinkythreads, all the rest is up to you!"})]}),Object(i.jsx)("h1",{children:"Keyboard Shortcuts"}),Object(i.jsx)("table",{children:Object(i.jsxs)("tbody",{children:[Object(i.jsxs)("tr",{children:[Object(i.jsx)("td",{children:Object(i.jsx)("b",{children:"KEYS"})}),Object(i.jsx)("td",{children:Object(i.jsx)("b",{children:"ACTION"})})]}),Object(i.jsxs)("tr",{children:[Object(i.jsx)("td",{children:"left arrow"}),Object(i.jsx)("td",{children:"select note to the left"})]}),Object(i.jsxs)("tr",{children:[Object(i.jsx)("td",{children:"right arrow"}),Object(i.jsx)("td",{children:"select note to the right"})]}),Object(i.jsxs)("tr",{children:[Object(i.jsx)("td",{children:"shift + left arrow"}),Object(i.jsx)("td",{children:"move the selected note all the way till the beginning of the search"})]}),Object(i.jsxs)("tr",{children:[Object(i.jsx)("td",{children:"shift + right arrow"}),Object(i.jsx)("td",{children:"move the selected note all the way till the end of the search"})]}),Object(i.jsxs)("tr",{children:[Object(i.jsx)("td",{children:"down arrow"}),Object(i.jsx)("td",{children:"add the selected note to the workspace"})]}),Object(i.jsxs)("tr",{children:[Object(i.jsx)("td",{children:"up arrow"}),Object(i.jsx)("td",{children:"remove the selected note from the workspace"})]}),Object(i.jsxs)("tr",{children:[Object(i.jsx)("td",{children:"p"}),Object(i.jsx)("td",{children:"pin/unpin the selected note"})]}),Object(i.jsxs)("tr",{children:[Object(i.jsx)("td",{children:"d"}),Object(i.jsx)("td",{children:"delete the selected note"})]}),Object(i.jsxs)("tr",{children:[Object(i.jsx)("td",{children:"a"}),Object(i.jsx)("td",{children:"add a new note and open the editor"})]}),Object(i.jsxs)("tr",{children:[Object(i.jsx)("td",{children:"1-8"}),Object(i.jsx)("td",{children:"change color of a note"})]}),Object(i.jsxs)("tr",{children:[Object(i.jsx)("td",{children:"spacebar"}),Object(i.jsx)("td",{children:"open the thread/collection contained in a note or wrap an unsaved thread"})]}),Object(i.jsxs)("tr",{children:[Object(i.jsx)("td",{children:"enter"}),Object(i.jsx)("td",{children:"open the selected note in the editor"})]}),Object(i.jsxs)("tr",{children:[Object(i.jsx)("td",{children:"ctrl/cmd + s (from dashboard)"}),Object(i.jsx)("td",{children:"close the current workspace and save it, if it was wrapped"})]}),Object(i.jsxs)("tr",{children:[Object(i.jsx)("td",{children:"ctrl/cmd + s (from editor)"}),Object(i.jsx)("td",{children:"save the current note and quit the editor"})]}),Object(i.jsxs)("tr",{children:[Object(i.jsx)("td",{children:"ctrl/cmd + ?"}),Object(i.jsx)("td",{children:"see in what other notes the selected note occurs"})]})]})})]})},h=o(335),d=o(18),l=o(370),j=o.n(l);t.default=function(e){var t=e.darkMode,o=e.setCurrentPage,a=e.signInFunction,l=e.signOutFunction,u=e.loadedUser,b=e.GAPIloaded,y=window.localStorage.getItem("dashboard-toasts"),p=Object(s.useState)("false"!==y),w=Object(n.a)(p,2),x=w[0],O=w[1];return d.c.toasts=x,Object(i.jsxs)("div",{className:"settings-page",style:t?{backgroundColor:"#171717",color:"white"}:{},children:[Object(i.jsxs)("div",{className:"settings-btns",children:[Object(i.jsx)("div",{className:"settings-back",children:Object(i.jsx)(h.a,{className:"tools-btn",onClick:function(){return o("notes")},size:"2.5em"})}),"THINKYTHREADS BETA v1.0.1",b&&(u?Object(i.jsx)(r.a,{label:"Sign out",onClick:function(){return l()}}):Object(i.jsx)(r.a,{id:"signin-btn",label:"Sign in with Google",onClick:function(){return a()}})),Object(i.jsxs)("div",{className:"settings-inline",style:t?{backgroundColor:"#101010",color:"white"}:{},children:[Object(i.jsx)("span",{style:{paddingTop:"5px"},children:"Dashboard Toast Notifications"}),Object(i.jsx)("span",{children:Object(i.jsx)(j.a,{onChange:function(e){window.localStorage.setItem("dashboard-toasts",e),d.c.toasts=e,O(e)},checked:x})})]})]}),Object(i.jsx)(c,{})]})}}}]);
//# sourceMappingURL=10.3d7292db.chunk.js.map