<template>
  <div v-if="user" class="wrapper" ass="{ 'nav-open': $sidebar.showSidebar }">
    <side-bar
      :background-color="sidebarBackground"
      short-title="Argon"
      title="Argon"
      logo="img/brand/High_Seas.png"
    >
      <template #links>
        <sidebar-item
          v-if="['admin'].includes(user.role)"
          :link="{
            name: 'Dashboard',
            icon: 'ni ni-tv-2 text-primary',
            path: '/dashboard',
          }"
        />
        <sidebar-item
          :link="{
            name: 'Projects',
            icon: 'ni ni-collection text-primary',
            path: '/project',
          }"
        />
        <sidebar-item
          :link="{
            name: 'Expenses',
            icon: 'ni ni-money-coins text-red',
            path: '/expense',
          }"
        />
        <sidebar-item
          :link="{
            name: 'Expense Logs',
            icon: 'ni ni-time-alarm text-warning',
            path: '/expense-logs',
          }"
        />
        <sidebar-item
          v-if="['admin'].includes(user.role)"
          :link="{
            name: 'User Management',
            icon: 'ni ni-single-02',
            path: '/users',
          }"
        />
        <!-- <sidebar-item
          :link="{
            name: 'Icons',
            icon: 'ni ni-planet text-blue',
            path: '/icons',
          }"
        />
        <sidebar-item
          :link="{
            name: 'Maps',
            icon: 'ni ni-pin-3 text-orange',
            path: '/maps',
          }"
        />
        <sidebar-item
          :link="{
            name: 'User Profile',
            icon: 'ni ni-single-02 text-yellow',
            path: '/profile',
          }"
        />
        <sidebar-item
          :link="{
            name: 'Tables',
            icon: 'ni ni-bullet-list-67 text-red',
            path: '/tables',
          }"
        />
        <sidebar-item
          :link="{
            name: 'Login',
            icon: 'ni ni-key-25 text-info',
            path: '/login',
          }"
        />
        <sidebar-item
          :link="{
            name: 'Register',
            icon: 'ni ni-circle-08 text-pink',
            path: '/register',
          }"
        /> -->
      </template>
    </side-bar>
    <div class="main-content" :data="sidebarBackground">
      <!-- Dashboard -->
      <dashboard-navbar></dashboard-navbar>

      <div @click="toggleSidebar">
        <!-- your content here -->
        <router-view></router-view>
        <!-- <content-footer v-if="!$route.meta.hideFooter"></content-footer> -->
        <footer class="py-4"></footer>
      </div>
    </div>
  </div>
</template>
<script>
import DashboardNavbar from "./DashboardNavbar.vue";
// import ContentFooter from "./ContentFooter.vue";
import { getCurrentUser } from "../helpers/auth";

export default {
  components: {
    DashboardNavbar,
    // ContentFooter,
  },
  data() {
    return {
      sidebarBackground: "vue", //vue|blue|orange|green|red|primary
      user: null,
    };
  },
  mounted() {
    this.user = getCurrentUser();
    console.log("User: ", this.user);
    if (this.user === null) {
      window.location.href = "/login";
    }
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },
  },
};
</script>
<style lang="scss"></style>
