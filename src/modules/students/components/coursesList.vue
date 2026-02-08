<template>
  <tableComp
    :tableRows="tableRows"
    :tableColumns="columns"
    :tablePagination="pagination"
    :showAddButton="true"
    addBtnLabel="Add Course"
    :actions="true"
    :studentCourse="true"
    :showBalanceFilter="true"
    :balanceOptions="balanceOptions"
    :showStatusFilter="true"
    :statusOptions="statusOptions"
    :ShowActionsdropDown="true"
    @openDialogDeleteEvent="openDialogDeleteEvent"
    :showFilters="true"
    @addNew="addEvent"
    @EditEvent="EditEvent"
    @DetailsEvent="DetailsEvent"
    @addDiscount="addDiscount"
    searchPlaceholder="Search courses..."
    @searchEvent="onSearchEvent"
    @updatePag="updatePag"
    @getPagFun="getPagFun"
    @sortApi="fireSortCall"
    @callApi="fireCall"
    emptyStateTitle="No courses found"
    emptyStateDescription="Get started by assigning a course."
    emptyStateButtonLabel="Add Course"
  />

  <addCourseStudentpopup v-model="showAddCoursePopup" />
  <addDiscountPopup
    v-model="showAddDiscountPopup"
    :courseName="selectedCourse"
    @save="handleSaveDiscount"
  />
</template>
<script setup>
import { ref, onMounted } from "vue";
import tableComp from "src/components/tableComponent.vue";
import addCourseStudentpopup from "./addCourseStudentpopup.vue";
import addDiscountPopup from "./addDiscountPopup.vue";

const showAddCoursePopup = ref(false);
const showAddDiscountPopup = ref(false);
const selectedCourse = ref("");

import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { useQuasar } from "quasar";
const router = useRouter();
const route = useRoute();
const $q = useQuasar();

const columns = [
  {
    name: "course",
    label: "Course",
    field: (row) => row.course,
    align: "left",
    sortable: false,
  },
  {
    name: "teacher",
    label: "Teacher",
    field: (row) => row.teacher,
    align: "left",
    sortable: false,
  },
  {
    name: "startDate",
    label: "Start Date",
    field: (row) => row.startDate,
    align: "left",
    sortable: false,
  },
  {
    name: "status",
    label: "Status",
    field: (row) => row.status,
    align: "left",
    sortable: false,
  },
  {
    name: "balance",
    label: "Balance",
    field: (row) => row.balance,
    align: "left",
    sortable: false,
  },
  {
    name: "score",
    label: "Score",
    field: (row) => row.score,
    align: "left",
    sortable: false,
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
    course: "Intro A",
    teacher: "Fadel Mohammed Alnoud",
    startDate: "04-01-2026",
    status: "Finished",
    balance: "0",
    score: "88%",
  },
  {
    id: 2,
    course: "Intro B",
    teacher: "Saleh Salem Alorabi",
    startDate: "11-01-2026",
    status: "Pending",
    balance: "+2000",
    score: "-",
  },
  {
    id: 3,
    course: "ICDL",
    teacher: "Ali Saleh Mohammed Muthana",
    startDate: "11-01-2026",
    status: "Finished",
    balance: "0",
    score: "92%",
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
  showAddCoursePopup.value = true;
};

const addDiscount = (row) => {
  selectedCourse.value = row.course;
  showAddDiscountPopup.value = true;
};

const handleSaveDiscount = (data) => {
  console.log("Save discount:", data);
  // Add save discount logic here
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
