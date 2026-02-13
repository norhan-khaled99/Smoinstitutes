<template>
  <tableComp
    pageTitle="Course finances"
    :tableRows="tableRows"
    :tableColumns="columns"
    :tablePagination="pagination"
    :showFilters="true"
    searchPlaceholder="Search Course finances..."
    :transactions="true"
    :showStatusFilter="true"
    :statusOptions="statusOptions"
    :showShiftFilter="true"
    :shiftOptions="shiftOptions"
    @searchEvent="onSearch"
    @filterChange="onFilterChange"
    @clearFilters="clearFilters"
    @getPagFun="getPagFun"
    @viewReport="viewReport"
    @viewCourseReport="viewCourseReport"
    emptyStateTitle="No course finances found"
    emptyStateDescription="Course financial data will appear here."
  >
  </tableComp>
  <CourseFinancePopup
    v-model="viewCourseFinancePopup"
    :course="selectedCourse"
    @close="viewCourseFinancePopup = false"
  />
</template>

<script setup>
import { ref } from "vue";
import tableComp from "src/components/tableComponent.vue";
import CourseFinancePopup from "./viewCourseFinancePopup.vue";

const pagination = ref({
  page: 1,
  rowsPerPage: 10,
  rowsNumber: 100,
});

const viewCourseFinancePopup = ref(false);
const selectedCourse = ref({});
// Filter options
const statusOptions = ref([
  { name: "Active", value: "Active" },
  { name: "Finished", value: "Finished" },
  { name: "Waiting", value: "Waiting" },
]);

const shiftOptions = ref([
  { name: "Morning", value: "Morning" },
  { name: "Evening", value: "Evening" },
  { name: "Night", value: "Night" },
]);

// Table columns
const columns = [
  {
    name: "name",
    label: "Name",
    field: "name",
    align: "left",
    sortable: false,
  },
  {
    name: "shift",
    label: "Shift",
    field: "shift",
    align: "left",
    sortable: false,
  },
  {
    name: "duration",
    label: "Duration (From - To)",
    field: "duration",
    align: "left",
    sortable: false,
  },
  {
    name: "courseFinaceStatus",
    label: "Status",
    field: "status",
    align: "left",
    sortable: false,
  },
  {
    name: "students",
    label: "Students",
    field: "students",
    align: "left",
    sortable: false,
  },
  {
    name: "totalFees",
    label: "Total Fees",
    field: "totalFees",
    align: "left",
    sortable: false,
  },
  {
    name: "discounts",
    label: "Discounts",
    field: "discounts",
    align: "left",
    sortable: false,
  },
  {
    name: "paidRemaining",
    label: "Paid Remaining",
    field: "paidRemaining",
    align: "left",
    sortable: false,
  },
  {
    name: "expenses",
    label: "Expenses",
    field: "expenses",
    align: "left",
    sortable: false,
  },
  {
    name: "reports",
    label: "Reports",
    field: "reports",
    align: "center",
    sortable: false,
  },
];

// Sample data matching the screenshot
const tableRows = ref([
  {
    id: 1,
    courseId: "6362",
    name: "Intro A",
    code: "SH1",
    startDate: "10-01-2026",
    endDate: "11-02-2026",
    status: "Finished",
    students: 8,
    totalFees: 360000,
    discounts: 0.0,
    paid: 290000,
    remaining: 70000,
    expenses: 0.0,
  },
  {
    id: 2,
    courseId: "6381",
    name: "Intro A",
    code: "SH1",
    startDate: "10-01-2026",
    endDate: "11-02-2026",
    status: "Finished",
    students: 12,
    totalFees: 120000,
    discounts: 0.0,
    paid: 80000,
    remaining: 40000,
    expenses: 0.0,
  },
  {
    id: 3,
    courseId: "6380",
    name: "Intro B",
    code: "SH4",
    startDate: "10-01-2026",
    endDate: "11-02-2026",
    status: "Active",
    students: 16,
    totalFees: 400000,
    discounts: 10000,
    paid: 372000,
    remaining: 18000,
    expenses: 0.0,
  },
  {
    id: 4,
    courseId: "6380",
    name: "Intro B",
    code: "SH4",
    startDate: "10-01-2026",
    endDate: "11-02-2026",
    status: "Active",
    students: 14,
    totalFees: 90000,
    discounts: 0.0,
    paid: 90000,
    remaining: 0,
    expenses: 0.0,
  },
  {
    id: 5,
    courseId: "6379",
    name: "1A",
    code: "SH4",
    startDate: "10-01-2026",
    endDate: "11-02-2026",
    status: "Finished",
    students: 16,
    totalFees: 360000,
    discounts: 0.0,
    paid: 290000,
    remaining: 70000,
    expenses: 0.0,
  },
  {
    id: 6,
    courseId: "6378",
    name: "Access A",
    code: "SH3",
    startDate: "10-01-2026",
    endDate: "11-02-2026",
    status: "Active",
    students: 7,
    totalFees: 360000,
    discounts: 0.0,
    paid: 290000,
    remaining: 70000,
    expenses: 0.0,
  },
  {
    id: 7,
    courseId: "6377",
    name: "Basic",
    code: "SH2",
    startDate: "10-01-2026",
    endDate: "11-02-2026",
    status: "Finished",
    students: 6,
    totalFees: 360000,
    discounts: 0.0,
    paid: 290000,
    remaining: 70000,
    expenses: 0.0,
  },
  {
    id: 8,
    courseId: "6376",
    name: "ICDL",
    code: "SH3",
    startDate: "10-01-2026",
    endDate: "11-02-2026",
    status: "Finished",
    students: 10,
    totalFees: 360000,
    discounts: 0.0,
    paid: 290000,
    remaining: 70000,
    expenses: 0.0,
  },
  {
    id: 9,
    courseId: "6375",
    name: "Access A",
    code: "SH3",
    startDate: "10-01-2026",
    endDate: "11-02-2026",
    status: "Active",
    students: 8,
    totalFees: 360000,
    discounts: 0.0,
    paid: 290000,
    remaining: 70000,
    expenses: 0.0,
  },
  {
    id: 10,
    courseId: "6374",
    name: "Intro B",
    code: "SH4",
    startDate: "10-01-2026",
    endDate: "11-02-2026",
    status: "Active",
    students: 11,
    totalFees: 360000,
    discounts: 0.0,
    paid: 290000,
    remaining: 70000,
    expenses: 0.0,
  },
]);

// Helper function to format numbers
const formatNumber = (value) => {
  return new Intl.NumberFormat("en-US").format(value);
};

// Event handlers
const onSearch = (val) => {
  console.log("Search:", val);
};

const onFilterChange = (type, val) => {
  console.log("Filter Change:", type, val);
};

const clearFilters = () => {
  console.log("Filters cleared");
};

const viewReport = () => {
  console.log("View Report clicked");
};

const viewCourseReport = (row) => {
  console.log("View course report:", row);
  selectedCourse.value = row;
  viewCourseFinancePopup.value = true;
};

const getPagFun = ([apiCall, page, paginationData]) => {
  console.log("Pagination:", page);
  pagination.value.page = page;
};
</script>
