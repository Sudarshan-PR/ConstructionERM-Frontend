<template>
  <div class="row justify-content-center">
    <div class="col-lg-5 col-md-7">
      <div class="card bg-secondary shadow border-0">
        <div
          class="card-header bg-transparent text-center text-secondary align-middle"
        >
          <img
            class="w-75"
            src="../assets/High_Seas_Resized.svg"
            alt="High Seas Logo"
          />
        </div>
        <div class="card- body px-lg-5 py-lg-5">
          <form role="form">
            <base-input
              v-model="model.email"
              form-classes="input-group-alternative mb-3"
              placeholder="Email"
              addon-left-icon="ni ni-email-83"
            >
            </base-input>

            <base-input
              v-model="model.password"
              form-classes="input-group-alternative mb-3"
              placeholder="Password"
              type="password"
              addon-left-icon="ni ni-lock-circle-open"
            >
            </base-input>

            <base-checkbox class="custom-control-alternative">
              <span class="text-muted">Remember me</span>
            </base-checkbox>
            <div class="text-center">
              <base-button type="primary" class="my-4">Sign in</base-button>
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
export default {
  name: "Login",
  data() {
    return {
      model: {
        email: "",
        password: "",
      },
    };
  },
};
</script>
<style></style>
