<script>
import axios from 'axios';
export default {
  data() {
    return {
      awesome: true,
      username: localStorage.getItem('username'),
      token: localStorage.getItem('token',),
      role: localStorage.getItem('role',),
      dataTest: [],
    };
  },
  computed: {
    message() {
      return this.token ? `Re-bonjour ${localStorage.getItem('username')} ! ` : "Re-bonjour  " +
          "Login or Register ?";
    },
  },
  methods: {
    logout() {
      this.token, this.role, this.username = null;
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('role');
      this.goToPage('/login');
    },
    async getFilms() {
      try {
        const { data } = await axios.get('http://localhost:3000/locations', {
          headers: {
            'Authorization': `Bearer ${this.token}`,
          },
        });
        this.dataTest = data;
      }
      catch(error) {
        console.error(error);
      }
    },
    goToPage(path) {
      this.$router.push({ path: path });
    }
  },
  mounted() {
    if (this.token) {
      this.getFilms();
    }
  },
}
</script>

<template>
  <main>
    <p>{{message}}</p>
    <template v-if="token">
      <button @click="logout">Logout</button>
    </template>
    <template v-else>
      <button  @click="goToPage('/login')">Login</button>
      <br>
      <button  @click="goToPage('/register')" >Register</button>
    </template>

  </main>
</template>
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

 body{ background-image: linear-gradient(to bottom, #ffffff, #f2f2f2);

 }

 </style>
