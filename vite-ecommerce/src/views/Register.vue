<template>
    <div>
      <h1>Register</h1>
      <form @submit.prevent="register">
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username"><br><br>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email"><br><br>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password"><br><br>
        <input type="submit" value="Register">
      </form>
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