import React from 'react';
import { Link } from 'react-router-dom';
import useFilterStore from '../store/useFilterStore';
import './RecipeItem.css';

const RecipeItem = ({ recipe, view, onAddToCart }) => {
  const addToCart = useFilterStore(state => state.addToCart);

  const handleAddToCart = () => {
    addToCart(recipe.id, 1);
    onAddToCart(); 
  };

  return view === 'list' ? (
    <li className="menu__list-item">
      <Link to={`/recipes/${recipe.id}`} className="sidebar__link">
        {recipe.title}
      </Link>
      <button onClick={handleAddToCart} className="add-to-cart-btn">
        {'Add to Cart'}
      </button>
    </li>
  ) : (
    <div className="recipe">
      <h3 className="recipe__title">
        <Link to={`/recipes/${recipe.id}`} className="recipe-title-link">
          {recipe.title}
        </Link>
      </h3>
      <p><strong>Ingredients:</strong></p>
      <div className="recipe__ingredients">
        <ul className="recipe__ingredients-list">
          {recipe.ingredients.map((ingredient, j) => (
            <li
              key={j}
              className="recipe__ingredient"
              data-quantity={ingredient.quantity}
            >
              {ingredient.name}
            </li>
          ))}
        </ul>
      </div>
      <p><strong>Method:</strong></p>
      <p className="recipe__method">{recipe.method}</p>
      <button onClick={handleAddToCart} className="add-to-cart-btn">
        {'Add to Cart'}
      </button>
    </div>
  );
};

export default RecipeItem;
