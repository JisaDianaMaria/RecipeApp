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

  const handleFilterChange = (event, ingredientId) => {
    const isChecked = event.target.checked;
    setFilter(ingredientId, isChecked);
  };

  return (
    <div className="filter">
      <h3 className="filter__heading">Filter by Ingredient</h3>
      <ul id="filterList" className="filter__list">
        {ingredients.map((ingredient) => (
          <li key={ingredient.id}>
            <label>
              <input type="checkbox" onChange={(event) => handleFilterChange(event, ingredient.id)} />
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
