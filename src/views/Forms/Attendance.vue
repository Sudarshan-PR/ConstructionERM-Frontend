<template>
  <modal :show="showModal" style="overflow: auto">
    <template #header>
      <h5 id="AttandaceModalLabel" class="modal-title">Update Attendance</h5>
    </template>
    <div class="container">
      <base-input v-if="projects.length > 0" label="Select Project">
        <select v-model="formData.project" class="form-control">
          <option v-for="v in projects" :key="v.id" :value="v.id">
            {{ v.name }}
          </option>
        </select>
      </base-input>

      <base-input label="Image with Timestamp and location">
        <input
          type="file"
          class="form-control-file"
          @change="handleFileUpload($event)"
        />
      </base-input>
      <div class="container">
        <div v-if="success">{{ success }}</div>
        <div v-if="error">{{ error }}</div>
      </div>
    </div>
    <template #footer>
      <base-button type="secondary" @click="$emit('close')">
        Close
      </base-button>
      <div @click.stop="getLocationAndSubmit()">
        <base-button type="primary"> Update Attendance </base-button>
      </div>
    </template>
  </modal>
</template>

<script>
import Modal from "../../components/Modal";
import { authHeader, URL } from "../../helpers/auth";

export default {
  name: "CreateExpenseHeadModal",
  components: {
    Modal,
  },
  props: ["showModal"],
  data() {
    return {
      loc: {},
      projects: [],
      formData: {
        project: "",
        image: null,
      },
      success: null,
      error: null,
    };
  },
  mounted() {
    fetch(`${URL}/project/`, {
      method: "GET",
      headers: { ...authHeader(), "Content-Type": "multipart/form-data" },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data fetch at modal attandance: ", data);
        this.projects = data;
      });
    // this.getLocation();
  },
  methods: {
    handleFileUpload(e) {
      console.log("Image uploading");
      this.formData.image = e.target.files[0];
      console.log("Image uploaded done: ", this.formData.image);
    },
    updateLocationAndSubmit(loc) {
      console.log("Location update: ", loc);
      this.loc = {
        lat: loc.coords.latitude,
        lon: loc.coords.longitude,
      };
      this.createAttendance();
    },
    getLocationAndSubmit() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.updateLocationAndSubmit);
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    },
    createAttendance() {
      const data = new FormData();
      const formdata = { ...this.formData };

      Object.entries(formdata).forEach(([key, value]) => {
        data.append(key, value);
      });
      data.append("loc", JSON.stringify(this.loc));

      console.log("loc: ", this.loc);
      fetch(`${URL}/attendance`, {
        method: "POST",
        body: data,
        headers: {
          ...authHeader(),
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Data attendance: ", data);
          this.projects = data;
          this.error = null;
          this.success = "Attendance Updated";
        })
        .catch((err) => {
          this.success = null;
          this.error = err;
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
