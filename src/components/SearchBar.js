/*
Author: Nicola Mendini
Date: 13/09/2021
ThinkyThreads Project
SearchBar component
*/

import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { FcSearch } from 'react-icons/fc';

const SearchBar = ({ 
	setSearchProps, 
	searchProps ,
	isDropDisabled
}) => {

	return (

		<Droppable 
			droppableId={'search-bar'}
			isDropDisabled={isDropDisabled}
		>
			{(provided, snapshot) => (
                <div 
                    className='search'
                    {...provided.droppableProps} 
                    ref={provided.innerRef} 
				>

					<FcSearch className='search-icons' size='2em' />
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
