/* eslint-disable vue/attribute-hyphenation */
<template>
  <div v-if="user">
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
    </base-header>

    <div class="container-fluid mt--8">
      <div class="row">
        <div class="col">
          <div v-if="expenses.length > 0">
            <div class="card w-50">
              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">
                  With supporting text below as a natural lead-in to additional
                  content.
                </p>
                <a href="#" class="btn btn-primary">Button</a>
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
  components: {},
  data() {
    return {
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
