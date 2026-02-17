<template>
  <tableComp
    pageTitle="Course finances"
    :tableRows="allCourseFinance"
    :tableColumns="columns"
    :tablePagination="pagination"
    :showFilters="true"
    searchPlaceholder="Search Course finances..."
    :transactions="true"
    :showStatusFilterInCourseFinance="true"
    :statusOptions="statusOptions"
    :showShiftFilter="true"
    :shiftOptions="shiftOptions"
    @searchEvent="onSearch"
    @filterTransaction="FilterCourseFinance"
    @clearFilters="clearFilters"
    @getPagFun="getPagFun"
    @viewReport="viewReport"
    @viewCourseReport="viewCourseReport"
    @sortApi="fireSortCall"
    @callApi="fireCall"
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
import { ref, onMounted, watch } from "vue";
import tableComp from "src/components/tableComponent.vue";
import CourseFinancePopup from "./viewCourseFinancePopup.vue";
import { useQuasar } from "quasar";
import services from "../service/service.js";

const $q = useQuasar();
const searchQuery = ref("");
const typeOfFilter = ref("");
const valueOfFilter = ref("");

const pagination = ref({
  page: 1,
  rowsPerPage: 20,
  rowsNumber: 100,
});
// Table columns
const columns = [
  {
    name: "name",
    label: "Name",
    field: (row) => row.name,
    align: "left",
    sortable: false,
  },
  {
    name: "shift",
    label: "Shift",
    field: (row) => row.shift,
    align: "left",
    sortable: false,
  },
  {
    name: "duration",
    label: "Duration (From - To)",
    field: (row) => row.startdate,
    align: "left",
    sortable: false,
  },
  {
    name: "courseFinaceStatus",
    label: "Status",
    field: (row) => row.status,
    align: "left",
    sortable: false,
  },
  {
    name: "students",
    label: "Students",
    field: (row) => row.students,
    align: "left",
    sortable: false,
  },
  {
    name: "totalFees",
    label: "Total Fees",
    field: (row) => row.total_fees,
    align: "left",
    sortable: false,
  },
  {
    name: "discounts",
    label: "Discounts",
    field: (row) => row.total_discounts,
    align: "left",
    sortable: false,
  },
  {
    name: "paidRemaining",
    label: "Paid Remaining",
    field: (row) => row.full_name,
    align: "left",
    sortable: false,
  },
  {
    name: "expenses",
    label: "Expenses",
    field: (row) => row.total_expences,
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

const fromNo = ref("");
const toNo = ref("");
const statusFilter = ref("");
const shiftFilter = ref("");

const allCourseFinance = ref([]);
const getAllCourseFinance = (page = 1) => {
  $q.loading.show();

  services
    .getAllCourseFinance(
      page,
      fromNo.value,
      toNo.value,
      statusFilter.value,
      shiftFilter.value,
      searchQuery.value
    )
    .then((res) => {
      allCourseFinance.value = res.data.results;

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
        message: error.res?.data?.result || "An error occurred.",
      });
    });
};

const viewCourseFinancePopup = ref(false);
const selectedCourse = ref({});
// Filter options
const statusOptions = ref([
  { name: "Active", value: "Active" },
  { name: "Pending", value: "Pending" },
  { name: "Finished", value: "Finished" },
]);

const shiftOptions = ref([]);
const getAllShifts = () => {
  services
    .getAllShifts()
    .then((res) => {
      shiftOptions.value = res.data.data.value.SHIFT_CHOICES;
    })
    .catch((error) => {
      console.error("Error fetching shifts:", error);
    });
};

// Event handlers
const onSearch = (val) => {
  searchQuery.value = val;
  getAllCourseFinance(1);
};


const FilterCourseFinance = (from,to,status,shift) => {
  fromNo.value = from;
  toNo.value = to;
  statusFilter.value = status;
  shiftFilter.value = shift;

  if (from && !to) {
    $q.notify({
      badgeStyle: "display:none",
      classes: "custom-Notify",
      textColor: "black-1",
      icon: "img:/images/Error.png",
      position: "bottom-right",
      message: "Please enter Number Of To",
    });
    return;
  }

  if (to && !from) {
    $q.notify({
      badgeStyle: "display:none",
      classes: "custom-Notify",
      textColor: "black-1",
      icon: "img:/images/Error.png",
      position: "bottom-right",
      message: "Please enter Number Of From",
    });
    return;
  }

  if (status || shift || (from && to)) {
    getAllCourseFinance(1);
  }


};


const clearFilters = () => {
  fromNo.value = "";
  toNo.value = "";
  statusFilter.value = "";
  shiftFilter.value = "";
  getAllCourseFinance(1);
};

const viewReport = () => {
  console.log("View Report clicked");
};

const viewCourseReport = (row) => {
  selectedCourse.value = row;
  viewCourseFinancePopup.value = true;
};

const getPagFun = ([apiCall, page, paginationData]) => {
  getAllCourseFinance(page);
};

const fireCall = ([apiCall, page, paginationData]) => {
  getAllCourseFinance(page);
};

const fireSortCall = ([apiCall, sorting]) => {
  getAllCourseFinance(1);
};

onMounted(() => {
  getAllCourseFinance();
  getAllShifts();
});
</script>
