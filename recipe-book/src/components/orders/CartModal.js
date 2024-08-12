import React from 'react';
import { useNavigate } from 'react-router-dom';
import useFilterStore from '../store/useFilterStore';
import './CartModal.css';

const CartModal = ({ isOpen, onClose }) => {
  const cart = useFilterStore(state => state.cart);
  const updateCartQuantity = useFilterStore(state => state.updateCartQuantity);
  const removeFromCart = useFilterStore(state => state.removeFromCart);
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
    onClose();
  };

  const handleRemoveItem = (itemId) => {
    removeFromCart(itemId);
  };

  const incrementQuantity = (itemId) => {
    const item = cart.find(i => i.id === itemId);
    updateCartQuantity(itemId, item.quantity + 1); 
  };

  const decrementQuantity = (itemId) => {
    const item = cart.find(i => i.id === itemId);
    if (item.quantity > 1) {
      updateCartQuantity(itemId, item.quantity - 1); 
    }
  };

  const renderCartItems = () => {
    return cart.map(item => (
      <li key={item.id} className="cart-item">
        <span> {item.title} </span>
        <div className="quantity-controls">
          <button onClick={() => decrementQuantity(item.id)}>-</button>
          <span>{item.quantity}</span>
          <button onClick={() => incrementQuantity(item.id)}>+</button>
        </div>
        <button className="remove-item-btn" onClick={() => handleRemoveItem(item.id)}>
          X
        </button>
      </li>
    ));
  };
  

  if (!isOpen) return null;

  return (
    <div className="cart-modal-overlay">
      <div className="cart-modal">
        <h2>Cart</h2>
        <ul className='cart-list'>
          {cart.length === 0 ? <p>Your cart is empty.</p> : renderCartItems()}
        </ul>
        <div className="cart-modal__button-group">
          <button className="cart-modal__close-btn" onClick={onClose}>Close</button>
          {cart.length > 0 && (
            <button className="cart-modal__checkout-btn" onClick={handleCheckout}>
              Finalize Order
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartModal;
