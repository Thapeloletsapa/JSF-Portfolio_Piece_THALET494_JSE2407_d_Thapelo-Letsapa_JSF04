import { createStore } from 'vuex';
import axios from 'axios';

export const store = createStore({
  state: {
    products: [],
    categories: [],
    carts: JSON.parse(localStorage.getItem('carts')) || {}, // Initialize as an object
    selectedCategory: '',
    sortOrder: '',
    comparison: JSON.parse(localStorage.getItem('comparison')) || {},
    username: '' ,// Assume you have a way to set the username
    cart: [],
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
      if (!state.carts[userId]) {
        state.carts[userId] = {};
      }
      const { id, price, title, image } = product;
      if (state.carts[userId][id]) {
        state.carts[userId][id].quantity += 1;
      } else {
        state.carts[userId][id] = { quantity: 1, productPrice: price, productTitle: title, productImage: image };
      }
      localStorage.setItem('carts', JSON.stringify(state.carts));
    },
    updateCartItem(state, { userId, productId, quantity }) {
      if (state.carts[userId]) {
        if (quantity > 0) {
          state.carts[userId][productId].quantity = quantity;
        } else {
          delete state.carts[userId][productId];
        }
        localStorage.setItem('carts', JSON.stringify(state.carts));
      }
    },
    removeFromCart(state, { userId, productId }) {
      if (state.carts[userId] && state.carts[userId][productId]) {
        delete state.carts[userId][productId];
        localStorage.setItem('carts', JSON.stringify(state.carts));
      }
    },
    clearCart(state, userId) {
      if (state.carts[userId]) {
        delete state.carts[userId];
        localStorage.setItem('carts', JSON.stringify(state.carts));
      }
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
      const carts = JSON.parse(localStorage.getItem('carts')) || {};
      if (carts[userId]) {
        commit('setCart', { userId, cart: carts[userId] });
      }
    },
    addToCart({ commit }, { userId, product }) {
      commit('addToCart', { userId, product });
    },
    updateQuantity({ commit }, { userId, id, quantity }) {
      commit('updateCartItem', { userId, productId: id, quantity });
    },
    removeFromCart({ commit }, { userId, id }) {
      commit('removeFromCart', { userId, productId: id });
    },
    clearCart({ commit }, userId) {
      commit('clearCart', userId);
    },
  },
  getters: {

    cartItemCount(state) {
      return state.cart.length ;  // Access the cart length
    },
    cartContents(state) {
      return state.cart;
    },
    cartTotalCost(state) {
      return state.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    },
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
      return Object.values(cart).reduce((total, item) => total + item.productPrice * item.quantity, 0);
    },
  }
});


