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
<button
          @click="toggleFavorite(product)"
          class="favorite-button"
          type="button"
        >
          <svg
            :class="{ 'text-red-500': isFavorite }"
            class="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </button>
        <button
          class="compare-button bg-blue-950 text-white px-4 py-2 rounded hover:bg-green-600"
          @click="handleAddToComparison"
        >
          {{ buttonText }}
        </button>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

/**
 * ProductCard component displays individual product details in a card format.
 * 
 * @component
 * @example
 * <ProductCard :product="product" />
 * 
 * @prop {Object} product - The product object to be displayed.
 * @prop {string} product.id - The unique identifier of the product.
 * @prop {string} product.title - The title of the product.
 * @prop {string} product.image - The URL of the product's image.
 * @prop {number} product.price - The price of the product.
 * @prop {string} product.category - The category of the product.
 */

export default {
  name: 'ProductCard',
  props: {
    product: Object,
    required: true,
  },

  setup(props) {
    const router = useRouter();
    const store = useStore();
    const isFavorite = ref(false);
    const buttonText = ref('Add to Compare');

    /**
     * Navigates to the detailed view of the product.
     */
    const navigateToProduct = (product) => {
      router.push(`/product/${product.id}`);
    };

    /**
     * Toggles the favorite state of the product.
     */
    const toggleFavorite = (product) => {
      isFavorite.value = !isFavorite.value;
      handleAddToWishList(product);
    };

    /**
     * Handles adding the product to the wishlist.
     */
    const handleAddToWishList = (product) => {
      store.dispatch('addToWishlist', {
        productId: product.id,
        productPrice: product.price,
        productQuantity: 1,
        productTitle: product.title,
        productImage: product.image,
      });
    };

    /**
     * Handles adding the product to the comparison list.
     */
    const handleAddToComparison = () => {
      store.dispatch('addToComparison', {
        productId: props.product.id,
        productPrice: props.product.price,
        productQuantity: 1,
        productTitle: props.product.title,
        productImage: props.product.image,
        productDescription:props.product.description
      });
      buttonText.value = 'Added';
      setTimeout(() => {
        buttonText.value = 'Add to Comparison';
      }, 900);
    };

    return {
      navigateToProduct,
      toggleFavorite,
      handleAddToComparison,
      isFavorite,
      buttonText,
    };
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  border-radius: 8px;
  padding: 15px;
  text-align: left;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  cursor: pointer;
  height: 100%;
  

}
.product-card:hover {
  transform: scale(1.05);
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
  height: 192px; 
  object-fit: contain;
  border-radius: 8px 8px 0 0;
}

h3 {
  font-size: 18px;
  margin: 10px 0;
}

p {
  font-size: 16px;
  color: #666;
}
.compare-button {
  font-size: 0.875rem; /* Slightly smaller font size */
  padding: 0.375rem 0.75rem; /* Reduced padding for a more compact button */
  border-radius: 4px; /* Slightly smaller border radius */
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
  margin: 0.25rem; /* Space between buttons */
}
</style>
