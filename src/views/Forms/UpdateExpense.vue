<template>
  <modal :show="showModal">
    <template #header>
      <h5 id="exampleModalLabel" class="modal-title">
        Expense: {{ expense.id }}
      </h5>
    </template>
    <div class="container">
      <div v-if="!expense.image" class="card text-center bg-danger py-4 mb-3">
        <span class="text-secondary">No image</span>
      </div>
      <div v-else class="card text-center py-4 mb-3">
        <img
          :src="expense.image"
          class="expense-image-intense"
          alt="Expense Image cannot be Loaded"
        />
      </div>
      <div class="container mb-4">
        <div class="row">
          <div class="card col-6 text-center">
            <h2 class="card-header py-2">Amount</h2>
            <div class="card-body">
              {{ expense.total_amount }}
            </div>
          </div>
          <div class="card col-6 text-center">
            <h2 class="card-header py-2">Balance</h2>
            <div class="card-body">
              {{ expense.total_amount - expense.total_paid }}
            </div>
          </div>
        </div>
      </div>
      <base-input v-model="formData.project" label="Project" required>
        <select v-model="formData.project" class="form-control">
          <option
            v-for="project in projects"
            :key="project.id"
            :value="project.id"
            :selected="expense.project == project.id ? true : false"
          >
            {{ project.name }}
          </option>
        </select>
      </base-input>
      <base-input
        v-model="formData.current_paid"
        label="Amount Paid"
        required
      ></base-input>
    </div>

    <div v-if="error" class="container">
      {{ error }}
    </div>
    <template #footer>
      <base-button type="secondary" @click="$emit('close')">
        Close
      </base-button>
      <div @click="updateExpense()">
        <base-button type="primary">Save changes</base-button>
      </div>
    </template>
  </modal>
</template>

<script>
import { authHeader, URL } from "../../helpers/auth";

export default {
  name: "CreateUserModal",
  props: ["showModal", "expense", "projects"],
  data() {
    return {
      error: null,
      formData: {
        project: null,
        current_paid: null,
      },
    };
  },
  mounted() {
    console.log("Update exp mounted : ", this.expense);
    console.log("Update project mounted : ", this.projects);
  },
  methods: {
    updateExpense() {
      const data = { ...this.formData };
      data.total_amount = this.expense.total_amount;
      data.total_paid = this.expense.total_paid;
      if (data.current_paid <= 0) {
        data.current_paid = null;
        data.total_paid = this.expense.total_paid;
      }

      fetch(`${URL}/expenses/${this.expense.id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
          ...authHeader(),
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Data expense head post: ", data);
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

<style></style>
