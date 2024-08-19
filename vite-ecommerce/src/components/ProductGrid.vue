<template>
  <div>
    <h2>Products</h2>
    <div class="filter-sort">
      <label for="category">Filter by Category:</label>
      <select id="category" v-model="selectedCategory" @change="filterProducts">
        <option value="">All</option>
        <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
      </select>

      <label for="sort">Sort by Price:</label>
      <select id="sort" v-model="selectedSort" @change="sortProducts">
        <option value="asc">Lowest to Highest</option>
        <option value="desc">Highest to Lowest</option>
      </select>
    </div>
    
    <div class="product-grid">
      <ProductCard v-for="product in filteredProducts" :key="product.id" :product="product" />
    </div>

    <LoadingSpinner v-if="loading" />
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import ProductCard from './ProductCard.vue';
import LoadingSpinner from './LoadingSpinner.vue';

export default {
  components: {
    ProductCard,
    LoadingSpinner,
  },
  setup() {
    const products = ref([]);
    const categories = ref([]);
    const loading = ref(true);
    const selectedCategory = ref('');
    const selectedSort = ref('asc');

    const fetchProducts = async () => {
      loading.value = true;
      const res = await fetch('https://fakestoreapi.com/products');
      products.value = await res.json();
      categories.value = [...new Set(products.value.map(product => product.category))];
      loading.value = false;
    };

    const filterProducts = () => {
      if (selectedCategory.value) {
        return products.value.filter(product => product.category === selectedCategory.value);
      }
      return products.value;
    };

    const sortProducts = () => {
      return [...filteredProducts.value].sort((a, b) => selectedSort.value === 'asc' ? a.price - b.price : b.price - a.price);
    };

    const filteredProducts = computed(() => {
      let filtered = filterProducts();
      filtered = sortProducts(filtered);
      return filtered;
    });

    onMounted(fetchProducts);

    return {
      products,
      categories,
      selectedCategory,
      selectedSort,
      filteredProducts,
      loading,
      filterProducts,
      sortProducts,
    };
  },
};
</script>

<style scoped>
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.filter-sort {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.filter-sort label {
  margin-right: 10px;
  font-weight: bold;
}
</style>
