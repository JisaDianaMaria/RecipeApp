import React from 'react';
import useFilterStore from '../store/useFilterStore';
import './CartModal.css';
import './Checkout.css';

const CartItems = ({ showPrice = true }) => {
  const cart = useFilterStore(state => state.cart);
  const incrementQuantity = useFilterStore(state => state.incrementQuantity);
  const decrementQuantity = useFilterStore(state => state.decrementQuantity);
  const removeFromCart = useFilterStore(state => state.removeFromCart);

  return (
    <ul>
      {cart.map(item => (
        <li key={item.id} className="checkout-item">
          <span> {item.title} </span>
          {showPrice && <span> ${item.price} </span>}
          <div className="quantity-controls">
            <button onClick={() => decrementQuantity(item.id)} disabled={item.quantity <= 1}>
              -
            </button>
            <span>{item.quantity}</span>
            <button onClick={() => incrementQuantity(item.id)} disabled={item.quantity >= item.stock}>
              +
            </button>
          </div>
          {showPrice && <span>${Math.round(item.price * item.quantity * 100) / 100}</span>}
          <button className="remove-item-btn" onClick={() => removeFromCart(item.id)}>X</button>
        </li>
      ))}
    </ul>
  );
};

export default CartItems;
