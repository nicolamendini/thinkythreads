/*
Author: Nicola Mendini
Date: 13/09/2021
ThinkyThreads Project
DashboardUtils function
Utils functions to perform small operations
*/

import { nanoid } from "nanoid";
import { PREVIEWLIMIT } from "../components/Dashboard";
import Loader from 'react-loader-spinner';
import React from 'react'

const truncHtml = require('trunc-html');

// Adds element at a certain position
export function addElementAt (sequence, position, element) {
    return [...sequence.slice(0, position), element, ...sequence.slice(position)]
}

// Removes the element at a given position
export function removeElementAt (sequence, position) {
    return [...sequence.slice(0, position), ...sequence.slice(position+1)];
}

// Moves a note within an area
export function moveNoteInsideArea (area, originalIndex, targetIndex) {
    var newArea = removeElementAt(area, originalIndex)
    const note = area[originalIndex];
    newArea = [...newArea.slice(0, targetIndex), note, ...newArea.slice(targetIndex)]
    return newArea;
}

// Truncates a string with three dots
export function truncString (string, n){
    return string.substr(0,n-1)+(string.length>n?'...':'');
};

// Gets a caption from a notes preview
export function getCaption(targetNote){
    return truncString(targetNote.preview.replace(/<[^>]*>?/gm, ''), 35)
}

// Check if the note defined by idx has any conflict with any other note
export function checkConflicts (newDashboard, checkingId) {
    const reducer = (cumulativeClause, id) => 
        cumulativeClause && 
        !newDashboard.notes.get(id).thread.includes(checkingId) && 
        !newDashboard.notes.get(id).branches.includes(checkingId);
    const noConflictsFlag = newDashboard.notesOrder.reduce(reducer, true);
    return noConflictsFlag;
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
        attachedImg: note.attachedImg
    };
}

// If the note has an image at the first position, it 
// replaces the text with the image so that it can be used as a preview
// just an efficiency trick
export function createThumbnail(note){
    if(note.attachedImg.length){
        const [imgStart, imgEnd, isFirst] = note.attachedImg
        if(isFirst && note.text.length > imgEnd-imgStart){
            note.text = note.text.substring(imgStart, imgEnd)
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
        version: 0
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
        note.attachedImg = [img.index+10, img.index+img[0].length-2, isFirst]
    }
    else{
        note.attachedImg = false
    }

    // remove all spaces to compute the preview
    var preview = truncHtml(note.text.replace(
            /<p><br\/><\/p>|<p>(\s|(&nbsp))*<\/p>|<img .*?>/gm,''), 
            PREVIEWLIMIT
        ).html

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
    note.preview = preview;
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


