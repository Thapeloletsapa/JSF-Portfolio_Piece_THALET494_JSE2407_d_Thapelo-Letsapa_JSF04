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
      <div class="w-full md:w-1/2 xl:w-1/3 mb-4 md:mb-0">
        <button @click="clearFilters" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full md:w-auto">Clear Filters</button>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      <ProductCard v-for="product in filteredProducts" :key="product.id" :product="product" />
    </div>
  </div>
</template>

<script>
import ProductCard from "./ProductCard.vue";

export default {
  name: "ProductsGrid",
  components: {
    ProductCard,
  },
  data() {
    return {
      categories: [],
      selectedCategory: "",
      sortOrder: "",
      products: [],
      filteredProducts: [],
    };
  },
  created() {
    this.fetchProducts();
    this.fetchCategories();
  },
  methods: {
    async fetchProducts() {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      this.products = data;
      this.filteredProducts = data;
    },
    async fetchCategories() {
      const response = await fetch("https://fakestoreapi.com/products/categories");
      this.categories = await response.json();
    },
    filterProducts() {
      this.filteredProducts = this.products.filter(product =>
        this.selectedCategory
          ? product.category === this.selectedCategory
          : true
      );
      this.sortProducts();
    },
    sortProducts() {
      if (this.sortOrder === "lowest") {
        this.filteredProducts.sort((a, b) => a.price - b.price);
      } else if (this.sortOrder === "highest") {
        this.filteredProducts.sort((a, b) => b.price - a.price);
      }
    },
    clearFilters() {
      this.selectedCategory = "";
      this.sortOrder = "";
      this.filteredProducts = [...this.products];
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 1280px;
}
</style>

