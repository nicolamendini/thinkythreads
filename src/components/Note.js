/*
Author: Nicola Mendini
Date: 11/2021
ThinkyThreads Project
Note component
Defines the single note object and all the actions that are possible with it
*/

import { Draggable } from 'react-beautiful-dnd';
import React from 'react';
import {RiPushpin2Fill} from 'react-icons/ri'
import { FaLink, FaFolder } from 'react-icons/fa'
import { ImTree } from 'react-icons/im'
import { FiPaperclip } from 'react-icons/fi'
import { SHAREDMEX } from './Dashboard';

// Note component takes the note to show, 
// the name of the area it compares in,
// the index of the note inside the sequence,
// handleNotePress to select a note if it is pressed,
// the darkMode, mergeMode, rootsOrBranches, threadOrCollection flags
// the selectedNote,
// the openEditor function to edit the note on double click


const Note = ({ 
	note, 
	areaName, 
	index, 
	handleNotePress, 
	darkMode, 
	selectedNote,
	mergeMode,
	openEditor,
	rootsOrBranches,
	triggerRerender

}) => {

	return (

			<Draggable key={note.ui_id} draggableId={note.ui_id} index={index}>
				{(provided, snapshot) => (
					
					<div>
						<li 
						className={
							(mergeMode && selectedNote.id===note.id && 'note no-scrollbar merge-mode')
							||
							(((darkMode && selectedNote && selectedNote.id===note.id && !SHAREDMEX.usingScrollKeys) && 
								'note note-dark no-scrollbar selected-note-dark') || 
							((darkMode && (!selectedNote || selectedNote.id!==note.id)) && 
								'note note-dark no-scrollbar') ||
							((!darkMode && selectedNote && selectedNote.id===note.id && !SHAREDMEX.usingScrollKeys) &&
								'note note-bright no-scrollbar selected-note') ||
							((!darkMode && (!selectedNote ||selectedNote.id!==note.id)) &&
								'note note-bright no-scrollbar')) 
						}
						name={note.id}
						id={note.ui_id}
						ref={provided.innerRef} 
						{...provided.draggableProps}
						{...provided.dragHandleProps}
						onClick={()=> selectedNote&&selectedNote.id===note.id ? openEditor(note) : areaName!=='branches-area' && handleNotePress(note)}
						onDoubleClick={()=> areaName==='branches-area' && openEditor(note)}
						onContextMenu={(e) => {e.preventDefault(); areaName==='branches-area' && handleNotePress(note)}}
						style={ 
							!(mergeMode && selectedNote.id===note.id) ? (
								!darkMode && note.color!=='#ffffff' ? 
									(selectedNote && selectedNote.id===note.id ? 
										{backgroundColor: note.color, ...provided.draggableProps.style} : 
									{backgroundColor: note.color, border: '1px solid '+ note.color, ...provided.draggableProps.style}) : 
										(note.color!=='#ffffff' ? 
											{backgroundImage: 'linear-gradient(25deg, rgb(92, 92, 92) 92%, '+note.colorPreview + ' 92%)', ...provided.draggableProps.style} 
											: provided.draggableProps.style))
							: provided.draggableProps.style
							}
						>
							{snapshot.isDropAnimating}
							{selectedNote && selectedNote.id===note.id && triggerRerender}
							<div>
								{note.pinned && areaName==='search-area' &&
									<RiPushpin2Fill size='10px' className='header-icon'/>
								}
								{note.thread.length ?
									<FaLink size='10px' className='header-icon'/> : ''
								}
								{note.collection.length ?
									<FaFolder size='10px' className='header-icon'/> : ''
								}

								{!rootsOrBranches && note.branches.length ?
									<ImTree size='10px' className='header-icon'/> : ''
								}
								{rootsOrBranches && note.roots.length ?
									<ImTree size='10px' className='header-icon' style={{transform: 'scaleY(-1)'}}	/> : ''
								}
								{note.attachedImg && !note.attachedImg[2] ?
									<FiPaperclip size='10px' className='header-icon' style={{transform:'rotate(-45deg)'}}/> : ''
								}
								
							</div>
							{(!note.attachedImg || !note.attachedImg[2]) ?
								<div className='note-content no-scrollbar' dangerouslySetInnerHTML={{__html: note.preview}}></div> : 
								<div className='just-background-note' style={{backgroundImage: 'url('+ note.text +')'}}></div>
							}
						</li>
					</div>
				)}
			</Draggable>
	);
};

export default Note;
