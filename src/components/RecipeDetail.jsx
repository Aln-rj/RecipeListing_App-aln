import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipeDetails } from '../../Redux/recipeSlice';


const RecipeDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedRecipe, loading, error } = useSelector(state => state.recipes);

  useEffect(() => {
    dispatch(fetchRecipeDetails(id));
  }, [dispatch, id]);

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (error) return <div className="text-center mt-5 text-danger">Error: {error}</div>;
  if (!selectedRecipe) return null;

  return (
    <div className="container mt-4">
      <Link to="/" className="btn btn-secondary mb-4">← Back to Recipes</Link>
      
      <div className="card">
        <div className="row g-0">
          <div className="col-md-4">
            <img 
              src={selectedRecipe.image} 
              className="img-fluid rounded-start" 
              alt={selectedRecipe.title}
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h2 className="card-title">{selectedRecipe.title}</h2>
              <p className="card-text">
                <small className="text-muted">
                  Ready in {selectedRecipe.readyInMinutes} minutes | 
                  Servings: {selectedRecipe.servings}
                </small>
              </p>
              
              <div className="mb-3">
                <h4>Ingredients:</h4>
                <ul className="list-group list-group-flush">
                  {selectedRecipe.extendedIngredients?.map((ingredient, index) => (
                    <li key={index} className="list-group-item">
                      {ingredient.original}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-3">
                <h4>Instructions:</h4>
                <div 
                  dangerouslySetInnerHTML={{ __html: selectedRecipe.instructions }} 
                  className="card-text"
                />
              </div>

              <div>
                <h4>Additional Information:</h4>
                <p>
                  <strong>Diets:</strong> {selectedRecipe.diets?.join(', ') || 'None listed'}
                </p>
                <p>
                  <strong>Cuisine:</strong> {selectedRecipe.cuisines?.join(', ') || 'Not specified'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;