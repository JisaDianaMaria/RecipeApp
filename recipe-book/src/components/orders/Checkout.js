import React from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';
import useFilterStore from '../store/useFilterStore';
import './Checkout.css';

const Checkout = () => {
  const cart = useFilterStore(state => state.cart);
  const updateCartQuantity = useFilterStore(state => state.updateCartQuantity);
  const removeFromCart = useFilterStore(state => state.removeFromCart);
  const clearCart = useFilterStore(state => state.clearCart);
  const navigate = useNavigate();

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

  const handlePlaceOrder = async () => {
    try {
      const orderItems = cart.map(item => ({
        recipeId: item.id,
        quantity: item.quantity,
      }));
  
      await axios.post('http://localhost:8081/api/recipes/updateQuantity', orderItems);
      clearCart();
      navigate('/recipes');
    } catch (error) {
      alert('Failed to place order. Please try again.');
    }
  };
  

  const handleRemoveItem = (itemId) => {
    removeFromCart(itemId);
  };

  const handleContinueShopping = () => {
    navigate('/recipes');
  };

  const calculateTotalItems = () => {
    let totalItems = 0;
    for (let item of cart) {
      totalItems += item.quantity;
    }
    return totalItems;
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    for (let item of cart) {
      totalPrice += item.price * item.quantity;
    }
    return Math.round(totalPrice * 100) / 100; 
  };

const renderCartItems = () => {
        return cart.map(item => (
        <li key={item.id} className="checkout-item">
            <span className="checkout-item__title">{item.title}</span>
            <span className="checkout-item__price">${item.price}</span> 
            <div className="quantity-controls">
            <button onClick={() => decrementQuantity(item.id)}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => incrementQuantity(item.id)}>+</button>
            </div>
            <span className="checkout-item__total">${Math.round(item.price * item.quantity * 100) / 100}</span> 
            <button className="remove-item-btn" onClick={() => handleRemoveItem(item.id)}>
            X
            </button>
        </li>
        ));
    };
  
  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      <ul className="checkout-list">
        {cart.length === 0 ? <p>Your cart is empty.</p> : renderCartItems()}
      </ul>
      <div className="checkout-summary">
        <h2>Order Summary</h2>
        <p>Total Items: {calculateTotalItems()}</p>
        <p>Total Price: ${calculateTotalPrice()}</p> 
        <button className="checkout-btn" onClick={handlePlaceOrder}>Place Order</button>
        <button className="continue-shopping-btn" onClick={handleContinueShopping}>Continue Shopping</button>
      </div>
    </div>
  );
};  

export default Checkout;
