<template>
  <q-dialog v-model="isOpen" persistent transition-show="scale" transition-hide="scale">
    <q-card class="edit-staff-card row no-wrap">
      <!-- Sidebar -->
      <div class="sidebar col-auto">
        <div class="profile-section">
          <q-img src="/images/Image-368.png" class="profile-image" </q-img>
            <q-btn v-if="isEditMode" flat no-caps class="change-photo-btn">
              <div class="row items-center justify-between ">
                <span>Change Photo</span>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M13.5 15.75H4.5C3.25736 15.75 2.25 14.7426 2.25 13.5V6.75C2.25 5.50736 3.25736 4.5 4.5 4.5H5.25L6.1875 3.125C6.5625 2.5625 7.1875 2.25 7.875 2.25H10.125C10.8125 2.25 11.4375 2.5625 11.8125 3.125L12.75 4.5H13.5C14.7426 4.5 15.75 5.50736 15.75 6.75V13.5C15.75 14.7426 14.7426 15.75 13.5 15.75Z"
                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  <path
                    d="M9 12.75C10.4503 12.75 11.625 11.5753 11.625 10.125C11.625 8.67475 10.4503 7.5 9 7.5C7.54975 7.5 6.375 8.67475 6.375 10.125C6.375 11.5753 7.54975 12.75 9 12.75Z"
                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
            </q-btn>
        </div>

        <q-separator  class="sidebar-separator" />

        <div class="tabs-section full-width">
          <div v-for="tab in tabs" :key="tab.id" class="tab-item row items-center no-wrap"
            :class="{ active: activeTab === tab.id }" @click="activeTab = tab.id">
            <div class="tab-icon">
              <component :is="tab.icon" />
            </div>
            <div class="tab-label">{{ tab.label }}</div>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="main-content col">
        <div class="header">
          <div>
            <div class="title q-mb-xs">{{ getTabTitle() }}</div>
            <div class="subtitle">
              Staff ID : {{ staffData.staffId || "251221" }}
            </div>
          </div>
          <q-btn flat round icon="close" v-close-popup class="close-btn" size="sm" />
        </div>

        <q-separator color="grey-2" class="q-mx-lg" />

        <!-- Basic Info Form -->
        <div v-if="activeTab === 'basic'" class="popup-form-grid row">
          <!-- Row 1: Full Name & Gender -->
          <div class="col-6">
            <div :class="isEditMode ? 'field-label' : 'field-label-view'">
              Full Name <span class="required">*</span>
            </div>
            <div v-if="isEditMode" class="row q-col-gutter-xs">
              <div class="col-4">
                <q-input outlined v-model="staffData.firstName" dense placeholder="First name" />
              </div>
              <div class="col-4">
                <q-input outlined v-model="staffData.middleName" dense placeholder="Middle name" />
              </div>
              <div class="col-4">
                <q-input outlined v-model="staffData.lastName" dense placeholder="Last name" />
              </div>
            </div>
            <div v-else class="field-value">
              {{ staffData.firstName }} {{ staffData.middleName }} {{ staffData.lastName }}
            </div>
          </div>
          <div class="col-6">
            <div :class="isEditMode ? 'field-label' : 'field-label-view'">
              Gender <span class="required">*</span>
            </div>
            <div v-if="isEditMode" class="row items-center q-gutter-x-sm h-input">
              <q-radio v-model="staffData.gender" val="male" label="Male" color="teal-8" dense />
              <q-radio v-model="staffData.gender" val="female" label="Female" color="teal-8" dense />
            </div>
            <div v-else class="field-value">{{ staffData.gender === 'male' ? 'Male' : 'Female' }}</div>
          </div>

          <!-- Row 2: DOB & Email -->
          <div class="col-6">
            <div :class="isEditMode ? 'field-label' : 'field-label-view'">Date Of Birth</div>
            <q-input v-if="isEditMode" outlined v-model="staffData.dob" dense placeholder="DD/MM/YYYY">
              <template v-slot:append>
                <q-icon name="event" color="grey-6" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="staffData.dob" mask="DD/MM/YYYY" color="grey-6">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
            <div v-else class="field-value">{{ staffData.dob }}</div>
          </div>
          <div class="col-6">
            <div :class="isEditMode ? 'field-label' : 'field-label-view'">Email</div>
            <q-input v-if="isEditMode" outlined v-model="staffData.email" dense placeholder="Enter email address" />
            <div v-else class="field-value">{{ staffData.email }}</div>
          </div>

          <!-- Row 3: National id & Mobile -->
          <div class="col-6">
            <div :class="isEditMode ? 'field-label' : 'field-label-view'">National id</div>
            <q-input v-if="isEditMode" outlined v-model="staffData.nationalId" dense placeholder="Enter national ID" />
            <div v-else class="field-value">{{ staffData.nationalId }}</div>
          </div>
          <div class="col-6">
            <div :class="isEditMode ? 'field-label' : 'field-label-view'">
              Mobile <span class="required">*</span>
            </div>
            <q-input v-if="isEditMode" outlined v-model="staffData.mobile" dense placeholder="Enter mobile number" />
            <div v-else class="field-value">{{ staffData.mobile }}</div>
          </div>

          <!-- Row 4: Phone & Other Contact -->
          <div class="col-6">
            <div :class="isEditMode ? 'field-label' : 'field-label-view'">Phone</div>
            <q-input v-if="isEditMode" outlined v-model="staffData.phone" dense placeholder="Enter phone number" />
            <div v-else class="field-value">{{ staffData.phone || '-' }}</div>
          </div>
          <div class="col-6">
            <div :class="isEditMode ? 'field-label' : 'field-label-view'">Other Contact</div>
            <q-input v-if="isEditMode" outlined v-model="staffData.otherContact" dense placeholder="Enter other contact" />
            <div v-else class="field-value">{{ staffData.otherContact || '-' }}</div>
          </div>

          <!-- Row 5: City & Full Address -->
          <div class="col-6">
            <div :class="isEditMode ? 'field-label' : 'field-label-view'">City</div>
            <q-select v-if="isEditMode" outlined v-model="staffData.city" :options="cityOptions" dense emit-value map-options placeholder="Select city"></q-select>
            <div v-else class="field-value">{{ staffData.city }}</div>
          </div>
          <div class="col-6">
            <div :class="isEditMode ? 'field-label' : 'field-label-view'">Full Address</div>
            <q-input v-if="isEditMode" outlined v-model="staffData.address"  dense placeholder="Enter full address" />
            <div v-else class="field-value">{{ staffData.address }}</div>
          </div>
        </div>

        <!-- Job Info Form -->
        <div v-if="activeTab === 'job'" class="popup-form-grid row">
          <!-- Row 1: Job Title & Staff Job Type -->
          <div class="col-6">
            <div :class="isEditMode ? 'field-label' : 'field-label-view'">Job Title</div>
            <q-input v-if="isEditMode" outlined v-model="staffData.jobTitle" dense placeholder="Enter job title" />
            <div v-else class="field-value">{{ staffData.jobTitle }}</div>
          </div>
          <div class="col-6">
            <div :class="isEditMode ? 'field-label' : 'field-label-view'">Staff Job Type</div>
            <q-select v-if="isEditMode" outlined v-model="staffData.jobType" :options="jobTypeOptions" dense emit-value map-options placeholder="Select job type"></q-select>
            <div v-else class="field-value">{{ staffData.jobType }}</div>
          </div>

          <!-- Row 2: Daily Salary & Recent employment -->
          <div class="col-6">
            <div :class="isEditMode ? 'field-label' : 'field-label-view'">Daily Salary</div>
            <q-input v-if="isEditMode" outlined v-model="staffData.dailySalary" dense placeholder="Enter daily salary" />
            <div v-else class="field-value">{{ staffData.dailySalary }}</div>
          </div>
          <div class="col-6">
            <div :class="isEditMode ? 'field-label' : 'field-label-view'">Recent employment</div>
            <q-input v-if="isEditMode" outlined v-model="staffData.recentEmployment" dense placeholder="Enter recent employment" />
            <div v-else class="field-value">{{ staffData.recentEmployment || '-' }}</div>
          </div>
        </div>

        <!-- Education Form -->
        <div v-if="activeTab === 'education'" class="popup-form-grid row">
          <!-- Row 1: Degree & Year of graduation -->
          <div class="col-6">
            <div :class="isEditMode ? 'field-label' : 'field-label-view'">Degree</div>
            <q-select v-if="isEditMode" outlined v-model="staffData.degree" :options="degreeOptions" dense emit-value map-options placeholder="Select degree"></q-select>
            <div v-else class="field-value">{{ staffData.degree }}</div>
          </div>
          <div class="col-6">
            <div :class="isEditMode ? 'field-label' : 'field-label-view'">Year of graduation</div>
            <q-input v-if="isEditMode" outlined v-model="staffData.graduationYear" dense placeholder="Enter graduation year" />
            <div v-else class="field-value">{{ staffData.graduationYear }}</div>
          </div>

          <!-- Row 2: Institution -->
          <div class="col-6">
            <div :class="isEditMode ? 'field-label' : 'field-label-view'">Institution</div>
            <q-select v-if="isEditMode" outlined v-model="staffData.institution" :options="institutionOptions" dense emit-value map-options placeholder="Select institution"></q-select>
            <div v-else class="field-value">{{ staffData.institution }}</div>
          </div>
        </div>

        <!-- Documents Form -->
        <div v-if="activeTab === 'documents'" class="popup-form-grid row">
          <!-- ID Card -->
          <div class="col-6">
            <div :class="isEditMode ? 'field-label' : 'field-label-view'">ID Card</div>
            <div class="document-card row items-center no-wrap q-pa-sm" :class="{ 'has-file': staffData.idCard }">
              <template v-if="staffData.idCard">
                <div class="file-icon pdf q-mr-md">
                  <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_2858_5892)">
                      <path
                        d="M3.24998 0H17.0568L24.3749 7.28977V24.375C24.3749 25.2728 23.647 26 22.75 26H3.24998C2.35296 26 1.625 25.2728 1.625 24.375V1.62498C1.625 0.727203 2.35304 0 3.24998 0Z"
                        fill="#E2574C" />
                      <path
                        d="M24.3514 7.31187H18.6875C17.7905 7.31187 17.0625 6.58391 17.0625 5.68689V0.015625L24.3514 7.31187Z"
                        fill="#B53629" />
                      <path
                        d="M18.2798 12.32C18.552 12.32 18.6853 12.0827 18.6853 11.8528C18.6853 11.6147 18.5463 11.3848 18.2798 11.3848H16.7296C16.4265 11.3848 16.2575 11.6358 16.2575 11.9129V15.7227C16.2575 16.0623 16.4509 16.2508 16.7125 16.2508C16.9725 16.2508 17.1667 16.0623 17.1667 15.7227V14.677H18.1043C18.3952 14.677 18.5407 14.4389 18.5407 14.2025C18.5407 13.971 18.3952 13.741 18.1043 13.741H17.1667V12.32H18.2798ZM13.04 11.3848H11.9057C11.5978 11.3848 11.3792 11.596 11.3792 11.9096V15.726C11.3792 16.1151 11.6936 16.237 11.9187 16.237H13.109C14.5178 16.237 15.4482 15.31 15.4482 13.8791C15.4474 12.3663 14.5716 11.3848 13.04 11.3848ZM13.0945 15.2962H12.403V12.3257H13.0262C13.9695 12.3257 14.3798 12.9586 14.3798 13.832C14.3798 14.6494 13.9768 15.2962 13.0945 15.2962ZM8.93931 11.3848H7.81563C7.49794 11.3848 7.3208 11.5944 7.3208 11.9129V15.7227C7.3208 16.0623 7.52391 16.2508 7.79689 16.2508C8.06986 16.2508 8.27297 16.0623 8.27297 15.7227V14.6104H8.97739C9.84676 14.6104 10.5642 13.9945 10.5642 13.004C10.5643 12.0348 9.87207 11.3848 8.93931 11.3848ZM8.92065 13.7167H8.27306V12.2794H8.92065C9.3204 12.2794 9.57471 12.5913 9.57471 12.9984C9.57387 13.4047 9.3204 13.7167 8.92065 13.7167Z"
                        fill="white" />
                    </g>
                    <defs>
                      <clipPath id="clip0_2858_5892">
                        <rect width="26" height="26" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div class="file-info col">
                  <div class="file-name text-weight-medium">
                    {{ staffData.idCard.name }}
                  </div>
                  <div class="file-size text-grey-6">
                    {{ staffData.idCard.size }}
                  </div>
                </div>
                <q-btn flat round dense color="red-5" @click="staffData.idCard = null" size="sm">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.0832 5H2.9165" stroke="#C81E1E" stroke-width="1.5" stroke-linecap="round" />
                    <path
                      d="M15.6946 7.08398L15.3113 12.8332C15.1638 15.0457 15.09 16.1519 14.3692 16.8263C13.6483 17.5007 12.5397 17.5007 10.3223 17.5007H9.67787C7.46054 17.5007 6.35187 17.5007 5.63103 16.8263C4.91019 16.1519 4.83644 15.0457 4.68895 12.8332L4.30566 7.08398"
                      stroke="#C81E1E" stroke-width="1.5" stroke-linecap="round" />
                    <path d="M7.9165 9.16602L8.33317 13.3327" stroke="#C81E1E" stroke-width="1.5"
                      stroke-linecap="round" />
                    <path d="M12.0832 9.16602L11.6665 13.3327" stroke="#C81E1E" stroke-width="1.5"
                      stroke-linecap="round" />
                    <path
                      d="M5.4165 5C5.46307 5 5.48635 5 5.50746 4.99947C6.19366 4.98208 6.79902 4.54576 7.03252 3.90027C7.0397 3.88041 7.04706 3.85832 7.06179 3.81415L7.14269 3.57143C7.21176 3.36423 7.24629 3.26063 7.2921 3.17267C7.47485 2.82173 7.81296 2.57803 8.20368 2.51564C8.30161 2.5 8.41082 2.5 8.62922 2.5H11.3705C11.5889 2.5 11.6981 2.5 11.796 2.51564C12.1867 2.57803 12.5248 2.82173 12.7076 3.17267C12.7534 3.26063 12.7879 3.36423 12.857 3.57143L12.9379 3.81415C12.9526 3.85826 12.96 3.88042 12.9672 3.90027C13.2007 4.54576 13.806 4.98208 14.4922 4.99947C14.5133 5 14.5366 5 14.5832 5"
                      stroke="#C81E1E" stroke-width="1.5" />
                  </svg>
                </q-btn>
              </template>
              <template v-else>
                <div class="file-placeholder row items-center full-width cursor-pointer"
                  @click="$refs.idCardInput.click()">
                  <div class="placeholder-icon q-mr-md">
                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clip-path="url(#clip0_2858_5902)">
                        <path
                          d="M3.25 0.5H16.8506L23.875 7.49609V24.375C23.875 24.9965 23.371 25.5 22.75 25.5H3.25C2.62897 25.5 2.125 24.9965 2.125 24.375V1.625L2.13086 1.50977C2.18859 0.942455 2.6679 0.5 3.25 0.5Z"
                          fill="#F9FAFB" stroke="#9CA3AF" />
                        <path
                          d="M24.3514 7.31187H18.6875C17.7905 7.31187 17.0625 6.58391 17.0625 5.68689V0.015625L24.3514 7.31187Z"
                          fill="#9CA3AF" />
                      </g>
                      <defs>
                        <clipPath id="clip0_2858_5902">
                          <rect width="26" height="26" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <div class="placeholder-text">
                    <div class="text-weight-medium">No file chosen</div>
                    <div class="text-grey-6 text-caption">
                      Click to upload ID Card
                    </div>
                  </div>
                </div>
              </template>
              <input type="file" ref="idCardInput" style="display: none"
                @change="(e) => handleFileUpload(e, 'idCard')" />
            </div>
          </div>

          <!-- CV -->
          <div class="col-6">
            <div :class="isEditMode ? 'field-label' : 'field-label-view'">CV</div>
            <div class="document-card row items-center no-wrap q-pa-sm" :class="{ 'has-file': staffData.cv }">
              <template v-if="staffData.cv">
                <div class="file-icon generic q-mr-md">
                  <q-icon name="description" color="white" size="20px" />
                </div>
                <div class="file-info col">
                  <div class="file-name text-weight-medium">
                    {{ staffData.cv.name }}
                  </div>
                  <div class="file-size text-grey-6">
                    {{ staffData.cv.size }}
                  </div>
                </div>
                <q-btn flat round dense color="red-5" icon="delete_outline" @click="staffData.cv = null" size="sm" />
              </template>
              <template v-else>
                <div class="file-placeholder row items-center full-width cursor-pointer" @click="$refs.cvInput.click()">
                  <div class="placeholder-icon q-mr-md">
                    <q-icon name="insert_drive_file" color="grey-5" size="24px" />
                  </div>
                  <div class="placeholder-text">
                    <div class="text-weight-medium">No file chosen</div>
                    <div class="text-grey-6 text-caption">
                      Click to upload CV
                    </div>
                  </div>
                </div>
              </template>
              <input type="file" ref="cvInput" style="display: none" @change="(e) => handleFileUpload(e, 'cv')" />
            </div>
          </div>
        </div>
        <!-- </q-scroll-area> -->

        <!-- Footer -->
        <div class="footer">
          <q-btn flat no-caps label="Cancel" class="cancel-btn" v-close-popup />
          <q-btn v-if="!isEditMode" no-caps label="Edit" class="save-btn" @click="isEditMode = true" unelevated />
          <q-btn v-else no-caps label="Save Changes" class="save-btn" @click="saveChanges" unelevated />
        </div>
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, defineEmits, watch, markRaw, h } from "vue";

const props = defineProps({
  modelValue: Boolean,
  staffInfo: Object,
  initialEditMode: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue", "save"]);

const isOpen = ref(props.modelValue);
const isEditMode = ref(false);
const activeTab = ref("basic");

const staffData = ref({
  id: null,
  staffId: "251221",
  firstName: "Ahmed",
  middleName: "Mansour",
  lastName: "Al-Otaibi",
  gender: "male",
  dob: "15/05/1992",
  email: "ahmed@example.com",
  nationalId: "1092837465",
  mobile: "+971 50 123 4567",
  phone: "+25713405",
  otherContact: "+971 55 987 6543",
  city: "Dubai",
  address: "Villa 12, Street 45, Al Barsha 1, Dubai, UAE",
  jobTitle: "Accountant",
  jobType: "Teaching staff",
  dailySalary: "200 AED",
  recentEmployment: "",
  degree: "High School",
  graduationYear: "2014",
  institution: "USA",
  idCard: { name: "ID_Card_Scan.pdf", size: "3 MB" },
  cv: null,
});

const cityOptions = ["Dubai", "Abu Dhabi", "Sharjah"];
const jobTypeOptions = [
  "Teaching staff",
  "Administrative staff",
  "Support staff",
];
const degreeOptions = ["High School", "Bachelor", "Master", "PhD"];
const institutionOptions = ["USA", "EGY", "UAE", "UK"];

const handleFileUpload = (event, type) => {
  const file = event.target.files[0];
  if (file) {
    staffData.value[type] = {
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(1) + " MB",
    };
  }
};

const getTabTitle = () => {
  switch (activeTab.value) {
    case "basic":
      return "Edit Basic Information";
    case "job":
      return "Edit Job Information";
    case "education":
      return "Edit Education";
    case "documents":
      return "Edit Documents";
    default:
      return "Edit Staff Information";
  }
};

// SVG icon definitions
const iconSVGs = {
  basic: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 10C12.0711 10 13.75 8.32107 13.75 6.25C13.75 4.17893 12.0711 2.5 10 2.5C7.92893 2.5 6.25 4.17893 6.25 6.25C6.25 8.32107 7.92893 10 10 10Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M16.25 17.5C16.25 14.7386 13.4515 12.5 10 12.5C6.54848 12.5 3.75 14.7386 3.75 17.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  job: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M11.948 1.25H12.052C12.9505 1.24997 13.6997 1.24995 14.2945 1.32991C14.9223 1.41432 15.4891 1.59999 15.9445 2.05546C16.4 2.51093 16.5857 3.07773 16.6701 3.70552C16.7292 4.14512 16.7446 4.66909 16.7486 5.27533C17.3971 5.29614 17.9752 5.33406 18.489 5.40314C19.6614 5.56076 20.6104 5.89288 21.3588 6.64124C22.1071 7.38961 22.4392 8.33856 22.5969 9.51098C22.75 10.6502 22.75 12.1058 22.75 13.9436V14.0564C22.75 15.8942 22.75 17.3498 22.5969 18.489C22.4392 19.6614 22.1071 20.6104 21.3588 21.3588C20.6104 22.1071 19.6614 22.4392 18.489 22.5969C17.3498 22.75 15.8942 22.75 14.0564 22.75H9.94359C8.10583 22.75 6.65019 22.75 5.51098 22.5969C4.33856 22.4392 3.38961 22.1071 2.64124 21.3588C1.89288 20.6104 1.56076 19.6614 1.40314 18.489C1.24997 17.3498 1.24998 15.8942 1.25 14.0564V13.9436C1.24998 12.1058 1.24997 10.6502 1.40314 9.51098C1.56076 8.33856 1.89288 7.38961 2.64124 6.64124C3.38961 5.89288 4.33856 5.56076 5.51098 5.40314C6.02475 5.33406 6.60288 5.29614 7.2514 5.27533C7.2554 4.66909 7.27081 4.14512 7.32991 3.70552C7.41432 3.07773 7.59999 2.51093 8.05546 2.05546C8.51093 1.59999 9.07773 1.41432 9.70552 1.32991C10.3003 1.24995 11.0495 1.24997 11.948 1.25ZM8.7518 5.25178C9.12993 5.24999 9.52694 5.25 9.94358 5.25H14.0564C14.4731 5.25 14.8701 5.24999 15.2482 5.25178C15.244 4.68146 15.23 4.25125 15.1835 3.90539C15.1214 3.44393 15.0142 3.24644 14.8839 3.11612C14.7536 2.9858 14.5561 2.87858 14.0946 2.81654C13.6116 2.7516 12.964 2.75 12 2.75C11.036 2.75 10.3884 2.7516 9.90539 2.81654C9.44393 2.87858 9.24643 2.9858 9.11612 3.11612C8.9858 3.24644 8.87858 3.44393 8.81654 3.90539C8.77004 4.25125 8.75601 4.68146 8.7518 5.25178ZM5.71085 6.88976C4.70476 7.02503 4.12511 7.2787 3.7019 7.70191C3.27869 8.12511 3.02502 8.70476 2.88976 9.71085C2.75159 10.7385 2.75 12.0932 2.75 14C2.75 15.9068 2.75159 17.2615 2.88976 18.2892C3.02502 19.2952 3.27869 19.8749 3.7019 20.2981C4.12511 20.7213 4.70476 20.975 5.71085 21.1102C6.73851 21.2484 8.09318 21.25 10 21.25H14C15.9068 21.25 17.2615 21.2484 18.2892 21.1102C19.2952 20.975 19.8749 20.7213 20.2981 20.2981C20.7213 19.8749 20.975 19.2952 21.1102 18.2892C21.2484 17.2615 21.25 15.9068 21.25 14C21.25 12.0932 21.2484 10.7385 21.1102 9.71085C20.975 8.70476 20.7213 8.12511 20.2981 7.70191C19.8749 7.2787 19.2952 7.02503 18.2892 6.88976C17.2615 6.7516 15.9068 6.75 14 6.75H10C8.09318 6.75 6.73851 6.7516 5.71085 6.88976Z" fill="#D1D5DB"/>
    <path d="M17 9C17 9.55229 16.5523 10 16 10C15.4477 10 15 9.55229 15 9C15 8.44772 15.4477 8 16 8C16.5523 8 17 8.44772 17 9Z" fill="#D1D5DB"/>
    <path d="M9 9C9 9.55229 8.55229 10 8 10C7.44772 10 7 9.55229 7 9C7 8.44772 7.44772 8 8 8C8.55229 8 9 8.44772 9 9Z" fill="#D1D5DB"/>
  </svg>`,

  education: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M9.46435 2.82057C11.0871 2.05981 12.9128 2.05981 14.5356 2.82057L21.2268 5.95756C22.2791 6.4509 22.75 7.52222 22.75 8.50002C22.75 9.47782 22.2791 10.5491 21.2268 11.0425L19.75 11.7348V16.6254C19.75 17.8785 19.1217 19.0883 17.978 19.7217C17.2263 20.138 16.2384 20.6391 15.1988 21.038C14.1715 21.4321 13.0339 21.75 12 21.75C10.9661 21.75 9.82851 21.4321 8.80116 21.038C7.76158 20.6391 6.77371 20.138 6.02198 19.7217C4.87826 19.0883 4.25 17.8785 4.25 16.6254V11.7348L2.77323 11.0424L2.75 11.0314V14C2.75 14.4142 2.41421 14.75 2 14.75C1.58579 14.75 1.25 14.4142 1.25 14V8.5C1.25 7.5222 1.72095 6.45085 2.77324 5.95752L9.46435 2.82057ZM5.75 12.438V16.6254C5.75 17.3884 6.12875 18.0661 6.74868 18.4095C7.46533 18.8063 8.38678 19.2724 9.33844 19.6375C10.3023 20.0073 11.2379 20.25 12 20.25C12.7621 20.25 13.6977 20.0073 14.6616 19.6375C15.6132 19.2724 16.5347 18.8063 17.2513 18.4095C17.8713 18.0661 18.25 17.3884 18.25 16.6254V12.4381L14.5357 14.1794C12.9129 14.9402 11.0872 14.9402 9.46444 14.1794L5.75 12.438ZM3.40996 9.68429C3.00679 9.49527 2.75 9.04438 2.75 8.49998C2.75 7.95557 3.00679 7.50469 3.40997 7.31567L10.1011 4.17872C11.3204 3.60709 12.6795 3.60709 13.8988 4.17873L20.59 7.31571C20.9932 7.50473 21.25 7.95562 21.25 8.50002C21.25 9.04443 20.9932 9.49531 20.59 9.68433L13.8989 12.8213C12.6796 13.3929 11.3205 13.3929 10.1012 12.8213L3.40996 9.68429Z" fill="#D1D5DB"/>
  </svg>`,

  documents: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M11.948 1.25H12.052C12.9505 1.24997 13.6997 1.24995 14.2945 1.32991C14.9223 1.41432 15.4891 1.59999 15.9445 2.05546C16.4 2.51093 16.5857 3.07773 16.6701 3.70552C16.7292 4.14512 16.7446 4.66909 16.7486 5.27533C17.3971 5.29614 17.9752 5.33406 18.489 5.40314C19.6614 5.56076 20.6104 5.89288 21.3588 6.64124C22.1071 7.38961 22.4392 8.33856 22.5969 9.51098C22.75 10.6502 22.75 12.1058 22.75 13.9436V14.0564C22.75 15.8942 22.75 17.3498 22.5969 18.489C22.4392 19.6614 22.1071 20.6104 21.3588 21.3588C20.6104 22.1071 19.6614 22.4392 18.489 22.5969C17.3498 22.75 15.8942 22.75 14.0564 22.75H9.94359C8.10583 22.75 6.65019 22.75 5.51098 22.5969C4.33856 22.4392 3.38961 22.1071 2.64124 21.3588C1.89288 20.6104 1.56076 19.6614 1.40314 18.489C1.24997 17.3498 1.24998 15.8942 1.25 14.0564V13.9436C1.24998 12.1058 1.24997 10.6502 1.40314 9.51098C1.56076 8.33856 1.89288 7.38961 2.64124 6.64124C3.38961 5.89288 4.33856 5.56076 5.51098 5.40314C6.02475 5.33406 6.60288 5.29614 7.2514 5.27533C7.2554 4.66909 7.27081 4.14512 7.32991 3.70552C7.41432 3.07773 7.59999 2.51093 8.05546 2.05546C8.51093 1.59999 9.07773 1.41432 9.70552 1.32991C10.3003 1.24995 11.0495 1.24997 11.948 1.25ZM8.7518 5.25178C9.12993 5.24999 9.52694 5.25 9.94358 5.25H14.0564C14.4731 5.25 14.8701 5.24999 15.2482 5.25178C15.244 4.68146 15.23 4.25125 15.1835 3.90539C15.1214 3.44393 15.0142 3.24644 14.8839 3.11612C14.7536 2.9858 14.5561 2.87858 14.0946 2.81654C13.6116 2.7516 12.964 2.75 12 2.75C11.036 2.75 10.3884 2.7516 9.90539 2.81654C9.44393 2.87858 9.24643 2.9858 9.11612 3.11612C8.9858 3.24644 8.87858 3.44393 8.81654 3.90539C8.77004 4.25125 8.75601 4.68146 8.7518 5.25178ZM5.71085 6.88976C4.70476 7.02503 4.12511 7.2787 3.7019 7.70191C3.27869 8.12511 3.02502 8.70476 2.88976 9.71085C2.75159 10.7385 2.75 12.0932 2.75 14C2.75 15.9068 2.75159 17.2615 2.88976 18.2892C3.02502 19.2952 3.27869 19.8749 3.7019 20.2981C4.12511 20.7213 4.70476 20.975 5.71085 21.1102C6.73851 21.2484 8.09318 21.25 10 21.25H14C15.9068 21.25 17.2615 21.2484 18.2892 21.1102C19.2952 20.975 19.8749 20.7213 20.2981 20.2981C20.7213 19.8749 20.975 19.2952 21.1102 18.2892C21.2484 17.2615 21.25 15.9068 21.25 14C21.25 12.0932 21.2484 10.7385 21.1102 9.71085C20.975 8.70476 20.7213 8.12511 20.2981 7.70191C19.8749 7.2787 19.2952 7.02503 18.2892 6.88976C17.2615 6.7516 15.9068 6.75 14 6.75H10C8.09318 6.75 6.73851 6.7516 5.71085 6.88976Z" fill="#D1D5DB"/>
    <path d="M17 9C17 9.55229 16.5523 10 16 10C15.4477 10 15 9.55229 15 9C15 8.44772 15.4477 8 16 8C16.5523 8 17 8.44772 17 9Z" fill="#D1D5DB"/>
    <path d="M9 9C9 9.55229 8.55229 10 8 10C7.44772 10 7 9.55229 7 9C7 8.44772 7.44772 8 8 8C8.55229 8 9 8.44772 9 9Z" fill="#D1D5DB"/>
  </svg>`
};

// Helper function to create icon component
const createIcon = (svgString) => markRaw({
  render: () => h("div", { innerHTML: svgString })
});

const tabs = [
  { id: "basic", label: "Basic Info", icon: createIcon(iconSVGs.basic) },
  { id: "job", label: "Job Info", icon: createIcon(iconSVGs.job) },
  { id: "education", label: "Education", icon: createIcon(iconSVGs.education) },
  { id: "documents", label: "Documents", icon: createIcon(iconSVGs.documents) },
];

watch(
  () => props.modelValue,
  (val) => {
    isOpen.value = val;
  },
);

watch(isOpen, (val) => {
  emit("update:modelValue", val);
  if (!val) {
    isEditMode.value = false; // Reset to view mode when closing
  }
});

watch(
  () => props.staffInfo,
  (newVal) => {
    if (newVal) {
      staffData.value = { ...staffData.value, ...newVal };
      isEditMode.value = props.initialEditMode; // Set edit mode based on prop
      // Assuming name is joined in props
      if (newVal.name) {
        const parts = newVal.name.split(" ");
        staffData.value.firstName = parts[0] || "";
        staffData.value.middleName = parts.length > 2 ? parts[1] || "" : "";
        staffData.value.lastName =
          parts.length > 2 ? parts.slice(2).join(" ") : parts[1] || "";
      }
    }
  },
  { immediate: true },
);

const saveChanges = () => {
  emit("save", staffData.value);
  isOpen.value = false;
};
</script>

<style lang="scss" scoped>
// Styles have been moved to src/css/popupDesign.scss</style>
