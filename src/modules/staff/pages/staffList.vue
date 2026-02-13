<template>
  <tableComp
    pageTitle="Staff"
    :tableRows="allStaff"
    :tableColumns="columns"
    :tablePagination="pagination"
    :showAdd="true"
    addBtnLabel="Add Staff"
    :actions="true"
    :staff="true"
    :showFilters="true"
    :ShowActionsdropDown="true"
    searchPlaceholder="Search by Name, ID, or Mobile..."
    :showJobTypeFilter="true"
    :jobTypeOptions="jobTypeOptions"
    @addNew="addStaff"
    @searchEvent="onSearch"
    @filterChange="onFilterChange"
    @clearFilters="clearFilters"
    @getPagFun="getPagFun"
    @sortApi="fireSortCall"
    @callApi="fireCall"
    @editEvent="editEvent"
    @DetailsEvent="viewEvent"
    :showStatusFilter="true"
    :statusOptions="statusOptions"
    emptyStateTitle="No staff found"
    emptyStateDescription="Get started by adding a new staff member."
    emptyStateButtonLabel="Add Staff"
  />
  <editStaffPopup
    v-model="showEditPopup"
    :staffInfo="selectedStaff"
    :initialEditMode="popupEditMode"
    @save="onSaveStaff"
  />
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import tableComp from "src/components/tableComponent.vue";
import editStaffPopup from "../components/viewEditStaffPopup.vue";
import { useRoute } from "vue-router";
import { useQuasar } from "quasar";
import services from "../services/service.js";

const router = useRouter();
const typeOfFilter = ref("");
const valueOfFilter = ref("");
const searchQuery = ref("");
const showEditPopup = ref(false);
const selectedStaff = ref(null);
const popupEditMode = ref(false);
const $q = useQuasar();
const pagination = ref({
  page: 1,
  rowsPerPage: 20,
  rowsNumber: 100,
});

const columns = [
  {
    name: "staffId",
    label: "Staff ID",
    field: (row) => row.staff_id,
    align: "left",
    sortable: false,
  },
  {
    name: "studentName",
    label: "Student Name",
    field: (row) => row.full_name,
    align: "left",
    sortable: false,
    classes: "bold-text",
  },
  {
    name: "mobile",
    label: "Mobile",
    field: (row) => row.mobile,
    align: "left",
    sortable: false,
  },
  {
    name: "last_seen_date",
    label: "Last seen Date",
    field: (row) => row.last_seen_date,
    align: "left",
    sortable: false,
  },
  {
    name: "job",
    label: "Job",
    field: (row) => row.job,
    align: "left",
    sortable: false,
  },
  {
    name: "current_Salary",
    label: "Balance",
    field: (row) => row.current_salary,
    align: "left",
    sortable: false,
  },
  {
    name: "courses_ratio",
    label: "Courses Ratio",
    field: (row) => row.courses_ratio,
    align: "left",
    sortable: false,
  },
  {
    name: "actions",
    label: "Action",
    align: "center",
  },
];

const allStaff = ref([]);
const getAllStaff = (page = 1) => {
  $q.loading.show();

  services
    .getAllStaff(
      page,
      typeOfFilter.value,
      valueOfFilter.value,
      searchQuery.value,
    )
    .then((res) => {
      allStaff.value = res.data.data.results;

      // Update pagination with API response
      pagination.value.rowsNumber = res.data.data.count || 0;
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

const jobTypeOptions = ref([]);
const getAlljob = () => {
  services
    .getAlljob()
    .then((res) => {
      jobTypeOptions.value = res.data.data;
    })
    .catch((error) => {
      console.error("Error fetching shifts:", error);
    });
};

const statusOptions = ref([
  {name: "Active", id: 1},
  {name: "Waiting", id: 2},
  {name: "Idle", id: 3},
  {name: "New", id: 4},
]);

const addStaff = () => {
  router.push({ name: "addStaff" });
  console.log("Add Staff clicked");
};

const onSearch = (val) => {
  searchQuery.value = val;
  getAllStaff(1);
};

const onFilterChange = ({ type, val }) => {
  if (val != null) {
    typeOfFilter.value = type;
    valueOfFilter.value = val;
    getAllStaff(1);
  } else {
    typeOfFilter.value = "";
    valueOfFilter.value = "";
    getAllStaff(1);
  }
};

const clearFilters = () => {
  typeOfFilter.value = "";
  valueOfFilter.value = "";
  getAllStaff(1);
};

const viewEvent = (row) => {
  selectedStaff.value = row;
  popupEditMode.value = false;
  showEditPopup.value = true;
};

const editEvent = (row) => {
  selectedStaff.value = row;
  popupEditMode.value = true; // Open in edit mode
  showEditPopup.value = true;
};

const onSaveStaff = (data) => {
  console.log("Saving staff data:", data);
  // Update the row in tableRows if needed
  const index = tableRows.value.findIndex((r) => r.id === data.id);
  if (index !== -1) {
    tableRows.value[index] = {
      ...tableRows.value[index],
      ...data,
      name: `${data.firstName} ${data.middleName} ${data.lastName}`.trim(),
    };
  }
};

const getPagFun = ([apiCall, page, paginationData]) => {
  getAllStaff(page);
};

const fireCall = ([apiCall, page, paginationData]) => {
  getAllStaff(page);
};

const fireSortCall = ([apiCall, sorting]) => {
  getAllStaff(1);
};

onMounted(() => {
  getAllStaff();
  getAlljob();
});
</script>

<style lang="scss" scoped></style>
