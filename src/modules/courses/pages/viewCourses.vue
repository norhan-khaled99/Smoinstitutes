<template>
  <q-page>
    <div class="course-header-section row items-center justify-between">
      <div class="course-data">
        <div class="row items-center">
          <p class="course-name">
            {{ courceData.courseserial }} {{ courceData.level_name }}
          </p>
          <q-badge
            :class="[
              'state',
              courceData.status === 'Finished'
                ? 'finished-status'
                : courceData.status === 'Active'
                  ? 'active-status'
                  : 'waiting-status',
            ]"
            :label="courceData.status"
          />
        </div>
        <p class="course-serial">
          Course Serial : {{ courceData.courseserial }}
        </p>
      </div>
      <div class="row items-center q-gutter-md">
        <q-btn flat @click="editCourse" no-caps class="edit-course-btn">
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
            <q-item
              v-for="action in courseActions"
              :key="action.link"
              clickable
              v-close-popup
            >
              <q-item-section>
                <q-item-label @click="handleAction(action)">{{
                  action.display_name
                }}</q-item-label>
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
          <q-select
            v-model="courceData.teacher"
            :options="teacherOptions"
            option-label="full_name"
            option-value="staff_id"
            outlined
            dense
            emit-value
            map-options
            :label="
              courceData.teacher == undefined || courceData.teacher == ''
                ? 'Select Teacher'
                : ''
            "
            class="custom-select"
          />
        </div>
        <div class="info-item col-6 col-sm-6 col-md-4">
          <div class="label">Shift</div>
          <q-select
            v-model="courceData.shift"
            :options="shiftOptions"
            outlined
            dense
            :label="
              courceData.shift == undefined || courceData.shift == ''
                ? 'Select Shift'
                : ''
            "
            class="custom-select"
          />
        </div>
        <div class="info-item col-6 col-sm-6 col-md-4">
          <div class="label">Fee</div>
          <q-input
            v-model="courceData.fee"
            type="number"
            outlined
            dense
            placeholder="Enter Course Fee"
            class="custom-input"
          />
        </div>
        <div class="info-item col-6 col-sm-6 col-md-4">
          <div class="label">Start Date</div>
          <q-input
            v-model="courceData.startdate"
            outlined
            dense
            placeholder="YYYY-MM-DD"
            class="custom-input"
          >
            <template v-slot:append>
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="cursor-pointer"
              >
                <path
                  d="M12.75 10.5C13.1642 10.5 13.5 10.1642 13.5 9.75C13.5 9.33579 13.1642 9 12.75 9C12.3358 9 12 9.33579 12 9.75C12 10.1642 12.3358 10.5 12.75 10.5Z"
                  fill="#6B7280"
                />
                <path
                  d="M12.75 13.5C13.1642 13.5 13.5 13.1642 13.5 12.75C13.5 12.3358 13.1642 12 12.75 12C12.3358 12 12 12.3358 12 12.75C12 13.1642 12.3358 13.5 12.75 13.5Z"
                  fill="#6B7280"
                />
                <path
                  d="M9.75 9.75C9.75 10.1642 9.41421 10.5 9 10.5C8.58579 10.5 8.25 10.1642 8.25 9.75C8.25 9.33579 8.58579 9 9 9C9.41421 9 9.75 9.33579 9.75 9.75Z"
                  fill="#6B7280"
                />
                <path
                  d="M9.75 12.75C9.75 13.1642 9.41421 13.5 9 13.5C8.58579 13.5 8.25 13.1642 8.25 12.75C8.25 12.3358 8.58579 12 9 12C9.41421 12 9.75 12.3358 9.75 12.75Z"
                  fill="#6B7280"
                />
                <path
                  d="M5.25 10.5C5.66421 10.5 6 10.1642 6 9.75C6 9.33579 5.66421 9 5.25 9C4.83579 9 4.5 9.33579 4.5 9.75C4.5 10.1642 4.83579 10.5 5.25 10.5Z"
                  fill="#6B7280"
                />
                <path
                  d="M5.25 13.5C5.66421 13.5 6 13.1642 6 12.75C6 12.3358 5.66421 12 5.25 12C4.83579 12 4.5 12.3358 4.5 12.75C4.5 13.1642 4.83579 13.5 5.25 13.5Z"
                  fill="#6B7280"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M5.25 1.3125C5.56066 1.3125 5.8125 1.56434 5.8125 1.875V2.44704C6.309 2.43749 6.856 2.43749 7.45759 2.4375H10.5423C11.1439 2.43749 11.691 2.43749 12.1875 2.44704V1.875C12.1875 1.56434 12.4393 1.3125 12.75 1.3125C13.0607 1.3125 13.3125 1.56434 13.3125 1.875V2.49532C13.5075 2.51018 13.6921 2.52886 13.8668 2.55235C14.7461 2.67057 15.4578 2.91966 16.0191 3.48093C16.5803 4.0422 16.8294 4.75392 16.9476 5.63323C17.0625 6.48764 17.0625 7.57935 17.0625 8.95766V10.5423C17.0625 11.9206 17.0625 13.0124 16.9476 13.8668C16.8294 14.7461 16.5803 15.4578 16.0191 16.0191C15.4578 16.5803 14.7461 16.8294 13.8668 16.9476C13.0124 17.0625 11.9206 17.0625 10.5423 17.0625H7.45769C6.07939 17.0625 4.98764 17.0625 4.13323 16.9476C3.25392 16.8294 2.54221 16.5803 1.98093 16.0191C1.41966 15.4578 1.17057 14.7461 1.05235 13.8668C0.937479 13.0124 0.937488 11.9206 0.9375 10.5423V8.95769C0.937488 7.57937 0.937479 6.48764 1.05235 5.63323C1.17057 4.75392 1.41966 4.0422 1.98093 3.48093C2.54221 2.91966 3.25392 2.67057 4.13323 2.55235C4.30793 2.52886 4.49254 2.51018 4.6875 2.49532V1.875C4.6875 1.56434 4.93934 1.3125 5.25 1.3125ZM4.28314 3.66732C3.52857 3.76877 3.09383 3.95902 2.77643 4.27643C2.45902 4.59383 2.26877 5.02857 2.16732 5.78314C2.15014 5.91093 2.13577 6.04546 2.12376 6.1875H15.8762C15.8642 6.04546 15.8499 5.91093 15.8327 5.78314C15.7312 5.02857 15.541 4.59383 15.2236 4.27643C14.9062 3.95902 14.4714 3.76877 13.7169 3.66732C12.9461 3.56369 11.9301 3.5625 10.5 3.5625H7.5C6.06989 3.5625 5.05389 3.56369 4.28314 3.66732ZM2.0625 9C2.0625 8.35949 2.06274 7.80205 2.07231 7.3125H15.9277C15.9373 7.80205 15.9375 8.35949 15.9375 9V10.5C15.9375 11.9301 15.9363 12.9461 15.8327 13.7169C15.7312 14.4714 15.541 14.9062 15.2236 15.2236C14.9062 15.541 14.4714 15.7312 13.7169 15.8327C12.9461 15.9363 11.9301 15.9375 10.5 15.9375H7.5C6.06989 15.9375 5.05388 15.9363 4.28314 15.8327C3.52857 15.7312 3.09383 15.541 2.77643 15.2236C2.45902 14.9062 2.26877 14.4714 2.16732 13.7169C2.0637 12.9461 2.0625 11.9301 2.0625 10.5V9Z"
                  fill="#6B7280"
                />
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="courceData.startdate" mask="YYYY-MM-DD">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </svg>
            </template>
          </q-input>
        </div>
        <div class="info-item col-3 col-md-4">
          <div class="label">Days</div>
          <q-input
            v-model="courceData.days"
            type="number"
            outlined
            dense
            placeholder="Enter Number of Days"
            class="custom-input"
          />
        </div>
        <div class="info-item col-3 col-md-4">
          <div class="label">Score Ratio</div>
          <q-input
            v-model="courceData.score_ratio"
            outlined
            dense
            class="custom-input"
          />
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
import services from "../services/service.js";
import { useRoute } from "vue-router";
import rules from "src/config/rules";

const router = useRouter();
const $q = useQuasar();
const route = useRoute();
const loading = ref(false);

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

const courceData = ref([]);
const courseActions = ref([]);
const getCourceData = () => {
  $q.loading.show();
  services
    .getCourceData(route.params.id)
    .then((res) => {
      courceData.value = res.data.data.course;
      courseActions.value = res.data.data.actions;
      $q.loading.hide();
    })
    .catch((error) => {
      $q.loading.hide();
      console.error("Error fetching course data:", error);
    });
};

const teacherOptions = ref([]);
const getAllTeachers = () => {
  services
    .getAllTeachers()
    .then((res) => {
      teacherOptions.value = res.data.data;
    })
    .catch((error) => {
      console.error("Error fetching teachers:", error);
    });
};

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

const editCourse = () => {
  const missing = [];
  if (!courceData.value.level) missing.push("Level");
  if (!courceData.value.startdate) missing.push("Start Date");
  if (!courceData.value.days) missing.push("Days");
  if (!courceData.value.shift) missing.push("Shift");
  if (!courceData.value.fee) missing.push("fee");
  if (!courceData.value.teacher) missing.push("Teacher");

  if (missing.length) {
    $q.notify({
      badgeStyle: "display:none",
      classes: "custom-Notify",
      textColor: "black-1",
      icon: "img:/images/Error.png",
      position: "bottom-right",
      message: `${missing.join(", ")} is required.`,
    });
    return;
  }

  const data = {
    level: courceData.value.level,
    courseserial: courceData.value.courseserial,
    detail: courceData.value.detail,
    startdate: courceData.value.startdate,
    days: courceData.value.days,
    shift: courceData.value.shift,
    fee: courceData.value.fee,
    teacher: courceData.value.teacher,
    score_ratio: courceData.value.score_ratio,
  };

  $q.loading.show();
  services
    .updateCourse(data, route.params.id)
    .then((res) => {
      $q.notify({
        badgeStyle: "display:none",
        classes: "custom-Notify",
        textColor: "black-1",
        icon: "img:/images/SuccessIcon.png",
        position: "bottom-right",
        message: "Course Updated Successfully",
      });
      router.push({ name: "courses" });
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
        message: error.errors?.__all__?.[0] || "An error occurred.",
      });
    });
};

const handleAction = async (action) => {
  try {
    $q.loading.show();
    const res = await services.executeAction(action, route.params.id);

    $q.loading.hide();

    const contentType = res.headers["content-type"];

    if (contentType && contentType.includes("application/pdf")) {
      const blob = new Blob([res.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      window.open(url, "_blank");
      setTimeout(() => window.URL.revokeObjectURL(url), 100);
    } else if (contentType && contentType.includes("text/html")) {
      const blob = new Blob([res.data], { type: "text/html" });
      const url = window.URL.createObjectURL(blob);
      window.open(url, "_blank");
      setTimeout(() => window.URL.revokeObjectURL(url), 100);
    } else {
      const url = action.link.replace("#", route.params.id);
      window.open(url, "_blank");
    }
    $q.notify({
      badgeStyle: "display:none",
      classes: "custom-Notify",
      textColor: "black-1",
      icon: "img:/images/SuccessIcon.png",
      position: "bottom-right",
      message: "Report loaded successfully",
    });
  } catch (error) {
    $q.loading.hide();
    $q.notify({
      badgeStyle: "display:none",
      classes: "custom-Notify",
      textColor: "black-1",
      icon: "img:/images/Error.png",
      position: "bottom-right",
      message:
        error.response?.data?.errors?.__all__?.[0] || "An error occurred.",
    });
  }
};

onMounted(() => {
  getCourceData();
  getAllTeachers();
  getAllShifts();
});
</script>

<style scoped lang="scss">
.info-input {
  :deep(.q-field__control) {
    min-height: 40px;
  }

  :deep(.q-field__native) {
    font-size: 14px;
    color: #1f2937;
  }
}
</style>
