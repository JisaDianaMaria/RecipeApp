import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useFilterStore from '../store/useFilterStore';
import './RecipeItem.css';

const RecipeItem = ({ recipe, view }) => {
  const addToCart = useFilterStore(state => state.addToCart);
  const cart = useFilterStore(state => state.cart);

  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
  const [showMaxQuantityPopup, setShowMaxQuantityPopup] = useState(false);

  const handleAddToCart = () => {
    const cartItem = cart.find(item => item.id === recipe.id);
    const cartQuantity = cartItem ? cartItem.quantity : 0;
  
    if (cartQuantity < recipe.quantity) {
      addToCart(recipe.id, 1);
      setShowConfirmationPopup(true);
      setTimeout(() => {
        setShowConfirmationPopup(false);
      }, 4000);
    } else {
      setShowMaxQuantityPopup(true);
      setTimeout(() => {
        setShowMaxQuantityPopup(false);
      }, 4000);
    }
  };

  return (
    <>
      {view === 'list' ? (
        <li className="menu__list-item">
          <Link to={`/recipes/${recipe.id}`} className="sidebar__link">
            {recipe.title}
          </Link>
          
          {recipe.quantity === 0 ? (
            <span className="message">Out of Stock!</span>
          ) : (
            <button onClick={handleAddToCart} className="add-to-cart-btn">
              {'Add to Cart'}
            </button>
          )}
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
            <ul>
              {recipe.ingredients.map((ingredient, j) => (
                <li key={j} className="recipe__ingredient" data-quantity={ingredient.quantity}>
                  {ingredient.name}
                </li>
              ))}
            </ul>
          </div>
          <p><strong>Method:</strong></p>
          <p>{recipe.method}</p>
          {recipe.quantity === 0 ? (
            <span className="message">Out of Stock!</span>
          ) : (
            <button onClick={handleAddToCart} className="add-to-cart-btn">
              {'Add to Cart'}
            </button>
          )}
        </div>
      )}

      {showConfirmationPopup && (
        <div className="popup-notification">
          Product added to cart!
        </div>
      )}

      {showMaxQuantityPopup && (
        <div className="popup-notification22">
          Maximum quantity reached, product not added to cart!
        </div>
      )}
    </>
  );
};

export default RecipeItem;
