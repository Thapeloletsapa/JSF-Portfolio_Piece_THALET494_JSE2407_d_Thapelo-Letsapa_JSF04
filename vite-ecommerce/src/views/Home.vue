<template>
    <div>
      <h1 class="text-3xl font-bold mb-4">Products</h1>
      <ProductList :products="products" />
    </div>
  </template>
  
  <script>
  import ProductList from '../components/ProductList.vue';
  import { mapState } from 'vuex';
  
  export default {
    components: {
      ProductList
    },
    computed: {
      ...mapState(['products'])
    },
    created() {
      this.$store.dispatch('fetchProducts');
    }
  };
  </script>
  