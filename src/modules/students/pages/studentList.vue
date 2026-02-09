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
      @filterChange="filterData"
      @clearFilters="clearFilter"
    />
  </div>
</template>
<script setup>
import {ref, onMounted} from "vue";
import tableComp from "src/components/tableComponent.vue";
import StudentService from "../services/service";
import {useRouter} from "vue-router";
import {useRoute} from "vue-router";
import {useQuasar} from "quasar";

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
  {name: "Active", id: 1},
  {name: "Waiting", id: 2},
  {name: "Idle", id: 3},
  {name: "New", id: 4},
]);

const balanceOptions = ref([
  {name: "Negative", id: "neg"},
  {name: "Zero", id: "zero"},
  {name: "Positive", id: "positive"},
]);

const yearOptions = ref([
  {name: "2023", id: 2023},
  {name: "2024", id: 2024},
  {name: "2025", id: 2025},
]);

const statusFilter = ref("");
const balanceFilter = ref("");
const searchValue = ref("");
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
  router.push({name: "studentDetails", params: {id: row.student_id}});
};
const addEvent = () => {
  console.log("Add event");
  router.push({name: "addStudent"});
  // Add navigation or modal logic her
};

const EditEvent = (row) => {
  console.log("Edit event:", row);
  router.push({
    name: "studentDetails",
    params: {id: row.id},
    query: {edit: "true"},
  });
};

const onSearchEvent = (search) => {
  console.log("Search event:", search);
  if (!search || search.trim() === "") {
    searchValue.value = "";
    // If search is empty, load all notes
    getAllStudents(1);
  } else {
    // Perform search
    searchValue.value = search;
    performSearch();
  }
  // Add search logic here
};

const performSearch = () => {
  $q.loading.show();

  StudentService
    .searchStudent(searchValue.value, statusFilter.value, 1, balanceFilter.value)
    .then((res) => {
      tableRows.value = res.data.data.results;
      pagination.value.rowsNumber = res.data.data.count || 0;
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
const filterData = (data) => {
  console.log(data);
  if (data.type === "status") {
    statusFilter.value = data.val || "";
  }
  if (data.type === "balance") {
    balanceFilter.value = data.val || "";
  }
  performSearch();
}

const clearFilter = () => {
  statusFilter.value = "";
  balanceFilter.value = "";
  getAllStudents(1);
}

const getAllStudents = (page = 1) => {
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
