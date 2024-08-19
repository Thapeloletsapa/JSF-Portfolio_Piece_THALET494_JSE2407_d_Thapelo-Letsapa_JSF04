<template>
    <div class="bg-tim">
      <h2 class="text-2xl font-bold mb-4">Shopping Cart</h2>
      <div v-for="item in cart" :key="item.id" class="flex items-center mb-4">
        <img :src="item.image" alt="" class="w-16 h-16 object-contain mr-4">
        <div>
          <h3 class="text-lg font-semibold">{{ item.title }}</h3>
          <p class="text-gray-600">${{ item.price }} x {{ item.quantity }}</p>
        </div>
      </div>
      <button @click="$router.push('/checkout')" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Checkout</button>
    </div>
  </template>
  
  <script>
  import { mapState } from 'vuex';
  
  export default {
    computed: {
      ...mapState(['cart'])
    }
  };
  </script>
  