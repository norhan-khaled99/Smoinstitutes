<template>
  <q-page class="main-page">
    <div class="overview-container">
      <!-- Left Side: Student Details -->
      <div class="details-section">
        <!-- Student Profile Section -->
        <div class="form-section">
          <p class="section-title">Student Profile</p>

          <div class="row q-col-gutter-md">
            <!-- Full Name -->
            <div class="col-12 col-md-6">
              <div class="form-group">
                <p class="field-label">Full Name</p>
                <q-input
                  v-if="isEditing"
                  v-model="studentData.full_name"
                  outlined
                  dense
                  class="edit-input"
                />
                <p v-else class="field-value">{{ studentData.full_name }}</p>
              </div>
            </div>

            <!-- Gender -->
            <div class="col-12 col-md-6">
              <div class="form-group">
                <p class="field-label">Gender</p>
                <q-select
                  v-if="isEditing"
                  v-model="studentData.gender_name"
                  :options="['Male', 'Female']"
                  outlined
                  dense
                  class="edit-input"
                />
                <p v-else class="field-value">{{ studentData.gender_name }}</p>
              </div>
            </div>

            <!-- Date of Birth -->
            <div class="col-12 col-md-6">
              <div class="form-group">
                <p class="field-label">Date Of Birth</p>
                <q-input
                  v-if="isEditing"
                  v-model="studentData.d_o_b"
                  outlined
                  dense
                  class="edit-input"
                  mask="##/##/####"
                />
                <p v-else class="field-value">{{ studentData.d_o_b }}</p>
              </div>
            </div>

            <!-- Email -->
            <div class="col-12 col-md-6">
              <div class="form-group">
                <p class="field-label">Email</p>
                <q-input
                  v-if="isEditing"
                  v-model="studentData.email"
                  outlined
                  dense
                  class="edit-input"
                  type="email"
                />
                <p v-else class="field-value">{{ studentData.email }}</p>
              </div>
            </div>

            <!-- Mobile -->
            <div class="col-12 col-md-6">
              <div class="form-group">
                <p class="field-label">Mobile</p>
                <q-input
                  v-if="isEditing"
                  v-model="studentData.mobile"
                  outlined
                  dense
                  class="edit-input"
                />
                <p v-else class="field-value">{{ studentData.mobile }}</p>
              </div>
            </div>

            <!-- Phone -->
            <div class="col-12 col-md-6">
              <div class="form-group">
                <p class="field-label">Phone</p>
                <q-input
                  v-if="isEditing"
                  v-model="studentData.phone"
                  outlined
                  dense
                  class="edit-input"
                />
                <p v-else class="field-value">{{ studentData.phone }}</p>
              </div>
            </div>

            <!-- Parent Phone 1 -->
            <div class="col-12 col-md-6">
              <div class="form-group">
                <p class="field-label">Parent Phone 1</p>
                <q-input
                  v-if="isEditing"
                  v-model="studentData.parentphone1"
                  outlined
                  dense
                  class="edit-input"
                />
                <p v-else class="field-value">{{ studentData.parentphone1 }}</p>
              </div>
            </div>

            <!-- Parent Phone 2 -->
            <div class="col-12 col-md-6">
              <div class="form-group">
                <p class="field-label">Parent Phone 2</p>
                <q-input
                  v-if="isEditing"
                  v-model="studentData.parentphone2"
                  outlined
                  dense
                  class="edit-input"
                />
                <p v-else class="field-value">{{ studentData.parentphone2 }}</p>
              </div>
            </div>

            <!-- City -->
            <div class="col-12 col-md-6">
              <div class="form-group">
                <p class="field-label">City</p>
                <q-input
                  v-if="isEditing"
                  v-model="studentData.city"
                  outlined
                  dense
                  class="edit-input"
                />
                <p v-else class="field-value">{{ studentData.city }}</p>
              </div>
            </div>

            <!-- Full Address -->
            <div class="col-12 col-md-6">
              <div class="form-group">
                <p class="field-label">Full Address</p>
                <q-input
                  v-if="isEditing"
                  v-model="studentData.address"
                  outlined
                  dense
                  class="edit-input"
                />
                <p v-else class="field-value">{{ studentData.address }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Enrollment Details Section -->
        <div class="form-section">
          <p class="section-title">Enrollment Details</p>

          <div class="row q-col-gutter-md">
            <!-- Assigned Courses -->
            <div class="col-12 col-md-6">
              <div class="form-group">
                <p class="field-label">Assigned Courses</p>
                <q-input
                  v-if="isEditing"
                  v-model="studentData.assignedCourses"
                  outlined
                  dense
                  class="edit-input"
                  disable
                />
                <p v-else class="field-value">
                  {{ studentData.assignedCourses }}
                </p>
              </div>
            </div>

            <!-- Registration Date -->
            <div class="col-12 col-md-6">
              <div class="form-group">
                <p class="field-label">Registration Date</p>
                <q-input
                  v-if="isEditing"
                  v-model="studentData.registration_date"
                  outlined
                  dense
                  class="edit-input"
                  disable
                />
                <p v-else class="field-value">
                  {{ studentData.registration_date }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Side: Profile Card -->
      <div class="profile-card-section">
        <div class="profile-card">
          <!-- Profile Image -->
          <div class="profile-image">
            <q-img :src="studentData.picture" width="300" height="300"/>
            <q-file
              v-model="studentData.picture"
              ref="fileInput"
              style="display: none"
              accept=".jpg, .png, .gif"
              @update:model-value="uploadPhoto"
            />
            <q-btn v-if="isEditing" flat class="change-photo-btn" no-caps @click="$refs.fileInput.pickFiles()">
              <div class="row items-center justify-center no-wrap">
                <span>Change Photo</span>
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
              </div>
            </q-btn>
          </div>

          <!-- Student Name and ID -->
          <p class="student-name">{{ studentData.full_name }}</p>
          <p class="student-id">Student ID : {{ studentData.student_id }}</p>

          <!-- Balance Info -->
          <div class="balance-section">
            <div class="balance-info">
              <span class="balance-label">Balance</span>
              <span class="balance-amount positive"
              >{{ studentData.balance }} <span class="currency">EGP</span></span
              >
            </div>
            <div class="balance-actions">
              <q-btn flat label="View Payments" class="view-payments-btn" @click="$emit('view-transactions')"/>
              <q-btn-dropdown
                flat
                label="Add Payment"
                class="add-payment-btn"
                dropdown-icon="none"
              >
                <q-list>
                  <q-item
                    v-for="option in addDropdownOptions"
                    :key="option.id"
                    clickable
                    v-close-popup
                    @click="$emit('add-payment', option)"
                  >
                    <q-item-section>
                      <q-item-label>{{ option.name }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
            </div>
          </div>

          <!-- Statistics -->
          <div class="stats-grid">
            <div class="stat-item">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.5454 5.51512C12.8133 5.44814 13.0847 5.61102 13.1517 5.87892C13.2187 6.14682 13.0558 6.41828 12.7879 6.48526L10.1212 7.15192C9.85335 7.2189 9.58188 7.05602 9.51491 6.78812C9.44793 6.52022 9.61081 6.24876 9.87871 6.18178L12.5454 5.51512Z"
                  fill="#6B7280"
                />
                <path
                  d="M12.5454 8.18178C12.8133 8.11481 13.0847 8.27769 13.1517 8.54559C13.2187 8.81348 13.0558 9.08495 12.7879 9.15192L10.1212 9.81859C9.85335 9.88557 9.58188 9.72268 9.51491 9.45479C9.44793 9.18689 9.61081 8.91542 9.87871 8.84845L12.5454 8.18178Z"
                  fill="#6B7280"
                />
                <path
                  d="M2.84824 5.87892C2.91522 5.61102 3.18668 5.44814 3.45458 5.51512L6.12125 6.18178C6.38914 6.24876 6.55202 6.52022 6.48505 6.78812C6.41808 7.05602 6.14661 7.2189 5.87871 7.15192L3.21204 6.48526C2.94415 6.41828 2.78127 6.14682 2.84824 5.87892Z"
                  fill="#6B7280"
                />
                <path
                  d="M2.84824 8.54559C2.91522 8.27769 3.18668 8.11481 3.45458 8.18178L6.12125 8.84845C6.38914 8.91542 6.55202 9.18689 6.48505 9.45479C6.41808 9.72268 6.14661 9.88557 5.87871 9.81859L3.21204 9.15192C2.94415 9.08495 2.78127 8.81348 2.84824 8.54559Z"
                  fill="#6B7280"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M15.1666 3.28898C15.1666 2.31344 14.3898 1.47682 13.3706 1.51232C12.6117 1.53876 11.6197 1.6177 10.8566 1.84615C10.1932 2.04475 9.44708 2.43264 8.86542 2.76927C8.32003 3.08491 7.64108 3.10066 7.08854 2.80848C6.42489 2.45756 5.55175 2.0416 4.79422 1.8417C4.15368 1.67267 3.34343 1.59148 2.68559 1.55105C1.64676 1.48721 0.833313 2.33262 0.833313 3.33205V10.7626C0.833313 11.7867 1.6625 12.5863 2.64534 12.6478C3.28451 12.6877 4.00375 12.7646 4.53907 12.9059C5.20078 13.0805 6.01905 13.4687 6.67972 13.8209C7.50193 14.2592 8.49803 14.2592 9.32023 13.8209C9.98091 13.4687 10.7992 13.0805 11.4609 12.9059C11.9962 12.7646 12.7154 12.6877 13.3546 12.6478C14.3375 12.5863 15.1666 11.7867 15.1666 10.7626V3.28898ZM13.4054 2.51171C13.8152 2.49744 14.1666 2.83459 14.1666 3.28898V10.7626C14.1666 11.2197 13.7878 11.6187 13.2922 11.6497C12.6388 11.6906 11.8394 11.7718 11.2057 11.939C10.4255 12.1449 9.5218 12.5803 8.84984 12.9385C8.73767 12.9982 8.62032 13.0453 8.49998 13.0797V3.96154C8.80152 3.90118 9.0947 3.79197 9.36632 3.63477C9.93329 3.30664 10.5966 2.96785 11.1434 2.80414C11.7761 2.61471 12.6595 2.5377 13.4054 2.51171ZM7.49998 3.98351C7.19664 3.93633 6.89931 3.83962 6.62109 3.6925C5.96988 3.34816 5.18049 2.97786 4.53907 2.8086C3.9976 2.66572 3.26823 2.58875 2.62424 2.54917C2.2016 2.52319 1.83331 2.86727 1.83331 3.33205V10.7626C1.83331 11.2197 2.21218 11.6187 2.70776 11.6497C3.36115 11.6906 4.1606 11.7718 4.79422 11.939C5.57445 12.1449 6.47816 12.5803 7.15012 12.9385C7.26228 12.9982 7.37964 13.0453 7.49998 13.0797V3.98351Z"
                  fill="#6B7280"
                />
              </svg>

              <div class="stat-info">
                <span class="stat-label">Total Courses</span>
                <span class="stat-value">{{ studentData.coursesLength }}</span>
              </div>
            </div>

            <div class="stat-item">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_2677_13396)">
                  <path
                    d="M10.6869 6.68705C10.8821 6.49179 10.8821 6.1752 10.6869 5.97994C10.4916 5.78468 10.175 5.78468 9.97976 5.97994L6.99998 8.95972L6.0202 7.97994C5.82494 7.78468 5.50835 7.78468 5.31309 7.97994C5.11783 8.1752 5.11783 8.49179 5.31309 8.68705L6.64643 10.0204C6.84169 10.2156 7.15827 10.2156 7.35353 10.0204L10.6869 6.68705Z"
                    fill="#6B7280"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M7.99998 0.833496C4.04194 0.833496 0.833313 4.04212 0.833313 8.00016C0.833313 11.9582 4.04194 15.1668 7.99998 15.1668C11.958 15.1668 15.1666 11.9582 15.1666 8.00016C15.1666 4.04212 11.958 0.833496 7.99998 0.833496ZM1.83331 8.00016C1.83331 4.59441 4.59422 1.8335 7.99998 1.8335C11.4057 1.8335 14.1666 4.59441 14.1666 8.00016C14.1666 11.4059 11.4057 14.1668 7.99998 14.1668C4.59422 14.1668 1.83331 11.4059 1.83331 8.00016Z"
                    fill="#6B7280"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_2677_13396">
                    <rect width="16" height="16" fill="white"/>
                  </clipPath>
                </defs>
              </svg>

              <div class="stat-info">
                <span class="stat-label">Attendance Rate</span>
                <span class="stat-value">{{ studentData.attendance_rate }}%</span>
              </div>
            </div>

            <div class="stat-item">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M4.84173 2.1738C4.92146 1.42045 5.55885 0.833496 6.33333 0.833496H9.66667C10.4411 0.833496 11.0785 1.42045 11.1583 2.1738C11.667 2.18416 12.1069 2.21047 12.4824 2.27946C12.9878 2.37228 13.4178 2.54911 13.7678 2.89906C14.169 3.30034 14.3416 3.80559 14.4223 4.40566C14.5 4.98364 14.5 5.71852 14.5 6.63025V10.7034C14.5 11.6151 14.5 12.35 14.4223 12.928C14.3416 13.5281 14.169 14.0333 13.7678 14.4346C13.3665 14.8359 12.8612 15.0085 12.2612 15.0891C11.6832 15.1669 10.9483 15.1668 10.0366 15.1668H5.96342C5.05169 15.1668 4.31681 15.1669 3.73883 15.0891C3.13876 15.0085 2.63351 14.8359 2.23223 14.4346C1.83096 14.0333 1.65836 13.5281 1.57768 12.928C1.49998 12.35 1.49999 11.6151 1.5 10.7034V6.63025C1.49999 5.71852 1.49998 4.98364 1.57768 4.40566C1.65836 3.80559 1.83096 3.30034 2.23223 2.89906C2.58219 2.54911 3.01224 2.37228 3.51757 2.27946C3.89315 2.21047 4.33301 2.18416 4.84173 2.1738ZM5.83333 2.66751C5.83333 2.66787 5.83333 2.66823 5.83333 2.66858V3.00016C5.83333 3.2763 6.05719 3.50016 6.33333 3.50016H9.66667C9.94281 3.50016 10.1667 3.2763 10.1667 3.00016V2.66858C10.1667 2.66822 10.1667 2.66787 10.1667 2.66751V2.3335C10.1667 2.05735 9.94281 1.8335 9.66667 1.8335H6.33333C6.05719 1.8335 5.83333 2.05735 5.83333 2.3335V2.66751ZM11.1567 3.17407C11.0705 3.92057 10.4363 4.50016 9.66667 4.50016H6.33333C5.56373 4.50016 4.9295 3.92057 4.84331 3.17407C4.36452 3.1843 3.99557 3.20839 3.69823 3.26301C3.32036 3.33242 3.10164 3.44387 2.93934 3.60617C2.75483 3.79068 2.63453 4.04973 2.56877 4.53891C2.50106 5.04248 2.5 5.70989 2.5 6.66683V10.6668C2.5 11.6238 2.50106 12.2912 2.56877 12.7947C2.63453 13.2839 2.75483 13.543 2.93934 13.7275C3.12385 13.912 3.3829 14.0323 3.87208 14.0981C4.37565 14.1658 5.04306 14.1668 6 14.1668H10C10.9569 14.1668 11.6244 14.1658 12.1279 14.0981C12.6171 14.0323 12.8762 13.912 13.0607 13.7275C13.2452 13.543 13.3655 13.2839 13.4312 12.7947C13.4989 12.2912 13.5 11.6238 13.5 10.6668V6.66683C13.5 5.70989 13.4989 5.04248 13.4312 4.53891C13.3655 4.04973 13.2452 3.79068 13.0607 3.60617C12.8984 3.44387 12.6796 3.33242 12.3018 3.26301C12.0044 3.20839 11.6355 3.1843 11.1567 3.17407ZM4.16667 9.66683C4.16667 9.39069 4.39052 9.16683 4.66667 9.16683H10C10.2761 9.16683 10.5 9.39069 10.5 9.66683C10.5 9.94297 10.2761 10.1668 10 10.1668H4.66667C4.39052 10.1668 4.16667 9.94297 4.16667 9.66683ZM4.16667 12.0002C4.16667 11.724 4.39052 11.5002 4.66667 11.5002H8.33333C8.60948 11.5002 8.83333 11.724 8.83333 12.0002C8.83333 12.2763 8.60948 12.5002 8.33333 12.5002H4.66667C4.39052 12.5002 4.16667 12.2763 4.16667 12.0002Z"
                  fill="#6B7280"
                />
              </svg>

              <div class="stat-info">
                <span class="stat-label">Notes Count</span>
                <span class="stat-value"> {{studentData.notes_coun }} </span>
              </div>
            </div>

            <div class="stat-item">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M13.949 7.83348C13.9354 7.83334 13.9177 7.83333 13.8889 7.83333H12.1538C11.2049 7.83333 10.5 8.53916 10.5 9.33333C10.5 10.1275 11.2049 10.8333 12.1538 10.8333H13.8889C13.9177 10.8333 13.9354 10.8333 13.949 10.8332C13.9618 10.833 13.9653 10.8328 13.9653 10.8328C14.1027 10.8245 14.1618 10.7317 14.1663 10.676C14.1663 10.676 14.1664 10.6718 14.1665 10.6657C14.1666 10.6539 14.1666 10.6381 14.1666 10.6111V8.05556C14.1666 8.04061 14.1666 8.02911 14.1666 8.01981C14.1666 8.0123 14.1666 8.00623 14.1665 8.00095C14.1664 7.9949 14.1663 7.99072 14.1663 7.99072C14.1618 7.93494 14.1027 7.8422 13.9653 7.83384C13.9653 7.83384 13.962 7.83362 13.949 7.83348ZM13.8999 6.83333C13.9442 6.83331 13.9868 6.8333 14.026 6.83568C14.6069 6.87104 15.1207 7.3092 15.1639 7.92119C15.1667 7.96132 15.1667 8.00458 15.1667 8.04467C15.1666 8.04833 15.1666 8.05196 15.1666 8.05556V10.6111C15.1666 10.6147 15.1666 10.6183 15.1667 10.622C15.1667 10.6621 15.1667 10.7053 15.1639 10.7455C15.1207 11.3575 14.6069 11.7956 14.026 11.831C13.9868 11.8334 13.9442 11.8334 13.8999 11.8333C13.8962 11.8333 13.8926 11.8333 13.8889 11.8333H12.1538C10.7237 11.8333 9.49998 10.7483 9.49998 9.33333C9.49998 7.91837 10.7237 6.83333 12.1538 6.83333H13.8889C13.8926 6.83333 13.8962 6.83333 13.8999 6.83333Z"
                  fill="#6B7280"
                />
                <path
                  d="M12.6666 9.33333C12.6666 9.70152 12.3682 10 12 10C11.6318 10 11.3333 9.70152 11.3333 9.33333C11.3333 8.96514 11.6318 8.66667 12 8.66667C12.3682 8.66667 12.6666 8.96514 12.6666 9.33333Z"
                  fill="#6B7280"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M13.8999 6.83333C13.9442 6.83331 13.9868 6.8333 14.026 6.83568C14.1763 6.84483 14.3221 6.88094 14.4564 6.94005C14.3851 5.86909 14.1887 5.04375 13.5725 4.42749C13.0736 3.92859 12.4409 3.70717 11.6593 3.60209L11.6311 3.59836C11.6241 3.59318 11.617 3.58815 11.6096 3.58328L9.1193 1.93204C8.25053 1.35599 7.08277 1.35599 6.21399 1.93204L3.72367 3.58328C3.71633 3.58815 3.70916 3.59318 3.70216 3.59836L3.67396 3.60209C2.89235 3.70718 2.25972 3.92859 1.76081 4.4275C1.2619 4.9264 1.04049 5.55904 0.935403 6.34065C0.833294 7.10013 0.833303 8.07055 0.833313 9.29572V9.37094C0.833303 10.5961 0.833294 11.5665 0.935403 12.326C1.04049 13.1076 1.2619 13.7403 1.76081 14.2392C2.25972 14.7381 2.89235 14.9595 3.67396 15.0646C4.43344 15.1667 5.40387 15.1667 6.62904 15.1667H8.70425C9.92943 15.1667 10.8999 15.1667 11.6593 15.0646C12.4409 14.9595 13.0736 14.7381 13.5725 14.2392C14.1887 13.6229 14.3851 12.7976 14.4564 11.7266C14.3221 11.7857 14.1763 11.8218 14.026 11.831C13.9868 11.8334 13.9442 11.8334 13.8999 11.8333L13.8889 11.8333H13.4453C13.3694 12.7276 13.1977 13.1997 12.8654 13.5321C12.5832 13.8142 12.1968 13.9833 11.5261 14.0735C10.841 14.1656 9.93786 14.1667 8.66665 14.1667H6.66665C5.39543 14.1667 4.49232 14.1656 3.80721 14.0735C3.13649 13.9833 2.75006 13.8142 2.46792 13.5321C2.18578 13.2499 2.01666 12.8635 1.92649 12.1928C1.83438 11.5077 1.83331 10.6045 1.83331 9.33333C1.83331 8.06212 1.83438 7.15901 1.92649 6.4739C2.01666 5.80317 2.18578 5.41674 2.46792 5.1346C2.75006 4.85246 3.13649 4.68335 3.80721 4.59317C4.49232 4.50106 5.39543 4.5 6.66665 4.5H8.66665C9.93786 4.5 10.841 4.50106 11.5261 4.59317C12.1968 4.68335 12.5832 4.85246 12.8654 5.1346C13.1977 5.46696 13.3694 5.93903 13.4453 6.83333H13.8889L13.8999 6.83333ZM6.62904 3.5H8.70426C9.04859 3.5 9.3728 3.49999 9.67786 3.50226L8.56668 2.76547C8.03285 2.41151 7.30044 2.41151 6.76661 2.76547L5.65543 3.50226C5.96049 3.49999 6.2847 3.5 6.62904 3.5Z"
                  fill="#6B7280"
                />
                <path
                  d="M3.99998 6.16667C3.72384 6.16667 3.49998 6.39052 3.49998 6.66667C3.49998 6.94281 3.72384 7.16667 3.99998 7.16667H6.66665C6.94279 7.16667 7.16665 6.94281 7.16665 6.66667C7.16665 6.39052 6.94279 6.16667 6.66665 6.16667H3.99998Z"
                  fill="#6B7280"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12.6666 9.33333C12.6666 9.70152 12.3682 10 12 10C11.6318 10 11.3333 9.70152 11.3333 9.33333C11.3333 8.96514 11.6318 8.66667 12 8.66667C12.3682 8.66667 12.6666 8.96514 12.6666 9.33333Z"
                  fill="#6B7280"
                />
              </svg>

              <div class="stat-info">
                <span class="stat-label">Balance Status</span>
                <span class="stat-value">{{ studentData.balance>=0? 'Paid' : 'Unpaid'}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import {watch, defineExpose, onMounted, ref} from "vue";
import StudentService from "../services/service";
import {useRoute} from "vue-router";
import {useQuasar} from "quasar";


const $q = useQuasar();
const route = useRoute();
const props = defineProps({
  isEditing: {
    type: Boolean,
    default: false,
  },
  paymentOptions: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(['view-transactions', 'add-payment']);

const addDropdownOptions = ref([]);

watch(() => props.paymentOptions, (newVal) => {
  addDropdownOptions.value = newVal.map(item => ({
    ...item,
    name: item.type
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' '),
    id: item.type_id
  }));
}, { immediate: true });

const studentData = ref({
  full_name: "",
  gender_name: "",
  d_o_b: "",
  email: "",
  mobile: "",
  phone: "",
  parentphone1: "",
  parentphone2: "",
  city: "",
  address: "",
  assignedCourses: "",
  registration_date: "",
  status: "",
  picture: "",
  student_id: "",
  balance: "",
  coursesLength:0,
  attendance_rate:0,
  notes_count:0
});

// Store the actual file object separately from the preview URL
const pictureFile = ref(null);

const uploadPhoto = (file) => {
  if (file) {
    // Store the actual file object for upload
    pictureFile.value = file;
    // Create a temporary URL for preview
    const imageUrl = URL.createObjectURL(file);
    studentData.value.picture = imageUrl;
  }
  console.log("Upload photo clicked", file);
};

// Convert date from API format (YYYY-MM-DD) to display format (DD/MM/YYYY)
const formatDateForDisplay = (dateString) => {
  if (!dateString) return '';

  // If already in DD/MM/YYYY format, return as is
  if (dateString.includes('/')) {
    return dateString;
  }

  // Convert YYYY-MM-DD to DD/MM/YYYY
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  }

  return dateString;
};

const getStudentDetails = () => {
  $q.loading.show();
  StudentService.getStudentById(route.params.id)
    .then((res) => {
      if (res.status === 200) {
        studentData.value = res.data.data.student;
        // Convert date from API format to display format
        if (studentData.value.d_o_b) {
          studentData.value.d_o_b = formatDateForDisplay(studentData.value.d_o_b);
        }
        studentData.value.assignedCourses = res.data.data.courses.map(c => c.course_name).join(", ");
        studentData.value.coursesLength = res.data.data.courses.length;
        $q.loading.hide();
      }
      $q.loading.hide();
    }).catch((err) => {
    $q.notify({
      badgeStyle: "display:none",
      classes: "custom-Notify",
      textColor: "black-1",
      icon: "img:/images/Error.png",
      position: "bottom-right",
      message: err.response?.data?.result || "An error occurred.",
    });
    $q.loading.hide();
  })
}

const formatDateToAPI = (dateString) => {
  if (!dateString) return '';

  // If already in YYYY-MM-DD format, return as is
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    return dateString;
  }

  // Handle DD/MM/YYYY format
  if (dateString.includes('/')) {
    const parts = dateString.split('/');
    if (parts.length === 3) {
      const [day, month, year] = parts;
      // Validate parts exist and are numbers
      if (day && month && year) {
        const yyyy = year.padStart(4, '0');
        const mm = month.padStart(2, '0');
        const dd = day.padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
      }
    }
  }

  return '';
};

const handleFormData = () => {
  const formData = new FormData();

  // Add all form fields
  if (studentData.value.full_name) formData.append('full_name', studentData.value.full_name);
  if (studentData.value.gender_name) formData.append('gender_name', studentData.value.gender_name);
  if (studentData.value.d_o_b) {
    const formattedDate = formatDateToAPI(studentData.value.d_o_b);
    if (formattedDate) formData.append('d_o_b', formattedDate);
  }
  if (studentData.value.email) formData.append('email', studentData.value.email);
  if (studentData.value.mobile) formData.append('mobile', studentData.value.mobile);
  if (studentData.value.phone) formData.append('phone', studentData.value.phone);
  if (studentData.value.parentphone1) formData.append('parentphone1', studentData.value.parentphone1);
  if (studentData.value.parentphone2) formData.append('parentphone2', studentData.value.parentphone2);
  if (studentData.value.city) formData.append('city', studentData.value.city);
  if (studentData.value.address) formData.append('address', studentData.value.address);

  // Add new photo if changed (only if it's a File object)
  if (pictureFile.value instanceof File) {
    formData.append('picture', pictureFile.value);
  }
  return formData;
};

const handleSave = ()=>{
  const data = handleFormData();
    StudentService.updateStudent(route.params.id, data)
      .then((res) => {
        if (res.status === 200) {
          $q.notify({
            badgeStyle: "display:none",
            classes: "custom-Notify",
            textColor: "black-1",
            icon: "img:/images/SuccessIcon.png",
            position: "bottom-right",
            message: "Student Updated successfully.",
          });
        }
      }).catch((err) => {
      $q.notify({
        badgeStyle: "display:none",
        classes: "custom-Notify",
        textColor: "black-1",
        icon: "img:/images/Error.png",
        position: "bottom-right",
        message: err.response?.data?.result || "An error occurred.",
      });
    })

}
const handleCancel = () =>{
  getStudentDetails();
}

defineExpose({
  handleSave,
  handleCancel
});

onMounted(() => {
  getStudentDetails()
})
</script>
