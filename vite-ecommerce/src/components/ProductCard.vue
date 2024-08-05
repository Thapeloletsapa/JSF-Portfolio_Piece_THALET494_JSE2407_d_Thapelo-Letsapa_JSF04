<template>
    <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <img class="p-8 rounded-t-lg bg-contain" :src="product.image" :alt="product.title" />
      <div class="px-5 pb-5">
        <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{{ product.title }}</h5>
        <div class="flex items-center mt-2.5 mb-5">
          <!-- Render the rating here -->
          <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">{{ product.rating.rate }}</span>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-3xl font-bold text-gray-900 dark:text-white">${{ product.price }}</span>
          <p class="text-gray-600 mb-2">{{ product.category }}</p>
          <button @click="$emit('view-details', product)" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">View Details</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      product: Object
    }
  };
  </script>
  