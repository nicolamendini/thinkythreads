/*
Author: Nicola Mendini
Date: 11/2021
ThinkyThreads Project
DownloadHelper functions
Contains functions that help the retrieval of notes on GDrive
*/

import { driveVariables, db } from "../components/Dashboard";
import { removeNoteFile } from "./BackupHelper";
import { createThumbnail, sanitiseForRemoval } from "./DashboardUtils";
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
    setDashboardReady,
    finishedProcesses
){

    // create the note object and add the text field and version
    const newNote = JSON.parse(metaResp.result.files[currIdx].description)
    newNote.text = mediaResp.body
    if(!newNote.text){
        removeNoteFile(metaResp.result.files[currIdx].id, setNotesUpdating)
    }
    else{
        newNote.version = parseInt(metaResp.result.files[currIdx].appProperties.version)

        // add it to the dashboard and backup locally
        newDashboard.notes.set(newNote.id, newNote)
        if(!newNote.leftLink){
            const prevFirstNote = newDashboard.notes.get(newDashboard.firstNoteId)
            if(prevFirstNote){
                prevFirstNote.leftLink = newNote.id
                prevFirstNote.version += 1
                db.notes.update(prevFirstNote.id, prevFirstNote)
            }
            newDashboard.firstNoteId = newNote.id
            console.log('added first note', newNote.id)
        }
        db.notes.put(newNote).then(
            // check if it needs a thumbnail and create it
            createThumbnail(newNote)
        )
    }

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
                setDashboardReady, 
                metaResp.result.nextPageToken
            )
        }

        // otherwise if all the files have been processed, update the notes on drive
        else{
            console.log('chiamato qui 2')
            updateDriveNotes(
                newDashboard, 
                notesOnDrive, 
                setNotesUpdating, 
                setDashboardReady
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
    setDashboardReady, 
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
            setDashboardReady,
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
        setDashboardReady,
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
    setDashboardReady
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
                    setDashboardReady,
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
                sanitiseForRemoval(newDashboard, noteId)
                console.log('deleted first note', noteId)
            }
            finishedProcesses.count +=1
        }
    }

    if(finishedProcesses.count === metaResp.result.files.length){
        // if there are other pages, try with the next one
        if(metaResp.result.nextPageToken){
            getNotesPage(
                newDashboard, 
                notesOnDrive, 
                setNotesUpdating, 
                setDashboardReady, 
                metaResp.result.nextPageToken
            )
        }

        // otherwise update the notes on drive because they might be outdated
        else{
            updateDriveNotes(
                newDashboard, 
                notesOnDrive, 
                setNotesUpdating, 
                setDashboardReady
            )
        }
    }
}

// Function to get the metas of a whole drive page
export function getNotesPage(
    newDashboard, 
    notesOnDrive, 
    setNotesUpdating, 
    setDashboardReady, 
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
            setDashboardReady
        )
        
    }).catch((error) => errorCatcher(
        error, 
        counter, 
        getNotesPage, 
        newDashboard, 
        notesOnDrive, 
        setNotesUpdating,
        setDashboardReady,
        targetPageToken
    ))
}

// Function that starts the recursion, try to restore notes from drive
// if not, update the notes on drive if needed
export function getAllNotes(
    newDashboard, 
    setNotesUpdating, 
    setDashboardReady, 
    counter
){

    // notesOnDrive keeps track of the backup/restoring process
    if(!counter){counter=0}
    const notesOnDrive = {}

    getNotesPage(
        newDashboard, 
        notesOnDrive,  
        setNotesUpdating, 
        setDashboardReady
    )
}

// Update the notes on google drive if they might be outdated
export function updateDriveNotes(
    newDashboard, 
    notesOnDrive, 
    setNotesUpdating, 
    setDashboardReady
){
    var updatesCounter = 0

    for(const [key, note] of newDashboard.notes){

        const sampleVersion = notesOnDrive[key]
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
    console.log('setting dashboard')
    setDashboardReady(newDashboard)
}