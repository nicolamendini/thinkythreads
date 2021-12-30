/*
Author: Nicola Mendini
Date: 11/2021
ThinkyThreads Project
InfoPage component
Shows information about the usage of the app
*/
import React from 'react'
import diagramImg from '../images/diagram.jpg'
import draggingImg from '../images/dragging.jpg'
import footerImg from '../images/footer.jpg'
import searchBarImg from '../images/search-bar.jpg'
import searchAreaImg from '../images/search-area.jpg'
import workspaceAreaImg from '../images/workspace-area.jpg'
import linksAreaImg from '../images/links-area.jpg'

const Info = () => {

    return (
        <div className='info'>

            <h1>
                Why Thinkythreads?
            </h1>

            Thinkythreads is a note-taking system designed to mimic the natural processes 
            of thought as they happen in the human brain. <br></br>
            Sticky notes are initially taken in the form 
            of <strong>disconnected atoms</strong> and are then be progressively linked and grouped to form a <strong>network 
            of notes</strong> that represents an individual's knowledge. <br></br>
            The purposes of this app are the following.

            <ul>
                <li>
                    To make you <strong>formalise your knowledge</strong>. You know way more things than you expect, 
                    you just never had the chance to give them an explicit form.
                </li>

                <li>
                    To <strong>give structure and context</strong> to the new knowledge you gain. This is done by inserting it 
                    directly into a wider network of concepts and relations.
                </li>

                <li>
                    To <strong>make you remember and retrieve</strong> things effectively. This is because the 
                    network representation of the notes makes navigation simple and efficient.
                </li>

                <li>
                    To <strong>prompt you to improve</strong> your network of knowledge iteratively, 
                    you will be surprised to see how far you can get!
                </li>
            </ul>

            <div className="info-img-container"><img src={diagramImg} alt="networks of notes" className="info-images"></img></div>
            
            <h1>
                How does it work?
            </h1>

            The system is designed to be and stay simple. Here's how it works. <br></br>
            You can organise your atomic 
            notes into 2 fundamental structures: <h3>Threads (~sequences of notes) and Collections (~folders of notes)</h3>

            This structures are <strong>contained inside other notes</strong>, so that <strong>any note can contain either a Thread or a Collection.</strong> <br></br>
            <strong>Threads</strong> are ordered sequences of notes
            that represent 'lines of thought' and that define the causal relationships between notes. <br></br>
            On the other 
            hand, <strong>Collections</strong> are unordered sets of notes. Unlikely Threads, Collections cannot contain repeated notes. <br></br>
            A note can belong to multiple Collections, and indeed Collections define the different groups 
            a note belongs to. Every Thread or Collection must be contained, or wrapped, inside a note in a way that 
            each note contains at most a Thread or a Collection. <br></br><br></br>

            <h3>The Dashboard is made of 5 main components</h3>

            <ul>
                <li>
                    A <strong>Search Bar</strong> that allows you to <strong>search notes by matching the keywords</strong> that you input 
                    with the text of the preview of each note. <br></br>
                    In addition, the Search Bar gives you the 
                    option to <strong>apply the Thread (T), Collection (C), Image and Colour Filters</strong>, which only show you notes 
                    that contain a Thread, a Collection, an image, or belong to a colour class, respectively. <br></br>
                    You can also drop a note onto the
                    Search Bar to restrict the search to notes that are contained in that note's Collection. 
                </li>
                <br></br>

                <div className="info-img-container"><img src={searchBarImg} alt="search bar" className="info-images" style={{maxWidth:'500px'}}></img></div>

                <br></br>

                <li>
                    A <strong>Search Area</strong>, that shows the results of your search. Notes here can be arbitrarily <strong>reordered
                    and pinned</strong> at the beginning of the sequence. A new note can be added from here.
                </li>
                <br></br>

                <div className="info-img-container"><img src={searchAreaImg} alt="search area" className="info-images" style={{maxWidth:'600px'}}></img></div>
                <br></br>

                <li>
                    A <strong>Workspace</strong>, that contains the Thread or Collection you are currently working at. <br></br>
                    It also contain a <strong> Wrapper Area which allows you to save (wrap) </strong> your Workspace inside a note's 
                    Thread or Collection. You can do so by dropping a note inside this area (coloured in gray).<br></br> It also allows you to expand the Thread or Collection present inside a note
                    if the workspace has already been saved before. <br></br>
                    The Workspace can either be in <strong>Thread or Collection Mode</strong>. 
                    Thread Mode means that you are creating or editing a thread. The Wrapper Area will save the Workspace that you are creating as a Thread 
                    contained inside the note you dropped to save it.
                    When you save a Workspace as a Thread inside another note, the system will automatically add causal links between 
                    each consecutive note in the sequence you saved. On the other hand, whenever you save a Workspace in 
                    Collection Mode, the Workspace will simply be saved as a Collection no links will be created.
                </li>
                <br></br>

                <div className="info-img-container"><img src={workspaceAreaImg} alt="workspace area" className="info-images" style={{maxWidth:'600px'}}></img></div>
                <br></br>

                <li>
                    A <strong>Links Area</strong>, that shows you all the links related to a note that your system has recorded so far.
                    The Links Area can be in <strong>Branch or Root Mode</strong>. The Branch Mode shows you the causal relations that <strong>start 
                    from</strong> the note that you selected (Branches) whereas the second mode shows you all the causal relations
                    that <strong>land to</strong> the note that you selected (Roots)
                </li>
                <br></br>

                <div className="info-img-container"><img src={linksAreaImg} alt="links area" className="info-images" style={{maxWidth:'600px'}}></img></div>
                <br></br>

                <li>
                    A <strong>Footer</strong>, that allows you to access the settings as well as allow you to swap between modes and 
                    see your backup status.
                </li>

                <br></br>
                <div className="info-img-container"><img src={footerImg} alt="footer" className="info-images" style={{maxWidth:'500px'}}></img></div>
                <br></br>

            </ul>

            <h3>Here's an example of how to use the App</h3>

            <br></br>
                <div className="info-img-container"><img src={draggingImg} alt="use case example" className="info-images" style={{maxWidth:'600px'}}></img></div>
            <br></br>

            <ol>
                <li>
                    First of all, make sure you <strong>log in with your Google Account</strong>. Thinkythreads uses your <strong>Google Drive </strong>
                    to store an online backup of all your notes so that you never lose them. Without this, your notes
                    will only be stored locally and will be lost everytime you clean your browser's data. <br></br>
                    No data besides the folder that the app iself has created will be touched or viewed. 
                </li>
                <br></br>

                <li>
                    From the Dashboard, you can <strong>create as many notes as you want by pressing the 'Add' button.</strong> 
                    The notes will appear in the Search Area, which contains all the notes you ever created 
                    filtered by the filters that you set on the Search Bar. 
                </li>
                <br></br>

                <li>
                    Let's say you've created enough notes and now you want to structure them. All you have to
                    do is to <strong>set the Dashboard to Thread or Collection Mode</strong> and then <strong> drag the notes
                    you want to organise from the Search Area into the Workspace</strong>. <br></br> 
                    Once you populated the workspace, you can reorder 
                    the notes by dragging them in the desired position. <br></br> 
                    If you want to remove a note
                    from the Workspace, just drag it back into the Search Area. <br></br>
                    Once you're done with 
                    your Workspace, you can save it inside an existing note by dragging the note inside
                    the Wrapper Area.
                </li>
                <br></br>

                <li>
                    As you keep adding structure to your notes, especially Threads, you'll notice that <strong>some Links
                    will appear</strong> in the Links area when you select certain notes. The Links recommend the notes that
                    you can use to build other Threads, or simply give you contextual hints about the ideas that you are 
                    working with. This is when the system starts giving you back the knowledge that you inserted. <br></br>
                    You can also drag notes of the Link Area to the Workspace exactly as you did for the Search Area. <br></br>
                    If you want to 
                    <strong> manually add or remove a link</strong> to/from a note, just drag a note to the Search Area or drag it back to the Search Area,
                    respectively.
                </li>
                <br></br>

                <li>
                    The last big functionality implemented by this system is the <strong>Merge Mode</strong>. The Merge Mode allows you to 
                    <strong> merge the content and links of any two arbitrary notes</strong>, provided that at most one of the two notes
                    already contain a Thread or a Collection. Merging notes in this way is much simpler than doing it 
                    manually. All you have to do is to select a note by clicking on it, enable the Merge Mode from the
                    button on the footer, and then select the note you want to merge the previous note with.
                </li>
                <br></br>

                <li> 
                    <strong>You've made it!</strong> This is all you need to know to start using Thinkythreads, all the rest is up to you!
                </li>

            </ol>

            <h1>Keyboard Shortcuts</h1>
            <table>
                <tbody>
                    <tr>
                        <td><b>KEYS</b></td>
                        <td><b>ACTION</b></td>
                    </tr>
                    <tr>
                        <td>left arrow</td>
                        <td>select note to the left</td>
                    </tr>
                    <tr>
                        <td>right arrow</td>
                        <td>select note to the right</td>
                    </tr>
                    <tr>
                        <td>shift + left arrow</td>
                        <td>move the selected note all the way till the beginning of the search</td>
                    </tr>
                    <tr>
                        <td>shift + right arrow</td>
                        <td>move the selected note all the way till the end of the search</td>
                    </tr>
                    <tr>
                        <td>down arrow</td>
                        <td>add the selected note to the workspace</td>
                    </tr>
                    <tr>
                        <td>up arrow</td>
                        <td>remove the selected note from the workspace</td>
                    </tr>
                    <tr>
                        <td>p</td>
                        <td>pin/unpin the selected note</td>
                    </tr>
                    <tr>
                        <td>d</td>
                        <td>delete the selected note</td>
                    </tr>
                    <tr>
                        <td>a</td>
                        <td>add a new note and open the editor</td>
                    </tr>
                    <tr>
                        <td>1-8</td>
                        <td>change color of a note</td>
                    </tr>
                    <tr>
                        <td>spacebar</td>
                        <td>open the thread/collection contained in a note or wrap an unsaved thread</td>
                    </tr>
                    <tr>
                        <td>enter</td>
                        <td>open the selected note in the editor</td>
                    </tr>
                    <tr>
                        <td>ctrl/cmd + s (from dashboard)</td>
                        <td>close the current workspace and save it, if it was wrapped</td>
                    </tr>
                    <tr>
                        <td>ctrl/cmd + s (from editor)</td>
                        <td>save the current note and quit the editor</td>
                    </tr>
                    <tr>
                        <td>ctrl/cmd + ?</td>
                        <td>see in what other notes the selected note occurs</td>
                    </tr>
                    <tr>
                        <td>right click (from links area)</td>
                        <td>select the clicked note and expand its roots/branches dependind on the mode</td>
                    </tr>
                </tbody>
            </table>

        </div>
    )
}

export default Info