<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
      <div>
        <base-button
          type="default"
          icon="fa fa-plus"
          @click="showCreateUserModal = true"
        >
          Create User
        </base-button>
        <base-button
          type="default"
          icon="ni ni-compass-04"
          @click="showAttendanceModal = true"
        >
          Update Attendance
        </base-button>
      </div>
      <create-user-modal
        :show-modal="showCreateUserModal"
        @close="showCreateUserModal = false"
        @click.self="showCreateUserModal = false"
      ></create-user-modal>
      <update-attendance-modal
        :show-modal="showAttendanceModal"
        @close="showAttendanceModal = false"
        @click.self="showAttendanceModal = false"
      ></update-attendance-modal>
    </base-header>
    <div>
      <div class="container-fluid mt--7">
        <div class="row">
          <div class="col">
            <div v-if="projects.length > 0">
              <users-table title="Users" :data="projects" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CreateUserModal from "./Forms/CreateUser";
import UpdateAttendanceModal from "./Forms/Attendance";
import UsersTable from "../components/CERMTables/UsersTable";

import { getCurrentUser } from "../helpers/auth";

export default {
  name: "Users",
  components: {
    CreateUserModal,
    UsersTable,
    UpdateAttendanceModal,
  },
  data() {
    return {
      showCreateUserModal: false,
      showAttendanceModal: false,
      projects: [],
      user: null,
    };
  },
  mounted() {
    this.user = getCurrentUser();
  },
};
</script>

<style></style>
