<template>
    <div>
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