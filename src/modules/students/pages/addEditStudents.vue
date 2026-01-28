<template>
  <div class="add-edit-container">
    <!-- Header -->
    <div class="form-header">
      <div class="header-info">
        <p class="header-title">Add New Student</p>
        <p class="header-meta" v-if="studentId">
          ID : <span>{{ studentId }}</span> | Registration Date :
          <span>{{ registrationDate }}</span>
        </p>
      </div>
      <div class="header-actions">
        <q-btn flat  label="Save Student" class="save-btn" @click="saveStudent">
          <q-menu anchor="bottom right" self="top right" class="action-dropdown">
            <q-list style="min-width: 200px">
              <q-item clickable v-close-popup @click="saveStudent">
                <q-item-section>Save & Close</q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="saveAndAddAnother">
                <q-item-section>Save & Add Another</q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="saveAndAddCourses">
                <q-item-section>Save & Add Courses</q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="saveAndContinueEditing">
                <q-item-section>Save & Continue Editing</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
        <q-btn flat label="Cancel" class="cancel-btn" @click="cancel" />
      </div>
    </div>

    <!-- Form Content -->
    <div class="form-content">
      <!-- Media Section -->
      <div class="form-section">
        <h2 class="section-title">Student Image</h2>
        <div class="media-upload">
          <div class="media-placeholder">
            <svg xmlns="http://www.w3.org/2000/svg" width="90" height="90" viewBox="0 0 90 90" fill="none">
              <g clip-path="url(#clip0_2698_15203)">
                <rect width="90" height="90" rx="45" fill="#E5E9F0" />
                <rect x="27" y="14" width="36" height="36" rx="18" fill="#6B7280" />
                <rect x="-22.5" y="60" width="135" height="135" rx="67.5" fill="#6B7280" />
              </g>
              <defs>
                <clipPath id="clip0_2698_15203">
                  <rect width="90" height="90" rx="45" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div class="upload-info">
            <q-btn flat class="upload-btn" @click="uploadPhoto">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none"
                style="margin-right: 0.5rem">
                <path
                  d="M7.72764 0.182942C7.62108 0.0663884 7.47043 0 7.3125 0C7.15458 0 7.00392 0.0663884 6.89736 0.182942L3.89736 3.46419C3.68774 3.69347 3.70367 4.04927 3.93294 4.25889C4.16222 4.46852 4.51802 4.45258 4.72764 4.22331L6.75 2.01135V10.3125C6.75 10.6232 7.00184 10.875 7.3125 10.875C7.62316 10.875 7.875 10.6232 7.875 10.3125V2.01135L9.89736 4.22331C10.107 4.45258 10.4628 4.46852 10.6921 4.25889C10.9213 4.04927 10.9373 3.69347 10.7276 3.46419L7.72764 0.182942Z"
                  fill="#2F5D6A" />
                <path
                  d="M1.125 9.5625C1.125 9.25184 0.873161 9 0.562501 9C0.251841 9 3.97515e-07 9.25184 3.97515e-07 9.5625V9.60366C-1.4757e-05 10.6293 -2.6973e-05 11.4561 0.0873933 12.1063C0.178156 12.7814 0.372326 13.3498 0.823763 13.8012C1.2752 14.2527 1.84361 14.4468 2.51869 14.5376C3.16891 14.625 3.99566 14.625 5.02135 14.625H9.60365C10.6293 14.625 11.4561 14.625 12.1063 14.5376C12.7814 14.4468 13.3498 14.2527 13.8012 13.8012C14.2527 13.3498 14.4468 12.7814 14.5376 12.1063C14.625 11.4561 14.625 10.6293 14.625 9.60365V9.5625C14.625 9.25184 14.3732 9 14.0625 9C13.7518 9 13.5 9.25184 13.5 9.5625C13.5 10.6391 13.4988 11.3899 13.4226 11.9564C13.3487 12.5067 13.2133 12.7982 13.0057 13.0057C12.7982 13.2133 12.5067 13.3486 11.9564 13.4226C11.3899 13.4988 10.6391 13.5 9.5625 13.5H5.0625C3.98594 13.5 3.2351 13.4988 2.66859 13.4226C2.11826 13.3486 1.82683 13.2133 1.61926 13.0057C1.41169 12.7982 1.27635 12.5067 1.20236 11.9564C1.1262 11.3899 1.125 10.6391 1.125 9.5625Z"
                  fill="#2F5D6A" />
              </svg>
              Upload Photo
            </q-btn>
            <p class="upload-hint">JPG, PNG, or GIF, max 5MB</p>
          </div>
        </div>
      </div>

      <!-- Student Profile Section -->
      <div class="form-section">
        <h2 class="section-title">Student Profile</h2>

        <div class="row q-col-gutter-md">
          <!-- Row 1: Full Name and Gender -->
          <!-- Row 1: Full Name and Gender -->
          <div class="col-12 col-md-6">
            <div class="form-group">
              <p  class="field-label">Full Name <span class="required">*</span></p>
              <div class="row q-col-gutter-sm">
                <div class="col-12 col-md-4">
                  <q-input outlined v-model="form.firstName" placeholder="First" dense class="name-input" />
                </div>
                <div class="col-12 col-md-4">
                  <q-input outlined v-model="form.middleName" placeholder="Middle" dense class="name-input" />
                </div>
                <div class="col-12 col-md-4">
                  <q-input outlined v-model="form.lastName" placeholder="Last name" dense class="name-input" />
                </div>
              </div>
            </div>
          </div>

          <div class="col-12 col-md-3">
            <div class="form-group">
              <p  class="field-label">Gender <span class="required">*</span></p>
              <div class="radio-group">
                <q-radio v-model="form.gender" val="Male" label="Male" />
                <q-radio v-model="form.gender" val="Female" label="Female" />
              </div>
            </div>
          </div>

          <!-- Row 2: Date of Birth and Email -->
          <div class="col-12 col-md-6">
            <div class="form-group">
              <p class="field-label">Date Of Birth</p>
              <q-input outlined v-model="form.dateOfBirth" placeholder="DD/MM/YYYY" dense>
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer" />
                </template>
              </q-input>
            </div>
          </div>

          <div class="col-12 col-md-6">
            <div class="form-group">
              <p  class="field-label">Email</p>
              <q-input outlined v-model="form.email" type="email" placeholder="student@example.com" dense />
            </div>
          </div>

          <!-- Row 3: Mobile and Phone -->
          <div class="col-12 col-md-6">
            <div class="form-group">
              <p  class="field-label">Mobile <span class="required">*</span></p>
              <q-input outlined v-model="form.mobile" placeholder="+971557134005" dense />
            </div>
          </div>

          <div class="col-12 col-md-6">
            <div class="form-group">
              <p  class="field-label">Phone</p>
              <q-input outlined v-model="form.phone" placeholder="+971574093405" dense />
            </div>
          </div>

          <!-- Row 4: Parent Phone 1 and Parent Phone 2 -->
          <div class="col-12 col-md-6">
            <div class="form-group">
              <p  class="field-label">Parent Phone 1</p>
              <q-input outlined v-model="form.parentPhone1" placeholder="+971572254005" dense />
            </div>
          </div>

          <div class="col-12 col-md-6">
            <div class="form-group">
              <p  class="field-label">Parent Phone 2</p>
              <q-input outlined v-model="form.parentPhone2" placeholder="+971557134005" dense />
            </div>
          </div>

          <!-- Row 5: City and Full Address -->
          <div class="col-12 col-md-3">
            <div class="form-group">
              <p  class="field-label">City</p>
              <q-select outlined v-model="form.city" :options="cityOptions" placeholder="Select City" dense />
            </div>
          </div>

          <div class="col-12 col-md-9">
            <div class="form-group">
              <p  class="field-label">Full Address</p>
              <q-input outlined v-model="form.address" placeholder="Building no., Street name, Area ..." dense />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const studentId = ref("251221");
const registrationDate = ref("Oct 16, 2025, 9:25 AM");

const form = ref({
  firstName: "",
  middleName: "",
  lastName: "",
  gender: "",
  dateOfBirth: "",
  mobile: "",
  email: "",
  phone: "",
  parentPhone1: "",
  parentPhone2: "",
  city: null,
  address: "",
});

const cityOptions = ref([
  "Dubai",
  "Abu Dhabi",
  "Sharjah",
  "Ajman",
  "Umm Al Quwain",
  "Ras Al Khaimah",
  "Fujairah",
]);

const uploadPhoto = () => {
  // Handle photo upload
  console.log("Upload photo clicked");
};

const saveStudent = () => {
  // Handle save
  console.log("Student saved", form.value);
};

const saveAndAddAnother = () => {
  // Handle save and add another
  console.log("Student saved and adding another");
  form.value = {
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
    dateOfBirth: "",
    mobile: "",
    email: "",
    phone: "",
    parentPhone1: "",
    parentPhone2: "",
    city: null,
    address: "",
  };
};

const saveAndAddCourses = () => {
  // Handle save and add courses
  console.log("Student saved and navigating to add courses");
  // Navigate to courses page or show course modal
};

const saveAndContinueEditing = () => {
  // Handle save and continue editing
  console.log("Student saved and continuing to edit");
};

const saveAndNew = () => {
  // Handle save and new
  console.log("Student saved and new");
  form.value = {
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
    dateOfBirth: "",
    mobile: "",
    email: "",
    phone: "",
    parentPhone1: "",
    parentPhone2: "",
    city: null,
    address: "",
  };
};

const cancel = () => {
  router.back();
};
</script>
