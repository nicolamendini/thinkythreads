/*
Author: Nicola Mendini
Date: 13/09/2021
ThinkyThreads Project
DownloadHelper functions
Contains functions that help the retrieval of notes on GDrive
*/

import { shareDriveFolderId, db } from "../components/Dashboard";
import { createThumbnail } from "./DashboardUtils";
import { getMediaRequestById, errorCatcher, sendUpdateRequest } from "./RequestsMakers";
import { updateConfigFile, removeNoteFile } from "./BackupHelper";

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
    deletedNotes, 
    setDeletedNotes, 
    setNotesUpdating, 
    packDashboard
){

    // create the note object and add the text field and version
    const newNote = JSON.parse(metaResp.result.files[currIdx].description)
    newNote.text = mediaResp.body;
    newNote.version = metaResp.result.files[currIdx].appProperties.version

    // add it to the dashboard and backup locally
    newDashboard.notes.set(newNote.id, newNote);
    db.notes.put(newNote).then(

        // check if it needs a thumbnail and create it
        createThumbnail(newNote)
    )
    notesOnDrive.finishedProcesses += 1
    setNotesUpdating((prev) => prev-1)

    // if all the notes on drive have been processed
    if(notesOnDrive.finishedProcesses === metaResp.result.files.length){

        // if there is a next page of files on drive, download the files of the next page
        if(metaResp.result.nextPageToken){
            getNotesPage(
                newDashboard, 
                notesOnDrive, 
                deletedNotes, 
                setDeletedNotes, 
                setNotesUpdating, 
                packDashboard, 
                metaResp.result.nextPageToken
            )
        }

        // otherwise if all the files have been processed set the config file
        else{
            callSetConfig(
                notesOnDrive, 
                newDashboard, 
                packDashboard, 
                deletedNotes,
                setDeletedNotes,
                setNotesUpdating,
                true
            )
        }
    }
}

export function callSetConfig(
    notesOnDrive, 
    newDashboard, 
    packDashboard, 
    deletedNotes,
    setDeletedNotes,
    setNotesUpdating, 
    forceFlag
){
    // if a config file has been found and any note has been modified by data on drive,
    // overwrite the local configuration with the online one
    if(notesOnDrive.configFound){
        getMediaRequestById(notesOnDrive.configFound).then(
            (mediaResp) => {
                // if the config is not empty
                if(mediaResp.body!==''){
                    
                    // retrieve the notes order and check that it covers every single note stored
                    // must make sure that notes are not left out
                    const config = JSON.parse(mediaResp.body)
                    const notesKeys = [...newDashboard.notes.keys()]
                    const filteredNotesKeys = notesKeys.filter(
                        (id) => !config.notesEverDeleted.includes(id)
                    )

                    // forceFlag means that the drive notes were already used to replace local notes
                    // and therefore they get to update the config anyways
                    // otherwise if all the drive notes were not used so far,
                    // check if at least they are used for removing notes that the user deleted
                    // if no, then update them because they might be outdated
                    if(forceFlag || notesKeys.length!==filteredNotesKeys.length){
                        setConfigFromDrive(newDashboard, config, packDashboard)
                    }
                    else{
                        updateDriveNotes(
                            newDashboard, 
                            notesOnDrive, 
                            deletedNotes, 
                            setDeletedNotes, 
                            setNotesUpdating, 
                            packDashboard
                        )
                    }
                }
                else{
                    updateDriveNotes(
                        newDashboard, 
                        notesOnDrive, 
                        deletedNotes, 
                        setDeletedNotes, 
                        setNotesUpdating, 
                        packDashboard
                    )
                }
            }
        )
    }

    // otherwise initialise a new random order for the notes
    // this might happen if the config file is deleted
    else if (forceFlag){
        newDashboard.notesOrder = [...newDashboard.notes.keys()]
        newDashboard.checkedAgainstDrive = true
        updateConfigFile(newDashboard)
        packDashboard(newDashboard)
    }

    // if no drive notes have been used yet and no config file was found
    else{
        updateDriveNotes(
            newDashboard, 
            notesOnDrive, 
            deletedNotes, 
            setDeletedNotes, 
            setNotesUpdating, 
            packDashboard
        )
    }
}

// get a single notes media given the metaResponse and the currIdx
export function getNote(
    newDashboard, 
    notesOnDrive, 
    metaResp, 
    currIdx, 
    deletedNotes, 
    setDeletedNotes, 
    setNotesUpdating, 
    packDashboard, 
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
            deletedNotes, 
            setDeletedNotes, 
            setNotesUpdating, 
            packDashboard
        )

    ).catch((error) => errorCatcher(
        error, 
        counter, 
        getNote, 
        newDashboard, 
        notesOnDrive, 
        metaResp, 
        currIdx,
        deletedNotes,
        setDeletedNotes,
        setNotesUpdating,
        packDashboard
    ))
}

// download a whole page of files metadatas 
// so that later you can access their content individually
export function setNotesPageFromResp(
    newDashboard, 
    notesOnDrive, 
    metaResp, 
    deletedNotes, 
    setDeletedNotes, 
    setNotesUpdating, 
    packDashboard
){

    // keep count of the files processed
    notesOnDrive.finishedProcesses = 0

    // for all the files on drive
    for(let i=0; i<metaResp.result.files.length; i++){

        // placeholder for the noteFile object and for the note id
        const noteFile = metaResp.result.files[i]
        const noteId = noteFile.name

        // if config file encountered, store the id of the file and finish the process
        if(noteId==='___config'){
            notesOnDrive.configFound = noteFile.id
            notesOnDrive.finishedProcesses +=1
        }
        
        // else if the file was not a deleted one, add it to notesOnDrive
        else if(!deletedNotes.includes(noteId)){
            notesOnDrive.set(
                noteId, 
                noteFile.appProperties.version
            )

            // retrieve the note and check that it exists
            const note = newDashboard.notes.get(noteId)
            if(!note || noteFile.appProperties.version>note.version){
            
                // if not retrieve its media and download it
                // if even a single file is more updated than its local counterpart,
                // set the flag mightNeedUpdate to false so that local notes will not 
                // touch the online ones for now
                notesOnDrive.mightNeedUpdate = false
                getNote(
                    newDashboard, 
                    notesOnDrive, 
                    metaResp, 
                    i, 
                    deletedNotes, 
                    setDeletedNotes, 
                    setNotesUpdating, 
                    packDashboard
                )
                setNotesUpdating((prev) => prev+1)
            }

            // if conditions not met, end the process 
            else{
                notesOnDrive.finishedProcesses +=1
            }
        }

        else{
            notesOnDrive.finishedProcesses +=1
        }
    }

    // at the end of a page, if no note file was used to restore local notes
    if(notesOnDrive.mightNeedUpdate){

        // if there are other pages, try with the next one
        if(metaResp.result.nextPageToken){
            getNotesPage(
                newDashboard, 
                notesOnDrive, 
                deletedNotes, 
                setDeletedNotes, 
                setNotesUpdating, 
                packDashboard, 
                metaResp.result.nextPageToken
            )
        }

        // otherwise update the notes on drive because they might be outdated
        else{
            callSetConfig(
                notesOnDrive, 
                newDashboard, 
                packDashboard, 
                deletedNotes,
                setDeletedNotes,
                setNotesUpdating
            )
        }
    }

    // if no notes of the last page of drive are used to replace local notes
    // call the setConfigFromDrive from here rather than from setNoteFromResp
    else if(
    !notesOnDrive.mightNeedUpdate && 
    !metaResp.result.nextPageToken && 
    notesOnDrive.finishedProcesses === metaResp.result.files.length
    ){
        callSetConfig(
            notesOnDrive, 
            newDashboard, 
            packDashboard, 
            deletedNotes,
            setDeletedNotes,
            setNotesUpdating,
            true
        )
    }
}

// Function to get the metas of a whole drive page
export function getNotesPage(
    newDashboard, 
    notesOnDrive, 
    deletedNotes, 
    setDeletedNotes, 
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
        shareDriveFolderId + "' in parents",
        pageToken: targetPageToken

    }).then((metaResp) => {

        setNotesPageFromResp(
            newDashboard, 
            notesOnDrive, 
            metaResp, 
            deletedNotes, 
            setDeletedNotes, 
            setNotesUpdating, 
            packDashboard
        )
        
    }).catch((error) => errorCatcher(
        error, 
        counter, 
        getNotesPage, 
        newDashboard, 
        notesOnDrive, 
        deletedNotes,
        setDeletedNotes,
        setNotesUpdating,
        packDashboard,
        targetPageToken
    ))
}

// Function that starts the recursion, try to restore notes from drive
// if not, update the notes on drive if needed
export function getAllNotes(
    newDashboard, 
    deletedNotes, 
    setDeletedNotes, 
    setNotesUpdating, 
    packDashboard, 
    counter
){

    // notesOnDrive keeps track of the backup/restoring process
    if(!counter){counter=0}
    const notesOnDrive = new Map()
    notesOnDrive.configFound = false
    notesOnDrive.finishedProcesses = 0
    notesOnDrive.mightNeedUpdate = true

    getNotesPage(
        newDashboard, 
        notesOnDrive, 
        deletedNotes, 
        setDeletedNotes, 
        setNotesUpdating, 
        packDashboard
    )
}

// Sets a config file from the .config on drive
export function setConfigFromDrive(newDashboard, config, packDashboard){

    newDashboard.notesEverDeleted = config.notesEverDeleted

    for(const deletedNote of newDashboard.notesEverDeleted){
        if(newDashboard.notes.get(deletedNote)){

            // no need to call the note deleter because there will be no dependencies
            // as all the other local notes have already been updated
            newDashboard.notes.delete(deletedNote)
        }
    }

    // make sure you are not removing a note that is employed in the dashboard
    if(newDashboard.notesEverDeleted.includes(newDashboard.selectedNoteId)){
        newDashboard.selectedNoteId = null
    }
    if(newDashboard.notesEverDeleted.includes(newDashboard.openedCollectionId)){
        newDashboard.openedCollectionId = null
    }
    if(newDashboard.notesEverDeleted.includes(newDashboard.openedWorkspaceId)){
        newDashboard.openedWorkspaceId = null
    }
    newDashboard.workspaceIds = newDashboard.workspaceIds.filter(
        (id) => !newDashboard.notesEverDeleted.includes(id)
    )

    // if the config file includes all the notes and therefore is up to date
    if(config.notesOrder.length===newDashboard.notes.size){
        newDashboard.notesOrder = config.notesOrder
    }

    // otherwise just restore some pseudo order with the notes that we have and the previous order
    else{
        newDashboard.notesOrder = [...new Set([...newDashboard.notesOrder, ...config.notesOrder])]
    }   

    // backing up values received from drive
    window.localStorage.setItem('notes-order', JSON.stringify(newDashboard.notesOrder))
    window.localStorage.setItem('notes-ever-deleted', JSON.stringify(newDashboard.notesEverDeleted))

    // Tell the dashboard that the restoring is complete and backup the new order
    newDashboard.checkedAgainstDrive=true
    packDashboard(newDashboard)
}

// Update the notes on google drive if they might be outdated
export function updateDriveNotes(
    newDashboard, 
    notesOnDrive, 
    deletedNotes, 
    setDeletedNotes, 
    setNotesUpdating, 
    packDashboard
){
    var updatesCounter = 0

    for(const [key, note] of newDashboard.notes){

        const sampleVersion = notesOnDrive.get(key)

        // for each of the notes that need to be updated, send a request
        if(!sampleVersion || sampleVersion<note.version){
            
            updatesCounter+=1
            sendUpdateRequest(key, updatesCounter, setNotesUpdating)
        }
    }

    // For all the notes that have not been removed from drive yet, but they should, 
    // remove them 
    for(const removedNoteId of deletedNotes){

        updatesCounter+=1
        setTimeout(() => {
            removeNoteFile({id: removedNoteId}, deletedNotes, setDeletedNotes)
        }, (200 * updatesCounter))
    }

    // Once finished update the config file on drive
    newDashboard.checkedAgainstDrive=true
    if(updatesCounter || !notesOnDrive.configFound){
        updateConfigFile(newDashboard)
    }

    packDashboard(newDashboard)
}