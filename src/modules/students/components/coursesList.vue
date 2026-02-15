<template>
  <tableComp
    :tableRows="tableRows"
    :tableColumns="columns"
    :tablePagination="pagination"
    :showAddButton="true"
    addBtnLabel="Add Course"
    :studentCourse="true"
    :showBalanceFilter="true"
    :balanceOptions="balanceOptions"
    :showStatusFilter="true"
    :statusOptions="statusOptions"
    :ShowActionsdropDown="true"
    @openDialogDeleteEvent="openDialogDeleteEvent"
    :showFilters="true"
    @addNew="addEvent"
    @DetailsEvent="DetailsEvent"
    @addDiscount="addDiscount"
    searchPlaceholder="Search courses..."
    @searchEvent="onSearchEvent"
    @filterChange="handleFilterChange"
    @clearFilters="clearFilter"
    @updatePag="updatePag"
    @getPagFun="getPagFun"
    @callApi="fireCall"
    emptyStateTitle="No courses found"
    emptyStateDescription="Get started by assigning a course."
    emptyStateButtonLabel="Add Course"
  />

  <addCourseStudentpopup v-model="showAddCoursePopup" :student-id="studentData.student_id" :student-name="studentData.full_name" v-if="studentData.globalid" @save="getAllCourses" @update:modelValue="getAllCourses"/>
  <addDiscountPopup
    v-model="showAddDiscountPopup"
    :courseName="selectedCourse"
    :student="studentData"
    @save="handleSaveDiscount"
  />
</template>
<script setup>
import { ref, onMounted, computed, watch } from "vue";
import tableComp from "src/components/tableComponent.vue";
import addCourseStudentpopup from "./addCourseStudentpopup.vue";
import addDiscountPopup from "./addDiscountPopup.vue";
import StudentService from "../services/service";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { useQuasar } from "quasar";

const showAddCoursePopup = ref(false);
const showAddDiscountPopup = ref(false);
const selectedCourse = ref("");
const router = useRouter();
const route = useRoute();
const $q = useQuasar();

// Filter state
const searchQuery = ref("");
const selectedStatus = ref(null);
const selectedBalance = ref(null);
const allCourses = ref([]);
const studentData = ref({});
const columns = [
  {
    name: "course",
    label: "Course",
    field: (row) => row.course_name,
    align: "left",
    sortable: false,
  },
  {
    name: "teacher",
    label: "Teacher",
    field: (row) => row.teacher_name,
    align: "left",
    sortable: false,
  },
  {
    name: "startDate",
    label: "Start Date",
    field: (row) => row.start_date,
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
    name: "course_balance",
    label: "Balance",
    field: (row) => row.course_balance,
    align: "left",
    sortable: false,
  },
  {
    name: "score",
    label: "Score",
    field: (row) => row.score,
    align: "left",
    sortable: false,
  },
  {
    name: "actions",
    label: "Actions",
    align: "center",
  },
];

const statusOptions = ref([
  { name: "Active", value: "Active" },
  { name: "Pending", value: "Pending" },
  { name: "Finished", value: "Finished" },
]);

const balanceOptions = ref([
  { name: "Positive", id: "Positive" },
  { name: "Negative", id: "Negative" },
  { name: "Zero", id: "Zero" },
]);

// Pagination configuration
const pagination = ref({
  page: 1,
  rowsPerPage: 10,
  rowsNumber: 0,
});

// Helper function to determine course status based on dates
const getCourseStatus = (course) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const startDate = new Date(course.start_date);
  startDate.setHours(0, 0, 0, 0);

  const endDate = new Date(course.end_date);
  endDate.setHours(0, 0, 0, 0);

  if (today < startDate) {
    return "Pending";
  } else if (today > endDate) {
    return "Finished";
  } else {
    return "Active";
  }
};

// Helper function to determine balance category
const getBalanceCategory = (balance) => {
  const num = Number(balance);
  if (isNaN(num)) return "Zero";
  if (num > 0) return "Positive";
  if (num < 0) return "Negative";
  return "Zero"; // Covers 0 and NaN
};

// Computed property for filtered courses
const filteredCourses = computed(() => {
  let filtered = [...allCourses.value];

  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(course =>
      course.course_name?.toLowerCase().includes(query) ||
      course.course_serial?.toString().includes(query) ||
      course.level?.toLowerCase().includes(query)
    );
  }

  // Apply status filter
  if (selectedStatus.value) {
    filtered = filtered.filter(course => {
      const status = getCourseStatus(course);
      return status === selectedStatus.value;
    });
  }

  // Apply balance filter
  if (selectedBalance.value) {
    filtered = filtered.filter(course => {
      if (typeof course.course_balance === 'undefined') return false;
      const balanceCategory = getBalanceCategory(course.course_balance);
      return balanceCategory === selectedBalance.value;
    });
  }

  return filtered;
});

// Update pagination total when filtered courses change
watch(filteredCourses, (newFiltered) => {
  pagination.value.rowsNumber = newFiltered.length;
  // If current page is out of bounds, reset to page 1 (optional but good UX)
  const maxPage = Math.ceil(newFiltered.length / pagination.value.rowsPerPage);
  if (pagination.value.page > maxPage && maxPage > 0) {
    pagination.value.page = 1;
  }
});

// Computed property for paginated courses (table rows)
const tableRows = computed(() => {
  const filtered = filteredCourses.value;
  const start = (pagination.value.page - 1) * pagination.value.rowsPerPage;
  const end = start + pagination.value.rowsPerPage;
  return filtered.slice(start, end);
});

// Event handlers
const openDialogDeleteEvent = (row) => {
  StudentService.cancelCourseRegistration(row.course_id , {
    regid: row.regid,
  }).then((res)=>{
    if (res.status === 200) {
      getAllCourses();
    }
  }).catch((err)=>{
    $q.notify({
        badgeStyle: "display:none",
        classes: "custom-Notify",
        textColor: "black-1",
        icon: "img:/images/Error.png",
        position: "bottom-right",
        message: err.response?.data?.result || "An error occurred.",
      });
  })

};

const DetailsEvent = (row) => {
  router.push({ name: "studentDetails", params: { id: row.id } });
};

const addEvent = () => {
  showAddCoursePopup.value = true;
};

const addDiscount = (row) => {
  selectedCourse.value = row;
  showAddDiscountPopup.value = true;
};

const handleSaveDiscount = (data) => {
  StudentService.addCourseDiscount(selectedCourse.value.course_id , {
    regid:selectedCourse.value.regid,
    discount: data.amount,
  }).then((res)=>{
    if (res.status === 200) {
      getAllCourses();
    }
  }).catch((err)=>{
    $q.notify({
        badgeStyle: "display:none",
        classes: "custom-Notify",
        textColor: "black-1",
        icon: "img:/images/Error.png",
        position: "bottom-right",
        message: err.response?.data?.result || "An error occurred.",
      });
  })
  // Add save discount logic here
};


const clearFilter = () => {
  selectedStatus.value = "";
  selectedBalance.value = "";
}

const onSearchEvent = (searchValue) => {
  searchQuery.value = searchValue;
  pagination.value.page = 1; // Reset to first page on search
};

const handleFilterChange = ({ type, val }) => {
  if (type === 'status') {
    selectedStatus.value = val;
  } else if (type === 'balance') {
    selectedBalance.value = val;
  }
  pagination.value.page = 1;
};

const updatePag = (rowsPerPage) => {
  pagination.value.rowsPerPage = rowsPerPage;
  pagination.value.page = 1; // Reset to first page on rows per page change
};

const getPagFun = ([apiCall, page, paginationData]) => {
  pagination.value.page = page;
};


const fireCall = ([apiCall, page, paginationData]) => {
  pagination.value.page = page;
};

const getAllCourses = () => {
  $q.loading.show();
  StudentService.getStudentById(route.params.id)
    .then((res) => {
      if (res.status === 200) {
        allCourses.value = res.data.data.courses;
        studentData.value = res.data.data.student;
        pagination.value.rowsNumber = allCourses.value.length;
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
    });
};

onMounted(() => {
  getAllCourses();
});
</script>
