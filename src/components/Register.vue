<template>
  <h1 class="title">Create account</h1>

  <router-view />
  <form @submit.prevent="submitRegisterForm" class="login-form">
    <div>
      <label for="username">Username: </label>
      <input id="username" type="text" v-model="username" required class="login-form input" />
    </div>
    <div>
      <label for="password">Password: </label>
      <input id="password" type="password" v-model="password" required class="login-form input"/>
    </div>
    <br/>
    <button type="submit" class="login-form button">Register</button>
    <router-link to="/login">Log In</router-link>
  </form>
</template>

<script>
import axios from 'axios';
import Login from './Login.vue';
export default {
  data() {
    return {
      username: '',
      password: '',
      errorMessage: '',
    }
  },
  methods: {
    async submitRegisterForm() {
      try {
        const response = await axios.post('http://localhost:3000/users/register', {
          username: this.username,
          password: this.password,
        });
        //await Login.login(this.username, this.password);

        try {
          const response = await axios.post('http://localhost:3000/users/login', {
            username: this.username,
            password: this.password,
          });
          localStorage.setItem('token', response.data.jwt);
          localStorage.setItem('username', this.username);
        } catch (error) {
          console.error(error);
        }

        this.$router.push({ path: '/' });
      } catch (error) {
        if (error.response.status === 400) {
          this.errorMessage = "Username already taken !";
        } else {
          this.errorMessage = "An error occurred, please try again later";
        }
      }
    }
  }
};
</script>