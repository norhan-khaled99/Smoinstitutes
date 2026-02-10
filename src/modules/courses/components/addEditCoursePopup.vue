<template>
  <q-dialog v-model="model" persistent>
    <q-card class="custom-popup course-popup">
      <q-card-section>
        <div class="popup-header">
          <p class="popup-title">
            {{ isEdit ? "Edit Course" : "Add New Course" }}
          </p>
          <q-btn flat dense v-close-popup class="close-btn">
            <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M0.292787 0.305288C0.480314 0.117817 0.734622 0.0125018 0.999786 0.0125018C1.26495 0.0125018 1.51926 0.117817 1.70679 0.305288L5.99979 4.59829L10.2928 0.305288C10.385 0.209778 10.4954 0.133596 10.6174 0.0811869C10.7394 0.0287779 10.8706 0.00119157 11.0034 3.77571e-05C11.1362 -0.00111606 11.2678 0.0241854 11.3907 0.0744663C11.5136 0.124747 11.6253 0.199 11.7192 0.292893C11.8131 0.386786 11.8873 0.498438 11.9376 0.621334C11.9879 0.744231 11.9833 0.87591 12.012 1.00869C12.0109 1.14147 11.9833 1.27269 11.9309 1.39469C11.8785 1.5167 11.8023 1.62704 11.7068 1.71929L7.41379 6.01229L11.7068 10.3053C11.8889 10.4939 11.9897 10.7465 11.9875 11.0087C11.9852 11.2709 11.88 11.5217 11.6946 11.7071C11.5092 11.8925 11.2584 11.9977 10.9962 12C10.734 12.0022 10.4814 11.9014 10.2928 11.7193L5.99979 7.42629L1.70679 11.7193C1.51818 11.9014 1.26558 12.0022 1.00339 12C0.741188 11.9977 0.490376 11.8925 0.304968 11.7071C0.11956 11.5217 0.0143906 11.2709 0.0121121 11.0087C0.00983372 10.7465 0.110629 10.4939 0.292787 10.3053L4.58579 6.01229L0.292787 1.71929C0.105316 1.53176 0 1.27745 0 1.01229C0 0.747124 0.105316 0.492816 0.292787 0.305288Z"
                fill="#9CA3AF" />
            </svg>
          </q-btn>
        </div>
        <div class="popup-subtitle">
          Course Serial : {{ form.courseSerial || "6384" }}
        </div>

        <div class="popup-divider"></div>

        <div class="row q-col-gutter-md">
          <div class="col-12 col-md-6">
            <div class="form-group">
              <label>Level <span>*</span></label>
              <q-select v-model="form.level" :options="levelOptions" option-label="label" option-value="value" outlined
                dense emit-value map-options :label="form.level == undefined || form.level == ''
                    ? 'Select Level'
                    : ''
                  " class="custom-select" />
            </div>
          </div>
          <div class="col-12 col-md-6">
            <div class="form-group">
              <label>Teacher <span>*</span></label>
              <q-select v-model="form.teacher" :options="teacherOptions" option-label="full_name" option-value="staff_id" outlined
                dense emit-value map-options :label="form.teacher == undefined || form.teacher == ''
                    ? 'Select Teacher'
                    : ''
                  " class="custom-select" />
            </div>
          </div>

          <div class="col-12 col-md-6">
            <div class="form-group">
              <label>Start Date <span>*</span></label>
              <q-input v-model="form.startDate" outlined dense placeholder="DD/MM/YYYY" class="custom-input">
                <template v-slot:append>
                  <q-icon name="calendar_today" class="cursor-pointer" color="grey-6">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-date v-model="form.startDate" mask="DD/MM/YYYY">
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Close" color="primary" flat />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
          </div>
          <div class="col-12 col-md-6">
            <div class="form-group">
              <label>Shift</label>
              <q-select v-model="form.shift" :options="shiftOptions" outlined dense :label="form.shift == undefined || form.shift == ''
                  ? 'Select Shift'
                  : ''
                " class="custom-select" />
            </div>
          </div>

          <div class="col-12 col-md-6">
            <div class="form-group">
              <label>Days <span>*</span></label>
              <q-input v-model="form.days" outlined dense placeholder="0" class="custom-input" />
            </div>
          </div>
          <div class="col-12 col-md-6">
            <div class="form-group">
              <label>Fee <span>*</span></label>
              <q-input v-model="form.fee" outlined dense placeholder="0 EGP" class="custom-input" />
            </div>
          </div>
        </div>

        <div class="popup-actions">
          <q-btn label="Cancel" v-close-popup flat class="btn-cancel" no-caps />
          <q-btn v-if="!isEdit" label="Save & Add Another" flat class="btn-save-add" no-caps @click="save(false)" />
          <q-btn label="Save & Close" flat class="btn-save-close" no-caps @click="save(true)" />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, watch } from "vue";

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
  levelOptions: {
    type: Array,
    default: () => [],
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
  courseSerial: "",
  level: null,
  teacher: null,
  startDate: "",
  shift: "N/A",
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

const save = (close) => {
  if (
    !form.value.level ||
    !form.value.teacher ||
    !form.value.startDate ||
    !form.value.days ||
    !form.value.fee
  ) {
    return;
  }
  emit("save", { ...form.value });
  if (close) {
    model.value = false;
  } else {
    resetForm();
  }
};

const resetForm = () => {
  form.value = { ...initialForm };
};
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
