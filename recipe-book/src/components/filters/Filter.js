import React, { useEffect } from 'react';
import useStore from '../store/useFilterStore';

export default function Filter() {
  const ingredients = useStore(state => state.ingredients);
  const fetchIngredients = useStore(state => state.fetchIngredients);
  const setFilter = useStore(state => state.setFilter);
  const count = useStore(state => state.count());

  useEffect(() => {
    fetchIngredients();
  }, []);

  const handleFilterChange = (ingredientId, event) => {
    setFilter(ingredientId, event.target.checked);
  };

  return (
    <div>
      <h3> Filter by Ingredient </h3>
      <ul>
        {ingredients.map((ingredient) => (
          <li key={ingredient.id}>
            <label>
              <input type="checkbox" onChange={(event) => handleFilterChange(ingredient.id, event)} />
              {ingredient.name}
            </label>
          </li>
        ))}
      </ul>
      <div>
        <p>Nr of selected filters: {count}</p>
      </div>
    </div>
  );
}
