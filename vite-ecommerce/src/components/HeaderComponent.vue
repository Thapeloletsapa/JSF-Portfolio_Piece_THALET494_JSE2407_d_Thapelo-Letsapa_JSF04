<template>
  <header class="header">
    <img src="../assets/Shopify_E-commerce_Logo_Web_Design_PNG_-_Free_Download-removebg-preview.png" class="h-11" alt="Flowbite Logo" />
    <h1 class="logo">Convinient Store</h1>
    <nav>
      <RouterLink :to="{ name: 'home' }">Home</RouterLink>
      <RouterLink :to="{ name: 'login' }" v-if="!isLoggedIn">Login</RouterLink>
      <RouterLink :to="{ name: 'register' }" v-if="!isLoggedIn">Register</RouterLink>
      <RouterLink :to="{ name: 'cart' }">Cart {{ cartItemCount }}</RouterLink>
      <RouterLink :to="{ name: 'comparison' }" v-if="hasItemsToCompare">Compare</RouterLink>
    </nav>
  </header>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { RouterLink } from 'vue-router';

export default {
  name: 'HeaderComponent',
  setup() {
    const store = useStore();
    const cartItemCount = computed(() => store.getters.cartItemCount);
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
