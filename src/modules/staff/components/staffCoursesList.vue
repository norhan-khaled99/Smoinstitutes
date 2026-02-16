<template>
  <div class="scrollable-container">
    {{ staffDataCourses }}
    <tableComp
      pageTitle=""
      :tableRows="coursesDataValue"
      :tableColumns="columns"
      :displayPagination="false"
      :tablePagination="{ rowsPerPage: 0 }"
      :searchInput="false"
      :showAdd="false"
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
  coursesDataValue: {
    type: Array,
    default: () => []
  },
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
    field: (row) => row.course_serial,
    align: "left",
    sortable: false,
  },
  {
    name: "level",
    label: "Level",
    field: (row) => row.level,
    align: "left",
    sortable: false,
    classes: "bold-text",
  },
  {
    name: "startDate",
    label: "Start Date",
    field: (row) => {
      if (!row.start_date) return "";
      const [y, m, d] = row.start_date.split("-");
      return `${d}-${m}-${y}`;
    },

    align: "left",
    sortable: false,
  },
  {
    name: "end_date",
    label: "End Date",
    field: (row) => {
      if (!row.end_date) return "";
      const [y, m, d] = row.end_date.split("-");
      return `${d}-${m}-${y}`;
    },

    align: "left",
    sortable: false,
  },
  {
    name: "course_name",
    label: "Course Name",
    field: (row) => row.course_name,
    align: "left",
    sortable: false,
  },
];



onMounted(() => {
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
