<template>
  <modal :show="showModal">
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
      <div @click.stop="createHead()">
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
      projects: [],
      formData: {
        project: "",
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
  },
  methods: {
    createHead() {
      const data = {
        head: this.head,
      };
      fetch(`${URL}/expense-heads`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          ...authHeader(),
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Data expense head post: ", data);
          this.projects = data;
          this.error = null;
          this.success = this.head + " : Head Created";
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
