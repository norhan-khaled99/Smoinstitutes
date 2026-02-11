<template>
  <tableComp
    pageTitle="Transactions"
    :tableRows="tableRows"
    :tableColumns="columns"
    :tablePagination="pagination"
    :showAdd="true"
    addBtnLabel="Add Transaction"
    :actions="true"
    :ShowActionsdropDown="true"
    :showFilters="true"
    :showTypeFilter="true"
    :typeOptions="transTypeOptions"
    typePlaceholder="Trans Type"
    searchPlaceholder="Search Transactions..."
    :transactions="true"
    @addNew="addTransaction"
    @searchEvent="onSearch"
    @filterChange="onFilterChange"
    @clearFilters="clearFilters"
    @viewReport="viewReport"
    @viewDetails="viewDetails"
    @reverseTransaction="reverseTransaction"
    @openDialogDeleteEvent="deleteTransaction"
    emptyStateTitle="No transactions found"
    emptyStateDescription="Get started by adding a new transaction."
    emptyStateButtonLabel="Add Transaction"
  />

  <viewTransaction
    v-model="showViewTransaction"
    :transaction="selectedTransaction"
  />
  <addTransaction v-model="showAddTransaction" />
</template>

<script setup>
import { ref } from "vue";
import tableComp from "src/components/tableComponent.vue";
import viewTransaction from "../components/viewTransaction.vue";
import addTransaction from "../components/addTransaction.vue";

const pagination = ref({
  page: 1,
  rowsPerPage: 10,
  rowsNumber: 100,
});



const transTypeOptions = ref([
  { id: 1, name: "Course deduction" },
  { id: 2, name: "Course registration" },
  { id: 3, name: "Funds Transfer" },
  { id: 4, name: "Transaction Reversal" },
]);

const columns = [
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
    field: "transferFrom", // Used for basic sorting if needed, but display is custom
    align: "left",
  },
  {
    name: "categoryId",
    label: "Category ID",
    field: "categoryId",
    align: "left",
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
    field: "transType",
    align: "left",
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
    paperNo: "251221",
    amount: "4000.0",
    transferFrom: "Yara Abdullah Ahmed Ali",
    transferTo: "To Students Income - (4)",
    categoryId: "6372 Intro B",
    date: "11-01-2026",
    transType: "Course deduction",
  },
  {
    id: 2,
    paperNo: "251220",
    amount: "40000.0",
    transferFrom: "Ahmed Sameer Mohshen Hussien",
    transferTo: "To Students Income - (4)",
    categoryId: "6383 Intro A",
    date: "11-01-2026",
    transType: "Course registration",
  },
  {
    id: 3,
    paperNo: "251219",
    amount: "40000.0",
    transferFrom: "Nedal Abdulsalam Saleh",
    transferTo: "To Students Income - (4)",
    categoryId: "6378 Access A",
    date: "11-01-2026",
    transType: "Funds Transfer",
  },
  {
    id: 4,
    paperNo: "251218",
    amount: "40000.0",
    transferFrom: "Students Discounts - (5)",
    transferTo: "To Reyadh Hassan Khaled Saeed",
    categoryId: "6372 Intro B",
    date: "11-01-2026",
    transType: "Course registration",
  },
  {
    id: 5,
    paperNo: "251217",
    amount: "40000.0",
    transferFrom: "Yara Abdullah Ahmed Ali",
    transferTo: "To Students Income - (4)",
    categoryId: "6378 Access A",
    date: "11-01-2026",
    transType: "Course deduction",
  },
  {
    id: 6,
    paperNo: "251216",
    amount: "40000.0",
    transferFrom: "Students Discounts - (5)",
    transferTo: "To Maimona Abdo Mohammed",
    categoryId: "6383 Intro A",
    date: "11-01-2026",
    transType: "Transaction Reversal",
  },
  {
    id: 7,
    paperNo: "251215",
    amount: "40000.0",
    transferFrom: "Norhan Abdullah Ahmed Ali",
    transferTo: "To Students Income - (4)",
    categoryId: "6372 Intro B",
    date: "11-01-2026",
    transType: "Funds Transfer",
  },
  {
    id: 8,
    paperNo: "251214",
    amount: "40000.0",
    transferFrom: "Mohammed Gubran Mohammed",
    transferTo: "To Students Income - (4)",
    categoryId: "6378 Access A",
    date: "11-01-2026",
    transType: "Course registration",
  },
  {
    id: 9,
    paperNo: "251213",
    amount: "40000.0",
    transferFrom: "Awad Ahmed Awad Abdullah",
    transferTo: "To Students Income - (4)",
    categoryId: "6372 Intro B",
    date: "11-01-2026",
    transType: "Transaction Reversal",
  },
  {
    id: 10,
    paperNo: "251212",
    amount: "40000.0",
    transferFrom: "Arwa Abdullah Ahmed Ali",
    transferTo: "To Students Income - (4)",
    categoryId: "6383 Intro A",
    date: "11-01-2026",
    transType: "Course deduction",
  },
]);

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
  console.log("Filter Change:", type, val);
};

const clearFilters = () => {
  console.log("Clear filters");
};

const viewReport = () => {
  console.log("View Report");
};

const viewDetails = (row) => {
  selectedTransaction.value = row;
  showViewTransaction.value = true;
};

const editTransaction = (row) => {
  console.log("Edit Transaction", row);
};

const reverseTransaction = (row) => {
  console.log("Reverse Transaction", row);
};

const deleteTransaction = (row) => {
  console.log("Delete Transaction", row);
};
</script>

<style lang="scss" scoped></style>
