<template>
  <modal :show="showModal">
    <template #header>
      <h5 id="exampleModalLabel" class="modal-title">Create User</h5>
    </template>
    <div class="container">
      <base-input label="Name" placeholder="Name" required></base-input>
      <base-input label="Role">
        <select class="form-control">
          <option v-for="role in roles" :key="role.id">
            {{ role.name }}
          </option>
        </select>
      </base-input>
    </div>
    <template #footer>
      <base-button type="secondary" @click="$emit('close')">
        Close
      </base-button>
      <base-button type="primary">Save changes</base-button>
    </template>
  </modal>
</template>

<script>
export default {
  name: "CreateUserModal",
  props: ["showModal"],
  data() {
    return {
      roles: [
        { id: 1, name: "Admin" },
        { id: 2, name: "Supervisor" },
        { id: 3, name: "Employee" },
      ],
    };
  },
};
</script>

<style></style>
