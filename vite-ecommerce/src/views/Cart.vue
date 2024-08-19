<template>
  <div class="cart">
    <h2>Cart</h2>
    <ul>
      <li v-for="item in cart" :key="item.id">
        {{ item.name }} ({{ item.quantity }})
        <button @click="updateQuantity(item, item.quantity - 1)">-</button>
        <button @click="updateQuantity(item, item.quantity + 1)">+</button>
        <button @click="removeFromCart(item)">Remove</button>
      </li>
    </ul>
    <p>Total cost: {{ totalCost }}</p>
    <button @click="clearCart">Clear cart</button>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();
    const cart = computed(() => store.getters.cart || []); // Initialize cart to an empty array if it's undefined
    const totalCost = computed(() => {
      if (!cart.value || cart.value.length === 0) return 0; // Return 0 if cart is empty
      return cart.value.reduce((acc, item) => acc + item.price * item.quantity, 0);
    });

    const updateQuantity = (item, quantity) => {
      if (quantity > 0) {
        store.commit('updateQuantity', { item, quantity });
      }
    };

    const removeFromCart = (item) => {
      store.commit('removeFromCart', item);
    };

    const clearCart = () => {
      store.commit('clearCart');
    };

    return {
      cart,
      totalCost,
      updateQuantity,
      removeFromCart,
      clearCart,
    };
  },
};
</script>

<style scoped>
.cart {
  margin-top: 20px;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.cart ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.cart li {
  margin-bottom: 10px;
}

.cart button {
  margin-left: 10px;
}
</style>