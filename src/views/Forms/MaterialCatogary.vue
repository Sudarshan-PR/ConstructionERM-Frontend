<template>
  <Modal :show="showModal" style="overflow: auto">
    <template #header>
      <h5 id="exampleModalLabel" class="modal-title">Material Catogary</h5>
    </template>
    <div class="container">
      <base-input
        v-model="formdata.name"
        label="Name"
        placeholder="Name"
      ></base-input>
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
import BaseInput from "../../components/BaseInput.vue";
import { authHeader, URL } from "../../helpers/auth";

export default {
  name: "CreateExpenseModal",
  components: {
    Modal,
    BaseInput,
  },
  props: ["showModal"],
  data() {
    return {
      createProjectModal: false,
      formdata: {
        name: null,
      },
      success: false,
      error: false,
    };
  },
  mounted() {
    console.log("Modal prop: ", this.showModal);
    console.log("MOUNTED MODAL");
  },
  methods: {
    submit() {
      fetch(`${URL}/material/catogary`, {
        method: "POST",
        body: JSON.stringify(this.formdata),
        headers: {
          ...authHeader(),
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          console.log("Resp reject", response);
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
