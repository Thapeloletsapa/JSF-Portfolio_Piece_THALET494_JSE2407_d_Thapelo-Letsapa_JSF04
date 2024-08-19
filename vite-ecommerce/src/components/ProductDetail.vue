<template>
  <div class="product-detail">
    <div class="product-image">
      <img :src="product.image" alt="" class="w-full h-48 object-contain my-4" />
    </div>
    <div class="product-info">
      <h2 class="text-2xl font-bold mb-2">{{ product.title }}</h2>
      <p class="text-gray-600 mb-4">{{ product.description }}</p>
      <p class="text-xl font-bold text-gray-800">${{ product.price }}</p>
      <p class="text-gray-600 mb-2">{{ product.category }}</p>
      <p class="text-gray-600 mb-2">Rating: {{ product.rating.rate }} ({{ product.rating.count }} reviews)</p>
      <div class="flex justify-between">
        <button @click="$router.push('/')" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Back</button>
        <button @click="addToCart" class="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">Add to Cart</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['products']),
    product() {
      return this.products.find(p => p.id === parseInt(this.$route.params.id));
    }
  },
  methods: {
    addToCart() {
      // Add product to cart logic here
      console.log('Added to cart!');
    }
  }
};
</script>

<style scoped>
.product-detail {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.product-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.product-info {
  padding: 20px;
  background-color: #f7f7f7;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.product-info h2 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.product-info p {
  font-size: 16px;
  margin-bottom: 10px;
}

.product-info .flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.product-info button {
  margin: 10px;
}
</style>