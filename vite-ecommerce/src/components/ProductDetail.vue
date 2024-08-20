<template>
  <div v-if="loading">
    <LoadingSpinner />
  </div>
  <div v-else-if="error">
    <p>Error: {{ error }}</p>
  </div>
  <div v-else class="product-detail">
    <img v-if="product.image" :src="product.image" :alt="product.title" class="product-image"/>
    <div class="product-info">
      <h2>{{ product.title }}</h2>
      <p>{{ product.description }}</p>
      <p>Category: {{ product.category }}</p>
      <p>Price: ${{ product.price }}</p>
      <p>Rating: {{ product.rating.rate }} ({{ product.rating.count }} reviews)</p>
      <button @click="addToCart">Add to Cart</button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import LoadingSpinner from './LoadingSpinner.vue'

export default {
  components: {
    LoadingSpinner,
  },
  setup() {
    const route = useRoute();
    const store = useStore();
    const product = ref(null);
    const loading = ref(true);
    const error = ref(null);

    const fetchProduct = async () => {
      try {
        loading.value = true;
        const res = await fetch(`https://fakestoreapi.com/products/${route.params.id}`);
        product.value = await res.json();
        loading.value = false;
      } catch (err) {
        error.value = err.message;
        loading.value = false;
      }
    };

    const addToCart = () => {
      if (product.value) {
        const existingProduct = store.state.cart.find((item) => item.id === product.value.id);
        if (!existingProduct) {
          store.commit('addToCart', product.value);
        }
      }
    };

    onMounted(fetchProduct);

    return {
      product,
      loading,
      error,
      addToCart,
    };
  },
};
</script>

<style scoped>
.product-detail {
  display: flex;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.product-image {
  width: 300px;
  height: auto;
  margin-right: 20px;
}

.product-info {
  flex: 1;
  text-align: left;
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}
</style>