<template>
  <div class="cart">
    <h2>Cart</h2>
    <ul>
      <li v-for="item in cart" :key="item.id">
        {{ item.name }} ({{ item.quantity }})
        <button @click="updateQuantity(item, item.quantity - 1)">-</button>
        <button @click="updateQuantity(item, item.quantity + 1)">+</button>
        <button @click="removeFromCart(item.id)">Remove</button>
      </li>
    </ul>
    <p>Total cost: {{ totalCost.toFixed(2) }}</p>
    <button @click="clearCart">Clear cart</button>
    <p>Items in cart: {{ cart.length }}</p>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
//import jwt_decode from 'jwt-decode';// Fix import

export default {
  setup() {
    const store = useStore();
    const token = localStorage.getItem('token');
    const userId = token ? jwt_decode(token).id : null;

    const cart = computed(() => store.state.carts[userId] || []);

    const totalCost = computed(() => {
      return cart.value.reduce((acc, item) => acc + item.price * item.quantity, 0);
    });

    const updateQuantity = (item, quantity) => {
      if (quantity > 0) {
        store.dispatch('updateQuantity', { userId, id: item.id, quantity });
      }
    };

    const removeFromCart = (id) => {
      store.dispatch('removeFromCart', { userId, id });
    };

    const clearCart = () => {
      store.dispatch('clearCart', userId);
    };

    onMounted(() => {
      if (userId) {
        store.dispatch('loadCart', userId);
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