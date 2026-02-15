<template>
  <tableComp
    pageTitle="Courses"
    :tableRows="allCourses"
    :tableColumns="columns"
    :tablePagination="pagination"
    :showAdd="true"
    :courses="true"
    addBtnLabel="Add Course"
    :showFilters="true"
    :ShowActionsdropDown="true"
    searchPlaceholder="Search Courses..."
    :showStatusFilterInCourse="true"
    :statusOptions="statusOptions"
    :showTeacherFilter="true"
    :teacherOptions="teacherOptions"
    @addNew="addCourse"
    @EditEvent="editCourse"
    @searchEvent="onSearch"
    @filterChange="onFilterChange"
    @clearFilters="clearFilters"
    @DetailsEvent="viewCourse"
    @getPagFun="getPagFun"
    @sortApi="fireSortCall"
    @callApi="fireCall"
    emptyStateTitle="No courses found"
    emptyStateDescription="Get started by adding a new course."
    emptyStateButtonLabel="Add Course"
  />

  <addEditCoursePopup
    v-model="showAddEditPopup"
    :isEdit="isEditMode"
    :initialData="selectedCourseData"
    :shiftOptions="shiftOptions"
    @saveCourse="handleSaveCourse"
  />
</template>

<script setup>
import { ref, onMounted } from "vue";
import tableComp from "src/components/tableComponent.vue";
import addEditCoursePopup from "../components/addEditCoursePopup.vue";
import { useRouter, useRoute } from "vue-router";
import { useQuasar } from "quasar";
import services from "../services/service.js";

const showAddEditPopup = ref(false);
const isEditMode = ref(false);
const selectedCourseData = ref({});
const $q = useQuasar();
const router = useRouter();

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
  {
    name: "actions",
    label: "Actions",
    align: "center",
  },
];

const allCourses = ref([]);
const getAllCourses = (page = 1) => {
  $q.loading.show();

  services
    .getAllCourses(page, typeOfFilter.value, valueOfFilter.value , searchQuery.value)
    .then((res) => {
      allCourses.value = res.data.data.results;

      // Update pagination with API response
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

const typeOfFilter = ref("");
const valueOfFilter = ref("");

const getPagFun = ([apiCall, page, paginationData]) => {
  getAllCourses(page);
};

const fireCall = ([apiCall, page, paginationData]) => {
  getAllCourses(page);
};

const fireSortCall = ([apiCall, sorting]) => {
  getAllCourses(1);
};


const statusOptions = ref([
  { name: "Active" , value: "Active"},
  { name: "Pending" , value: "Pending"},
  { name: "Finished" , value: "Finished"},
]);



const teacherOptions = ref([]);
const getAllTeachers = () => {
  services.getAllTeachers()
    .then((res) => {
      teacherOptions.value = res.data.data;
    })
    .catch((error) => {
      console.error("Error fetching teachers:", error);
    });
};




const shiftOptions = ref([]);
const getAllShifts = () => {
  services.getAllShifts().then((res) => {
      shiftOptions.value = res.data.data.value.SHIFT_CHOICES;
    })
    .catch((error) => {
      console.error("Error fetching shifts:", error);
    });
};


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
  router.push({ name: "viewCourse", params: { id: row.courseid } });
};

const handleSaveCourse = (courseData) => {
    $q.loading.show();

  services.addCourse(courseData).then((res) => {
      $q.notify({
          badgeStyle: "display:none",
          classes: "custom-Notify",
          textColor: "black-1",
          icon: "img:/images/SuccessIcon.png",
          position: "bottom-right",
          message: "Added Successfully",
        });
        getAllCourses(1);
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

const searchQuery = ref("");
const onSearch = (val) => {
  searchQuery.value = val;
   getAllCourses(1)

};


const onFilterChange = ({ type, val }) => {
    if (val != null) {
    typeOfFilter.value = type;
    valueOfFilter.value = val;
    getAllCourses(1);
  } else {
    typeOfFilter.value = "";
    valueOfFilter.value = "";
    getAllCourses(1);
  }
};

const clearFilters = () => {
  typeOfFilter.value = "";
  valueOfFilter.value = "";
  getAllCourses(1);
};

onMounted(() => {
  getAllCourses();
  getAllTeachers();
  getAllShifts();
});
</script>

<style lang="scss" scoped></style>
