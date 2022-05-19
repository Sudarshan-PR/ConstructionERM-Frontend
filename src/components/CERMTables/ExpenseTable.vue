<template>
  <div class="card shadow" :class="type === 'dark' ? 'bg-default' : ''">
    <update-expense-modal
      :show-modal="updateExpenseModal.show"
      :expense-id="updateExpenseModal.id"
      @close="updateExpenseModal.show = false"
      @click.self="updateExpenseModal.show = false"
    ></update-expense-modal>
    <div
      class="card-header border-0"
      :class="type === 'dark' ? 'bg-transparent' : ''"
    >
      <div class="row align-items-center">
        <div class="col">
          <h3 class="mb-0" :class="type === 'dark' ? 'text-white' : ''">
            Expenses
          </h3>
        </div>
        <div class="col text-right">
          <base-button type="primary" size="sm">See all</base-button>
        </div>
      </div>
    </div>

    <div class="table-responsive">
      <base-table
        v-if="tableData"
        class="table align-items-center table-flush"
        :class="type === 'dark' ? 'table-dark' : ''"
        :thead-classes="type === 'dark' ? 'thead-dark' : 'thead-light'"
        tbody-classes="list"
        :data="tableData"
      >
        <template #columns>
          <th>Title</th>
          <th>User</th>
          <th>Amount</th>
          <th>Vendor Name</th>
          <th>Date</th>
          <th>Expense Head</th>
          <th>Outstanding Amount</th>
          <!-- <th></th> -->
        </template>

        <template #default="row">
          <th scope="row" @click="showUpdateExpenseModal(row.item.id)">
            <div
              class="media align-items-center"
              :class="{ 'text-danger': !row.item.image }"
              role="button"
            >
              <!-- <a href="#" class="avatar rounded-circle mr-3">
                <img alt="Image placeholder" :src="row.item.img" />
              </a> -->
              <div class="media-body">
                <span class="name mb-0 text-sm">{{ row.item.title }}</span>
              </div>
            </div>
          </th>
          <td class="username">{{ row.item.user_name.toUpperCase() }}</td>
          <td class="Total Amount">₹ {{ row.item.total_amount }}</td>
          <td class="vendor">{{ row.item.vendor }}</td>
          <td>
            <span class="date">{{
              `${new Date(row.item.date).getUTCDate()} - ${new Date(
                row.item.date
              ).getMonth()} - ${new Date(row.item.date).getFullYear()}`
            }}</span>
          </td>
          <td class="head">{{ row.item.head }}</td>
          <td>
            <badge
              class="badge-dot mr-4"
              :type="
                statusType[
                  row.item.total_amount - row.item.total_paid > 0
                    ? 'Paid'
                    : 'Outstanding'
                ]
              "
            >
              <i
                :class="`bg-${
                  statusType[
                    row.item.total_amount - row.item.total_paid > 0
                      ? 'Outstanding'
                      : 'Paid'
                  ]
                }`"
              ></i>
              <span
                :class="`text-${
                  statusType[
                    row.item.total_amount - row.item.total_paid > 0
                      ? 'Outstanding'
                      : 'Paid'
                  ]
                }`"
                >{{
                  row.item.total_amount - row.item.total_paid > 0
                    ? row.item.total_amount - row.item.total_paid
                    : "Paid"
                }}
              </span>
            </badge>
          </td>

          <!-- <td class="text-right">
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
          </td> -->
        </template>
      </base-table>
    </div>
  </div>
  <!-- <div
      class="card-footer d-flex justify-content-end"
      :class="type === 'dark' ? 'bg-transparent' : ''"
    >
      <base-pagination total="30"></base-pagination>
    </div> -->
</template>
<script>
import { authHeader, getCurrentUser, URL } from "../../helpers/auth";
import UpdateExpenseModal from "../../views/Forms/UpdateExpense";

export default {
  name: "ExpenseTable",
  components: {
    UpdateExpenseModal,
  },
  props: ["type"],
  data() {
    return {
      updateExpenseModal: {
        show: false,
        id: null,
      },
      tableData: null,
      statusType: {
        Paid: "success",
        Outstanding: "danger",
      },
    };
  },
  mounted() {
    this.getExpenses();
  },
  methods: {
    showUpdateExpenseModal(id) {
      this.updateExpenseModal.id = id;
      this.updateExpenseModal.show = true;
    },
    getExpenses() {
      this.user = getCurrentUser();
      fetch(`${URL}/expenses/`, {
        method: "GET",
        headers: { ...authHeader() },
      })
        .then((response) => {
          console.log(response.status);
          console.log(response.data);
          const data = response.json();

          console.log("Data expense json: ", data);
          return data;
        })
        .then((data) => {
          console.log("Data fetch Expense: ", data);
          this.tableData = data;
        });
    },
  },
};
</script>
<style></style>
