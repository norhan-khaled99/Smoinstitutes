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
            label="Cancel"
            no-caps
            class="cancel-btn"
            @click="cancelEdit"
          />
          <q-btn
            unelevated
            icon="save"
            label="Save Changes"
            no-caps
            class="edit-profile-btn"
            @click="saveEdit"
          />
        </template>
        <template v-else>
          <q-btn
            flat
            icon="edit"
            label="Edit Profile"
            no-caps
            class="edit-profile-btn"
            @click="toggleEdit"
          />
        </template>

        <q-btn-dropdown unelevated label="More" no-caps class="more-dropdown">
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
import { ref } from "vue";
import coursesList from "../components/coursesList.vue";
import transactionList from "../components/trasactionList.vue";
import notesList from "../components/notesList.vue";
import attendanceList from "../components/attendanceList.vue";
import overview from "../components/overview.vue";

const tab = ref("overview");
const isEditing = ref(false);
const overviewRef = ref(null);

const toggleEdit = () => {
  isEditing.value = true;
};

const cancelEdit = () => {
  if (overviewRef.value) {
    overviewRef.value.revertChanges();
  }
  isEditing.value = false;
};

const saveEdit = () => {
  // Logic to save data will go here (e.g., API call)
  isEditing.value = false;
};
</script>
