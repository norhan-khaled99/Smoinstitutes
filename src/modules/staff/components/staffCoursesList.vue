<template>
  <div class="scrollable-container">
    <tableComp
      pageTitle=""
      :tableRows="allCourses"
      :tableColumns="columns"
      :tablePagination="pagination"
      :showAdd="false"
      searchPlaceholder="Search Courses..."
      @searchEvent="onSearch"
      @getPagFun="getPagFun"
      @sortApi="fireSortCall"
      @callApi="fireCall"
      emptyStateTitle="No courses found"
      emptyStateDescription="This staff member has no courses assigned."
      emptyStateButtonLabel=""
    />
  </div>
</template>

<script setup>
import { ref, onMounted, } from "vue";
import tableComp from "src/components/tableComponent.vue";
import { useQuasar } from "quasar";
import services from "src/modules/courses/services/service.js";

const props = defineProps({

});

const $q = useQuasar();

const pagination = ref({
  page: 1,
  rowsPerPage: 20,
  rowsNumber: 100,
});

const columns = [
  {
    name: "courseSerial",
    label: "Course Serial",
    field: (row) => row.courseserial,
    align: "left",
    sortable: false,
  },
  {
    name: "level",
    label: "Level",
    field: (row) => row.level_name,
    align: "left",
    sortable: false,
    classes: "bold-text",
  },
  {
    name: "startDate",
    label: "Start Date",
    field: (row) => {
      if (!row.startdate) return "";
      const [y, m, d] = row.startdate.split("-");
      return `${d}-${m}-${y}`;
    },

    align: "left",
    sortable: false,
  },
  {
    name: "shift",
    label: "Shift",
    field: (row) => row.shift,
    align: "left",
    sortable: false,
  },
  {
    name: "teacher",
    label: "Teacher Name",
    field: (row) => row.teacher_name,
    align: "left",
    sortable: false,
  },
  {
    name: "status",
    label: "Status",
    field: (row) => row.status,
    align: "left",
    sortable: false,
  },
  {
    name: "scoreRatio",
    label: "Score Ratio",
    field: (row) => row.score_ratio,
    align: "left",
    sortable: false,
  },
];

const allCourses = ref([]);
const getAllCourses = (page = 1) => {
  $q.loading.show();

  services
    .getAllCourses(page, searchQuery.value)
    .then((res) => {
      allCourses.value = res.data.data.results;

      pagination.value.rowsNumber = res.data.data.count || 0;
      pagination.value.page = page;
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
        message: error.res?.data?.result || "An error occurred.",
      });
    });
};

const getPagFun = ([apiCall, page, paginationData]) => {
  getAllCourses(page);
};

const fireCall = ([apiCall, page, paginationData]) => {
  getAllCourses(page);
};

const fireSortCall = ([apiCall, sorting]) => {
  getAllCourses(1);
};

const searchQuery = ref("");
const onSearch = (val) => {
  searchQuery.value = val;
  getAllCourses(1);
};

onMounted(() => {
    getAllCourses();
});
</script>

<style lang="scss" scoped>
.table-container {
  margin: 0rem;
  padding: 0rem;
}
.table_content {
  margin: 0rem;
  padding: 0rem;
  max-height: 400px !important;
}
.scrollable-container {
  max-height: 400px !important;
  overflow-y: auto;
  padding: 0;
  margin: 0;
}
</style>
