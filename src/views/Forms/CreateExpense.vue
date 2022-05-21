<template>
  <Modal :show="showModal">
    <template #header>
      <h5 id="exampleModalLabel" class="modal-title">Add Expense</h5>
    </template>
    <div class="container">
      <base-input
        v-model="formdata.title"
        label="Title"
        placeholder="Title"
      ></base-input>
      <base-input
        v-if="vendorsList.length > 0"
        v-model="formdata.vendor"
        label="Vendor"
      >
        <select v-model="formdata.vendor" class="form-control">
          <option v-for="v in vendorsList" :key="v.id" :value="v.id">
            {{ v.name }}
          </option>
        </select>
      </base-input>
      <base-input v-if="expenseheadlist.length > 0" label="Expense Type">
        <select v-model="formdata.head" class="form-control">
          <option
            v-for="expensehead in expenseheadlist"
            :key="expensehead.id"
            :value="expensehead.head"
          >
            {{ expensehead.head }}
          </option>
        </select>
      </base-input>
      <base-input
        v-model="formdata.total_amount"
        label="Amount"
        placeholder="Amount (in Rupees)"
      ></base-input>
      <base-radio
        value="full-paid"
        class="mb-3"
        inline
        checked
        name="payRadio"
        @input="(e) => (formdata.paymentRadio = 'full-paid')"
      >
        Fully Paid
      </base-radio>
      <base-radio
        value="partially-paid"
        name="payRadio"
        class="mb-3"
        inline
        @input="(e) => (formdata.paymentRadio = 'partially-paid')"
      >
        Partially Paid
      </base-radio>
      <base-input
        v-if="formdata.paymentRadio === 'partially-paid'"
        v-model="formdata.total_paid"
        label="Partially Paid Amount"
        placeholder="Amount (in Rupees)"
      ></base-input>
      <base-input label="Description">
        <textarea
          id="desc"
          v-model="formdata.disc"
          placeholder="Describe your project"
          class="form-control"
          rows="6"
        ></textarea>
      </base-input>
      <base-input label="Image">
        <input
          type="file"
          class="form-control-file"
          @change="handleFileUpload($event)"
        />
      </base-input>
    </div>
    <div class="container">
      <div v-if="success" class="text-success">{{ success }}</div>
      <div v-if="error" class="text-danger">{{ error }}</div>
    </div>

    <template #footer>
      <base-button type="secondary" @click="$emit('close')">
        Close
      </base-button>
      <div @click="submit()">
        <base-button type="primary">Add Expense</base-button>
      </div>
    </template>
  </Modal>
</template>

<script>
import Modal from "../../components/Modal";
import BaseRadio from "../../components/BaseRadio.vue";
import BaseInput from "../../components/BaseInput.vue";
import { authHeader, URL } from "../../helpers/auth";

export default {
  name: "CreateExpenseModal",
  components: {
    Modal,
    BaseRadio,
    BaseInput,
  },
  props: ["showModal"],
  data() {
    return {
      createProjectModal: false,
      formdata: {
        paymentRadio: "partially-paid",
        title: null,
        head: null,
        vendor: "",
        image: null,
        total_amount: null,
        total_paid: null,
        disc: "",
      },
      projects: [],
      expenseheadlist: [],
      vendorsList: [],
      error: null,
      success: null,

      paymentRadio: "partially-paid",
      head: null,
      vendor: "",
      image: null,
      location: null,
      total_amount: null,
      amount_paid: null,
    };
  },
  mounted() {
    console.log("Modal prop: ", this.showModal);
    console.log("MOUNTED MODAL");
    fetch(`${URL}/project/`, {
      method: "GET",
      headers: { ...authHeader(), "Content-Type": "multipart/form-data" },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data fetch at modal: ", data);
        this.projects = data;
      });

    fetch(`${URL}/expense-heads`, {
      method: "GET",
      headers: { ...authHeader() },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data expense head fetch: ", data);
        this.expenseheadlist = data;
      });

    fetch(`${URL}/vendors/`, {
      method: "GET",
      headers: { ...authHeader() },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data expense head fetch: ", data);
        this.vendorsList = data;
      });
    console.log("Fetched: ", this.projects);
  },
  methods: {
    submit() {
      const data = new FormData();
      const formdata = { ...this.formdata };

      if (formdata.paymentRadio === "full-paid") {
        formdata.fully_paid = true;
        formdata.total_paid = formdata.total_amount;
      } else {
        formdata.fully_paid = false;
      }

      console.log(formdata);
      if (!formdata.image) {
        delete formdata.image;
      }

      Object.entries(formdata).forEach(([key, value]) => {
        data.append(key, value);
      });

      fetch(`${URL}/expenses`, {
        method: "POST",
        body: data,
        headers: {
          ...authHeader(),
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(response);
        })
        .then((data) => {
          console.log("Data expense head post: ", data);
          this.error = null;
          this.success = "Expense Created.";
          this.$emit("expenseUpdate");
        })
        .catch((err) => {
          this.success = null;
          this.error = err;
        });
    },
    handleFileUpload(e) {
      this.formdata.image = e.target.files[0];
    },
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
