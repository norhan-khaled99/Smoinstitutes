<template>
  <q-dialog v-model="model" persistent>
    <q-card class="custom-popup transaction-popup">
      <q-card-section>
        <div class="popup-header">
          <p class="popup-title">Add Transaction</p>
          <q-btn
            flat
            dense
            v-close-popup
            class="close-btn"
            @click="resetForm()"
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
        <div class="popup-subtitle row q-gutter-sm items-center">
          <span>Paper No. ({{ generatedPaperNo }})</span>
          <span class="q-ml-lg">Date of process : {{ currentDateTime }}</span>
        </div>

        <div class="popup-divider"></div>

        <q-form ref="formRef" greedy class="form-content">
          <div class="row q-col-gutter-sm">
            <div class="col-6">
              <div class="form-group">
                <label class="form-label">
                  Amount <span class="text-negative">*</span>
                </label>
                <q-input
                  v-model="form.amount"
                  :rules="rules.required"
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
                  v-model="form.category_id"
                  :rules="rules.required"
                  :options="categoryOptions"
                  dense
                  outlined
                  :label="
                    form.category_id == undefined || form.category_id == ''
                      ? 'Select Category'
                      : ''
                  "
                  class="custom-select"
                  option-label="label"
                  option-value="value"
                  emit-value
                  map-options
                />
              </div>
            </div>

            <div class="col-6">
              <div class="form-group">
                <label class="form-label">
                  From Account <span class="text-negative">*</span>
                </label>
                <q-select
                  v-model="form.from_account"
                  :rules="rules.required"
                  :options="fromAccountOptions"
                  dense
                  outlined
                  placeholder="Select Account"
                  class="custom-select"
                  option-label="label"
                  option-value="id"
                  emit-value
                  map-options
                  hide-selected
                  fill-input
                  use-input
                  :input-value="fromAccountSearch"
                  @update:input-value="(val) => (fromAccountSearch = val)"
                  @update:model-value="() => (fromAccountSearch = '')"
                  input-debounce="400"
                  :loading="fromAccountLoading"
                  @filter="filterFromAccounts"
                  clearable
                >
                  <template v-slot:before-options>
                    <div
                      class="q-pa-sm sticky-top bg-white"
                      @click.stop
                      @mousedown.stop.prevent
                    >
                      <div class="row bg-grey-2 q-pa-xs filter-tabs-container">
                        <q-btn
                          v-for="tab in ['All', 'Financial', 'People']"
                          :key="tab"
                          :label="tab"
                          :color="
                            fromAccountTab === tab ? 'white' : 'transparent'
                          "
                          :text-color="
                            fromAccountTab === tab ? 'primary' : 'grey-7'
                          "
                          class="col shadow-0 filter-tab-btn"
                          :class="{ 'active-tab': fromAccountTab === tab }"
                          dense
                          no-caps
                          unelevated
                          size="13px"
                          @click="fromAccountTab = tab"
                        />
                      </div>
                    </div>
                  </template>

                  <template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-grey">
                        No results
                      </q-item-section>
                    </q-item>
                  </template>
                  <template v-slot:option="scope">
                    <q-item v-bind="scope.itemProps">
                      <q-item-section avatar>
                        <div class="icon-wrapper">
                          <div
                            v-if="
                              getIcon(scope.opt.mainacctype).includes('<svg')
                            "
                            v-html="getIcon(scope.opt.mainacctype)"
                            class="flex flex-center"
                          ></div>
                          <q-icon
                            v-else
                            :name="getIcon(scope.opt.mainacctype)"
                            size="20px"
                            color="grey-6"
                          />
                        </div>
                      </q-item-section>

                        <q-item-section>
                        <q-item-label class="text-weight-bold text-dark">{{
                          scope.opt.label
                        }}</q-item-label>
                        <q-item-label caption class="text-grey-7">{{
                          scope.opt.mainaccountname
                        }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>
              </div>
            </div>
            <div class="col-6">
              <div class="form-group">
                <label class="form-label">
                  To Account <span class="text-negative">*</span>
                </label>
                <q-select
                  v-model="form.to_account"
                  :rules="rules.required"
                  :options="toAccountOptions"
                  dense clearable
                  outlined
                  placeholder="Select Account"
                  class="custom-select"
                  option-label="label"
                  option-value="id"
                  emit-value
                  map-options
                  fill-input
                  hide-selected
                  use-input
                  :input-value="toAccountSearch"
                  @update:input-value="(val) => (toAccountSearch = val)"
                  @update:model-value="() => (toAccountSearch = '')"
                  input-debounce="400"
                  :loading="toAccountLoading"
                  @filter="filterToAccounts"
                >
                  <!-- Filter Tabs -->
                  <template v-slot:before-options>
                    <div
                      class="q-pa-sm sticky-top bg-white"
                      @click.stop
                      @mousedown.stop.prevent
                    >
                      <div class="row bg-grey-2 q-pa-xs filter-tabs-container">
                        <q-btn
                          v-for="tab in ['All', 'Financial', 'People']"
                          :key="tab"
                          :label="tab"
                          :color="
                            toAccountTab === tab ? 'white' : 'transparent'
                          "
                          :text-color="
                            toAccountTab === tab ? 'primary' : 'grey-7'
                          "
                          class="col shadow-0 filter-tab-btn"
                          :class="{ 'active-tab': toAccountTab === tab }"
                          dense
                          no-caps
                          unelevated
                          size="13px"
                          @click="toAccountTab = tab"
                        />
                      </div>
                    </div>
                  </template>

                  <template v-slot:option="scope">
                    <q-item v-bind="scope.itemProps" class="q-py-sm">
                      <q-item-section avatar>
                        <div class="icon-wrapper">
                          <div
                            v-if="
                              getIcon(scope.opt.mainacctype).includes('<svg')
                            "
                            v-html="getIcon(scope.opt.mainacctype)"
                            class="flex flex-center"
                          ></div>
                          <q-icon
                            v-else
                            :name="getIcon(scope.opt.mainacctype)"
                            size="20px"
                            color="grey-6"
                          />
                        </div>
                      </q-item-section>
                      <q-item-section>
                        <q-item-label class="text-weight-bold text-dark">{{
                          scope.opt.label
                        }}</q-item-label>
                        <q-item-label caption class="text-grey-7">{{
                          scope.opt.mainaccountname
                        }}</q-item-label>
                      </q-item-section>
                      <q-item-section side v-if="scope.selected">
                        <q-icon name="check" color="primary" size="xs" />
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
                  v-model="form.jtype"
                  :rules="rules.required"
                  :options="transactionTypeOptions"
                  dense
                  outlined
                  :label="
                    form.jtype == undefined || form.jtype == ''
                      ? 'Select Transaction Type'
                      : ''
                  "
                  class="custom-select"
                  option-label="label"
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
                  :rules="rules.required"
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
            <q-btn
              label="Cancel"
              v-close-popup
              @click="resetForm()"
              class="btn-cancel"
              flat
              no-caps
            />
            <q-btn
              label="Save & Add Another"
              @click.prevent="saveTransaction(false)"
              class="btn-save-add"
              outline
              no-caps
              flat
            />
            <q-btn
              label="Save & Close"
              @click.prevent="saveTransaction(true)"
              class="btn-save-close"
              no-caps
              flat
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useQuasar } from "quasar";
import services from "../service/service";
import rules from "src/config/rules.js";

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
  from_account: "",
  to_account: "",
  amount: "",
  category_id: "",
  details: "",
  jtype: "",
});

const categoryOptions = ref([]);
const getAllCategoryOptions = () => {
  services
    .getAllCategoryOptions()
    .then((res) => {
      categoryOptions.value = res.data.data;
    })
    .catch((error) => {
      console.error("Error fetching shifts:", error);
    });
};

const fromAccountLoading = ref(false);
const toAccountLoading = ref(false);
const fromAccountSearch = ref("");
const toAccountSearch = ref("");

const fromAccountTab = ref("All");
const allFromAccounts = ref([]);

const toAccountTab = ref("All");
const allToAccounts = ref([]);

const applyFromAccountFilter = () => {
  if (fromAccountTab.value === "All") {
    fromAccountOptions.value = allFromAccounts.value;
  } else if (fromAccountTab.value === "Financial") {
    const financialTypes = [1, 2, 3, 5, 6, 8];
    fromAccountOptions.value = allFromAccounts.value.filter((item) =>
      financialTypes.includes(item.mainacctype),
    );
  } else if (fromAccountTab.value === "People") {
    const peopleTypes = [4, 7];
    fromAccountOptions.value = allFromAccounts.value.filter((item) =>
      peopleTypes.includes(item.mainacctype),
    );
  }
};

watch(fromAccountTab, () => {
  applyFromAccountFilter();
});

const filterFromAccounts = async (val, update) => {
  if (val && val.length >= 2) {
    fromAccountLoading.value = true;
    try {
      const response = await services.getAllAccounts(val);
      const data = response.data.data;
      console.log(data);
      allFromAccounts.value = data;
      update(() => {
        applyFromAccountFilter();
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
      fromAccountLoading.value = false;
    }
  } else {
    update(() => {
      // Keep the existing filtered options to maintain tab state
      // Only clear if there's absolutely no data
      if (allFromAccounts.value.length === 0) {
        fromAccountOptions.value = [];
      }
    });
  }
};

const applyToAccountFilter = () => {
  if (toAccountTab.value === "All") {
    toAccountOptions.value = allToAccounts.value;
  } else if (toAccountTab.value === "Financial") {
    const financialTypes = [1, 2, 3, 5, 6, 8];
    toAccountOptions.value = allToAccounts.value.filter((item) =>
      financialTypes.includes(item.mainacctype),
    );
  } else if (toAccountTab.value === "People") {
    const peopleTypes = [4, 7];
    toAccountOptions.value = allToAccounts.value.filter((item) =>
      peopleTypes.includes(item.mainacctype),
    );
  }
};

watch(toAccountTab, () => {
  applyToAccountFilter();
});

const filterToAccounts = async (val, update) => {
  if (val && val.length >= 2) {
    toAccountLoading.value = true;
    try {
      const response = await services.getAllAccounts(val);
      const data = response.data.data;
      allToAccounts.value = data;
      update(() => {
        applyToAccountFilter();
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
      toAccountLoading.value = false;
    }
  } else {
    update(() => {
      // Keep the existing filtered options to maintain tab state
      // Only clear if there's absolutely no data
      if (allToAccounts.value.length === 0) {
        toAccountOptions.value = [];
      }
    });
  }
};

watch(
  () => form.value.from_account,
  (newVal) => {
    if (newVal !== undefined && newVal !== null && newVal !== "") {
      fromAccountSearch.value = "";
    }
  },
);

watch(
  () => form.value.to_account,
  (newVal) => {
    if (newVal !== undefined && newVal !== null && newVal !== "") {
      toAccountSearch.value = "";
    }
  },
);

const cashBoxIcon = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5 6.66602H8.33333" stroke="#1F2933" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M17.3611 7.5H15.1923C13.7054 7.5 12.5 8.61929 12.5 10C12.5 11.3807 13.7054 12.5 15.1923 12.5H17.3611C17.4306 12.5 17.4653 12.5 17.4946 12.4982C17.944 12.4709 18.302 12.1385 18.3314 11.7212C18.3333 11.6939 18.3333 11.6617 18.3333 11.5972V8.40278C18.3333 8.33829 18.3333 8.30605 18.3314 8.27883C18.302 7.86153 17.944 7.52914 17.4946 7.50178C17.4653 7.5 17.4306 7.5 17.3611 7.5Z" stroke="#1F2933"/>
<path d="M17.4709 7.50065C17.4061 5.9404 17.1972 4.98377 16.5238 4.31029C15.5475 3.33398 13.9761 3.33398 10.8334 3.33398L8.33341 3.33398C5.19072 3.33398 3.61937 3.33398 2.64306 4.3103C1.66675 5.28661 1.66675 6.85796 1.66675 10.0007C1.66675 13.1433 1.66675 14.7147 2.64306 15.691C3.61937 16.6673 5.19072 16.6673 8.33341 16.6673H10.8334C13.9761 16.6673 15.5475 16.6673 16.5238 15.691C17.1972 15.0175 17.4061 14.0609 17.4709 12.5007" stroke="#1F2933"/>
<path d="M14.9927 10H15.0002" stroke="#1F2933" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const receiptsIcon = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.6875 17.5011C15.2222 17.0259 16.0278 17.0259 16.5625 17.5011C16.9258 17.824 17.5 17.5661 17.5 17.0801V2.92197C17.5 2.43594 16.9258 2.17807 16.5625 2.50097C16.0278 2.97622 15.2222 2.97622 14.6875 2.50097C14.1528 2.02572 13.3472 2.02572 12.8125 2.50097C12.2778 2.97622 11.4722 2.97622 10.9375 2.50097C10.4028 2.02572 9.59716 2.02572 9.0625 2.50097C8.52784 2.97622 7.72216 2.97622 7.1875 2.50097C6.65284 2.02572 5.84716 2.02572 5.3125 2.50097C4.77784 2.97622 3.97216 2.97622 3.4375 2.50097C3.07424 2.17807 2.5 2.43594 2.5 2.92197V17.0801C2.5 17.5661 3.07424 17.824 3.4375 17.5011C3.97216 17.0259 4.77784 17.0259 5.3125 17.5011C5.84716 17.9764 6.65284 17.9764 7.1875 17.5011C7.72216 17.0259 8.52784 17.0259 9.0625 17.5011C9.59716 17.9764 10.4028 17.9764 10.9375 17.5011C11.4722 17.0259 12.2778 17.0259 12.8125 17.5011C13.3472 17.9764 14.1528 17.9764 14.6875 17.5011Z" stroke="#1F2933"/>
<path d="M6.25 12.916H13.75" stroke="#1F2933" stroke-linecap="round"/>
<path d="M6.25 10H13.75" stroke="#1F2933" stroke-linecap="round"/>
<path d="M6.25 7.08398H13.75" stroke="#1F2933" stroke-linecap="round"/>
</svg>
`;
const moneyBillIcon = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.50008 15.8327C5.15931 15.8327 3.98893 15.8327 3.14818 15.2709C2.78421 15.0277 2.47171 14.7152 2.22852 14.3512C1.66675 13.5105 1.66675 12.3401 1.66675 9.99935C1.66675 7.65858 1.66675 6.48819 2.22852 5.64745C2.47171 5.28348 2.78421 4.97098 3.14818 4.72778C3.98893 4.16602 5.15931 4.16602 7.50008 4.16602L12.5001 4.16602C14.8409 4.16602 16.0112 4.16602 16.852 4.72778C17.2159 4.97098 17.5285 5.28348 17.7716 5.64745C18.3334 6.48819 18.3334 7.65858 18.3334 9.99935C18.3334 12.3401 18.3334 13.5105 17.7716 14.3512C17.5285 14.7152 17.2159 15.0277 16.852 15.2709C16.0112 15.8327 14.8409 15.8327 12.5001 15.8327H7.50008Z" stroke="#1F2933"/>
<path d="M7.5 7.5C6.11929 7.5 5 8.61929 5 10C5 11.3807 6.11929 12.5 7.5 12.5" stroke="#1F2933"/>
<path d="M12.5 7.5C13.8807 7.5 15 8.61929 15 10C15 11.3807 13.8807 12.5 12.5 12.5" stroke="#1F2933"/>
<path d="M7.5 4.16602V15.416" stroke="#1F2933" stroke-linecap="round"/>
<path d="M12.5 4.16602V15.416" stroke="#1F2933" stroke-linecap="round"/>
</svg>`;
const studentIcon = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.88704 2.35048C9.2393 1.71651 10.7608 1.71651 12.113 2.35048L17.6891 4.96464C18.566 5.37575 18.9584 6.26852 18.9584 7.08335C18.9584 7.89819 18.566 8.79095 17.689 9.20207L16.4584 9.77902V13.8545C16.4584 14.8987 15.9349 15.9069 14.9818 16.4347C14.3553 16.7816 13.5321 17.1993 12.6658 17.5316C11.8097 17.8601 10.8617 18.125 10.0001 18.125C9.13849 18.125 8.1905 17.8601 7.33438 17.5316C6.46807 17.1993 5.64484 16.7816 5.0184 16.4347C4.0653 15.9069 3.54175 14.8987 3.54175 13.8545V9.77898L2.31111 9.20203L2.29175 9.19284V11.6667C2.29175 12.0118 2.01193 12.2917 1.66675 12.2917C1.32157 12.2917 1.04175 12.0118 1.04175 11.6667V7.08333C1.04175 6.2685 1.4342 5.37571 2.31111 4.9646L7.88704 2.35048ZM4.79175 10.365V13.8545C4.79175 14.4904 5.10737 15.0551 5.62398 15.3412C6.22119 15.6719 6.98907 16.0603 7.78212 16.3646C8.58536 16.6727 9.365 16.875 10.0001 16.875C10.6352 16.875 11.4148 16.6727 12.218 16.3646C13.0111 16.0603 13.779 15.6719 14.3762 15.3412C14.8928 15.0551 15.2084 14.4904 15.2084 13.8545V10.365L12.1131 11.8162C10.7609 12.4502 9.23938 12.4502 7.88711 11.8162L4.79175 10.365ZM2.84172 8.07024C2.50574 7.91272 2.29175 7.53699 2.29175 7.08332C2.29175 6.62964 2.50574 6.25391 2.84172 6.09639L8.41765 3.48227C9.43373 3.00591 10.5664 3.00591 11.5824 3.48227L17.1584 6.09643C17.4944 6.25394 17.7084 6.62968 17.7084 7.08335C17.7084 7.53702 17.4944 7.91276 17.1584 8.07028L11.5825 10.6844C10.5664 11.1608 9.4338 11.1608 8.41772 10.6844L2.84172 8.07024Z" fill="#1F2933"/>
</svg>`;
const cartIcon = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" stroke="#6B7280" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const bankIcon = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.66675 10.0007C1.66675 6.85795 1.66675 5.28661 2.64306 4.3103C3.61937 3.33398 5.19072 3.33398 8.33341 3.33398H11.6667C14.8094 3.33398 16.3808 3.33398 17.3571 4.3103C18.3334 5.28661 18.3334 6.85795 18.3334 10.0007C18.3334 13.1433 18.3334 14.7147 17.3571 15.691C16.3808 16.6673 14.8094 16.6673 11.6667 16.6673H8.33341C5.19072 16.6673 3.61937 16.6673 2.64306 15.691C1.66675 14.7147 1.66675 13.1433 1.66675 10.0007Z" stroke="#1F2933"/>
<path d="M8.33333 13.75H5" stroke="#1F2933" stroke-linecap="round"/>
<path d="M6.66667 11.25H5" stroke="#1F2933" stroke-linecap="round"/>
<path d="M1.66675 8.33398L18.3334 8.33398" stroke="#1F2933" stroke-linecap="round"/>
<path d="M11.6667 12.5007C11.6667 11.715 11.6667 11.3221 11.9108 11.0781C12.1549 10.834 12.5477 10.834 13.3334 10.834C14.1191 10.834 14.5119 10.834 14.756 11.0781C15.0001 11.3221 15.0001 11.715 15.0001 12.5007C15.0001 13.2863 15.0001 13.6792 14.756 13.9232C14.5119 14.1673 14.1191 14.1673 13.3334 14.1673C12.5477 14.1673 12.1549 14.1673 11.9108 13.9232C11.6667 13.6792 11.6667 13.2863 11.6667 12.5007Z" stroke="#1F2933"/>
</svg>`;
const staffIcon = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M10 1.04102C7.8139 1.04102 6.0417 2.81322 6.0417 4.99935C6.0417 7.18548 7.8139 8.95768 10 8.95768C12.1862 8.95768 13.9584 7.18548 13.9584 4.99935C13.9584 2.81322 12.1862 1.04102 10 1.04102ZM7.2917 4.99935C7.2917 3.50358 8.50426 2.29102 10 2.29102C11.4958 2.29102 12.7084 3.50358 12.7084 4.99935C12.7084 6.49512 11.4958 7.70768 10 7.70768C8.50426 7.70768 7.2917 6.49512 7.2917 4.99935Z" fill="#1F2933"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10 10.2077C8.07207 10.2077 6.2958 10.6459 4.97957 11.3863C3.68293 12.1157 2.70836 13.2211 2.70836 14.5827L2.70831 14.6676C2.70737 15.6359 2.70619 16.851 3.77204 17.719C4.2966 18.1461 5.03043 18.4499 6.02187 18.6506C7.01608 18.8518 8.31189 18.9577 10 18.9577C11.6882 18.9577 12.984 18.8518 13.9782 18.6506C14.9696 18.4499 15.7035 18.1461 16.228 17.719C17.2939 16.851 17.2927 15.6359 17.2918 14.6676L17.2917 14.5827C17.2917 13.2211 16.3171 12.1157 15.0205 11.3863C13.7043 10.6459 11.928 10.2077 10 10.2077ZM3.95836 14.5827C3.95836 13.8732 4.47618 13.1036 5.5924 12.4758C6.68903 11.8589 8.24609 11.4577 10 11.4577C11.754 11.4577 13.311 11.8589 14.4077 12.4758C15.5239 13.1036 16.0417 13.8732 16.0417 14.5827C16.0417 15.6725 16.0081 16.286 15.4387 16.7497C15.1299 17.0011 14.6138 17.2466 13.7302 17.4254C12.8494 17.6037 11.6452 17.7077 10 17.7077C8.35484 17.7077 7.15065 17.6037 6.26986 17.4254C5.3863 17.2466 4.87013 17.0011 4.56135 16.7497C3.99196 16.286 3.95836 15.6725 3.95836 14.5827Z" fill="#1F2933"/>
</svg>`;
const deductionsIcon = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M1.22388 5.39297C1.46745 5.14838 1.86317 5.14755 2.10776 5.39112L5.37332 8.64301C5.80147 9.06937 6.07906 9.34394 6.31024 9.51965C6.52698 9.68438 6.62835 9.70282 6.69549 9.70284C6.76263 9.70287 6.86402 9.68451 7.08088 9.51993C7.31218 9.34439 7.58997 9.07003 8.01844 8.64398L8.24697 8.41673C8.63768 8.02818 8.97443 7.69329 9.28028 7.46115C9.60813 7.21232 9.97242 7.02405 10.4209 7.024C10.8694 7.02395 11.2338 7.21213 11.5617 7.46089C11.8676 7.69296 12.2044 8.02778 12.5952 8.41624L17.7084 13.4983V10.3791C17.7084 10.0339 17.9882 9.75412 18.3334 9.75412C18.6786 9.75412 18.9584 10.0339 18.9584 10.3791V15.0007C18.9584 15.3458 18.6786 15.6257 18.3334 15.6257H13.6816C13.3364 15.6257 13.0566 15.3458 13.0566 15.0007C13.0566 14.6555 13.3364 14.3757 13.6816 14.3757H16.818L11.7431 9.33172C11.3149 8.90614 11.0373 8.6321 10.8062 8.45675C10.5895 8.29237 10.4882 8.27399 10.4211 8.274C10.354 8.27401 10.2526 8.29241 10.036 8.45684C9.8049 8.63224 9.52737 8.90635 9.09928 9.33202L8.87072 9.55929C8.47967 9.94819 8.14263 10.2834 7.83654 10.5157C7.50844 10.7647 7.14386 10.953 6.69504 10.9528C6.24621 10.9527 5.88177 10.7641 5.55385 10.5148C5.24793 10.2823 4.91113 9.94688 4.52036 9.5577C4.5107 9.54808 4.50101 9.53843 4.49129 9.52875L1.22573 6.27685C0.981145 6.03329 0.980315 5.63756 1.22388 5.39297Z" fill="#1F2933"/>
</svg>`;
const coinsIcon = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#6B7280"/></svg>`;

const getIcon = (type) => {
  switch (type) {
    case 1:
      return receiptsIcon; // Expenses
    case 2:
      return moneyBillIcon; // Income fees
    case 3:
      return cashBoxIcon; // Cash box
    case 4:
      return studentIcon; // Student
    case 5:
      return cartIcon; // Purchase
    case 6:
      return bankIcon; // Bank accounts
    case 7:
      return staffIcon; // Staff
    case 8:
      return deductionsIcon; // Deductions
    default:
      return coinsIcon; // Default
  }
};

const transactionTypeOptions = ref([]);
const getAllTransactionTypeOptions = () => {
  services
    .getAllTransactionTypeOptions()
    .then((res) => {
      transactionTypeOptions.value = res.data.data;
    })
    .catch((error) => {
      console.error("Error fetching shifts:", error);
    });
};

const formRef = ref(null);
const emit = defineEmits(["save"]);
const saveTransaction = async (closeModal = false) => {
  // Validate form before saving
  const isValid = await formRef.value.validate();

  if (!isValid) {
    return;
  }

  emit("save", form.value);

  if (closeModal) {
    resetForm();
    model.value = false;
  }
};

const resetForm = () => {
  form.value = {
    from_account: "",
    to_account: "",
    amount: "",
    category_id: "",
    details: "",
    jtype: "",
  };
};

onMounted(() => {
  getAllCategoryOptions();
  getAllTransactionTypeOptions();
});
</script>

<style lang="scss" scoped>
.transaction-popup {
  width: 39.5rem !important;

  .btn-cancel,
  .btn-save-close {
    max-width: 196.5px;
  }

  .btn-save-add {
    max-width: 167px;
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
  .sticky-top {
    position: sticky;
    top: 0;
    z-index: 10;
  }
}
.filter-tabs-container {
  border-radius: 8px;
}

.filter-tab-btn {
  border-radius: 6px;
  transition: all 0.3s ease;

  &.active-tab {
    background-color: white !important;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
}

.form-group {
  margin-bottom: 0rem !important;
}

.q-field--with-bottom {
  margin-bottom: 0rem !important;
}
</style>
