/*
Author: Nicola Mendini
Date: 11/2021
ThinkyThreads Project
DashboardUtils function
Utils functions to perform small operations
*/

import { nanoid } from "nanoid";
import { db, PREVIEWLIMIT } from "../components/Dashboard";
import Loader from 'react-loader-spinner';
import React from 'react'
import { SHAREDMEX } from "../components/Dashboard";

const truncate = require('truncate-html')

// Adds element at a certain position
export function addElementAt (sequence, position, element) {
    return [...sequence.slice(0, position), element, ...sequence.slice(position)]
}

// Removes the element at a given position
export function removeElementAt(sequence, position) {
    return [...sequence.slice(0, position), ...sequence.slice(position+1)];
}

// Moves a note within an area
export function moveNoteInsideArea(area, originalIndex, targetIndex) {
    var newArea = removeElementAt(area, originalIndex)
    const note = area[originalIndex];
    newArea = [...newArea.slice(0, targetIndex), note, ...newArea.slice(targetIndex)]
    return newArea;
}

// function to move notes inside the graph
export function moveNoteInsideGraph(newDashboard, sourceNoteId, targetNoteId, dir, backupMeta, blockUpdate){
    const sourceNote = newDashboard.notes.get(sourceNoteId)
    const targetNote = newDashboard.notes.get(targetNoteId)
    detachFromPosition(newDashboard, sourceNote, backupMeta)
    attachToPosition(newDashboard, sourceNote, targetNote, dir, backupMeta, blockUpdate)
}

export function detachFromPosition(newDashboard, note, backupMeta){
    const noteAtLeft = newDashboard.notes.get(note.leftLink)
    const noteAtRight = newDashboard.notes.get(note.rightLink)
    // detach note from its position
    if(noteAtLeft){
        noteAtLeft.rightLink = note.rightLink
        backupMeta(noteAtLeft)
    }
    if(noteAtRight){
        noteAtRight.leftLink = note.leftLink
        backupMeta(noteAtRight)
        if(note.id===newDashboard.firstNoteId){
            newDashboard.firstNoteId = noteAtRight.id
        }
    }
}

export function attachToPosition(newDashboard, sourceNote, noteAtTargetPos, dir, backupMeta, blockUpdate){
    const noteAtLeft = newDashboard.notes.get(noteAtTargetPos.leftLink)
    const noteAtRight = newDashboard.notes.get(noteAtTargetPos.rightLink)

    if(dir){
        sourceNote.rightLink = noteAtTargetPos.id
        noteAtTargetPos.leftLink = sourceNote.id
        if(noteAtLeft){
            sourceNote.leftLink = noteAtLeft.id
            noteAtLeft.rightLink = sourceNote.id
            backupMeta(noteAtLeft)
        }
        else{
            sourceNote.leftLink = null
            newDashboard.firstNoteId = sourceNote.id
        }
    }
    else{
        sourceNote.leftLink = noteAtTargetPos.id
        noteAtTargetPos.rightLink = sourceNote.id
        if(noteAtRight){
            sourceNote.rightLink = noteAtRight.id
            noteAtRight.leftLink = sourceNote.id
            backupMeta(noteAtRight)
        }
        else{
            sourceNote.rightLink = null
        }
    }
    if(!blockUpdate){
        backupMeta(sourceNote)
    }
    backupMeta(noteAtTargetPos)
}

// Truncates a string with three dots
export function truncString (string, n){
    return string.substr(0,n-1)+(string.length>n?'...':'');
};

// Gets a caption from a notes preview
export function getCaption(targetNote){
    if(targetNote){
        const newPreview = targetNote.preview.replace('<br/>', '<br>').replace('<p></p><p><br></p>', '')
        return truncString(newPreview.split('<br>')[0].replace(/<[^>]*>?/gm, ''), 100)
    }
    else{
        return ''
    }
}

// Check if the note defined by idx has any conflict with any other note
export function checkConflicts (newDashboard, checkingId) {
    const reducer = (cumulativeClause, id) => 
        cumulativeClause && 
        !newDashboard.notes.get(id).thread.includes(checkingId) && 
        !newDashboard.notes.get(id).branches.includes(checkingId)
    const noConflictsFlag = [...newDashboard.notes.keys()].reduce(reducer, true);
    return noConflictsFlag
}

// Copy note with a fresh ui_id so that it can be used as draggable
export function copyNote (note) {
    return {
        ui_id: nanoid(),
        id: note.id,
        text: note.text,
        preview: note.preview,
        branches: note.branches,
        roots: note.roots,
        thread: note.thread,
        collection: note.collection,
        pinned: note.pinned,
        color: note.color,
        colorPreview: note.colorPreview,
        attachedImg: note.attachedImg,
        leftLink: note.leftLink,
        rightLink: note.rightLink
    }
}

// If the note has an image at the first position, it 
// replaces the text with the image so that it can be used as a preview
// just an efficiency trick
export function createThumbnail(note){
    if(note.attachedImg && note.attachedImg.length){
        const [imgStart, imgEnd, isFirst] = note.attachedImg
        if(isFirst && note.text.length > imgEnd-imgStart){
            note.text = note.text.substring(imgStart, imgEnd).split('"')[0]
        }
    }
    else{
        delete note.text
    }
}

// Get a fresh note with new ID
export function getNewNote(){
    const newNote = {
        id: nanoid(),
        text: '',
        preview: '',
        branches: [],
        roots: [],
        thread: [],
        collection: [],
        pinned: false,
        color: '#ffffff',
        colorPreview: '#ffffff',
        attachedImg: false,
        version: 0,
        leftLink: null,
        rightLink: null
    }
    return newNote
}

// Set the preview of a note based on the note itself
export function setPreview(note){

    // regular expression to check whether the note contains an image
    const re = /<img src=.*?>/gm
    const img = re.exec(note.text)

    // if so, set the note.attachedImg attribute with info about the position of the img in the html 
    if(img){
        const isFirst = note.text.substring(0, img.index).replace( /(<([^>]+)>)|(\s|(&nbsp))*/gm, '')===''
        note.attachedImg = [img.index+10, img.index+img[0].length, isFirst]
    }
    else{
        note.attachedImg = false
    }

    // remove all spaces to compute the preview
    var preview = truncate.default(
            note.text.replace(/<p><br\/><\/p>|<p>(\s|(&nbsp))*<\/p>|<img .*?>/gm,''), 
            PREVIEWLIMIT,
            {ellipsis: '...'}
        )

    // if the preview is empty
    if(preview.replace( /(<([^>]+)>)/ig, '')===''){

        // if there is an image
        if(note.attachedImg){
            preview = 'image only note'
        }

        // if the preview is empty and the note has no images either
        else{
            preview = 'empty note kept for its links'
        }
    }
    note.preview = preview
}

// Tiny suspense loader component to avoid blank loading pages
export const suspenseLoader = (
    <div style={{
        justifyContent: 'center', 
        display: 'flex'
        }}
    >
        <Loader
            type="ThreeDots"
            color="#c6c6c6"
            height={50}
            width={50}
            style={{
                marginTop: '25%'
            }}
        />
    </div>
)

// Utils function to see if two arrays are equal in a shallow way
export function arraysEqual(array1, array2){
    var areDifferent = false
    // if length is different, changes are sure
    if(array1.length!==array2.length){
        areDifferent=true
    }

    // otherwise check element by element
    else{
        for(let i=0; i<array1.length; i++){
            if(array1[i]!==array2[i]){
                areDifferent=true
            }
        }
    }
    return areDifferent
}

export function sanitiseForRemoval(newDashboard, removingId){
    // sanitise the dashboard to prevent conflicts from the removal of the removingId note
    const removingNote = newDashboard.notes.get(removingId)

    if(newDashboard.openedWorkspaceId===removingId){
        newDashboard.openedWorkspaceId = null
    }
    if(newDashboard.openedCollectionId===removingId){
        newDashboard.openedCollectionId = null
    }
    if(newDashboard.selectedNoteId===removingId){
        newDashboard.selectedNoteId = null
    }
    if(newDashboard.prevSelectedNoteId===removingId){
        newDashboard.prevSelectedNoteId = null
    }
    if(newDashboard.firstNoteId===removingId){
        if(removingNote && removingNote.rightLink){
            const noteAtRight = newDashboard.notes.get(removingNote.rightLink)
            if(noteAtRight){
                newDashboard.firstNoteId = noteAtRight.id
                noteAtRight.leftLink = null
                noteAtRight.version += 1
                db.notes.update(noteAtRight.id, noteAtRight)
            }
        }
    }
    if(removingNote && !removingNote.rightLink){
        const newLastNote = newDashboard.notes.get(removingNote.leftLink)
        if(newLastNote){
            newLastNote.rightLink = null
            newLastNote.version += 1
            db.notes.update(newLastNote.id, newLastNote)
        }
    }
    newDashboard.workspaceIds = newDashboard.workspaceIds.filter(id => id!==removingId)
}

// Function to decide what note to select when the editor is closed
export function currOrPrevNoteDecice(newDashboard){
    if(SHAREDMEX.editorModeSelection==='prev'){
        const previousSelectedNote = newDashboard.notes.get(newDashboard.prevSelectedNoteId)
        if(previousSelectedNote){
            newDashboard.selectedNoteId = previousSelectedNote.id
        }
        SHAREDMEX.editorModeSelection = 'curr'
    }
}


