<template>
  <table-comp :tableColumns="columns" :tableRows="rows" :tablePagination="pagination" :loading="loading"
    pageTitle="Profiles" addBtnLabel="Add Profile" :showAddButton="true" :profiles="true" :showTypeFilter="true"
    :typeOptions="accountTypeOptions" :showBalanceFilter="true" :balanceOptions="balanceOptions" @addNew="addNewProfile"
    @DetailsEvent="viewProfile" @EditEvent="editProfile" :ShowActionsdropDown="true" :actions="true">
    <!-- Custom Account Type Slot -->
    <template #body-cell-accountType="{ row }">
      <div class="row items-center no-wrap">
        <div class="icon-wrapper q-mr-sm flex flex-center"
          :style="{ backgroundColor: getAccountStyle(row.accountType).bgColor }">
          <span v-if="getAccountStyle(row.accountType).icon.startsWith('<svg')"
            v-html="getAccountStyle(row.accountType).icon" class="flex flex-center"></span>
          <q-icon v-else :name="getAccountStyle(row.accountType).icon" size="20px"
            :class="getAccountStyle(row.accountType).textClass" />
        </div>
        <span>{{ row.accountType }}</span>
      </div>
    </template>
  </table-comp>
</template>

<script setup>
import { ref } from "vue";
import tableComp from "src/components/tableComponent.vue";
import { useRouter } from "vue-router";

// Mock Data
const router = useRouter();
const loading = ref(false);
const pagination = ref({
  page: 1,
  rowsPerPage: 10,
  rowsNumber: 10,
});

const accountTypeOptions = [
  { id: "Expenses", name: "Expenses" },
  { id: "Income Fees", name: "Income Fees" },
  { id: "Cash Box", name: "Cash Box" },
  { id: "Purchase", name: "Purchase" },
  { id: "Bank Accounts", name: "Bank Accounts" },
  { id: "Deductions", name: "Deductions" },
];

const balanceOptions = [
  { id: "positive", name: "Positive Balance" },
  { id: "negative", name: "Negative Balance" },
  { id: "zero", name: "Zero Balance" },
];

const columns = [
  {
    name: "image",
    label: "Full Name",
    align: "left",
    field: (row) => row.studentName,
    sortable: true,
  },
  {
    name: "profileId",
    label: "Profile ID",
    align: "left",
    field: "profileId",
    sortable: true,
  },
  {
    name: "accountType",
    label: "Account Type",
    align: "left",
    field: "accountType",
    sortable: true,
  },
  {
    name: "mobile",
    label: "Mobile",
    align: "left",
    field: "mobile",
  },
  {
    name: "balanceDisplay",
    label: "Balance",
    align: "left",
    field: "balance",
    sortable: true,
  },
  {
    name: "actions",
    label: "Action",
    align: "center",
    field: "actions",
  },
];

const rows = ref([
  {
    id: 1,
    studentName: "Yara Abdullah Ahmed Ali",
    studentImage: "https://cdn.quasar.dev/img/avatar2.jpg",
    profileId: "251221",
    accountType: "Expenses",
    mobile: "+971523064607",
    balance: "-84950",
    actions: true,
  },
  {
    id: 2,
    studentName: "Moaz Essam Hammoud Musleh",
    studentImage: "https://cdn.quasar.dev/img/avatar4.jpg",
    profileId: "251220",
    accountType: "Income Fees",
    mobile: "+971557134005",
    balance: "2000",
    actions: true,
  },
  {
    id: 3,
    studentName: "Ali Saleh Mohammed Muthana",
    studentImage: "https://cdn.quasar.dev/img/avatar3.jpg",
    profileId: "251219",
    accountType: "Cash Box",
    mobile: "+971556072983",
    balance: "0.00",
    actions: true,
  },
  {
    id: 4,
    studentName: "Abdullah Saleh Mobarek Hussien Alharthy",
    studentImage: "https://cdn.quasar.dev/img/avatar5.jpg",
    profileId: "251218",
    accountType: "Purchase",
    mobile: "+971553088206",
    balance: "2000",
    actions: true,
  },
  {
    id: 5,
    studentName: "Youssef Mohammed Yaslam Mohammed",
    studentImage: "https://cdn.quasar.dev/img/avatar6.jpg",
    profileId: "251217",
    accountType: "Bank Accounts",
    mobile: "+971553296324",
    balance: "0.00",
    actions: true,
  },
  {
    id: 6,
    studentName: "Amani Ahmed Mohammed Ali",
    studentImage: "https://cdn.quasar.dev/img/avatar2.jpg",
    profileId: "251216",
    accountType: "Deductions",
    mobile: "+971559533707",
    balance: "-56250",
    actions: true,
  },
  {
    id: 7,
    studentName: "Yassin Gamal Mohshen Hussien",
    studentImage: "https://cdn.quasar.dev/img/avatar1.jpg",
    profileId: "251215",
    accountType: "Purchase",
    mobile: "+971503603570",
    balance: "6500",
    actions: true,
  },
  {
    id: 8,
    studentName: "Hussien Maged Hussien Abdulrahman",
    studentImage: "https://cdn.quasar.dev/img/avatar3.jpg",
    profileId: "251214",
    accountType: "Purchase",
    mobile: "+971553296324",
    balance: "5000",
    actions: true,
  },
  {
    id: 9,
    studentName: "Qassem Abdulghani Mohammed Motlaq",
    studentImage: "https://cdn.quasar.dev/img/avatar4.jpg",
    profileId: "251213",
    accountType: "Deductions",
    mobile: "+971502469158",
    balance: "0.00",
    actions: true,
  },
  {
    id: 10,
    studentName: "Eman Saleh Ben Saleh Salem",
    studentImage: "https://cdn.quasar.dev/img/avatar2.jpg",
    profileId: "251212",
    accountType: "Expenses",
    mobile: "+971505437621",
    balance: "-56250",
    actions: true,
  },
]);

// Helper to get styles for Account Types
const accountStyles = {
  Expenses: {
    icon: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.75 14.0001C12.1777 13.6199 12.8223 13.6199 13.25 14.0001C13.5406 14.2584 14 14.0521 14 13.6633V2.33679C14 1.94797 13.5406 1.74168 13.25 1.99999C12.8223 2.38019 12.1777 2.38019 11.75 1.99999C11.3223 1.61979 10.6777 1.61979 10.25 1.99999C9.82228 2.38019 9.17772 2.38019 8.75 1.99999C8.32228 1.61979 7.67772 1.61979 7.25 1.99999C6.82228 2.38019 6.17772 2.38019 5.75 1.99999C5.32228 1.61979 4.67772 1.61979 4.25 1.99999C3.82228 2.38019 3.17772 2.38019 2.75 1.99999C2.45939 1.74168 2 1.94797 2 2.33679V13.6633C2 14.0521 2.45939 14.2584 2.75 14.0001C3.17772 13.6199 3.82228 13.6199 4.25 14.0001C4.67772 14.3803 5.32228 14.3803 5.75 14.0001C6.17772 13.6199 6.82228 13.6199 7.25 14.0001C7.67772 14.3803 8.32228 14.3803 8.75 14.0001C9.17772 13.6199 9.82228 13.6199 10.25 14.0001C10.6777 14.3803 11.3223 14.3803 11.75 14.0001Z" stroke="#C81E1E"/>
<path d="M5 10.334H11" stroke="#C81E1E" stroke-linecap="round"/>
<path d="M5 8H11" stroke="#C81E1E" stroke-linecap="round"/>
<path d="M5 5.66602H11" stroke="#C81E1E" stroke-linecap="round"/>
</svg>`,
    bgColor: "#FDE8E8",
    textClass: "text-negative",
  },
  "Income Fees": {
    icon: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.00001 12.6673C4.12739 12.6673 3.19109 12.6673 2.51849 12.2179C2.22732 12.0233 1.97731 11.7733 1.78276 11.4822C1.33334 10.8096 1.33334 9.87327 1.33334 8.00065C1.33334 6.12803 1.33334 5.19173 1.78276 4.51913C1.97731 4.22796 2.22732 3.97796 2.51849 3.7834C3.19109 3.33398 4.12739 3.33398 6.00001 3.33398L10 3.33398C11.8726 3.33398 12.8089 3.33398 13.4815 3.7834C13.7727 3.97795 14.0227 4.22796 14.2173 4.51913C14.6667 5.19173 14.6667 6.12803 14.6667 8.00065C14.6667 9.87327 14.6667 10.8096 14.2173 11.4822C14.0227 11.7733 13.7727 12.0233 13.4815 12.2179C12.8089 12.6673 11.8726 12.6673 10 12.6673H6.00001Z" stroke="#47AE4B"/>
<path d="M6 6C4.89543 6 4 6.89543 4 8C4 9.10457 4.89543 10 6 10" stroke="#47AE4B"/>
<path d="M10 6C11.1046 6 12 6.89543 12 8C12 9.10457 11.1046 10 10 10" stroke="#47AE4B"/>
<path d="M6 3.33398V12.334" stroke="#47AE4B" stroke-linecap="round"/>
<path d="M10 3.33398V12.334" stroke="#47AE4B" stroke-linecap="round"/>
</svg>`,
    bgColor: "#E8F5E9",
    textClass: "text-positive",
  },
  "Cash Box": {
    icon: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4 5.33398H6.66667" stroke="#B45309" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M13.8889 6H12.1538C10.9643 6 10 6.89543 10 8C10 9.10457 10.9643 10 12.1538 10H13.8889C13.9444 10 13.9722 10 13.9957 9.99857C14.3552 9.97669 14.6416 9.71077 14.6651 9.37694C14.6667 9.35516 14.6667 9.32936 14.6667 9.27778V6.72222C14.6667 6.67064 14.6667 6.64484 14.6651 6.62306C14.6416 6.28923 14.3552 6.02331 13.9957 6.00143C13.9722 6 13.9444 6 13.8889 6Z" stroke="#B45309"/>
<path d="M13.9767 5.99935C13.9249 4.75115 13.7577 3.98585 13.219 3.44706C12.4379 2.66602 11.1808 2.66602 8.66668 2.66602L6.66668 2.66602C4.15252 2.66602 2.89544 2.66602 2.11439 3.44706C1.33334 4.22811 1.33334 5.48519 1.33334 7.99935C1.33334 10.5135 1.33334 11.7706 2.11439 12.5516C2.89544 13.3327 4.15252 13.3327 6.66668 13.3327H8.66668C11.1808 13.3327 12.4379 13.3327 13.219 12.5516C13.7577 12.0129 13.9249 11.2476 13.9767 9.99935" stroke="#B45309"/>
<path d="M11.9942 8H12.0002" stroke="#B45309" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,
    bgColor: "#FEF3C7",
    textClass: "text-blue-9",
  },
  Purchase: {
    icon: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.00001 0.833984C7.59686 0.833984 7.22564 0.934175 6.8192 1.10227C6.42673 1.26457 5.97089 1.50379 5.40328 1.80167L4.02493 2.52499C3.32829 2.89057 2.77078 3.18313 2.34033 3.47059C1.89437 3.76841 1.55089 4.08199 1.30076 4.50677C1.05146 4.93012 0.939316 5.38854 0.885536 5.93447C0.833334 6.46437 0.833338 7.11608 0.833344 7.93569V8.0656C0.833338 8.88521 0.833334 9.53693 0.885536 10.0668C0.939316 10.6128 1.05146 11.0712 1.30076 11.4945C1.55089 11.9193 1.89437 12.2329 2.34033 12.5307C2.77078 12.8182 3.32828 13.1107 4.02492 13.4763L5.40322 14.1996C5.97086 14.4975 6.42671 14.7367 6.81919 14.899C7.22564 15.0671 7.59686 15.1673 8.00001 15.1673C8.40316 15.1673 8.77438 15.0671 9.18083 14.899C9.57329 14.7367 10.0291 14.4975 10.5967 14.1996L11.9751 13.4763C12.6717 13.1107 13.2292 12.8182 13.6597 12.5307C14.1057 12.2329 14.4491 11.9193 14.6993 11.4945C14.9486 11.0712 15.0607 10.6128 15.1145 10.0668C15.1667 9.53693 15.1667 8.88522 15.1667 8.06562V7.93568C15.1667 7.11608 15.1667 6.46437 15.1145 5.93447C15.0607 5.38854 14.9486 4.93012 14.6993 4.50677C14.4491 4.08199 14.1057 3.76841 13.6597 3.47059C13.2292 3.18312 12.6717 2.89056 11.9751 2.52499L10.5968 1.80168C10.0291 1.5038 9.57329 1.26458 9.18083 1.10227C8.77438 0.934175 8.40316 0.833984 8.00001 0.833984ZM5.84721 2.69803C6.44035 2.38677 6.85601 2.16918 7.20136 2.02636C7.5375 1.88735 7.77365 1.83398 8.00001 1.83398C8.22637 1.83398 8.46252 1.88735 8.79866 2.02636C9.14401 2.16918 9.55967 2.38677 10.1528 2.69804L11.4861 3.39774C12.2126 3.77897 12.723 4.04753 13.1043 4.3022C13.2925 4.42784 13.4403 4.5445 13.5597 4.66181L11.3392 5.77204L5.67264 2.78964L5.84721 2.69803ZM4.62979 3.33691L4.51388 3.39774C3.78741 3.77897 3.27703 4.04753 2.89569 4.3022C2.70755 4.42784 2.55972 4.54451 2.44037 4.66181L8.00001 7.44163L10.2381 6.32258L4.76713 3.44311C4.71398 3.41513 4.66795 3.37894 4.62979 3.33691ZM1.95846 5.5389C1.9248 5.68148 1.89935 5.8434 1.88072 6.0325C1.8339 6.50771 1.83334 7.11026 1.83334 7.96166V8.03964C1.83334 8.89104 1.8339 9.49359 1.88072 9.9688C1.9265 10.4336 2.01349 10.7341 2.16246 10.9871C2.31059 11.2387 2.52486 11.4515 2.89569 11.6991C3.27703 11.9538 3.78741 12.2223 4.51388 12.6036L5.84721 13.3033C6.44035 13.6145 6.85601 13.8321 7.20136 13.9749C7.31041 14.02 7.40893 14.0561 7.50001 14.0843V8.30967L1.95846 5.5389ZM8.50001 14.0843C8.59109 14.0561 8.68961 14.02 8.79866 13.9749C9.14401 13.8321 9.55967 13.6145 10.1528 13.3033L11.4861 12.6036C12.2126 12.2223 12.723 11.9538 13.1043 11.6991C13.4752 11.4515 13.6894 11.2387 13.8376 10.9871C13.9865 10.7341 14.0735 10.4336 14.1193 9.9688C14.1661 9.49359 14.1667 8.89104 14.1667 8.03964V7.96166C14.1667 7.11026 14.1661 6.50771 14.1193 6.0325C14.1007 5.8434 14.0752 5.68148 14.0416 5.53889L11.8333 6.643V8.66732C11.8333 8.94346 11.6095 9.16732 11.3333 9.16732C11.0572 9.16732 10.8333 8.94346 10.8333 8.66732V7.143L8.50001 8.30967V14.0843Z" fill="#1565C0"/>
</svg>
`,
    bgColor: "#E3F2FD",
    textClass: "text-purple-6",
  },
  "Bank Accounts": {
    icon: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.33334 7.99935C1.33334 5.48519 1.33334 4.22811 2.11439 3.44706C2.89544 2.66602 4.15252 2.66602 6.66668 2.66602H9.33334C11.8475 2.66602 13.1046 2.66602 13.8856 3.44706C14.6667 4.22811 14.6667 5.48519 14.6667 7.99935C14.6667 10.5135 14.6667 11.7706 13.8856 12.5516C13.1046 13.3327 11.8475 13.3327 9.33334 13.3327H6.66668C4.15252 13.3327 2.89544 13.3327 2.11439 12.5516C1.33334 11.7706 1.33334 10.5135 1.33334 7.99935Z" stroke="#5521B5"/>
<path d="M6.66667 11H4" stroke="#5521B5" stroke-linecap="round"/>
<path d="M5.33333 9H4" stroke="#5521B5" stroke-linecap="round"/>
<path d="M1.33334 6.66602L14.6667 6.66602" stroke="#5521B5" stroke-linecap="round"/>
<path d="M9.33334 9.99935C9.33334 9.37081 9.33334 9.05654 9.52861 8.86128C9.72387 8.66602 10.0381 8.66602 10.6667 8.66602C11.2952 8.66602 11.6095 8.66602 11.8047 8.86128C12 9.05654 12 9.37081 12 9.99935C12 10.6279 12 10.9422 11.8047 11.1374C11.6095 11.3327 11.2952 11.3327 10.6667 11.3327C10.0381 11.3327 9.72387 11.3327 9.52861 11.1374C9.33334 10.9422 9.33334 10.6279 9.33334 9.99935Z" stroke="#5521B5"/>
</svg>
`,
    bgColor: "#EDEBFE",
    textClass: "text-grey-8",
  },
  Deductions: {
    icon: "trending_down",
    bgColor: "#F3F4F6",
    textClass: "text-grey-7",
  },
};

const getAccountStyle = (type) => {
  return (
    accountStyles[type] || {
      icon: "article",
      bgColor: "#F3F4F6",
      textClass: "text-grey-8",
    }
  );
};
const addNewProfile = () => {
  console.log("Add New Profile");
  router.push({ name: "addProfile" });
};
const viewProfile = (row) => {
  console.log("View Profile", row);
};
const editProfile = (row) => {
  console.log("Edit Profile", row);
};
</script>
