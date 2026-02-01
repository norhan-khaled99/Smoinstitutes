<template>
  <tableComp
    pageTitle="Notes"
    :tableRows="tableRows"
    :tableColumns="columns"
    :tablePagination="pagination"
    :showAdd="true"
    addBtnLabel="Add Note"
    :showAddButton="false"
    :actions="true"
    :Notes="true"
    :showFilters="true"
    :ShowActionsdropDown="true"
    searchPlaceholder="Search Notes..."
    :showNoteTypeFilter="true"
    :noteTypeOptions="noteTypeOptions"
    :showCreatedAtFilter="true"
    :createdAtOptions="createdAtOptions"
    :showCreatedByFilter="true"
    :createdByOptions="createdByOptions"
    @addNew="addNote"
    @searchEvent="onSearch"
    @filterChange="onFilterChange"
    @clearFilters="clearFilters"
    @updatePag="updatePag"
    @getPagFun="getPagFun"
    @sortApi="fireSortCall"
    @callApi="fireCall"
    @DetailsEvent="onViewDetails"
    emptyStateTitle="No notes found"
    emptyStateDescription="Get started by adding a new note."
    emptyStateButtonLabel="Add Note"
  />

  <viewNotePopup v-model="showViewDetailsPopup" :note="selectedNote" />
  <addNotePopup v-model="showAddPopup" @save="handleSaveNote" />
</template>

<script setup>
import { onMounted, ref } from "vue";
import tableComp from "src/components/tableComponent.vue";
import viewNotePopup from "../components/viewNotePopup.vue";
import addNotePopup from "../../students/components/addNotePopup.vue";

const showViewDetailsPopup = ref(false);
const showAddPopup = ref(false);
const selectedNote = ref({});

const pagination = ref({
  page: 1,
  rowsPerPage: 10,
  rowsNumber: 100,
});

const columns = [
  {
    name: "personName",
    label: "Person Name",
    field: (row) => row.personName,
    align: "left",
    sortable: true,
  },
  {
    name: "noteType",
    label: "Note Type",
    field: (row) => row.noteType,
    align: "left",
    sortable: true,
  },
  {
    name: "note",
    label: "Note",
    field: (row) => row.note,
    align: "left",
    sortable: false,
    classes: "note-text-cell",
  },
  {
    name: "createdBy",
    label: "Created by",
    field: (row) => row.createdBy,
    align: "left",
    sortable: true,
  },
  {
    name: "lastUpdated",
    label: "Last updated",
    field: (row) => row.lastUpdated,
    align: "left",
    sortable: true,
  },
  {
    name: "actions",
    label: "Action",
    align: "center",
  },
];

const tableRows = ref([
  {
    id: 1,
    personName: "Yara Abdullah Ahmed Ali",
    noteType: "Important",
    note: "The student showed great improvement ",
    createdBy: "Nawar_Hassan",
    lastUpdated: "Jan 17, 2026, 7:20 AM",
  },
  {
    id: 2,
    personName: "Moaz Essam Hammoud",
    noteType: "Warning",
    note: "Frequent lateness observed this week....",
    createdBy: "Nawar_Hassan",
    lastUpdated: "Dec 28, 2025, 2:57 AM",
  },
  {
    id: 3,
    personName: "Ali Saleh Mohammed",
    noteType: "Info",
    note: "Student requested a change in the cou...",
    createdBy: "Hamdi Majed",
    lastUpdated: "Oct 16, 2025, 9:25 AM",
  },
  {
    id: 4,
    personName: "Abdullah Saleh Mobarek",
    noteType: "Info",
    note: "Student requested a change in the cou...",
    createdBy: "Nawar_Hassan",
    lastUpdated: "Oct 16, 2025, 9:25 AM",
  },
  {
    id: 5,
    personName: "Youssef Mohammed Yaslam",
    noteType: "Important",
    note: "Tuition fees for the current month are o...",
    createdBy: "Hamdi Majed",
    lastUpdated: "Oct 16, 2025, 9:25 AM",
  },
  {
    id: 6,
    personName: "Amani Ahmed Mohammed Ali",
    noteType: "Warning",
    note: "Frequent lateness observed this week....",
    createdBy: "Nawar_Hassan",
    lastUpdated: "Oct 16, 2025, 9:25 AM",
  },
  {
    id: 7,
    personName: "Yassin Gamal Mohshen Hussien",
    noteType: "Important",
    note: "Tuition fees for the current month are o...",
    createdBy: "Hamdi Majed",
    lastUpdated: "Oct 16, 2025, 9:25 AM",
  },
  {
    id: 8,
    personName: "Hussien Maged Hussien",
    noteType: "Warning",
    note: "Frequent lateness observed this week....",
    createdBy: "Laila_Mahfood",
    lastUpdated: "Oct 16, 2025, 9:25 AM",
  },
  {
    id: 9,
    personName: "Qassem Abdulghani Mohammed",
    noteType: "Warning",
    note: "Frequent lateness observed this week....",
    createdBy: "Laila_Mahfood",
    lastUpdated: "Oct 16, 2025, 9:25 AM",
  },
  {
    id: 10,
    personName: "Eman Saleh Ben Saleh Salem",
    noteType: "Info",
    note: "Student requested a change in the cou...",
    createdBy: "Laila_Mahfood",
    lastUpdated: "Oct 16, 2025, 9:25 AM",
  },
]);

const noteTypeOptions = ref([
  { id: 1, name: "Important" },
  { id: 2, name: "Warning" },
  { id: 3, name: "Info" },
]);

const createdAtOptions = ref([
  { id: 1, name: "Last 7 days" },
  { id: 2, name: "Last 30 days" },
  { id: 3, name: "Last year" },
]);

const createdByOptions = ref([
  { id: 1, name: "Nawar_Hassan" },
  { id: 2, name: "Hamdi Majed" },
  { id: 3, name: "Laila_Mahfood" },
]);

const addNote = () => {
  showAddPopup.value = true;
};

const handleSaveNote = (note) => {
  console.log("Saved note:", note);
};

const onViewDetails = (row) => {
  selectedNote.value = row;
  showViewDetailsPopup.value = true;
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
onMounted(() => {});
</script>
