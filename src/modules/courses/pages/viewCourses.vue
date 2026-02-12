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
        <q-btn
          flat
          @click="editCourse"
          v-if="courceData.status !== 'Finished'"
          no-caps
          class="edit-course-btn"
        >
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
            v-model="courceData.teacher_name"
            :options="teacherOptions"
            option-label="label"
            option-value="id"
            outlined
            dense
            emit-value
            map-options
            fill-input
            use-input
            input-debounce="400"
            class="custom-select"
            :loading="teacherLoading"
            @filter="serachForTeacher"
            placeholder="Select Teacher After Searching..."
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
            readonly
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
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
              </q-icon>
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

    <q-dialog v-model="pdfDialog" persistent maximized>
      <q-card>
        <q-bar>
          <div>Preview</div>
          <q-space />
          <q-btn dense flat icon="close" v-close-popup />
        </q-bar>

        <q-card-section class="q-pa-none">
          <iframe
            v-if="pdfUrl"
            :src="pdfUrl"
            style="width: 100%; height: calc(100vh - 50px); border: 0"
          />
        </q-card-section>
      </q-card>
    </q-dialog>

    <tableComp
      :tableRows="courceData.registrations"
      :tableColumns="columns"
      :showAddButton="true"
      :displayPagination="false"
      :tablePagination="{ rowsPerPage: 0 }"
      addBtnLabel="Add Student"
      :showBalanceFilter="true"
      :balanceOptions="balanceOptions"
      :showFilters="true"
      :student="true"
      @addNew="addEvent"
      @scoreChanged="scoreChanged"
      @searchEvent="onSearchEvent"
      emptyStateTitle="No students found"
      emptyStateDescription="Adjust your filters or add new students to get started."
      emptyStateButtonLabel="Add Student"
      @filterChange="onFilterChange"
      @clearFilters="clearFilters"
    />
  </q-page>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
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
    name: "student_name",
    label: "Student Name",
    field: (row) => row.student_name,
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
    name: "score",
    label: "Score",
    field: (row) => row.score,
    align: "left",
    sortable: false,
  },
  {
    name: "balanceDisplayInCourse",
    label: "Course Balance",
    field: (row) => row.course_balance,
    align: "left",
    sortable: false,
  },
];

const balanceOptions = ref([
  { name: "Negative", id: "neg" },
  { name: "Zero", id: "zero" },
  { name: "Positive", id: "positive" },
]);

const addEvent = () => {
  router.push({ name: "addStudent" });
};

const scoreChanged = (row) => {
  const index = courceData.value.registrations.findIndex(
    (r) => r.regid === row.regid,
  );

  if (index !== -1) {
    courceData.value.registrations[index].score = row.score;
  }

  const payload = {
    scores: courceData.value.registrations.map((r) => ({
      regid: r.regid,
      score: r.score !== "" ? Number(r.score) : null,
    })),
  };

  services
    .updateScores(payload, route.params.id)
    .then(() => {
      $q.notify({
        badgeStyle: "display:none",
        classes: "custom-Notify",
        textColor: "black-1",
        icon: "img:/images/SuccessIcon.png",
        position: "bottom-right",
        message: "Scores Updated Successfully",
      });
    })
    .catch((error) => {
      $q.notify({
        badgeStyle: "display:none",
        classes: "custom-Notify",
        textColor: "black-1",
        icon: "img:/images/Error.png",
        position: "bottom-right",
        message:
          error.response?.data?.errors?.__all__?.[0] || "An error occurred.",
      });
    });
};

const onSearchEvent = (searchValue) => {
  if (!searchValue || searchValue.trim() === "") {
    courceData.value.registrations = [...originalRegistrations.value];
    return;
  }

  const value = searchValue.toString().toLowerCase();

  courceData.value.registrations = originalRegistrations.value.filter((row) =>
    Object.values(row).some(
      (v) => v !== null && v.toString().toLowerCase().includes(value),
    ),
  );
};


const oldcourseData = ref([]);
const onFilterChange = ({ type, val }) => {
  if (type !== "balance") return;

  courceData.value.registrations = oldcourseData.value.filter(row => {
    const balance = Number(row.course_balance);

    if (val === "neg") return balance < 0;
    if (val === "zero") return balance === 0;
    if (val === "positive") return balance > 0;

    return true;
  });
};


const clearFilters = () => {
  courceData.value.registrations = [...oldcourseData.value];
};




const originalRegistrations = ref([]);
const courceData = ref([]);
const courseActions = ref([]);
const getCourceData = () => {
  $q.loading.show();
  services
    .getCourceData(route.params.id)
    .then((res) => {
      courceData.value = res.data.data.course;
      oldcourseData.value = res.data.data.course.registrations;
      courseActions.value = res.data.data.actions;
      originalRegistrations.value = [...courceData.value.registrations];
      $q.loading.hide();
    })
    .catch((error) => {
      $q.loading.hide();
      console.error("Error fetching course data:", error);
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

const pdfDialog = ref(false);
const pdfUrl = ref(null);
const handleAction = async (action) => {
  try {
    $q.loading.show();

    const res = await services.executeAction(action, route.params.id);

    $q.loading.hide();

    const contentType = res.headers["content-type"];

    if (contentType?.includes("application/pdf")) {
      const blob = new Blob([res.data], { type: "application/pdf" });

      pdfUrl.value = URL.createObjectURL(blob);
      pdfDialog.value = true;
    } else if (contentType?.includes("text/html")) {
      const blob = new Blob([res.data], { type: "text/html" });

      pdfUrl.value = URL.createObjectURL(blob);
      pdfDialog.value = true;
    } else {
      $q.notify({
        type: "warning",
        message: "Unsupported file type",
      });
    }
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
watch(pdfDialog, (val) => {
  if (!val && pdfUrl.value) {
    URL.revokeObjectURL(pdfUrl.value);
    pdfUrl.value = null;
  }
});

const teacherOptions = ref([]);
const teacherLoading = ref(false);
const serachForTeacher = async (val, update) => {
  if (!val || val.length < 2) {
    update(() => {
      teacherOptions.value = [];
    });
    return;
  }

  teacherLoading.value = true;

  try {
    const res = await services.serachForTeacher(val);

    update(() => {
      teacherOptions.value = res.data.data;
    });
  } catch (e) {
    $q.notify({
      badgeStyle: "display:none",
      classes: "custom-Notify",
      textColor: "black-1",
      icon: "img:/images/Error.png",
      position: "bottom-right",
      message: e.response?.data?.result || "An error occurred.",
    });
  } finally {
    teacherLoading.value = false;
  }
};

onMounted(() => {
  getCourceData();
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
