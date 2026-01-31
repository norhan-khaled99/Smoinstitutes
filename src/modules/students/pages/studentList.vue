<template>
  <div>
    <tableComp
      pageTitle="Students"
      :tableRows="tableRows"
      :tableColumns="columns"
      :tablePagination="pagination"
      :showAdd="true"
      addBtnLabel="Add Student"
      :actions="true"
      :showBalanceFilter="true"
      :balanceOptions="balanceOptions"
      :showStatusFilter="true"
      :statusOptions="statusOptions"
      :showYearFilter="true"
      :yearOptions="yearOptions"
      :ShowActionsdropDown="true"
      @openDialogDeleteEvent="openDialogDeleteEvent"
      :showFilters="true"
      :student="true"
      @addNew="addEvent"
      @EditEvent="EditEvent"
      @DetailsEvent="DetailsEvent"
      @searchEvent="onSearchEvent"
      @updatePag="updatePag"
      @getPagFun="getPagFun"
      @sortApi="fireSortCall"
      @callApi="fireCall"
    />
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import tableComp from "src/components/tableComponent.vue";

import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { useQuasar } from "quasar";
const router = useRouter();
const route = useRoute();
const $q = useQuasar();

const columns = [
  {
    name: "studentName",
    label: "Student Name",
    field: (row) => row.studentName,
    align: "left",
    sortable: true,
  },
  {
    name: "studentId",
    label: "Student ID",
    field: (row) => row.studentId,
    align: "left",
    sortable: true,
  },
  {
    name: "mobile",
    label: "Mobile",
    field: (row) => row.mobile,
    align: "left",
    sortable: true,
  },
  {
    name: "balance",
    label: "Balance",
    field: (row) => row.balance,
    align: "left",
    sortable: true,
  },
  {
    name: "status",
    label: "Status",
    field: (row) => row.status,
    align: "center",
    sortable: true,
  },
  {
    name: "courses",
    label: "Courses",
    field: (row) => row.courses,
    align: "center",
    sortable: true,
  },
  {
    name: "actions",
    label: "Actions",
    align: "center",
  },
];

const statusOptions = ref([
  { name: "Active", id: 1 },
  { name: "Inactive", id: 2 },
]);

const balanceOptions = ref([
  { name: "0-100", id: 1 },
  { name: "100-500", id: 2 },
  { name: "500+", id: 3 },
]);

const yearOptions = ref([
  { name: "2023", id: 2023 },
  { name: "2024", id: 2024 },
  { name: "2025", id: 2025 },
]);

// Static table data
const tableRows = ref([
  {
    id: 1,
    studentName: "Yara Abdullah Ahmed Ali",
    studentId: 251221,
    mobile: "+971523064607",
    balance: -84950,
    status: "New",
    courses: "1 course",
  },
  {
    id: 2,
    studentName: "Moaz Essam Hammoud Musleh",
    studentId: 251220,
    mobile: "+971557134005",
    balance: 2000,
    status: "Waiting",
    courses: "3 courses",
  },
  {
    id: 3,
    studentName: "Ali Saleh Mohammed Muthana",
    studentId: 251219,
    mobile: "+971556072983",
    balance: 0,
    status: "Active",
    courses: "No courses",
  },
  {
    id: 4,
    studentName: "Abdullah Saleh Mobarek Hussien Alharthy",
    studentId: 251218,
    mobile: "+971553088206",
    balance: -56250,
    status: "New",
    courses: "2 courses",
  },
  {
    id: 5,
    studentName: "Youssef Mohammed Yaslam Mohammed",
    studentId: 251217,
    mobile: "+971553296324",
    balance: 0,
    status: "Idle",
    courses: "No courses",
  },
  {
    id: 6,
    studentName: "Amani Ahmed Mohammed Ali",
    studentId: 251216,
    mobile: "+971559533707",
    balance: 6500,
    status: "Active",
    courses: "No courses",
  },
  {
    id: 7,
    studentName: "Yassin Gamal Mohshen Hussien",
    studentId: 251215,
    mobile: "+971503603570",
    balance: -56250,
    status: "New",
    courses: "3 courses",
  },
  {
    id: 8,
    studentName: "Hussien Maged Hussien Abdulrahman",
    studentId: 251214,
    mobile: "+971553296324",
    balance: 5000,
    status: "Idle",
    courses: "1 course",
  },
  {
    id: 9,
    studentName: "Qassem Abdulghani Mohammed Motlaq",
    studentId: 251213,
    mobile: "+971502469158",
    balance: 0,
    status: "Waiting",
    courses: "4 courses",
  },
  {
    id: 10,
    studentName: "Ahmed Mohamed Hassan",
    studentId: 251212,
    mobile: "+971501234567",
    balance: 3500,
    status: "Active",
    courses: "2 courses",
  },
]);

// Pagination configuration
const pagination = ref({
  page: 1,
  rowsPerPage: 10,
  rowsNumber: 10,
});

// Permission status

// Event handlers
const openDialogDeleteEvent = (row) => {
  console.log("Delete event:", row);
  // Add delete logic here
};

const DetailsEvent = (row) => {
  console.log("Details event:", row);
  router.push({ name: "studentDetails", params: { id: row.id } });
  // Add navigation or modal logic here
};
const addEvent = () => {
  console.log("Add event");
  router.push({ name: "addStudent" });
  // Add navigation or modal logic here
};

const EditEvent = (row) => {
  console.log("Edit event:", row);
  // Add edit logic here
};

const onSearchEvent = (searchValue) => {
  console.log("Search event:", searchValue);
  // Add search logic here
};

const updatePag = (rowsPerPage) => {
  pagination.value.rowsPerPage = rowsPerPage;
  console.log("Update pagination:", rowsPerPage);
};

const getPagFun = ([apiCall, page, paginationData]) => {
  pagination.value.page = page;
  pagination.value = { ...pagination.value, ...paginationData };
  console.log("Get pagination:", { apiCall, page, paginationData });
};

const fireSortCall = ([apiCall, sortBy]) => {
  console.log("Sort API call:", { apiCall, sortBy });
  // Add sort logic here
};

const fireCall = ([apiCall, page, paginationData]) => {
  pagination.value.page = page;
  pagination.value = { ...pagination.value, ...paginationData };
  console.log("Fire API call:", { apiCall, page, paginationData });
};

onMounted(() => {
  console.log("onMounted");
});
</script>
