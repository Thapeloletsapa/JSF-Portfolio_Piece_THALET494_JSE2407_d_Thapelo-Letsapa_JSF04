<template>
    <div class="bg-white rounded-lg shadow-md p-5">
      <img :src="product.image" :alt="product.title" class="w-full h-64 object-contain mb-4 rounded-t-lg">
      <h2 class="text-lg font-semibold mb-2">{{ product.title }}</h2>
      <p class="text-xl font-bold text-gray-800">${{ product.price }}</p>
      <p class="text-gray-600 mb-2">{{ product.category }}</p>
      <button @click="$emit('view-details', product)" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">View Details</button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      product: Object
    }
  };
  </script>
  