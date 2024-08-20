<template>
    <button @click="handleLogout">Logout</button>
  </template>
  
  <script>
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router';
  
  export default {
    name: 'Logout',
    setup() {
      const store = useStore();
      const router = useRouter();
  
      const handleLogout = () => {
        store.commit('clearToken');
        localStorage.removeItem('token'); // Clear token from local storage
        router.push('/login'); // Redirect to login page
      };
  
      return {
        handleLogout,
      };
    },
  };
  </script>