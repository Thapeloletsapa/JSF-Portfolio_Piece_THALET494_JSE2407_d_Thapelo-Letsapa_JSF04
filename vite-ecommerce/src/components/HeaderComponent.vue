<template>
  <header class="header">
    <h1 class="logo">My E-Commerce Store</h1>
    <nav>
      <router-link :to="{ name: 'home' }">Home</router-link>
      <router-link :to="{ name: 'login' }" v-if="!isLoggedIn">Login</router-link>
      <router-link :to="{ name: 'register' }" v-if="!isLoggedIn">Register</router-link>
      <router-link :to="{ name: 'cart' }">Cart ({{ cartItemCount }})</router-link>
      <router-link :to="{ name: 'comparison' }" v-if="hasItemsToCompare">Compare</router-link>
    </nav>
  </header>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'HeaderComponent',
  setup() {
    const store = useStore();
    const cartItemCount = computed(() => store.state.cartItemCount);
    const isLoggedIn = computed(() => store.getters.isLoggedIn);
    const hasItemsToCompare = computed(() => store.getters.hasItemsToCompare);

    return {
      cartItemCount,
      isLoggedIn,
      hasItemsToCompare,
    };
  },
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #0a1128;
  color: white;
}

.logo {
  font-size: 24px;
  font-weight: bold;
}

.header nav a {
  color: white;
  text-decoration: none;
  margin: 0 10px;
  font-weight: bold;
}

.header nav a:hover {
  text-decoration: underline;
}
</style>