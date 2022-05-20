/* eslint-disable vue/attribute-hyphenation */
<template>
  <div v-if="user">
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
    </base-header>

    <div class="container-fluid mt--8">
      <div v-if="expenses.length > 0" class="row">
        <div v-for="expense in expenses" :key="expense.id" class="col-3">
          <div class="card">
            <div class="card-body">
              <h2 class="card-title">{{ expense.title }}</h2>
              <div class="card-subtitle">
                {{ vendors[expense.vendor] }} <br />
                {{ getDateTime(expense.date) }}
              </div>
              <p class="card-text">
                <br />
                Amount Paid:
                <span class="text-default">
                  <b>{{ expense.current_paid }}</b>
                </span>
                <br />
                Balance:
                <span class="text-default">
                  <b> -{{ expense.total_amount - expense.total_paid }}</b>
                </span>
                <br />
                <span>
                  Raised By: <b>{{ expense.user_name.toUpperCase() }}</b>
                </span>
              </p>
              <div
                class="card-footer px-0 d-flex justify-content-between align-items-center"
              >
                <badge pill type="primary">Primary</badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCurrentUser, authHeader, URL } from "../helpers/auth";

export default {
  name: "Projects",
  data() {
    return {
      vendors: {},
      createProjectModal: false,
      date: new Date(),
      expenses: [],
      showExpenseModal: false,
      showExpenseHeadModal: false,
      showBeneficiaryModal: false,
      user: null,
    };
  },
  mounted() {
    this.user = getCurrentUser();
    this.getVendors();
    fetch(`${URL}/expense-logs/`, {
      method: "GET",
      headers: { ...authHeader() },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data fetch: ", data);
        this.expenses = data;
      });

    console.log("Fetched: ", this.expenses);
  },
  methods: {
    getDateTime(val) {
      const date = new Date(val);
      const day = ("0" + date.getUTCDate()).slice(-2);
      const month = ("0" + date.getMonth()).slice(-2);
      const year = date.getFullYear();
      const hours = ("0" + (date.getHours() - 12)).slice(-2);
      const mins = ("0" + date.getMinutes()).slice(-2);
      const period = hours > 12 ? "PM" : "AM";
      return `${day}-${month}-${year} ${hours}:${mins} ${period}`;
    },
    getVendors() {
      fetch(`${URL}/vendors/`, {
        method: "GET",
        headers: { ...authHeader() },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Data expense head fetch: ", data);
          data.map((i) => {
            this.vendors[i.id] = i.name;
          });
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
