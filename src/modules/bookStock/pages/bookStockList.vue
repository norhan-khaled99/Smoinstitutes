<template>
  <tableComp
    pageTitle="Books Stock"
    :tableRows="allBookStock"
    :tableColumns="columns"
    :tablePagination="pagination"
    :showAdd="true"
    addBtnLabel="Add Book Stock"
    :actions="true"
    :showFilters="true"
    :ShowActionsdropDown="true"
    searchPlaceholder="Search books stock..."
    :showDirectionFilter="true"
    :directionOptions="directionOptions"
    :showLevelFilter="true"
    :levelOptions="levelOptions"
    :showByUserFilter="true"
    :byUserOptions="byUserOptions"
    @addNew="addBook"
    :bookStock="true"
    @DetailsEvent="onViewDetails"
    @searchEvent="onSearch"
    @filterChange="onFilterChange"
    @clearFilters="clearFilters"
    @updatePag="updatePag"
    @getPagFun="getPagFun"
    @sortApi="fireSortCall"
    @callApi="fireCall"
    emptyStateTitle="No books found"
    emptyStateDescription="Get started by adding book stock."
    emptyStateButtonLabel="Add Book"
  />

  <addBookStock
    v-model="showAddBookPopup"
    :levelOptions="levelOptions"
    @save="handleSaveBook"
  />

  <bookStockDetailsPopup v-model="showDetailsPopup" :row="selectedRow" />
</template>

<script setup>
import { onMounted, ref } from "vue";
import tableComp from "src/components/tableComponent.vue";
import addBookStock from "../components/addBookStock.vue";
import bookStockDetailsPopup from "../components/bookStockDetailsPopup.vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import services from "../services/service.js";

const showAddBookPopup = ref(false);
const showDetailsPopup = ref(false);
const selectedRow = ref({});
const $q = useQuasar();
const router = useRouter();

const pagination = ref({
  page: 1,
  rowsPerPage: 20,
  rowsNumber: 100,
});

const columns = [
  {
    name: "level",
    label: "Level",
    field: (row) => row.level_name,
    align: "left",
    sortable: false,
  },
  {
    name: "direction",
    label: "Direction",
    field: (row) => row.direction_label,
    align: "left",
    sortable: false,
  },
  {
    name: "quantity",
    label: "Quantity",
    field: (row) => row.quantity,
    align: "left",
    sortable: false,
  },
  {
    name: "byUser",
    label: "By user",
    field: (row) => row.username,
    align: "left",
    sortable: false,
  },
  {
    name: "lastUpdated",
    label: "Last updated",
    field: (row) =>
      row.last_updated
        ? new Date(row.last_updated.replace(" ", "T")).toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          })
        : "",
    align: "left",
    sortable: false,
  },
  {
    name: "actions",
    label: "Action",
    align: "center",
  },
];

const allBookStock = ref([]);
const getAllBookStock = (page = 1) => {
  $q.loading.show();

  services
    .getAllBookStock(page, typeOfFilter.value, valueOfFilter.value , searchQuery.value)
    .then((res) => {
      allBookStock.value = res.data.data.results;

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
        message: error.response?.data?.result || "An error occurred.",
      });
    });
};

const directionOptions = ref([
  { id: 1, name: "Stock In" },
  { id: -1, name: "Stock Out" },
]);

const levelOptions = ref([]);
const getlevelOptions = () => {
  services
    .getlevelOptions()
    .then((res) => {
      levelOptions.value = res.data.data;
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

const byUserOptions = ref([]);

const getByUserOptions = () => {
  services
    .getByUserOptions()
    .then((res) => {
      byUserOptions.value = res.data.data;
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

const addBook = () => {
  showAddBookPopup.value = true;
};

const onViewDetails = (row) => {
  selectedRow.value = row;
  showDetailsPopup.value = true;
};

const handleSaveBook = (bookData) => {
  $q.loading.show();

  services
    .addBookStock(bookData)
    .then((res) => {
      $q.notify({
        badgeStyle: "display:none",
        classes: "custom-Notify",
        textColor: "black-1",
        icon: "img:/images/SuccessIcon.png",
        position: "bottom-right",
        message: "Added Successfully",
      });
      getAllBookStock(1);
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
        message: error.errors?.__all__?.[0] || "An error occurred.",
      });
    });
};

const searchQuery = ref("");
const onSearch = (val) => {
  searchQuery.value = val;
  getAllBookStock(1);
};

const typeOfFilter = ref("");
const valueOfFilter = ref("");
const onFilterChange = ({ type, val }) => {
  if (val != null) {
    typeOfFilter.value = type;
    valueOfFilter.value = val;
    getAllBookStock(1);
  } else {
    typeOfFilter.value = "";
    valueOfFilter.value = "";
    getAllBookStock(1);
  }
};

const clearFilters = () => {
  typeOfFilter.value = "";
  valueOfFilter.value = "";
  getAllBookStock(1);
};

const getPagFun = ([apiCall, page, paginationData]) => {
  getAllBookStock(page);
};

const fireCall = ([apiCall, page, paginationData]) => {
  getAllBookStock(page);
};

const fireSortCall = ([apiCall, sorting]) => {
  getAllBookStock(1);
};

onMounted(() => {
  getAllBookStock();
  getlevelOptions();
  getByUserOptions();
});
</script>
