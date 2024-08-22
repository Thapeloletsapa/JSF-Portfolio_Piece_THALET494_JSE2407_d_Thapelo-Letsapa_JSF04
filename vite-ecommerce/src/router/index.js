import {createRouter,createWebHistory} from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Product from '../views/Product.vue';
import Cart from '../views/Cart.vue';
import Checkout from '../views/Checkout.vue';
import Comparison from '../views/Comparison.vue';
import Register from "/src/views/Register.vue";

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/product/:id', name: 'Product', component: Product },
  { path: '/cart', name: 'cart', component: Cart },
  { path: '/checkout', name: 'Checkout', component: Checkout, meta: { requiresAuth: true } },
  { path: '/login', name: 'login', component: Login }, // Changed "login" to "Login"
  { path: '/comparison', name: 'Comparison', component: Comparison, meta: { requiresAuth: true } },
  { path: '/register', name: 'register', component: Register },
  { path: '/:catchAll(.*)', redirect: '/' }, // Redirect to main page for undefined paths
  
];

const router = createRouter({
    history: createWebHistory(),
  routes
});

export default router;