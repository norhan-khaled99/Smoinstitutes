<template>
  <div class="container_table">
    <!-- Page Header -->
    <div class="page-header" v-if="pageTitle">
      <p class="page-title">{{ pageTitle }}</p>
      <q-btn class="add-btn-header" flat @click="addNew" v-if="showAdd">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
        >
          <g clip-path="url(#clip0_2896_2347)">
            <circle cx="9" cy="9" r="7.5" stroke="white" stroke-width="1.5" />
            <path
              d="M11.25 9.00002L9 9.00002M9 9.00002L6.75 9.00002M9 9.00002L9 6.75M9 9.00002L9 11.25"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
            />
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
          <q-table
            :columns="tableColumns"
            :rows="tableRows"
            :loading="loading"
            v-model:pagination="pagination"
            @request="onRequest"
          >
            <!--Start pagination  -->
            <template v-slot:pagination v-if="displayPagination">
              <div
                class="row justify-between full-width items-center pagination-wrapper"
              >
                <div class="pagination-text">
                  <p class="q-mb-0">
                    Page {{ pagination.page }} of {{ pagesNumber }}
                  </p>
                </div>

                <div class="pagination-controls">
                  <q-pagination
                    v-model="pagination.page"
                    :max="pagesNumber"
                    :max-pages="5"
                    direction-links
                    @update:model-value="getPagination(pagination)"
                    class="custom-pagination"
                  >
                    <template v-slot:prev>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M15 19L9 12L15 5"
                          stroke="#666D80"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </template>
                    <template v-slot:next>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9 19L15 12L9 5"
                          stroke="#666D80"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </template>
                  </q-pagination>
                </div>

                <div class="pagination-show">
                  <span class="show-label">Show</span>
                  <q-select
                    v-model="pagination.rowsPerPage"
                    :options="options"
                    dense
                    outlined
                    @update:model-value="update"
                    class="rows-per-page-select"
                  />
                </div>
              </div>
            </template>
            <!--end -->
            <template v-slot:top-left>
              <div
                class="filter-container row items-center wrap full-width justify-between"
                style="gap: 10px"
              >
                <div class="search_table" v-if="searchInput">
                  <q-input
                    outlined
                    @keyup.enter="onSearch"
                    v-model="searchResult"
                    dense
                    :placeholder="searchPlaceholder"
                    class="search-input"
                  >
                    <template v-slot:prepend>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M9.58335 17.5001C13.9556 17.5001 17.5 13.9557 17.5 9.58341C17.5 5.21116 13.9556 1.66675 9.58335 1.66675C5.2111 1.66675 1.66669 5.21116 1.66669 9.58341C1.66669 13.9557 5.2111 17.5001 9.58335 17.5001Z"
                          stroke="#818181"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M18.3334 18.3334L16.6667 16.6667"
                          stroke="#818181"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </template>
                  </q-input>
                </div>
                <div
                  class="filter-bar row items-center wrap"
                  style="gap: 10px"
                  v-if="showFilters"
                >
                  <div
                    class="filter-dropdowns row items-center wrap"
                    style="gap: 10px"
                  >
                    <!-- Department Filter -->
                    <!-- Years Filter -->
                    <div class="filter-item-wrapper" v-if="showYearFilter">
                      <q-select
                        outlined
                        v-model="yearFilter"
                        dense
                        :options="yearOptions"
                        option-label="name"
                        option-value="id"
                        fill-input
                        emit-value
                        map-options
                        use-input
                        input-debounce="0"
                        class="filter-select"
                        :placeholder="yearFilter ? '' : 'All Years'"
                        @update:model-value="onFilterChange('year', yearFilter)"
                      >
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
                          <q-icon
                            v-if="yearFilter"
                            name="cancel"
                            class="cursor-pointer"
                            @click.stop.prevent="
                              yearFilter = null;
                              onFilterChange('year', null);
                            "
                          />
                        </template>
                      </q-select>
                    </div>

                    <!-- Status Filter -->
                    <div class="filter-item-wrapper" v-if="showStatusFilter">
                      <q-select
                        outlined
                        v-model="statusFilter"
                        dense
                        :options="statusOptions"
                        option-label="name"
                        option-value="id"
                        fill-input
                        emit-value
                        map-options
                        use-input
                        input-debounce="0"
                        class="filter-select"
                        :placeholder="statusFilter ? '' : 'All Status'"
                        @update:model-value="
                          onFilterChange('status', statusFilter)
                        "
                      >
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
                          <q-icon
                            v-if="statusFilter"
                            name="cancel"
                            class="cursor-pointer"
                            @click.stop.prevent="
                              statusFilter = null;
                              onFilterChange('status', null);
                            "
                          />
                        </template>
                      </q-select>
                    </div>

                    <!-- Balance Filter -->
                    <div class="filter-item-wrapper" v-if="showBalanceFilter">
                      <q-select
                        outlined
                        v-model="balanceFilter"
                        dense
                        :options="balanceOptions"
                        option-label="name"
                        option-value="id"
                        fill-input
                        emit-value
                        map-options
                        use-input
                        input-debounce="0"
                        class="filter-select"
                        :placeholder="balanceFilter ? '' : 'Any Balance'"
                        @update:model-value="
                          onFilterChange('balance', balanceFilter)
                        "
                      >
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
                          <q-icon
                            v-if="balanceFilter"
                            name="cancel"
                            class="cursor-pointer"
                            @click.stop.prevent="
                              balanceFilter = null;
                              onFilterChange('balance', null);
                            "
                          />
                        </template>
                      </q-select>
                    </div>

                    <!-- Note Type Filter -->
                    <div class="filter-item-wrapper" v-if="showNoteTypeFilter">
                      <q-select
                        outlined
                        v-model="noteTypeFilter"
                        dense
                        :options="noteTypeOptions"
                        option-label="name"
                        option-value="id"
                        fill-input
                        emit-value
                        map-options
                        use-input
                        input-debounce="0"
                        class="filter-select"
                        :placeholder="noteTypeFilter ? '' : 'Note type'"
                        @update:model-value="
                          onFilterChange('noteType', noteTypeFilter)
                        "
                      >
                        <template v-slot:no-option>
                          <q-item>
                            <q-item-section class="text-black">
                              No results
                            </q-item-section>
                          </q-item>
                        </template>
                        <template v-slot:selected-item="scope">
                          <span v-if="noteTypeFilter">{{
                            scope.opt.name
                          }}</span>
                        </template>
                        <template v-slot:append>
                          <q-icon
                            v-if="noteTypeFilter"
                            name="cancel"
                            class="cursor-pointer"
                            @click.stop.prevent="
                              noteTypeFilter = null;
                              onFilterChange('noteType', null);
                            "
                          />
                        </template>
                      </q-select>
                    </div>

                    <!-- Created At Filter -->
                    <div class="filter-item-wrapper" v-if="showCreatedAtFilter">
                      <q-select
                        outlined
                        v-model="createdAtFilter"
                        dense
                        :options="createdAtOptions"
                        option-label="name"
                        option-value="id"
                        fill-input
                        emit-value
                        map-options
                        use-input
                        input-debounce="0"
                        class="filter-select"
                        :placeholder="createdAtFilter ? '' : 'Created at'"
                        @update:model-value="
                          onFilterChange('createdAt', createdAtFilter)
                        "
                      >
                        <template v-slot:no-option>
                          <q-item>
                            <q-item-section class="text-black">
                              No results
                            </q-item-section>
                          </q-item>
                        </template>
                        <template v-slot:selected-item="scope">
                          <span v-if="createdAtFilter">{{
                            scope.opt.name
                          }}</span>
                        </template>
                        <template v-slot:append>
                          <q-icon
                            v-if="createdAtFilter"
                            name="cancel"
                            class="cursor-pointer"
                            @click.stop.prevent="
                              createdAtFilter = null;
                              onFilterChange('createdAt', null);
                            "
                          />
                        </template>
                      </q-select>
                    </div>

                    <!-- Created By Filter -->
                    <div class="filter-item-wrapper" v-if="showCreatedByFilter">
                      <q-select
                        outlined
                        v-model="createdByFilter"
                        dense
                        :options="createdByOptions"
                        option-label="name"
                        option-value="id"
                        fill-input
                        emit-value
                        map-options
                        use-input
                        input-debounce="0"
                        class="filter-select"
                        :placeholder="createdByFilter ? '' : 'Created by'"
                        @update:model-value="
                          onFilterChange('createdBy', createdByFilter)
                        "
                      >
                        <template v-slot:no-option>
                          <q-item>
                            <q-item-section class="text-black">
                              No results
                            </q-item-section>
                          </q-item>
                        </template>
                        <template v-slot:selected-item="scope">
                          <span v-if="createdByFilter">{{
                            scope.opt.name
                          }}</span>
                        </template>
                        <template v-slot:append>
                          <q-icon
                            v-if="createdByFilter"
                            name="cancel"
                            class="cursor-pointer"
                            @click.stop.prevent="
                              createdByFilter = null;
                              onFilterChange('createdBy', null);
                            "
                          />
                        </template>
                      </q-select>
                    </div>

                    <!-- Direction Filter -->
                    <div class="filter-item-wrapper" v-if="showDirectionFilter">
                      <q-select
                        outlined
                        v-model="directionFilter"
                        dense
                        :options="directionOptions"
                        option-label="name"
                        option-value="id"
                        fill-input
                        emit-value
                        map-options
                        use-input
                        input-debounce="0"
                        class="filter-select"
                        :placeholder="directionFilter ? '' : 'Direction'"
                        @update:model-value="
                          onFilterChange('direction', directionFilter)
                        "
                      >
                        <template v-slot:no-option>
                          <q-item>
                            <q-item-section class="text-black"
                              >No results</q-item-section
                            >
                          </q-item>
                        </template>
                        <template v-slot:selected-item="scope">
                          <span v-if="directionFilter">{{
                            scope.opt.name
                          }}</span>
                        </template>
                        <template v-slot:append>
                          <q-icon
                            v-if="directionFilter"
                            name="cancel"
                            class="cursor-pointer"
                            @click.stop.prevent="
                              directionFilter = null;
                              onFilterChange('direction', null);
                            "
                          />
                        </template>
                      </q-select>
                    </div>

                    <!-- Level Filter -->
                    <div class="filter-item-wrapper" v-if="showLevelFilter">
                      <q-select
                        outlined
                        v-model="levelFilter"
                        dense
                        :options="levelOptions"
                        option-label="name"
                        option-value="id"
                        fill-input
                        emit-value
                        map-options
                        use-input
                        input-debounce="0"
                        class="filter-select"
                        :placeholder="levelFilter ? '' : 'Level'"
                        @update:model-value="
                          onFilterChange('level', levelFilter)
                        "
                      >
                        <template v-slot:no-option>
                          <q-item>
                            <q-item-section class="text-black"
                              >No results</q-item-section
                            >
                          </q-item>
                        </template>
                        <template v-slot:selected-item="scope">
                          <span v-if="levelFilter">{{ scope.opt.name }}</span>
                        </template>
                        <template v-slot:append>
                          <q-icon
                            v-if="levelFilter"
                            name="cancel"
                            class="cursor-pointer"
                            @click.stop.prevent="
                              levelFilter = null;
                              onFilterChange('level', null);
                            "
                          />
                        </template>
                      </q-select>
                    </div>

                    <!-- By User Filter -->
                    <div class="filter-item-wrapper" v-if="showByUserFilter">
                      <q-select
                        outlined
                        v-model="byUserFilter"
                        dense
                        :options="byUserOptions"
                        option-label="name"
                        option-value="id"
                        fill-input
                        emit-value
                        map-options
                        use-input
                        input-debounce="0"
                        class="filter-select"
                        :placeholder="byUserFilter ? '' : 'By user'"
                        @update:model-value="
                          onFilterChange('byUser', byUserFilter)
                        "
                      >
                        <template v-slot:no-option>
                          <q-item>
                            <q-item-section class="text-black"
                              >No results</q-item-section
                            >
                          </q-item>
                        </template>
                        <template v-slot:selected-item="scope">
                          <span v-if="byUserFilter">{{ scope.opt.name }}</span>
                        </template>
                        <template v-slot:append>
                          <q-icon
                            v-if="byUserFilter"
                            name="cancel"
                            class="cursor-pointer"
                            @click.stop.prevent="
                              byUserFilter = null;
                              onFilterChange('byUser', null);
                            "
                          />
                        </template>
                      </q-select>
                    </div>

                    <!-- Teacher Filter -->
                    <div class="filter-item-wrapper" v-if="showTeacherFilter">
                      <q-select
                        outlined
                        v-model="teacherFilter"
                        dense
                        :options="teacherOptions"
                        option-label="name"
                        option-value="id"
                        fill-input
                        emit-value
                        map-options
                        use-input
                        input-debounce="0"
                        class="filter-select"
                        :placeholder="teacherFilter ? '' : 'Teacher'"
                        @update:model-value="
                          onFilterChange('teacher', teacherFilter)
                        "
                      >
                        <template v-slot:no-option>
                          <q-item>
                            <q-item-section class="text-black"
                              >No results</q-item-section
                            >
                          </q-item>
                        </template>
                        <template v-slot:selected-item="scope">
                          <span v-if="teacherFilter">{{ scope.opt.name }}</span>
                        </template>
                        <template v-slot:append>
                          <q-icon
                            v-if="teacherFilter"
                            name="cancel"
                            class="cursor-pointer"
                            @click.stop.prevent="
                              teacherFilter = null;
                              onFilterChange('teacher', null);
                            "
                          />
                        </template>
                      </q-select>
                    </div>

                    <!-- Degree Filter -->
                    <div class="filter-item-wrapper" v-if="showDegreeFilter">
                      <q-select
                        outlined
                        v-model="degreeFilter"
                        dense
                        :options="degreeOptions"
                        option-label="name"
                        option-value="id"
                        fill-input
                        emit-value
                        map-options
                        use-input
                        input-debounce="0"
                        class="filter-select"
                        :placeholder="degreeFilter ? '' : 'Degree'"
                        @update:model-value="
                          onFilterChange('degree', degreeFilter)
                        "
                      >
                        <template v-slot:no-option>
                          <q-item>
                            <q-item-section class="text-black"
                              >No results</q-item-section
                            >
                          </q-item>
                        </template>
                        <template v-slot:selected-item="scope">
                          <span v-if="degreeFilter">{{ scope.opt.name }}</span>
                        </template>
                        <template v-slot:append>
                          <q-icon
                            v-if="degreeFilter"
                            name="cancel"
                            class="cursor-pointer"
                            @click.stop.prevent="
                              degreeFilter = null;
                              onFilterChange('degree', null);
                            "
                          />
                        </template>
                      </q-select>
                    </div>

                    <!-- Institution Filter -->
                    <div
                      class="filter-item-wrapper"
                      v-if="showInstitutionFilter"
                    >
                      <q-select
                        outlined
                        v-model="institutionFilter"
                        dense
                        :options="institutionOptions"
                        option-label="name"
                        option-value="id"
                        fill-input
                        emit-value
                        map-options
                        use-input
                        input-debounce="0"
                        class="filter-select"
                        :placeholder="
                          institutionFilter ? '' : 'All Institution'
                        "
                        @update:model-value="
                          onFilterChange('institution', institutionFilter)
                        "
                      >
                        <template v-slot:no-option>
                          <q-item>
                            <q-item-section class="text-black"
                              >No results</q-item-section
                            >
                          </q-item>
                        </template>
                        <template v-slot:selected-item="scope">
                          <span v-if="institutionFilter">{{
                            scope.opt.name
                          }}</span>
                        </template>
                        <template v-slot:append>
                          <q-icon
                            v-if="institutionFilter"
                            name="cancel"
                            class="cursor-pointer"
                            @click.stop.prevent="
                              institutionFilter = null;
                              onFilterChange('institution', null);
                            "
                          />
                        </template>
                      </q-select>
                    </div>

                    <!-- Job Type Filter -->
                    <div class="filter-item-wrapper" v-if="showJobTypeFilter">
                      <q-select
                        outlined
                        v-model="jobTypeFilter"
                        dense
                        :options="jobTypeOptions"
                        option-label="name"
                        option-value="id"
                        fill-input
                        emit-value
                        map-options
                        use-input
                        input-debounce="0"
                        class="filter-select"
                        :placeholder="jobTypeFilter ? '' : 'Job Type'"
                        @update:model-value="
                          onFilterChange('jobType', jobTypeFilter)
                        "
                      >
                        <template v-slot:no-option>
                          <q-item>
                            <q-item-section class="text-black"
                              >No results</q-item-section
                            >
                          </q-item>
                        </template>
                        <template v-slot:selected-item="scope">
                          <span v-if="jobTypeFilter">{{ scope.opt.name }}</span>
                        </template>
                        <template v-slot:append>
                          <q-icon
                            v-if="jobTypeFilter"
                            name="cancel"
                            class="cursor-pointer"
                            @click.stop.prevent="
                              jobTypeFilter = null;
                              onFilterChange('jobType', null);
                            "
                          />
                        </template>
                      </q-select>
                    </div>
                    <!-- Course Filter -->
                    <div class="filter-item-wrapper" v-if="showCourseFilter">
                      <q-select
                        outlined
                        v-model="courseFilter"
                        dense
                        :options="courseOptions"
                        option-label="name"
                        option-value="id"
                        fill-input
                        emit-value
                        map-options
                        use-input
                        input-debounce="0"
                        class="filter-select"
                        :placeholder="courseFilter ? '' : 'All Courses'"
                        @update:model-value="
                          onFilterChange('course', courseFilter)
                        "
                      >
                        <template v-slot:no-option>
                          <q-item>
                            <q-item-section class="text-black"
                              >No results</q-item-section
                            >
                          </q-item>
                        </template>
                        <template v-slot:selected-item="scope">
                          <span v-if="courseFilter">{{ scope.opt.name }}</span>
                        </template>
                        <template v-slot:append>
                          <q-icon
                            v-if="courseFilter"
                            name="cancel"
                            class="cursor-pointer"
                            @click.stop.prevent="
                              courseFilter = null;
                              onFilterChange('course', null);
                            "
                          />
                        </template>
                      </q-select>
                    </div>

                    <!-- Type Filter -->
                    <div class="filter-item-wrapper" v-if="showTypeFilter">
                      <q-select
                        outlined
                        v-model="typeFilter"
                        dense
                        :options="typeOptions"
                        option-label="name"
                        option-value="id"
                        fill-input
                        emit-value
                        map-options
                        use-input
                        input-debounce="0"
                        class="filter-select"
                        :placeholder="typeFilter ? '' : 'All Types'"
                        @update:model-value="onFilterChange('type', typeFilter)"
                      >
                        <template v-slot:no-option>
                          <q-item>
                            <q-item-section class="text-black"
                              >No results</q-item-section
                            >
                          </q-item>
                        </template>
                        <template v-slot:selected-item="scope">
                          <span v-if="typeFilter">{{ scope.opt.name }}</span>
                        </template>
                        <template v-slot:append>
                          <q-icon
                            v-if="typeFilter"
                            name="cancel"
                            class="cursor-pointer"
                            @click.stop.prevent="
                              typeFilter = null;
                              onFilterChange('type', null);
                            "
                          />
                        </template>
                      </q-select>
                    </div>
                  </div>

                  <q-btn flat class="clear-filters-btn" @click="clearFilters">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M2.44233 9.33359C2.50206 5.19973 5.89685 1.875 10.0657 1.875C12.8228 1.875 15.2392 3.32856 16.5779 5.50601C16.7586 5.80006 16.6668 6.18499 16.3727 6.36576C16.0787 6.54654 15.6938 6.45471 15.513 6.16066C14.3939 4.34037 12.3737 3.125 10.0657 3.125C6.57877 3.125 3.75312 5.89808 3.69252 9.33181L4.02617 9.00077C4.2712 8.75765 4.66693 8.75921 4.91005 9.00424C5.15316 9.24928 5.15161 9.645 4.90657 9.88812L3.50673 11.277C3.26306 11.5188 2.87 11.5188 2.62633 11.277L1.22648 9.88812C0.98145 9.645 0.979896 9.24928 1.22301 9.00424C1.46613 8.75921 1.86185 8.75765 2.10689 9.00077L2.44233 9.33359ZM16.4887 8.72215C16.7322 8.4815 17.1239 8.4815 17.3674 8.72215L18.7726 10.111C19.0181 10.3537 19.0204 10.7494 18.7778 10.9949C18.5351 11.2404 18.1394 11.2427 17.8939 11.0001L17.5523 10.6624C17.4945 14.8003 14.0848 18.125 9.90209 18.125C7.13651 18.125 4.71153 16.6725 3.36768 14.4949C3.18641 14.2012 3.27758 13.8161 3.57132 13.6348C3.86507 13.4535 4.25015 13.5447 4.43143 13.8384C5.55469 15.6586 7.58334 16.875 9.90209 16.875C13.4073 16.875 16.2435 14.0976 16.3021 10.6641L15.9622 11.0001C15.7167 11.2427 15.321 11.2404 15.0784 10.9949C14.8357 10.7494 14.838 10.3537 15.0835 10.111L16.4887 8.72215Z"
                        fill="#4C8696"
                      />
                    </svg>
                    Clear filters
                  </q-btn>

                  <q-btn-dropdown
                    class="add-btn-header"
                    v-if="showAddButtonDropdown"
                    no-caps
                    content-class="action-menu"
                    :label="addBtnLabel"
                  >
                    <q-list>
                      <q-item
                        v-for="option in addDropdownOptions"
                        :key="option.name"
                        clickable
                        v-close-popup
                        @click="handleDropdownAction(option)"
                        class="action-menu-item"
                      >
                        <q-item-section>{{ option.name }}</q-item-section>
                      </q-item>
                    </q-list>
                  </q-btn-dropdown>

                  <q-btn
                    flat
                    class="add-btn-header"
                    @click="addNew"
                    v-if="showAddButton"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                    >
                      <g clip-path="url(#clip0_2896_2347)">
                        <circle
                          cx="9"
                          cy="9"
                          r="7.5"
                          stroke="white"
                          stroke-width="1.5"
                        />
                        <path
                          d="M11.25 9.00002L9 9.00002M9 9.00002L6.75 9.00002M9 9.00002L9 6.75M9 9.00002L9 11.25"
                          stroke="white"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        />
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
              </div>
            </template>

            <template v-slot:body-cell-image="props">
              <q-td :props="props">
                <div class="row items-center">
                  <q-img
                    class="image"
                    :src="props.row.serviceImage"
                    :ratio="1"
                  />
                  <span class="">{{ props.row.name }}</span>
                </div>
              </q-td>
            </template>

            <template v-slot:body-cell-teacher="props">
              <q-td :props="props">
                <div class="bold-text">
                  {{ props.row.teacher }}
                </div>
              </q-td>
            </template>

            <template v-slot:body-cell-balance="props">
              <q-td :props="props">
                <div
                  :class="{
                    'positive-balance': props.row.balance
                      .toString()
                      .includes('+'),
                  }"
                >
                  {{ props.row.balance }}
                </div>
              </q-td>
            </template>

            <template v-slot:body-cell-balanceDisplay="props">
              <q-td :props="props">
                <div
                  :class="{
                    'positive-balance': props.row.balanceDisplay
                      .toString()
                      .includes('+'),
                    'negative-balance': props.row.balanceDisplay
                      .toString()
                      .includes('-'),
                  }"
                >
                  {{ props.row.balanceDisplay }}
                </div>
              </q-td>
            </template>

            <template v-slot:body-cell-noteType="props">
              <q-td :props="props">
                <q-badge
                  class="state"
                  :class="{
                    'important-status': props.row.noteType === 'Important',
                    'warning-status': props.row.noteType === 'Warning',
                    'info-status': props.row.noteType === 'Info',
                  }"
                >
                  {{ props.row.noteType }}
                </q-badge>
              </q-td>
            </template>

            <template v-slot:body-cell-direction="props">
              <q-td :props="props">
                <q-badge
                  class="state"
                  :class="{
                    'stock-in': props.row.direction === 'Stock In',
                    'stock-out': props.row.direction === 'Stock Out',
                  }"
                >
                  {{ props.row.direction }}
                </q-badge>
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
                <p class="q-mb-none" v-if="props.row.status === 'Finished'">
                  <q-badge class="state finished-status">{{
                    props.row.status
                  }}</q-badge>
                </p>
                <p class="q-mb-none" v-if="props.row.status === 'Pending'">
                  <q-badge class="state pending-status">{{
                    props.row.status
                  }}</q-badge>
                </p>
              </q-td>
            </template>

            <template v-slot:body-cell-actions="props" v-if="actions">
              <q-td :props="props" class="actions">
                <q-btn
                  flat
                  dense
                  round
                  class="action-menu-btn"
                  v-if="ShowActionsdropDown"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M12 7C10.8954 7 10 6.10457 10 5C10 3.89543 10.8954 3 12 3C13.1046 3 14 3.89543 14 5C14 6.10457 13.1046 7 12 7Z"
                      fill="#4B5563"
                    />
                    <path
                      d="M12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14Z"
                      fill="#4B5563"
                    />
                    <path
                      d="M12 21C10.8954 21 10 20.1046 10 19C10 17.8954 10.8954 17 12 17C13.1046 17 14 17.8954 14 19C14 20.1046 13.1046 21 12 21Z"
                      fill="#4B5563"
                    />
                  </svg>
                  <q-menu class="action-menu">
                    <q-list v-if="student || bookStock || Notes">
                      <q-item
                        clickable
                        class="action-menu-item"
                        @click="details(props.row)"
                      >
                        <q-item-section>View</q-item-section>
                      </q-item>
                      <q-item
                        v-if="student"
                        clickable
                        class="action-menu-item"
                        @click="EditEvent(props.row)"
                      >
                        <q-item-section>Edit</q-item-section>
                      </q-item>
                      <q-item
                        v-if="studentCourse"
                        clickable
                        class="action-menu-item"
                        @click="openDialogDelete(props.row)"
                      >
                        <q-item-section>Delete</q-item-section>
                      </q-item>

                      <q-item
                        v-if="studentCourse"
                        clickable
                        class="action-menu-item"
                        @click="AddDiscount(props.row)"
                      >
                        <q-item-section>Add discount</q-item-section>
                      </q-item>

                      <q-item
                        v-if="studentCourse"
                        clickable
                        class="action-menu-item"
                        @click="CertificateEvent(props.row)"
                      >
                        <q-item-section>Certificate</q-item-section>
                      </q-item>

                      <q-item clickable class="action-menu-item" v-if="student">
                        <q-item-section>Reports</q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-btn>
              </q-td>
            </template>
            <!-- Empty State -->
            <template v-slot:no-data>
              <div class="full-width row flex-center q-pa-md">
                <empty-state
                  :title="emptyStateTitle"
                  :description="emptyStateDescription"
                  :buttonLabel="emptyStateButtonLabel"
                  :showButton="showEmptyStateButton"
                  @action-click="addNew"
                />
              </div>
            </template>
          </q-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, onMounted, computed } from "vue";
import emptyState from "./emptyState.vue";

export default {
  name: "tableComp",
  components: {
    emptyState,
  },
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
    showAddButton: {
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
    actions: {
      type: Boolean,
      default: false,
    },
    tableRows: {
      type: Array,
      default: () => {},
    },
    tableColumns: {
      type: Array,
      default: () => {},
    },
    tablePagination: {
      type: Object,
      default: () => {},
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
    showFilters: {
      type: Boolean,
      default: false,
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
    showNoteTypeFilter: {
      type: Boolean,
      default: false,
    },
    noteTypeOptions: {
      type: Array,
      default: () => [],
    },
    showCreatedAtFilter: {
      type: Boolean,
      default: false,
    },
    createdAtOptions: {
      type: Array,
      default: () => [],
    },
    showCreatedByFilter: {
      type: Boolean,
      default: false,
    },
    createdByOptions: {
      type: Array,
      default: () => [],
    },
    showDirectionFilter: {
      type: Boolean,
      default: false,
    },
    directionOptions: {
      type: Array,
      default: () => [],
    },
    showLevelFilter: {
      type: Boolean,
      default: false,
    },
    levelOptions: {
      type: Array,
      default: () => [],
    },
    showByUserFilter: {
      type: Boolean,
      default: false,
    },
    byUserOptions: {
      type: Array,
      default: () => [],
    },
    showTeacherFilter: {
      type: Boolean,
      default: false,
    },
    teacherOptions: {
      type: Array,
      default: () => [],
    },
    showDegreeFilter: {
      type: Boolean,
      default: false,
    },
    degreeOptions: {
      type: Array,
      default: () => [],
    },
    showInstitutionFilter: {
      type: Boolean,
      default: false,
    },
    institutionOptions: {
      type: Array,
      default: () => [],
    },
    showJobTypeFilter: {
      type: Boolean,
      default: false,
    },
    jobTypeOptions: {
      type: Array,
      default: () => [],
    },
    searchPlaceholder: {
      type: String,
      default: "Search...",
    },
    showCourseFilter: {
      type: Boolean,
      default: false,
    },
    courseOptions: {
      type: Array,
      default: () => [],
    },
    showTypeFilter: {
      type: Boolean,
      default: false,
    },
    typeOptions: {
      type: Array,
      default: () => [],
    },
    showAddButtonDropdown: {
      type: Boolean,
      default: false,
    },
    addDropdownOptions: {
      type: Array,
      default: () => [],
    },
    student: {
      type: Boolean,
      default: false,
    },
    studentCourse: {
      type: Boolean,
      default: false,
    },
    bookStock: {
      type: Boolean,
      default: false,
    },
    Notes: {
      type: Boolean,
      default: false,
    },
    emptyStateTitle: {
      type: String,
      default: "No students found",
    },
    emptyStateDescription: {
      type: String,
      default: "Adjust your filters or add new students to get started.",
    },
    emptyStateButtonLabel: {
      type: String,
      default: "Add Student",
    },
    showEmptyStateButton: {
      type: Boolean,
      default: true,
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
    const noteTypeFilter = ref(null);
    const createdAtFilter = ref(null);
    const createdByFilter = ref(null);
    const directionFilter = ref(null);
    const levelFilter = ref(null);
    const byUserFilter = ref(null);
    const teacherFilter = ref(null);
    const degreeFilter = ref(null);
    const institutionFilter = ref(null);
    const jobTypeFilter = ref(null);
    const courseFilter = ref(null);
    const typeFilter = ref(null);

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
      noteTypeFilter.value = null;
      createdAtFilter.value = null;
      createdByFilter.value = null;
      directionFilter.value = null;
      levelFilter.value = null;
      byUserFilter.value = null;
      teacherFilter.value = null;
      degreeFilter.value = null;
      institutionFilter.value = null;
      jobTypeFilter.value = null;
      courseFilter.value = null;
      typeFilter.value = null;
      emit("clearFilters");
    };

    const onSearch = () => {
      emit("searchEvent", searchResult.value);
    };

    const addNew = () => {
      emit("addNew");
    };
    const AddDiscount = (row) => {
      emit("addDiscount", row);
    };

    const DeleteEvent = (row) => {
      emit("openDialogDeleteEvent", row);
    };

    const CertificateEvent = (row) => {
      emit("certificateEvent", row);
    };

    const handleDropdownAction = (option) => {
      emit("addDropdownAction", option);
    };

    const EditEvent = (id) => {
      emit("EditEvent", id);
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
      noteTypeFilter,
      createdAtFilter,
      createdByFilter,
      directionFilter,
      levelFilter,
      byUserFilter,
      teacherFilter,
      degreeFilter,
      institutionFilter,
      jobTypeFilter,
      courseFilter,
      typeFilter,
      handleDropdownAction,
      AddDiscount,
      DeleteEvent,
      CertificateEvent,
      onFilterSearch,
      onFilterChange,
      clearFilters,
      AddDiscount,
    };
  },
};
</script>
