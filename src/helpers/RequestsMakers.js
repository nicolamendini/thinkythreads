/*
Author: Nicola Mendini
Date: 11/2021
ThinkyThreads Project
RequestMakers functions
Generally they create request that are then executed by other
functions, define the requests bodies
*/

import { db , driveVariables} from "../components/Dashboard"
import { createThumbnail } from "./DashboardUtils"
import { updateNoteFile, removeNoteFile } from "./BackupHelper"

// Function to create a Media Update request
// it changes the content of the file to be the text of the note
// as shown in the body field of the request
export function getMediaUpdateRequest(note, id){ 
    return window.gapi.client.request({
        path: 'upload/drive/v3/files/' + id,
        method: 'PATCH',
        params: {
            uploadType: 'media'
        },
        body: note.text
    })
}

// Function to convert a note into a metadata object
// that then gets attached to a file in a request
export function getMetadata(note){
    return {
        description : JSON.stringify({
            id: note.id,
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
        }),
        appProperties: {
            version: note.version,
            deleted: note.deleted
        }
    }
}

// Request to update the metadata only, 
// similar to the Media one except this passes the metadata
// object in the body
export function getMetaUpdateRequest(note, id){
    return window.gapi.client.request({
        path: 'drive/v3/files/' + id,
        method: 'PATCH',
        body: getMetadata(note)
    })
}

// Returns a request to create a file starting from a note
// the file is created inside the folder given by drive Folder Id
export function createNoteFile(note, metadata){
    if(!metadata){metadata = getMetadata(note)}
    metadata.mimeType = 'application/json'
    metadata.name = note.id
    metadata.fields = 'id'
    metadata.parents = [driveVariables.folderId]
    return window.gapi.client.drive.files.create({
            resource: metadata
        }
    )
}

// Returns a request to check if a file associated to a given note already exists 
// once the request is executed the response shows the search results
export function fileExistenceCheck(note){
    return window.gapi.client.drive.files.list({
        q:"name='"+ note.id +
        "' and mimeType='application/json' and trashed=false and '"+ 
        driveVariables.folderId + "' in parents",
    })
}

// Returns a request to get a notes media given the id of the note file directly
export function getMediaRequestById(fileId){
    return window.gapi.client.drive.files.get({
        mimeType: 'application/json',
        fileId: fileId,
        alt: 'media'
    })
}

// Error catcher functions used in all the functions that involve Google Drive API
// If an error occurs, call the function again with the same arguments up to 4 times
export function errorCatcher(error, counter, targetFunction, ...args){
    console.error(error)
    counter+=1
    if(counter<5){
        setTimeout(() => {
            targetFunction(...args, counter)
        }, 1000)
    }
    else{

        // If the function to call again is update and max calls have been attempted, 
        //subtract one from the counter because the backup will be interrupted
        if(targetFunction===updateNoteFile || targetFunction===removeNoteFile){
            const setNotesUpdating = args[2]
            setNotesUpdating((prev) => prev-1)
        }
    }
}

// Function called to backup a note both locally and on drive
// takes the note, a metaOrMedia flag that controls the kind of update
// and the setNotesUpdating Function used to keep track of the active updates
export function backupNote(note, metaOrMedia, setNotesUpdating){

    // Increment the notes version and make a copy of it that will be backed up
    note.version = parseInt(note.version) + 1
    const noteCopy = {...note}

    // If the note contains an image, backup the original text and reset the 
    // displaying text to the image itself. Exploits a trick to efficiently 
    // show an image preview when the note contains one at the beginning
    createThumbnail(note)

    // Perform the backup on drive as well if it is possible
    if(driveVariables.authorisation){
        updateNoteFile(noteCopy, metaOrMedia, setNotesUpdating)
    }

    // Perform the backup locally on indexedDB and store the text only when it is needed
    if(metaOrMedia==='meta'){
        delete noteCopy.text
        db.notes.update(noteCopy.id, noteCopy)
    }
    else{
        db.notes.put(noteCopy)
    }
}

// Returns an update request for a given note
// It is passed an updatesCounter to delay the execution of the update
// in the case that already many updates are occuring
// In other words it ensured that the requests are well separated in time
export function sendUpdateRequest(key, updatesCounter, setNotesUpdating){
    db.notes.get(key).then((dbNote) => 
        setTimeout(() => {
            updateNoteFile(dbNote, 'both', setNotesUpdating)
        }, (200 * updatesCounter))
    )
}