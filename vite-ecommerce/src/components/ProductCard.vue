<template>
  <div class="product-card">
    <img :src="product.image" :alt="product.title" class="product-image" />
    <h3>{{ product.title }}</h3>
    <p>${{ product.price }}</p>
    <p>{{ product.category }}</p>
   
    <button class="view-btn" @click="navigateToProductDetail">
  <span class="span-mother">
    <span>V</span>
    <span>i</span>
    <span>e</span>
    <span>w</span>
   
   
  </span>
  <span class="span-mother2">
    <span>D</span>
    <span>e</span>
    <span>t</span>
    <span>a</span>
    <span>i</span>
    <span>l</span>
  </span>
</button>
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

  

}
.view-btn {
  font-weight: bold;
  color: #023047;
  border-radius: 2rem;
  cursor: pointer;
  width: 95.02px;
  height: 42.66px;
  border: none;
  background-color: #e5989b;
  display: flex;
  justify-content: center;
  align-items: center;
}

.view-btn .span-mother {
  display: flex;
  overflow: hidden;
}

.view-btn:hover .span-mother {
  position: absolute;
}

.view-btn:hover .span-mother span {
  transform: translateY(1.2em);
}

.view-btn .span-mother span:nth-child(1) {
  transition: 0.2s;
}

.view-btn .span-mother span:nth-child(2) {
  transition: 0.3s;
}

.view-btn .span-mother span:nth-child(3) {
  transition: 0.4s;
}

.view-btn .span-mother span:nth-child(4) {
  transition: 0.5s;
}

.view-btn .span-mother span:nth-child(5) {
  transition: 0.6s;
}

.view-btn .span-mother span:nth-child(6) {
  transition: 0.7s;
}

.view-btn .span-mother2 {
  display: flex;
  position: absolute;
  overflow: hidden;
}

.view-btn .span-mother2 span {
  transform: translateY(-1.2em);
}

.view-btn:hover .span-mother2 span {
  transform: translateY(0);
}

.view-btn .span-mother2 span {
  transition: 0.2s;
}

.view-btn .span-mother2 span:nth-child(2) {
  transition: 0.3s;
}

.view-btn .span-mother2 span:nth-child(3) {
  transition: 0.4s;
}

.view-btn .span-mother2 span:nth-child(4) {
  transition: 0.5s;
}

.view-btn .span-mother2 span:nth-child(5) {
  transition: 0.6s;
}

.view-btn .span-mother2 span:nth-child(6) {
  transition: 0.7s;
}

.product-image {
  width: 100%;
  height: auto;
  margin-bottom: 10px;
  padding: 10px
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
