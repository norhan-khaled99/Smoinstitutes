<template>
  <q-dialog v-model="show" @hide="onClose">
    <q-card class="custom-popup">
      <q-card-section>
        <div class="popup-header">
          <h3 class="popup-title">Add Course to Student</h3>
          <q-btn flat dense v-close-popup class="close-btn">
            <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M0.292787 0.305288C0.480314 0.117817 0.734622 0.0125018 0.999786 0.0125018C1.26495 0.0125018 1.51926 0.117817 1.70679 0.305288L5.99979 4.59829L10.2928 0.305288C10.385 0.209778 10.4954 0.133596 10.6174 0.0811869C10.7394 0.0287779 10.8706 0.00119157 11.0034 3.77571e-05C11.1362 -0.00111606 11.2678 0.0241854 11.3907 0.0744663C11.5136 0.124747 11.6253 0.199 11.7192 0.292893C11.8131 0.386786 11.8873 0.498438 11.9376 0.621334C11.9879 0.744231 11.9833 0.87591 12.012 1.00869C12.0109 1.14147 11.9833 1.27269 11.9309 1.39469C11.8785 1.5167 11.8023 1.62704 11.7068 1.71929L7.41379 6.01229L11.7068 10.3053C11.8889 10.4939 11.9897 10.7465 11.9875 11.0087C11.9852 11.2709 11.88 11.5217 11.6946 11.7071C11.5092 11.8925 11.2584 11.9977 10.9962 12C10.734 12.0022 10.4814 11.9014 10.2928 11.7193L5.99979 7.42629L1.70679 11.7193C1.51818 11.9014 1.26558 12.0022 1.00339 12C0.741188 11.9977 0.490376 11.8925 0.304968 11.7071C0.11956 11.5217 0.0143906 11.2709 0.0121121 11.0087C0.00983372 10.7465 0.110629 10.4939 0.292787 10.3053L4.58579 6.01229L0.292787 1.71929C0.105316 1.53176 0 1.27745 0 1.01229C0 0.747124 0.105316 0.492816 0.292787 0.305288Z"
                fill="#9CA3AF" />
            </svg>
          </q-btn>
        </div>
        <p class="popup-subtitle">
          Student: {{ studentName }} (ID : {{ studentId }})
        </p>

        <div class="popup-divider"></div>

        <!-- Success Alert inside Dialog -->
        <div v-if="showSuccess" class="success-alert">
          <div class="row items-center no-wrap full-width">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="18" height="18" rx="8" fill="#DEF7EC" />
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M13.6949 5.70495C13.8262 5.83622 13.8999 6.01424 13.8999 6.19985C13.8999 6.38547 13.8262 6.56348 13.6949 6.69475L8.09494 12.2948C7.96367 12.426 7.78566 12.4997 7.60004 12.4997C7.41443 12.4997 7.23641 12.426 7.10514 12.2948L4.30514 9.49475C4.17763 9.36273 4.10707 9.18591 4.10867 9.00237C4.11026 8.81883 4.18388 8.64326 4.31367 8.51348C4.44345 8.38369 4.61902 8.31007 4.80256 8.30848C4.9861 8.30688 5.16292 8.37744 5.29494 8.50495L7.60004 10.8101L12.7051 5.70495C12.8364 5.57372 13.0144 5.5 13.2 5.5C13.3857 5.5 13.5637 5.57372 13.6949 5.70495Z"
                fill="#0E9F6E" />
            </svg>
            <span class="q-ml-sm success-text">Course has been added successfully to {{ studentName }}.</span>
            <q-space />
            <q-btn flat round dense icon="close" size="xs" class="close-alert-btn" @click="showSuccess = false"
              color="green-8" />
          </div>
        </div>

        <div class="form-body">
          <div class="form-group">
            <label>Course Name <span>*</span></label>
            <q-select outlined dense v-model="form.course" :options="courseOptions" option-label="name" :label="form.course == undefined || form.course == ''
                ? 'Select Course'
                : ''
              " class="custom-select" emit-value map-options>
              <template v-slot:append>
                <q-icon name="keyboard_arrow_down" color="grey-6" />
              </template>
            </q-select>
          </div>

          <div class="form-group">
            <label>Discount Amount</label>
            <q-input outlined dense v-model="form.discount" type="number" class="custom-input" placeholder="0" />
          </div>
        </div>

        <div class="popup-actions">
          <q-btn label="Cancel" v-close-popup class="btn-cancel" flat />
          <q-btn label="Save & Add Another" @click="saveAndAdd" class="btn-save-add" flat />
          <q-btn label="Save & Close" @click="saveAndClose" class="btn-save-close" flat />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  modelValue: Boolean,
  studentName: {
    type: String,
    default: "Moaz Essam",
  },
  studentId: {
    type: String,
    default: "251221",
  },
});

const emit = defineEmits(["update:modelValue", "save"]);

const show = ref(false);
const showSuccess = ref(false);
const form = ref({
  course: null,
  discount: 0,
});

const courseOptions = ref([
  { id: 1, name: "Intro A" },
  { id: 2, name: "Intro B" },
  { id: 3, name: "ICDL" },
  { id: 4, name: "Access A" },
  { id: 5, name: "P2A" },
]);

watch(
  () => props.modelValue,
  (val) => {
    show.value = val;
    if (!val) showSuccess.value = false;
  },
);

const onClose = () => {
  emit("update:modelValue", false);
};

const saveAndAdd = () => {
  console.log("Save and Add Another:", form.value);
  emit("save", { ...form.value });

  showSuccess.value = true;
  // Automatically hide after 3 seconds, user can also close manually
  /* setTimeout(() => {
    showSuccess.value = false;
  }, 3000); */

  // Reset form for "Add Another"
  form.value = {
    course: null,
    discount: 0,
  };
};

const saveAndClose = () => {
  console.log("Save and Close:", form.value);
  emit("save", form.value);
  show.value = false;
};
</script>

<style lang="scss">
.success-alert {
  display: flex;
  align-items: center;
  background-color: #ffffff;
  color: #0e9f6e;
  border: 1px solid #84e1bc;
  border-radius: 8px;
  padding: 8px 12px;
  margin-bottom: 20px;

  .success-text {
    font-size: 12px;
    font-weight: 500;
  }
}
</style>
