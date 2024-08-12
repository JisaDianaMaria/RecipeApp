import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import RecipeList from './components/recipe-list/RecipeList';
import Filter from './components/filters/Filter';
import Favorites from './components/favorites/Favorites';
import RecipeContent from './components/recipe-content/RecipeContent';
import Navbar from './components/navbar/Navbar';
import Checkout from './components/orders/Checkout';

import './style.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container1 mt-5">
          <div className="sidebar bottom-0">
            <Filter />
            <Favorites />
          </div>
          <div className="content">
            <Routes>
              <Route path="/" element={<Navigate to="/recipes" />} />
              <Route path="/recipes" element={<RecipeList />} />
              <Route path="/recipes/:id" element={<RecipeContent />} />
              <Route path="/recipes/favorites" element={<Favorites />} />
              <Route path="/checkout" element={<Checkout />} /> 
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
