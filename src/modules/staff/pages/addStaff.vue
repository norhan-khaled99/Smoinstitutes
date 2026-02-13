<template>
  <div class="add-edit-container">
    <q-form ref="formRef" greedy class="form-content">
      <!-- Header -->
      <div class="form-header">
        <div class="header-info">
          <p class="header-title">Add New Staff</p>
        </div>
        <div class="header-actions">
          <q-btn-dropdown
            split
            label="Save Staff"
            class="save-btn-dropdown"
            @click="saveStaff(true)"
            no-caps
          >
            <q-list>
              <q-item clickable v-close-popup @click="saveStaff(true)">
                <q-item-section>Save & Close</q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="saveStaff(false)">
                <q-item-section>Save & Add Another</q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
          <q-btn
            flat
            label="Cancel"
            class="cancel-btn"
            @click="cancel"
            no-caps
          />
        </div>
      </div>

      <!-- Form Content -->
      <div class="form-content">
        <!-- Media Section -->
        <div class="form-section">
          <h2 class="section-title">Staff Image</h2>
          <div class="media-upload">
            <div class="media-placeholder">
              <svg
                v-if="!showImage"
                xmlns="http://www.w3.org/2000/svg"
                width="90"
                height="90"
                viewBox="0 0 90 90"
                fill="none"
              >
                <g clip-path="url(#clip0_2698_15203)">
                  <rect width="90" height="90" rx="45" fill="#E5E9F0" />
                  <rect
                    x="27"
                    y="14"
                    width="36"
                    height="36"
                    rx="18"
                    fill="#6B7280"
                  />
                  <rect
                    x="-22.5"
                    y="60"
                    width="135"
                    height="135"
                    rx="67.5"
                    fill="#6B7280"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_2698_15203">
                    <rect width="90" height="90" rx="45" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <q-img v-else :src="showImage" class="profile-image" />
            </div>
            <div class="upload-info">
              <q-file
                v-model="form.picture"
                ref="fileInput"
                style="display: none"
                accept=".jpg, .png, .gif ,image/jpeg, image/png, image/gif"
                @update:model-value="uploadPhoto"
              />
              <q-btn
                flat
                class="upload-btn"
                @click="$refs.fileInput.pickFiles()"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                >
                  <path
                    d="M7.72764 0.182942C7.62108 0.0663884 7.47043 0 7.3125 0C7.15458 0 7.00392 0.0663884 6.89736 0.182942L3.89736 3.46419C3.68774 3.69347 3.70367 4.04927 3.93294 4.25889C4.16222 4.46852 4.51802 4.45258 4.72764 4.22331L6.75 2.01135V10.3125C6.75 10.6232 7.00184 10.875 7.3125 10.875C7.62316 10.875 7.875 10.6232 7.875 10.3125V2.01135L9.89736 4.22331C10.107 4.45258 10.4628 4.46852 10.6921 4.25889C10.9213 4.04927 10.9373 3.69347 10.7276 3.46419L7.72764 0.182942Z"
                    fill="#2F5D6A"
                  />
                  <path
                    d="M1.125 9.5625C1.125 9.25184 0.873161 9 0.562501 9C0.251841 9 3.97515e-07 9.25184 3.97515e-07 9.5625V9.60366C-1.4757e-05 10.6293 -2.6973e-05 11.4561 0.0873933 12.1063C0.178156 12.7814 0.372326 13.3498 0.823763 13.8012C1.2752 14.2527 1.84361 14.4468 2.51869 14.5376C3.16891 14.625 3.99566 14.625 5.02135 14.625H9.60365C10.6293 14.625 11.4561 14.625 12.1063 14.5376C12.7814 14.4468 13.3498 14.2527 13.8012 13.8012C14.2527 13.3498 14.4468 12.7814 14.5376 12.1063C14.625 11.4561 14.625 10.6293 14.625 9.60365V9.5625C14.625 9.25184 14.3732 9 14.0625 9C13.7518 9 13.5 9.25184 13.5 9.5625C13.5 10.6391 13.4988 11.3899 13.4226 11.9564C13.3487 12.5067 13.2133 12.7982 13.0057 13.0057C12.7982 13.2133 12.5067 13.3486 11.9564 13.4226C11.3899 13.4988 10.6391 13.5 9.5625 13.5H5.0625C3.98594 13.5 3.2351 13.4988 2.66859 13.4226C2.11826 13.3486 1.82683 13.2133 1.61926 13.0057C1.41169 12.7982 1.27635 12.5067 1.20236 11.9564C1.1262 11.3899 1.125 10.6391 1.125 9.5625Z"
                    fill="#2F5D6A"
                  />
                </svg>
                Upload Photo
              </q-btn>
              <p class="upload-hint">JPG, PNG, or GIF, max 5MB</p>
            </div>
          </div>
        </div>

        <!-- Basic Information -->
        <div class="form-section">
          <h2 class="section-title">Basic Information</h2>
          <div class="row q-col-gutter-md">
            <!-- Full Name -->
            <div class="col-12 col-md-6">
              <div class="form-group">
                <p class="field-label">
                  Full Name <span class="required">*</span>
                </p>
                <div class="row q-col-gutter-sm">
                  <div class="col-12 col-md-4">
                    <q-input
                      outlined
                      v-model="form.first_name"
                      :rules="rules.required"
                      placeholder="Enter First Name"
                      dense
                      class="name-input"
                    />
                  </div>
                  <div class="col-12 col-md-4">
                    <q-input
                      outlined
                      v-model="form.middle_names"
                      :rules="rules.required"
                      placeholder="Enter Middle Name"
                      dense
                      class="name-input"
                    />
                  </div>
                  <div class="col-12 col-md-4">
                    <q-input
                      outlined
                      v-model="form.last_name"
                      :rules="rules.required"
                      placeholder="Enter Last name"
                      dense
                      class="name-input"
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- Gender -->
            <div class="col-12 col-md-6">
              <div class="form-group">
                <p class="field-label">Gender</p>
                <div class="radio-group">
                  <q-radio v-model="form.gender" val="1" label="Male" />
                  <q-radio v-model="form.gender" val="2" label="Female" />
                </div>
              </div>
            </div>

            <!-- Date of Birth -->
            <div class="col-12 col-md-6">
              <div class="form-group">
                <p class="field-label">Date Of Birth</p>
                <q-input
                  outlined
                  v-model="form.d_o_b"
                  placeholder="YYYY-MM-DD"
                  dense
                >
                  <template v-slot:append>
                    <div>
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
                          d="M12.75 13.5C13.1642 13.5 13.1642 13.5 13.5 12.75C13.5 12.3358 13.1642 12 12.75 12C12.3358 12 12 12.3358 12 12.75C12 13.1642 12.3358 13.5 12.75 13.5Z"
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
                          d="M5.25 1.3125C5.56066 1.3125 5.8125 1.56434 5.8125 1.875V2.44704C6.309 2.43749 6.856 2.43749 7.45759 2.4375H10.5423C11.1439 2.43749 11.691 2.43749 12.1875 2.44704V1.875C12.1875 1.56434 12.4393 1.3125 12.75 1.3125C13.0607 1.3125 13.3125 1.56434 13.3125 1.875V2.49532C13.5075 2.51018 13.6921 2.52886 13.8668 2.55235C14.7461 2.67057 15.4578 2.91966 16.0191 3.48093C16.5803 4.0422 16.8294 4.75392 16.9476 5.63323C17.0625 6.48764 17.0625 7.57935 17.0625 8.95766V10.5423C17.0625 11.9206 17.0625 13.0124 16.9476 13.8668C16.8294 14.7461 16.5803 15.4578 16.0191 16.0191C15.4578 16.5803 14.7461 16.8294 13.8668 16.9476C13.0124 17.0625 11.9206 17.0625 10.5423 17.0625H7.45769C6.07939 17.0625 4.98764 17.0625 4.13323 16.9476C3.25392 16.8294 2.54221 16.5803 1.98093 16.0191C1.41966 15.4578 1.17057 14.7461 1.05235 13.8668C0.937479 13.0124 0.937488 11.9206 0.9375 10.5423V8.95769C0.937488 7.57937 0.937479 6.48764 1.05235 5.63323C1.17057 4.75392 1.41966 4.0422 1.98093 3.48093C2.54221 2.91966 3.25392 2.67057 4.13323 2.55235C4.30793 2.52886 4.49254 2.51018 4.6875 2.49532V1.875C4.6875 1.56434 4.93934 1.3125 5.25 1.3125ZM4.28314 3.66732C3.52857 3.76877 3.09383 3.95902 2.77643 4.27643C2.45902 4.59383 2.26877 5.02857 2.16732 5.78314C2.15014 5.91093 2.13577 6.04546 2.12376 6.1875H15.8762C15.8642 6.04546 15.8499 5.91093 15.8327 5.78314C15.7312 5.02857 15.541 4.59383 15.2236 4.27643C14.9062 3.95902 14.4714 3.76877 13.7169 3.66732C12.9461 3.56369 11.9301 3.5625 10.5 3.5625H7.5C6.06989 3.5625 5.05389 3.5625 4.28314 3.66732ZM2.0625 9C2.0625 8.35949 2.06274 7.80205 2.07231 7.3125H15.9277C15.9375 7.80205 15.9375 8.35949 15.9375 9V10.5C15.9375 11.9301 15.9363 12.9461 15.8327 13.7169C15.7312 14.4714 15.541 14.9062 15.2236 15.2236C14.9062 15.541 14.4714 15.7312 13.7169 15.8327C12.9461 15.9363 11.9301 15.9375 10.5 15.9375H7.5C6.06989 15.9375 5.05388 15.9363 4.28314 15.8327C3.52857 15.7312 3.09383 15.541 2.77643 15.2236C2.45902 14.9062 2.26877 14.4714 2.16732 13.7169C2.0637 12.9461 2.0625 11.9301 2.0625 10.5V9Z"
                          fill="#6B7280"
                        />
                      </svg>
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date v-model="form.d_o_b" mask="YYYY-MM-DD">
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
              </div>
            </div>

            <!-- Email -->
            <div class="col-12 col-md-6">
              <div class="form-group">
                <p class="field-label">Email</p>
                <q-input
                  outlined
                  v-model="form.email"
                  :rules="rules.validEmail"
                  type="email"
                  placeholder="staff@example.com"
                  dense
                />
              </div>
            </div>

            <!-- National ID -->
            <div class="col-12 col-md-6">
              <div class="form-group">
                <p class="field-label">National id</p>
                <q-input
                  outlined
                  v-model="form.national_id"
                  placeholder="Enter your National Id"
                  dense
                />
              </div>
            </div>

            <!-- Mobile -->
            <div class="col-12 col-md-6">
              <div class="form-group">
                <p class="field-label">
                  Mobile <span class="required">*</span>
                </p>
                <q-input
                  outlined
                  v-model="form.mobile"
                  :rules="rules.required"
                  placeholder="ُEnter your Mobile"
                  dense
                />
              </div>
            </div>

            <!-- Phone -->
            <div class="col-12 col-md-6">
              <div class="form-group">
                <p class="field-label">Phone</p>
                <q-input
                  outlined
                  v-model="form.phone"
                  placeholder="Enter your Phone"
                  dense
                />
              </div>
            </div>

            <!-- City & Address -->
            <div class="col-12 col-md-6">
              <div class="form-group">
                <p class="field-label">City</p>
                <q-select
                  outlined
                  v-model="form.city"
                  :options="cityOptions"
                  :label="
                    form.city == undefined || form.city == ''
                      ? 'Select City'
                      : ''
                  "
                  dense
                />
              </div>
            </div>

            <div class="col-12">
              <div class="form-group">
                <p class="field-label">Full Address</p>
                <q-input
                  outlined
                  v-model="form.address"
                  placeholder="Building no., Street name, Area..."
                  dense
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Job Information -->
        <div class="form-section">
          <h2 class="section-title">Job Information</h2>
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-6">
              <div class="form-group">
                <p class="field-label">Job</p>
                <q-input
                  outlined
                  v-model="form.job"
                  placeholder="Enter Your Job"
                  dense
                />
              </div>
            </div>
            <div class="col-12 col-md-6">
              <div class="form-group">
                <p class="field-label">Staff Job Type</p>
                <q-select
                  emit-value
                  map-options
                  outlined
                  option-label="jobstypename"
                  option-value="jobstypeid"
                  v-model="form.staffjobtype"
                  :options="jobTypeOptions"
                  :label="
                    form.staffjobtype == undefined || form.staffjobtype == ''
                      ? 'Select Staff Job Type'
                      : ''
                  "
                  dense
                />
              </div>
            </div>
            <div class="col-12 col-md-6">
              <div class="form-group">
                <p class="field-label">Daily Salary</p>
                <q-input
                  outlined
                  v-model="form.current_salary"
                  placeholder="Enter Your Daily Salary"
                  type="number"
                  dense
                />
              </div>
            </div>
            <div class="col-12 col-md-6">
              <div class="form-group">
                <p class="field-label">Recent employment</p>
                <q-input
                  outlined
                  v-model="form.recent_employment"
                  placeholder="Enter Your Recent employment"
                  dense
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Education -->
        <div class="form-section">
          <h2 class="section-title">Education</h2>
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-4">
              <div class="form-group">
                <p class="field-label">Degree</p>
                <q-select
                  emit-value
                  map-options
                  outlined
                  option-label="name"
                  option-value="id"
                  v-model="form.degree"
                  :options="degreeOptions"
                  :label="
                    form.degree == undefined || form.degree == ''
                      ? 'Select Degree'
                      : ''
                  "
                  dense
                />
              </div>
            </div>
            <div class="col-12 col-md-4">
              <div class="form-group">
                <p class="field-label">Year of graduation</p>
                <q-input
                  outlined
                  v-model="form.year_of_graduation"
                  placeholder="Enter Your Year of graduation"
                  type="number"
                  dense
                />
              </div>
            </div>
            <div class="col-12 col-md-4">
              <div class="form-group">
                <p class="field-label">Institution</p>
                <q-select
                  emit-value
                  map-options
                  outlined
                  option-label="name"
                  option-value="id"
                  v-model="form.institution"
                  :options="institutionOptions"
                  :label="
                    form.institution == undefined || form.institution == ''
                      ? 'Select Institution'
                      : ''
                  "
                  dense
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Documents -->
        <div class="form-section">
          <h2 class="section-title">Documents</h2>
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-6">
              <div class="form-group documents-files">
                <p class="field-label">ID Card</p>
                <q-file
                  outlined
                  v-model="form.id_card"
                  dense
                  label="No file chosen"
                >
                  <template v-slot:prepend>
                    <div class="file-prepend">Choose file</div>
                  </template>
                </q-file>
              </div>
            </div>
            <div class="col-12 col-md-6">
              <div class="form-group documents-files">
                <p class="field-label">CV</p>
                <q-file
                  outlined
                  v-model="form.cv"
                  dense
                  label="No file chosen"
                >
                  <template v-slot:prepend>
                    <div class="file-prepend">Choose file</div>
                  </template>
                </q-file>
              </div>
            </div>
          </div>
        </div>
      </div>
    </q-form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import services from "../services/service.js";
import rules from "src/config/rules.js";

const router = useRouter();
const formRef = ref(null);
const $q = useQuasar();

const form = ref({
  first_name: "",
  middle_names: "",
  last_name: "",
  phone: "",
  mobile: "",
  address: "",
  d_o_b: "1991-01-01",
  email: "",
  gender: "1",
  city: "",
  job: "",
  current_salary: "",
  staffjobtype: "",
  national_id: "",
  degree: "",
  year_of_graduation: "1991-01-01",
  institution: "",
  recent_employment: "",
  id_card: "",
  cv: "",
  picture: "",
});

const institutionOptions = ref([]);
const getInstitution = () => {
  services
    .getInstitution()
    .then((res) => {
      institutionOptions.value = res.data.data;
    })
    .catch((error) => {
      console.error("Error fetching shifts:", error);
    });
};
const cityOptions = ref([]);
const getAllCites = () => {
  services.getAllCites()
    .then((res) => {
      cityOptions.value = res.data.data.value.CITY_CHOICES;
    })
    .catch((error) => {
      console.error("Error fetching shifts:", error);
    });
};
const jobTypeOptions = ref([]);
const getAlljob = () => {
  services
    .getAlljob()
    .then((res) => {
      jobTypeOptions.value = res.data.data;
    })
    .catch((error) => {
      console.error("Error fetching shifts:", error);
    });
};
const degreeOptions = ref([
  { id: "HS", name: "High School" },
  { id: "BA", name: "Bachelor" },
  { id: "MA", name: "Master" },
  { id: "PHD", name: "PhD" },
  { id: "DIP", name: "Diploma" },
  { id: "OTH", name: "Other" },
]);
const showImage = ref("");
const uploadPhoto = (file) => {
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      showImage.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const addStaff = (data) => {
  $q.loading.show();

  services
    .addStaff(data)
    .then((res) => {
      $q.notify({
        badgeStyle: "display:none",
        classes: "custom-Notify",
        textColor: "black-1",
        icon: "img:/images/SuccessIcon.png",
        position: "bottom-right",
        message: "Added Successfully",
      });
      $q.loading.hide();
    })
    .catch((error) => {
      $q.loading.hide();
      $q.notify({
        badgeStyle: "display:none",
        classes: "custom-Notify",
        textColor: "black-1",
        icon: "img:/images/Error.png",
        position: "bottom-right",
        message: error.errors?.__all__?.[0] || "An error occurred.",
      });
    });
};

const saveStaff = async (stayOrReturn) => {
   const isValid = await formRef.value.validate();

  if (!isValid) return;

  const fd = new FormData();

  Object.keys(form.value).forEach((key) => {
    if (form.value[key] !== null && form.value[key] !== "") {
      fd.append(key, form.value[key]);
    }
  });

   if(stayOrReturn)
   {
      await addStaff(fd);
      router.back();
   }
   else
   {
      await addStaff(fd);
   }

};

const cancel = () => {
  router.back();
};

onMounted(() => {
  getInstitution();
  getAllCites();
  getAlljob();
});
</script>

<!-- If necessary, I can add keys to scoped style if required, but relying on global scss if present -->
