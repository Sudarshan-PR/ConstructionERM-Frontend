<template>
  <modal :show="showModal" style="overflow: auto">
    <template #header>
      <h5 id="exampleModalLabel" class="modal-title">Create User</h5>
    </template>
    <div class="container">
      <base-input
        v-model="formData.name"
        label="Name"
        placeholder="Name"
        required
      ></base-input>
      <base-input
        v-model="formData.phone"
        label="Whatsapp Phone Number"
        placeholder="+91"
        required
      ></base-input>
      <base-input v-model="formData.role" label="Role" required>
        <select v-model="formData.role" class="form-control">
          <option v-for="role in roles" :key="role.id" :value="role.name">
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
  props: ["showModal"],
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
        { id: 1, name: "admin" },
        { id: 2, name: "supervisor" },
        { id: 3, name: "engineer" },
      ],
    };
  },
  methods: {
    createUser() {
      if (this.formData.password !== this.formData.repassword) {
        console.log("Passwords don't match");
        this.error = "Passwords don't match";
        return;
      }
      console.log("User data: ", this.formData);
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
