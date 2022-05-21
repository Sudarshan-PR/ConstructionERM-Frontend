<template>
  <modal :show="showModal" style="overflow: auto">
    <template #header>
      <h5 id="exampleModalLabel" class="modal-title">Add Expense Head</h5>
    </template>
    <div class="container">
      <base-input
        v-model="head"
        label="Head Name"
        placeholder="Head Name"
      ></base-input>
    </div>
    <div class="container">
      <div v-if="success">{{ success }}</div>
      <div v-if="error">{{ error }}</div>
    </div>

    <template #footer>
      <base-button type="secondary" @click="$emit('close')">
        Close
      </base-button>
      <div @click.stop="createHead()">
        <base-button type="primary"> Create Head </base-button>
      </div>
    </template>
  </modal>
</template>

<script>
import Modal from "../../components/Modal";
import { authHeader, URL } from "../../helpers/auth";

export default {
  name: "CreateExpenseHeadModal",
  components: {
    Modal,
  },
  props: ["showModal"],
  data() {
    return {
      head: null,
      success: null,
      error: null,
    };
  },
  methods: {
    createHead() {
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
