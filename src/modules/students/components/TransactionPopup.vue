<template>
  <q-dialog v-model="isOpen" persistent>
    <q-card class="custom-popup">
      <q-card-section>
        <div class="popup-header">
          <p class="popup-title">{{ title }}</p>
          <q-btn flat dense v-close-popup class="close-btn">
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
        <div class="popup-subtitle">Student: {{ studentName }}</div>
        <div class="popup-divider"></div>

        <div class="row q-col-gutter-md">
          <!-- Amount Field -->
          <div class="col-12 col-md-6">
            <div class="form-group">
              <label>Amount <span>*</span></label>
              <q-input
                v-model="form.amount"
                :disable="!!props.currentTransaction.amount"
                placeholder="Enter amount..."
                outlined
                dense
                class="custom-input"
              />
            </div>
          </div>

          <!-- Voucher Number Field -->
          <div v-if="showVoucher" class="col-12 col-md-6">
            <div class="form-group">
              <label>Voucher Number <span>*</span></label>
              <q-input
                v-model="form.voucherNumber"
                placeholder="Enter voucher number..."
                outlined
                dense
                class="custom-input"
                :disable="!!props.currentTransaction.paper_no"
              />
            </div>
          </div>

          <!-- Course Name -->
          <div v-if="showCourse" :class="courseColClass">
            <div class="form-group">
              <label>Course Name</label>
              <q-select
                v-model="form.courseId"
                :options="courseOptions"
                option-value="id"
                option-label="name"
                clearable
                hide-selected
                outlined
                dense
                emit-value
                map-options
                fill-input
                use-input
                :input-value="courseSearch"
                @update:input-value="(val) => (courseSearch = val)"
                @update:model-value="() => (courseSearch = '')"
                input-debounce="400"
                :loading="courseLoading"
                @filter="searchForCourses"
                placeholder="Select Course After Searching..."
                class="custom-select"
                :disable="!!props.currentTransaction.category_id"
              />
            </div>
          </div>
          <!-- To Account -->
          <div v-if="showToAccount" class="col-12">
            <div class="form-group">
              <label>To Account <span>*</span></label>
              <q-select
                v-model="form.toAccount"
                :options="accountOptions"
                option-label="name"
                option-value="id"
                clearable
                hide-selected
                outlined
                dense
                emit-value
                map-options
                fill-input
                use-input
                :input-value="accountSearch"
                @update:input-value="(val) => (accountSearch = val)"
                @update:model-value="() => (accountSearch = '')"
                input-debounce="400"
                :loading="accountLoading"
                @filter="searchForAccount"
                placeholder="Select Account After Searching..."
                class="custom-select"
              />
            </div>
          </div>

          <!-- Service -->
          <div v-if="showService" class="col-12">
            <div class="form-group">
              <label>Service <span>*</span></label>
              <q-select
                v-model="form.serviceId"
                :options="serviceOptions"
                option-value="id"
                option-label="name"
                clearable
                hide-selected
                outlined
                dense
                emit-value
                map-options
                fill-input
                use-input
                :input-value="serviceSearch"
                @update:input-value="(val) => (serviceSearch = val)"
                @update:model-value="() => (serviceSearch = '')"
                input-debounce="400"
                :loading="serviceLoading"
                @filter="searchForService"
                placeholder="Select Account After Searching..."
                class="custom-select"
                :disable="!!props.currentTransaction.service_id"
              />
            </div>
          </div>

          <!-- Details (All) -->
          <div class="col-12">
            <div class="form-group">
              <label>Details <span v-if="isExpense">*</span></label>
              <q-input
                v-model="form.details"
                type="textarea"
                placeholder="Enter transaction details.."
                outlined
                dense
                class="custom-input"
                rows="3"
              />
            </div>
          </div>
        </div>

        <div class="popup-actions justify-end q-mt-lg">
          <q-btn label="Cancel" v-close-popup flat class="btn-cancel" no-caps/>
          <q-btn label="Save" class="btn-save-close" no-caps @click="onSave"/>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import {computed, onMounted, ref, watch} from "vue";
import Service from "../services/service";

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: "Income", // 'Income', 'Expense', 'Service', 'Funds Transfer'
  },
  currentTransaction: {
    type: Object,
    default: {},
  },
  studentName: {
    type: String,
    default: "",
  },
});
const courseSearch = ref("");
const courseLoading = ref(false);
const courseOptions = ref([]);

const accountSearch = ref("");
const accountLoading = ref(false);
const accountOptions = ref([]);

const serviceSearch = ref("");
const serviceLoading = ref(false);
const serviceOptions = ref([]);

const emit = defineEmits(["update:modelValue", "save"]);

const isOpen = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});

const title = computed(() => {
  return `${props.type} Transaction`;
});

// Computed properties for field visibility
const showVoucher = computed(() =>
  ["Income", "Expense", "Service"].includes(props.type),
);
const showCourse = computed(() =>
  ["Income", "Expense", "Funds Transfer"].includes(props.type),
);
const showService = computed(() => props.type === "Service");
const showToAccount = computed(() => props.type === "Funds Transfer");
const isExpense = computed(() => props.type === "Expense");

// Layout logic
const courseColClass = computed(() =>
  props.type === "Funds Transfer" ? "col-12 col-md-6" : "col-12",
);

const form = ref({
  amount: props.currentTransaction.amount || "",
  voucherNumber: props.currentTransaction.paper_no || "",
  course: props.currentTransaction.category_name || null,
  courseId: props.currentTransaction.category_id || null,
  service: props.currentTransaction.service || null,
  serviceId: props.currentTransaction.service_id || null,
  toAccount: props.currentTransaction.to_account || null,
  details: props.currentTransaction.details || "",
});

// Reset form when type changes or dialog opens
watch(
  () => props.modelValue,
  (val) => {
    if (val) {
      form.value = {
        amount: props.currentTransaction.amount || "",
        voucherNumber: props.currentTransaction.paper_no || "",
        course: props.currentTransaction.category_name || null,
        courseId: props.currentTransaction.category_id || null,
        service: props.currentTransaction.service || null,
        serviceId: props.currentTransaction.service_id || null,
        toAccount: props.currentTransaction.to_account || null,
        details: props.currentTransaction.details || "",
      };

      // Reset & Initialize Options
      courseOptions.value = [];
      accountOptions.value = [];
      serviceOptions.value = [];

      if (props.currentTransaction.category_id && props.currentTransaction.category_name) {
        courseOptions.value = [{
          id: props.currentTransaction.category_id,
          name: props.currentTransaction.category_name
        }];
      }

      if (props.currentTransaction.service_id && props.currentTransaction.service) { // Assuming service name is in 'service' prop
        serviceOptions.value = [{
          id: props.currentTransaction.service_id,
          name: props.currentTransaction.service
        }];
      }

    }
  },
);

const onSave = () => {
  // You can add validation here
  emit("save", {...form.value, type: props.type, type_id: props.currentTransaction.type_id});
  isOpen.value = false;
};

const searchForCourses = async (val, update) => {
  if (!val || val.length < 2) {
    update(() => {
      courseOptions.value = [];
    });
    return;
  }

  courseLoading.value = true;

  try {
    const res = await Service.searchForCourse(val);

    update(() => {
      const mapped = res.data.data.map((course) => ({
        id: course.value,
        name: course.label,
      }));

      courseOptions.value = [
        ...new Map(mapped.map((item) => [item.id, item])).values(),
      ];
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
    courseLoading.value = false;
  }
};

const searchForAccount = async (val, update) => {
  if (!val || val.length < 2) {
    update(() => {
      accountOptions.value = [];
    });
    return;
  }

  accountLoading.value = true;

  try {
    const res = await Service.searchForAccount(val);

    update(() => {
      const mapped = res.data.data.map((account) => ({
        id: account.id,
        name: account.label,
      }));

      accountOptions.value = [
        ...new Map(mapped.map((item) => [item.id, item])).values(),
      ];
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
    accountLoading.value = false;
  }
};

const searchForService = async (val, update) => {
  if (!val || val.length < 2) {
    update(() => {
      serviceOptions.value = [];
    });
    return;
  }

  serviceLoading.value = true;

  try {
    const res = await Service.searchForService(val);

    update(() => {
      const mapped = res.data.data.map((service) => ({
        id: service.id,
        name: service.label,
      }));

      serviceOptions.value = [
        ...new Map(mapped.map((item) => [item.id, item])).values(),
      ];
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
    serviceLoading.value = false;
  }
};

watch(
  () => form.value.courseId,
  (newVal) => {
    if (newVal !== undefined && newVal !== null && newVal !== "") {
      courseSearch.value = "";
    }
  },
);

watch(
  () => form.value.toAccount,
  (newVal) => {
    if (newVal !== undefined && newVal !== null && newVal !== "") {
      accountSearch.value = "";
    }
  },
);

watch(
  () => form.value.serviceId,
  (newVal) => {
    if (newVal !== undefined && newVal !== null && newVal !== "") {
      serviceSearch.value = "";
    }
  },
);

onMounted(() => {
  form.value.amount = props.currentTransaction.amount || "";
  form.value.voucherNumber = props.currentTransaction.paper_no || "";
  form.value.course = props.currentTransaction.category_name || null;
  form.value.courseId = props.currentTransaction.category_id || null;
  form.value.service = props.currentTransaction.service || null;
  form.value.serviceId = props.currentTransaction.service_id || null;
  form.value.toAccount = props.currentTransaction.to_account || null;
  form.value.details = props.currentTransaction.details || "";

  // Initialize options so q-select displays name instead of ID
  if (props.currentTransaction.category_id && props.currentTransaction.category_name) {
    courseOptions.value = [{
      id: props.currentTransaction.category_id,
      name: props.currentTransaction.category_name
    }];
  }

  if (props.currentTransaction.service_id && props.currentTransaction.service) { // Assuming service name is in 'service' prop
    serviceOptions.value = [{
      id: props.currentTransaction.service_id,
      name: props.currentTransaction.service
    }];
  }

  // For account, check if we have account data in props.currentTransaction (e.g. to_account_name if available, or just rely on ID if name not passed)
  // Assuming currentTransaction might have to_account object or similar. If not available, we can't show name.
   if (props.currentTransaction.to_account) {
    // If to_account is the ID, we need the name. If it's not passed, we might show ID.
    // Checking props structure from service.js or user info.
    // If to_account is just ID, we can't help much without name.
  }
})
</script>

<style lang="scss" scoped>
.custom-popup {
  width: 35rem;
}

.form-group {
  margin-bottom: 0;
}

.popup-actions {
  .btn-save-close,
  .btn-cancel {
    width: 50%;
    max-width: unset !important;
    flex: 1;
  }
}
</style>
