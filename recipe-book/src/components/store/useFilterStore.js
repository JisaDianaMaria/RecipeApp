import { create } from 'zustand';
import axios from 'axios';

const useFilterStore = create((set, get) => ({
  recipes: [],
  ingredients: [],
  filteredRecipes: [],
  
  cart: (() => {
    try {
      const storedCart = JSON.parse(localStorage.getItem('cart'));
      return Array.isArray(storedCart) ? storedCart : [];
    } catch (error) {
      console.error('Error parsing cart from localStorage:', error);
      return [];
    }
  })(),
  
  favoriteRecipes: (() => {
    try {
      const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      return Array.isArray(favoriteRecipes) ? favoriteRecipes : [];
    } catch (error) {
      console.error('Error parsing favoriteRecipes from localStorage:', error);
      return [];
    }
  })(),

  checkboxes: {},
  filters: {},
  recipeCache: {},

  currentPage: 1,
  itemsPerPage: 2,
  totalPages: 1,

  setFilter: (id, isChecked) => {
    set((state) => {
      const updatedFilters = { ...state.filters };
      if (isChecked) {
        updatedFilters[id] = true;
      } else {
        delete updatedFilters[id];
      }

      const updatedCheckboxes = {
        ...state.checkboxes,
        [id]: isChecked,
      };

      return {
        checkboxes: updatedCheckboxes,
        filters: updatedFilters,
        currentPage: 1,
      };
    });
  },

  setRecipes: (recipes) => {
    set({
      recipes: recipes,
      filteredRecipes: recipes,
      currentPage: 1,
    });
  },

  setIngredients: (ingredients) => {
    set({
      ingredients: ingredients,
    });
  },

  ///FAVORITES
  addFavorite: (recipe) => {
    set((state) => {
      const faves = [...state.favoriteRecipes, recipe];
      localStorage.setItem('favoriteRecipes', JSON.stringify(faves));
      return { favoriteRecipes: faves };
    });
  },

  removeFavorite: (recipeId) => {
    set((state) => {
      const faves = state.favoriteRecipes.filter(recipe => recipe.id !== recipeId);
      localStorage.setItem('favoriteRecipes', JSON.stringify(faves));
      return { favoriteRecipes: faves };
    });
  },

  isFavoriteRecipe: (id) => {
    const favoriteRecipes = get().favoriteRecipes;
    return favoriteRecipes.some(recipe => recipe.id === id);
  },

  ///ORDERS
  addToCart: async (recipeId, quantity) => {
    const recipe = await get().fetchRecipeById(recipeId);
    if (!recipe) return;

    set((state) => {
      const updatedCart = [...state.cart];
      const existingItem = updatedCart.find(item => item.id === recipeId);

      if (existingItem) {
        existingItem.quantity += quantity; 
      } else {
        updatedCart.push({ ...recipe, quantity }) 
      }

      localStorage.setItem('cart', JSON.stringify(updatedCart)); 
      return { cart: updatedCart };
    });
  },


  incrementQuantity: (itemId) => {
    set((state) => {
      const updatedCart = state.cart.map(item =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      );
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return { cart: updatedCart };
    });
  },

  decrementQuantity: (itemId) => {
    set((state) => {
      const item = state.cart.find(i => i.id === itemId);
      if (item && item.quantity > 1) { 
        const updatedCart = state.cart.map(i =>
          i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i
        );
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        return { cart: updatedCart };
      }
    });
  },
  


  removeFromCart: (recipeId) => {
    set((state) => {
      const updatedCart = state.cart.filter(item => item.id !== recipeId);
      localStorage.setItem('cart', JSON.stringify(updatedCart)); 
      return { cart: updatedCart };
    });
  },

  clearCart: () => {
    set(() => {
      localStorage.removeItem('cart'); 
      return { cart: [] };
    });
  },

  count: () => {
    const checkboxes = get().checkboxes;
    return Object.values(checkboxes).filter(Boolean).length;
  },

  prev: () => {
    set((state) => {
      if (state.currentPage > 1) {
        return { currentPage: state.currentPage - 1 };
      }
    });
  },

  next: () => {
    set((state) => {
      if (state.currentPage < state.totalPages) {
        return { currentPage: state.currentPage + 1 };
      }
    });
  },

  placeOrder: async () => {
    const cart = get().cart;
    try {
      const orderItems = cart.map(item => ({
        recipeId: item.id,
        quantity: item.quantity,
      }));
  
      await axios.post('http://localhost:8081/api/recipes/updateQuantity', orderItems);
      get().clearCart(); 
      return { success: true };
    } catch (error) {
      console.error('Failed to place order', error);
      return { success: false };
    }
  },


  fetchRecipes: async () => {
    const filters = get().filters;
    const ids = Object.keys(filters);

    try {
      const params = new URLSearchParams();
      ids.forEach(id => params.append('ingredients', id));
      params.append('page', get().currentPage - 1);
      params.append('size', get().itemsPerPage);
      const resp = await axios.get('http://localhost:8081/api/recipes', { params });
      set({
        filteredRecipes: resp.data.recipes,
        totalPages: Math.ceil(resp.data.totalRecipes / get().itemsPerPage)
      });
    } catch (error) {
      console.log('Error fetching filtered recipes:', error);
    }
  },

  fetchIngredients: async () => {
    try {
      const resp = await axios.get('http://localhost:8081/api/ingredients');
      set({
        ingredients: resp.data
      });
    } catch (error) {
      console.log('Error fetching ingredients:', error);
    }
  },

  fetchRecipeById: async (id) => {
    const cache = get().recipeCache;
    if (cache[id]) return cache[id];  
  
    try {
      const resp = await axios.get(`http://localhost:8081/api/recipes/${id}`);  
      set((state) => ({
        recipeCache: { ...state.recipeCache, [id]: resp.data },  
      }));
      return resp.data;  
    } catch (error) {
      console.log('Error fetching recipe by id:', error);
      return null;  
    }
  },
  
}));

export default useFilterStore;