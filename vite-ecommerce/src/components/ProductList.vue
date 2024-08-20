<template>
  <div class="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
    <div class="mb-4 flex flex-wrap justify-between">
      <div class="w-full md:w-1/2 xl:w-1/3 mb-4 md:mb-0">
        <label for="category" class="block text-sm font-medium text-gray-700">Filter by Category</label>
        <select id="category" v-model="selectedCategory" @change="filterProducts" class="p-2 border border-gray-300 rounded w-full appearance-none bg-white">
          <option value="">All</option>
          <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
        </select>
      </div>
      <div class="w-full md:w-1/2 xl:w-1/3 mb-4 md:mb-0">
        <label for="sort" class="block text-sm font-medium text-gray-700">Sort by Price</label>
        <select id="sort" v-model="sortOrder" @change="sortProducts" class="p-2 border border-gray-300 rounded w-full appearance-none bg-white">
          <option value="">Default</option>
          <option value="lowest">Lowest to Highest</option>
          <option value="highest">Highest to Lowest</option>
        </select>
      </div>
    </div>
    <div v-if="loading" class="text-center">
      <svg class="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12H4zm2 5.291A7.962 7.962 0 014 19.708a7.962 7.962 0 0114.708 0 1.992 1.992 0 012.708 0z"></path>
      </svg>
      Loading...
    </div>
    <div v-else class="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <ProductCard v-for="product in filteredAndSortedProducts" :key="product.id" :product="product" @view-details="viewDetails" />
    </div>
  </div>
</template>

<script>
import ProductCard from './ProductCard.vue';
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  components: {
    ProductCard
  },
  data() {
    return {
      selectedCategory: '',
      sortOrder: '',
      loading: true
    };
  },
  computed: {
    ...mapState(['products', 'categories']),
    ...mapGetters(['filteredAndSortedProducts'])
  },
  methods: {
    ...mapMutations(['setCategory', 'setSortOrder']),
    ...mapActions(['fetchCategories', 'fetchProducts']),
    viewDetails(product) {
      this.$router.push({ name: 'Product', params: { id: product.id } });
    },
    filterProducts() {
      this.$store.commit('setCategory', this.selectedCategory);
    },
    sortProducts() {
      this.$store.commit('setSortOrder', this.sortOrder);
    }
  },
  created() {
    this.fetchCategories().then(() => {
      this.fetchProducts().then(() => {
        this.loading = false;
      });
    });
  }
};
</script>