<template>
  <header class="bg-gray-800 p-4 text-white">
    <div class="container mx-auto flex justify-between items-center">
      <router-link to="/" class="text-xl font-bold">Home</router-link>
      <img src="../assets/Shopify_E-commerce_Logo_Web_Design_PNG_-_Free_Download-removebg-preview.png" class="h-11" alt="Flowbite Logo" />
      <router-link to="/cart" class="text-xl font-bold">Cart</router-link>
      <router-link to="/login" class="text-xl font-bold">Login</router-link>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header'
};
</script>

<style>
a {
  margin: 0 10px;
  text-decoration: none;
  color: white;
}
</style>