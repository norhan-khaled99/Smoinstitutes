<template>
  <tableComp
    pageTitle="Staff"
    :tableRows="tableRows"
    :tableColumns="columns"
    :tablePagination="pagination"
    :showAdd="true"
    addBtnLabel="Add Staff"
    :actions="true"
    :staff="true"
    :showFilters="true"
    :ShowActionsdropDown="true"
    searchPlaceholder="Search by Name, ID, or Mobile..."
    :showDegreeFilter="true"
    :degreeOptions="degreeOptions"
    :showInstitutionFilter="true"
    :institutionOptions="institutionOptions"
    :showJobTypeFilter="true"
    :jobTypeOptions="jobTypeOptions"
    @addNew="addStaff"
    @searchEvent="onSearch"
    @filterChange="onFilterChange"
    @clearFilters="clearFilters"
    @updatePag="updatePag"
    @getPagFun="getPagFun"
    @sortApi="fireSortCall"
    @callApi="fireCall"
    @editEvent="editEvent"
    @DetailsEvent="viewEvent"
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
import { ref } from "vue";
import { useRouter } from "vue-router";
import tableComp from "src/components/tableComponent.vue";
import editStaffPopup from "../components/viewEditStaffPopup.vue";

const router = useRouter();

const showEditPopup = ref(false);
const selectedStaff = ref(null);
const popupEditMode = ref(false);

const pagination = ref({
  page: 1,
  rowsPerPage: 10,
  rowsNumber: 100,
});

const columns = [
  {
    name: "staffId",
    label: "Staff ID",
    field: (row) => row.staffId,
    align: "left",
    sortable: true,
  },
  {
    name: "studentName",
    label: "Student Name",
    field: (row) => row.name,
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
    name: "startDate",
    label: "Start Date",
    field: (row) => row.startDate,
    align: "left",
    sortable: false,
  },
  {
    name: "institution",
    label: "Institution",
    field: (row) => row.institution,
    align: "left",
    sortable: false,
  },
  {
    name: "balanceDisplay",
    label: "Balance",
    field: (row) => row.balance,
    align: "left",
    sortable: true,
  },
  {
    name: "courses",
    label: "Courses (Total : Active)",
    field: (row) => row.courses,
    align: "left",
    sortable: true,
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
    staffId: "601",
    name: "Fadel Mohammed Alnoud",
    mobile: "+971523084607",
    startDate: "11-01-2026",
    institution: "USA",
    balance: "-84950",
    courses: "( 9 : 4 )",
  },
  {
    id: 2,
    staffId: "602",
    name: "Rina Wageeh Alyafai",
    mobile: "+971557134005",
    startDate: "11-01-2026",
    institution: "EGY",
    balance: "+2000",
    courses: "( 3 : 0 )",
  },
  {
    id: 3,
    staffId: "603",
    name: "Ahmed Mansour Al-Otaibi",
    mobile: "+971556072983",
    startDate: "11-01-2026",
    institution: "USA",
    balance: "0",
    courses: "None",
  },
  {
    id: 4,
    staffId: "604",
    name: "Abdullah Saleh Mobarek Hussien Alharthy",
    mobile: "+971553088206",
    startDate: "11-01-2026",
    institution: "USA",
    balance: "-56250",
    courses: "( 3 : 0 )",
  },
  {
    id: 5,
    staffId: "605",
    name: "Youssef Mohammed Yaslam Mohammed",
    mobile: "+971553296324",
    startDate: "11-01-2026",
    institution: "EGY",
    balance: "0",
    courses: "None",
  },
  {
    id: 6,
    staffId: "606",
    name: "Mohammed Mansour Shaif",
    mobile: "+971559533707",
    startDate: "11-01-2026",
    institution: "USA",
    balance: "+6500",
    courses: "( 3 : 0 )",
  },
  {
    id: 7,
    staffId: "607",
    name: "Samar Sultan Ahmed",
    mobile: "+971503603570",
    startDate: "11-01-2026",
    institution: "EGY",
    balance: "-56250",
    courses: "None",
  },
  {
    id: 8,
    staffId: "608",
    name: "Marwa Gamal Hamood",
    mobile: "+971553296324",
    startDate: "04-01-2026",
    institution: "USA",
    balance: "+5000",
    courses: "( 3 : 0 )",
  },
  {
    id: 9,
    staffId: "609",
    name: "Qassem Abdulghani Mohammed Motlaq",
    mobile: "+971502469158",
    startDate: "01-11-2025",
    institution: "EGY",
    balance: "0",
    courses: "( 2 : 1 )",
  },
  {
    id: 10,
    staffId: "610",
    name: "Eman Saleh Ben Saleh Salem",
    mobile: "+971505437621",
    startDate: "11-01-2026",
    institution: "USA",
    balance: "-56250",
    courses: "( 1 : 0 )",
  },
]);

const degreeOptions = ref([
  { id: 1, name: "Bachelor" },
  { id: 2, name: "Master" },
  { id: 3, name: "PhD" },
]);

const institutionOptions = ref([
  { id: 1, name: "USA" },
  { id: 2, name: "EGY" },
]);

const jobTypeOptions = ref([
  { id: 1, name: "Full-time" },
  { id: 2, name: "Part-time" },
]);

const addStaff = () => {
  router.push({ name: "addStaff" });
  console.log("Add Staff clicked");
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
</script>

<style lang="scss" scoped></style>
