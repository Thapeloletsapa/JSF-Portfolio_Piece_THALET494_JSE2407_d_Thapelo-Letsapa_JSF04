<script>
import { ref, computed } from 'vue';
import { jwtDecode } from "jwt-decode";


export default {
  name: 'Cart',
  setup() {
    function getUserId() {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken = jwtDecode(token);
        return decodedToken.userId;
      }
      return null;
    }

    function getCart() {
      const userId = getUserId();
      const cart = localStorage.getItem(`cart_${userId}`);
      return cart ? JSON.parse(cart) : [];
    }

    function saveCart(cart) {
      const userId = getUserId();
      localStorage.setItem(`cart_${userId}`, JSON.stringify(cart));
    }

    function updateCartItem(productId, quantity) {
      const cart = getCart();
      const productIndex = cart.findIndex(item => item.productId === productId);

      if (productIndex !== -1) {
        cart[productIndex].quantity = quantity;

        if (quantity === 0) {
          cart.splice(productIndex, 1); 
        }

        saveCart(cart);
      }
    }

    function removeCartItem(productId) {
      updateCartItem(productId, 0);
    }

    function clearCart() {
      const userId = getUserId();
      localStorage.removeItem(`cart_${userId}`);
    }

    const cartItems = ref(getCart());

    const totalItems = computed(() =>
      cartItems.value.reduce((total, item) => total + item.quantity, 0)
    );

    const totalCost = computed(() =>
      cartItems.value.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)
    );

    return {
      cartItems,
      totalItems,
      totalCost,
      updateCartItem,
      removeCartItem,
      clearCart
    };
  },
};
</script>
