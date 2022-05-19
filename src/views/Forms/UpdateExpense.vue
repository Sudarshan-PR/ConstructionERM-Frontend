<template>
  <modal :show="showModal">
    <template #header>
      <h5 id="exampleModalLabel" class="modal-title">
        Expense: {{ expenseId }}
      </h5>
    </template>
    <div class="container">
      <base-input
        v-model="formData.name"
        label="Name"
        placeholder="Name"
        required
      ></base-input>
      <base-input
        label="Whatsapp Phone Number"
        placeholder="+91"
        required
      ></base-input>
      <base-input v-model="formData.role" label="Role" required>
        <select class="form-control">
          <option v-for="role in roles" :key="role.id">
            {{ role.name }}
          </option>
        </select>
      </base-input>
      <base-input
        v-model="formData.password"
        label="Password"
        type="password"
        required
      ></base-input>
      <base-input
        v-model="formData.repassword"
        label="Re-enter Password"
        type="password"
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
      <div @click="createUser()">
        <base-button type="primary">Save changes</base-button>
      </div>
    </template>
  </modal>
</template>

<script>
import { authHeader, URL } from "../../helpers/auth";

export default {
  name: "CreateUserModal",
  props: ["showModal", "expenseId"],
  data() {
    return {
      error: null,
      formData: {
        name: null,
        role: null,
        phone: null,
        password: null,
        repassword: null,
      },
      roles: [
        { id: 1, name: "Admin" },
        { id: 2, name: "Supervisor" },
        { id: 3, name: "Employee" },
      ],
    };
  },
  mounted() {
    console.log("Update exp mounted : ", this.expenseId);
  },
  methods: {
    createUser() {
      if (this.formData.password !== this.formData.repassword) {
        console.log("Passwords don't match");
        this.error = "Passwords don't match";
        return;
      }
      fetch(`${URL}/user`, {
        method: "POST",
        body: JSON.stringify(this.formData),
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

<style></style>
