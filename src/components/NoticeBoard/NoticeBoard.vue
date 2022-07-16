<template>
  <div class="card">
    <div class="card-header">Notice Board</div>
    <div class="card-body notice-board">
      <div v-for="notice in notices" :key="notice.id">
        <Notice
          class="mb-4"
          :message="notice.msg"
          :username="notice.username"
          :date="notice.date"
          :image="notice.image"
        ></Notice>
      </div>
    </div>
    <div class="card-footer">
      <div class="container-fluid w-100 mx-0">
        <div class="row flex m-0">
          <div class="col-9 m-0">
            <base-input v-model="formdata.msg"></base-input>
          </div>

          <div class="col-2">
            <base-input class="w-100">
              <input
                id="notice_attach"
                type="file"
                class="form-control-file notice-board-file"
                @change="handleFileUpload($event)"
              />
            </base-input>
          </div>
          <div class="col-1" @click="submit()">
            <base-button type="primary">Send</base-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { authHeader, URL } from "../../helpers/auth";
import Notice from "./Notice.vue";
export default {
  components: { Notice },
  data() {
    return {
      notices: [],
      formdata: {
        msg: null,
        image: null,
      },
    };
  },
  mounted() {
    fetch(`${URL}/notice-board/`, {
      method: "GET",
      headers: { ...authHeader(), "Content-Type": "multipart/form-data" },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data fetch at modal: ", data);
        this.notices = data;
      });
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

      fetch(`${URL}/notice-board`, {
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
          this.success = "Notice Uploaded";
          this.$emit("noticeBoardUpdate");
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
  },
};
</script>
<style>
.notice-board {
  height: 40rem;
  overflow: auto;
}

.notice_input {
  width: 100%;
}
</style>
