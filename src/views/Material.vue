/* eslint-disable vue/attribute-hyphenation */
<template>
  <div v-if="user">
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
      <div>
        <base-button
          class="my-1"
          type="default"
          icon="fa fa-plus"
          @click="showProcurementModal = true"
        >
          Procured
        </base-button>
        <base-button
          class="my-1"
          type="default"
          icon="fa fa-plus"
          @click="showConsumedModal = true"
        >
          Consumed
        </base-button>
        <base-button
          class="my-1"
          type="default"
          icon="fa fa-plus"
          @click="showCatogaryModal = true"
        >
          Category
        </base-button>
      </div>
      <Procurement
        :show-modal="showProcurementModal"
        @close="showProcurementModal = false"
        @click.self="showProcurementModal = false"
        @expense-update="getExpenses()"
      ></Procurement>
      <material-catogary
        :show-modal="showCatogaryModal"
        @close="showCatogaryModal = false"
        @click.self="showCatogaryModal = false"
        @expense-update="getExpenses()"
      ></material-catogary>
    </base-header>

    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col">
          <div v-if="projects.length > 0">
            <expense-table title="Expenses" :data="projects" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ExpenseTable from "../components/CERMTables/ExpenseTable";
import Procurement from "./Forms/Procurement";
import MaterialCatogary from "./Forms/MaterialCatogary";
import { getCurrentUser, authHeader, URL } from "../helpers/auth";

export default {
  name: "Projects",
  components: {
    ExpenseTable,
    MaterialCatogary,
    Procurement,
  },
  data() {
    return {
      createProjectModal: false,
      date: new Date(),
      projects: [],
      showProcurementModal: false,
      showCatogaryModal: false,
      showConsumedModal: false,
      showBeneficiaryModal: false,
      user: null,
    };
  },
  mounted() {
    this.user = getCurrentUser();
    this.getExpenses();
  },
  methods: {
    getExpenses() {
      fetch(`${URL}/expenses/`, {
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
