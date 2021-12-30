/*
Author: Nicola Mendini
Date: 11/2021
ThinkyThreads Project
Wrapper component
Used to wrap an unsaved thread inside an empty note
or to expand the thread or collection contained in any
arbitrary note
*/

import {Droppable} from 'react-beautiful-dnd';
import React from 'react'

const Wrapper = ({
	threadOrCollection,
    notesLength,
    draggableInfo,
    notes,
    darkMode,
    workspaceFlag
}) => {

    // Disable dropping here unless the note comes from the search area
    // and it is empty if you are trying to wrap an unsaved thread/collection
    // or it is full if you are trying to expand it to show its content
    const isDropDisabled = 
        (workspaceFlag && draggableInfo.sourceArea==='workspace-area') 
        
        ||

        (workspaceFlag && draggableInfo.note.id!==null && notesLength>0 && (

            draggableInfo.note.thread.length>0 || 
            draggableInfo.note.collection.length>0
        ))
            
        
    
    return (

        <Droppable 
            droppableId='wrapper-area'
            isDropDisabled={isDropDisabled}
        >

            {(provided, snapshot) => (
                <div 
                    className='wrapper'
                    {...provided.droppableProps} 
                    ref={provided.innerRef} 
                    style={ 
                        (notesLength > 0 && workspaceFlag) ? (
                            (
                                darkMode ?
                                    threadOrCollection ? {backgroundColor:'#fccb00', color:'black', minWidth:"8vh"} 
                                    : {backgroundColor:'#1273de', color:'white', minWidth:"8vh"}
                                :
                                    threadOrCollection ? {backgroundColor:'#fef3bd', color:'black', minWidth:"8vh"} 
                                    : {backgroundColor:'#c4def6', color:'black', minWidth:"8vh"}
                            ) 
                            )
                        : 
                        darkMode ?
                        {backgroundColor: snapshot.isDraggingOver ? '#aaaaaa' : '#2e2e2e', minWidth:"8vh", color: '#666666'}
                        :
                        {
                            backgroundColor: snapshot.isDraggingOver ? draggableInfo.note.color : '#f4f4f4', 
                            minWidth: "8vh", 
                            boxShadow: '1px 0px 1px #dddddd', 
                            border: snapshot.isDraggingOver ? '1px dashed #aaaaaa' : undefined,
                        }
                    }
                >

                {
                    snapshot.isDraggingOver?
                    
                        ((notesLength > 0 && workspaceFlag) ?
                            (
                                <div className='vertical-text'>
                                    wrap <br></br> 
                                    {threadOrCollection ? ' thread ' : ' collection '}
                                    <br></br> 
                                    inside note
                                </div>
                            ) 
                        :
                            (
                                <div className='vertical-text'>
                                    expand
                                    <br></br> 
                                    {draggableInfo.note.thread.length ? 
                                        'thread' : 'collection'
                                    }
                                </div>
                            ) 
                        ) : <div className='vertical-text'>{(notesLength > 0 && workspaceFlag) ? 'wrap' : 'drop to expand'}</div>
                }

                {provided.placeholder}

                </div>

            )}

        </Droppable>

    )
}
export default Wrapper