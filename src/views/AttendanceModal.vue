<template>
  <modal :show="showModal">
    <template #header>
      <h5 id="exampleModalLabel" class="modal-title">Attendance</h5>
    </template>
    <div v-if="attdata.length > 0" class="container">
      <div v-for="att in attdata" :key="att.id">
        <div v-if="!att.image" class="card text-center bg-danger py-4 mb-3">
          <span class="text-secondary">No image</span>
        </div>
        <div v-else class="card py-4 mb-3">
          <img
            :src="att.image"
            class="card-img-top"
            height="300"
            alt="Expense Image cannot be Loaded"
          />
          <div class="card-body">
            <h2 class="card-title">{{ getDateTime(att.date) }}</h2>
            <p class="card-text">
              Lat: {{ att.loc.lat }} <br />
              Lon: {{ att.loc.lon }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <template #footer>
      <base-button type="secondary" @click="$emit('close')">
        Close
      </base-button>
    </template>
  </modal>
</template>

<script>
// import { authHeader, URL } from "../helpers/auth";

import { authHeader, URL } from "../helpers/auth";

export default {
  name: "CreateUserModal",
  props: ["showModal", "user"],
  data() {
    return {
      error: null,
      attdata: [],
      formData: {
        project: null,
        current_paid: null,
      },
    };
  },
  mounted() {
    console.log("Attendance details mounted : ", this.attdata);
    if (this.user) {
      this.getAttendance();
    }
  },
  methods: {
    getAttendance() {
      fetch(`${URL}/attendance/${this.user}?item=all`, {
        method: "GET",
        headers: { ...authHeader(), "Content-Type": "multipart/form-data" },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Data fetch at att details modal: ", data);
          this.attdata = data;
        });
    },
    getDateTime(val) {
      const date = new Date(val);
      const day = date.getUTCDate();
      const month = date.getMonth();
      const year = date.getFullYear();
      let hours = date.getHours();
      hours = hours > 12 ? hours - 12 : hours;
      const mins = date.getMinutes();
      const period = hours >= 12 ? "PM" : "AM";
      return `${day}-${month}-${year} ${hours}:${mins} ${period}`;
    },
  },
};
</script>

<style></style>
