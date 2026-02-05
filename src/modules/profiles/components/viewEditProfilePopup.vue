<template>
  <q-dialog
    v-model="isOpen"
    persistent
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card class="edit-staff-card row no-wrap">
      <!-- Sidebar -->
      <div class="sidebar col-auto">
        <div class="profile-section">
          <q-img src="/images/Image-368.png" class="profile-image" />
          <q-btn v-if="isEditMode" flat no-caps class="change-photo-btn">
            <div class="row items-center justify-between">
              <span>Change Photo</span>
              <q-icon name="photo_camera" size="18px" />
            </div>
          </q-btn>
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
                <q-icon name="event" color="grey-6" class="cursor-pointer">
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
                </q-icon>
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
