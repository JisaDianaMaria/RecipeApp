import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RecipeItem from '../recipe-item/RecipeItem';
import useFilterStore from '../store/useFilterStore';
import Pagination from '../pagination/Pagination';
import './RecipeList.css';

const RecipeList = () => {
  const fetchRecipes = useFilterStore(state => state.fetchRecipes);
  const filteredRecipes = useFilterStore(state => state.filteredRecipes);
  const filters = useFilterStore(state => state.filters);
  const currentPage = useFilterStore(state => state.currentPage);

  const navigate = useNavigate();
  const [layout, setLayout] = useState('list');


  useEffect(() => {
    fetchRecipes();
  }, [filters, currentPage]);

  useEffect(() => {
    const storedLayout = localStorage.getItem('layout');
    if (storedLayout) {
      setLayout(storedLayout);
    }
  }, []);

  const toggleLayout = () => {
    const newLayout = layout === 'list' ? 'grid' : 'list';
    setLayout(newLayout);
    localStorage.setItem('layout', newLayout);
  };

  const handleRecipeClick = (recipeId) => {
    navigate(`/recipes/${recipeId}`);
  };

  const renderRecipes = () => {
    return filteredRecipes.map((recipe, i) => (
      <RecipeItem key={i} recipe={recipe} view={layout} onClick={() => handleRecipeClick(recipe.id)} />
    ));
  };


  return (
    <div className="recipe-list-container">
      <div className="view-toggle-button">
        <button onClick={toggleLayout}>
          {layout === 'list' ? 'Grid View' : 'List View'}
        </button>
      </div>
      {filteredRecipes.length === 0 && <p>No recipes found.</p>}
      {layout === 'list' ? (
        <ul id="recipeList" className="menu__list">
          {renderRecipes()}
        </ul>
      ) : (
        <div className="recipe-grid">
          {renderRecipes()}
        </div>
      )}
      <Pagination />
    </div>
  );
};

export default RecipeList;
