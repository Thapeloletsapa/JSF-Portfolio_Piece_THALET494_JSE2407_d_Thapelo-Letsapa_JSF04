import { createStore } from 'vuex';
import axios from 'axios';


export const store = createStore({
  state: {
    products: [],
    categories: [],
    carts: JSON.parse(localStorage.getItem('carts')) || [], // Store all carts by userId
    selectedCategory: '',
    sortOrder: '',
    cartItemCount: [],
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
    addToCart({ commit, state }, product) {
      commit('ADD_TO_CART', product);
      localStorage.setItem('cart', JSON.stringify(state.carts));
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
    CLEAR_CART(state) {
      state.cart = [];
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
    addToCart({ commit }, product) {
      commit('ADD_TO_CART', product);
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    updateQuantity({ commit }, { userId, id, quantity }) {
      commit('updateCart', { userId, id, quantity });
    },
    removeFromCart({ commit }, { userId, id }) {
      commit('removeFromCart', { userId, id });
    },
    clearCart({ commit }, userId) {
      commit('CLEAR_CART');
      localStorage.removeItem('cart');
    },
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
    cartItemCount: (state) => (userId) => {
      const cart = state.carts[userId] || [];
      return cart.length;
    },
  cartTotalPrice: state => state.cart.reduce((total, item) => total + item.price * item.quantity, 0),
       }
});