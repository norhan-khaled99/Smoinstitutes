<template>
  <div class="container_table">
    <!-- Page Header -->
    <div class="page-header" v-if="pageTitle">
      <h1 class="page-title">{{ pageTitle }}</h1>
      <q-btn class="add-btn-header" @click="addNew" v-if="showAdd">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
          <g clip-path="url(#clip0_2896_2347)">
            <circle cx="9" cy="9" r="7.5" stroke="white" stroke-width="1.5" />
            <path d="M11.25 9.00002L9 9.00002M9 9.00002L6.75 9.00002M9 9.00002L9 6.75M9 9.00002L9 11.25" stroke="white"
              stroke-width="1.5" stroke-linecap="round" />
          </g>
          <defs>
            <clipPath id="clip0_2896_2347">
              <rect width="18" height="18" fill="white" />
            </clipPath>
          </defs>
        </svg>
        {{ addBtnLabel }}
      </q-btn>
    </div>

    <!-- Filter Bar -->

    <div class="table_content">
      <div class="row">
        <!--Table -->
        <div class="col-md-12 col-sm-12 col-xs-12">
          <q-table :columns="tableColumns" :rows="tableRows" :loading="loading" v-model:pagination="pagination"
            @request="onRequest">
            <!--Start pagination  -->
            <template v-slot:pagination v-if="displayPagination">
              <div class="row justify-between full-width items-center pagination-wrapper">
                <div class="pagination-text">
                  <p class="q-mb-0">
                    Page {{ pagination.page }} of {{ pagesNumber }}
                  </p>
                </div>

                <div class="pagination-controls">
                  <q-pagination v-model="pagination.page" :max="pagesNumber" :max-pages="7" direction-links
                    icon-first="keyboard_double_arrow_left" icon-last="keyboard_double_arrow_right"
                    icon-prev="keyboard_arrow_left" icon-next="keyboard_arrow_right"
                    @update:model-value="getPagination(pagination)" class="custom-pagination" />
                </div>

                <div class="pagination-show">
                  <span class="show-label">Show</span>
                  <q-select v-model="pagination.rowsPerPage" :options="options" dense outlined
                    @update:model-value="update" class="rows-per-page-select" />
                </div>
              </div>
            </template>
            <!--end -->
            <template v-slot:top-left>
              <div class="filter-container">
                <div class="search_table" v-if="searchInput">
                  <q-input outlined @keyup.enter="onSearch" v-model="searchResult" dense placeholder="Search"
                    class="search-input">
                    <template v-slot:prepend>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path
                          d="M9.58335 17.5001C13.9556 17.5001 17.5 13.9557 17.5 9.58341C17.5 5.21116 13.9556 1.66675 9.58335 1.66675C5.2111 1.66675 1.66669 5.21116 1.66669 9.58341C1.66669 13.9557 5.2111 17.5001 9.58335 17.5001Z"
                          stroke="#818181" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M18.3334 18.3334L16.6667 16.6667" stroke="#818181" stroke-width="1.5"
                          stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    </template>
                  </q-input>
                </div>
                <div class="filter-bar" v-if="showFilters">
                  <div class="filter-dropdowns">
                    <!-- Department Filter -->
                    <!-- Years Filter -->
                    <div class="filter-item-wrapper" v-if="showYearFilter">
                      <q-select outlined v-model="yearFilter" dense :options="yearOptions" option-label="name"
                        option-value="id" fill-input emit-value map-options use-input input-debounce="0"
                        class="filter-select" :placeholder="yearFilter ? '' : 'All Years'"
                        @update:model-value="onFilterChange('year', yearFilter)">
                        <template v-slot:no-option>
                          <q-item>
                            <q-item-section class="text-black">
                              No results
                            </q-item-section>
                          </q-item>
                        </template>
                        <template v-slot:selected-item="scope">
                          <span v-if="yearFilter">{{ scope.opt.name }}</span>
                        </template>
                        <template v-slot:append>
                          <q-icon v-if="yearFilter" name="cancel" class="cursor-pointer" @click.stop.prevent="
                            yearFilter = null;
                          onFilterChange('year', null);
                          " />
                        </template>
                      </q-select>
                    </div>

                    <!-- Status Filter -->
                    <div class="filter-item-wrapper" v-if="showStatusFilter">
                      <q-select outlined v-model="statusFilter" dense :options="statusOptions" option-label="name"
                        option-value="id" fill-input emit-value map-options use-input input-debounce="0"
                        class="filter-select" :placeholder="statusFilter ? '' : 'All Status'" @update:model-value="
                          onFilterChange('status', statusFilter)
                          ">
                        <template v-slot:no-option>
                          <q-item>
                            <q-item-section class="text-black">
                              No results
                            </q-item-section>
                          </q-item>
                        </template>
                        <template v-slot:selected-item="scope">
                          <span v-if="statusFilter">{{ scope.opt.name }}</span>
                        </template>
                        <template v-slot:append>
                          <q-icon v-if="statusFilter" name="cancel" class="cursor-pointer" @click.stop.prevent="
                            statusFilter = null;
                          onFilterChange('status', null);
                          " />
                        </template>
                      </q-select>
                    </div>

                    <!-- Balance Filter -->
                    <div class="filter-item-wrapper" v-if="showBalanceFilter">
                      <q-select outlined v-model="balanceFilter" dense :options="balanceOptions" option-label="name"
                        option-value="id" fill-input emit-value map-options use-input input-debounce="0"
                        class="filter-select" :placeholder="balanceFilter ? '' : 'Any Balance'" @update:model-value="
                          onFilterChange('balance', balanceFilter)
                          ">
                        <template v-slot:no-option>
                          <q-item>
                            <q-item-section class="text-black">
                              No results
                            </q-item-section>
                          </q-item>
                        </template>
                        <template v-slot:selected-item="scope">
                          <span v-if="balanceFilter">{{ scope.opt.name }}</span>
                        </template>
                        <template v-slot:append>
                          <q-icon v-if="balanceFilter" name="cancel" class="cursor-pointer" @click.stop.prevent="
                            balanceFilter = null;
                          onFilterChange('balance', null);
                          " />
                        </template>
                      </q-select>
                    </div>
                  </div>

                  <q-btn flat class="clear-filters-btn" @click="clearFilters">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M2.44233 9.33359C2.50206 5.19973 5.89685 1.875 10.0657 1.875C12.8228 1.875 15.2392 3.32856 16.5779 5.50601C16.7586 5.80006 16.6668 6.18499 16.3727 6.36576C16.0787 6.54654 15.6938 6.45471 15.513 6.16066C14.3939 4.34037 12.3737 3.125 10.0657 3.125C6.57877 3.125 3.75312 5.89808 3.69252 9.33181L4.02617 9.00077C4.2712 8.75765 4.66693 8.75921 4.91005 9.00424C5.15316 9.24928 5.15161 9.645 4.90657 9.88812L3.50673 11.277C3.26306 11.5188 2.87 11.5188 2.62633 11.277L1.22648 9.88812C0.98145 9.645 0.979896 9.24928 1.22301 9.00424C1.46613 8.75921 1.86185 8.75765 2.10689 9.00077L2.44233 9.33359ZM16.4887 8.72215C16.7322 8.4815 17.1239 8.4815 17.3674 8.72215L18.7726 10.111C19.0181 10.3537 19.0204 10.7494 18.7778 10.9949C18.5351 11.2404 18.1394 11.2427 17.8939 11.0001L17.5523 10.6624C17.4945 14.8003 14.0848 18.125 9.90209 18.125C7.13651 18.125 4.71153 16.6725 3.36768 14.4949C3.18641 14.2012 3.27758 13.8161 3.57132 13.6348C3.86507 13.4535 4.25015 13.5447 4.43143 13.8384C5.55469 15.6586 7.58334 16.875 9.90209 16.875C13.4073 16.875 16.2435 14.0976 16.3021 10.6641L15.9622 11.0001C15.7167 11.2427 15.321 11.2404 15.0784 10.9949C14.8357 10.7494 14.838 10.3537 15.0835 10.111L16.4887 8.72215Z"
                        fill="#4C8696" />
                    </svg>
                    Clear filters
                  </q-btn>
                </div>
              </div>

            </template>

            <template v-slot:body-cell-image="props">
              <q-td :props="props">
                <div class="row items-center">
                  <q-img class="image" :src="props.row.serviceImage" :ratio="1" />
                </div>
              </q-td>
            </template>

            <template v-slot:body-cell-status="props">
              <q-td :props="props">
                <p class="q-mb-none" v-if="props.row.status === 'Waiting'">
                  <q-badge class="state waiting-status">{{
                    props.row.status
                    }}</q-badge>
                </p>
                <p class="q-mb-none" v-if="props.row.status === 'Active'">
                  <q-badge class="state active-status">{{
                    props.row.status
                    }}</q-badge>
                </p>

                <p class="q-mb-none" v-if="props.row.status === 'New'">
                  <q-badge class="state new-status">{{
                    props.row.status
                    }}</q-badge>
                </p>
                <p class="q-mb-none" v-if="props.row.status === 'Idle'">
                  <q-badge class="state idle-status">{{
                    props.row.status
                    }}</q-badge>
                </p>
              </q-td>
            </template>

            <template v-slot:body-cell-actions="props" v-if="actions">
              <q-td :props="props" class="actions">
                <q-btn flat dense round class="action-menu-btn" v-if="ShowActionsdropDown">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 7C10.8954 7 10 6.10457 10 5C10 3.89543 10.8954 3 12 3C13.1046 3 14 3.89543 14 5C14 6.10457 13.1046 7 12 7Z"
                      fill="#4B5563" />
                    <path
                      d="M12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14Z"
                      fill="#4B5563" />
                    <path
                      d="M12 21C10.8954 21 10 20.1046 10 19C10 17.8954 10.8954 17 12 17C13.1046 17 14 17.8954 14 19C14 20.1046 13.1046 21 12 21Z"
                      fill="#4B5563" />
                  </svg>
                  <q-menu class="action-menu">
                    <q-list>
                      <q-item clickable class="action-menu-item" @click="details(props.row)">
                        <q-item-section avatar>
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M5.95194 6.70788C7.15975 5.86338 8.51825 5.25 10 5.25C11.4818 5.25 12.8403 5.86338 14.0481 6.70788C15.2554 7.55229 16.2054 8.63731 16.8466 9.38094L16.8799 9.42731C17.0381 9.63974 17.25 9.98117 17.25 10.5C17.25 11.0188 17.0381 11.3603 16.8799 11.5727L16.8466 11.6191C16.2054 12.3627 15.2554 13.4477 14.0481 14.2921C12.8403 15.1366 11.4818 15.75 10 15.75C8.51825 15.75 7.15975 15.1366 5.95194 14.2921C4.74463 13.4477 3.79462 12.3627 3.15342 11.6191L3.12012 11.5727C2.96188 11.3603 2.75 11.0188 2.75 10.5C2.75 9.98117 2.96188 9.63974 3.12012 9.42731L3.15342 9.38094C3.79462 8.63731 4.74463 7.55229 5.95194 6.70788ZM7.75 10.5C7.75 11.9558 8.79558 13.25 10 13.25C11.2044 13.25 12.25 11.9558 12.25 10.5C12.25 9.04416 11.2044 7.75 10 7.75C8.79558 7.75 7.75 9.04416 7.75 10.5Z" fill="#F49930"/>
                          </svg>
                        </q-item-section>
                        <q-item-section>View</q-item-section>
                      </q-item>
                      <q-item clickable class="action-menu-item" @click="EditEvent(props.row)">
                        <q-item-section avatar>
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M10.5347 3.91016H10.4905C9.23632 3.91011 8.23288 3.91006 7.44575 4.02445C6.63125 4.14659 5.95223 4.40443 5.42343 4.93323C4.89463 5.46202 4.63679 6.14104 4.51466 6.95554C4.40026 7.74268 4.40031 8.74611 4.40036 10.0003V10.0003V10.0003C4.40031 11.2545 4.40026 12.2579 4.51466 13.045C4.63679 13.8595 4.89463 14.5385 5.42343 15.0673C5.95223 15.5961 6.63125 15.8539 7.44575 15.9761C8.23288 16.0905 9.23632 16.0904 10.4905 16.0904H10.5809C11.8351 16.0904 12.8385 16.0905 13.6257 15.9761C14.4402 15.8539 15.1192 15.5961 15.648 15.0673C16.1768 14.5385 16.4346 13.8595 16.5568 13.045C16.6712 12.2579 16.6711 11.2545 16.6711 10.0003V10C16.6711 9.65632 16.4079 9.39317 16.0642 9.39317C15.7206 9.39317 15.4574 9.65632 15.4574 10C15.4574 11.2621 15.4558 12.2315 15.3584 12.9278C15.2637 13.6069 15.0554 14.0548 14.785 14.3252C14.5145 14.5957 14.0666 14.804 13.3875 14.8987C12.6912 14.9961 11.7218 14.9977 10.4597 14.9977C9.19755 14.9977 8.22814 14.9961 7.53185 14.8987C6.85276 14.804 6.40484 14.5957 6.13443 14.3252C5.86401 14.0548 5.65572 13.6069 5.56105 12.9278C5.46366 12.2315 5.46524 11.2621 5.46524 10C5.46524 8.73788 5.46366 7.76847 5.56105 7.07218C5.65572 6.39309 5.86401 5.94516 6.13443 5.67475C6.40484 5.40433 6.85276 5.19604 7.53185 5.10137C8.22814 5.00398 9.19755 5.00556 10.4597 5.00556C10.8033 5.00556 11.0665 4.74241 11.0665 4.39873C11.0665 4.05505 10.8033 3.79191 10.4597 3.79191C10.4572 3.79191 10.4547 3.79191 10.4523 3.79191L10.5347 3.91016Z" fill="#F49930"/>
                            <path d="M13.7198 3.84457C14.4435 3.12086 15.6149 3.12086 16.3386 3.84457C17.0623 4.56828 17.0623 5.73969 16.3386 6.4634L15.6903 7.11172L13.0715 4.49288L13.7198 3.84457Z" fill="#F49930"/>
                            <path d="M12.5064 5.05846L15.1252 7.6773L11.3067 11.4959C10.5144 12.2882 10.0503 12.7523 9.50113 13.0739C9.24721 13.2159 8.98681 13.3349 8.7175 13.4372C8.43231 13.5426 8.13646 13.6361 7.84347 13.7307L7.83621 13.7331C7.64648 13.7962 7.43894 13.7345 7.31668 13.6122C7.19442 13.49 7.13271 13.2824 7.19582 13.0927L7.19838 13.0855C7.29298 12.7925 7.38646 12.4967 7.49181 12.2115C7.59427 11.9348 7.70907 11.6744 7.85099 11.4205C8.17253 10.8713 8.63663 10.4072 9.42894 9.61486L12.5064 5.05846Z" fill="#F49930"/>
                          </svg>
                        </q-item-section>
                        <q-item-section>Edit</q-item-section>
                      </q-item>
                      <q-item clickable class="action-menu-item">
                        <q-item-section avatar>
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M2 3.5C2 3.03587 2.37664 2.65625 2.84375 2.65625H5.46875C5.87109 2.65625 6.22266 2.94922 6.29687 3.3457L6.91406 7.05664C6.96289 7.36914 6.83984 7.68164 6.57812 7.85352L4.59375 9.03125C5.16406 10.6621 6.57812 12.7422 8.73828 14.1816L10.5625 12.5684C10.7539 12.3965 11.0391 12.3672 11.2656 12.4355L14.8965 13.3418C15.3262 13.4551 15.6328 13.8555 15.6328 14.3125V16.5625C15.6328 17.0273 15.2539 17.4062 14.7891 17.4062C8.45703 17.4062 3.59375 12.543 3.59375 6.21094C3.59375 5.74609 3.97266 5.36719 4.4375 5.36719H6.6875C7.14453 5.36719 7.54492 5.07422 7.65820 4.64453L8.56445 1.01367C8.63281 0.701172 8.50977 0.388672 8.24805 0.216797L6.26367 -0.960938C5.69336 -1.32031 5.03125 -0.878906 4.95703 -0.166016L4.30078 3.5C4.23242 3.99219 3.80664 4.42578 3.30469 4.42578H2.84375C2.37664 4.42578 2 4.04688 2 3.57812V3.5Z" fill="#F49930"/>
                          </svg>
                        </q-item-section>
                        <q-item-section>Reports</q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-btn>

                <div @click="EditEvent(props.row)" flat class="icon" v-if="showEditBtn">
                  <svg xmlns="http://www.w3.org/2000/svg" width="33" height="32" viewBox="0 0 33 32" fill="none">
                    <path
                      d="M16.8571 6.25H16.7848C14.7779 6.24998 13.1726 6.24996 11.9129 6.41933C10.61 6.5945 9.53158 6.96676 8.6777 7.82064C7.82381 8.67453 7.45155 9.75291 7.27639 11.0558C7.10701 12.3156 7.10703 13.9208 7.10706 15.9278V16.0722C7.10703 18.0792 7.10701 19.6844 7.27639 20.9442C7.45155 22.2471 7.82381 23.3255 8.6777 24.1794C9.53158 25.0332 10.61 25.4055 11.9129 25.5807C13.1726 25.75 14.7779 25.75 16.7849 25.75H16.9292C18.9362 25.75 20.5415 25.75 21.8013 25.5807C23.1041 25.4055 24.1825 25.0332 25.0364 24.1794C25.8903 23.3255 26.2626 22.2471 26.4377 20.9442C26.6071 19.6844 26.6071 18.0792 26.6071 16.0722V16C26.6071 15.4615 26.1705 15.025 25.6321 15.025C25.0936 15.025 24.6571 15.4615 24.6571 16C24.6571 18.0959 24.655 19.5697 24.5051 20.6844C24.359 21.771 24.0887 22.3693 23.6576 22.8005C23.2264 23.2317 22.6281 23.502 21.5414 23.6481C20.4267 23.7979 18.9529 23.8 16.8571 23.8C14.7612 23.8 13.2874 23.7979 12.1727 23.6481C11.086 23.502 10.4877 23.2317 10.0566 22.8005C9.62537 22.3693 9.35509 21.771 9.209 20.6844C9.05913 19.5697 9.05706 18.0959 9.05706 16C9.05706 13.9042 9.05913 12.4303 9.209 11.3156C9.35509 10.229 9.62537 9.63068 10.0566 9.1995C10.4877 8.76831 11.086 8.49804 12.1727 8.35194C13.2874 8.20207 14.7612 8.2 16.8571 8.2C17.3955 8.2 17.8321 7.76348 17.8321 7.225C17.8321 6.68652 17.3955 6.25 16.8571 6.25Z"
                      fill="#F49930" />
                    <path
                      d="M21.9426 7.0503C23.0097 5.98323 24.7397 5.98323 25.8068 7.0503C26.8738 8.11736 26.8738 9.84742 25.8068 10.9145L24.9351 11.7862L21.071 7.92188L21.9426 7.0503Z"
                      fill="#F49930" />
                    <path
                      d="M20.0103 8.98254L23.8744 12.8468L19.0907 17.6306C18.1223 18.5992 17.5305 19.1912 16.8018 19.5983C16.3954 19.8255 15.7789 20.0239 15.148 20.1994C14.499 20.38 13.7523 20.5578 13.0395 20.7275L13.0308 20.7296C12.7774 20.7899 12.5109 20.7145 12.3267 20.5303C12.1426 20.3462 12.0671 20.0796 12.1275 19.8263L12.1295 19.8175C12.2993 19.1047 12.4771 18.358 12.6577 17.709C12.8332 17.0782 13.0316 16.4617 13.2587 16.0553C13.6659 15.3266 14.2579 14.7348 15.2265 13.7664L20.0103 8.98254Z"
                      fill="#F49930" />
                  </svg>
                </div>

                <div @click="openDialogDelete(props.row)" flat class="icon" v-if="showDeleteBtn">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <rect width="32" height="32" rx="4" fill="#F0F0F0" />
                    <path
                      d="M13.9167 20.375C13.5715 20.375 13.2917 20.0951 13.2917 19.75L13.2917 14.75C13.2917 14.4048 13.5715 14.125 13.9167 14.125C14.2618 14.125 14.5417 14.4048 14.5417 14.75L14.5417 19.75C14.5417 20.0951 14.2618 20.375 13.9167 20.375Z"
                      fill="#1C1C1C" />
                    <path
                      d="M18.7083 14.75C18.7083 14.4048 18.4285 14.125 18.0833 14.125C17.7382 14.125 17.4583 14.4048 17.4583 14.75V19.75C17.4583 20.0951 17.7382 20.375 18.0833 20.375C18.4285 20.375 18.7083 20.0951 18.7083 19.75V14.75Z"
                      fill="#1C1C1C" />
                    <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M16.0552 7.04163H16.0018C15.5807 7.04161 15.2236 7.04161 14.9272 7.06859C14.6126 7.09722 14.3196 7.15924 14.0363 7.30989C13.9245 7.36934 13.8178 7.43797 13.7173 7.51505C13.4627 7.71036 13.2848 7.95124 13.1283 8.22557C12.9808 8.48408 12.8326 8.80908 12.658 9.19223L12.3088 9.95829H8.5C8.15482 9.95829 7.875 10.2381 7.875 10.5833C7.875 10.9285 8.15482 11.2083 8.5 11.2083H9.16161L9.63194 18.9992C9.6948 20.0406 9.74469 20.8669 9.84847 21.5271C9.95489 22.204 10.126 22.7678 10.4693 23.261C10.7833 23.7122 11.1878 24.0931 11.6571 24.3793C12.1701 24.6922 12.7432 24.8291 13.4253 24.8945C14.0905 24.9583 14.9183 24.9583 15.9615 24.9583H16.0263C17.0681 24.9583 17.895 24.9583 18.5593 24.8946C19.2407 24.8293 19.8131 24.6927 20.3258 24.3804C20.7948 24.0947 21.1992 23.7145 21.5133 23.264C21.8567 22.7716 22.0283 22.2087 22.1355 21.5327C22.2401 20.8735 22.2911 20.0483 22.3554 19.0084L22.8376 11.2083H23.5C23.8452 11.2083 24.125 10.9285 24.125 10.5833C24.125 10.2381 23.8452 9.95829 23.5 9.95829H19.7714L19.3618 9.11338C19.1826 8.74382 19.0306 8.43011 18.8809 8.18069C18.722 7.91594 18.5433 7.68392 18.2918 7.4963C18.1924 7.42216 18.0871 7.35621 17.977 7.2991C17.6985 7.15458 17.4117 7.09503 17.1042 7.06752C16.8145 7.04161 16.4658 7.04162 16.0552 7.04163ZM21.5852 11.2083H19.3935C19.3847 11.2085 19.3758 11.2085 19.3669 11.2083H12.7242C12.715 11.2085 12.7058 11.2085 12.6966 11.2083H10.4139L10.8777 18.8916C10.943 19.9725 10.9899 20.739 11.0833 21.3329C11.1751 21.9169 11.3037 22.2717 11.4953 22.547C11.7101 22.8557 11.9869 23.1163 12.308 23.3122C12.5944 23.4868 12.9563 23.5938 13.5447 23.6502C14.1432 23.7076 14.9111 23.7083 15.994 23.7083C17.0754 23.7083 17.8423 23.7076 18.44 23.6503C19.0277 23.594 19.3893 23.4873 19.6754 23.3129C19.9963 23.1174 20.2731 22.8573 20.488 22.5491C20.6796 22.2742 20.8085 21.9199 20.901 21.3368C20.9951 20.7437 21.043 19.9784 21.1098 18.899L21.5852 11.2083ZM18.3822 9.95829H13.6825L13.7842 9.73524C13.973 9.32098 14.098 9.04828 14.214 8.84502C14.3241 8.65207 14.403 8.56445 14.4782 8.50682C14.5238 8.47178 14.5723 8.44059 14.6232 8.41356C14.7068 8.36911 14.8193 8.33358 15.0405 8.31344C15.2735 8.29222 15.5735 8.29163 16.0288 8.29163C16.4729 8.29163 16.7654 8.2922 16.9928 8.31255C17.2087 8.33185 17.319 8.36592 17.4014 8.40866C17.4514 8.43462 17.4992 8.4646 17.5444 8.4983C17.6188 8.55378 17.6976 8.63819 17.8091 8.82399C17.9267 9.01981 18.0547 9.28268 18.2485 9.68236L18.3822 9.95829Z"
                      fill="#1C1C1C" />
                  </svg>
                </div>
                <div @click="details(props.row)" flat class="icon" v-if="showDetails">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M9.52031 10.713C11.226 9.38141 13.4294 8.25 16 8.25C18.5706 8.25 20.774 9.38141 22.4797 10.713C24.1869 12.0458 25.4487 13.6197 26.1546 14.6095L26.2078 14.6837C26.461 15.0358 26.75 15.4378 26.75 16C26.75 16.5622 26.461 16.9642 26.2078 17.3163L26.1546 17.3905C25.4487 18.3803 24.1869 19.9542 22.4797 21.287C20.774 22.6186 18.5706 23.75 16 23.75C13.4294 23.75 11.226 22.6186 9.52031 21.287C7.81313 19.9542 6.55126 18.3803 5.84541 17.3905L5.79219 17.3163C5.53904 16.9642 5.25 16.5622 5.25 16C5.25 15.4378 5.53904 15.0358 5.79219 14.6837L5.84541 14.6095C6.55126 13.6197 7.81313 12.0458 9.52031 10.713ZM12.5 16C12.5 17.933 14.067 19.5 16 19.5C17.933 19.5 19.5 17.933 19.5 16C19.5 14.067 17.933 12.5 16 12.5C14.067 12.5 12.5 14.067 12.5 16Z"
                      fill="#F49930" />
                  </svg>
                </div>

                <div class="Approve-Decline-Buttons">
                  <q-btn v-if="showApprove" flat dense class="approve-btn" @click="approveEvent(props.row)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M13.794 7.92241C14.0273 7.66796 14.0101 7.27261 13.7556 7.03936C13.5012 6.80612 13.1058 6.82331 12.8726 7.07776L8.73033 11.5966L7.10857 9.97481C6.86449 9.73073 6.46876 9.73073 6.22468 9.97481C5.98061 10.2189 5.98061 10.6146 6.22468 10.8587L8.30802 12.942C8.42856 13.0626 8.59311 13.1286 8.76354 13.1249C8.93397 13.1212 9.09549 13.0481 9.21068 12.9224L13.794 7.92241Z"
                        fill="#15803D" />
                      <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M9.99996 18.9584C5.05241 18.9584 1.04163 14.9476 1.04163 10.0001C1.04163 5.05253 5.05241 1.04175 9.99996 1.04175C14.9475 1.04175 18.9583 5.05253 18.9583 10.0001C18.9583 14.9476 14.9475 18.9584 9.99996 18.9584ZM2.29163 10.0001C2.29163 14.2573 5.74276 17.7084 9.99996 17.7084C14.2572 17.7084 17.7083 14.2573 17.7083 10.0001C17.7083 5.74289 14.2572 2.29175 9.99996 2.29175C5.74276 2.29175 2.29163 5.74289 2.29163 10.0001Z"
                        fill="#15803D" />
                    </svg>
                    Approve
                  </q-btn>
                  <q-btn v-if="showDecline" flat dense class="decline-btn" @click="declineEvent(props.row)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M7.94192 7.05816C7.69786 6.81407 7.30213 6.81405 7.05804 7.05812C6.81395 7.30218 6.81393 7.69791 7.05799 7.942L9.11612 10.0003L7.05853 12.0582C6.81446 12.3023 6.81448 12.698 7.05857 12.942C7.30267 13.1861 7.69839 13.1861 7.94246 12.942L9.99996 10.8843L12.0575 12.942C12.3015 13.1861 12.6973 13.1861 12.9413 12.942C13.1854 12.698 13.1855 12.3023 12.9414 12.0582L10.8838 10.0003L12.9419 7.942C13.186 7.69791 13.186 7.30218 12.9419 7.05812C12.6978 6.81405 12.3021 6.81407 12.058 7.05816L9.99996 9.11642L7.94192 7.05816Z"
                        fill="#B91C1C" />
                      <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M9.99996 18.9584C5.05241 18.9584 1.04163 14.9476 1.04163 10.0001C1.04163 5.05253 5.05241 1.04175 9.99996 1.04175C14.9475 1.04175 18.9583 5.05253 18.9583 10.0001C18.9583 14.9476 14.9475 18.9584 9.99996 18.9584ZM2.29163 10.0001C2.29163 14.2573 5.74276 17.7084 9.99996 17.7084C14.2572 17.7084 17.7083 14.2573 17.7083 10.0001C17.7083 5.74289 14.2572 2.29175 9.99996 2.29175C5.74276 2.29175 2.29163 5.74289 2.29163 10.0001Z"
                        fill="#B91C1C" />
                    </svg>
                    Decline
                  </q-btn>
                </div>
              </q-td>
            </template>
          </q-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, onMounted, computed } from "vue";

export default {
  name: "tableComp",

  props: {
    searchInput: {
      type: Boolean,
      default: true,
    },
    pageTitle: {
      type: String,
      default: "",
    },
    showAdd: {
      type: Boolean,
      default: false,
    },
    showDetailsBtn: {
      type: Boolean,
      default: false,
    },
    ShowActionsdropDown: {
      type: Boolean,
      default: false,
    },
    showEditBtn: {
      type: Boolean,
      default: false,
    },
    showDeleteBtn: {
      type: Boolean,
      default: false,
    },
    actions: {
      type: Boolean,
      default: false,
    },
    tableRows: {
      type: Array,
      default: () => { },
    },
    tableColumns: {
      type: Array,
      default: () => { },
    },
    tablePagination: {
      type: Object,
      default: () => { },
    },
    apiCall: {
      type: String,
      default: "",
    },
    addBtnLabel: {
      type: String,
      default: "",
    },

    displayPagination: {
      type: Boolean,
      default: true,
    },
    showDetails: {
      type: Boolean,
      default: false,
    },
    showApprove: {
      type: Boolean,
      default: false,
    },
    showDecline: {
      type: Boolean,
      default: false,
    },
    showFilters: {
      type: Boolean,
      default: false,
    },
    Hardware: {
      type: Boolean,
      default: false,
    },
    softwareinventoryFilter: {
      type: Boolean,
      default: false,
    },
    departmentsOptions: {
      type: Array,
      default: () => [],
    },
    showYearFilter: {
      type: Boolean,
      default: false,
    },
    yearOptions: {
      type: Array,
      default: () => [],
    },
    showStatusFilter: {
      type: Boolean,
      default: false,
    },
    statusOptions: {
      type: Array,
      default: () => [],
    },
    showBalanceFilter: {
      type: Boolean,
      default: false,
    },
    balanceOptions: {
      type: Array,
      default: () => [],
    },
    searchPlaceholder: {
      type: String,
      default: "Search...",
    },
  },
  setup(props, { emit }) {
    const searchResult = ref("");
    const pagination = ref({});
    const sorting = ref("");
    const searchFilter = ref("");
    const departmentFilter = ref(null);
    const yearFilter = ref(null);
    const statusFilter = ref(null);
    const balanceFilter = ref(null);

    const filterDepartments = (val, update) => {
      emit("filterDepartments", { val, update });
    };

    const onFilterSearch = (val) => {
      emit("filterSearch", val);
    };

    const onFilterChange = (type, val) => {
      emit("filterChange", { type, val });
    };

    const clearFilters = () => {
      searchFilter.value = "";
      departmentFilter.value = null;
      yearFilter.value = null;
      statusFilter.value = null;
      balanceFilter.value = null;
      emit("clearFilters");
    };

    const onSearch = () => {
      emit("searchEvent", searchResult.value);
    };

    const addNew = () => {
      emit("addNew");
    };

    const EditEvent = (id) => {
      emit("EditEvent", id);
    };

    const Details = (id) => {
      emit("DetailsEvent", id);
    };

    const openDialogDelete = (id) => {
      emit("openDialogDeleteEvent", id);
    };

    const details = (id) => {
      emit("DetailsEvent", id);
    };

    const onRequest = (propss) => {
      if (propss.pagination.sortBy) {
        sorting.value = propss.pagination.sortBy;
        emit("sortApi", [props.apiCall, sorting.value]);
      } else if (propss.pagination.rowsPerPage) {
        sorting.value = "";
        pagination.value.rowsPerPage = propss.pagination.rowsPerPage;

        emit("callApi", [
          props.apiCall,
          propss.pagination.page,
          pagination.value,
        ]);
      } else if (propss.pagination.rowsPerPage == 0) {
        sorting.value = "";
        pagination.value.rowsPerPage = propss.pagination.rowsNumber;

        emit("callApi", [
          props.apiCall,
          propss.pagination.page,
          pagination.value,
        ]);
      }
    };

    onMounted(() => {
      pagination.value = props.tablePagination;
    });

    const pagesNumber = computed(() => {
      const rowsPerPage = pagination.value?.rowsPerPage || 10;
      const rowsNumber = Number(pagination.value?.rowsNumber) || 0;
      return rowsNumber === 0 ? 1 : Math.ceil(rowsNumber / rowsPerPage);
    });

    const pageInfo = computed(() => {
      const page = Number(pagination.value?.page) || 1;
      const rowsPerPage = Number(pagination.value?.rowsPerPage) || 10;
      const rowsNumber = Number(pagination.value?.rowsNumber) || 0;

      if (rowsNumber === 0) {
        return `0-0 of 0 items`;
      }

      const start = (page - 1) * rowsPerPage + 1;
      const end = Math.min(page * rowsPerPage, rowsNumber);

      return `${start}-${end} of ${rowsNumber} items`;
    });

    const options = ref([3, 5, 10, 15, 20, 25, 30, 50]);
    const model = ref(15);
    const update = (item) => {
      pagination.value.rowsPerPage = item;
      emit("updatePag", item);
    };

    const getPagination = (item) => {
      emit("getPagFun", [props.apiCall, item.page, pagination.value]);
    };

    return {
      Details,
      getPagination,
      sorting,
      searchResult,
      onSearch,
      openDialogDelete,
      details,
      model,
      update,
      options,
      onRequest,
      pagination,
      pageInfo,
      pagesNumber,
      addNew,
      EditEvent,
      searchFilter,
      departmentFilter,
      yearFilter,
      statusFilter,
      balanceFilter,
      onFilterSearch,
      onFilterChange,
      clearFilters,
      filterDepartments,
    };
  },
};
</script>
