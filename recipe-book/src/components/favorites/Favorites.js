import React from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../store/useFilterStore';

const Favorites = () => {
  const favoriteRecipes = useStore(state => state.favoriteRecipes);
  const navigate = useNavigate();

  const handleNavigateToFavorites = () => {
    navigate('/recipes/favorites');
  };

  return (
    <div>
      <h3 onClick={handleNavigateToFavorites}>
        Favorites
      </h3>
      
      {favoriteRecipes.length === 0 ? (
        <p>No favorite recipes yet.</p>
      ) : (
        favoriteRecipes.map((recipe , i) => (
          <div className="favorite-item" key={i}>
            <img
              className="favorite-item__image"
              src={`${process.env.PUBLIC_URL}/pictures/${recipe.title}.jpg`}
              alt={recipe.title}
            />
            <p> {recipe.title} </p>
          </div>
        ))
      )}
    </div>
  );
};

export default Favorites;
