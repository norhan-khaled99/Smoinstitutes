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
    :showTypeFilterInTransation="true"
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
    :currentTransaction="currentTransactionData"
    v-if="currentTransactionData"
    @save="onSaveTransaction"
  />
</template>

<script setup>
import {onMounted, ref, watch} from "vue";
import tableComp from "src/components/tableComponent.vue";
import TransactionPopup from "./TransactionPopup.vue";
import StudentService from "../services/service";
import {uid, useQuasar} from "quasar";

const $q = useQuasar();
const isTransactionPopupOpen = ref(false);
const currentTransactionType = ref("Income");
const currentTransactionData = ref({});

// Filter state
const searchQuery = ref("");
const selectedCourse = ref(null);
const selectedType = ref(null);
const serviceOptions = ref([]);
const accountOptions = ref([]);
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

const courseOptions = ref([]);
const typeOptions = ref([]);
const addDropdownOptions = ref([
  {name: "Income", id: 1},
  {name: "Expense", id: 2},
  {name: "Service", id: 3},
  {name: "Funds Transfer", id: 4},
]);

const tableRows = ref([]);

const handleAddPayment = (option) => {
  currentTransactionType.value = option.name;
  currentTransactionData.value = option;
  isTransactionPopupOpen.value = true;
};

const onSaveTransaction = (data) => {
  const random = uid();
  let promise;
  const payload = {};

  if (data.type === 'Income') {
    Object.assign(payload, {
      paper_no: data.voucherNumber,
      to_account: data.toAccount ? data.toAccount : props.student.globalid,
      amount: data.amount,
      category_id: data.course ? data.courseId : null,
      details: data.details,
    });
    promise = StudentService.addIncomePayment(payload, random);
  } else if (data.type === 'Expense') {
    Object.assign(payload, {
      paper_no: data.voucherNumber,
      from_account: props.student.globalid,
      amount: data.amount,
      category_id: data.course ? data.courseId : null,
      details: data.details,
    });
    promise = StudentService.addExpensePayment(payload, random);
  } else if (data.type === 'Service') {
    Object.assign(payload, {
      student: data.toAccount ? data.toAccount : props.student.globalid,
      service: data.service ? data.serviceId : null,
      amount: data.amount,
      details: data.details,
    });
    promise = StudentService.addServicePayment(payload, random);
  } else if (data.type === 'Funds Transfer') {
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
    promise.then((response) => {
      if (response.status === 200 || response.status === 201) {
        $q.notify({
          badgeStyle: "display:none",
          classes: "custom-Notify",
          textColor: "black-1",
          icon: "img:/images/success.png",
          position: "bottom-right",
          message: response.data.result || "Payment added successfully.",
        });
        isTransactionPopupOpen.value = false;
        getTransactions(pagination.value.page);
      }
    }).catch((error) => {
      $q.notify({
        badgeStyle: "display:none",
        classes: "custom-Notify",
        textColor: "black-1",
        icon: "img:/images/Error.png",
        position: "bottom-right",
        message: error.response?.data?.result || "An error occurred.",
      });
    }).finally(() => {
      $q.loading.hide();
    });
  }
};

const onAddNewTransaction = () => {
  currentTransactionType.value = "Income";
  isTransactionPopupOpen.value = true;
};

const onSearchEvent = (searchValue) => {
  searchQuery.value = searchValue;
  getTransactions(1);
};

const handleFilterChange = ({type, val}) => {
  console.log(type);
  if (type === 'course') {
    selectedCourse.value = val;
  } else if (type === 'jtype') {
    selectedType.value = val;
  }
  getTransactions(1);
};

const clearFilter = () => {
  selectedCourse.value = null;
  selectedType.value = null;
  searchQuery.value = "";
  getTransactions(1);
};

const updatePag = (rowsPerPage) => {
  pagination.value.rowsPerPage = rowsPerPage;
  getTransactions(1);
};

const getPagFun = ([apiCall, page, paginationData]) => {
  getTransactions(page);
};

const fireSortCall = ([apiCall, sortBy]) => {
  console.log("Sort:", sortBy);
};

const fireCall = ([apiCall, page, paginationData]) => {
  getTransactions(page);
};

const getTransactions = (page = 1) => {
  $q.loading.show();
  const accountId = props.student.globalid || "";
  const typeId = selectedType.value || "";
  const courseId = selectedCourse.value || "";
  const search = searchQuery.value || "";

  StudentService.getAllTransactions(accountId, typeId, courseId, page, search)
    .then((response) => {
      if (response.status === 200) {
        tableRows.value = response.data.results;
        pagination.value.rowsNumber = response.data.count || 0;
        pagination.value.page = page;
        $q.loading.hide();
      }
    }).catch((error) => {
    $q.notify({
      badgeStyle: "display:none",
      classes: "custom-Notify",
      textColor: "black-1",
      icon: "img:/images/Error.png",
      position: "bottom-right",
      message: error.response?.data?.result || "An error occurred.",
    });
    $q.loading.hide();
  });

};

const initializeData = () => {
  addDropdownOptions.value = props.paymentOptions.map(item => ({
    ...item,
    name: item.type
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' '),
    id: item.type_id
  }));
  StudentService.getAllTransactionsType(12)
    .then((response) => {
      if (response.status === 200) {
        typeOptions.value = response.data.data.map(transaction => ({
          label: transaction.label,
          id: transaction.id,
        }));
      }
    }).catch((error) => {
    $q.notify({
      badgeStyle: "display:none",
      classes: "custom-Notify",
      textColor: "black-1",
      icon: "img:/images/Error.png",
      position: "bottom-right",
      message: error.response?.data?.result || "An error occurred.",
    });
  });
  getTransactions(1);
}

onMounted(() => {
  initializeData();
})
</script>
