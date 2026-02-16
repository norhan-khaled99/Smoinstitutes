<template>
  <q-dialog v-model="isOpen" persistent transition-show="scale" transition-hide="scale">
    <q-card class="edit-view-card row no-wrap">
      <!-- Sidebar -->
      <div class="sidebar col-auto">
        <div class="profile-section">
          <q-img v-if="staffData.picture && notChange" :src="picturePreview" class="profile-image" />

          <q-img v-if="staffData.picture && !notChange" :src="`https://test.caiaden.com${staffData.picture}`"
            class="profile-image" />

          <q-file v-if="isEditMode" v-model="staffData.picture" outlined dense label="Change Photo"
            class="change-photo-btn" accept=".jpg, .png, .gif ,image/jpeg, image/png, image/gif"
            @update:model-value="uploadPhoto">
            <template v-slot:append>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M6.3321 3.73888C6.55446 2.64732 7.52582 1.875 8.6387 1.875H11.3615C12.4743 1.875 13.4457 2.64732 13.6681 3.73888C13.7194 3.99087 13.9477 4.17571 14.1851 4.17571H14.1987L14.2124 4.17631C15.3819 4.22745 16.2802 4.37097 17.0302 4.86298C17.5027 5.17297 17.9092 5.57181 18.2259 6.0372C18.62 6.61622 18.7938 7.28079 18.8771 8.08454C18.9584 8.86983 18.9584 9.85417 18.9584 11.1009V11.1719C18.9584 12.4186 18.9584 13.4029 18.8771 14.1882C18.7938 14.9919 18.62 15.6565 18.2259 16.2355C17.9092 16.7009 17.5027 17.0998 17.0302 17.4097C16.444 17.7943 15.7719 17.9639 14.9568 18.0453C14.1587 18.125 13.1576 18.125 11.8863 18.125H8.11389C6.84257 18.125 5.84147 18.125 5.04338 18.0453C4.22824 17.9639 3.55618 17.7943 2.96995 17.4097C2.49743 17.0998 2.09096 16.7009 1.77424 16.2355C1.38018 15.6565 1.20638 14.9919 1.1231 14.1882C1.04174 13.4029 1.04174 12.4186 1.04175 11.1718V11.1009C1.04174 9.85417 1.04174 8.86983 1.1231 8.08454C1.20638 7.28079 1.38018 6.61622 1.77424 6.0372C2.09096 5.57181 2.49743 5.17297 2.96995 4.86298C3.71994 4.37097 4.61825 4.22745 5.78777 4.17631L5.80142 4.17571H5.81508C6.05248 4.17571 6.28077 3.99087 6.3321 3.73888ZM8.6387 3.125C8.10443 3.125 7.65763 3.49416 7.55695 3.98839C7.3939 4.78883 6.68425 5.41822 5.83036 5.42565C4.70652 5.47558 4.10455 5.61363 3.65561 5.90815C3.31933 6.12876 3.03134 6.41175 2.80763 6.74047C2.5775 7.07862 2.43921 7.51104 2.36644 8.21337C2.29253 8.92672 2.29175 9.84634 2.29175 11.1364C2.29175 12.4264 2.29253 13.346 2.36644 14.0594C2.43921 14.7617 2.5775 15.1941 2.80763 15.5323C3.03134 15.861 3.31933 16.144 3.65561 16.3646C4.00355 16.5928 4.44878 16.7297 5.16761 16.8015C5.89632 16.8743 6.83503 16.875 8.14823 16.875H11.8519C13.1651 16.875 14.1038 16.8743 14.8326 16.8015C15.5514 16.7297 15.9966 16.5928 16.3445 16.3646C16.6808 16.144 16.9688 15.861 17.1925 15.5323C17.4227 15.1941 17.561 14.7617 17.6337 14.0594C17.7076 13.346 17.7084 12.4264 17.7084 11.1364C17.7084 9.84634 17.7076 8.92672 17.6337 8.21337C17.561 7.51104 17.4227 7.07862 17.1925 6.74047C16.9688 6.41175 16.6808 6.12876 16.3445 5.90815C15.8956 5.61363 15.2936 5.47558 14.1698 5.42565C13.3159 5.41822 12.6063 4.78883 12.4432 3.98839C12.3425 3.49416 11.8957 3.125 11.3615 3.125H8.6387ZM10.0001 8.95833C8.96455 8.95833 8.12508 9.7978 8.12508 10.8333C8.12508 11.8689 8.96455 12.7083 10.0001 12.7083C11.0356 12.7083 11.8751 11.8689 11.8751 10.8333C11.8751 9.7978 11.0356 8.95833 10.0001 8.95833ZM6.87508 10.8333C6.87508 9.10744 8.27419 7.70833 10.0001 7.70833C11.726 7.70833 13.1251 9.10744 13.1251 10.8333C13.1251 12.5592 11.726 13.9583 10.0001 13.9583C8.27419 13.9583 6.87508 12.5592 6.87508 10.8333ZM14.3751 8.33333C14.3751 7.98816 14.6549 7.70833 15.0001 7.70833H15.8334C16.1786 7.70833 16.4584 7.98816 16.4584 8.33333C16.4584 8.67851 16.1786 8.95833 15.8334 8.95833H15.0001C14.6549 8.95833 14.3751 8.67851 14.3751 8.33333Z"
                  fill="#6B7280" />
              </svg>
            </template>
          </q-file>
        </div>

        <q-separator class="sidebar-separator" />

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
            <div class="subtitle">Staff ID : {{ staffData.staff_id }}</div>
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
                <q-input outlined v-model="staffData.first_name" dense placeholder="First name" />
              </div>
              <div class="col-4">
                <q-input outlined v-model="staffData.middle_names" dense placeholder="Middle name" />
              </div>
              <div class="col-4">
                <q-input outlined v-model="staffData.last_name" dense placeholder="Last name" />
              </div>
            </div>
            <div v-else class="field-value">
              {{ staffData.first_name }} {{ staffData.middle_names }}
              {{ staffData.last_name }}
            </div>
          </div>
          <div class="col-6">
            <div :class="isEditMode ? 'field-label' : 'field-label-view'">
              Gender
            </div>
            <div v-if="isEditMode" class="row items-center q-gutter-x-sm h-input">
              <q-radio v-model="staffData.gender" val="1" label="Male" color="teal-8" dense />
              <q-radio v-model="staffData.gender" val="2" label="Female" color="teal-8" dense />
            </div>
            <div v-else class="field-value">
              {{ staffData.gender_name }}
            </div>
          </div>

          <!-- Row 2: DOB & Email -->
          <div class="col-6">
            <div :class="isEditMode ? 'field-label' : 'field-label-view'">
              Date Of Birth
            </div>
            <q-input v-if="isEditMode" outlined v-model="staffData.d_o_b" placeholder="YYYY-MM-DD" dense>
              <template v-slot:append>
                <div>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12.75 10.5C13.1642 10.5 13.5 10.1642 13.5 9.75C13.5 9.33579 13.1642 9 12.75 9C12.3358 9 12 9.33579 12 9.75C12 10.1642 12.3358 10.5 12.75 10.5Z"
                      fill="#6B7280" />
                    <path
                      d="M12.75 13.5C13.1642 13.5 13.1642 13.5 13.5 12.75C13.5 12.3358 13.1642 12 12.75 12C12.3358 12 12 12.3358 12 12.75C12 13.1642 12.3358 13.5 12.75 13.5Z"
                      fill="#6B7280" />
                    <path
                      d="M9.75 9.75C9.75 10.1642 9.41421 10.5 9 10.5C8.58579 10.5 8.25 10.1642 8.25 9.75C8.25 9.33579 8.58579 9 9 9C9.41421 9 9.75 9.33579 9.75 9.75Z"
                      fill="#6B7280" />
                    <path
                      d="M9.75 12.75C9.75 13.1642 9.41421 13.5 9 13.5C8.58579 13.5 8.25 13.1642 8.25 12.75C8.25 12.3358 8.58579 12 9 12C9.41421 12 9.75 12.3358 9.75 12.75Z"
                      fill="#6B7280" />
                    <path
                      d="M5.25 10.5C5.66421 10.5 6 10.1642 6 9.75C6 9.33579 5.66421 9 5.25 9C4.83579 9 4.5 9.33579 4.5 9.75C4.5 10.1642 4.83579 10.5 5.25 10.5Z"
                      fill="#6B7280" />
                    <path
                      d="M5.25 13.5C5.66421 13.5 6 13.1642 6 12.75C6 12.3358 5.66421 12 5.25 12C4.83579 12 4.5 12.3358 4.5 12.75C4.5 13.1642 4.83579 13.5 5.25 13.5Z"
                      fill="#6B7280" />
                    <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M5.25 1.3125C5.56066 1.3125 5.8125 1.56434 5.8125 1.875V2.44704C6.309 2.43749 6.856 2.43749 7.45759 2.4375H10.5423C11.1439 2.43749 11.691 2.43749 12.1875 2.44704V1.875C12.1875 1.56434 12.4393 1.3125 12.75 1.3125C13.0607 1.3125 13.3125 1.56434 13.3125 1.875V2.49532C13.5075 2.51018 13.6921 2.52886 13.8668 2.55235C14.7461 2.67057 15.4578 2.91966 16.0191 3.48093C16.5803 4.0422 16.8294 4.75392 16.9476 5.63323C17.0625 6.48764 17.0625 7.57935 17.0625 8.95766V10.5423C17.0625 11.9206 17.0625 13.0124 16.9476 13.8668C16.8294 14.7461 16.5803 15.4578 16.0191 16.0191C15.4578 16.5803 14.7461 16.8294 13.8668 16.9476C13.0124 17.0625 11.9206 17.0625 10.5423 17.0625H7.45769C6.07939 17.0625 4.98764 17.0625 4.13323 16.9476C3.25392 16.8294 2.54221 16.5803 1.98093 16.0191C1.41966 15.4578 1.17057 14.7461 1.05235 13.8668C0.937479 13.0124 0.937488 11.9206 0.9375 10.5423V8.95769C0.937488 7.57937 0.937479 6.48764 1.05235 5.63323C1.17057 4.75392 1.41966 4.0422 1.98093 3.48093C2.54221 2.91966 3.25392 2.67057 4.13323 2.55235C4.30793 2.52886 4.49254 2.51018 4.6875 2.49532V1.875C4.6875 1.56434 4.93934 1.3125 5.25 1.3125ZM4.28314 3.66732C3.52857 3.76877 3.09383 3.95902 2.77643 4.27643C2.45902 4.59383 2.26877 5.02857 2.16732 5.78314C2.15014 5.91093 2.13577 6.04546 2.12376 6.1875H15.8762C15.8642 6.04546 15.8499 5.91093 15.8327 5.78314C15.7312 5.02857 15.541 4.59383 15.2236 4.27643C14.9062 3.95902 14.4714 3.76877 13.7169 3.66732C12.9461 3.56369 11.9301 3.5625 10.5 3.5625H7.5C6.06989 3.5625 5.05389 3.5625 4.28314 3.66732ZM2.0625 9C2.0625 8.35949 2.06274 7.80205 2.07231 7.3125H15.9277C15.9375 7.80205 15.9375 8.35949 15.9375 9V10.5C15.9375 11.9301 15.9363 12.9461 15.8327 13.7169C15.7312 14.4714 15.541 14.9062 15.2236 15.2236C14.9062 15.541 14.4714 15.7312 13.7169 15.8327C12.9461 15.9363 11.9301 15.9375 10.5 15.9375H7.5C6.06989 15.9375 5.05388 15.9363 4.28314 15.8327C3.52857 15.7312 3.09383 15.541 2.77643 15.2236C2.45902 14.9062 2.26877 14.4714 2.16732 13.7169C2.0637 12.9461 2.0625 11.9301 2.0625 10.5V9Z"
                      fill="#6B7280" />
                  </svg>
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="staffData.d_o_b" mask="YYYY-MM-DD">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </div>
              </template>
            </q-input>
            <div v-else class="field-value">{{ staffData.d_o_b }}</div>
          </div>
          <div class="col-6">
            <div :class="isEditMode ? 'field-label' : 'field-label-view'">
              Email
            </div>
            <q-input v-if="isEditMode" outlined v-model="staffData.email" dense placeholder="Enter email address" />
            <div v-else class="field-value">{{ staffData.email }}</div>
          </div>

          <!-- Row 3: National id & Mobile -->
          <div class="col-6">
            <div :class="isEditMode ? 'field-label' : 'field-label-view'">
              National id
            </div>
            <q-input v-if="isEditMode" outlined v-model="staffData.national_id" dense placeholder="Enter national ID" />
            <div v-else class="field-value">{{ staffData.national_id }}</div>
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
            <div :class="isEditMode ? 'field-label' : 'field-label-view'">
              Phone
            </div>
            <q-input v-if="isEditMode" outlined v-model="staffData.phone" dense placeholder="Enter phone number" />
            <div v-else class="field-value">{{ staffData.phone }}</div>
          </div>

          <!-- Row 5: City & Full Address -->
          <div class="col-6">
            <div :class="isEditMode ? 'field-label' : 'field-label-view'">
              City
            </div>
            <q-select v-if="isEditMode" outlined v-model="staffData.city" :options="cityOptions" :label="staffData.city == undefined || staffData.city == ''
                ? 'Select City'
                : ''
              " dense />
            <div v-else class="field-value">{{ staffData.city }}</div>
          </div>
          <div class="col-6">
            <div :class="isEditMode ? 'field-label' : 'field-label-view'">
              Full Address
            </div>
            <q-input v-if="isEditMode" outlined v-model="staffData.address" dense placeholder="Enter full address" />
            <div v-else class="field-value">{{ staffData.address }}</div>
          </div>
        </div>

        <!-- Job Info Form -->
        <div v-if="activeTab === 'job'" class="popup-form-grid row">
          <!-- Row 1: Job Title & Staff Job Type -->
          <div class="col-6">
            <div :class="isEditMode ? 'field-label' : 'field-label-view'">
              Job Title
            </div>
            <q-input v-if="isEditMode" outlined v-model="staffData.job" dense placeholder="Enter job title" />
            <div v-else class="field-value">{{ staffData.job }}</div>
          </div>
          <div class="col-6">
            <div :class="isEditMode ? 'field-label' : 'field-label-view'">
              Staff Job Type
            </div>
            <q-select :read-only="isEditMode" emit-value map-options outlined option-label="jobstypename"
              option-value="jobstypeid" v-model="staffData.staffjobtype" :options="jobTypeOptions" :label="staffData.staffjobtype == undefined ||
                  staffData.staffjobtype == ''
                  ? 'Select Staff Job Type'
                  : ''
                " dense />
          </div>

          <!-- Row 2: Daily Salary & Recent employment -->
          <div class="col-6">
            <div :class="isEditMode ? 'field-label' : 'field-label-view'">
              Daily Salary
            </div>
            <q-input v-if="isEditMode" outlined v-model="staffData.current_salary" dense
              placeholder="Enter daily salary" />
            <div v-else class="field-value">{{ staffData.current_salary }}</div>
          </div>
          <div class="col-6">
            <div :class="isEditMode ? 'field-label' : 'field-label-view'">
              Recent employment
            </div>
            <q-input v-if="isEditMode" outlined v-model="staffData.recent_employment" dense
              placeholder="Enter recent employment" />
            <div v-else class="field-value">
              {{ staffData.recent_employment }}
            </div>
          </div>
        </div>

        <!-- Education Form -->
        <div v-if="activeTab === 'education'" class="popup-form-grid row">
          <!-- Row 1: Degree & Year of graduation -->
          <div class="col-6">
            <div :class="isEditMode ? 'field-label' : 'field-label-view'">
              Degree
            </div>
            <q-select v-if="isEditMode" emit-value map-options outlined option-label="name" option-value="id"
              v-model="staffData.degree" :options="degreeOptions" :label="staffData.degree == undefined || staffData.degree == ''
                  ? 'Select Degree'
                  : ''
                " dense />
            <div v-else class="field-value">{{ staffData.degree }}</div>
          </div>
          <div class="col-6">
            <div :class="isEditMode ? 'field-label' : 'field-label-view'">
              Year of graduation
            </div>
            <q-input v-if="isEditMode" outlined v-model="staffData.year_of_graduation" dense
              placeholder="Enter graduation year" />
            <div v-else class="field-value">
              {{ staffData.year_of_graduation }}
            </div>
          </div>

          <!-- Row 2: Institution -->
          <div class="col-6">
            <div :class="isEditMode ? 'field-label' : 'field-label-view'">
              Institution
            </div>
            <q-select v-if="isEditMode" emit-value map-options outlined option-label="name" option-value="id"
              v-model="staffData.institution" :options="institutionOptions" :label="staffData.institution == undefined ||
                  staffData.institution == ''
                  ? 'Select Institution'
                  : ''
                " dense />
            <div v-else class="field-value">{{ staffData.institution }}</div>
          </div>
        </div>

        <!-- Documents Form -->
        <div v-if="activeTab === 'documents'" class="popup-form-grid row">
          <!-- ID Card -->
          <div class="col-6">
            <div :class="isEditMode ? 'field-label' : 'field-label-view'">
              ID Card
            </div>
            <div class="document-card row items-center no-wrap q-pa-sm" :class="{ 'has-file': staffData.id_card }">
              <template v-if="
                staffData.id_card && typeof staffData.id_card === 'string'
              ">
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
                    {{ getFileName(staffData.id_card) }}
                  </div>
                  <a :href="`https://test.caiaden.com${staffData.id_card}`" target="_blank"
                    class="text-grey-6 text-caption" style="text-decoration: none; cursor: pointer">
                    View File
                  </a>
                </div>
                <q-btn v-if="isEditMode" flat round dense color="red-5" @click="staffData.id_card = null" size="sm">
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
              <template v-else-if="
                staffData.id_card && typeof staffData.id_card === 'object'
              ">
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
                    {{ getFileName(staffData.id_card) }}
                  </div>
                  <div class="file-size text-grey-6">
                    {{ getFileSize(staffData.id_card) }}
                  </div>
                </div>
                <q-btn flat round dense color="red-5" @click="staffData.id_card = null" size="sm">
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
                @change="(e) => handleFileUpload(e, 'id_card')" />
            </div>
          </div>

          <!-- CV -->
          <div class="col-6">
            <div :class="isEditMode ? 'field-label' : 'field-label-view'">
              CV
            </div>
            <div class="document-card row items-center no-wrap q-pa-sm" :class="{ 'has-file': staffData.cv }">
              <template v-if="staffData.cv && typeof staffData.cv === 'string'">
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
                    {{ getFileName(staffData.cv) }}
                  </div>
                  <a :href="`https://test.caiaden.com${staffData.cv}`" target="_blank" class="text-grey-6 text-caption"
                    style="text-decoration: none; cursor: pointer">
                    View File
                  </a>
                </div>
                <q-btn v-if="isEditMode" flat round dense color="red-5" @click="staffData.cv = null" size="sm">
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
              <template v-else-if="staffData.cv && typeof staffData.cv === 'object'">
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
                    {{ getFileName(staffData.cv) }}
                  </div>
                  <div class="file-size text-grey-6">
                    {{ getFileSize(staffData.cv) }}
                  </div>
                </div>
                <q-btn flat round dense color="red-5" @click="staffData.cv = null" size="sm">
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
                <div class="file-placeholder row items-center full-width cursor-pointer" @click="$refs.cvInput.click()">
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
                      Click to upload CV
                    </div>
                  </div>
                </div>
              </template>
              <input type="file" ref="cvInput" style="display: none" @change="(e) => handleFileUpload(e, 'cv')" />
            </div>
          </div>
        </div>

        <div v-if="activeTab === 'courses'">
            {{ staffData.courses }}
          <staffCoursesList :coursesDataValue="props.coursesDataValue" />
        </div>
        <!-- </q-scroll-area> -->

        <!-- Footer -->
        <div class="footer">
          <q-btn flat no-caps label="Cancel" class="cancel-btn" v-close-popup />
          <q-btn v-if="!isEditMode" no-caps label="Edit" class="save-btn" @click="isEditMode = true" unelevated />
          <q-btn v-else no-caps label="Save Changes" class="save-btn" @click.prevent="saveChanges" unelevated />
        </div>
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, watch, markRaw, h, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import services from "../services/service.js";
import staffCoursesList from "./staffCoursesList.vue";

const props = defineProps({
  modelValue: Boolean,
  staffInfo: Object,
  initialEditMode: {
    type: Boolean,
    default: false,
  },
  coursesDataValue: {
    type: Array,
    default: () => []
  },
});

const emit = defineEmits(["update:modelValue", "save"]);
const isOpen = ref(props.modelValue);
const isEditMode = ref(false);
const activeTab = ref("basic");
const $q = useQuasar();
const staffData = ref({});

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
  services
    .getAllCites()
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

// Watch modelValue to open/close dialog
watch(
  () => props.modelValue,
  (newVal) => {
    isOpen.value = newVal;
  },
);

// Watch staffInfo to update form data
watch(
  () => props.staffInfo,
  (newVal) => {
    if (newVal) {
      staffData.value = { ...staffData.value, ...newVal };
    }
  },
  { deep: true },
);

// Watch initialEditMode to set edit/view state
watch(
  () => props.initialEditMode,
  (newVal) => {
    isEditMode.value = newVal || false;
  },
);

// Reset activeTab if it's not available in edit mode
watch(isEditMode, (newVal) => {
  if (newVal && activeTab.value === "courses") {
    activeTab.value = "basic";
  }
});

// Reset when dialog closes
watch(isOpen, (newVal) => {
  if (!newVal) {
    isEditMode.value = false;
  }
});

// Emit update so parent `v-model` stays in sync when dialog opens/closes
watch(isOpen, (newVal) => {
  emit("update:modelValue", newVal);
});

const handleFileUpload = (event, type) => {
  const file = event.target.files[0];
  if (file) {
    // Store the actual File object so it can be sent to backend
    staffData.value[type] = file;
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

// Extract file name from path string or File object
const getFileName = (file) => {
  if (typeof file === "string") {
    return file.split("/").pop();
  }
  if (file instanceof File) {
    return file.name;
  }
  return file?.name || "Unknown File";
};

// Extract file size from File object or size property
const getFileSize = (file) => {
  if (file instanceof File) {
    return (file.size / (1024 * 1024)).toFixed(1) + " MB";
  }
  return file?.size || "Unknown Size";
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
  </svg>`,
  courses: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.46435 2.82057C11.0871 2.05981 12.9128 2.05981 14.5356 2.82057L21.2268 5.95756C22.2791 6.4509 22.75 7.52222 22.75 8.50002C22.75 9.47782 22.2791 10.5491 21.2268 11.0425L19.75 11.7348V16.6254C19.75 17.8785 19.1217 19.0883 17.978 19.7217C17.2263 20.138 16.2384 20.6391 15.1988 21.038C14.1715 21.4321 13.0339 21.75 12 21.75C10.9661 21.75 9.82851 21.4321 8.80116 21.038C7.76158 20.6391 6.77371 20.138 6.02198 19.7217C4.87826 19.0883 4.25 17.8785 4.25 16.6254V11.7348L2.77323 11.0424L2.75 11.0314V14C2.75 14.4142 2.41421 14.75 2 14.75C1.58579 14.75 1.25 14.4142 1.25 14V8.5C1.25 7.5222 1.72095 6.45085 2.77324 5.95752L9.46435 2.82057ZM5.75 12.438V16.6254C5.75 17.3884 6.12875 18.0661 6.74868 18.4095C7.46533 18.8063 8.38678 19.2724 9.33844 19.6375C10.3023 20.0073 11.2379 20.25 12 20.25C12.7621 20.25 13.6977 20.0073 14.6616 19.6375C15.6132 19.2724 16.5347 18.8063 17.2513 18.4095C17.8713 18.0661 18.25 17.3884 18.25 16.6254V12.4381L14.5357 14.1794C12.9129 14.9402 11.0872 14.9402 9.46444 14.1794L5.75 12.438ZM3.40996 9.68429C3.00679 9.49527 2.75 9.04438 2.75 8.49998C2.75 7.95557 3.00679 7.50469 3.40997 7.31567L10.1011 4.17872C11.3204 3.60709 12.6795 3.60709 13.8988 4.17873L20.59 7.31571C20.9932 7.50473 21.25 7.95562 21.25 8.50002C21.25 9.04443 20.9932 9.49531 20.59 9.68433L13.8989 12.8213C12.6796 13.3929 11.3205 13.3929 10.1012 12.8213L3.40996 9.68429Z" fill="#D1D5DB"/>
</svg>
`,
};

// Helper function to create icon component
const createIcon = (svgString) =>
  markRaw({
    render: () => h("div", { innerHTML: svgString }),
  });

const tabs = computed(() => {
  const tabsList = [
    { id: "basic", label: "Basic Info", icon: createIcon(iconSVGs.basic) },
    { id: "job", label: "Job Info", icon: createIcon(iconSVGs.job) },
    {
      id: "education",
      label: "Education",
      icon: createIcon(iconSVGs.education),
    },
    {
      id: "documents",
      label: "Documents",
      icon: createIcon(iconSVGs.documents),
    },
  ];

  if (!isEditMode.value) {
    tabsList.push({
      id: "courses",
      label: "Courses",
      icon: createIcon(iconSVGs.courses),
    });
  }

  return tabsList;
});

const saveChanges = () => {
  const missing = [];
  if (!staffData.value.first_name) missing.push("First Name");
  if (!staffData.value.middle_names) missing.push("Middle Name");
  if (!staffData.value.last_name) missing.push("Last Name");
  if (!staffData.value.mobile) missing.push("Mobile");

  if (missing.length) {
    $q.notify({
      badgeStyle: "display:none",
      classes: "custom-Notify",
      textColor: "black-1",
      icon: "img:/images/Error.png",
      position: "bottom-right",
      message: `${missing.join(", ")} is required.`,
    });
    return;
  }

  emit("save", staffData.value);
  isOpen.value = false;
  notChange.value = false;
};
const picturePreview = ref("");
const notChange = ref(false);

const uploadPhoto = (file) => {
  if (file) {
    // Store the File object for sending to backend
    staffData.value.picture = file;

    // Create preview URL for display
    picturePreview.value = URL.createObjectURL(file);
    notChange.value = true;
  }
};

onMounted(() => {
  getInstitution();
  getAllCites();
  getAlljob();
});
</script>
