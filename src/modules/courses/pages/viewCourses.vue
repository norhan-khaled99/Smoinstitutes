<template>
  <q-page>
    <div class="course-header-section row items-center justify-between">
      <div class="course-data">
        <div class="row items-center">
          <p class="course-name">ICDL</p>
          <q-badge class="state waiting-status" label="Pending" />
        </div>
        <p class="course-serial">Course Serial : 6381</p>
      </div>
      <div class="row items-center q-gutter-md">
        <q-btn flat no-caps class="edit-course-btn">
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="q-mr-sm"
          >
            <g clip-path="url(#clip0_3124_1139)">
              <path
                d="M10.77 3.05899L11.4652 2.36383C12.617 1.21206 14.4844 1.21206 15.6362 2.36383C16.7879 3.51561 16.7879 5.38301 15.6362 6.53479L14.941 7.22995M10.77 3.05899C10.77 3.05899 10.8569 4.53621 12.1604 5.83963C13.4638 7.14306 14.941 7.22995 14.941 7.22995M10.77 3.05899L4.37912 9.44992C3.94625 9.8828 3.72981 10.0992 3.54367 10.3379C3.3241 10.6194 3.13585 10.924 2.98226 11.2463C2.85205 11.5195 2.75526 11.8099 2.56167 12.3906L1.74136 14.8516M14.941 7.22995L8.55008 13.6209C8.1172 14.0538 7.90077 14.2702 7.66212 14.4563C7.38061 14.6759 7.07602 14.8641 6.75373 15.0177C6.48052 15.1479 6.19014 15.2447 5.60938 15.4383L3.14844 16.2586M3.14844 16.2586L2.54688 16.4592C2.26108 16.5544 1.94599 16.48 1.73297 16.267C1.51995 16.054 1.44557 15.7389 1.54084 15.4531L1.74136 14.8516M3.14844 16.2586L1.74136 14.8516"
                stroke="white"
                stroke-width="1.5"
              />
            </g>
            <defs>
              <clipPath id="clip0_3124_1139">
                <rect width="18" height="18" fill="white" />
              </clipPath>
            </defs>
          </svg>
          Edit Course
        </q-btn>

        <q-btn-dropdown
          flat
          no-caps
          class="more-dropdown"
          hide-dropdown-icon
          dropdown-icon="none"
        >
          <template v-slot:label>
            <div class="row items-center no-wrap full-width justify-between">
              <span>More</span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="q-ml-sm"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M5.29279 7.29259C5.48031 7.10512 5.73462 6.99981 5.99979 6.99981C6.26495 6.99981 6.51926 7.10512 6.70679 7.29259L9.99979 10.5856L13.2928 7.29259C13.385 7.19708 13.4954 7.1209 13.6174 7.06849C13.7394 7.01608 13.8706 6.9885 14.0034 6.98734C14.1362 6.98619 14.2678 7.01149 14.3907 7.06177C14.5136 7.11205 14.6253 7.18631 14.7192 7.2802C14.8131 7.37409 14.8873 7.48574 14.9376 7.60864C14.9879 7.73154 15.0132 7.86321 15.012 7.99599C15.0109 8.12877 14.9833 8.25999 14.9309 8.382C14.8785 8.504 14.8023 8.61435 14.7068 8.70659L10.7068 12.7066C10.5193 12.8941 10.265 12.9994 9.99979 12.9994C9.73462 12.9994 9.48031 12.8941 9.29279 12.7066L5.29279 8.70659C5.10532 8.51907 5 8.26476 5 7.99959C5 7.73443 5.10532 7.48012 5.29279 7.29259Z"
                  fill="#6B7280"
                />
              </svg>
            </div>
          </template>

          <q-list>
            <q-item clickable v-close-popup>
              <q-item-section>
                <q-item-label>Print</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section>
                <q-item-label>Delete Course</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </div>
    </div>

    <div class="course-info-card">
      <div class="card-header">
        <p>Course Info</p>
      </div>
      <q-separator color="grey-2" />
      <div class="info-grid row q-col-gutter-x-md q-col-gutter-y-sm">
        <div class="info-item col-12 col-sm-6 col-md-4">
          <div class="label">Teacher</div>
          <div class="value">Aseel Gamal Hammoud Musleh</div>
        </div>
        <div class="info-item col-6 col-sm-3 col-md">
          <div class="label">Shift</div>
          <div class="value">SH 3</div>
        </div>
        <div class="info-item col-6 col-sm-3 col-md">
          <div class="label">Fee</div>
          <div class="value">3400</div>
        </div>
        <div class="info-item col-6 col-md">
          <div class="label">Start Date</div>
          <div class="value">11-01-2026</div>
        </div>
        <div class="info-item col-3 col-md">
          <div class="label">Days</div>
          <div class="value">30</div>
        </div>
        <div class="info-item col-3 col-md">
          <div class="label">Score Ratio</div>
          <div class="value">( 3 : 0 )</div>
        </div>
      </div>
    </div>

    <tableComp
      :tableRows="tableRows"
      :tableColumns="columns"
      :tablePagination="pagination"
      :showAddButton="true"
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
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import tableComp from "src/components/tableComponent.vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";

const router = useRouter();
const $q = useQuasar();

const columns = [
  {
    name: "image",
    label: "Student Name",
    field: (row) => row.studentName,
    align: "left",
    sortable: false,
  },
  {
    name: "studentId",
    label: "Student ID",
    field: (row) => row.studentId,
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
    name: "balanceDisplay",
    label: "Course Balance",
    field: (row) => row.balance,
    align: "left",
    sortable: false,
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
    studentImage: "https://cdn.quasar.dev/img/avatar.png",
    studentName: "Yara Abdullah Ahmed Ali",
    studentId: 251221,
    score: 0,
    balance: -4950,
  },
  {
    id: 2,
    studentImage: "https://cdn.quasar.dev/img/avatar.png",
    studentName: "Moaz Essam Hammoud Musleh",
    studentId: 251220,
    score: 0,
    balance: 2000,
  },
  {
    id: 3,
    studentImage: "https://cdn.quasar.dev/img/avatar.png",
    studentName: "Ali Saleh Mohammed Muthana",
    studentId: 251219,
    score: 0,
    balance: 0,
  },
  {
    id: 4,
    studentImage: "https://cdn.quasar.dev/img/avatar.png",
    studentName: "Qassem Abdulghani Mohammed Motlaq",
    studentId: 251218,
    score: 0,
    balance: -5250,
  },
  {
    id: 5,
    studentImage: "https://cdn.quasar.dev/img/avatar.png",
    studentName: "Eman Saleh Ben Saleh Salem",
    studentId: 251213,
    score: 0,
    balance: 0,
  },
  {
    id: 6,
    studentImage: "https://cdn.quasar.dev/img/avatar.png",
    studentName: "Abdullah Saleh Mobarek Hussien Alharthy",
    studentId: 251212,
    score: 0,
    balance: 1500,
  },
  {
    id: 7,
    studentImage: "https://cdn.quasar.dev/img/avatar.png",
    studentName: "Youssef Mobarek Hussien Alharthy",
    studentId: 251231,
    score: 0,
    balance: 1000,
  },
]);

// Pagination configuration
const pagination = ref({
  page: 1,
  rowsPerPage: 10,
  rowsNumber: 10,
});

// Event handlers
const openDialogDeleteEvent = (row) => {
  console.log("Delete event:", row);
};

const DetailsEvent = (row) => {
  router.push({ name: "studentDetails", params: { id: row.id } });
};

const addEvent = () => {
  router.push({ name: "addStudent" });
};

const EditEvent = (row) => {
  console.log("Edit event:", row);
};

const onSearchEvent = (searchValue) => {
  console.log("Search event:", searchValue);
};

const updatePag = (rowsPerPage) => {
  pagination.value.rowsPerPage = rowsPerPage;
};

const getPagFun = ([apiCall, page, paginationData]) => {
  pagination.value.page = page;
  pagination.value = { ...pagination.value, ...paginationData };
};

const fireSortCall = ([apiCall, sortBy]) => {
  console.log("Sort API call:", { apiCall, sortBy });
};

const fireCall = ([apiCall, page, paginationData]) => {
  pagination.value.page = page;
  pagination.value = { ...pagination.value, ...paginationData };
};

onMounted(() => {
  console.log("viewCourses with student list mounted");
});
</script>
