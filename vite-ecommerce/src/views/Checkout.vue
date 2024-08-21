<template>
  <div>
    <h2 class="text-2xl font-bold mb-4">Checkout</h2>
    <form @submit.prevent="processCheckout">
      <div class="mb-4">
        <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
        <input type="text" id="name" v-model="name" class="p-2 border border-gray-300 rounded w-full">
      </div>
      <div class="mb-4">
        <label for="address" class="block text-sm font-medium text-gray-700">Address</label>
        <input type="text" id="address" v-model="address" class="p-2 border border-gray-300 rounded w-full">
      </div>
      <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Place Order</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      address: ''
    };
  },
  methods: {
    processCheckout() {
      // Handle checkout process
      alert('Order placed successfully!');
      this.$store.commit('clearCart');
      this.$router.push('/');
    }
  }
};
</script>

  