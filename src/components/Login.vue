<template>
  <div class="container">
    <h1 class="text-center mb-4">Login</h1>
    <div class="row justify-content-center">
      <div class="col-sm-6">
        <router-link to="/register" class="btn btn-primary btn-block mb-3">Register</router-link>
        <form @submit.prevent="submitLoginForm" class="card p-4">
          <div class="form-group">
            <label for="username">Username:</label>
            <input id="username" type="text" v-model="username" required class="form-control" />
          </div>
          <div class="form-group">
            <label for="password">Password:</label>
            <input id="password" type="password" v-model="password" required class="form-control" />
          </div>
          <button type="submit" class="btn btn-primary btn-block mt-3">Login</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
//import { goToPage } from './Home.vue';
export default {
  data() {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    async userRole() {
      const response = await axios.get('http://localhost:3000/users/me', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      },);
      return response.data.role;
    },
    async login(username, password) {
      try {
        const response = await axios.post('http://localhost:3000/users/login', {username, password});
        localStorage.setItem('token', response.data.jwt);
        localStorage.setItem('username', username);
      } catch (error) {
        console.error(error);
      }
    },
    async submitLoginForm() {
      await this.login(this.username, this.password);
      this.$router.push({ path: '/locations' });
    }
  }
};
</script>
<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
h1 {
  font-size: 48px;
  margin-bottom: 20px;
  text-shadow: 1px 1px #000;
}
main {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.card {
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  padding: 40px;
  text-align: center;
}
form {
  display: flex;
  flex-direction: column;
}
input {
  border: none;
  border-bottom: 2px solid #1c1c1c;
  font-size: 18px;
  margin-bottom: 20px;
  padding: 10px;
  width: 100%;
}
button {
  background-color: #1c1c1c;
  border: none;
  color: #fff;
  font-size: 18px;
  padding: 10px;
  width: 100%;
}
</style>
