<template>
  <div class="row justify-content-center">
    <div class="col-lg-5 col-md-7">
      <div class="card bg-secondary shadow border-0">
        <div
          class="card-header bg-transparent text-center text-secondary align-middle"
        >
          <img
            class="w-75"
            src="img/brand/High_Seas.png"
            alt="High Seas Logo"
          />
        </div>
        <div class="card- body px-lg-5 py-lg-5">
          <form role="form">
            <base-input
              v-model="username"
              form-classes="input-group-alternative mb-3"
              placeholder="Username"
              addon-left-icon="ni ni-email-83"
            >
            </base-input>

            <base-input
              v-model="password"
              form-classes="input-group-alternative mb-3"
              placeholder="Password"
              type="password"
              addon-left-icon="ni ni-lock-circle-open"
            >
            </base-input>

            <div v-if="error">
              <span class="error danger">{{ error }}</span>
            </div>
            <div class="text-center" @click="login()">
              <base-button type="primary" class="my-4"> Sign in </base-button>
            </div>
          </form>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-6">
          <a href="#" class="text-light"><small>Forgot password?</small></a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { URL } from "../helpers/auth";
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      error: null,
    };
  },
  methods: {
    async login() {
      const data = new FormData();
      data.append("username", this.username);
      data.append("password", this.password);

      //const url = "http://localhost:8000/auth/";
      const url = `${URL}/auth/`;

      await fetch(url, {
        method: "POST",
        body: data,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not OK");
          }
          return response.json();
        })
        .then((data) => {
          localStorage.setItem("token", data.access_token);
          this.getUserInfo();
        })
        .catch((error) => {
          console.error("Error:", error);
          this.error = error;
        });
    },
    getUserInfo() {
      // const url = "http://localhost:8000/user";
      const url = `${URL}/user/`;
      const token = localStorage.getItem("token");
      fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => {
          if (!resp.ok) {
            throw new Error("Not able to get user data");
          }
          return resp.json();
        })
        .then((data) => {
          localStorage.setItem("user", JSON.stringify(data));
          window.location.href = "/";
        })

        .catch((error) => {
          this.error = error;
        });
    },
  },
};
</script>
<style></style>
