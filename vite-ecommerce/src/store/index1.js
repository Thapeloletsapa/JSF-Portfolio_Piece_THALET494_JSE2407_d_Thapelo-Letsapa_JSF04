import { createStore } from 'vuex';
import axios from 'axios';
import Comparison from '../views/Comparison.vue'

export const store = createStore({
  state: {
    products: [],
    categories: [],
    cart: JSON.parse(localStorage.getItem('cart')) || [],
    selectedCategory: '',
    sortOrder: ''
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setProducts(state, products) {
      state.products = products;
    },
    setCategories(state, categories) {
      state.categories = categories;
    },
    addToCart(state, product) {
      const item = state.cart.find(item => item.id === product.id);
      if (item) {
        item.quantity++;
      } else {
        state.cart.push({ ...product, quantity: 1 });
      }
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    clearCart(state) {
      state.cart = [];
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    setCategory(state, category) {
      state.selectedCategory = category;
    },
    setSortOrder(state, sortOrder) {
      state.sortOrder = sortOrder;
    }
  },
  actions: {
    async fetchProducts({ commit }) {
      const response = await axios.get('https://fakestoreapi.com/products');
      commit('setProducts', response.data);
    },
    async fetchCategories({ commit }) {
      const response = await axios.get('https://fakestoreapi.com/products/categories');
      commit('setCategories', response.data);
    }
  },
  getters: {
    filteredAndSortedProducts: (state) => {
      let products = state.products;

      if (state.selectedCategory) {
        products = products.filter(product => product.category === state.selectedCategory);
      }

      if (state.sortOrder === 'lowest') {
        products.sort((a, b) => a.price - b.price);
      } else if (state.sortOrder === 'highest') {
        products.sort((a, b) => b.price - a.price);
      }

      return products;
    }
  }
});
