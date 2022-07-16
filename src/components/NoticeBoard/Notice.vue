<template>
  <div>
    <div class="card" style="width: 100%">
      <div v-if="image">
        <img
          class="card-img-top"
          style="max-height: 25rem"
          :src="image"
          alt="Notice image"
        />
      </div>
      <div class="card-body">
        <h3 class="card-title">
          {{ username.charAt(0).toUpperCase() + username.slice(1) }}
        </h3>
        <p class="card-text">
          {{ message }}
        </p>
      </div>
      <div class="card-footer">{{ getDateTime(date) }}</div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["username", "message", "date", "image"],
  methods: {
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
