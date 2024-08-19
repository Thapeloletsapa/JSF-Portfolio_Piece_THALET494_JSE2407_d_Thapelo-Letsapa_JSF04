<template>
  <header class="header">
    <h1 class="logo">My E-Commerce Store</h1>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/login">Login</router-link>
      <router-link to="/cart">Cart ({{ cartItemCount }})</router-link>
      <router-link to="/Comparison">Compare</router-link>
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
    const cartItemCount = computed(() => store.getters.cartItemCount);
    return {
      cartItemCount,
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

nav a {
  color: white;
  text-decoration: none;
  margin: 0 10px;
  font-weight: bold;
}

nav a:hover {
  text-decoration: underline;
}
</style>
