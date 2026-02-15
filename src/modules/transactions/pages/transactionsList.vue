<template>
  <tableComp
    pageTitle="Transactions"
    :tableRows="allTransactions"
    :tableColumns="columns"
    :tablePagination="pagination"
    :showAdd="true"
    addBtnLabel="Add Transaction"
    :ShowActionsdropDown="true"
    :showFilters="true"
    :showTypeFilterInTransation="true"
    :typeOptions="transTypeOptions"
    :transactions="true"
    :searchInput="false"
    @addNew="addTransaction"
    @filterChange="onFilterChange"
    @clearFilters="clearFilters"
    @viewReport="viewReport"
    @getPagFun="getPagFun"
    @sortApi="fireSortCall"
    @callApi="fireCall"
    @DetailsEvent="viewTransactionData"
    emptyStateTitle="No transactions found"
    emptyStateDescription="Get started by adding a new transaction."
    emptyStateButtonLabel="Add Transaction"
  />

  <viewTransaction
    v-model="showViewTransaction"
    :transaction="selectedTransaction"
  />
  <AddTransaction v-model="showAddTransaction" />
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { axiosInstance } from "app/http-common";
import tableComp from "src/components/tableComponent.vue";
import viewTransaction from "../components/viewTransaction.vue";
import AddTransaction from "../components/addTransaction.vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import services from "../service/service.js";

const pagination = ref({
  page: 1,
  rowsPerPage: 20,
  rowsNumber: 100,
});
const $q = useQuasar();
const router = useRouter();
const filters = ref({});

const allTransactions = ref([]);
const getAllTransactions = (page = 1) => {
  $q.loading.show();

  let query = `?page=${page}`;
  if (filters.value.jtype) query += `&jtype=${filters.value.jtype}`;
  if (filters.value.fromNo) query += `&paper_no__gte=${filters.value.fromNo}`;
  if (filters.value.toNo) query += `&paper_no__lte=${filters.value.toNo}`;

  axiosInstance
    .get(`/api/v1/finance/transactions/${query}`)
    .then((res) => {
      allTransactions.value = res.data.results;

      // Update pagination with API response
      pagination.value.rowsNumber = res.data.count || 0;
      pagination.value.page = page;
      $q.loading.hide();
    })
    .catch((error) => {
      $q.loading.hide();
      $q.notify({
        badgeStyle: "display:none",
        classes: "custom-Notify",
        textColor: "black-1",
        icon: "img:/images/Error.png",
        position: "bottom-right",
        message: error.response?.data?.result || "An error occurred.",
      });
    });
};

const transTypeOptions = ref([]);
const getAllTransTypeOptions = () => {
  services
    .getAllTransTypeOptions()
    .then((res) => {
      transTypeOptions.value = res.data.data;
    })
    .catch((error) => {
      console.error("Error fetching shifts:", error);
    });
};

const columns = [
  {
    name: "Paper No.",
    label: "Paper No.",
    field: "paper_no",
    align: "left",
    sortable: false,
  },
  {
    name: "amount",
    label: "Amount",
    field: "amount",
    align: "left",
    sortable: false,
  },
  {
    name: "transfer",
    label: "Transfer (From - To)",
    field: "transferFrom",
    align: "left",
    sortable: false,
  },
  {
    name: "categoryId",
    label: "Category ID",
    field: (row) => row.category_id.name,
    align: "left",
    sortable: false,
  },
  {
    name: "date",
    label: "Date Of Process",
    field: "date",
    align: "left",
    sortable: false,
  },
  {
    name: "transType",
    label: "Trans Type",
    field: (row) => row.jtype.name,
    align: "left",
    sortable: false,
  },
  {
    name: "actions",
    label: "Action",
    align: "center",
  },
];

const showViewTransaction = ref(false);
const selectedTransaction = ref({});
const showAddTransaction = ref(false);
const addTransaction = () => {
  showAddTransaction.value = true;
};

const onSearch = (val) => {
  console.log("Search:", val);
};

const onFilterChange = ({ type, val }) => {
  filters.value[type] = val;
  getAllTransactions(1);
};

const clearFilters = () => {
  filters.value = {};
  getAllTransactions(1);
};

const viewReport = () => {
  console.log("View Report");
};

const viewTransactionData = (data) => {
  selectedTransaction.value = data;
  showViewTransaction.value = true;
};

const getPagFun = (page) => {
  getAllTransactions(page);
};

const fireCall = (page) => {
  getAllTransactions(page);
};

const fireSortCall = () => {
  getAllTransactions(1);
};

onMounted(() => {
  getAllTransactions();
  getAllTransTypeOptions();
});
</script>
