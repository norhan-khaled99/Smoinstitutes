<template>
  <tableComp
    :tableRows="tableRows"
    :tableColumns="columns"
    :tablePagination="pagination"
    :actions="false"
    :showCourseFilter="true"
    :courseOptions="courseOptions"
    :showStatusFilter="true"
    :statusOptions="statusOptions"
    :showFilters="true"
    searchPlaceholder="Search Attendance..."
    emptyStateTitle="No attendance records found"
    emptyStateDescription="Get started by marking attendance."
    emptyStateButtonLabel="Add Attendance"
    @searchEvent="onSearchEvent"
    @updatePag="updatePag"
    @getPagFun="getPagFun"
    @sortApi="fireSortCall"
    @callApi="fireCall"
  >
  </tableComp>
</template>

<script setup>
import { ref } from "vue";
import tableComp from "src/components/tableComponent.vue";

const columns = [
  {
    name: "status",
    label: "Status",
    field: "status",
    align: "left",
    sortable: true,
  },
  {
    name: "shift",
    label: "Shift",
    field: "shift",
    align: "left",
    sortable: true,
  },
  {
    name: "course",
    label: "Course",
    field: "course",
    align: "left",
    sortable: true,
  },
  {
    name: "className",
    label: "Class",
    field: "className",
    align: "left",
    sortable: true,
  },
  {
    name: "date",
    label: "Date",
    field: "date",
    align: "left",
    sortable: true,
  },
  {
    name: "time",
    label: "Time",
    field: "time",
    align: "left",
    sortable: true,
  },
];

const tableRows = ref([]);

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

const statusOptions = ref([
  { name: "Present", id: 1 },
  { name: "Absent", id: 2 },
  { name: "Late", id: 3 },
  { name: "Excused", id: 4 },
]);

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
