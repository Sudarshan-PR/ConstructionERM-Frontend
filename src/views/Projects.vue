<template>
  <div v-if="user">
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
      <base-button
        type="default"
        icon="fa fa-plus"
        @click="createProjectModal = true"
      >
        Update Progress
      </base-button>
      <base-button
        v-if="['admin'].includes(user.role)"
        type="default"
        icon="fa fa-plus"
        @click="createProjectModal = true"
      >
        Create Project
      </base-button>
      <create-project-form
        :show="createProjectModal"
        @close="createProjectModal = false"
        @click.self="createProjectModal = false"
      ></create-project-form>
      <modal
        :show="updateProjectModal"
        style="overflow: auto"
        @close="updateProjectModal = false"
        @click.self="updateProjectModal = false"
      >
        <template #header>
          <h5 id="exampleModalLabel" class="modal-title">
            Update Project Progress
          </h5>
        </template>
        <div class="container">
          <base-input
            v-model="projectModal.name"
            label="Project Name"
            placeholder="Project Name"
          ></base-input>
          <base-input
            v-model="projectModal.budget"
            label="Budget"
            placeholder="Budget (in Rupees)"
          ></base-input>
          <base-input
            v-model="projectModal.size"
            label="Size"
            placeholder="size in sq. ft"
          ></base-input>
          <base-input
            v-model="projectModal.location"
            label="Location"
            placeholder="Location"
          ></base-input>

          <div>
            <label for="dateest"><h4>Estimated End Date</h4></label>
            <datepicker
              id="dateest"
              v-model="projectModal.estimated_finish_date"
              class="form-control"
              label="ahah"
            />
          </div>
          <div class="pt-4">
            <label for="desc"><h4>Description</h4></label>
            <textarea
              id="desc"
              v-model="projectModal.estimated_finish_date"
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

import { authHeader, getCurrentUser } from "../helpers/auth";

import ProjectsTable from "../components/CERMTables/ProjectsTable";
import CreateProjectForm from "./Forms/CreateProject";
import Modal from "../components/Modal";
import { URL } from "../helpers/auth";

export default {
  name: "Projects",
  components: {
    ProjectsTable,
    CreateProjectForm,
    Modal,
    Datepicker,
  },
  data() {
    return {
      user: null,
      createProjectModal: false,
      updateProjectModal: false,
      projects: [],
      projectModal: {
        name: null,
        budget: null,
        localtion: null,
        size: null,
        estimated_finish_date: new Date(),
        status: "in-progress",
        description: null,
      },
    };
  },
  mounted() {
    this.user = getCurrentUser();
    fetch(`${URL}/project/`, {
      method: "GET",
      headers: { ...authHeader() },
    })
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
