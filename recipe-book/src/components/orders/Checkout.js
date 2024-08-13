import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import useFilterStore from '../store/useFilterStore';
import CartItems from './CartItems';
import './Checkout.css';

const Checkout = () => {
  const cart = useFilterStore(state => state.cart);
  const placeOrder = useFilterStore(state => state.placeOrder);

  const navigate = useNavigate();
  const [orderSuccess, setOrderSuccess] = useState(false);

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

  const handlePlaceOrder = async () => {
    const result = await placeOrder();
    if (result.success) {
      setOrderSuccess(true);
    } else {
      alert('Failed to place order. Please try again.');
    }
  };

  const handleContinueShopping = () => {
    navigate('/recipes');
  };

  return (
    <div >
      <h1>Checkout </h1>
      {orderSuccess && <p className="success-message">Your order has been placed successfully!</p>}
      <ul>
        {cart.length === 0 ? <p>Your cart is empty.</p> : <CartItems />}
      </ul>
      <div>
        <h2>Order Summary</h2>
        <p>Total Items: {calculateTotalItems()}</p>
        <p>Total Price: ${calculateTotalPrice()}</p> 
        <button className="checkout-btn" onClick={handlePlaceOrder} disabled={cart.length === 0}>Place Order</button>
        <button className="continue-shopping-btn" onClick={handleContinueShopping}>Continue Shopping</button>
      </div>
    </div>
  );
};  

export default Checkout;
