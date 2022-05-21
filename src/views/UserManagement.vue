<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
      <div>
        <base-button
          class="my-1"
          type="default"
          icon="fa fa-plus"
          @click="showCreateUserModal = true"
        >
          Create User
        </base-button>
        <base-button
          class="my-1"
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
    <div v-if="all_users" class="container-fluid mt--7">
      <div class="row">
        <div v-for="user in all_users" :key="user.id">
          <div class="col my-3">
            <router-link to="/profile">
              <div class="card" style="width: 18rem">
                <img
                  class="card-img-top"
                  src="../../public/img/avatar_admin.png"
                  alt="Card image cap"
                />
                <div class="card-body">
                  <h5 class="card-title">{{ user.name.toUpperCase() }}</h5>
                  <div
                    v-for="att in attendance[user.id]"
                    :key="att.id"
                    class="card-text"
                  >
                    <div class="bg-info my-0.5 p-1">
                      <b>Marked At:</b> {{ getTime(att.date) }} <br />
                      <b>Loc</b>: {{ att.loc }}
                    </div>
                  </div>
                  <div
                    v-if="!attendance[user.id]"
                    class="card-text text-danger"
                  >
                    No attendance marked today
                  </div>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CreateUserModal from "./Forms/CreateUser";
import UpdateAttendanceModal from "./Forms/Attendance";

import { authHeader, getCurrentUser, URL } from "../helpers/auth";

export default {
  name: "Users",
  components: {
    CreateUserModal,
    UpdateAttendanceModal,
  },
  data() {
    return {
      all_users: null,
      attendance: [],
      showCreateUserModal: false,
      showAttendanceModal: false,
      projects: [],
    };
  },
  mounted() {
    this.user = getCurrentUser();
    this.getAllUsers();
  },
  methods: {
    getTime(val) {
      const date = new Date(val);
      let hours = date.getHours();
      hours = hours > 12 ? hours - 12 : hours;
      const mins = date.getMinutes();
      const period = hours >= 12 ? "PM" : "AM";
      return `${hours}:${mins} ${period}`;
    },
    getAttendance(id) {
      this.result = [];
      fetch(`${URL}/attendance/${id}`, {
        method: "GET",
        headers: {
          ...authHeader(),
        },
      })
        .then((response) => response.json())
        .then((data) => {
          this.attendance[id] = data;
          console.log("Got attendance: ", this.attendance.id);
        })
        .catch((err) => {
          this.success = null;
          this.error = err;
        });

      console.log("Attendance res", this.result);
      return this.result;
    },
    getAllUsers() {
      fetch(`${URL}/user?all=true`, {
        method: "GET",
        headers: {
          ...authHeader(),
        },
      })
        .then((response) => response.json())
        .then((data) => {
          this.all_users = data;
          data.map((user) => this.getAttendance(user.id));
          console.log("Got all users: ", this.all_users);
          console.log("Got all users attendance: ", this.attendance);
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
