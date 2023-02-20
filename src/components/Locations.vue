<template>
  <div class="container">
    <h3 class="text-left">Locations</h3>
    <div>
      <div v-for="location in currentLocations" :key="location._id">
        <ul>
          <li>
            <a @click="locationDetails(location._id)">{{ location.filmName }}</a>
          </li>
        </ul>
      </div>
      <br />
      <div class="d-flex justify-content-between align-items-center">
        <button class="btn btn-primary" @click="previousPage">Previous</button>
        <button class="btn btn-primary" @click="nextPage">Next</button>
        <button class="btn btn-success" @click="addLocation">Add Location</button>
      </div>
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
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f4f4f4;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

ul li {
  margin: 10px 0;
}

.btn {
  padding: 10px 20px;
  margin: 0 10px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
}

.btn-primary {
  background-color: #007bff;
  color: #fff;
}

.btn-primary:hover {
  background-color: #0062cc;
}

.btn-success {
  background-color: #28a745;
  color: #fff;
}

.btn-success:hover {
  background-color: #218838;
}

.text-left {
  text-align: left;
}

.d-flex {
  display: flex;
}
</style>