<template>
  <tableComp
    :tableRows="tableRows"
    :tableColumns="columns"
    :tablePagination="pagination"
    :showAddButtonDropdown="true"
    addBtnLabel="Add Payment"
    :addDropdownOptions="addDropdownOptions"
    :actions="true"
    :showCourseFilter="true"
    :courseOptions="courseOptions"
    :showTypeFilter="true"
    :typeOptions="typeOptions"
    :ShowActionsdropDown="true"
    :showFilters="true"
    searchPlaceholder="Search Transaction..."
    @addDropdownAction="handleAddPayment"
    @searchEvent="onSearchEvent"
    @updatePag="updatePag"
    @getPagFun="getPagFun"
    @sortApi="fireSortCall"
    @callApi="fireCall"
    @filterChange="handleFilterChange"
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
    @save="onSaveTransaction"
  />
</template>

<script setup>
import { onMounted, ref, computed, watch } from "vue";
import tableComp from "src/components/tableComponent.vue";
import TransactionPopup from "./TransactionPopup.vue";
import StudentService from "../services/service";

const isTransactionPopupOpen = ref(false);
const currentTransactionType = ref("Income");

// Filter state
const searchQuery = ref("");
const selectedCourse = ref(null);
const selectedType = ref(null);
const allTransactions = ref([]);

const columns = [
  {
    name: "voucherNumber",
    label: "Voucher Number",
    field: (row) => row.category_id,
    align: "left",
    sortable: false,
  },
  {
    name: "course",
    label: "Course",
    field: (row) => row.category_name,
    align: "left",
    sortable: false,
  },
  {
    name: "type",
    label: "Type",
    field: (row) => row.type,
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
    field: (row) => row.transaction_date,
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
  transactionList: {
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

const courseOptions = ref([]);
const typeOptions = ref([]);
const addDropdownOptions = ref([
   { name: "Income", id: 1 },
  { name: "Expense", id: 2 },
  { name: "Service", id: 3 },
  { name: "Funds Transfer", id: 4 },
]);

// Computed property for filtered transactions
const filteredTransactions = computed(() => {
  let filtered = [...allTransactions.value];

  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter((transaction) =>
      transaction.category_id?.toString().toLowerCase().includes(query) ||
      transaction.category_name?.toLowerCase().includes(query) ||
      transaction.type?.toLowerCase().includes(query) ||
      transaction.amount?.toString().includes(query) ||
      transaction.transaction_date?.toLowerCase().includes(query)
    );
  }

  // Apply course filter
  if (selectedCourse.value) {
    filtered = filtered.filter((transaction) => {
       if (transaction.course_id === selectedCourse.value) return true;
       // Fallback: match by name
       const selectedOption = courseOptions.value.find(opt => opt.id === selectedCourse.value);
       return selectedOption && transaction.category_name === selectedOption.name;
    });
  }

  // Apply type filter
  if (selectedType.value) {
      filtered = filtered.filter((transaction) => {
        const typeOption = typeOptions.value.find(opt => opt.id === selectedType.value);
        return typeOption ? transaction.type === typeOption.name : false;
      });
  }

  return filtered;
});

// Update pagination total when filtered transactions change
watch(filteredTransactions, (newFiltered) => {
  pagination.value.rowsNumber = newFiltered.length;
  // If current page is out of bounds, reset to page 1
  const maxPage = Math.ceil(newFiltered.length / pagination.value.rowsPerPage);
  if (pagination.value.page > maxPage && maxPage > 0) {
    pagination.value.page = 1;
  }
});

// Watch for changes in props to update local state
watch(() => props.transactionList, (newVal) => {
  allTransactions.value = newVal;
}, { immediate: true });

// Computed property for paginated transactions (table rows)
const tableRows = computed(() => {
    const filtered = filteredTransactions.value;
    const start = (pagination.value.page - 1) * pagination.value.rowsPerPage;
    const end = start + pagination.value.rowsPerPage;
    return filtered.slice(start, end);
});

const handleAddPayment = (option) => {
  currentTransactionType.value = option.name;
  isTransactionPopupOpen.value = true;
};

const onSaveTransaction = (data) => {
  console.log("Saved Transaction:", data);
  // Implement API call or local update here
};

const onAddNewTransaction = () => {
  // Default action for empty state if needed, or open default popup
  currentTransactionType.value = "Income";
  isTransactionPopupOpen.value = true;
};

const onSearchEvent = (searchValue) => {
  searchQuery.value = searchValue;
  pagination.value.page = 1; // Reset to first page on search
};

const handleFilterChange = ({ type, val }) => {
  console.log(type);
  if (type === 'course') {
    selectedCourse.value = val;
  } else if (type === 'account_type') {
    selectedType.value = val;
  }
  pagination.value.page = 1;
};

const clearFilter = () => {
  selectedCourse.value = null;
  selectedType.value = null;
  searchQuery.value = "";
  // tableComp usually handles clearing its own search input display,
  // relying on us to clear the data filter.
};

const updatePag = (rowsPerPage) => {
  pagination.value.rowsPerPage = rowsPerPage;
  pagination.value.page = 1;
};

const getPagFun = ([apiCall, page, paginationData]) => {
  pagination.value.page = page;
};

const fireSortCall = ([apiCall, sortBy]) => {
  console.log("Sort:", sortBy);
};

const fireCall = ([apiCall, page, paginationData]) => {
  pagination.value.page = page;
};

const getAllTransactionsTypes = () => {
  allTransactions.value = props.transactionList;
  courseOptions.value = props.courseOptions.map(course => ({
          id: course.course_id,
          name: course.course_name,
        }));
  StudentService.getAllTransactions(12)
    .then((response) => {
      if (response.status === 200) {
        typeOptions.value = response.data.data.map(transaction => ({
          name: transaction.label,
          id: transaction.id,
        }));
      }
    }).catch((error) => {
    console.error(error);
  });
}

onMounted(() => {
  getAllTransactionsTypes()
})
</script>
