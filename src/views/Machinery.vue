<template>
  <div v-if="user">
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
      <base-button
        v-if="['admin'].includes(user.role)"
        type="default"
        icon="fa fa-plus"
        @click="createMachineryModal = true"
      >
        Create Project
      </base-button>
      <create-machinery-modal
        :show="createMachineryModal"
        @close="createMachineryModal = false"
        @click.self="createMachineryModal = false"
      ></create-machinery-modal>
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
import { authHeader, getCurrentUser } from "../helpers/auth";

import ProjectsTable from "../components/CERMTables/ProjectsTable";
import CreateMachineryModal from "./Forms/CreateMachinery";
import { URL } from "../helpers/auth";

export default {
  name: "Projects",
  components: {
    ProjectsTable,
    CreateMachineryModal,
  },
  data() {
    return {
      user: null,
      createMachineryModal: false,
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
