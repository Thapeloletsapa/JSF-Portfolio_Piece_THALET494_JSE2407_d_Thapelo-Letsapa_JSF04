
import {createRouter,createWebHistory} from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Product from '../views/Product.vue';
import Cart from '../views/Cart.vue';
import Checkout from '../views/Checkout.vue';
import Comparison from '../views/Comparison.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/product/:id', name: 'Product', component: Product },
  { path: '/cart', component: Cart },
  { path: '/checkout', component: Checkout },
  { path: '/login', component: Login },
  { path: '/Comparison', component: Comparison}
];

const router = createRouter({
    history: createWebHistory(),
  routes
});

export default router;
