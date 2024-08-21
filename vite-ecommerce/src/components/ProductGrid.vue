<!-- ProductGrid.vue (updated with filters and sorting) -->
<template>
  <div>
    <div class="filters">
      <select v-model="selectedCategory" @change="applyFilters">
        <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
      </select>
      <select v-model="sortOrder" @change="applySorting">
        <option value="asc">Price: Low to High</option>
        <option value="desc">Price: High to Low</option>
      </select>
    </div>
    <div v-if="loading">Loading...</div>
    <div v-else class="product-grid">
      <div v-for="product in filteredProducts" :key="product.id" class="product-card" @click="navigateToDetail(product.id)">
        <img :src="product.image" alt="Product Image">
        <h3>{{ product.title }}</h3>
        <p>{{ product.price | currency }}</p>
        <p>{{ product.category }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [],
      categories: [],
      selectedCategory: 'All',
      sortOrder: 'asc',
      loading: true
    }
  },
  computed: {
    filteredProducts() {
      let result = this.products;
      if (this.selectedCategory !== 'All') {
        result = result.filter(product => product.category === this.selectedCategory);
      }
      return result.sort((a, b) => this.sortOrder === 'asc' ? a.price - b.price : b.price - a.price);
    }
  },
  created() {
    this.fetchProducts();
    this.fetchCategories();
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await fetch('https://api.example.com/products');
        this.products = await response.json();
        this.loading = false;
      } catch (error) {
        console.error(error);
        this.loading = false;
      }
    },
    async fetchCategories() {
      try {
        const response = await fetch('https://api.example.com/categories');
        this.categories = await response.json();
      } catch (error) {
        console.error(error);
      }
    },
    applyFilters() {
      this.fetchProducts(); // Refresh products based on selected category
    },
    applySorting() {
      this.fetchProducts(); // Refresh products based on selected sorting
    },
    navigateToDetail(productId) {
      this.$router.push({ name: 'ProductDetail', params: { id: productId } });
    }
  }
}
</script>
