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
    @filterTransaction="onFilterChange"
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
import tableComp from "src/components/tableComponent.vue";
import viewTransaction from "../components/viewTransaction.vue";
import AddTransaction from "../components/addTransaction.vue";
import { useQuasar } from "quasar";
import services from "../service/service.js";

const pagination = ref({
  page: 1,
  rowsPerPage: 20,
  rowsNumber: 100,
});
const $q = useQuasar();
const allTransactions = ref([]);

const fromFilter = ref("");
const toFilter = ref("");
const typeFilter = ref("");


const typeOfFilter = ref("");
const valueOfFilter = ref("");
const searchQuery = ref("");
const getAllTransactions = (page = 1) => {
  $q.loading.show();
  services
    .getAllTransactions(
      page,
      typeOfFilter.value,
      valueOfFilter.value,
      searchQuery.value
    )
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

const onFilterChange = (from, to, type) => {
  fromFilter.value = from;
  toFilter.value = to;
  typeFilter.value = type;

 console.log("from", fromFilter.value)
 console.log("to", toFilter.value)
 console.log("type", typeFilter.value )
  // getAllTransactions(1);
};

const clearFilters = () => {
  getAllTransactions(1);
};

const viewReport = () => {
  console.log("View Report");
};

const viewTransactionData = (data) => {
  selectedTransaction.value = data;
  showViewTransaction.value = true;
};

const getPagFun = ([apiCall, page]) => {
  getAllTransactions(page);
};

const fireCall = ([apiCall, page]) => {
  getAllTransactions(page);
};

const fireSortCall = ([apiCall, sorting]) => {
  getAllTransactions(1);
};

onMounted(() => {
  getAllTransactions();
  getAllTransTypeOptions();
});
</script>
