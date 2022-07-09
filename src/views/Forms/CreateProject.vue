<template>
  <modal :show="show">
    <template #header>
      <h5 id="exampleModalLabel" class="modal-title">Create Project</h5>
    </template>
    <div class="container">
      <base-input
        v-model="projectModal.name"
        label="Project Name"
        placeholder="Project Name"
      ></base-input>
      <base-input
        v-model.number="projectModal.budget"
        type="number"
        label="Budget"
        placeholder="Budget (in Rupees)"
      ></base-input>
      <base-input
        v-model.number="projectModal.size"
        type="number"
        label="Size"
        placeholder="size in sq. ft"
      ></base-input>
      <base-input
        v-model="projectModal.location"
        label="Location"
        placeholder="Location"
      ></base-input>

      <div>
        <label for="dateest"><h4>Estimated End Date</h4></label>
        <datepicker
          id="dateest"
          v-model="projectModal.estimated_finish_date"
          class="form-control"
          label="ahah"
        />
      </div>
      <div class="pt-4">
        <label for="desc"><h4>Description</h4></label>
        <textarea
          id="desc"
          v-model="projectModal.description"
          placeholder="Describe your project"
          class="form-control"
          rows="6"
        ></textarea>
      </div>
    </div>
    <div v-if="respMsg.msg" class="container">
      <span class="text-success" :class="{ 'text-danger': !respMsg.success }">{{
        JSON.stringify(respMsg.msg)
      }}</span>
    </div>
    <template #footer>
      <base-button type="secondary" @click="$emit('close')">
        Close
      </base-button>
      <div @click="submit()">
        <base-button type="primary">Create Project</base-button>
      </div>
    </template>
  </modal>
</template>
<script>
import Datepicker from "vue3-datepicker";
import { URL, authHeader } from "../../helpers/auth";

export default {
  name: "CreateProjectForm",
  components: {
    Datepicker,
  },
  props: ["show"],
  data() {
    return {
      projectModal: {
        name: null,
        budget: null,
        location: null,
        size: null,
        estimated_finish_date: new Date(),
        status: "in-progress",
        description: null,
      },
      respMsg: {
        msg: null,
        success: true,
      }
    };
  },
  methods: {
    submit() {
      console.log("Body: ", this.projectModal)
      fetch(`${URL}/project/`, {
        method: "POST",
        body: JSON.stringify(this.projectModal),
        headers: {
          "content-type": "application/json",
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
          this.respMsg.msg = "Project Sucessfully created";
          this.respMsg.success = true;
          this.$emit("expenseUpdate");
        })
        .catch((err) => {
          console.log("Error at proect creation: ", err);
          this.respMsg.success = false;
          this.respMsg.msg = err;
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
