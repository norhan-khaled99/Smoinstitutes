<template>
  <tableComp
    pageTitle="Courses"
    :tableRows="tableRows"
    :tableColumns="columns"
    :tablePagination="pagination"
    :showAdd="true"
    :courses="true"
    addBtnLabel="Add Course"
    :actions="true"
    :showFilters="true"
    :ShowActionsdropDown="true"
    searchPlaceholder="Search Courses..."
    :showYearFilter="false"
    :yearOptions="yearOptions"
    :showStatusFilter="true"
    :statusOptions="statusOptions"
    :showTeacherFilter="true"
    :teacherOptions="teacherOptions"
    @addNew="addCourse"
    @EditEvent="editCourse"
    @searchEvent="onSearch"
    @filterChange="onFilterChange"
    @clearFilters="clearFilters"
    @DetailsEvent="viewCourse"
    emptyStateTitle="No courses found"
    emptyStateDescription="Get started by adding a new course."
    emptyStateButtonLabel="Add Course"
  />

  <addEditCoursePopup
    v-model="showAddEditPopup"
    :isEdit="isEditMode"
    :initialData="selectedCourseData"
    :levelOptions="levelOptions"
    :teacherOptions="teacherOptions"
    @save="handleSaveCourse"
  />
</template>

<script setup>
import { ref } from "vue";
import tableComp from "src/components/tableComponent.vue";
import addEditCoursePopup from "../components/addEditCoursePopup.vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const showAddEditPopup = ref(false);
const isEditMode = ref(false);
const selectedCourseData = ref({});

const pagination = ref({
  page: 1,
  rowsPerPage: 10,
  rowsNumber: 100,
});

const columns = [
  {
    name: "courseSerial",
    label: "Course Serial",
    field: (row) => row.courseSerial,
    align: "left",
    sortable: true,
  },
  {
    name: "level",
    label: "Level",
    field: (row) => row.level,
    align: "left",
    sortable: true,
    classes: "bold-text",
  },
  {
    name: "startDate",
    label: "Start Date",
    field: (row) => row.startDate,
    align: "left",
    sortable: true,
  },
  {
    name: "shift",
    label: "Shift",
    field: (row) => row.shift,
    align: "left",
    sortable: true,
  },
  {
    name: "teacher",
    label: "Teacher Name",
    field: (row) => row.teacher,
    align: "left",
    sortable: true,
  },
  {
    name: "status",
    label: "Status",
    field: (row) => row.status,
    align: "left",
    sortable: true,
  },
  {
    name: "scoreRatio",
    label: "Score Ratio",
    field: (row) => row.scoreRatio,
    align: "left",
    sortable: true,
  },
  {
    name: "actions",
    label: "Actions",
    align: "center",
  },
];

const tableRows = ref([
  {
    id: 1,
    courseSerial: "6383",
    level: "ICDL",
    startDate: "11-01-2026",
    shift: "1",
    teacher: "Yara Abdullah Ahmed Ali",
    status: "Active",
    scoreRatio: "( 9 : 4 )",
  },
  {
    id: 2,
    courseSerial: "6382",
    level: "ICDL",
    startDate: "11-01-2026",
    shift: "3",
    teacher: "Aseel Gamal Hammoud Musleh",
    status: "Pending",
    scoreRatio: "( 3 : 0 )",
  },
  {
    id: 3,
    courseSerial: "6381",
    level: "Intro A",
    startDate: "11-01-2026",
    shift: "2",
    teacher: "Ali Saleh Mohammed Muthana",
    status: "Finished",
    scoreRatio: "None",
  },
  {
    id: 4,
    courseSerial: "6380",
    level: "Intro A",
    startDate: "11-01-2026",
    shift: "4",
    teacher: "Abdullah Saleh Mobarek Hussien Alharthy",
    status: "Active",
    scoreRatio: "( 3 : 0 )",
  },
  {
    id: 5,
    courseSerial: "6379",
    level: "Intro A",
    startDate: "11-01-2026",
    shift: "5",
    teacher: "Belal Mohammed Yaslam Mohammed",
    status: "Finished",
    scoreRatio: "None",
  },
  {
    id: 6,
    courseSerial: "6378",
    level: "Intro B",
    startDate: "11-01-2026",
    shift: "8",
    teacher: "Ahmed Sameer Mohshen Hussien",
    status: "Pending",
    scoreRatio: "( 3 : 0 )",
  },
  {
    id: 7,
    courseSerial: "6377",
    level: "Intro B",
    startDate: "11-01-2026",
    shift: "2",
    teacher: "Hussien Maged Hussien Abdulrahman",
    status: "Active",
    scoreRatio: "None",
  },
  {
    id: 8,
    courseSerial: "6376",
    level: "Intro B",
    startDate: "04-01-2026",
    shift: "7",
    teacher: "Amani Ahmed Mohammed Ali",
    status: "Finished",
    scoreRatio: "( 3 : 0 )",
  },
  {
    id: 9,
    courseSerial: "6375",
    level: "Intro B",
    startDate: "01-11-2025",
    shift: "1",
    teacher: "Qassem Abdulghani Mohammed Motlaq",
    status: "Finished",
    scoreRatio: "( 2 : 1 )",
  },
  {
    id: 10,
    courseSerial: "6374",
    level: "Intro B",
    startDate: "11-01-2026",
    shift: "6",
    teacher: "Eman Saleh Ben Saleh Salem",
    status: "Pending",
    scoreRatio: "( 1 : 0 )",
  },
]);

const yearOptions = ref([
  { id: 1, name: "2026" },
  { id: 2, name: "2025" },
]);

const statusOptions = ref([
  { id: 1, name: "Active" },
  { id: 2, name: "Pending" },
  { id: 3, name: "Finished" },
]);

const teacherOptions = ref([
  { id: 1, name: "Yara Abdullah Ahmed Ali" },
  { id: 2, name: "Aseel Gamal Hammoud Musleh" },
]);

const addCourse = () => {
  isEditMode.value = false;
  selectedCourseData.value = {};
  showAddEditPopup.value = true;
};

const editCourse = (row) => {
  isEditMode.value = true;
  selectedCourseData.value = { ...row };
  showAddEditPopup.value = true;
};

const viewCourse = (row) => {
  console.log("View Course:", row);
  router.push({ name: "viewCourse", params: { id: row.id } });
};
const handleSaveCourse = (courseData) => {
  console.log("Course saved:", courseData);
  // Implementation for adding/updating the course row or calling API would go here
};

const onSearch = (val) => {
  console.log("Search:", val);
};

const onFilterChange = ({ type, val }) => {
  console.log("Filter Change:", type, val);
};

const clearFilters = () => {
  console.log("Clear Filters");
};
</script>

<style lang="scss" scoped></style>
