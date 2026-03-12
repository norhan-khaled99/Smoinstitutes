<template>
  <tableComp
    :tableRows="tableRows"
    :tableColumns="columns"
    :tablePagination="pagination"
    :showAddButtonDropdown="true"
    addBtnLabel="Add Payment"
    :addDropdownOptions="addDropdownOptions"
    :showCourseFilter="true"
    :courseOptions="courseOptions"
    :showTypeFilterInTransation="true"
    :typeOptions="typeOptions"
    :ShowActionsdropDown="true"
    :studentTransaction="true"
    @DetailsEvent="getTransactionDetails"
    :showFilters="true"
    :viewReport="true"
    searchPlaceholder="Search Transaction..."
    @addDropdownAction="handleAddPayment"
    @searchEvent="onSearchEvent"
    @updatePag="updatePag"
    @getPagFun="getPagFun"
    @sortApi="fireSortCall"
    @callApi="fireCall"
    @filterChange="handleFilterChange"
    @filterTransaction="handleFilterTransaction"
    @clearFilters="clearFilter"
    emptyStateTitle="No transactions found"
    emptyStateDescription="Get started by adding a new payment."
    emptyStateButtonLabel="Add Payment"
    @addNew="onAddNewTransaction"
  >
  </tableComp>

  <TransactionPopup
    v-model="isTransactionPopupOpen"
    :type="currentTransactionType"
    :currentTransaction="currentTransactionData"
    :studentName="props.student.full_name + ' ( ID : ' + props.student.student_id + ' )'"
    v-if="currentTransactionData"
    @save="onSaveTransaction"
  />
</template>

<script setup>
import { onMounted, ref, computed, watch } from "vue";
import tableComp from "src/components/tableComponent.vue";
import TransactionPopup from "./TransactionPopup.vue";
import StudentService from "../services/service";
import { uid, useQuasar } from "quasar";

const $q = useQuasar();
const isTransactionPopupOpen = ref(false);
const currentTransactionType = ref("Income");
const currentTransactionData = ref({});

// Filter state
const searchQuery = ref("");
const selectedCourse = ref(null);
const selectedType = ref(null);
const columns = [
  {
    name: "voucherNumber",
    label: "Voucher Number",
    field: (row) => row.paper_no,
    align: "left",
    sortable: false,
  },
  {
    name: "course",
    label: "Course",
    field: (row) => row.category_id?.name || row.category_name,
    align: "left",
    sortable: false,
  },
  {
    name: "stu_transaction_type",
    label: "Type",
    field: (row) => row.jtype?.name || row.type,
    align: "left",
    sortable: false,
  },
  {
    name: "amount",
    label: "Amount",
    field: (row) => row.amount,
    align: "left",
    sortable: false,
  },
  {
    name: "date",
    label: "Transaction Date",
    field: (row) => row.date,
    align: "left",
    sortable: false,
  },
  {
    name: "actions",
    label: "Action",
    align: "right",
  },
];

const props = defineProps({
  student: {
    type: Object,
    default: {},
  },
  paymentOptions: {
    type: Array,
    default: [],
  },
  courseOptions: {
    type: Array,
    default: [],
  },
});

const pagination = ref({
  page: 1,
  rowsPerPage: 10,
  rowsNumber: 0,
});

// All raw rows loaded from the API (never mutated by filters)
const allRows = ref([]);

// Course options derived from the loaded data (unique non-null courses)
// tableComp courseFilter uses option-label="name" option-value="id"
const courseOptions = computed(() => {
  const seen = new Set();
  const options = [];
  for (const row of allRows.value) {
    const name = row.category_id?.name || row.category_name || null;
    if (name && !seen.has(name)) {
      seen.add(name);
      // id == name so the emitted value from tableComp is the course name string
      options.push({ label: name, name: name, id: name });
    }
  }
  return options;
});

// Type options derived from the loaded data (unique transaction types)
// tableComp typeFilter uses option-label="label" option-value="id"
const typeOptions = computed(() => {
  const seen = new Set();
  const options = [];
  for (const row of allRows.value) {
    const id = row.jtype?.id;
    const name = row.jtype?.name || row.type || null;
    if (name && !seen.has(name)) {
      seen.add(name);
      // store the name as id so we can match easily in the filter
      options.push({ label: name, id: name });
    }
  }
  return options;
});

// Filtered rows applying search + course + type filters front-end
const filteredRows = computed(() => {
  const q = (searchQuery.value || "").toLowerCase().trim();
  const course = selectedCourse.value;
  const type = selectedType.value;

  return allRows.value.filter((row) => {
    // Search: match voucher number or course name
    if (q) {
      const voucherStr = String(row.paper_no ?? "").toLowerCase();
      const courseName = (row.category_id?.name || row.category_name || "").toLowerCase();
      if (!voucherStr.includes(q) && !courseName.includes(q)) {
        return false;
      }
    }

    // Course filter — selectedCourse holds the course name string (used as id)
    if (course) {
      const rowCourse = row.category_id?.name || row.category_name || null;
      if (rowCourse !== course) return false;
    }

    // Type filter — selectedType holds the type name string (used as id)
    if (type) {
      const rowType = row.jtype?.name || row.type || null;
      if (rowType !== type) return false;
    }

    return true;
  });
});

// Rows currently shown in the table (respecting pagination)
const tableRows = computed(() => {
  const start = (pagination.value.page - 1) * pagination.value.rowsPerPage;
  const end = start + pagination.value.rowsPerPage;
  return filteredRows.value.slice(start, end);
});

// Keep rowsNumber in sync with filtered results
watch(filteredRows, (rows) => {
  pagination.value.rowsNumber = rows.length;
  // Reset to first page whenever filter changes
  pagination.value.page = 1;
});

const addDropdownOptions = ref([
  { name: "Income", id: 1 },
  { name: "Expense", id: 2 },
  { name: "Service", id: 3 },
  { name: "Funds Transfer", id: 4 },
]);

const handleAddPayment = (option) => {
  currentTransactionType.value = option.name;
  currentTransactionData.value = option;
  isTransactionPopupOpen.value = true;
};

const onSaveTransaction = (data) => {
  const random = uid();
  let promise;
  const payload = {};

  if (data.type === "Income") {
    Object.assign(payload, {
      paper_no: data.voucherNumber,
      to_account: data.toAccount ? data.toAccount : props.student.globalid,
      amount: data.amount,
      category_id: data.course ? data.courseId : null,
      details: data.details,
    });
    promise = StudentService.addIncomePayment(payload, random);
  } else if (data.type === "Expense") {
    Object.assign(payload, {
      paper_no: data.voucherNumber,
      from_account: props.student.globalid,
      amount: data.amount,
      category_id: data.course ? data.courseId : null,
      details: data.details,
    });
    promise = StudentService.addExpensePayment(payload, random);
  } else if (data.type === "Service") {
    Object.assign(payload, {
      student: data.toAccount ? data.toAccount : props.student.globalid,
      service: data.service ? data.serviceId : null,
      amount: data.amount,
      details: data.details,
    });
    promise = StudentService.addServicePayment(payload, random);
  } else if (data.type === "Funds Transfer") {
    Object.assign(payload, {
      from_account: props.student.globalid,
      to_account: data.toAccount ? data.toAccount : null,
      amount: data.amount,
      category_id: data.course ? data.courseId : null,
      details: data.details,
      jtype: data.type_id,
    });
    promise = StudentService.addGenericPayment(payload, random);
  }

  if (promise) {
    $q.loading.show();
    promise
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          $q.notify({
            badgeStyle: "display:none",
            classes: "custom-Notify",
            textColor: "black-1",
            icon: "img:/images/SuccessIcon.png",
            position: "bottom-right",
            message: response.data.result || "Payment added successfully.",
          });
          isTransactionPopupOpen.value = false;
          // Reload all transactions to refresh the data and re-derive options
          loadAllTransactions();
        }
      })
      .catch(() => {
        $q.loading.hide();
      })
      .finally(() => {
        $q.loading.hide();
      });
  }
};

const onAddNewTransaction = () => {
  currentTransactionType.value = "Income";
  isTransactionPopupOpen.value = true;
};

// Front-end search handler — no API call
const onSearchEvent = (searchValue) => {
  searchQuery.value = searchValue;
};

// Front-end filter handler for course filter — no API call
const handleFilterChange = ({ type, val }) => {
  if (type === "course") {
    selectedCourse.value = val; // val is the course name string (we used name as id)
  }
};

// Front-end filter handler for transaction type filter
// tableComp emits filterTransaction(fromNo, toNo, typeFilterVal, statusFilterVal, shiftFilterVal)
const handleFilterTransaction = (fromNo, toNo, typeFilterVal) => {
  selectedType.value = typeFilterVal || null; // val is the type name string (we used name as id)
};

const clearFilter = () => {
  selectedCourse.value = null;
  selectedType.value = null;
  searchQuery.value = "";
};

const updatePag = (rowsPerPage) => {
  pagination.value.rowsPerPage = rowsPerPage;
  pagination.value.page = 1;
};

const getPagFun = ([, page]) => {
  pagination.value.page = page;
};

const fireSortCall = ([, sortBy]) => {
  console.log("Sort:", sortBy);
};

const fireCall = ([, page]) => {
  pagination.value.page = page;
};

// Load ALL transactions for this student in one request (large page size)
const loadAllTransactions = () => {
  $q.loading.show();
  const accountId = props.student.globalid || "";

  StudentService.getAllTransactions(accountId, "", "", 1, "")
    .then((response) => {
      if (response.status === 200) {
        // If the API supports a "count" field, try to load everything in one shot
        const count = response.data.count || 0;
        const firstResults = response.data.results || [];

        if (count <= firstResults.length) {
          // Already have everything
          allRows.value = firstResults;
          pagination.value.rowsNumber = firstResults.length;
          $q.loading.hide();
        } else {
          // Fetch all pages and flatten (page_size trick: use a huge number)
          StudentService.getAllTransactions(accountId, "", "", 1, "", count)
            .then((res2) => {
              allRows.value = res2.data.results || firstResults;
              pagination.value.rowsNumber = allRows.value.length;
            })
            .catch(() => {
              // Fall back to first page only
              allRows.value = firstResults;
              pagination.value.rowsNumber = firstResults.length;
            })
            .finally(() => {
              $q.loading.hide();
            });
        }
      }
    })
    .catch(() => {
      $q.loading.hide();
    });
};

const initializeData = () => {
  addDropdownOptions.value = props.paymentOptions.map((item) => ({
    ...item,
    name: item.title
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" "),
    id: item.type_id,
  }));
  loadAllTransactions();
};

const emit = defineEmits(["DetailsEvent"]);
const getTransactionDetails = (row) => {
  emit("DetailsEvent", row);
}
onMounted(() => {
  initializeData();
});
</script>
