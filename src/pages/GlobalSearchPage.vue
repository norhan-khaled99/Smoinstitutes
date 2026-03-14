<template>
  <div class="q-pa-md">
    <div class="text-h6 q-mb-md">
      Search Results for "{{ searchQuery }}"
    </div>

    <div v-if="isLoading" class="flex flex-center q-pa-xl">
      <q-spinner color="primary" size="3em" />
    </div>

    <GlobalSearchResultTable
      v-else
      :results="globalSearchData"
      :searchKeyword="searchQuery"
      @viewRecord="handleViewRecord"
    />
    <editStaffPopup
      v-model="showEditPopup"
      :staffInfo="selectedStaff"
      :staffActions="staffActions"
      :coursesDataValue="coursesDataValue"
      :initialEditMode="false"
    />
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import GeneralService from "src/services/service";
import GlobalSearchResultTable from "components/GlobalSearchResultTable.vue";
import editStaffPopup from "src/modules/staff/components/viewEditStaffPopup.vue";
import staffServices from "src/modules/staff/services/service.js";

const route = useRoute();
const router = useRouter();
const $q = useQuasar();

const searchQuery = ref("");
const globalSearchData = ref([]);
const isLoading = ref(false);

const showEditPopup = ref(false);
const selectedStaff = ref({});
const staffActions = ref([]);
const popupEditMode = ref(false);
const coursesDataValue = ref([]);

const fetchSearchResults = (query) => {
  if (!query || query.trim() === "") {
    globalSearchData.value = [];
    return;
  }

  isLoading.value = true;
  GeneralService.getGeneralSearchData(query)
    .then((res) => {
      isLoading.value = false;
      const data = res.data?.data || res.data || {};

      let combinedResults = [];

      if (data.students && Array.isArray(data.students)) {
        combinedResults = combinedResults.concat(data.students.map(item => ({ ...item, type: 'student' })));
      }
      if (data.courses && Array.isArray(data.courses)) {
        combinedResults = combinedResults.concat(data.courses.map(item => ({ ...item, type: 'course' })));
      }
      if (data.staff && Array.isArray(data.staff)) {
        combinedResults = combinedResults.concat(data.staff.map(item => ({ ...item, type: 'staff' })));
      }

      globalSearchData.value = combinedResults;
    })
    .catch((error) => {
      isLoading.value = false;
      console.error("Error fetching search results:", error);
      $q.notify({
        color: "negative",
        message: "Failed to fetch search results",
        icon: "error"
      });
    });
};

const handleViewRecord = (record) => {
  if (record.type === 'student') {
    router.push({ name: "studentDetails", params: { id: record.id } });
  } else if (record.type === 'course') {
    router.push({ name: "viewCourse", params: { id: record.id } });
  } else if (record.type === 'staff') {
    getStaffData(record);
  } else {
    console.warn("Unknown record type for navigation:", record);
  }
};

const getStaffData = (record) => {
  $q.loading.show();
  staffServices
    .getStaffData(record.id)
    .then((res) => {
      selectedStaff.value = res.data.data.staff;
      staffActions.value = res.data.data.actions;
      coursesDataValue.value = res.data.data.courses;
      if (selectedStaff.value.gender) {
        selectedStaff.value.gender = selectedStaff.value.gender.toString();
      }
      $q.loading.hide();
      popupEditMode.value = false; // Always view mode
      showEditPopup.value = true;
    })
    .catch((error) => {
      $q.loading.hide();
      console.error("Error fetching staff:", error);
    });
};

watch(
  () => route.query.q,
  (newQuery) => {
    searchQuery.value = newQuery || "";
    fetchSearchResults(searchQuery.value);
  }
);

onMounted(() => {
  searchQuery.value = route.query.q || "";
  fetchSearchResults(searchQuery.value);
});
</script>
