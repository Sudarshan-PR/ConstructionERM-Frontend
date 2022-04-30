<template>
  <div class="card shadow" :class="type === 'dark' ? 'bg-default' : ''">
    <div
      class="card-header border-0"
      :class="type === 'dark' ? 'bg-transparent' : ''"
    >
      <div class="row align-items-center">
        <div class="col">
          <h3 class="mb-0" :class="type === 'dark' ? 'text-white' : ''">
            {{ title }}
          </h3>
        </div>
        <div class="col text-right">
          <base-button type="primary" size="sm">See all</base-button>
        </div>
      </div>
    </div>

    <div class="table-responsive">
      <base-table
        class="table align-items-center table-flush"
        :class="type === 'dark' ? 'table-dark' : ''"
        :thead-classes="type === 'dark' ? 'thead-dark' : 'thead-light'"
        tbody-classes="list"
        :data="tableData"
      >
        <template #columns>
          <th>Project</th>
          <th>Budget</th>
          <th>Status</th>
          <th>Location</th>
          <th>Completion</th>
          <th></th>
        </template>

        <template #default="row">
          <th scope="row">
            <div class="media align-items-center">
              <!-- <a href="#" class="avatar rounded-circle mr-3">
                <img alt="Image placeholder" :src="row.item.img" />
              </a> -->
              <div class="media-body">
                <span class="name mb-0 text-sm">{{ row.item.name }}</span>
              </div>
            </div>
          </th>
          <td class="budget">₹ {{ row.item.budget }}</td>
          <td>
            <badge class="badge-dot mr-4" :type="statusType[row.item.status]">
              <i :class="`bg-${statusType[row.item.status]}`"></i>
              <span class="status">{{ row.item.status }}</span>
            </badge>
          </td>
          <td>
            <span class="status">{{ row.item.location }}</span>
          </td>

          <td>
            <div class="d-flex align-items-center">
              <span class="completion mr-2">{{ 60 }}%</span>
              <div>
                <base-progress
                  :type="statusType[row.item.status]"
                  :show-percentage="false"
                  class="pt-0"
                  :value="60"
                />
              </div>
            </div>
          </td>

          <td class="text-right">
            <base-dropdown class="dropdown" position="right">
              <template #title>
                <a
                  class="btn btn-sm btn-icon-only text-light"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i class="fas fa-ellipsis-v"></i>
                </a>
              </template>

              <template>
                <a class="dropdown-item" href="#">Action</a>
                <a class="dropdown-item" href="#">Another action</a>
                <a class="dropdown-item" href="#">Something else here</a>
              </template>
            </base-dropdown>
          </td>
        </template>
      </base-table>
    </div>

    <div
      class="card-footer d-flex justify-content-end"
      :class="type === 'dark' ? 'bg-transparent' : ''"
    >
      <base-pagination total="30"></base-pagination>
    </div>
  </div>
</template>
<script>
export default {
  name: "ProjectsTable",
  props: ["type", "title", "data"],
  data() {
    return {
      tableData: [
        {
          img: "img/theme/bootstrap.jpg",
          title: "Argon Design System",
          budget: "$2500 USD",
          status: "pending",
          statusType: "warning",
          completion: 60,
        },
        {
          img: "img/theme/angular.jpg",
          title: "Angular Now UI Kit PRO",
          budget: "$1800 USD",
          status: "completed",
          statusType: "success",
          completion: 100,
        },
        {
          img: "img/theme/sketch.jpg",
          title: "Black Dashboard",
          budget: "$3150 USD",
          status: "delayed",
          statusType: "danger",
          completion: 72,
        },
        {
          img: "img/theme/react.jpg",
          title: "React Material Dashboard",
          budget: "$4400 USD",
          status: "on schedule",
          statusType: "info",
          completion: 90,
        },
        {
          img: "img/theme/vue.jpg",
          title: "Vue Paper UI Kit PRO",
          budget: "$2200 USD",
          status: "completed",
          statusType: "success",
          completion: 100,
        },
      ],
      statusType: {
        "in-progress": "info",
        completed: "success",
        delayed: "danger",
      },
    };
  },
  mounted() {
    if (this.data) {
      this.tableData = this.data;
    }
  },
};
</script>
<style></style>
