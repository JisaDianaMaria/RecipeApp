import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useStore from '../store/useFilterStore';
import './RecipeContent.css';

const RecipeContent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const addFavoriteRecipe = useStore(state => state.addFavorite);
  const removeFavoriteRecipe = useStore(state => state.removeFavorite);
  const isFavoriteRecipe = useStore(state => state.isFavoriteRecipe);
  const fetchRecipeById = useStore(state => state.fetchRecipeById);
  const addToCart = useStore(state => state.addToCart); 

  const [recipe, setRecipe] = useState(null);
  const [purchasedIngredients, setPurchasedIngredients] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [quantity, setQuantity] = useState(1); 
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const getRecipe = async () => {
      const recipeData = await fetchRecipeById(id);
      if (recipeData) {
        setRecipe(recipeData);
      }
    };
    getRecipe();
  }, [id]);

  useEffect(() => {
    if (recipe) {
      setIsFavorite(isFavoriteRecipe(recipe.id));
    }
  }, [recipe]);

  const handleFavoriteClick = () => {
    if (isFavorite) {
      removeFavoriteRecipe(recipe.id);
    } else {
      addFavoriteRecipe(recipe);
    }
    setIsFavorite(!isFavorite);
  };

  const handleIngredientClick = (ingredientName) => {
    setPurchasedIngredients(prev =>
      prev.includes(ingredientName)
        ? prev.filter(ingredient => ingredient !== ingredientName)
        : [...prev, ingredientName]
    );
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([...comments, newComment]);
      setNewComment('');
    }
  };

  const handleAddToCart = () => {
    addToCart(recipe.id, quantity); 
    triggerPopup();
  };

  const triggerPopup = () => {
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 2000); 
  };

  const handleBackClick = () => {
    navigate('/recipes');
  };

  const incrementQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 0));
  };

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  return (
    <div className="recipe-detail">
      {showPopup && (
        <div className="popup-notification1">
          Product added to cart!
        </div>
      )}
      <div className="recipe-detail__header">
        <h2 className="recipe-detail__title">{recipe.title}</h2>
        <div className={`heart ${isFavorite ? 'favorite' : ''}`} onClick={handleFavoriteClick}></div>
      </div>
      <p><strong>Ingredients:</strong></p>
      <ul className="recipe-detail__ingredients">
        {recipe.ingredients.map((ingredient, index) => (
          <li
            key={index}
            className={`recipe-detail__ingredient ${purchasedIngredients.includes(ingredient.name) ? 'purchased' : ''}`}
            onClick={() => handleIngredientClick(ingredient.name)}
          >
            {ingredient.name} - {ingredient.quantity}
          </li>
        ))}
      </ul>
      <p><strong>Method:</strong></p>
      <p className="recipe-detail__method">{recipe.method}</p>

      <div className="recipe-detail__quantity-container">
        <div className="recipe-detail__quantity">
          <button onClick={decrementQuantity} className="recipe-detail__quantity-btn">-</button>
          <input 
            type="number" 
            value={quantity} 
            className="recipe-detail__quantity-input"
          />
          <button onClick={incrementQuantity} className="recipe-detail__quantity-btn">+</button>
        </div>
        <button onClick={handleAddToCart} className="recipe-detail__btn" >
          {'Add to Cart'}
        </button>
      </div>

      <div className="recipe-detail__comments-section">
        <div className="recipe-detail__comments-header">
          <h3>Comments</h3>
          <button 
            onClick={handleAddComment} 
            className="recipe-detail__btn recipe-detail__add-comment-btn"
          >
            Add Comment
          </button>
        </div>
        <ul className="recipe-detail__comments-list">
          {comments.map((comment, index) => (
            <li key={index} className="recipe-detail__comment">{comment}</li>
          ))}
        </ul>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment"
          className="recipe-detail__comment-input"
        />
      </div>
      <button onClick={handleBackClick} className="recipe-detail__btn recipe-detail__back-btn">Back to Home</button>
    </div>
  );
};

export default RecipeContent;
