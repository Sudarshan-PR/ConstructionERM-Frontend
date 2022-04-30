<template>
  <div class="main-content bg-default">
    <!-- Navbar -->
    <base-nav
      class="navbar-top navbar-horizontal navbar-dark"
      container-classes="px-4 container"
      expand
    >
      <template #default="{ closeMenu }">
        <!-- Collapse header -->
        <div class="navbar-collapse-header d-md-none">
          <div class="row">
            <div class="col-6 collapse-brand">
              <router-link to="/">
                <img src="img/brand/green.png" />
              </router-link>
            </div>
            <div class="col-6 collapse-close">
              <button
                type="button"
                class="navbar-toggler"
                aria-label="Toggle sidenav"
                @click="closeMenu"
              >
                <span></span>
                <span></span>
              </button>
            </div>
          </div>
        </div>
      </template>
    </base-nav>
    <!-- Header -->
    <div class="header bg-gradient-success py-7 py-lg-8">
      <div class="container">
        <div class="header-body text-center mb-7">
          <div class="row justify-content-center">
            <div class="col-lg-5 col-md-6">
              <h1 class="text-white">Welcome!</h1>
            </div>
          </div>
        </div>
      </div>
      <div class="separator separator-bottom separator-skew zindex-100">
        <svg
          x="0"
          y="0"
          viewBox="0 0 2560 100"
          preserveAspectRatio="none"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon
            class="fill-default"
            points="2560 0 2560 100 0 100"
          ></polygon>
        </svg>
      </div>
    </div>
    <!-- Page content -->
    <div class="container mt--8 pb-5">
      <router-view></router-view>
    </div>
    <footer class="py-5"></footer>
  </div>
</template>
<script>
export default {
  name: "AuthLayout",
  data() {
    return {
      year: new Date().getFullYear(),
      showMenu: false,
    };
  },
};
</script>
<style></style>
