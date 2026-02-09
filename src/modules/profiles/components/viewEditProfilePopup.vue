<template>
  <q-dialog
    v-model="isOpen"
    persistent
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card class="edit-view-card row no-wrap">
      <!-- Sidebar -->
      <div class="sidebar col-auto">
        <div class="profile-section">
          <q-img src="/images/Image-368.png" class="profile-image" />
          <q-file
            v-if="isEditMode"
            v-model="profileData.imageFile"
            outlined
            dense
            label="Change Photo"
            class="change-photo-btn"
            accept="image/*"
          >
            <template v-slot:append>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M6.3321 3.73888C6.55446 2.64732 7.52582 1.875 8.6387 1.875H11.3615C12.4743 1.875 13.4457 2.64732 13.6681 3.73888C13.7194 3.99087 13.9477 4.17571 14.1851 4.17571H14.1987L14.2124 4.17631C15.3819 4.22745 16.2802 4.37097 17.0302 4.86298C17.5027 5.17297 17.9092 5.57181 18.2259 6.0372C18.62 6.61622 18.7938 7.28079 18.8771 8.08454C18.9584 8.86983 18.9584 9.85417 18.9584 11.1009V11.1719C18.9584 12.4186 18.9584 13.4029 18.8771 14.1882C18.7938 14.9919 18.62 15.6565 18.2259 16.2355C17.9092 16.7009 17.5027 17.0998 17.0302 17.4097C16.444 17.7943 15.7719 17.9639 14.9568 18.0453C14.1587 18.125 13.1576 18.125 11.8863 18.125H8.11389C6.84257 18.125 5.84147 18.125 5.04338 18.0453C4.22824 17.9639 3.55618 17.7943 2.96995 17.4097C2.49743 17.0998 2.09096 16.7009 1.77424 16.2355C1.38018 15.6565 1.20638 14.9919 1.1231 14.1882C1.04174 13.4029 1.04174 12.4186 1.04175 11.1718V11.1009C1.04174 9.85417 1.04174 8.86983 1.1231 8.08454C1.20638 7.28079 1.38018 6.61622 1.77424 6.0372C2.09096 5.57181 2.49743 5.17297 2.96995 4.86298C3.71994 4.37097 4.61825 4.22745 5.78777 4.17631L5.80142 4.17571H5.81508C6.05248 4.17571 6.28077 3.99087 6.3321 3.73888ZM8.6387 3.125C8.10443 3.125 7.65763 3.49416 7.55695 3.98839C7.3939 4.78883 6.68425 5.41822 5.83036 5.42565C4.70652 5.47558 4.10455 5.61363 3.65561 5.90815C3.31933 6.12876 3.03134 6.41175 2.80763 6.74047C2.5775 7.07862 2.43921 7.51104 2.36644 8.21337C2.29253 8.92672 2.29175 9.84634 2.29175 11.1364C2.29175 12.4264 2.29253 13.346 2.36644 14.0594C2.43921 14.7617 2.5775 15.1941 2.80763 15.5323C3.03134 15.861 3.31933 16.144 3.65561 16.3646C4.00355 16.5928 4.44878 16.7297 5.16761 16.8015C5.89632 16.8743 6.83503 16.875 8.14823 16.875H11.8519C13.1651 16.875 14.1038 16.8743 14.8326 16.8015C15.5514 16.7297 15.9966 16.5928 16.3445 16.3646C16.6808 16.144 16.9688 15.861 17.1925 15.5323C17.4227 15.1941 17.561 14.7617 17.6337 14.0594C17.7076 13.346 17.7084 12.4264 17.7084 11.1364C17.7084 9.84634 17.7076 8.92672 17.6337 8.21337C17.561 7.51104 17.4227 7.07862 17.1925 6.74047C16.9688 6.41175 16.6808 6.12876 16.3445 5.90815C15.8956 5.61363 15.2936 5.47558 14.1698 5.42565C13.3159 5.41822 12.6063 4.78883 12.4432 3.98839C12.3425 3.49416 11.8957 3.125 11.3615 3.125H8.6387ZM10.0001 8.95833C8.96455 8.95833 8.12508 9.7978 8.12508 10.8333C8.12508 11.8689 8.96455 12.7083 10.0001 12.7083C11.0356 12.7083 11.8751 11.8689 11.8751 10.8333C11.8751 9.7978 11.0356 8.95833 10.0001 8.95833ZM6.87508 10.8333C6.87508 9.10744 8.27419 7.70833 10.0001 7.70833C11.726 7.70833 13.1251 9.10744 13.1251 10.8333C13.1251 12.5592 11.726 13.9583 10.0001 13.9583C8.27419 13.9583 6.87508 12.5592 6.87508 10.8333ZM14.3751 8.33333C14.3751 7.98816 14.6549 7.70833 15.0001 7.70833H15.8334C16.1786 7.70833 16.4584 7.98816 16.4584 8.33333C16.4584 8.67851 16.1786 8.95833 15.8334 8.95833H15.0001C14.6549 8.95833 14.3751 8.67851 14.3751 8.33333Z"
                  fill="#6B7280"
                />
              </svg>
            </template>
          </q-file>
        </div>
      </div>

      <!-- Main Content -->
      <div class="main-content col">
        <div class="header">
          <div>
            <div class="title">
              {{ profileData.fullName || "Profile Name" }}
            </div>
            <div class="row items-center q-gutter-lg">
              <div class="subtitle">
                Profile ID : {{ profileData.profileId || "251221" }}
              </div>
              <div class="subtitle">
                Registration Date :
                {{ profileData.registrationDate || "Oct 16, 2025, 9:25 AM" }}
              </div>
            </div>
          </div>
          <q-btn
            flat
            round
            icon="close"
            v-close-popup
            class="close-btn"
            size="sm"
          />
        </div>

        <q-separator color="grey-2" class="q-mx-lg" />

        <!-- Content Area -->
        <div class="popup-form-grid row">
          <!-- Full Name -->
          <div class="col-6">
            <div :class="isEditMode ? 'field-label' : 'field-label-view'">
              Full Name
            </div>
            <q-input
              v-if="isEditMode"
              outlined
              v-model="profileData.fullName"
              dense
              placeholder="Enter full name"
            />
            <div v-else class="field-value">{{ profileData.fullName }}</div>
          </div>

          <!-- Gender -->
          <div class="col-6">
            <div :class="isEditMode ? 'field-label' : 'field-label-view'">
              Gender
            </div>
            <q-select
              v-if="isEditMode"
              outlined
              v-model="profileData.gender"
              :options="['Male', 'Female']"
              dense
              placeholder="Select gender"
            ></q-select>
            <div v-else class="field-value">{{ profileData.gender }}</div>
          </div>

          <!-- Date of Birth -->
          <div class="col-6">
            <div :class="isEditMode ? 'field-label' : 'field-label-view'">
              Date Of Birth
            </div>
            <q-input
              v-if="isEditMode"
              outlined
              v-model="profileData.dob"
              dense
              placeholder="DD/MM/YYYY"
            >
              <template v-slot:append>
                <div class="cursor-pointer row items-center">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
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
                  </svg>
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date
                      v-model="profileData.dob"
                      mask="DD/MM/YYYY"
                      color="grey-6"
                    >
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
                </div>
              </template>
            </q-input>
            <div v-else class="field-value">{{ profileData.dob }}</div>
          </div>

          <!-- Main Account -->
          <div class="col-6">
            <div :class="isEditMode ? 'field-label' : 'field-label-view'">
              Main Account
            </div>
            <q-select
              v-if="isEditMode"
              outlined
              v-model="profileData.mainAccount"
              :options="accountTypeOptions"
              dense
              placeholder="Select main account"
            ></q-select>
            <div v-else class="field-value">{{ profileData.mainAccount }}</div>
          </div>

          <!-- National ID -->
          <div class="col-6">
            <div :class="isEditMode ? 'field-label' : 'field-label-view'">
              National Id
            </div>
            <q-input
              v-if="isEditMode"
              outlined
              v-model="profileData.nationalId"
              dense
              placeholder="Enter national ID"
            />
            <div v-else class="field-value">{{ profileData.nationalId }}</div>
          </div>

          <!-- Email -->
          <div class="col-6">
            <div :class="isEditMode ? 'field-label' : 'field-label-view'">
              Email
            </div>
            <q-input
              v-if="isEditMode"
              outlined
              v-model="profileData.email"
              dense
              placeholder="Enter email address"
            />
            <div v-else class="field-value">{{ profileData.email }}</div>
          </div>

          <!-- Phone -->
          <div class="col-6">
            <div :class="isEditMode ? 'field-label' : 'field-label-view'">
              Phone
            </div>
            <q-input
              v-if="isEditMode"
              outlined
              v-model="profileData.phone"
              dense
              placeholder="Enter phone number"
            />
            <div v-else class="field-value">{{ profileData.phone || "-" }}</div>
          </div>

          <!-- Mobile -->
          <div class="col-6">
            <div :class="isEditMode ? 'field-label' : 'field-label-view'">
              Mobile
            </div>
            <q-input
              v-if="isEditMode"
              outlined
              v-model="profileData.mobile"
              dense
              placeholder="Enter mobile number"
            />
            <div v-else class="field-value">{{ profileData.mobile }}</div>
          </div>

          <!-- City -->
          <div class="col-6">
            <div :class="isEditMode ? 'field-label' : 'field-label-view'">
              City
            </div>
            <q-select
              v-if="isEditMode"
              outlined
              v-model="profileData.city"
              :options="cityOptions"
              dense
              placeholder="Select city"
            ></q-select>
            <div v-else class="field-value">{{ profileData.city }}</div>
          </div>

          <!-- Full Address -->
          <div class="col-6">
            <div :class="isEditMode ? 'field-label' : 'field-label-view'">
              Full Address
            </div>
            <q-input
              v-if="isEditMode"
              outlined
              v-model="profileData.address"
              dense
              placeholder="Enter full address"
            />
            <div v-else class="field-value">{{ profileData.address }}</div>
          </div>
        </div>

        <!-- Footer -->
        <div class="footer">
          <q-btn flat no-caps label="Cancel" class="cancel-btn" v-close-popup />
          <q-btn
            v-if="!isEditMode"
            no-caps
            label="Edit"
            class="save-btn"
            @click="isEditMode = true"
            unelevated
          />
          <q-btn
            v-else
            no-caps
            label="Save Changes"
            class="save-btn"
            @click="saveChanges"
            unelevated
          />
        </div>
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  modelValue: Boolean,
  profileInfo: Object,
  initialEditMode: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue", "save"]);

const isOpen = ref(props.modelValue);
const isEditMode = ref(false);

const profileData = ref({
  id: null,
  profileId: "251221",
  fullName: "Ahmed Mansour Al-Otaibi",
  gender: "Male",
  dob: "15/05/1992",
  mainAccount: "Cash Box",
  nationalId: "1092837465",
  email: "ahmed@example.com",
  phone: "-",
  mobile: "+971 50 123 4567",
  city: "Dubai",
  address: "Villa 12, Street 45, Al Barsha 1, Dubai, UAE",
  image: "https://cdn.quasar.dev/img/avatar.png",
  imageFile: null,
  registrationDate: "Oct 16, 2025, 9:25 AM",
});

const cityOptions = ["Dubai", "Abu Dhabi", "Sharjah"];
const accountTypeOptions = [
  "Expenses",
  "Income Fees",
  "Cash Box",
  "Purchase",
  "Bank Accounts",
  "Deductions",
];

watch(
  () => props.modelValue,
  (newVal) => {
    isOpen.value = newVal;
    if (newVal && props.profileInfo) {
      profileData.value = { ...profileData.value, ...props.profileInfo };
      isEditMode.value = props.initialEditMode; // Set edit mode based on prop
    }
  },
);

watch(isOpen, (newVal) => {
  emit("update:modelValue", newVal);
  if (!newVal) {
    isEditMode.value = false; // Reset to view mode when closing
  }
});

const saveChanges = () => {
  emit("save", profileData.value);
  isOpen.value = false;
};
</script>
