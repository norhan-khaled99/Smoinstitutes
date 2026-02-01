<template>
  <q-dialog v-model="isOpen" persistent transition-show="scale" transition-hide="scale">
    <q-card class="edit-staff-card row no-wrap">
      <!-- Sidebar -->
      <div class="sidebar col-auto q-pa-lg flex column">
        <div class="profile-section text-center q-mb-lg">
          <q-img src="https://img.freepik.com/free-photo/handsome-young-man-with-new-haircut_176420-19636.jpg"
            class="profile-image q-mb-md">
            <template v-slot:loading>
              <q-spinner-dots color="white" />
            </template>
          </q-img>
          <q-btn unelevated no-caps class="change-photo-btn full-width">
            <div class="row items-center justify-between full-width">
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

        <div class="tabs-section full-width">
          <div v-for="tab in tabs" :key="tab.id" class="tab-item row items-center no-wrap"
            :class="{ active: activeTab === tab.id }" @click="activeTab = tab.id">
            <div class="tab-icon q-mr-md">
              <component :is="tab.icon" />
            </div>
            <div class="tab-label">{{ tab.label }}</div>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="main-content col column">
        <div class="header row items-center justify-between q-px-lg q-pt-lg q-pb-md">
          <div>
            <div class="title q-mb-xs">{{ getTabTitle() }}</div>
            <div class="subtitle">
              Staff ID : {{ staffData.staffId || "251221" }}
            </div>
          </div>
          <q-btn flat round icon="close" v-close-popup class="close-btn" size="sm" />
        </div>

        <q-separator color="grey-2" class="q-mx-lg" />

        <q-scroll-area class="col q-px-lg q-py-md">
          <!-- Basic Info Form -->
          <div v-if="activeTab === 'basic'" class="form-grid row q-col-gutter-x-lg q-col-gutter-y-md q-pt-md">
            <!-- Row 1: Full Name & Gender -->
            <div class="col-7">
              <div class="field-label">
                Full Name <span class="required">*</span>
              </div>
              <div class="row q-col-gutter-xs">
                <div class="col-4">
                  <q-input outlined v-model="staffData.firstName" dense placeholder="Ahmed" />
                </div>
                <div class="col-4">
                  <q-input outlined v-model="staffData.middleName" dense placeholder="Mansour" />
                </div>
                <div class="col-4">
                  <q-input outlined v-model="staffData.lastName" dense placeholder="Al-Otaibi" />
                </div>
              </div>
            </div>
            <div class="col-5">
              <div class="field-label">
                Gender <span class="required">*</span>
              </div>
              <div class="row items-center q-gutter-x-sm h-input">
                <q-radio v-model="staffData.gender" val="male" label="Male" color="teal-8" dense />
                <q-radio v-model="staffData.gender" val="female" label="Female" color="teal-8" dense />
              </div>
            </div>

            <!-- Row 2: DOB & Email -->
            <div class="col-6">
              <div class="field-label">Date Of Birth</div>
              <q-input outlined v-model="staffData.dob" dense placeholder="15/05/1992">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer" color="grey-6" size="20px">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-date v-model="staffData.dob" mask="DD/MM/YYYY" color="teal-8">
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Close" color="primary" flat />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
            <div class="col-6">
              <div class="field-label">Email</div>
              <q-input outlined v-model="staffData.email" dense placeholder="ahmed@example.com" />
            </div>

            <!-- Row 3: National id & Mobile -->
            <div class="col-6">
              <div class="field-label">National id</div>
              <q-input outlined v-model="staffData.nationalId" dense placeholder="1092837465" />
            </div>
            <div class="col-6">
              <div class="field-label">
                Mobile <span class="required">*</span>
              </div>
              <q-input outlined v-model="staffData.mobile" dense placeholder="+971 50 123 4567" />
            </div>

            <!-- Row 4: Phone & Other Contact -->
            <div class="col-6">
              <div class="field-label">Phone</div>
              <q-input outlined v-model="staffData.phone" dense placeholder="+25713405" />
            </div>
            <div class="col-6">
              <div class="field-label">Other Contact</div>
              <q-input outlined v-model="staffData.otherContact" dense placeholder="+971 55 987 6543" />
            </div>

            <!-- Row 5: City & Full Address -->
            <div class="col-5">
              <div class="field-label">City</div>
              <q-select outlined v-model="staffData.city" :options="cityOptions" dense emit-value map-options
                placeholder="Dubai">
                <template v-slot:append>
                  <q-icon name="expand_more" color="grey-6" />
                </template>
              </q-select>
            </div>
            <div class="col-7">
              <div class="field-label">Full Address</div>
              <q-input outlined v-model="staffData.address" dense
                placeholder="Villa 12, Street 45, Al Barsha 1, Dubai, UAE" />
            </div>
          </div>

          <!-- Job Info Form -->
          <div v-if="activeTab === 'job'" class="form-grid row q-col-gutter-x-lg q-col-gutter-y-md q-pt-md">
            <!-- Row 1: Job Title & Staff Job Type -->
            <div class="col-6">
              <div class="field-label">Job Title</div>
              <q-input outlined v-model="staffData.jobTitle" dense placeholder="Accountant" />
            </div>
            <div class="col-6">
              <div class="field-label">Staff Job Type</div>
              <q-select outlined v-model="staffData.jobType" :options="jobTypeOptions" dense emit-value map-options
                placeholder="Teaching staff">
                <template v-slot:append>
                  <q-icon name="expand_more" color="grey-6" />
                </template>
              </q-select>
            </div>

            <!-- Row 2: Daily Salary & Recent employment -->
            <div class="col-6">
              <div class="field-label">Daily Salary</div>
              <q-input outlined v-model="staffData.dailySalary" dense placeholder="200 AED" />
            </div>
            <div class="col-6">
              <div class="field-label">Recent employment</div>
              <q-input outlined v-model="staffData.recentEmployment" dense placeholder="" />
            </div>
          </div>

          <!-- Education Form -->
          <div v-if="activeTab === 'education'" class="form-grid row q-col-gutter-x-lg q-col-gutter-y-md q-pt-md">
            <!-- Row 1: Degree & Year of graduation -->
            <div class="col-6">
              <div class="field-label">Degree</div>
              <q-select outlined v-model="staffData.degree" :options="degreeOptions" dense emit-value map-options
                placeholder="High School">
                <template v-slot:append>
                  <q-icon name="expand_more" color="grey-6" />
                </template>
              </q-select>
            </div>
            <div class="col-6">
              <div class="field-label">Year of graduation</div>
              <q-input outlined v-model="staffData.graduationYear" dense placeholder="2014" />
            </div>

            <!-- Row 2: Institution -->
            <div class="col-6">
              <div class="field-label">Institution</div>
              <q-select outlined v-model="staffData.institution" :options="institutionOptions" dense emit-value
                map-options placeholder="USA">
                <template v-slot:append>
                  <q-icon name="expand_more" color="grey-6" />
                </template>
              </q-select>
            </div>
          </div>

          <!-- Documents Form -->
          <div v-if="activeTab === 'documents'" class="form-grid row q-col-gutter-x-lg q-col-gutter-y-md q-pt-md">
            <!-- ID Card -->
            <div class="col-6">
              <div class="field-label">ID Card</div>
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
              <div class="field-label">CV</div>
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
                  <div class="file-placeholder row items-center full-width cursor-pointer"
                    @click="$refs.cvInput.click()">
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
        </q-scroll-area>

        <!-- Footer -->
        <div class="footer row items-center justify-end q-pa-lg q-gutter-x-md">
          <q-btn flat no-caps label="Cancel" class="cancel-btn" v-close-popup />
          <q-btn no-caps label="Save Changes" class="save-btn" @click="saveChanges" unelevated />
        </div>
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch, markRaw } from "vue";

const props = defineProps({
  modelValue: Boolean,
  staffInfo: Object,
});

const emit = defineEmits(["update:modelValue", "save"]);

const isOpen = ref(props.modelValue);
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
      return "Basic Information";
    case "job":
      return "Job Information";
    case "education":
      return "Education";
    case "documents":
      return "Documents";
    default:
      return "Staff Information";
  }
};

const tabs = [
  {
    id: "basic",
    label: "Basic Info",
    icon: markRaw({
      template: `
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 10C12.0711 10 13.75 8.32107 13.75 6.25C13.75 4.17893 12.0711 2.5 10 2.5C7.92893 2.5 6.25 4.17893 6.25 6.25C6.25 8.32107 7.92893 10 10 10Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M16.25 17.5C16.25 14.7386 13.4515 12.5 10 12.5C6.54848 12.5 3.75 14.7386 3.75 17.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      `,
    }),
  },
  {
    id: "job",
    label: "Job Info",
    icon: markRaw({
      template: `
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.66667 5.83333V4.16667C6.66667 3.24619 7.41286 2.5 8.33333 2.5H11.6667C12.5871 2.5 13.3333 3.24619 13.3333 4.16667V5.83333M6.66667 5.83333H3.33333C2.41286 5.83333 1.66667 6.57953 1.66667 7.5V15.8333C1.66667 16.7538 2.41286 17.5 3.33333 17.5H16.6667C17.5871 17.5 18.3333 16.7538 18.3333 15.8333V7.5C18.3333 6.57953 17.5871 5.83333 16.6667 5.83333H13.3333M6.66667 5.83333V9.16667C6.66667 10.0871 7.41286 10.8333 8.33333 10.8333H11.6667C12.5871 10.8333 13.3333 10.0871 13.3333 9.16667V5.83333" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      `,
    }),
  },
  {
    id: "education",
    label: "Education",
    icon: markRaw({
      template: `
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.66669 8.33333L10 3.33333L18.3334 8.33333L10 13.3333L1.66669 8.33333Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M15 10.8333V14.1667C15 15.8333 10 17.5 10 17.5C10 17.5 5 15.8333 5 14.1667V10.8333" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      `,
    }),
  },
  {
    id: "documents",
    label: "Documents",
    icon: markRaw({
      template: `
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.8333 2.5H5.83333C4.91286 2.5 4.16667 3.24619 4.16667 4.16667V15.8333C4.16667 16.7538 4.91286 17.5 5.83333 17.5H14.1667C15.0871 17.5 15.8333 16.7538 15.8333 15.8333V7.5M10.8333 2.5L15.8333 7.5M10.8333 2.5V7.5H15.8333" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      `,
    }),
  },
];

watch(
  () => props.modelValue,
  (val) => {
    isOpen.value = val;
  },
);

watch(isOpen, (val) => {
  emit("update:modelValue", val);
});

watch(
  () => props.staffInfo,
  (newVal) => {
    if (newVal) {
      staffData.value = { ...staffData.value, ...newVal };
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
.edit-staff-card {
  min-width: 960px;
  max-width: 1100px;
  max-height: 90vh;
  border-radius: 12px;
  overflow: hidden;

  .sidebar {
    background-color: #2f5d6a;
    width: 260px;
    color: white;

    .profile-image {
      width: 100%;
      height: 180px;
      border-radius: 12px;
      background-color: #f1f5f9;
      object-fit: cover;
    }

    .change-photo-btn {
      background-color: white;
      color: #4b5563;
      border-radius: 8px;
      padding: 8px 16px;
      font-size: 14px;
      font-weight: 500;
      border: 1px solid #e5e7eb;

      &:hover {
        background-color: #f9fafb;
      }
    }

    .tab-item {
      padding: 12px 16px;
      cursor: pointer;
      border-radius: 8px;
      margin-bottom: 8px;
      color: rgba(255, 255, 255, 0.8);
      transition: all 0.3s ease;

      &.active {
        background-color: #5c8a95;
        color: white;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      &:hover:not(.active) {
        background-color: rgba(255, 255, 255, 0.1);
      }

      .tab-label {
        font-size: 15px;
        font-weight: 500;
      }
    }
  }

  .main-content {
    background-color: white;

    .header {
      .title {
        font-size: 20px;
        font-weight: 600;
        color: #1a202c;
      }

      .subtitle {
        font-size: 14px;
        color: #718096;
      }

      .close-btn {
        color: #a0aec0;
      }
    }

    .field-label {
      font-size: 14px;
      font-weight: 500;
      color: #2d3748;
      margin-bottom: 8px;

      .required {
        color: #e53e3e;
        margin-left: 2px;
      }
    }

    .h-input {
      height: 40px;
    }

    .q-field--outlined {
      :deep(.q-field__control) {
        background-color: #f8fafc !important;
        border-radius: 8px !important;
        border: 1px solid #edf2f7 !important;

        &:before,
        &:after {
          display: none;
        }

        &.q-field__control--focused {
          border-color: #2f5d6a !important;
        }
      }

      :deep(.q-field__native) {
        color: #4a5568 !important;
      }
    }

    .document-card {
      background-color: #f9fafb;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      min-height: 56px;
      transition: all 0.2s ease;

      &:hover:not(.has-file) {
        border-color: #2f5d6a;
        background-color: #f3f4f6;
      }

      .file-icon {
        width: 36px;
        height: 36px;
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;

        // &.pdf {
        //   background-color: #ef4444;
        // }

        // &.generic {
        //   background-color: #6b7280;
        // }
      }

      .file-name {
        font-size: 13px;
        color: #111827;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .file-size {
        font-size: 11px;
      }

      .placeholder-text {
        font-size: 13px;
        color: #111827;
      }
    }

    .footer {
      // border-top: 1px solid #edf2f7;
      .q-btn {
       min-width: 156px;
      }

      .cancel-btn {
        color: #4B5563;
        background-color: #f8fafc;
        border: 1px solid #edf2f7;
        padding: 8px 32px;
        border-radius: 8px;
        font-weight: 500;
      }

      .save-btn {
        background-color: #2f5d6a;
        color: white;
        padding: 8px 35px;
        border-radius: 8px;
        font-weight: 500;

        &:hover {
          background-color: #264b56;
        }
      }
    }
  }
}
</style>
