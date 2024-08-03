<template>
    <div class="grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <ProductCard v-for="product in products" :key="product.id" :product="product" @view-details="viewDetails" />
    </div>
  </template>
  
  <script>
  import ProductCard from './ProductCard.vue';
  
  export default {
    components: {
      ProductCard
    },
    props: {
      products: Array
    },
    methods: {
      viewDetails(product) {
        this.$router.push({ name: 'Product', params: { id: product.id } });
      }
    }
  };
  </script>
  