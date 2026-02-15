<template>
  <q-dialog v-model="model" persistent>
    <q-card class="custom-popup">
      <q-card-section>
        <div class="popup-header">
          <p class="popup-title">Add Transaction</p>
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
        <div class="popup-subtitle row q-gutter-sm items-center">
          <span>Paper No. ({{ generatedPaperNo }})</span>
          <span class="q-ml-lg">Date of process : {{ currentDateTime }}</span>
        </div>

        <div class="popup-divider"></div>

        <div class="row q-col-gutter-md">
          <div class="col-6">
            <div class="form-group">
              <label class="form-label"
                >Amount <span class="text-negative">*</span></label
              >
              <q-input
                v-model="form.amount"
                dense
                outlined
                placeholder="0.00"
                type="number"
                class="custom-input"
              />
            </div>
          </div>
          <div class="col-6">
            <div class="form-group">
              <label class="form-label">Category id</label>
              <q-select
                v-model="form.categoryId"
                :options="categoryOptions"
                dense
                outlined
                :label="
                  form.categoryId == undefined || form.categoryId == ''
                    ? 'Select Category'
                    : ''
                "
                class="custom-select"
                option-label="name"
                option-value="id"
                emit-value
                map-options
              />
            </div>
          </div>

          <div class="col-6">
            <div class="form-group">
              <label class="form-label"
                >From Account <span class="text-negative">*</span></label
              >
              <q-select
                v-model="form.fromAccount"
                :options="fromAccountOptions"
                dense
                outlined
                :label="
                  form.fromAccount == undefined || form.fromAccount == ''
                    ? 'Select Account'
                    : ''
                "
                class="custom-select"
                option-label="label"
                option-value="id"
                emit-value
                map-options
                fill-input
                use-input
                :input-value="fromAccountSearch"
                @update:input-value="(val) => (fromAccountSearch = val)"
                @update:model-value="() => (fromAccountSearch = '')"
                input-debounce="400"
                :loading="fromAccountLoading"
                @filter="filterFromAccounts"
              >
                <template v-slot:option="scope">
                  <q-item v-bind="scope.itemProps">
                    <q-item-section avatar>
                      <div class="icon-wrapper">
                        <q-icon
                          :name="getIcon(scope.opt.mainacctype)"
                          size="20px"
                          color="grey-6"
                        />
                      </div>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>{{ scope.opt.label }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </template>
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
          </div>
          <div class="col-6">
            <div class="form-group">
              <label class="form-label"
                >To Account <span class="text-negative">*</span></label
              >
              <q-select
                v-model="form.toAccount"
                :options="toAccountOptions"
                dense
                outlined
                :label="
                  form.toAccount == undefined || form.toAccount == ''
                    ? 'Select Account'
                    : ''
                "
                class="custom-select"
                option-label="label"
                option-value="id"
                emit-value
                map-options
                fill-input
                use-input
                :input-value="toAccountSearch"
                @update:input-value="(val) => (toAccountSearch = val)"
                @update:model-value="() => (toAccountSearch = '')"
                input-debounce="400"
                :loading="toAccountLoading"
                @filter="filterToAccounts"
              >
                <template v-slot:option="scope">
                  <q-item v-bind="scope.itemProps">
                    <q-item-section avatar>
                      <div class="icon-wrapper">
                        <q-icon
                          :name="getIcon(scope.opt.mainacctype)"
                          size="20px"
                          color="grey-6"
                        />
                      </div>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>{{ scope.opt.label }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </template>
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
          </div>
          <div class="col-12">
            <div class="form-group">
              <label class="form-label">Transaction Type</label>
              <q-select
                v-model="form.transactionType"
                :options="transactionTypeOptions"
                dense
                outlined
                :label="
                  form.transactionType == undefined ||
                  form.transactionType == ''
                    ? 'Select Transaction Type'
                    : ''
                "
                class="custom-select"
                option-label="name"
                option-value="id"
                emit-value
                map-options
              />
            </div>
          </div>
          <div class="col-12">
            <div class="form-group">
              <label class="form-label">Details</label>
              <q-input
                v-model="form.details"
                dense
                outlined
                type="textarea"
                placeholder="Enter transaction details.."
                class="custom-textarea"
                rows="3"
              />
            </div>
          </div>
        </div>

        <div class="popup-actions">
          <q-btn label="Cancel" v-close-popup class="btn-cancel" flat no-caps />
          <q-btn
            label="Save & Add Another"
            @click="saveAndAddAnother"
            class="btn-save-add"
            outline
            no-caps
            flat
          />
          <q-btn
            label="Save & Close"
            @click="saveAndClose"
            class="btn-save-close"
            no-caps
            flat
          />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useQuasar } from "quasar";
import TransactionService from "../service/service";
const model = defineModel();
const $q = useQuasar();

const generatedPaperNo = ref("251229");
const fromAccountOptions = ref([]);
const toAccountOptions = ref([]);
// Current date and time
const currentDateTime = computed(() => {
  const now = new Date();
  return now.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
});

// Form data
const form = ref({
  amount: null,
  categoryId: null,
  fromAccount: null,
  toAccount: null,
  transactionType: null,
  details: "",
});

// Options for dropdowns (you can replace with API data)
const categoryOptions = ref([
  { id: 1, name: "6372 Intro B" },
  { id: 2, name: "6383 Intro A" },
  { id: 3, name: "6378 Access A" },
]);

const fromAccountLoading = ref(false);
const toAccountLoading = ref(false);
const fromAccountSearch = ref("");
const toAccountSearch = ref("");

const searchAccounts = async (val, update, optionsRef, loadingRef) => {
  if (!val || val.length < 2) {
    update(() => {
      optionsRef.value = [];
    });
    return;
  }

  loadingRef.value = true;
  try {
    const response = await TransactionService.getAllAccounts(val);
    update(() => {
      const data = response.data;
      optionsRef.value = Array.isArray(data) ? data : data.data || [];
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
    loadingRef.value = false;
  }
};

const filterFromAccounts = (val, update) => {
  searchAccounts(val, update, fromAccountOptions, fromAccountLoading);
};

const filterToAccounts = (val, update) => {
  searchAccounts(val, update, toAccountOptions, toAccountLoading);
};

watch(
  () => form.value.fromAccount,
  (newVal) => {
    if (newVal !== undefined && newVal !== null && newVal !== "") {
      fromAccountSearch.value = "";
    }
  },
);

watch(
  () => form.value.toAccount,
  (newVal) => {
    if (newVal !== undefined && newVal !== null && newVal !== "") {
      toAccountSearch.value = "";
    }
  },
);

const getIcon = (type) => {
  switch (type) {
    case 1:
      return "fa-solid fa-receipt"; // Expenses
    case 2:
      return "fa-solid fa-money-bill-wave"; // Income fees
    case 3:
      return "fa-solid fa-cash-register"; // Cash box
    case 4:
      return "fa-solid fa-graduation-cap"; // Student
    case 5:
      return "fa-cart-shopping"; // Purchase
    case 6:
      return "fa-building-columns"; // Bank accounts
    case 7:
      return "fa-solid fa-user-group"; // Staff
    case 8:
      return "fa-solid fa-circle-minus"; // Deductions
    default:
      return "fa-solid fa-coins"; // Default
  }
};

const transactionTypeOptions = ref([
  { id: 1, name: "Course deduction" },
  { id: 2, name: "Course registration" },
  { id: 3, name: "Funds Transfer" },
  { id: 4, name: "Transaction Reversal" },
]);

// Methods
const saveAndAddAnother = () => {
  console.log("Save and Add Another", form.value);
  // Add your save logic here
  // Reset form
  form.value = {
    amount: null,
    categoryId: null,
    fromAccount: null,
    toAccount: null,
    transactionType: null,
    details: "",
  };
  // Generate new paper number
  generatedPaperNo.value = String(Number(generatedPaperNo.value) + 1);
};

const saveAndClose = () => {
  console.log("Save and Close", form.value);
  // Add your save logic here
  model.value = false;
};

onMounted(() => {
  // Initial load
});
</script>

<style lang="scss" scoped>
.custom-popup {
  width: 39.5rem !important;
  .form-grouo {
    margin-bottom: 0.5rem;
  }

  .btn-cancel,
  .btn-save-close {
    max-width: 196.5px;
  }

  .btn-save-add {
    max-width: 167px;
  }
  .form-group {
    margin-bottom: 0.5rem;
  }

  .icon-wrapper {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: #f3f4f6;
    display: flex;
    align-items: center;
    justify-content: center;
    color: $grey-6 !important;
  }
}
</style>
