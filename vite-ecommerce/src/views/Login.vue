<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="username">Username</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <div class="password-container">
          <input :type="passwordVisible ? 'text' : 'password'" id="password" v-model="password" required />
          <button type="button" @click="togglePasswordVisibility">
            {{ passwordVisible ? 'Hide' : 'Show' }}
          </button>
        </div>
      </div>
      <button type="submit">Login</button>
      <p v-if="loading">Logging in...</p>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
  name: 'Login',
  setup() {
    const username = ref('');
    const password = ref('');
    const passwordVisible = ref(false);
    const loading = ref(false);
    const errorMessage = ref('');
    const store = useStore();
    const router = useRouter();

    const togglePasswordVisibility = () => {
      passwordVisible.value = !passwordVisible.value;
    };

    const handleLogin = async () => {
      if (!username.value || !password.value) {
        errorMessage.value = 'Please enter both username and password.';
        return;
      }

      loading.value = true;
      errorMessage.value = '';

      try {
        const res = await fetch('https://fakestoreapi.com/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username.value,
            password: password.value,
          }),
        });

        if (!res.ok) throw new Error('Login failed. Please check your credentials.');

        const data = await res.json();
        store.commit('setToken', data.token);
        localStorage.setItem('token', data.token); // Store token in local storage

        const redirectTo = router.currentRoute.value.query.redirect || '/';
        router.push(redirectTo);
      } catch (error) {
        errorMessage.value = error.message;
      } finally {
        loading.value = false;
      }
    };

    return {
      username,
      password,
      passwordVisible,
      loading,
      errorMessage,
      togglePasswordVisibility,
      handleLogin,
    };
  },
};
</script>

<style scoped>
/* ... */
</style>