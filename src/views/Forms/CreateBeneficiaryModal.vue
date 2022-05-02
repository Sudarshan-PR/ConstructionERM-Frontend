<template>
  <modal :show="showModal">
    <template #header>
      <h5 id="exampleModalLabel" class="modal-title">Add Beneficiary</h5>
    </template>
    <div class="container">
      <base-input label="Vendor Name" placeholder="Vendor Name"></base-input>
      <base-input label="Vendor Code" placeholder="Vendor Code"></base-input>
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
import Modal from "../../components/Modal.vue";
export default {
  name: "CreateBeneficiaryModal",
  props: ["showModal"],
  components: { Modal },
  data() {
    return {
      beneficiarydata: [],
    };
  },
};
</script>

<style></style>
