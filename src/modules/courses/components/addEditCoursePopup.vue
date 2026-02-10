<template>
  <q-dialog v-model="model" persistent>
    <q-card class="custom-popup course-popup">
      <q-card-section>
        <q-form ref="formRef" greedy class="form-content">
          <div class="popup-header">
            <p class="popup-title">
              {{ isEdit ? "Edit Course" : "Add New Course" }}
            </p>
            <q-btn
              flat
              dense
              v-close-popup
              @click="resetForm()"
              class="close-btn"
            >
              <svg
                width="13"
                height="12"
                viewBox="0 0 13 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M0.292787 0.305288C0.480314 0.117817 0.734622 0.0125018 0.999786 0.0125018C1.26495 0.0125018 1.51926 0.117817 1.70679 0.305288L5.99979 4.59829L10.2928 0.305288C10.385 0.209778 10.4954 0.133596 10.6174 0.0811869C10.7394 0.0287779 10.8706 0.00119157 11.0034 3.77571e-05C11.1362 -0.00111606 11.2678 0.0241854 11.3907 0.0744663C11.5136 0.124747 11.6253 0.199 11.7192 0.292893C11.8131 0.386786 11.8873 0.498438 11.9376 0.621334C11.9879 0.744231 11.9833 0.87591 12.012 1.00869C12.0109 1.14147 11.9833 1.27269 11.9309 1.39469C11.8785 1.5167 11.8023 1.62704 11.7068 1.71929L7.41379 6.01229L11.7068 10.3053C11.8889 10.4939 11.9897 10.7465 11.9875 11.0087C11.9852 11.2709 11.88 11.5217 11.6946 11.7071C11.5092 11.8925 11.2584 11.9977 10.9962 12C10.734 12.0022 10.4814 11.9014 10.2928 11.7193L5.99979 7.42629L1.70679 11.7193C1.51818 11.9014 1.26558 12.0022 1.00339 12C0.741188 11.9977 0.490376 11.8925 0.304968 11.7071C0.11956 11.5217 0.0143906 11.2709 0.0121121 11.0087C0.00983372 10.7465 0.110629 10.4939 0.292787 10.3053L4.58579 6.01229L0.292787 1.71929C0.105316 1.53176 0 1.27745 0 1.01229C0 0.747124 0.105316 0.492816 0.292787 0.305288Z"
                  fill="#9CA3AF"
                />
              </svg>
            </q-btn>
          </div>
          <div class="popup-subtitle">
            Course Serial : {{ nextCourseSerialValue }}
          </div>

          <div class="popup-divider"></div>

          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-6">
              <div class="form-group">
                <label>Level <span>*</span></label>
                <q-select
                  v-model="form.level"
                  :rules="rules.required"
                  :options="levelOptions"
                  option-label="label"
                  option-value="value"
                  outlined
                  dense
                  emit-value
                  map-options
                  fill-input
                  use-input
                  :input-value="levelSearch"
                  @update:input-value="(val) => (levelSearch = val)"
                  @update:model-value="() => (levelSearch = '')"
                  input-debounce="400"
                  class="custom-select"
                  :loading="levelLoading"
                  @filter="serachForLevels"
                  placeholder="Select Level After Searching..."
                />
              </div>
            </div>
            <div class="col-12 col-md-6">
              <div class="form-group">
                <label>Teacher <span>*</span></label>
                <q-select
                  :rules="rules.required"
                  v-model="form.teacher"
                  :options="teacherOptions"
                  option-label="full_name"
                  option-value="staff_id"
                  outlined
                  dense
                  emit-value
                  map-options
                  :label="
                    form.teacher == undefined || form.teacher == ''
                      ? 'Select Teacher'
                      : ''
                  "
                  class="custom-select"
                />
              </div>
            </div>

            <div class="col-12 col-md-6">
              <div class="form-group">
                <label>Start Date <span>*</span></label>
                <q-input
                  v-model="form.startdate"
                  :rules="rules.required"
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
                        <q-date v-model="form.startdate" mask="YYYY-MM-DD">
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              label="Close"
                              color="primary"
                              flat
                            />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </svg>
                  </template>
                </q-input>
              </div>
            </div>
            <div class="col-12 col-md-6">
              <div class="form-group">
                <label>Shift <span>*</span></label>
                <q-select
                  v-model="form.shift"
                  :rules="rules.required"
                  :options="shiftOptions"
                  outlined
                  dense
                  :label="
                    form.shift == undefined || form.shift == ''
                      ? 'Select Shift'
                      : ''
                  "
                  class="custom-select"
                />
              </div>
            </div>

            <div class="col-12 col-md-6">
              <div class="form-group">
                <label>Days <span>*</span></label>
                <q-input
                  v-model="form.days"
                  type="number"
                  :rules="rules.required"
                  outlined
                  dense
                  placeholder="Enter Number of Days"
                  class="custom-input"
                />
              </div>
            </div>
            <div class="col-12 col-md-6">
              <div class="form-group">
                <label>Fee <span>*</span></label>
                <q-input
                  v-model="form.fee"
                  type="number"
                  :rules="rules.required"
                  outlined
                  dense
                  placeholder="Enter Course Fee"
                  class="custom-input"
                />
              </div>
            </div>
          </div>

          <div class="popup-actions">
            <q-btn
              label="Cancel"
              v-close-popup
              @click="resetForm()"
              flat
              class="btn-cancel"
              no-caps
            />
            <q-btn
              v-if="!isEdit"
              label="Save & Add Another"
              flat
              class="btn-save-add"
              no-caps
              @click.prevent="saveCourse(false)"
            />
            <q-btn
              label="Save & Close"
              flat
              class="btn-save-close"
              no-caps
              @click.prevent="saveCourse(true)"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useQuasar } from "quasar";
import services from "../services/service.js";
import rules from "src/config/rules.js";

const $q = useQuasar();
const router = useRouter();
const model = defineModel();

const props = defineProps({
  isEdit: {
    type: Boolean,
    default: false,
  },
  initialData: {
    type: Object,
    default: () => ({}),
  },
  teacherOptions: {
    type: Array,
    default: () => [],
  },
  shiftOptions: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["save"]);

const initialForm = {
  courseserial: "",
  level: "",
  teacher: "",
  startdate: "",
  shift: "",
  days: "",
  fee: "",
};

const form = ref({ ...initialForm });

watch(
  () => props.initialData,
  (newVal) => {
    if (newVal && props.isEdit) {
      form.value = { ...newVal };
    } else {
      form.value = { ...initialForm };
    }
  },
  { immediate: true },
);

const formRef = ref(null);
const saveCourse = async (close) => {
  // Validate form before saving
  const isValid = await formRef.value.validate();

  if (!isValid) {
    return;
  }

  form.value.courseserial = nextCourseSerialValue.value;

  emit("saveCourse", form.value);

  // Close modal if closeModal is true
  if (close) {
    // Clear form
    resetForm();
    model.value = false;
  }
};

const resetForm = () => {
  form.value = { ...initialForm };
};

const nextCourseSerialValue = ref("");
const nextCourseSerial = () => {
  services
    .getNextCourseSerial()
    .then((res) => {
      nextCourseSerialValue.value = res.data.data.next_course_serial;
    })
    .catch((error) => {
      console.error("Error fetching next course serial:", error);
    });
};

const levelLoading = ref(false);
const levelOptions = ref([]);
const levelSearch = ref("");

const serachForLevels = async (val, update) => {
  if (!val || val.length < 2) {
    update(() => {
      levelOptions.value = [];
    });
    return;
  }

  levelLoading.value = true;

  try {
    const res = await services.serachForLevels(val);

    update(() => {
      levelOptions.value = res.data.data;
    });
  } catch (e) {
    $q.notify({
      badgeStyle: "display:none",
      classes: "custom-Notify",
      textColor: "black-1",
      icon: "img:/images/Error.png",
      position: "bottom-right",
      message: e.res?.data?.result || "An error occurred.",
    });
  } finally {
    levelLoading.value = false;
  }
};

// Clear the search input when a level is selected
watch(
  () => form.value.level,
  (newVal) => {
    if (newVal !== undefined && newVal !== null && newVal !== "") {
      levelSearch.value = "";
    }
  },
);

onMounted(() => {
  nextCourseSerial();
});
</script>

<style lang="scss" scoped>
.course-popup {
  width: 45rem !important;
  .form-group {
    margin-bottom: 0rem;
    // background-color: red;
  }
  .btn-cancel,
  .btn-save-close {
    max-width: 15rem;
  }

  .btn-save-add {
    max-width: 10.625rem;
  }
}
</style>
