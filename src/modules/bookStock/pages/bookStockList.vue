<template>
  <tableComp
    pageTitle="Books Stock"
    :tableRows="tableRows"
    :tableColumns="columns"
    :tablePagination="pagination"
    :showAdd="true"
    addBtnLabel="Add Book"
    :actions="true"
    :showFilters="true"
    :ShowActionsdropDown="true"
    searchPlaceholder="Search books stock..."
    :showDirectionFilter="true"
    :directionOptions="directionOptions"
    :showLevelFilter="true"
    :levelOptions="levelOptions"
    :showByUserFilter="true"
    :byUserOptions="byUserOptions"
    @addNew="addBook"
    :bookStock="true"
    @DetailsEvent="onViewDetails"
    @EditEvent="onEditStock"
    @searchEvent="onSearch"
    @filterChange="onFilterChange"
    @clearFilters="clearFilters"
    @updatePag="updatePag"
    @getPagFun="getPagFun"
    @sortApi="fireSortCall"
    @callApi="fireCall"
    emptyStateTitle="No books found"
    emptyStateDescription="Get started by adding book stock."
    emptyStateButtonLabel="Add Book"
  />

  <addBookStock
    v-model="showAddBookPopup"
    :levelOptions="levelOptions"
    @save="handleSaveBook"
  />

  <bookStockDetailsPopup
    v-model="showDetailsPopup"
    :row="selectedRow"
    @edit="onEditStock"
  />
</template>

<script setup>
import { onMounted, ref } from "vue";
import tableComp from "src/components/tableComponent.vue";
import addBookStock from "../components/addBookStock.vue";
import bookStockDetailsPopup from "../components/bookStockDetailsPopup.vue";

const showAddBookPopup = ref(false);
const showDetailsPopup = ref(false);
const selectedRow = ref({});

const pagination = ref({
  page: 1,
  rowsPerPage: 10,
  rowsNumber: 100,
});

const columns = [
  {
    name: "level",
    label: "Level",
    field: (row) => row.level,
    align: "left",
    sortable: false,
  },
  {
    name: "direction",
    label: "Direction",
    field: (row) => row.direction,
    align: "left",
    sortable: false,
  },
  {
    name: "quantity",
    label: "Quantity",
    field: (row) => row.quantity,
    align: "left",
    sortable: false,
  },
  {
    name: "byUser",
    label: "By user",
    field: (row) => row.byUser,
    align: "left",
    sortable: false,
  },
  {
    name: "lastUpdated",
    label: "Last updated",
    field: (row) => row.lastUpdated,
    align: "left",
    sortable: false,
  },
  {
    name: "actions",
    label: "Action",
    align: "center",
  },
];

const tableRows = ref([
  {
    id: 1,
    level: "Access A",
    direction: "Stock Out",
    quantity: 2,
    byUser: "Nawar_Hassan",
    lastUpdated: "Oct 16, 2025, 9:25 AM",
  },
  {
    id: 2,
    level: "Access A",
    direction: "Stock Out",
    quantity: 1,
    byUser: "Nawar_Hassan",
    lastUpdated: "Oct 16, 2025, 9:25 AM",
  },
  {
    id: 3,
    level: "Intro B",
    direction: "Stock In",
    quantity: 1,
    byUser: "Nawar_Hassan",
    lastUpdated: "Oct 16, 2025, 9:25 AM",
  },
  {
    id: 4,
    level: "Intro B",
    direction: "Stock In",
    quantity: 2,
    byUser: "Nawar_Hassan",
    lastUpdated: "Oct 16, 2025, 9:25 AM",
  },
  {
    id: 5,
    level: "Intro B",
    direction: "Stock Out",
    quantity: 3,
    byUser: "Nawar_Hassan",
    lastUpdated: "Oct 16, 2025, 9:25 AM",
  },
  {
    id: 6,
    level: "Access A",
    direction: "Stock In",
    quantity: 4,
    byUser: "Nawar_Hassan",
    lastUpdated: "Oct 16, 2025, 9:25 AM",
  },
  {
    id: 7,
    level: "P2A",
    direction: "Stock Out",
    quantity: 11,
    byUser: "Nawar_Hassan",
    lastUpdated: "Oct 16, 2025, 9:25 AM",
  },
  {
    id: 8,
    level: "Access A",
    direction: "Stock Out",
    quantity: 8,
    byUser: "Laila_Mahfood",
    lastUpdated: "Oct 16, 2025, 9:25 AM",
  },
  {
    id: 9,
    level: "Access A",
    direction: "Stock In",
    quantity: 1,
    byUser: "Laila_Mahfood",
    lastUpdated: "Oct 16, 2025, 9:25 AM",
  },
  {
    id: 10,
    level: "Access A",
    direction: "Stock In",
    quantity: 5,
    byUser: "Laila_Mahfood",
    lastUpdated: "Oct 16, 2025, 9:25 AM",
  },
]);

const directionOptions = ref([
  { id: 1, name: "Stock In" },
  { id: 2, name: "Stock Out" },
]);

const levelOptions = ref([
  { id: 1, name: "Access A" },
  { id: 2, name: "Intro B" },
  { id: 3, name: "P2A" },
]);

const byUserOptions = ref([
  { id: 1, name: "Nawar_Hassan" },
  { id: 2, name: "Laila_Mahfood" },
]);

const addBook = () => {
  showAddBookPopup.value = true;
};

const onViewDetails = (row) => {
  selectedRow.value = row;
  showDetailsPopup.value = true;
};

const onEditStock = (row) => {
  console.log("Edit stock entry:", row);
  // Add logic to open edit dialog here
};

const handleSaveBook = (bookData) => {
  console.log("Book saved:", bookData);
  // Implementation for adding the book row or calling API would go here
};

const onSearch = (val) => {
  console.log("Search:", val);
};

const onFilterChange = ({ type, val }) => {
  console.log("Filter Change:", type, val);
};

const clearFilters = () => {
  console.log("Clear Filters");
};
onMounted(() => {});
</script>
