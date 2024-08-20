<template>
  <div class="register-container">
    <div class="register-form">
      <h1 class="register-title">Create an Account</h1>
      <form @submit.prevent="register">
        <div class="form-group">
          <label for="username" class="form-label">Username:</label>
          <input type="text" id="username" v-model="username" class="form-input">
        </div>
        <div class="form-group">
          <label for="email" class="form-label">Email:</label>
          <input type="email" id="email" v-model="email" class="form-input">
        </div>
        <div class="form-group">
          <label for="password" class="form-label">Password:</label>
          <input type="password" id="password" v-model="password" class="form-input">
        </div>
        <button type="submit" class="btn btn-primary">Create Account</button>
      </form>
      <p class="register-link">Already have an account? <router-link :to="{ name: 'login' }">Login</router-link></p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      email: '',
      password: ''
    }
  },
  methods: {
    register() {
      // Call your registration API or perform registration logic here
      console.log('Registering user:', this.username, this.email, this.password);
      // Redirect to login page after registration
      this.$router.push({ name: 'login' });
    }
  }
}
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f7f7f7;
}

.register-form {
  width: 400px;
  background-color: #fff;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.register-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: bold;
}

.form-input {
  width: 100%;
  height: 40px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.btn {
  background-color: #4CAF50;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn:hover {
  background-color: #3e8e41;
}

.register-link {
  font-size: 14px;
  color: #666;
  margin-top: 20px;
}

.register-link a {
  text-decoration: none;
  color: #337ab7;
}

.register-link a:hover {
  color: #23527c;
}
</style>