/*
Author: Nicola Mendini
Date: 11/2021
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
import { SHAREDMEX, SLICESIZE } from './Dashboard';

// Max size of a row of notes, it is necessary to press the arrow
// button to access further notes
// Function used to change slice based on which arrow button has been pressed
const align = (dir, currentSlice, setCurrentSlice, notes, areaName) => {

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
	if(areaName==='search-area'){
		SHAREDMEX.currentSearchSlice = currentSlice+dir
	}
}

const tryFocusOnNote = (selectedNote, slicedNotes) => {
	// If there is a selectedNote to scroll to, do it
	if(selectedNote){
		const focusPos = slicedNotes.find(note => note.id === selectedNote.id)
		if(focusPos){
			const targetElement = document.getElementById(focusPos.ui_id)
			if(targetElement){
				targetElement.scrollIntoView({inline: 'center'})
				return true
			}
		}
	}
}

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
	draggableInfo,
	searchProps,
	setSearchProps,
	triggerRerender
}) => {

	const retrievedSlice = window.sessionStorage.getItem('current-slice-'+areaName)
	// State that defines the slice the user is at
	const [currentSlice, setCurrentSlice] = useState(
		retrievedSlice ? 
		parseInt(retrievedSlice) :
		0
	)
	// State to hide the NotesList until the scroll is performed, used to avoid flickering
	const [isVisible, setIsVisible] = useState(false)

	// Effect to set back the scroll once exiting the editor
	useEffect(() => {
		if(!SHAREDMEX.usingScrollKeys){
			if(areaName !=='search-area' && !SHAREDMEX.closingEditor){
				tryFocusOnNote(selectedNote, slicedNotes)
			}
			else{
				const holder = document.getElementById(areaName)
				if(holder){
					if(SHAREDMEX.resetSearchScroll){
						holder.scrollLeft = 0
						SHAREDMEX.resetSearchScroll = false
					}
					else{
						holder.scrollLeft = SHAREDMEX[areaName+'-scroll']
					}
				}
			}
		}
		
		// Otherwise, if there are no notes in the current slices, go to slice 0
		if(!slicedNotes.length && currentSlice!==0){
			setCurrentSlice(0)
			window.sessionStorage.setItem('current-slice-'+areaName, 0)
			SHAREDMEX[areaName+'-scroll'] = 0
			if(areaName === 'search-area'){
				SHAREDMEX.currentSearchSlice = 0
			}
		}
		setIsVisible(true)
	// eslint-disable-next-line
	}, [notes])

	// effect to keep the selected note at the center if the user is scrolling with the keys
	useEffect(() => {
		if(areaName==='search-area' && SHAREDMEX.usingScrollKeys){
			tryFocusOnNote(selectedNote, slicedNotes)
			SHAREDMEX.usingScrollKeys = false
			setIsVisible(true)
		}
	// eslint-disable-next-line
	},[selectedNote])

	// Effect to restore the search to the first slice
	useEffect(() => {
		if(areaName==='search-area' && searchProps.goClean && currentSlice > 0){
			setCurrentSlice(0)
			window.sessionStorage.setItem('current-slice-'+areaName, 0)
			SHAREDMEX.currentSearchSlice = 0
		}
	// eslint-disable-next-line
	}, [searchProps])

	useEffect(() => {
		if(areaName==='search-area'){
			const newSearchProps = {...searchProps}
			if(currentSlice > 0){
				newSearchProps.areSlicesScrolled = true
			}
			else{
				newSearchProps.areSlicesScrolled = false
			}
			if(searchProps.goClean){
				const container = document.getElementById(areaName)
				container.scrollLeft = 0
				newSearchProps.goClean = false
			}
			setSearchProps(newSearchProps)
		}
	// eslint-disable-next-line
	}, [currentSlice])

	useEffect(()=>{
		if(isVisible){
			SHAREDMEX.closingEditor = false
		}
	},[isVisible])

	const saveScroll = () => {
		const container = document.getElementById(areaName)
		if(container){
			SHAREDMEX[areaName+'-scroll'] = container.scrollLeft
		}
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
						onScroll={() => saveScroll()}
						>
							<div>
								{currentSlice>0 ?
									darkMode ?
										<BsChevronLeft 
											className='tools-btn arrow-btn'
											onClick={() => align(-1, currentSlice, setCurrentSlice, notes, areaName)}
											size='2.5em'
											color='#666666'
										/>
									:
										<FcPrevious 
											className='tools-btn arrow-btn'
											onClick={() => align(-1, currentSlice, setCurrentSlice, notes, areaName)}
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
										id='plus'
									/>
									:
									<FcPlus
										className='tools-btn arrow-btn add-btn'
										onClick={() => handleAddNote()}
										size='2.25em'
										id='plus'
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
									triggerRerender={triggerRerender}
								/>
							))}

							{provided.placeholder}

							<div> 
								{(currentSlice+1)*SLICESIZE+SLICESIZE<notes.length ? 

									darkMode ?
										<BsChevronRight 
											className='tools-btn arrow-btn'
											onClick={() => align(1, currentSlice, setCurrentSlice, notes, areaName)}
											size='2.5em'
											color='#666666'
										/>
									:
										<FcNext 
											className='tools-btn arrow-btn'
											onClick={() => align(1, currentSlice, setCurrentSlice, notes, areaName)}
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
