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
      emptyStateTitle="No students found"
      emptyStateDescription="Adjust your filters or add new students to get started."
      emptyStateButtonLabel="Add Student"
    />
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import tableComp from "src/components/tableComponent.vue";
import StudentService from "../services/service";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { useQuasar } from "quasar";
const router = useRouter();
const route = useRoute();
const $q = useQuasar();

const columns = [
  {
    name: "image",
    label: "Student Name",
    field: (row) => row.full_name,
    align: "left",
    sortable: false,
  },
  {
    name: "studentId",
    label: "Student ID",
    field: (row) => row.student_id,
    align: "left",
    sortable: false,
  },
  {
    name: "mobile",
    label: "Mobile",
    field: (row) => row.mobile,
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
    name: "status",
    label: "Status",
    field: (row) => row.status,
    align: "center",
    sortable: false,
  },
  {
    name: "courses",
    label: "Courses",
    field: (row) => row.active_or_waiting_courses,
    align: "center",
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
const tableRows = ref([]);

// Pagination configuration
const pagination = ref({
  page: 1,
  rowsPerPage: 20,
  rowsNumber: 100,
});


// Permission status

// Event handlers
const openDialogDeleteEvent = (row) => {
  console.log("Delete event:", row);
  // Add delete logic here
};

const DetailsEvent = (row) => {
  console.log("Details event:", row);
  router.push({ name: "studentDetails", params: { id: row.student_id } });
};
const addEvent = () => {
  console.log("Add event");
  router.push({ name: "addStudent" });
  // Add navigation or modal logic her
};

const EditEvent = (row) => {
  console.log("Edit event:", row);
  // Add edit logic here
};

const onSearchEvent = (searchValue) => {
  console.log("Search event:", searchValue);
  if (!searchValue || searchValue.trim() === "") {
    // If search is empty, load all notes
    getAllStudents(1);
  } else {
    // Perform search
    performSearch(searchValue);
  }
  // Add search logic here
};

const performSearch = (searchQuery) => {
  $q.loading.show();

  StudentService
    .searchStudent(searchQuery, 1)
    .then((res) => {
      tableRows.value = res.data.results;
      pagination.value.rowsNumber = res.data.count || 0;
      pagination.value.page = 1;
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
const updatePag = (rowsPerPage) => {
  pagination.value.rowsPerPage = rowsPerPage;
  console.log("Update pagination:", rowsPerPage);
};

const getPagFun = ([apiCall, page, paginationData]) => {
  getAllStudents(page);
};

const fireSortCall = ([apiCall, sortBy]) => {
  getAllStudents(1)
};

const fireCall = ([apiCall, page, paginationData]) => {
 getAllStudents(page);
};

const getAllStudents = (page = 1)=>{
  $q.loading.show();
  StudentService.getAllStudents(page).then((response) => {
     tableRows.value = response.data.data.results;
     pagination.value.rowsNumber = response.data.data.count || 0;
      pagination.value.page = page;
      $q.loading.hide();
  }).catch((error) => {
    $q.loading.hide();
      $q.notify({
        badgeStyle: "display:none",
        classes: "custom-Notify",
        textColor: "black-1",
        icon: "img:/images/Error.png",
        position: "bottom-right",
        message: error.response?.data?.result || "An error occurred.",
      });
  })
}
onMounted(() => {
 getAllStudents();
});
</script>
