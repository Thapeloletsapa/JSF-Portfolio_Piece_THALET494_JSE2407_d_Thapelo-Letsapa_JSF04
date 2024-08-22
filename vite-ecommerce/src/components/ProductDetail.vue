<template>
  <main class="product-detail-container">
    <!-- Spinner Container -->
    <div v-if="loading" class="spinner-overlay">
      <div class="spinner"></div>
    </div>

    <!-- Product Details -->
    <div v-else-if="error" class="text-red-500">Error: {{ error }}</div>
    <div v-else-if="product" class="product-detail">
      <img :src="product.image" :alt="product.title" class="product-image" />
      <h1 class="product-title">{{ product.title }}</h1>
      <p class="product-description">{{ product.description }}</p>
      <p class="product-price">${{ product.price }}</p>
      <p class="product-category">{{ product.category }}</p>

      <!-- Star Rating Component -->
      <StarRating
        :rating="product.rating.rate"
        :editable="true"
        @update:rating="updateRating"
      />

      <!-- Show Reviews Link -->
      <a href="#" @click.prevent="toggleReviews" class="show-reviews-link">
        {{ showReviews ? 'Hide Reviews' : 'Show Reviews' }}
      </a>

      <!-- Reviews Section -->
      <div v-if="showReviews" class="reviews-list">
        <Reviews :productId="product.id.toString()" />
      </div>

      <!-- Add to Cart Button -->
      <button class="add-to-cart-btn" @click="handleAddToCart">
        <img src="../assets/Add2.svg" alt="Add to Cart" class="cart-icon" />
        {{ buttonText }}
      </button>
    </div>
    <router-link to="/" class="back-link">Back to products</router-link>
  </main>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { useStore } from 'vuex';
import StarRating from './StarRating.vue';
import Reviews from './Reviews.vue'; 

export default {
  name: "ProductDetail",
  components: { StarRating, Reviews },
  setup() {
    const route = useRoute();
    const store = useStore();
    const id = route.params.id;

    const product = ref(null);
    const loading = ref(true);
    const error = ref(null);
    const buttonText = ref('Add to Cart');
    const currentReview = ref({
      name: '',
      comment: '',
      rating: 0,
    });
    const editingReview = ref(null);  
    const loggedIn = ref(true);  
    const showReviews = ref(false);  
    const fetchProduct = async (id) => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) throw new Error("Data fetching failed");
        const data = await response.json();
        product.value = data;
        store.dispatch('fetchReviews', id); 
      } catch (err) {
        error.value = err.message;
      } finally {
        loading.value = false;
      }
    };

    const handleAddToCart = () => {
      store.dispatch('addToCart', {
        productId: product.value.id,
        productPrice: product.value.price,
        productQuantity: 1,
        productTitle: product.value.title,
        productImage: product.value.image,
      });
      buttonText.value = 'Added';
      setTimeout(() => {
        buttonText.value = 'Add to Cart';
      }, 900);
    };

    const submitReview = () => {
      if (!currentReview.value.name || !currentReview.value.comment || !currentReview.value.rating) {
        alert('Please fill all fields');
        return;
      }

      const review = {
        ...currentReview.value,
        timestamp: new Date().toISOString(),
        isEditable: true,
      };

      // Store review in Vuex store
      store.dispatch('addReview', { productId: id, review });

      // Clear form fields
      currentReview.value = { name: '', comment: '', rating: 0 };
      editingReview.value = null;

      // Notify success
      alert('Review submitted successfully');
    };

    const updateExistingReview = () => {
      if (!currentReview.value.name || !currentReview.value.comment || !currentReview.value.rating) {
        alert('Please fill all fields');
        return;
      }

      const updatedReview = {
        ...editingReview.value,
        ...currentReview.value,
      };

      // Update review in Vuex store
      store.dispatch('updateReview', { productId: id, review: updatedReview });

      // Clear form fields
      currentReview.value = { name: '', comment: '', rating: 0 };
      editingReview.value = null;

      // Notify success
      alert('Review updated successfully');
    };

    const removeReview = (timestamp) => {
      store.dispatch('deleteReview', { productId: id, timestamp });
    };

    const editReview = (review) => {
      currentReview.value = { ...review };
      editingReview.value = review;
    };

    const toggleReviews = () => {
      showReviews.value = !showReviews.value;
    };

    const sortedReviews = computed(() => {
      return store.getters.productReviews(id).slice().sort((a, b) => b.rating - a.rating || new Date(b.timestamp) - new Date(a.timestamp)) || [];
    });

    const updateRating = (newRating) => {
      product.value.rating.rate = newRating;
      store.dispatch('addRating', { productId: id, rating: newRating });
    };

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleDateString('en-US', options);
    };

    onMounted(() => {
      fetchProduct(id);
    });

    return {
      product,
      loading,
      error,
      buttonText,
      currentReview,
      editingReview,
      loggedIn,
      showReviews,
      handleAddToCart,
      submitReview,
      updateExistingReview,
      removeReview,
      editReview,
      toggleReviews,
      sortedReviews,
      updateRating,
      formatDate,
    };
  },
};
</script>

<style scoped>
.product-detail-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.spinner-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top: 4px solid #007bff;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.product-detail {
  text-align: center;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  margin-top: 20px;
}

.product-image {
  max-width: 50%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.product-title {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 10px;
}

.product-description {
  font-size: 18px;
  margin: 10px 0;
  color: #555;
}

.product-price {
  font-size: 24px;
  color: #007bff;
  margin-bottom: 10px;
}

.product-category {
  font-size: 16px;
  color: #666;
  margin-bottom: 20px;
}

.add-to-cart-btn {
  display: flex;
  align-items: center;
  padding: 12px 24px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
  margin-top: 20px;
  transition: background-color 0.3s, box-shadow 0.3s;
}

.add-to-cart-btn .cart-icon {
  width: 24px;
  height: 24px;
  margin-right: 10px;
}

.add-to-cart-btn:hover {
  background-color: #0056b3;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

.show-reviews-link {
  cursor: pointer;
  color: #007bff;
  text-decoration: underline;
  margin-top: 20px;
  display: inline-block;
}

.reviews-list {
  margin-top: 20px;
  text-align: left;
}

.review-item {
  margin-bottom: 20px;
  padding: 10px 15px;
  border-radius: 5px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.review-author {
  font-weight: bold;
  font-size: 16px;
}

.review-comment {
  font-size: 14px;
  color: #333;
  margin-top: 5px;
}

.back-link {
  display: inline-block;
  margin-top: 30px;
  color: #007bff;
  text-decoration: none;
  font-size: 16px;
  padding: 10px 20px;
  border-radius: 5px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  cursor: pointer;
  transition: background-color 0.3s, border-color 0.3s;
}

.back-link:hover {
  background-color: #f2f2f2;
  border-color: #ccc;
  text-decoration: none;
}
</style>
