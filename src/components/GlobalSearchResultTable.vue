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
      :showEmptyStateButton="false"
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
          <div class="row items-center no-wrap">
            <div
              class="icon-wrapper q-mr-sm flex flex-center"
              :style="{
                backgroundColor: getTypeStyle(props.row.type).bgColor,
              }"
            >
              <span
                v-if="getTypeStyle(props.row.type).icon.startsWith('<svg')"
                v-html="getTypeStyle(props.row.type).icon"
                class="flex flex-center"
              ></span>
              <q-icon
                v-else
                :name="getTypeStyle(props.row.type).icon"
                size="20px"
                :class="getTypeStyle(props.row.type).textClass"
              />
            </div>
            <span class="text-capitalize text-weight-medium">{{ props.row.type }}</span>
          </div>
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

const typeStyles = {
  student: {
    icon: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M10 1.04102C7.8139 1.04102 6.0417 2.81322 6.0417 4.99935C6.0417 7.18548 7.8139 8.95768 10 8.95768C12.1862 8.95768 13.9584 7.18548 13.9584 4.99935C13.9584 2.81322 12.1862 1.04102 10 1.04102ZM7.2917 4.99935C7.2917 3.50358 8.50426 2.29102 10 2.29102C11.4958 2.29102 12.7084 3.50358 12.7084 4.99935C12.7084 6.49512 11.4958 7.70768 10 7.70768C8.50426 7.70768 7.2917 6.49512 7.2917 4.99935Z" fill="#47AE4B"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10 10.2077C8.07207 10.2077 6.2958 10.6459 4.97957 11.3863C3.68293 12.1157 2.70836 13.2211 2.70836 14.5827L2.70831 14.6676C2.70737 15.6359 2.70619 16.851 3.77204 17.719C4.2966 18.1461 5.03043 18.4499 6.02187 18.6506C7.01608 18.8518 8.31189 18.9577 10 18.9577C11.6882 18.9577 12.984 18.8518 13.9782 18.6506C14.9696 18.4499 15.7035 18.1461 16.228 17.719C17.2939 16.851 17.2927 15.6359 17.2918 14.6676L17.2917 14.5827C17.2917 13.2211 16.3171 12.1157 15.0205 11.3863C13.7043 10.6459 11.928 10.2077 10 10.2077ZM3.95836 14.5827C3.95836 13.8732 4.47618 13.1036 5.5924 12.4758C6.68903 11.8589 8.24609 11.4577 10 11.4577C11.754 11.4577 13.311 11.8589 14.4077 12.4758C15.5239 13.1036 16.0417 13.8732 16.0417 14.5827C16.0417 15.6725 16.0081 16.286 15.4387 16.7497C15.1299 17.0011 14.6138 17.2466 13.7302 17.4254C12.8494 17.6037 11.6452 17.7077 10 17.7077C8.35484 17.7077 7.15065 17.6037 6.26986 17.4254C5.3863 17.2466 4.87013 17.0011 4.56135 16.7497C3.99196 16.286 3.95836 15.6725 3.95836 14.5827Z" fill="#47AE4B"/>
</svg>
`,
    bgColor: "#E8F5E9",
    textClass: "text-purple-6",
  },
  staff: {
    icon: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.99998 1.04102C7.81385 1.04102 6.04165 2.81322 6.04165 4.99935C6.04165 7.18548 7.81385 8.95768 9.99998 8.95768C12.1861 8.95768 13.9583 7.18548 13.9583 4.99935C13.9583 2.81322 12.1861 1.04102 9.99998 1.04102ZM7.29165 4.99935C7.29165 3.50358 8.50421 2.29102 9.99998 2.29102C11.4958 2.29102 12.7083 3.50358 12.7083 4.99935C12.7083 6.49512 11.4958 7.70768 9.99998 7.70768C8.50421 7.70768 7.29165 6.49512 7.29165 4.99935Z" fill="#5521B5"/>
<path d="M15 2.70768C14.6548 2.70768 14.375 2.9875 14.375 3.33268C14.375 3.67786 14.6548 3.95768 15 3.95768C16.1471 3.95768 16.875 4.71246 16.875 5.41602C16.875 6.11957 16.1471 6.87435 15 6.87435C14.6548 6.87435 14.375 7.15417 14.375 7.49935C14.375 7.84453 14.6548 8.12435 15 8.12435C16.6143 8.12435 18.125 7.01364 18.125 5.41602C18.125 3.81839 16.6143 2.70768 15 2.70768Z" fill="#5521B5"/>
<path d="M5.62498 3.33268C5.62498 2.9875 5.34516 2.70768 4.99998 2.70768C3.38563 2.70768 1.87498 3.81839 1.87498 5.41602C1.87498 7.01364 3.38563 8.12435 4.99998 8.12435C5.34516 8.12435 5.62498 7.84453 5.62498 7.49935C5.62498 7.15417 5.34516 6.87435 4.99998 6.87435C3.85291 6.87435 3.12498 6.11957 3.12498 5.41602C3.12498 4.71246 3.85291 3.95768 4.99998 3.95768C5.34516 3.95768 5.62498 3.67786 5.62498 3.33268Z" fill="#5521B5"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.99998 10.2077C8.51309 10.2077 7.13869 10.6083 6.11776 11.289C5.1012 11.9667 4.37498 12.9716 4.37498 14.166C4.37498 15.3605 5.1012 16.3654 6.11776 17.0431C7.13869 17.7237 8.51309 18.1243 9.99998 18.1243C11.4869 18.1243 12.8613 17.7237 13.8822 17.0431C14.8988 16.3654 15.625 15.3605 15.625 14.166C15.625 12.9716 14.8988 11.9667 13.8822 11.289C12.8613 10.6083 11.4869 10.2077 9.99998 10.2077ZM5.62498 14.166C5.62498 13.5195 6.01805 12.8577 6.81113 12.329C7.59985 11.8032 8.72545 11.4577 9.99998 11.4577C11.2745 11.4577 12.4001 11.8032 13.1888 12.329C13.9819 12.8577 14.375 13.5195 14.375 14.166C14.375 14.8125 13.9819 15.4743 13.1888 16.003C12.4001 16.5288 11.2745 16.8743 9.99998 16.8743C8.72545 16.8743 7.59985 16.5288 6.81113 16.003C6.01805 15.4743 5.62498 14.8125 5.62498 14.166Z" fill="#5521B5"/>
<path d="M16.0562 11.5321C16.1301 11.195 16.4634 10.9816 16.8005 11.0555C17.6021 11.2313 18.3244 11.5488 18.8607 11.9876C19.3964 12.426 19.7916 13.0287 19.7916 13.7493C19.7916 14.47 19.3964 15.0727 18.8607 15.5111C18.3244 15.9499 17.6021 16.2674 16.8005 16.4432C16.4634 16.5171 16.1301 16.3037 16.0562 15.9666C15.9822 15.6294 16.1956 15.2961 16.5328 15.2222C17.1931 15.0774 17.7208 14.8287 18.069 14.5437C18.4178 14.2583 18.5416 13.9796 18.5416 13.7493C18.5416 13.5191 18.4178 13.2404 18.069 12.955C17.7208 12.67 17.1931 12.4213 16.5328 12.2765C16.1956 12.2026 15.9822 11.8693 16.0562 11.5321Z" fill="#5521B5"/>
<path d="M3.19944 11.0555C3.5366 10.9816 3.86987 11.195 3.94381 11.5321C4.01775 11.8693 3.80436 12.2026 3.46719 12.2765C2.80689 12.4213 2.27919 12.67 1.93091 12.955C1.58217 13.2404 1.45831 13.5191 1.45831 13.7493C1.45831 13.9796 1.58217 14.2583 1.93091 14.5437C2.27919 14.8287 2.80689 15.0774 3.46719 15.2222C3.80436 15.2961 4.01775 15.6294 3.94381 15.9666C3.86987 16.3037 3.5366 16.5171 3.19944 16.4432C2.39787 16.2674 1.67556 15.9499 1.13931 15.5111C0.60352 15.0727 0.208313 14.47 0.208313 13.7493C0.208313 13.0287 0.60352 12.426 1.13931 11.9876C1.67556 11.5488 2.39787 11.2313 3.19944 11.0555Z" fill="#5521B5"/>
</svg>
`,
    bgColor: "#EDEBFE",
    textClass: "text-purple"
},
course: {
    icon: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.88698 2.35048C9.23924 1.71651 10.7607 1.71651 12.113 2.35048L17.689 4.96464C18.5659 5.37575 18.9584 6.26852 18.9584 7.08335C18.9584 7.89819 18.5659 8.79095 17.689 9.20207L16.4584 9.77902V13.8545C16.4584 14.8987 15.9348 15.9069 14.9817 16.4347C14.3553 16.7816 13.532 17.1993 12.6657 17.5316C11.8096 17.8601 10.8616 18.125 10 18.125C9.13843 18.125 8.19044 17.8601 7.33432 17.5316C6.46801 17.1993 5.64478 16.7816 5.01834 16.4347C4.06523 15.9069 3.54169 14.8987 3.54169 13.8545V9.77898L2.31105 9.20203L2.29169 9.19284V11.6667C2.29169 12.0118 2.01186 12.2917 1.66669 12.2917C1.32151 12.2917 1.04169 12.0118 1.04169 11.6667V7.08333C1.04169 6.2685 1.43414 5.37571 2.31105 4.9646L7.88698 2.35048ZM4.79169 10.365V13.8545C4.79169 14.4904 5.10731 15.0551 5.62392 15.3412C6.22113 15.6719 6.98901 16.0603 7.78206 16.3646C8.5853 16.6727 9.36494 16.875 10 16.875C10.6351 16.875 11.4147 16.6727 12.218 16.3646C13.011 16.0603 13.7789 15.6719 14.3761 15.3412C14.8927 15.0551 15.2084 14.4904 15.2084 13.8545V10.365L12.1131 11.8162C10.7608 12.4502 9.23932 12.4502 7.88705 11.8162L4.79169 10.365ZM2.84166 8.07024C2.50568 7.91272 2.29169 7.53699 2.29169 7.08332C2.29169 6.62964 2.50568 6.25391 2.84166 6.09639L8.41759 3.48227C9.43367 3.00591 10.5663 3.00591 11.5824 3.48227L17.1584 6.09643C17.4944 6.25394 17.7084 6.62968 17.7084 7.08335C17.7084 7.53702 17.4944 7.91276 17.1584 8.07028L11.5825 10.6844C10.5664 11.1608 9.43374 11.1608 8.41766 10.6844L2.84166 8.07024Z" fill="#1565C0"/>
</svg>

`,
    bgColor: "#E3F2FD",
    textClass: "text-purple"
},
}

const getTypeStyle = (type) => {
  return typeStyles[type?.toLowerCase()] || {
    icon: "info",
    bgColor: "#F3F4F6",
    textClass: "text-grey-8"
  };
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
