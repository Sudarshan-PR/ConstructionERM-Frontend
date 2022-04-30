<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
      <base-button
        type="default"
        icon="fa fa-plus"
        @click="createProjectModal = true"
      >
        Create Project
      </base-button>
      <modal :show="createProjectModal">
        <template #header>
          <h5 id="exampleModalLabel" class="modal-title">Create Project</h5>
        </template>
        <div class="container">
          <base-input
            label="Project Name"
            placeholder="Project Name"
          ></base-input>
          <base-input
            label="Budget"
            placeholder="Budget (in Rupees)"
          ></base-input>
          <base-input label="Size" placeholder="size in sq. ft"></base-input>
          <base-input label="Location" placeholder="Location"></base-input>

          <div>
            <label for="dateest"><h4>Estimated End Date</h4></label>
            <datepicker
              id="dateest"
              v-model="date"
              class="form-control"
              label="ahah"
            />
          </div>
          <div class="pt-4">
            <label for="desc"><h4>Description</h4></label>
            <textarea
              id="desc"
              placeholder="Describe your project"
              class="form-control"
              rows="6"
            ></textarea>
          </div>
        </div>
        <template #footer>
          <base-button type="secondary" @click="createProjectModal = false">
            Close
          </base-button>
          <base-button type="primary">Save changes</base-button>
        </template>
      </modal>
    </base-header>

    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col">
          <div v-if="projects.length > 0">
            <projects-table title="Projects" :data="projects"></projects-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Datepicker from "vue3-datepicker";

import ProjectsTable from "../components/CERMTables/ProjectsTable";
import Modal from "../components/Modal";

export default {
  name: "Projects",
  components: {
    ProjectsTable,
    Modal,
    Datepicker,
  },
  data() {
    return {
      createProjectModal: false,
      date: new Date(),
      projects: [],
    };
  },
  mounted() {
    fetch("http://localhost:8000/project/")
      .then((response) => response.json())
      .then((data) => {
        console.log("Data fetch: ", data);
        this.projects = data;
      });

    console.log("Fetched: ", this.projects);
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
