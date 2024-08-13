import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import CartModal from '../orders/CartModal';

const Navbar = () => {
  const [isCartOpen, setCartOpen] = useState(false);

  const toggleCartModal = () => {
    setCartOpen(!isCartOpen); 
  };

  return (
    <nav className="navbar1 top-0">
      <h1 className="navbar__title">Recipe App</h1>
      <button className="cart-icon" onClick={toggleCartModal}>
        <FontAwesomeIcon icon={faShoppingCart} />
        <span>Cart</span>
      </button>
      <CartModal isOpen={isCartOpen} onClose={toggleCartModal} /> 
    </nav>
  );
};

export default Navbar;
