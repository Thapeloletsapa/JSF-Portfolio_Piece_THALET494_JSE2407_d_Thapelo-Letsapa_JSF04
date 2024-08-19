<template>
  <div class="product-card" @click="navigateToProductDetail">
    <img :src="product.image" :alt="product.title" class="product-image" />
    <h3>{{ product.title }}</h3>
    <p>${{ product.price }}</p>
    <p>{{ product.category }}</p>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    product: Object,
  },
  methods: {
    navigateToProductDetail() {
      this.$router.push(`/product/${this.product.id}`);
    },
  },
};
</script>

<style scoped>
.product-card {
  background-color: white;
  border-radius: 8px;
  padding: 15px;
  text-align: left;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
}

.product-card:hover {
  transform: scale(1.05);
  cursor: pointer;
}

.product-image {
  width: 100%;
  height: auto;
  margin-bottom: 10px;
}

h3 {
  font-size: 18px;
  margin: 10px 0;
}

p {
  font-size: 16px;
  color: #666;
}
</style>

  