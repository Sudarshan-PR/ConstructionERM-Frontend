<template>
  <modal :show="showModal">
    <template #header>
      <h5 id="exampleModalLabel" class="modal-title">Add Expense</h5>
    </template>
    <div class="container">
      <base-input label="Select Project">
        <select class="form-control">
          <option v-for="project in projects" :key="project.id">
            {{ project.name }}
          </option>
        </select>
      </base-input>
      <base-input label="Expense Type">
        <select class="form-control">
          <option v-for="expensehead in expenseheadlist" :key="expensehead.id">
            {{ expensehead.name }}
          </option>
        </select>
      </base-input>
      <base-input label="Amount" placeholder="Amount (in Rupees)"></base-input>
      <base-radio
        value="full-paid"
        class="mb-3"
        inline
        checked
        name="payRadio"
        @input="(e) => (paymentRadio = 'full-paid')"
      >
        full-paid
      </base-radio>
      <base-radio
        value="half-paid"
        name="payRadio"
        class="mb-3"
        inline
        @input="(e) => (paymentRadio = 'half-paid')"
      >
        half-paid
      </base-radio>
      <base-input
        v-if="paymentRadio === 'half-paid'"
        label="Partially Paid Amount"
        placeholder="Amount (in Rupees)"
      ></base-input>
      <base-input label="Location" placeholder="Location"></base-input>

      <base-input label="Description">
        <textarea
          id="desc"
          placeholder="Describe your project"
          class="form-control"
          rows="6"
        ></textarea>
      </base-input>
      <base-input label="Image">
        <input type="file" class="form-control-file" />
      </base-input>
    </div>

    <template #footer>
      <base-button type="secondary" @click="$emit('close')">
        Close
      </base-button>
      <base-button type="primary">Add Expense</base-button>
    </template>
  </modal>
</template>

<script>
import Modal from "../../components/Modal";
import BaseRadio from "../../components/BaseRadio.vue";

export default {
  name: "CreateExpenseModal",
  components: {
    Modal,
    BaseRadio,
  },
  props: ["showModal"],
  data() {
    return {
      createProjectModal: false,
      date: new Date(),
      projects: [],
      expenseheadlist: [],
      paymentRadio: "half-paid",
    };
  },
  mounted() {
    fetch("http://localhost:8000/project/")
      .then((response) => response.json())
      .then((data) => {
        console.log("Data fetch: ", data);
        this.projects = data;
      });

    fetch("http://localhost:8000/expensehead/")
      .then((response) => response.json())
      .then((data) => {
        console.log("Data fetch: ", data);
        this.expenseheadlist = data;
      });
    console.log("Fetched: ", this.projects);
  },
  methods: {
    log(e) {
      console.log("Log: ", e);
    },
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
