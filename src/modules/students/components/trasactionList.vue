<template>
  <tableComp
    :tableRows="tableRows"
    :tableColumns="columns"
    :tablePagination="pagination"
    :showAddButtonDropdown="true"
    addBtnLabel="Add Payment"
    :addDropdownOptions="addDropdownOptions"
    :actions="true"
    :showCourseFilter="true"
    :courseOptions="courseOptions"
    :showTypeFilter="true"
    :typeOptions="typeOptions"
    :ShowActionsdropDown="true"
    :showFilters="true"
    searchPlaceholder="Search Transaction..."
    @addDropdownAction="handleAddPayment"
    @searchEvent="onSearchEvent"
    @updatePag="updatePag"
    @getPagFun="getPagFun"
    @sortApi="fireSortCall"
    @callApi="fireCall"
    emptyStateTitle="No transactions found"
    emptyStateDescription="Get started by adding a new payment."
    emptyStateButtonLabel="Add Payment"
    @addNew="onAddNewTransaction"
  >
  </tableComp>
</template>

<script setup>
import { ref } from "vue";
import tableComp from "src/components/tableComponent.vue";

const columns = [
  {
    name: "voucherNumber",
    label: "Voucher Number",
    field: "voucherNumber",
    align: "left",
    sortable: false,
  },
  {
    name: "course",
    label: "Course",
    field: "course",
    align: "left",
    sortable: false,
  },
  {
    name: "type",
    label: "Type",
    field: "type",
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
    name: "date",
    label: "Transaction Date",
    field: "date",
    align: "left",
    sortable: false,
  },
  {
    name: "actions",
    label: "Action",
    align: "right",
  },
];

const tableRows = ref([
  {
    id: 1,
    voucherNumber: "11450",
    course: "Intro A",
    type: "Income",
    typeClass: "income",
    amount: "11450",
    date: "04-01-2026",
  },
  {
    id: 2,
    voucherNumber: "11350",
    course: "Intro B",
    type: "Expense",
    typeClass: "expense",
    amount: "11350",
    date: "11-01-2026",
  },
  {
    id: 3,
    voucherNumber: "10350",
    course: "Intro A",
    type: "Service",
    typeClass: "service",
    amount: "10350",
    date: "11-01-2026",
  },
  {
    id: 4,
    voucherNumber: "12450",
    course: "ICDL",
    type: "Funds Transfer",
    typeClass: "funds-transfer",
    amount: "12450",
    date: "11-01-2026",
  },
  {
    id: 5,
    voucherNumber: "11410",
    course: "Intro B",
    type: "Course Registration",
    typeClass: "course-registration",
    amount: "11410",
    date: "11-01-2026",
  },
]);

const pagination = ref({
  page: 1,
  rowsPerPage: 10,
  rowsNumber: 5,
});

const courseOptions = ref([
  { name: "Intro A", id: 1 },
  { name: "Intro B", id: 2 },
  { name: "ICDL", id: 3 },
]);

const typeOptions = ref([
  { name: "Income", id: 1 },
  { name: "Expense", id: 2 },
  { name: "Service", id: 3 },
  { name: "Funds Transfer", id: 4 },
  { name: "Course Registration", id: 5 },
]);

const addDropdownOptions = ref([
  { name: "Payment Option 1", id: 1 },
  { name: "Payment Option 2", id: 2 },
]);

const handleAddPayment = (option) => {
  console.log("Add Payment:", option);
};

const onAddNewTransaction = () => {
  console.log("Add New Transaction (Empty State) clicked");
};

const onSearchEvent = (searchValue) => {
  console.log("Search:", searchValue);
};

const updatePag = (rowsPerPage) => {
  pagination.value.rowsPerPage = rowsPerPage;
};

const getPagFun = ([apiCall, page, paginationData]) => {
  pagination.value.page = page;
  pagination.value = { ...pagination.value, ...paginationData };
};

const fireSortCall = ([apiCall, sortBy]) => {
  console.log("Sort:", sortBy);
};

const fireCall = ([apiCall, page, paginationData]) => {
  pagination.value.page = page;
  pagination.value = { ...pagination.value, ...paginationData };
};
</script>
