<template>
  <tableComp
    pageTitle="Notes"
    :tableRows="allNotes"
    :tableColumns="columns"
    :tablePagination="pagination"
    :showAdd="true"
    addBtnLabel="Add Note"
    :showAddButton="false"
    :actions="true"
    :Notes="true"
    :showFilters="false"
    :ShowActionsdropDown="true"
    searchPlaceholder="Search Notes..."
    :showNoteTypeFilter="false"
    :showCreatedAtFilter="false"
    :showCreatedByFilter="false"
    @addNew="addNote"
    @searchEvent="onSearch"
    @getPagFun="getPagFun"
    @sortApi="fireSortCall"
    @callApi="fireCall"
    @DetailsEvent="onViewDetails"
    emptyStateTitle="No notes found"
    emptyStateDescription="Get started by adding a new note."
    emptyStateButtonLabel="Add Note"
  />

  <viewNotePopup
    v-model="showViewDetailsPopup"
    :note="selectedNote"
    :person_name="selectedNote.person_name"
    :person_type="selectedNote.person_type"
    :person="selectedNote.person"
  />
  <addNotePopup v-model="showAddPopup" @save="handleSaveNote" />
</template>

<script setup>
import { onMounted, ref } from "vue";
import tableComp from "src/components/tableComponent.vue";
import viewNotePopup from "../components/viewNotePopup.vue";
import addNotePopup from "../components/addNotePopup.vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import services from "../services/service.js";

const showViewDetailsPopup = ref(false);
const showAddPopup = ref(false);
const selectedNote = ref({});
const $q = useQuasar();
const router = useRouter();

const pagination = ref({
  page: 1,
  rowsPerPage: 20,
  rowsNumber: 100,
});

const columns = [
  {
    name: "personName",
    label: "Person Name",
    field: (row) => row.person_name,
    align: "left",
    sortable: false,
  },
  {
    name: "noteType",
    label: "Note Type",
    field: (row) => row.note_type,
    align: "left",
    sortable: false,
  },
  {
    name: "note",
    label: "Note",
    field: (row) => row.note,
    align: "left",
    sortable: false,
  },
  {
    name: "createdBy",
    label: "Created by",
    field: (row) => row.created_by_name,
    align: "left",
    sortable: false,
  },
  {
    name: "lastUpdated",
    label: "Last updated",
    field: (row) =>
      row.updated_at
        ? new Date(row.updated_at.replace(" ", "T")).toLocaleString("en-US", {
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

const allNotes = ref([]);
const getAllNotes = (page = 1) => {
  $q.loading.show();

  services
    .getAllNotes(page,searchQuery.value)
    .then((res) => {
      allNotes.value = res.data.results;
      // Update pagination with API response
      pagination.value.rowsNumber = res.data.count || 0;
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

const addNote = () => {
  showAddPopup.value = true;
};

const handleSaveNote = (note) => {
  $q.loading.show();

  services.addNotes(note).then((res) => {
      $q.notify({
          badgeStyle: "display:none",
          classes: "custom-Notify",
          textColor: "black-1",
          icon: "img:/images/SuccessIcon.png",
          position: "bottom-right",
          message: "Added Successfully",
        });
        getAllNotes(1);
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

const onViewDetails = (row) => {
  selectedNote.value = row;
  showViewDetailsPopup.value = true;
};

const searchQuery = ref("");
const onSearch = (val) => {
  searchQuery.value = val;
  getAllNotes(1);
};



const getPagFun = ([apiCall, page, paginationData]) => {
  getAllNotes(page);
};

const fireCall = ([apiCall, page, paginationData]) => {
  getAllNotes(page);
};

const fireSortCall = ([apiCall, sorting]) => {
  getAllNotes(1);
};

onMounted(() => {
  getAllNotes();
});
</script>
