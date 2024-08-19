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
    <div class="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
      sortOrder: ''
    };
  },
  computed: {
    ...mapState(['products', 'categories']),
    ...mapGetters(['filteredAndSortedProducts'])
  },
  methods: {
    ...mapMutations(['setCategory', 'setSortOrder']),
    ...mapActions(['fetchCategories']),
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
    this.fetchCategories();
  }
};
</script>
