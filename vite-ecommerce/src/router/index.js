import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Product from '../views/Product.vue';
import Cart from '../views/Cart.vue';
import Checkout from '../views/Checkout.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', component: Home },
  { path: '/product/:id', name: 'Product', component: Product },
  { path: '/cart', component: Cart },
  { path: '/checkout', component: Checkout }
];

const router = new VueRouter({
  routes
});

export default router;
