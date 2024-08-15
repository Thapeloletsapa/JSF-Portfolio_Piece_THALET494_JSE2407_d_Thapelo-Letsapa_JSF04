<template>
  <div class="login-container">
    <h2 class="login-title">Login</h2>
    <form @submit.prevent="login" class="login-form">
      <div class="form-group">
        <label for="username" class="form-label">Username</label>
        <input
          v-model="username"
          id="username"
          type="text"
          required
          class="form-control"
          placeholder="Enter your username"
        />
      </div>
      <div class="form-group">
        <label for="password" class="form-label">Password</label>
        <input
          v-model="password"
          id="password"
          type="password"
          required
          class="form-control"
          placeholder="Enter your password"
        />
      </div>
      <button type="submit" class="btn btn-primary btn-block">Login</button>
      <p v-if="error" class="error-message">{{ error }}</p>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      password: '',
      error: null,
    };
  },
  methods: {
    async login() {
      this.error = null;
      try {
        const response = await axios.post('https://fakestoreapi.com/auth/login', {
          username: this.username,
          password: this.password,
        });
        localStorage.setItem('token', response.data.token);
        this.$router.push('/');
      } catch (err) {
        this.error = 'Invalid login credentials';
      }
    },
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
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.login-title {
  text-align: center;
  margin-bottom: 20px;
}

.login-form {
  margin-top: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  margin-bottom: 10px;
}

.form-control {
  width: 100%;
  height: 40px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.form-control:focus {
  border-color: #aaa;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.btn {
  width: 100%;
  height: 40px;
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  background-color: #4CAF50;
  color: #fff;
  cursor: pointer;
}

.btn:hover {
  background-color: #3e8e41;
}

.error-message {
  color: #f00;
  font-size: 14px;
  margin-top: 10px;
}
</style>