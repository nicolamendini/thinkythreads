/*
Author: Nicola Mendini
Date: 13/09/2021
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
    darkMode
}) => {

    // Disable dropping here unless the note comes from the search area
    // and it is empty if you are trying to wrap an unsaved thread/collection
    // or it is full if you are trying to expand it to show its content
    const isDropDisabled = 
        draggableInfo.sourceArea!=='search-area' ||
        (
            notesLength>0 ? (

                draggableInfo.note.thread.length>0 || 
                draggableInfo.note.collection.length>0
            )
            :
            (
                !draggableInfo.note.thread.length && 
                !draggableInfo.note.collection.length 
            )
            
        ) ||
        (notes.find(note => note.id===draggableInfo.note.id)!==undefined)
    
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
                        notesLength > 0 ? (
                            {
                            ...(
                                threadOrCollection ? {backgroundColor:'#fef3bd'} 
                                : {backgroundColor:'#c4def6'}
                            ), 
                            ...(!snapshot.isDraggingOver && {minWidth:"8vh"})
                            })
                        : 
                        darkMode ?
                        {backgroundColor: '#2e2e2e', minWidth:"8vh", color: '#666666'}
                        :
                        {backgroundColor: '#e7e7e7', minWidth:"8vh"}
                    }
                >

                <div className='vertical-text'>{notesLength>0 ? 'WRAP' : 'drop to expand'}</div>

                {provided.placeholder}

                {
                    snapshot.isDraggingOver?
                    
                        (notesLength > 0 ?
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
                        ) : null
                }

                </div>

            )}

        </Droppable>

    )
}
export default Wrapper