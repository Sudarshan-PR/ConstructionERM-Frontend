/* eslint-disable vue/attribute-hyphenation */
<template>
  <div v-if="user">
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
      <div>
        <base-button
          type="default"
          icon="fa fa-plus"
          @click="showExpenseModal = true"
        >
          Expense
        </base-button>
        <base-button
          v-if="['admin'].includes(user.role)"
          type="default"
          icon="fa fa-plus"
          @click="showBeneficiaryModal = true"
        >
          Beneficiary
        </base-button>
        <base-button
          v-if="['admin'].includes(user.role)"
          type="default"
          icon="fa fa-plus"
          @click="showExpenseHeadModal = true"
        >
          Expense Head
        </base-button>
      </div>
      <create-expense-modal
        :show-modal="showExpenseModal"
        @close="showExpenseModal = false"
        @click.self="showExpenseModal = false"
      ></create-expense-modal>
      <create-beneficiary-modal
        v-if="['admin'].includes(user.role)"
        :show-modal="showBeneficiaryModal"
        @close="showBeneficiaryModal = false"
        @click.self="showBeneficiaryModal = false"
      ></create-beneficiary-modal>
      <create-expense-head-modal
        v-if="['admin'].includes(user.role)"
        :show-modal="showExpenseHeadModal"
        @close="showExpenseHeadModal = false"
        @click.self="showExpenseHeadModal = false"
      ></create-expense-head-modal>
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
import CreateExpenseModal from "./Forms/CreateExpense";
import CreateExpenseHeadModal from "./Forms/CreateExpenseHead";
import CreateBeneficiaryModal from "./Forms/CreateBeneficiaryModal";
import { getCurrentUser, authHeader, URL } from "../helpers/auth";

export default {
  name: "Projects",
  components: {
    ExpenseTable,
    CreateExpenseModal,
    CreateExpenseHeadModal,
    CreateBeneficiaryModal,
  },
  data() {
    return {
      createProjectModal: false,
      date: new Date(),
      projects: [],
      showExpenseModal: false,
      showExpenseHeadModal: false,
      showBeneficiaryModal: false,
      user: null,
    };
  },
  mounted() {
    this.user = getCurrentUser();
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
