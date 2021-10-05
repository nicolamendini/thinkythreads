/*
Author: Nicola Mendini
Date: 13/09/2021
ThinkyThreads Project
NotesList component
Defines a general list of notes that acts as a Droppable
in the framework of React Beautiful Dnd
*/

import Note from './Note';
import {Droppable} from 'react-beautiful-dnd';
import { useEffect, useState } from 'react';
import {FcNext, FcPrevious, FcPlus} from 'react-icons/fc';
import { BsChevronRight, BsChevronLeft } from 'react-icons/bs';
import { BsPlusSquare } from 'react-icons/bs'
import Wrapper from './Wrapper';
import React from 'react'

// Max size of a row of notes, it is necessary to press the arrow
// button to access further notes
const SLICESIZE = 12;

const NotesList = ({
	notes,
	handleAddNote,
	areaName,
	handleNotePress,
	darkMode,
	selectedNote,
	mergeMode,
	threadOrCollection,
	openEditor,
	workspaceFlag, 
	rootsOrBranches,
	isDropDisabled,
	draggableInfo
}) => {

	// State that defines the slice the user is at
	const [currentSlice, setCurrentSlice] = useState(
		window.sessionStorage.getItem('current-slice-'+areaName) ? 
		parseInt(window.sessionStorage.getItem('current-slice-'+areaName)) :
		0
	)
	// State to hide the NotesList until the scroll is performed, used to avoid flickering
	const [isVisible, setIsVisible] = useState(false)

	// Effect to set back the scroll once exiting the editor
	useEffect(() => {
		const slicedNotes = notes.slice(currentSlice*SLICESIZE, (currentSlice+1)*SLICESIZE+SLICESIZE)
		var scrollSucceded=false

		// If there is a selectedNote to scroll to, do it
		if(selectedNote){
			const focusPos = slicedNotes.find(note => note.id === selectedNote.id)
			if(focusPos){
				const targetElement = document.getElementById(focusPos.ui_id)
				if(targetElement){
					targetElement.scrollIntoView({inline: 'center'})
					scrollSucceded=true
				}
			}
		}

		// Otherwise, some search is performed but there are no notesin the current slices, go to slice 0
		if(!slicedNotes.length && currentSlice!==0 && !scrollSucceded && areaName==='search-area'){
			setCurrentSlice(0)
			window.sessionStorage.setItem('current-slice-'+areaName, 0)
		}
		setIsVisible(true)
	// eslint-disable-next-line
	}, [notes])

	// Function used to change slice based on which arrow button has been pressed
	const align = (dir) => {

		// Before changing slice, set up the autoscroll
		// Initialise a prop based on whether the button was next or prev
		const prop = dir===-1 ? {inline:'start'} : {inline:'end'}
		var focusPos = currentSlice*SLICESIZE+SLICESIZE-1

		// If overflows, go back to last note of the sequence
		if(focusPos>notes.length-1){
			focusPos=notes.length-1
		}

		// scroll into the last note of the previous slice to give the idea of continuity 
		// between slices
		document.getElementById(notes[focusPos].ui_id).scrollIntoView(prop);
		setCurrentSlice(currentSlice+dir)
		window.sessionStorage.setItem('current-slice-'+areaName, currentSlice+dir)
	}

	const slicedNotes = notes.slice(currentSlice*SLICESIZE, (currentSlice+1)*SLICESIZE+SLICESIZE)

	return (

		<div style={{visibility: isVisible ? 'visible' : 'hidden'}}>

			<Droppable 
				droppableId={areaName} 
				direction='horizontal' 
				className='droppable-wrapper' 
				isDropDisabled={isDropDisabled}
			>

				{(provided) => (

					<ul 
						className='notes-list' 
						{...provided.droppableProps} 
						ref={provided.innerRef} 
						id={areaName}
						>
							<div>
								{currentSlice>0 ?
									darkMode ?
										<BsChevronLeft 
											className='tools-btn arrow-btn'
											onClick={() => align(-1)}
											size='2.5em'
											color='#666666'
										/>
									:
										<FcPrevious 
											className='tools-btn arrow-btn'
											onClick={() => align(-1)}
											size='2.5em'
										/>
								: null}
							</div>

							{(areaName==='workspace-area' && workspaceFlag) &&

								<Wrapper 
									threadOrCollection={threadOrCollection}
									notesLength={notes.length}
									draggableInfo={draggableInfo}
									notes={notes}
									darkMode={darkMode}
								/>
							}

							<div>
								{(areaName==='search-area' && currentSlice===0) &&
									(darkMode ?
									<BsPlusSquare 
										className='tools-btn arrow-btn add-btn'
										onClick={() => handleAddNote()}
										size='2.25em'
										color='#555555'
										style={{transform: 'scale(0.8)'}}
									/>
									:
									<FcPlus
										className='tools-btn arrow-btn add-btn'
										onClick={() => handleAddNote()}
										size='2.25em'
									/>
									)
								}
							</div>

							{slicedNotes.map((note, index) => (

								<Note
									key={note.ui_id}
									note={note}
									areaName={areaName}
									index={index+currentSlice*SLICESIZE}
									handleNotePress={handleNotePress}
									darkMode={darkMode}
									selectedNote={selectedNote}
									mergeMode={mergeMode}
									openEditor={openEditor}
									rootsOrBranches={rootsOrBranches}
									threadOrCollection={threadOrCollection}
								/>
							))}

							{provided.placeholder}

							<div> 
								{(currentSlice+1)*SLICESIZE+SLICESIZE<notes.length ? 

									darkMode ?
										<BsChevronRight 
											className='tools-btn arrow-btn'
											onClick={() => align(1)}
											size='2.5em'
											color='#666666'
										/>
									:
										<FcNext 
											className='tools-btn arrow-btn'
											onClick={() => align(1)}
											size='2.5em'
										/>
								: null}
							</div>
					</ul>
				)}

			</Droppable>
		</div>
	);
};

export default NotesList;
