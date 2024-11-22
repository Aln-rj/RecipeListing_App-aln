import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
export const fetchRecipes = createAsyncThunk(
  'recipes/fetchRecipes',
  async ({ page = 1, cuisine = '' }) => {
    const limit = 10;
    const offset = (page - 1) * limit;
    
 
    let url = 'https://www.themealdb.com/api/json/v1/1/filter.php?a=';
    url += cuisine || 'American'; 
    
    const response = await fetch(url);
    const data = await response.json();
    
   
    const meals = data.meals || [];
    const paginatedMeals = meals.slice(offset, offset + limit);
    
    return {
      recipes: paginatedMeals.map(meal => ({
        id: meal.idMeal,
        title: meal.strMeal,
        image: meal.strMealThumb
      })),
      totalResults: meals.length
    };
  }
);


export const fetchRecipeDetails = createAsyncThunk(
  'recipes/fetchRecipeDetails',
  async (id) => {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    const data = await response.json();
    const meal = data.meals[0];


    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      if (meal[`strIngredient${i}`]) {
        ingredients.push({
          original: `${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}`.trim()
        });
      }
    }

    return {
      id: meal.idMeal,
      title: meal.strMeal,
      image: meal.strMealThumb,
      instructions: meal.strInstructions,
      area: meal.strArea,
      category: meal.strCategory,
      extendedIngredients: ingredients,
      source: meal.strSource,
      youtube: meal.strYoutube
    };
  }
);

const recipeSlice = createSlice({
  name: 'recipes',
  initialState: {
    items: [],
    totalResults: 0,
    currentPage: 1,
    selectedRecipe: null,
    loading: false,
    error: null,
    cuisine: ''
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setCuisine: (state, action) => {
      state.cuisine = action.payload;
      state.currentPage = 1;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.recipes;
        state.totalResults = action.payload.totalResults;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchRecipeDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecipeDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedRecipe = action.payload;
      })
      .addCase(fetchRecipeDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { setCurrentPage, setCuisine } = recipeSlice.actions;
export default recipeSlice.reducer;