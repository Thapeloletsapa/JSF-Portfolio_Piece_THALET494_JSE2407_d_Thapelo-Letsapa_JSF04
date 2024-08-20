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
    <p>Total cost: {{ totalCost.toFixed(2) }}</p>
    <button @click="clearCart">Clear cart</button>
    <p>Items in cart: {{ cart.length }}</p>
  </div>
</template>

<script>
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useStore } from 'vuex';
import { jwtDecode } from 'jwt-decode';

export default {
  setup() {
    const store = useStore();
    const token = localStorage.getItem('token');
    const userId = token ? jwtDecode(token).id : null;
    const cart = ref(store.state.cart[userId] || []);

    const totalCost = computed(() => {
      if (!cart.value) return 0;
      if (cart.value.length === 0) return 0;
      return cart.value.reduce((acc, item) => acc + item.price * item.quantity, 0);
    });

    const updateQuantity = (item, quantity) => {
      if (quantity > 0) {
        store.commit('updateQuantity', { userId, item, quantity });
      }
    };

    const removeFromCart = (item) => {
      store.commit('removeFromCart', { userId, item });
    };

    const clearCart = () => {
      store.commit('clearCart', userId);
    };

    onMounted(() => {
      if (userId) {
        store.dispatch('loadCart', userId);
      }
    });

    onUnmounted(() => {
      if (userId) {
        store.commit('clearCart', userId);
      }
    });

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