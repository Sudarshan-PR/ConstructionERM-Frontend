<template>
  <modal :show="showModal">
    <template #header>
      <h5 id="exampleModalLabel" class="modal-title">Add Expense Head</h5>
    </template>
    <div class="container">
      <base-input label="Project Name" placeholder="Project Name"></base-input>
      <base-input label="Budget" placeholder="Budget (in Rupees)"></base-input>
      <base-input label="Size" placeholder="size in sq. ft"></base-input>
      <base-input label="Location" placeholder="Location"></base-input>

      <div>
        <label for="dateest"><h4>Estimated End Date</h4></label>
        <datepicker
          id="dateest"
          v-model="date"
          class="form-control"
          label="ahah"
        />
      </div>
      <div class="pt-4">
        <label for="desc"><h4>Description</h4></label>
        <textarea
          id="desc"
          placeholder="Describe your project"
          class="form-control"
          rows="6"
        ></textarea>
      </div>
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
import Datepicker from "vue3-datepicker";

import Modal from "../../components/Modal";

export default {
  name: "CreateExpenseHeadModal",
  components: {
    Modal,
    Datepicker,
  },
  props: ["showModal"],
  data() {
    return {
      createProjectModal: false,
      date: new Date(),
      projects: [],
    };
  },
  mounted() {
    fetch("http://localhost:8000/project/")
      .then((response) => response.json())
      .then((data) => {
        console.log("Data fetch: ", data);
        this.projects = data;
      });

    console.log("Fetched: ", this.projects);
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
