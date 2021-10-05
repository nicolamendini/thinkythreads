/*
Author: Nicola Mendini
Date: 13/09/2021
ThinkyThreads Project
SearchBar component
*/

import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { FcSearch } from 'react-icons/fc';
import { BiSearchAlt } from 'react-icons/bi'

const SearchBar = ({ 
	setSearchProps, 
	searchProps ,
	isDropDisabled,
	darkMode
}) => {

	return (

		<Droppable 
			droppableId={'search-bar'}
			isDropDisabled={isDropDisabled}
		>
			{(provided, snapshot) => (
                <div 
                    className={darkMode ? 'search-dark' : 'search-bright'}
                    {...provided.droppableProps} 
                    ref={provided.innerRef} 
				>
					{darkMode ?
						<BiSearchAlt className='search-icons' size='2em' style={{transform: 'scale(0.8)'}}/>
					:
						<FcSearch className='search-icons' size='2em' />
					}
					{provided.placeholder}

					<input
						onChange={(event) =>
							setSearchProps({
								searchText: event.target.value.toLowerCase(), 
								threadFilter: searchProps.threadFilter, 
								collectionFilter: searchProps.collectionFilter}
							)}
						type='text'
						placeholder={
							snapshot.isDraggingOver ?
								'Work within this collection'
							: 
								'Type to search'
							}
						value={searchProps.searchText}
					/>

					<span 
						className='search-filter tools-btn' 
						style={searchProps.threadFilter ?  {color:'red'} : {}}
						onClick={() =>
							setSearchProps({
								searchText: searchProps.searchText, 
								threadFilter: !searchProps.threadFilter, 
								collectionFilter: searchProps.collectionFilter}
							)}
					>
						T
					</span>

					<span 
						className='search-filter tools-btn'
						style={searchProps.collectionFilter ? {color:'red'} : {}}
						onClick={() =>
							setSearchProps({
								searchText: searchProps.searchText, 
								threadFilter: searchProps.threadFilter, 
								collectionFilter: !searchProps.collectionFilter}
							)}
					>
						C
					</span>

				</div>
			)}

		</Droppable>
	);
};

export default SearchBar;
