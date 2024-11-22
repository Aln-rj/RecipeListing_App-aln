import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchRecipes } from '../../Redux/recipeSlice';
import Pagination from './Pagination';
import SearchBar from './SearchBar';

const RecipeList = () => {
  const dispatch = useDispatch();
  const { 
    items, 
    loading, 
    error, 
    currentPage, 
    totalResults,
    cuisine 
  } = useSelector(state => state.recipes);

  useEffect(() => {
    dispatch(fetchRecipes({ page: currentPage, cuisine }));
  }, [dispatch, currentPage, cuisine]);

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (error) return <div className="text-center mt-5 text-danger">Error: {error}</div>;

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Recipe List</h1>
      <SearchBar />
      
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {items.map(recipe => (
          <div key={recipe.id} className="col">
            <div className="card h-100">
              <img 
                src={recipe.image} 
                className="card-img-top" 
                alt={recipe.title}
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="card-title">{recipe.title}</h5>
                <Link 
                  to={`/recipe/${recipe.id}`} 
                  className="btn btn-primary"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Pagination 
        currentPage={currentPage} 
        totalResults={totalResults} 
        itemsPerPage={10}
      />
    </div>
  );
};

export default RecipeList;