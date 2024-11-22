import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCuisine } from '../../Redux/recipeSlice';

const SearchBar = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');

  
  const cuisineOptions = [
    'American',
    'British',
    'Canadian',
    'Chinese',
    'Croatian',
    'Dutch',
    'Egyptian',
    'French',
    'Greek',
    'Indian',
    'Irish',
    'Italian',
    'Jamaican',
    'Japanese',
    'Kenyan',
    'Malaysian',
    'Mexican',
    'Moroccan',
    'Polish',
    'Portuguese',
    'Russian',
    'Spanish',
    'Thai',
    'Turkish',
    'Vietnamese'
  ];

  const handleCuisineChange = (e) => {
    const selectedCuisine = e.target.value;
    setSearchTerm(selectedCuisine);
    dispatch(setCuisine(selectedCuisine));
  };

  return (
    <div className="mb-4">
      <div className="row">
        <div className="col-md-6">
          <select 
            className="form-select"
            value={searchTerm}
            onChange={handleCuisineChange}
          >
            <option value="">Select Cuisine</option>
            {cuisineOptions.map(cuisine => (
              <option key={cuisine} value={cuisine}>
                {cuisine}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;