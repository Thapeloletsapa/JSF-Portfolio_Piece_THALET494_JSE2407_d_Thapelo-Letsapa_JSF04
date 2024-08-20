<template>
  <div class="login-container">
    <div class="login-header">
      <h2>Login to Your Account</h2>
      <p>Enter your username and password to access your account.</p>
    </div>
    <form @submit.prevent="handleLogin" class="login-form">
      <div class="form-group">
        <label for="username">Username</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <div class="password-container">
          <input :type="passwordVisible ? 'text' : 'password'" id="password" v-model="password" required />
          <button type="button" @click="togglePasswordVisibility" class="password-toggle">
            {{ passwordVisible ? 'Hide' : 'Show' }}
          </button>
        </div>
      </div>
      <button type="submit" class="login-btn">Login</button>
      <p v-if="loading" class="loading-message">Logging in...</p>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      <button type="button" @click="logout" v-if="isLoggedIn" class="logout-btn">Logout</button>
    </form>
    <div class="login-footer">
      <p>Don't have an account? <router-link to="/register">Create one now</router-link></p>
    </div>
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

    const logout = () => {
      localStorage.removeItem('token'); // Clear token from local storage
      store.commit('setToken', null);
      router.push('/login');
    };

    const isLoggedIn = computed(() => {
      return store.state.token !== null;
    });

    return {
      username,
      password,
      passwordVisible,
      loading,
      errorMessage,
      togglePasswordVisibility,
      handleLogin,
      logout,
      isLoggedIn,
    };
  },
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 40px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.login-header {
  text-align: center;
  margin-bottom: 20px;
}

.login-header h2 {
  font-weight: bold;
  margin-bottom: 10px;
}

.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 10px;
}

.form-group input {
  width: 100%;
  height: 40px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.password-container {
  position: relative;
}

.password-toggle {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 14px;
  cursor: pointer;
}

.login-btn {
  width: 100%;
  height: 40px;
  padding: 10px;
  background-color: #4CAF50;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.login-btn:hover {
  background-color: #3e8e41;
}

.logout-btn {
  width: 100%;
  height: 40px;
  padding: 10px;
  background-color: #ff9800;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.logout-btn:hover {
  background-color: #ff9900;
}

.loading-message {
  color: #666;
  font-size: 14px;
  margin-top: 10px;
}

.error-message {
  color: red;
  font-size: 14px;
  margin-top: 10px;
}

.login-footer {
  text-align: center;
  margin-top: 20px;
}

.login-footer a {
  text-decoration: none;
  color: #337ab7;
}

.login-footer a:hover {
  color: #23527c;
}
</style>