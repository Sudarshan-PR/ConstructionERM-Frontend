<template>
  <modal :show="showModal">
    <template #header>
      <h5 id="exampleModalLabel" class="modal-title">Add Expense Head</h5>
    </template>
    <div class="container">
      <base-input label="Head Name" placeholder="Head Name"></base-input>
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
import Modal from "../../components/Modal";

export default {
  name: "CreateExpenseHeadModal",
  components: {
    Modal,
  },
  props: ["showModal"],
  data() {
    return {};
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
