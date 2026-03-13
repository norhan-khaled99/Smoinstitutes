<template>
  <div class="global-search-results">
    <tableComp
      :tableRows="formattedResults"
      :tableColumns="columns"
      :tablePagination="pagination"
      :showFilters="false"
      :displayPagination="true"
      :showAdd="false"
      :showAddButton="false"
      :ShowActionsdropDown="false"
      :showViewButton="true"
      @viewRecord="handleView"
      emptyStateTitle="No results found"
      emptyStateDescription="Try adjusting your search query."
      @updatePag="updatePag"
      @getPagFun="getPagFun"
    >
      <template v-slot:body-cell-id="props">
        <q-td :props="props">
          {{ props.row.id }}
        </q-td>
      </template>

      <template v-slot:body-cell-label="props">
        <q-td :props="props">
          <div v-if="props.row.type === 'student' || props.row.type === 'staff'" v-html="highlightKeyword(props.row.label, searchKeyword)"></div>
          <div v-else class="text-weight-medium">
            {{ props.row.label }}
          </div>
        </q-td>
      </template>

      <template v-slot:body-cell-subtitle="props">
        <q-td :props="props">
          <span class="text-grey-7">{{ props.row.subtitle }}</span>
        </q-td>
      </template>

      <template v-slot:body-cell-typeBadge="props">
        <q-td :props="props">
          <q-badge
            class="q-pa-sm"
            :class="{
              'bg-green-1 text-green-8': props.row.type === 'student',
              'bg-purple-1 text-purple-8': props.row.type === 'staff',
              'bg-blue-1 text-blue-8': props.row.type === 'course',
            }"
            rounded
          >
            <q-icon
              :name="getTypeIcon(props.row.type)"
              class="q-mr-xs"
              size="14px"
            />
            <span class="text-capitalize">{{ props.row.type }}</span>
          </q-badge>
        </q-td>
      </template>

      <template v-slot:body-cell-actionBtn="props">
        <q-td :props="props" class="text-right">
          <q-btn
            flat
            dense
            color="primary"
            label="View"
            class="text-weight-bold"
            no-caps
            @click="handleView(props.row)"
          />
        </q-td>
      </template>
    </tableComp>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import tableComp from "src/components/tableComponent.vue";

const props = defineProps({
  results: {
    type: Array,
    default: () => [],
  },
  searchKeyword: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["viewRecord"]);

const columns = [
  {
    name: "id",
    label: "ID",
    field: (row) => row.id,
    align: "left",
    sortable: true,
  },
  {
    name: "label",
    label: "Label",
    field: (row) => row.label,
    align: "left",
    sortable: true,
  },
  {
    name: "subtitle",
    label: "Subtitle",
    field: (row) => row.subtitle,
    align: "left",
    sortable: false,
  },
  {
    name: "typeBadge",
    label: "Type",
    field: (row) => row.type,
    align: "left",
    sortable: true,
  },
  {
    name: "actions",
    label: "Action",
    align: "right",
    sortable: false,
  },
];

const pagination = ref({
  page: 1,
  rowsPerPage: 10,
  rowsNumber: 0,
});

const formattedResults = computed(() => {
  // Client-side pagination for the passed results
  const start = (pagination.value.page - 1) * pagination.value.rowsPerPage;
  const end = start + pagination.value.rowsPerPage;
  return props.results.slice(start, end);
});

watch(
  () => props.results,
  (newVal) => {
    pagination.value.rowsNumber = newVal.length;
    pagination.value.page = 1;
  },
  { immediate: true }
);

const getTypeIcon = (type) => {
  switch (type) {
    case "student":
      return "person_outline";
    case "staff":
      return "people_outline";
    case "course":
      return "school";
    default:
      return "info";
  }
};

const handleView = (row) => {
  emit("viewRecord", { type: row.type, id: row.id });
};

const updatePag = (rowsPerPage) => {
  pagination.value.rowsPerPage = rowsPerPage;
  pagination.value.page = 1;
};

const getPagFun = ([apiCall, page, paginationData]) => {
  pagination.value.page = page;
};

const highlightKeyword = (text, keyword) => {
  if (!keyword || !text) return text;
  const regex = new RegExp(`(${keyword})`, "gi");
  return text.toString().replace(regex, '<span class="text-primary text-weight-bold">$1</span>');
};
</script>

<style scoped>
.global-search-results {
  width: 100%;
}
</style>
