/*
Author: Nicola Mendini
Date: 11/09/2021
ThinkyThreads Project
EditorFooter component
Defines the buttons of the footer and calls the respective functions
*/

import { AiOutlinePushpin, AiFillPushpin }  from 'react-icons/ai'
import { BsTrash } from 'react-icons/bs'
import { useState } from 'react';
import {IoIosArrowRoundBack} from 'react-icons/io'
import ColorPicker from './ColorPicker';
import OptionsPopup from './OptionsPopup';
import { createThumbnail, setPreview } from '../helpers/DashboardUtils';
import React from 'react'
import { currOrPrevNoteDecice } from '../helpers/DashboardUtils';
import { SHAREDMEX } from './Dashboard';

const Mousetrap = require('mousetrap')

// Editor footer component
// takes setCurrentPage to go back to the notes page when editing is finished
// the selected note, two functions to update or delete the note
// the editorState that contains the html
// the function to set the background color of a note and 
// a function to export the threas as PDF or to print
const EditorFooter = ({
    setCurrentPage,
    selectedNote,
    updateNote,
    editorState,
    deleteNote,
    darkMode,
    exportThread,
    setBackColor,
    threadCollectionSwap,
    moveToTheExtremity,
    dashboard,
    openOccurrences,
    packDashboard,
    editorRef
}) => {

    var initialPinned = ''
    if(selectedNote){
        initialPinned = selectedNote.pinned
    }

    // State that defines whether the note is pinned, used to show the 
    // change in the pin icon
    const [isPinned, setIsPinned] = useState(initialPinned)
    // State to define whether the popup options have been opened through the
    // three dots button
    const [open, setOpen] = useState(false)
    // Check if the editing note has changed
    const [hasChanged, setHasChanged] = useState(false)

    // Function to pin the note
    const pin = () => {
        setHasChanged(true)
        selectedNote.pinned = !selectedNote.pinned
        setIsPinned(selectedNote.pinned)
    }

    // Function to save and exit the note when the back arrow is pressed
    const saveAndExit = (doUpdate, packIt) => {
        SHAREDMEX.closingEditor = true
        if(selectedNote.text===editorState && !hasChanged && editorState!=='' && !doUpdate){
            setCurrentPage('notes')
            createThumbnail(selectedNote)
            currOrPrevNoteDecice(dashboard)
            if(packIt){
                packDashboard({...dashboard}, false, true)
            }
            return
        }

        // Set the note text to be the editor state and compute the preview
        selectedNote.text = editorState
        setPreview(selectedNote)

        // If the note has no text, thread, collection, branches, images,
        // delete it
        if(
        selectedNote.preview === 'empty note kept for its links' &&
        !selectedNote.thread.length &&
        !selectedNote.collection.length &&
        !selectedNote.branches.length &&
        !selectedNote.attachedImg
        ){
            deleteNote(selectedNote.id)
            setCurrentPage('notes')
        }

        // Otherwise save it and go back to the notes page
        else{
            updateNote(selectedNote)
            setCurrentPage('notes')
        }
    }

    // Function called when the delete button is pressed
    const callDelete = () => {
        if(window.confirm('Delete the note?')){
            deleteNote(selectedNote.id)
            setCurrentPage('notes')
        }
    }

    // Binding the keyboard gesture that allows the user to save with ctrl+s
    Mousetrap.bind(['ctrl+s', 'meta+s'], function(e) {
        if (e.preventDefault) {
            e.preventDefault()
        } else {
            // internet explorer
            e.returnValue = false;
        }
        editorState.replace(/<img .*?>/gm, '0').replace(/<[^>]*>?/gm, '') && saveAndExit()
    })

    // code snippet to update the binding each time the user types
    // otherwise the note would not update with the correct editor state
    if(editorRef && editorRef.current && editorRef.current.editor){
        const prevBinding = editorRef.current.editor.keyboard.bindings[83]
        if(prevBinding){
            prevBinding.pop()
        }
        editorRef.current.editor.keyboard.addBinding({
            key: 's',
            shortKey: true,
            handler: () => editorState.replace(/<[^>]*>?/gm, '') && saveAndExit()
            }
        )
    }

    return(

        <div>
            <div className='page-footer' style={{
                color: darkMode ? '#636363' : '#171717'
                }}
            >

                <IoIosArrowRoundBack
                    className='tools-btn'
                    onClick={() => saveAndExit()}
                    size='2.5em'
                />

                {!isPinned ?
                    <AiOutlinePushpin
                        className='tools-btn'
                        onClick={() => pin()}
                        size='1.75em'
                    /> :
                    <AiFillPushpin
                        className='tools-btn'
                        onClick={() => pin()}
                        size='1.75em'
                        style={{transform:'rotate(-45deg)'}}
                    /> 
                }

                <ColorPicker 
                    selectedNote={selectedNote}
                    setBackColor={setBackColor}
                    setHasChanged={setHasChanged}
                />

                <BsTrash
                    className='tools-btn'
                    onClick={() => callDelete()}
                    size='1.65em'
                />

                <OptionsPopup 
                    selectedNote={selectedNote}
                    open={open}
                    setOpen={setOpen}
                    saveAndExit={saveAndExit}
                    exportThread={exportThread}
                    threadCollectionSwap={threadCollectionSwap}
                    openOccurrences={openOccurrences}
                    moveToTheExtremity={moveToTheExtremity}
                />          

            </div>


        </div>
    );
}

export default EditorFooter;