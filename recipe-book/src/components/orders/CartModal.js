import React from 'react';
import { useNavigate } from 'react-router-dom';
import useFilterStore from '../store/useFilterStore';
import CartItems from './CartItems';

const CartModal = ({ isOpen, onClose }) => {
  const cart = useFilterStore(state => state.cart);
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="cart-modal-overlay">
      <div className="cart-modal">
        <h2>Cart</h2>
        <div className='cart-list'>
          {cart.length === 0 ? <p>Your cart is empty.</p> : <CartItems showPrice={false} />} 
        </div>
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
