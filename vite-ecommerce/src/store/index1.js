
import { createStore } from 'vuex';
import axios from 'axios';


export const store = createStore({
  state: {
    products: [],
    categories: [],
    cart: JSON.parse(localStorage.getItem('cart')) || []
  },
  mutations: {
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
  }
});
