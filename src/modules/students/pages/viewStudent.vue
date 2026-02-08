<template>
  <q-page class="q-pa-md">
    <div
      class="student-header-section row items-center justify-between q-mb-lg"
    >
      <div class="student-data">
        <div class="row items-center">
          <p class="student-name">Moaz Essam</p>
          <q-badge class="state waiting-status" label="Waiting" />
        </div>
        <p class="student-id">ID : 251221</p>
      </div>
      <div class="row items-center q-gutter-md">
        <template v-if="isEditing">
          <q-btn
            flat
            label="Save Changes"
            no-caps
            class="edit-profile-btn"
            @click="saveEdit"
          />
          <q-btn
            flat
            label="Cancel"
            no-caps
            class="cancel-btn"
            @click="cancelEdit"
          />
        </template>
        <template v-else>
          <q-btn flat no-caps class="edit-profile-btn" @click="toggleEdit">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="q-mr-sm"
            >
              <g clip-path="url(#clip0_3124_1139_edit)">
                <path
                  d="M10.77 3.05899L11.4652 2.36383C12.617 1.21206 14.4844 1.21206 15.6362 2.36383C16.7879 3.51561 16.7879 5.38301 15.6362 6.53479L14.941 7.22995M10.77 3.05899C10.77 3.05899 10.8569 4.53621 12.1604 5.83963C13.4638 7.14306 14.941 7.22995 14.941 7.22995M10.77 3.05899L4.37912 9.44992C3.94625 9.8828 3.72981 10.0992 3.54367 10.3379C3.3241 10.6194 3.13585 10.924 2.98226 11.2463C2.85205 11.5195 2.75526 11.8099 2.56167 12.3906L1.74136 14.8516M14.941 7.22995L8.55008 13.6209C8.1172 14.0538 7.90077 14.2702 7.66212 14.4563C7.38061 14.6759 7.07602 14.8641 6.75373 15.0177C6.48052 15.1479 6.19014 15.2447 5.60938 15.4383L3.14844 16.2586M3.14844 16.2586L2.54688 16.4592C2.26108 16.5544 1.94599 16.48 1.73297 16.267C1.51995 16.054 1.44557 15.7389 1.54084 15.4531L1.74136 14.8516M3.14844 16.2586L1.74136 14.8516"
                  stroke="white"
                  stroke-width="1.5"
                />
              </g>
              <defs>
                <clipPath id="clip0_3124_1139_edit">
                  <rect width="18" height="18" fill="white" />
                </clipPath>
              </defs>
            </svg>
            Edit Profile
          </q-btn>
        </template>

        <q-btn-dropdown
          flat
          no-caps
          class="more-dropdown"
          v-if="!isEditing"
          hide-dropdown-icon
          dropdown-icon="none"
        >
          <template v-slot:label>
            <div class="row items-center no-wrap full-width justify-between">
              <span>More</span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="q-ml-sm"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M5.29279 7.29259C5.48031 7.10512 5.73462 6.99981 5.99979 6.99981C6.26495 6.99981 6.51926 7.10512 6.70679 7.29259L9.99979 10.5856L13.2928 7.29259C13.385 7.19708 13.4954 7.1209 13.6174 7.06849C13.7394 7.01608 13.8706 6.9885 14.0034 6.98734C14.1362 6.98619 14.2678 7.01149 14.3907 7.06177C14.5136 7.11205 14.6253 7.18631 14.7192 7.2802C14.8131 7.37409 14.8873 7.48574 14.9376 7.60864C14.9879 7.73154 15.0132 7.86321 15.012 7.99599C15.0109 8.12877 14.9833 8.25999 14.9309 8.382C14.8785 8.504 14.8023 8.61435 14.7068 8.70659L10.7068 12.7066C10.5193 12.8941 10.265 12.9994 9.99979 12.9994C9.73462 12.9994 9.48031 12.8941 9.29279 12.7066L5.29279 8.70659C5.10532 8.51907 5 8.26476 5 7.99959C5 7.73443 5.10532 7.48012 5.29279 7.29259Z"
                  fill="#6B7280"
                />
              </svg>
            </div>
          </template>

          <q-list>
            <q-item clickable v-close-popup>
              <q-item-section>
                <q-item-label>Print</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section>
                <q-item-label>Delete Account</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </div>
    </div>

    <div class="bg-white rounded-borders">
      <q-tabs
        v-model="tab"
        class="student-tabs"
        align="left"
        narrow-indicator
        no-caps
        dense
      >
        <q-tab name="overview" label="Overview" :ripple="false" />
        <q-tab name="courses" label="Courses" :ripple="false" />
        <q-tab name="transaction" label="Transaction" :ripple="false" />
        <q-tab name="notes" label="Notes" :ripple="false" />
        <q-tab name="attendance" label="Attendance" :ripple="false" />
      </q-tabs>

      <q-separator color="grey-2" />

      <q-tab-panels v-model="tab" animated class="text-left">
        <q-tab-panel name="overview">
          <overview ref="overviewRef" :is-editing="isEditing" />
        </q-tab-panel>

        <q-tab-panel name="courses">
          <coursesList />
        </q-tab-panel>

        <q-tab-panel name="transaction">
          <transactionList />
        </q-tab-panel>

        <q-tab-panel name="notes">
          <notesList />
        </q-tab-panel>

        <q-tab-panel name="attendance">
          <attendanceList />
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import coursesList from "../components/coursesList.vue";
import transactionList from "../components/trasactionList.vue";
import notesList from "../components/notesList.vue";
import attendanceList from "../components/attendanceList.vue";
import overview from "../components/overview.vue";

const route = useRoute();
const tab = ref("overview");
const isEditing = ref(false);
const overviewRef = ref(null);

const toggleEdit = () => {
  isEditing.value = !isEditing.value;
};

const saveEdit = () => {
  isEditing.value = false;
};

const cancelEdit = () => {
  isEditing.value = false;
};

onMounted(() => {
  if (route.query.edit === "true") {
    isEditing.value = true;
  }
});
</script>
