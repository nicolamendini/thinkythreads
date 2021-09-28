/*
Author: Nicola Mendini
Date: 13/09/2021
ThinkyThreads Project
InfoPage component
Shows information about the usage of the app
*/
import React from 'react'

const Info = () => {
    return (
        <div className='info'>

            <h1>
                Why Thinkythreads?
            </h1>

            Thinkythreads is a note-taking system designed to mimic the natural processes 
            of thought as they happen in the human brain. Sticky notes are initially taken in the form 
            of disconnected atoms and are then be progressively linked and grouped to form a network 
            of notes that represents the individual's knowledge. The purposes of this app are the following.

            <ul>
                <li>
                    To make you formalise your knowledge. You know way more things than you expect, 
                    you just never had the chance to give them an explicit form.
                </li>

                <li>
                    To give structure and context to the new knowledge you gain. This is done by inserting it 
                    directly into a wider network of concepts and relations.
                </li>

                <li>
                    To make you remember and retrieve things effectively. This is because the 
                    network representation of the notes makes navigation simple and efficient.
                </li>

                <li>
                    To prompt you to improve your network of knowledge iteratively, 
                    you will be surprised to see how far you can get!
                </li>
            </ul>
            
            <h1>
                How does it work?
            </h1>

            The system is designed to be and stay simple. Here's how it works. You can structure your atomic 
            notes into 2 fundamental structures: Threads and Collections. Threads are ordered sequences of notes
            that represent 'lines of thought' and that define the causal relationships between notes. On the other 
            hand, Collections are unordered sets of notes. Unlikely Threads, Collections cannot contain repeated notes. 
            A note can belong to multiple Collections, and indeed Collections define the different groups 
            a note belongs to. Every Thread or Collection must be contained, or wrapped, inside a note in a way that 
            each note contains at most a Thread or a Collection.

            The Dashboard is made of 5 main components.

            <ul>
                <li>
                    A Search Bar that allows you to search notes by matching the keywords that you input 
                    with the text of the preview of each note. In addition, the Search Bar gives you the 
                    option to apply the Thread (T) and Collection (C) filters, which only show you notes 
                    that contain a Thread or a Collection, respectively. You can also drop a note onto the
                    Search Bar to only display notes that are contained in that note's Collection.
                </li>

                <li>
                    A Search Area, that shows the results of your search. Notes here can be arbitrarily reordered
                    and pinned at the beginning of the sequence.
                </li>

                <li>
                    A Workspace, that contains the Thread or Collection you are currently working at. 
                    The Workspace can either be in Thread or Collection mode. Thread Mode means that whenever 
                    you WRAP the Workspace by dropping a note onto the Wrapper, the Workspace will be saved as a Thread
                    inside the note you used to WRAP. In addition, the system will add a causal link between 
                    each consecutive note. On the other hand, whenever you WRAP a Workspace in 
                    Collection Mode, the Workspace will simply be saved as a Collection inside the note that you
                    have chosen and no links will be created. You cannot wrap the Workspace within a note that 
                    is contained in it, or with a note that already has a Thread or a Collection. As a complementary 
                    functionality, whenever the Workspace is empty you can drop a note onto the Wrapper to expand 
                    the Thread or Collection that is contained into the note.
                </li>

                <li>
                    A Links Area, that shows you all the links related to a note that your system has recorded so far.
                    The Links Area can be in Branch or Root Mode. The first mode shows you the causal relations that start 
                    FROM the note that you selected (Branches) whereas the second mode shows you all the causal relations
                    that land TO the note that you selected (Roots)
                </li>

                <li>
                    A Footer, that allows you to access the settings as well as allow you to swap between modes and 
                    see your backup status.
                </li>
            </ul>

            Here's how you use the App.

            <ol>
                <li>
                    First of all, make sure you log in with your Google Account. Thinkythreads uses your Google Drive
                    to store an online backup of all your notes so that you never lose them. Without this, your notes
                    will only be stored locally and will be lost everytime you clean your browser's data.
                </li>

                <li>
                    From the Dashboard, you can create as many notes as you want by pressing the 'Add' button. 
                    The notes will appear in the Search Area, which contains all the notes you ever created 
                    filtered by the options that you specify. 
                </li>

                <li>
                    Let's say you've created enough notes and now you want to structure them. All you have to
                    do is to set whether you want the Thread or Collection mode and then drag the notes
                    you desire to structure from the Search Area into the Workspace. For Threads, you can reorder 
                    the notes in the Workspace by dragging them in the desired position. If you want to remove a note
                    from the Workspace, you can just drag it back into the Search Area. Once you're done with 
                    your Workspace, you can wrap it into an existing note by dragging the note that you want 
                    to use onto the Wrapper Area at the very left of the Workspace Area.
                </li>

                <li>
                    As you keep adding structure to your notes, especially Threads, you'll notice that some Links
                    will appear in the Links area when you select certain notes. The Links recommend the notes that
                    you can use to build Threads, or simply give you contextual hints about the ideas that you are 
                    working at. This is when the system starts giving you back the knowledge that you inserted. If 
                    you want to use a note of the Links Area inside the Workspace, just drag it on it. If you want to 
                    manually add or remove a link, just drag notes between the Links Area and the Search Area.
                </li>

                <li>
                    The last functionality implemented by this system is the Merge Mode. The Merge Mode allows you to 
                    merge the content and context of any two arbitrary notes provided that at most one of the two notes
                    already contain a Thread or a Collection. Merging notes in this way is much simpler than doing it 
                    manually. All you have to do is to select a note by clicking on it, enable the Merge Mode from the
                    button on the footer, and then select the note you want to merge the previous note with.
                </li>

                <li> 
                    You've made it! This is all you need to know to start using Thinkythreads, all the rest is up to you!
                </li>

            </ol>

        </div>
    )
}

export default Info