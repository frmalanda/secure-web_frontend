<template>
  <h3 align="left"> Locations </h3>
  <div>
    <div v-for="location in currentLocations" :key="location._id">
      <ul>
        <li>
          <a @click="locationDetails(location._id)">{{ location.filmName }}</a></li>
      </ul>
    </div>
    <br />

    <div>
      <button @click="previousPage">Previous</button>
      <button @click="nextPage">Next</button>

      <button @click="addLocation">Add Location</button>

    </div>
  </div>

</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      token: localStorage.getItem('token'),
      locations: [],
      currentPage: 1,
      itemsPerPage: 10,
      role: '',
    };
  },
  computed: {
    currentLocations() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.locations.slice(start, end);
    },
  },
  async mounted() {
    await this.fetchLocations();
    this.role = await this.userRole();
  },
  methods: {
    async userRole() {
      try {
        const response = await axios.get('http://localhost:3000/users/me', {
          headers: {
            'Authorization': `Bearer ${this.token}`,
          }
        },);
        return response.data.role;
      } catch (error) {
        return error.response;
      }
    },
    async fetchLocations() {
      const { data } = await axios.get('http://localhost:3000/locations', {
        headers: {
          'Authorization': `Bearer ${this.token}`,
        }});
      this.locations = data;
    },
    addLocation() {
      this.$router.push('/addLocation');
    },
    locationDetails(locationId) {
      this.$router.push(`/details/${locationId}`);
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < Math.ceil(this.locations.length / this.itemsPerPage)) {
        this.currentPage++;
      }
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}


h3 {
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
