# Why Thinkythreads?

Thinkythreads is a note-taking system designed to mimic the natural
processes of thought as they happen in the human brain.  
Sticky notes are initially taken in the form of **disconnected atoms**
and are then be progressively linked and grouped to form a **network of
notes** that represents an individual's knowledge.  
The purposes of this app are the following.

  - To make you **formalise your knowledge**. You know way more things
    than you expect, you just never had the chance to give them an
    explicit form.
  - To **give structure and context** to the new knowledge you gain.
    This is done by inserting it directly into a wider network of
    concepts and relations.
  - To **make you remember and retrieve** things effectively. This is
    because the network representation of the notes makes navigation
    simple and efficient.
  - To **prompt you to improve** your network of knowledge iteratively,
    you will be surprised to see how far you can get\!

# How does it work?

The system is designed to be and stay simple. Here's how it works.  
You can organise your atomic notes into 2 fundamental structures:

### Threads (\~sequences of notes) and Collections (\~folders of notes)

These structures are 
**contained inside other notes** so that **any note can contain either a Thread or a Collection.**  
**Threads** are ordered sequences of notes that represent 'lines of
thought' and that define the causal relationships between notes.  
On the other hand, **Collections** are unordered sets of notes. Unlike
Threads, Collections cannot contain repeated notes.  
A note can belong to multiple Collections, and indeed Collections define
the different groups a note belongs to. Every Thread or Collection must
be contained, or wrapped, inside a note in a way that each note contains
at most a Thread or a Collection.  
  

### The Dashboard is made of 5 main components

  - A **Search Bar** that allows you to **search notes by matching the keywords** 
    that you input with the text of the preview of each note.  
    In addition, the Search Bar gives you the option to 
    **apply the Thread (T), Collection (C), Image and Colour Filters**, which only
    show you notes that contain a Thread, a Collection, an image, or
    belong to a colour class, respectively.  
    You can also drop a note onto the Search Bar to restrict the search
    to notes that are contained in that note's Collection.
  - A **Search Area**, that shows the results of your search. Notes here
    can be arbitrarily **reordered and pinned** at the beginning of the
    sequence. A new note can be added from here.
  - A **Workspace**, that contains the Thread or Collection you are
    currently working at.  
    It also contains a **Wrapper Area that allows you to save (wrap)**
    your Workspace inside a note's Thread or Collection. You can do so
    by dropping a note inside this area (coloured in grey).  
    It also allows you to expand the Thread or Collection present inside
    a note if the workspace has already been saved before.  
    The Workspace can either be in **Thread or Collection Mode**. Thread
    Mode means that you are creating or editing a thread. The Wrapper
    Area will save the Workspace that you are creating as a Thread
    contained inside the note you dropped to save it. When you save a
    Workspace as a Thread inside another note, the system will
    automatically add causal links between each consecutive note in the
    sequence you saved. On the other hand, whenever you save a Workspace
    in Collection Mode, the Workspace will simply be saved as a
    Collection no links will be created.
  - A **Links Area**, that shows you all the links related to a note
    that your system has recorded so far. The Links Area can be in
    **Branch or Root Mode**. The Branch Mode shows you the causal
    relations that **start from** the note that you selected (Branches)
    whereas the second mode shows you all the causal relations that
    **land to** the note that you selected (Roots)
  - A **Footer**, that allows you to access the settings as well as
    allow you to swap between modes and see your backup status.

### Here's an example of how to use the App

1.  First of all, make sure you **log in with your Google Account**.
    Thinkythreads uses your **Google Drive** to store an online backup
    of all your notes so that you never lose them. Without this, your
    notes will only be stored locally and will be lost every time you
    clean your browser's data.  
    No data besides the folder that the app itself has created will be
    touched or viewed.
2.  From the Dashboard, you can **create as many notes as you want by pressing the 'Add' button.** 
    The notes will appear in the Search
    Area, which contains all the notes you ever created filtered by the
    filters that you set on the Search Bar.
3.  Let's say you've created enough notes and now you want to structure
    them. All you have to do is to **set the Dashboard to Thread or Collection Mode** 
    and then **drag the notes you want to organise from the Search Area into the Workspace**.  
    Once you populated the workspace, you can reorder the notes by
    dragging them in the desired position.  
    If you want to remove a note from the Workspace, just drag it back
    into the Search Area.  
    Once you're done with your Workspace, you can save it inside an
    existing note by dragging the note inside the Wrapper Area.
4.  As you keep adding structure to your notes, especially Threads,
    you'll notice that **some links will appear** in the Links area when
    you select certain notes. The links recommend the notes that you can
    use to build other Threads, or simply give you contextual hints
    about the ideas that you are working with. This is when the system
    starts giving you back the knowledge that you inserted.  
    You can also drag notes of the Link Area to the Workspace exactly as
    you did for the Search Area.  
    If you want to **manually add or remove a link** to/from a note,
    just drag a note to the Search Area or drag it back to the Search
    Area, respectively.
5.  The last big functionality implemented by this system is the **Merge Mode**. 
    The Merge Mode allows you to **merge the content and links of any two arbitrary notes**, 
    provided that at most one of the two
    notes already contain a Thread or a Collection. Merging notes in
    this way is much simpler than doing it manually. All you have to do
    is to select a note by clicking on it, enable the Merge Mode from
    the button on the footer, and then select the note you want to merge
    the previous note with.
6.  **You've made it\!** This is all you need to know to start using
    Thinkythreads, all the rest is up to you\!

# Keyboard Shortcuts

|                               |                                                                             |
| ----------------------------- | --------------------------------------------------------------------------- |
| **KEYS**                      | **ACTION**                                                                  |
| left-arrow                    | select note to the left                                                     |
| right-arrow                   | select note to the right                                                    |
| shift + left-arrow            | move the selected note all the way till the beginning of the search         |
| shift + right-arrow           | move the selected note all the way till the end of the search               |
| down-arrow                    | adds the selected note to the workspace                                      |
| up-arrow                      | removes the selected note from the workspace                                 |
| p                             | pin/unpin the selected note                                                 |
| d                             | delete the selected note                                                    |
| a                             | add a new note and open the editor                                          |
| 1-8                           | change colour of a note                                                      |
| spacebar                      | open the thread/collection contained in a note or wrap an unsaved thread    |
| enter                         | open the selected note in the editor                                        |
| ctrl/cmd + s (from dashboard) | close the current workspace and save it, if it was wrapped                  |
| ctrl/cmd + s (from editor)    | save the current note and quit the editor                                   |
| ctrl/cmd + ?                  | see in what other notes the selected note occurs                            |
| right-click (from links area) | select the clicked note and expand its roots/branches depending on the mode |

# Privacy Policy

  Thinkythreads is fully decentralised and local. No data about the user is collected, including location. 
  What the user does or writes with the app only belongs to them.
  The user can decide whether to link the app to their Google Account in order to access the Google Drive Backup functionality.
  In that case, the app data will be stored as a simple folder containing separate files for each note. 
  To disable this functionality, it is sufficient to log out. No third parties are involved except Google.
