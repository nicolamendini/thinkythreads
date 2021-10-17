/*
Author: Nicola Mendini
Date: 13/09/2021
ThinkyThreads Project
DownloadHelper functions
Contains functions that help the retrieval of notes on GDrive
*/

import { driveVariables, db } from "../components/Dashboard";
import { createThumbnail } from "./DashboardUtils";
import { getMediaRequestById, errorCatcher, sendUpdateRequest } from "./RequestsMakers";

// Function to create a new note from a drive file response
// takes both the metaResponse and the mediaResponse
// currIdx defines the index of the current file on drive
// notesOnDrive stores all the notes that have been found on drive
export function setNoteFromResp(
    newDashboard, 
    notesOnDrive, 
    metaResp, 
    mediaResp, 
    currIdx, 
    setNotesUpdating, 
    packDashboard,
    finishedProcesses
){

    // create the note object and add the text field and version
    const newNote = JSON.parse(metaResp.result.files[currIdx].description)
    newNote.text = mediaResp.body;
    newNote.version = parseInt(metaResp.result.files[currIdx].appProperties.version)

    // add it to the dashboard and backup locally
    newDashboard.notes.set(newNote.id, newNote)
    db.notes.put(newNote).then(

        // check if it needs a thumbnail and create it
        createThumbnail(newNote)
    )
    finishedProcesses.count += 1
    setNotesUpdating((prev) => prev-1)

    // if all the notes on drive have been processed
    if(finishedProcesses.count === metaResp.result.files.length){

        // if there is a next page of files on drive, download the files of the next page
        if(metaResp.result.nextPageToken){
            getNotesPage(
                newDashboard, 
                notesOnDrive,  
                setNotesUpdating, 
                packDashboard, 
                metaResp.result.nextPageToken
            )
        }

        // otherwise if all the files have been processed, update the notes on drive
        else{
            updateDriveNotes(
                newDashboard, 
                notesOnDrive, 
                setNotesUpdating, 
                packDashboard
            )
        }
    }
}

// get a single notes media given the metaResponse and the currIdx
export function getNote(
    newDashboard, 
    notesOnDrive, 
    metaResp, 
    currIdx, 
    setNotesUpdating, 
    packDashboard, 
    finishedProcesses,
    counter
){
    if(!counter){counter=0}
    getMediaRequestById(metaResp.result.files[currIdx].id).then((mediaResp) =>

        // once the media is downloaded, create an object from it and add it to dashboard
        setNoteFromResp(
            newDashboard, 
            notesOnDrive, 
            metaResp, 
            mediaResp, 
            currIdx, 
            setNotesUpdating, 
            packDashboard,
            finishedProcesses
        )

    ).catch((error) => errorCatcher(
        error, 
        counter, 
        getNote, 
        newDashboard, 
        notesOnDrive, 
        metaResp, 
        currIdx,
        setNotesUpdating,
        packDashboard,
        finishedProcesses
    ))
}

// download a whole page of files metadatas 
// so that later you can access their content individually
export function setNotesPageFromResp(
    newDashboard, 
    notesOnDrive, 
    metaResp, 
    setNotesUpdating, 
    packDashboard
){

    // keep count of the files processed for this page
    var finishedProcesses = {count: 0}

    // for all the files on drive
    for(let i=0; i<metaResp.result.files.length; i++){

        // placeholder for the noteFile object and for the note id
        const noteFile = metaResp.result.files[i]
        const noteId = noteFile.name
        
        // else if the file was not a deleted one, add it to notesOnDrive
        const noteDeletedFlag = noteFile.appProperties.deleted==='true'
        if(!noteDeletedFlag){
            const driveNoteVersion = parseInt(noteFile.appProperties.version)
            notesOnDrive[noteId] = driveNoteVersion

            // retrieve the note and check that it exists
            const note = newDashboard.notes.get(noteId)
            if(!note || driveNoteVersion>note.version){
            
                // if not retrieve its media and download it
                getNote(
                    newDashboard, 
                    notesOnDrive, 
                    metaResp, 
                    i,  
                    setNotesUpdating, 
                    packDashboard,
                    finishedProcesses
                )
                setNotesUpdating((prev) => prev+1)
            }

            // if conditions not met, end the process 
            else{
                finishedProcesses.count +=1
            }
        }

        else{
            const removingNote = newDashboard.notes.get(noteId)
            if(removingNote){
                newDashboard.notes.delete(noteId)
                db.notes.delete(noteId)
            }
            finishedProcesses.count +=1
        }
    }

    // if there are other pages, try with the next one
    if(metaResp.result.nextPageToken){
        getNotesPage(
            newDashboard, 
            notesOnDrive, 
            setNotesUpdating, 
            packDashboard, 
            metaResp.result.nextPageToken
        )
    }

    // otherwise update the notes on drive because they might be outdated
    else if(finishedProcesses.count === metaResp.result.files.length){
        updateDriveNotes(
            newDashboard, 
            notesOnDrive, 
            setNotesUpdating, 
            packDashboard
        )
    }
}

// Function to get the metas of a whole drive page
export function getNotesPage(
    newDashboard, 
    notesOnDrive, 
    setNotesUpdating, 
    packDashboard, 
    targetPageToken, 
    counter
){

    if(!counter){counter=0}
    // list all files that are in that folder
    window.gapi.client.drive.files.list({
        fields: 'nextPageToken, files(description, id, name, appProperties)',
        q:"mimeType='application/json' and trashed=false and '" + 
        driveVariables.folderId + "' in parents",
        pageToken: targetPageToken

    }).then((metaResp) => {

        setNotesPageFromResp(
            newDashboard, 
            notesOnDrive, 
            metaResp, 
            setNotesUpdating, 
            packDashboard
        )
        
    }).catch((error) => errorCatcher(
        error, 
        counter, 
        getNotesPage, 
        newDashboard, 
        notesOnDrive, 
        setNotesUpdating,
        packDashboard,
        targetPageToken
    ))
}

// Function that starts the recursion, try to restore notes from drive
// if not, update the notes on drive if needed
export function getAllNotes(
    newDashboard, 
    setNotesUpdating, 
    packDashboard, 
    counter
){

    // notesOnDrive keeps track of the backup/restoring process
    if(!counter){counter=0}
    const notesOnDrive = {}

    getNotesPage(
        newDashboard, 
        notesOnDrive,  
        setNotesUpdating, 
        packDashboard
    )
}

// Update the notes on google drive if they might be outdated
export function updateDriveNotes(
    newDashboard, 
    notesOnDrive, 
    setNotesUpdating, 
    packDashboard
){
    var updatesCounter = 0

    for(const [key, note] of newDashboard.notes){

        const sampleVersion = notesOnDrive[key]

        console.log(sampleVersion, note.version)

        // for each of the notes that need to be updated, send a request
        if(!sampleVersion || sampleVersion<note.version){
            updatesCounter+=1
            sendUpdateRequest(key, updatesCounter, setNotesUpdating)
        }

        if(!note.leftLink){
            newDashboard.firstNoteId = note.id
        }
    }

    newDashboard.checkedAgainstDrive = true
    packDashboard(newDashboard)
}