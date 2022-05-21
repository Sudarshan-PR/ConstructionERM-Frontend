<template>
  <modal :show="showModal" style="overflow: auto">
    <template #header>
      <h5 id="exampleModalLabel" class="modal-title">Add Beneficiary</h5>
    </template>
    <div class="container">
      <base-input
        v-model="name"
        label="Vendor Name"
        placeholder="Vendor Name"
      ></base-input>
      <base-input
        v-model="code"
        label="Vendor Code"
        placeholder="Vendor Code"
      ></base-input>
    </div>
    <template #footer>
      <base-button type="secondary" @click="$emit('close')">
        Close
      </base-button>
      <div @click="submit()">
        <base-button type="primary">Save changes</base-button>
      </div>
    </template>
  </modal>
</template>

<script>
import Modal from "../../components/Modal.vue";
import { authHeader } from "../../helpers/auth";

export default {
  name: "CreateBeneficiaryModal",
  components: { Modal },
  props: ["showModal"],
  data() {
    return {
      beneficiarydata: [],
      name: null,
      code: null,
    };
  },
  methods: {
    submit() {
      const data = {
        head: this.head,
      };
      fetch(`${URL}/expense-heads`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          ...authHeader(),
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Data expense head post: ", data);
          this.expenseheadlist = data;
          this.error = null;
          this.success = this.head + " : Head Created";
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
