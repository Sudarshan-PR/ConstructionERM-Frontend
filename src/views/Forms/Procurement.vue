<template>
  <Modal :show="showModal" style="overflow: auto">
    <template #header>
      <h5 id="exampleModalLabel" class="modal-title">Material Procured</h5>
    </template>
    <div class="container">
      <base-input
        v-model="formdata.title"
        label="Title"
        placeholder="Title"
      ></base-input>
      <base-input
        v-if="projects.length > 0"
        v-model="formdata.project"
        label="Project"
      >
        <select v-model="formdata.project" class="form-control">
          <option v-for="v in projects" :key="v.id" :value="v.id">
            {{ v.name }}
          </option>
        </select>
      </base-input>
      <base-input
        v-if="catogaryList.length > 0"
        v-model="formdata.catogary"
        label="Catogary"
      >
        <select v-model="formdata.catogary" class="form-control">
          <option v-for="v in catogaryList" :key="v.id" :value="v.id">
            {{ v.name }}
          </option>
        </select>
      </base-input>
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
      <base-input
        v-model.number="formdata.total_amount"
        label="Amount"
        placeholder="Amount (in Rupees)"
      ></base-input>
      <base-input
        v-model.number="formdata.quantity"
        label="Quantity"
        placeholder="in KG"
      ></base-input>
      <base-radio
        value="nwb"
        class="mb-3"
        inline
        name="typeRadio"
        checked
        @input="(e) => (formdata.type = 'nwb')"
      >
        Not Weigh Bridge
      </base-radio>
      <base-radio
        value="wb"
        name="typeRadio"
        class="mb-3"
        inline
        @input="(e) => (formdata.type = 'wb')"
      >
        Weigh Bridge
      </base-radio>
      <base-input
        v-if="formdata.type === 'wb'"
        v-model.number="formdata.gross_weight"
        label="Gross Weight"
        placeholder="in KG"
      ></base-input>
      <base-input
        v-if="formdata.type === 'wb'"
        v-model.number="formdata.net_weight"
        label="Net Weight"
        placeholder="in KG"
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
        <base-button type="primary">Submit</base-button>
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
        type: "nwb",
        title: null,
        head: null,
        catogary: "",
        net_weight: 0,
        gross_weight: 0,
        image: null,
        project: null,
        total_amount: null,
        total_paid: null,
        vendor: null,
        disc: "",
      },
      projects: [],
      expenseheadlist: [],
      vendorsList: [],
      catogaryList: [],
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

    fetch(`${URL}/material/catogary`, {
      method: "GET",
      headers: { ...authHeader() },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data expense head fetch: ", data);
        this.catogaryList = data;
      });
    console.log("Fetched: ", this.catogaryList);
  },
  methods: {
    submit() {
      const data = new FormData();
      const formdata = { ...this.formdata };

      console.log(formdata);
      if (!formdata.image) {
        delete formdata.image;
      }

      Object.entries(formdata).forEach(([key, value]) => {
        data.append(key, value);
      });

      fetch(`${URL}/material/procured`, {
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
          this.success = "Created";
          this.$emit("expenseUpdate");
          this.$emit("close");
        })
        .catch((err) => {
          this.success = null;
          this.error = JSON.stringify(err);
          console.log("Error: ", err);
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
