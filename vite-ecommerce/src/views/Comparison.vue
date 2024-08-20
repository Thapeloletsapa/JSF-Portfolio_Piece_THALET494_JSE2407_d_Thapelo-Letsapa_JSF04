<template>
    <div class="comparison-container">
      <h2>Product Comparison</h2>
      <div v-if="!comparisonList || comparisonList.length === 0">
        <p>No products to compare.</p>
      </div>
      <div v-else>
        <table class="comparison-table">
          <thead>
            <tr>
              <th>Product</th>
              <th v-for="item in comparisonList" :key="item.product.id">
                <button @click="removeFromComparison(item.product.id)">Remove</button>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Image</td>
              <td v-for="item in comparisonList" :key="item.product.id">
                <img :src="item.product.image" :alt="item.product.title" class="comparison-image"/>
              </td>
            </tr>
            <tr>
              <td>Title</td>
              <td v-for="item in comparisonList" :key="item.product.id">{{ item.product.title }}</td>
            </tr>
            <tr>
              <td>Description</td>
              <td v-for="item in comparisonList" :key="item.product.id">{{ item.product.description }}</td>
            </tr>
            <tr>
              <td>Price</td>
              <td v-for="item in comparisonList" :key="item.product.id">${{ item.product.price }}</td>
            </tr>
            <tr>
              <td>Rating</td>
              <td v-for="item in comparisonList" :key="item.product.id">{{ item.product.rating.rate }}</td>
            </tr>
          </tbody>
        </table>
        <button @click="clearComparisonList" class="clear-btn">Clear Comparison</button>
      </div>
    </div>
  </template>
  
  <script>
  import { computed } from 'vue';
  import { useStore } from 'vuex';
  
  export default {
    name: 'Comparison',
  setup() {
    const store = useStore();
    const comparisonList = computed(() => store.getters.comparisonList);

    const removeFromComparison = (productId) => {
      store.commit('removeFromComparison', productId);
    };
  
    const clearComparisonList = () => {
      store.commit('clearComparisonList');
    };

  
    return {
      comparisonList,
      removeFromComparison,
      clearComparisonList,
      };
    },
  };
  </script>
  
  <style scoped>
  .comparison-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  h2 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .comparison-table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .comparison-table th, .comparison-table td {
    padding: 10px;
    border-bottom: 1px solid #ddd;
  }
  
  .comparison-table th {
    text-align: left;
    background-color: #f8f9fa;
  }
  
  .comparison-image {
    max-width: 100px;
    max-height: 100px;
    object-fit: cover;
    border-radius: 4px;
  }
  
  .clear-btn {
    display: block;
    margin: 20px auto 0;
    background-color: #dc3545;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .clear-btn:hover {
    background-color: #c82333;
  }
  </style>