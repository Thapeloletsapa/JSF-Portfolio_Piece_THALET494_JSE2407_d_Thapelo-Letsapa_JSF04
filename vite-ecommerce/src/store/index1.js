import { createStore } from 'vuex';
import axios from 'axios';

export const store = createStore({
  state: {
    products: [],
    categories: [],
    carts: JSON.parse(localStorage.getItem('carts')) || {}, // Store all carts by userId
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
    setCart(state, { userId, cart }) {
      state.carts[userId] = cart;
      localStorage.setItem('carts', JSON.stringify(state.carts));
    },
    addToCart(state, { userId, product }) {
      const cart = state.carts[userId] || [];
      const item = cart.find(item => item.id === product.id);
      if (item) {
        item.quantity++;
      } else {
        cart.push({ ...product, quantity: 1 });
      }
      state.carts[userId] = cart;
      localStorage.setItem('carts', JSON.stringify(state.carts));
    },
    updateCart(state, { userId, id, quantity }) {
      const cart = state.carts[userId];
      const index = cart.findIndex((item) => item.id === id);
      if (index !== -1) {
        cart[index].quantity = quantity;
      }
      state.carts[userId] = cart;
      localStorage.setItem('carts', JSON.stringify(state.carts));
    },
    removeFromCart(state, { userId, id }) {
      const cart = state.carts[userId];
      state.carts[userId] = cart.filter(item => item.id !== id);
      localStorage.setItem('carts', JSON.stringify(state.carts));
    },
    clearCart(state, userId) {
      state.carts[userId] = [];
      localStorage.setItem('carts', JSON.stringify(state.carts));
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
    },
    loadCart({ commit }, userId) {
      const carts = JSON.parse(localStorage.getItem('carts'));
      if (carts && carts[userId]) {
        commit('setCart', { userId, cart: carts[userId] });
      }
    },
    addToCart({ commit }, { userId, product }) {
      commit('addToCart', { userId, product });
    },
    updateQuantity({ commit }, { userId, id, quantity }) {
      commit('updateCart', { userId, id, quantity });
    },
    removeFromCart({ commit }, { userId, id }) {
      commit('removeFromCart', { userId, id });
    },
    clearCart({ commit }, userId) {
      commit('clearCart', userId);
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
    },
    cartTotal: (state) => (userId) => {
      const cart = state.carts[userId] || [];
      return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    },
    cartItemsCount: (state) => (userId) => {
      const cart = state.carts[userId] || [];
      return cart.length;
    },
  }
});