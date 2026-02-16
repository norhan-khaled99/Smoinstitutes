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

                <div class="pagination-show"></div>
              </div>
            </template>
            <!--end -->
            <template v-slot:top-left>
              <div
                class="filter-container row justify-between items-center full-width"
              >
                <div class="row filter-bar items-center">
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
                    v-if="showFilters"
                  >
                    <div class="filter-dropdowns row items-center wrap">
                      <slot name="custom-filters-before"></slot>
                      <!-- Transactions Filters -->
                      <div class="filter-item-wrapper" v-if="transactions">
                        <q-input
                          outlined
                          v-model="fromNo"
                          dense
                          placeholder="From No."
                          class="filter-input"
                          @update:model-value="
                            onFilterTransaction('fromNo', fromNo)
                          "
                        />
                      </div>
                      <div class="filter-item-wrapper" v-if="transactions">
                        <q-input
                          outlined
                          v-model="toNo"
                          dense
                          placeholder="To No."
                          class="filter-input"
                          @update:model-value="
                            onFilterTransaction('toNo', toNo)
                          "
                        />
                      </div>
                      <!-- Department Filter -->

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
                          hide-selected
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

                      <div
                        class="filter-item-wrapper"
                        v-if="showStatusFilterInCourse"
                      >
                        <q-select
                          outlined
                          v-model="statusFilter"
                          dense
                          :options="statusOptions"
                          option-label="name"
                          option-value="value"
                          fill-input
                          emit-value
                          map-options
                          use-input
                          hide-selected
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

                      <div
                        class="filter-item-wrapper"
                        v-if="showStatusFilterInCourseFinance"
                      >
                        <q-select
                          outlined
                          v-model="statusFilter"
                          dense
                          :options="statusOptions"
                          option-label="name"
                          option-value="value"
                          fill-input
                          emit-value
                          map-options
                          use-input
                          hide-selected
                          input-debounce="0"
                          class="filter-select"
                          :placeholder="statusFilter ? '' : 'All Status'"
                          @update:model-value="
                            onFilterTransaction('status', statusFilter)
                          "
                        >
                          <template v-slot:no-option>
                            <q-item>
                              <q-item-section class="text-black">
                                No results
                              </q-item-section>
                            </q-item>
                          </template>

                          <template v-slot:append>
                            <q-icon
                              v-if="statusFilter"
                              name="cancel"
                              class="cursor-pointer"
                              @click.stop.prevent="
                                statusFilter = null;
                                onFilterTransaction('status', null);
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
                          hide-selected
                          input-debounce="0"
                          class="filter-select"
                          :placeholder="balanceFilter ? '' : 'Any Balance'"
                          @update:model-value="
                            onFilterChange('balance', balanceFilter)
                          "
                        >
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
                      <div
                        class="filter-item-wrapper"
                        v-if="showNoteTypeFilter"
                      >
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
                      <div
                        class="filter-item-wrapper"
                        v-if="showCreatedAtFilter"
                      >
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
                      <div
                        class="filter-item-wrapper"
                        v-if="showCreatedByFilter"
                      >
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
                      <div
                        class="filter-item-wrapper"
                        v-if="showDirectionFilter"
                      >
                        <q-select
                          outlined
                          v-model="directionFilter"
                          dense
                          :options="directionOptions"
                          option-label="name"
                          option-value="id"
                          fill-input
                          emit-value
                          use-input
                          map-options
                          hide-selected
                          class="filter-select"
                          :placeholder="directionFilter ? '' : 'Direction'"
                          @update:model-value="
                            onFilterChange('direction', directionFilter)
                          "
                        >
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
                          option-label="levelname"
                          option-value="id"
                          fill-input
                          emit-value
                          map-options
                          use-input
                          hide-selected
                          input-debounce="0"
                          class="filter-select"
                          :placeholder="levelFilter ? '' : 'Level'"
                          @update:model-value="
                            onFilterChange('level_id', levelFilter)
                          "
                        >
                          <template v-slot:append>
                            <q-icon
                              v-if="levelFilter"
                              name="cancel"
                              class="cursor-pointer"
                              @click.stop.prevent="
                                levelFilter = null;
                                onFilterChange('level_id', null);
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
                          option-label="username"
                          option-value="id"
                          fill-input
                          emit-value
                          map-options
                          use-input
                          hide-selected
                          input-debounce="0"
                          class="filter-select"
                          :placeholder="byUserFilter ? '' : 'By user'"
                          @update:model-value="
                            onFilterChange('by_user', byUserFilter)
                          "
                        >
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
                          option-label="full_name"
                          option-value="staff_id"
                          fill-input
                          emit-value
                          map-options
                          use-input
                          hide-selected
                          input-debounce="0"
                          class="filter-select"
                          :placeholder="teacherFilter ? '' : 'Teacher'"
                          @update:model-value="
                            onFilterChange('teacher', teacherFilter)
                          "
                        >
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
                          hide-selected
                          use-input
                          input-debounce="0"
                          class="filter-select"
                          :placeholder="degreeFilter ? '' : 'Degree'"
                          @update:model-value="
                            onFilterChange('degree', degreeFilter)
                          "
                        >
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
                          hide-selected
                          input-debounce="0"
                          class="filter-select"
                          :placeholder="
                            institutionFilter ? '' : 'All Institution'
                          "
                          @update:model-value="
                            onFilterChange('institution', institutionFilter)
                          "
                        >
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
                          option-label="jobstypename"
                          option-value="jobstypeid"
                          fill-input
                          emit-value
                          map-options
                          hide-selected
                          use-input
                          input-debounce="0"
                          class="filter-select"
                          :placeholder="jobTypeFilter ? '' : 'Job Type'"
                          @update:model-value="
                            onFilterChange('staffjobtype', jobTypeFilter)
                          "
                        >
                          <template v-slot:append>
                            <q-icon
                              v-if="jobTypeFilter"
                              name="cancel"
                              class="cursor-pointer"
                              @click.stop.prevent="
                                jobTypeFilter = null;
                                onFilterChange('staffjobtype', null);
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
                          hide-selected
                          input-debounce="0"
                          class="filter-select"
                          :placeholder="courseFilter ? '' : 'All Courses'"
                          @update:model-value="
                            onFilterChange('course', courseFilter)
                          "
                        >
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
                          option-value="name"
                          fill-input
                          emit-value
                          map-options
                          use-input
                          hide-selected
                          input-debounce="0"
                          class="filter-select"
                          :placeholder="typeFilter ? '' : 'All Types'"
                          @update:model-value="
                            onFilterChange('account_type', typeFilter)
                          "
                        >
                          <template v-slot:append>
                            <q-icon
                              v-if="typeFilter"
                              name="cancel"
                              class="cursor-pointer"
                              @click.stop.prevent="
                                typeFilter = null;
                                onFilterChange('account_type', null);
                              "
                            />
                          </template>
                        </q-select>
                      </div>

                      <div
                        class="filter-item-wrapper"
                        v-if="showTypeFilterInTransation"
                      >
                        <q-select
                          outlined
                          v-model="typeFilter"
                          dense
                          :options="typeOptions"
                          option-label="label"
                          option-value="id"
                          fill-input
                          emit-value
                          map-options
                          use-input
                          hide-selected
                          input-debounce="0"
                          class="filter-select"
                          :placeholder="typeFilter ? '' : 'All Types'"
                          @update:model-value="onFilterTransaction"
                        >
                          <template v-slot:append>
                            <q-icon
                              v-if="typeFilter"
                              name="cancel"
                              class="cursor-pointer"
                              @click.stop.prevent="
                                typeFilter = null;
                                onFilterTransaction();
                              "
                            />
                          </template>
                        </q-select>
                      </div>

                      <!-- Shift Filter -->
                      <div class="filter-item-wrapper" v-if="showShiftFilter">
                        <q-select
                          outlined
                          v-model="shiftFilter"
                          :options="shiftOptions"
                          fill-input
                          dense
                          emit-value
                          map-options
                          use-input
                          hide-selected
                          input-debounce="0"
                          class="filter-select"
                          :placeholder="shiftFilter ? '' : 'Shift'"
                          @update:model-value="
                            onFilterChange('shift', shiftFilter)
                          "
                        >
                          <template v-slot:append>
                            <q-icon
                              v-if="shiftFilter"
                              name="cancel"
                              class="cursor-pointer"
                              @click.stop.prevent="
                                shiftFilter = null;
                                onFilterChange('shift', null);
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
                    <div
                      class="view-report cursor-pointer"
                      v-if="transactions"
                      @click="$emit('viewReport')"
                    >
                      View Report
                    </div>
                    <slot name="header-actions"></slot>

                    <q-btn-dropdown
                      class="add-btn-header q-ml-auto"
                      v-if="showAddButtonDropdown"
                      no-caps
                      flat
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
                  </div>
                </div>
                <div>
                  <q-btn
                    flat
                    class="add-btn-header justify-end"
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

            <template v-slot:body-cell-accountType="props">
              <q-td :props="props">
                <slot name="body-cell-accountType" :row="props.row">
                  {{ props.row.mainacctype_name }}
                </slot>
              </q-td>
            </template>

            <template v-slot:body-cell-image="props">
              <q-td :props="props">
                <div class="row items-center no-wrap">
                  <q-img
                    class="image"
                    :src="props.row.picture_thumb"
                    ratio="1"
                  />
                  <div class="student-name-text">
                    {{ props.row.full_name }}
                  </div>
                </div>
              </q-td>
            </template>

            <template v-slot:body-cell-imageProfile="props">
              <q-td :props="props">
                <div class="row items-center no-wrap">
                  <q-img class="image" :src="props.row.picture" ratio="1" />
                  <div class="student-name-text">
                    {{ props.row.full_name }}
                  </div>
                </div>
              </q-td>
            </template>

            <template v-slot:body-cell-teacher="props">
              <q-td :props="props">
                <div class="bold-text">
                  {{ props.row.teacher_name }}
                </div>
              </q-td>
            </template>

            <template v-slot:body-cell-balance="props">
              <q-td :props="props">
                <div
                  :class="{
                    'positive-balance': Number(props.row.balance) > 0,
                    'negative-balance': Number(props.row.balance) < 0,
                    'zero-balance': Number(props.row.balance) == 0,
                  }"
                >
                  {{
                    Number(props.row.balance) > 0
                      ? "+" + props.row.balance
                      : props.row.balance
                  }}
                </div>
              </q-td>
            </template>
            <template v-slot:body-cell-course_balance="props">
              <q-td :props="props">
                <div
                  :class="{
                    'positive-balance': Number(props.row.course_balance) > 0,
                    'negative-balance': Number(props.row.course_balance) < 0,
                    'zero-balance': Number(props.row.course_balance) == 0,
                  }"
                >
                  {{
                    Number(props.row.course_balance) > 0
                      ? "+" + props.row.course_balance
                      : props.row.course_balance
                  }}
                </div>
              </q-td>
            </template>

            <template v-slot:body-cell-balanceDisplay="props">
              <q-td :props="props">
                <div class="row items-center no-wrap">
                  <span>
                    {{
                      (isBalanceVisible(props.row)
                        ? props.row.balance
                        : "******") + " EGP"
                    }}
                  </span>
                  <q-btn
                    flat
                    round
                    dense
                    class=""
                    @click.stop="toggleBalance(props.row)"
                  >
                    <!-- Show Icon (Eye) - Shows when Hidden -->
                    <svg
                      v-if="!isBalanceVisible(props.row)"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M7.99998 5.50033C6.61927 5.50033 5.49998 6.61961 5.49998 8.00033C5.49998 9.38104 6.61927 10.5003 7.99998 10.5003C9.38069 10.5003 10.5 9.38104 10.5 8.00033C10.5 6.61961 9.38069 5.50033 7.99998 5.50033ZM6.49998 8.00033C6.49998 7.1719 7.17155 6.50033 7.99998 6.50033C8.82841 6.50033 9.49998 7.1719 9.49998 8.00033C9.49998 8.82875 8.82841 9.50033 7.99998 9.50033C7.17155 9.50033 6.49998 8.82875 6.49998 8.00033Z"
                        fill="#6B7280"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M7.99998 2.16699C4.99056 2.16699 2.96351 3.96979 1.78702 5.49823L1.76581 5.52579C1.49974 5.87135 1.25469 6.18961 1.08844 6.56592C0.910409 6.96891 0.833313 7.40812 0.833313 8.00033C0.833313 8.59253 0.910409 9.03175 1.08844 9.43473C1.25469 9.81105 1.49974 10.1293 1.76581 10.4749L1.78702 10.5024C2.96351 12.0309 4.99056 13.8337 7.99998 13.8337C11.0094 13.8337 13.0365 12.0309 14.2129 10.5024L14.2341 10.4749C14.5002 10.1293 14.7453 9.81105 14.9115 9.43473C15.0895 9.03175 15.1666 8.59253 15.1666 8.00033C15.1666 7.40812 15.0895 6.96891 14.9115 6.56592C14.7453 6.1896 14.5002 5.87134 14.2341 5.52578L14.2129 5.49823C13.0365 3.96979 11.0094 2.16699 7.99998 2.16699ZM2.57946 6.10819C3.66574 4.69694 5.43355 3.16699 7.99998 3.16699C10.5664 3.16699 12.3342 4.69694 13.4205 6.10819C13.7129 6.48805 13.8842 6.71503 13.9968 6.97002C14.1021 7.20834 14.1666 7.49962 14.1666 8.00033C14.1666 8.50104 14.1021 8.79232 13.9968 9.03063C13.8842 9.28562 13.7129 9.5126 13.4205 9.89246C12.3342 11.3037 10.5664 12.8337 7.99998 12.8337C5.43355 12.8337 3.66574 11.3037 2.57946 9.89246C2.28707 9.5126 2.1158 9.28562 2.00315 9.03063C1.89787 8.79231 1.83331 8.50104 1.83331 8.00033C1.83331 7.49962 1.89787 7.20834 2.00315 6.97002C2.1158 6.71503 2.28707 6.48805 2.57946 6.10819Z"
                        fill="#6B7280"
                      />
                    </svg>

                    <!-- Hide Icon (Eye Slash) - Shows when Visible -->
                    <svg
                      v-else
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M14.8636 4.20657C15.1174 4.31535 15.235 4.60929 15.1262 4.8631L14.6667 4.66614C15.1262 4.8631 15.1263 4.86299 15.1262 4.8631L15.1257 4.86422L15.125 4.86588L15.1229 4.87079L15.1158 4.88684C15.1098 4.90026 15.1013 4.91907 15.0902 4.94286C15.068 4.99043 15.0355 5.05797 14.9926 5.14225C14.9067 5.31068 14.7784 5.5466 14.6057 5.82379C14.3219 6.27915 13.915 6.85125 13.3747 7.4196L14.0202 8.06515C14.2155 8.26041 14.2155 8.57699 14.0202 8.77226C13.8249 8.96752 13.5084 8.96752 13.3131 8.77226L12.646 8.1052C12.2063 8.47366 11.7019 8.8195 11.1301 9.10363L11.7524 10.0601C11.903 10.2916 11.8375 10.6013 11.606 10.7519C11.3746 10.9025 11.0648 10.837 10.9142 10.6055L10.1881 9.48957C9.66856 9.65925 9.10603 9.77455 8.49999 9.81589V10.9995C8.49999 11.2756 8.27613 11.4995 7.99999 11.4995C7.72385 11.4995 7.49999 11.2756 7.49999 10.9995V9.81589C6.91264 9.77583 6.3661 9.66628 5.85992 9.50508L5.14388 10.6055C4.99327 10.837 4.68355 10.9026 4.45209 10.7519C4.22063 10.6013 4.15509 10.2916 4.30569 10.0602L4.91397 9.12532C4.33771 8.84391 3.82925 8.49959 3.38566 8.13165L2.745 8.7723C2.54974 8.96756 2.23316 8.96756 2.0379 8.7723C1.84263 8.57704 1.84263 8.26046 2.0379 8.06519L2.65374 7.44935C2.10403 6.87623 1.69021 6.29718 1.40189 5.83592C1.2266 5.5555 1.09644 5.31657 1.0093 5.14594C0.965695 5.06056 0.932776 4.99211 0.910288 4.9439C0.899041 4.91979 0.890394 4.90073 0.884317 4.88713L0.877121 4.87087L0.87496 4.86591L0.874236 4.86423L0.873964 4.8636C0.873913 4.86348 0.873751 4.8631 1.33332 4.66614L0.873964 4.8636C0.765186 4.60978 0.882549 4.31535 1.13636 4.20657C1.38997 4.09788 1.68363 4.21518 1.79263 4.46856C1.79259 4.46847 1.79266 4.46865 1.79263 4.46856L1.79326 4.47002L1.79731 4.47916C1.80124 4.48796 1.80764 4.50208 1.81652 4.52113C1.8343 4.55924 1.86202 4.61698 1.89988 4.69113C1.97568 4.83954 2.09178 5.05299 2.24986 5.30588C2.56693 5.81313 3.04775 6.47087 3.70378 7.08054C4.28105 7.61701 4.98843 8.11118 5.83447 8.43668C6.4708 8.6815 7.19029 8.83281 7.99999 8.83281C8.8278 8.83281 9.56141 8.67465 10.2083 8.42002C11.0492 8.08903 11.7518 7.59164 12.3245 7.05414C12.9708 6.44745 13.4446 5.79625 13.7569 5.29495C13.9127 5.04501 14.0271 4.83432 14.1017 4.68792C14.139 4.61478 14.1663 4.55786 14.1838 4.52031C14.1926 4.50154 14.1989 4.48763 14.2028 4.47897L14.2067 4.46998L14.2071 4.46918C14.2071 4.46925 14.2071 4.46912 14.2071 4.46918M14.8636 4.20657C14.6099 4.09782 14.3159 4.2155 14.2071 4.46918L14.8636 4.20657ZM1.79263 4.46856C1.79259 4.46847 1.79266 4.46865 1.79263 4.46856V4.46856Z"
                        fill="#6B7280"
                      />
                    </svg>
                  </q-btn>
                </div>
              </q-td>
            </template>

            <template v-slot:body-cell-balanceDisplayInCourse="props">
              <q-td :props="props">
                <div class="row items-center no-wrap">
                  <span>
                    {{
                      (isBalanceVisible(props.row)
                        ? props.row.course_balance
                        : "******") + " EGP"
                    }}
                  </span>
                  <q-btn
                    flat
                    round
                    dense
                    class=""
                    @click.stop="toggleBalance(props.row)"
                  >
                    <!-- Show Icon (Eye) - Shows when Hidden -->
                    <svg
                      v-if="!isBalanceVisible(props.row)"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M7.99998 5.50033C6.61927 5.50033 5.49998 6.61961 5.49998 8.00033C5.49998 9.38104 6.61927 10.5003 7.99998 10.5003C9.38069 10.5003 10.5 9.38104 10.5 8.00033C10.5 6.61961 9.38069 5.50033 7.99998 5.50033ZM6.49998 8.00033C6.49998 7.1719 7.17155 6.50033 7.99998 6.50033C8.82841 6.50033 9.49998 7.1719 9.49998 8.00033C9.49998 8.82875 8.82841 9.50033 7.99998 9.50033C7.17155 9.50033 6.49998 8.82875 6.49998 8.00033Z"
                        fill="#6B7280"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M7.99998 2.16699C4.99056 2.16699 2.96351 3.96979 1.78702 5.49823L1.76581 5.52579C1.49974 5.87135 1.25469 6.18961 1.08844 6.56592C0.910409 6.96891 0.833313 7.40812 0.833313 8.00033C0.833313 8.59253 0.910409 9.03175 1.08844 9.43473C1.25469 9.81105 1.49974 10.1293 1.76581 10.4749L1.78702 10.5024C2.96351 12.0309 4.99056 13.8337 7.99998 13.8337C11.0094 13.8337 13.0365 12.0309 14.2129 10.5024L14.2341 10.4749C14.5002 10.1293 14.7453 9.81105 14.9115 9.43473C15.0895 9.03175 15.1666 8.59253 15.1666 8.00033C15.1666 7.40812 15.0895 6.96891 14.9115 6.56592C14.7453 6.1896 14.5002 5.87134 14.2341 5.52578L14.2129 5.49823C13.0365 3.96979 11.0094 2.16699 7.99998 2.16699ZM2.57946 6.10819C3.66574 4.69694 5.43355 3.16699 7.99998 3.16699C10.5664 3.16699 12.3342 4.69694 13.4205 6.10819C13.7129 6.48805 13.8842 6.71503 13.9968 6.97002C14.1021 7.20834 14.1666 7.49962 14.1666 8.00033C14.1666 8.50104 14.1021 8.79232 13.9968 9.03063C13.8842 9.28562 13.7129 9.5126 13.4205 9.89246C12.3342 11.3037 10.5664 12.8337 7.99998 12.8337C5.43355 12.8337 3.66574 11.3037 2.57946 9.89246C2.28707 9.5126 2.1158 9.28562 2.00315 9.03063C1.89787 8.79231 1.83331 8.50104 1.83331 8.00033C1.83331 7.49962 1.89787 7.20834 2.00315 6.97002C2.1158 6.71503 2.28707 6.48805 2.57946 6.10819Z"
                        fill="#6B7280"
                      />
                    </svg>

                    <!-- Hide Icon (Eye Slash) - Shows when Visible -->
                    <svg
                      v-else
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M14.8636 4.20657C15.1174 4.31535 15.235 4.60929 15.1262 4.8631L14.6667 4.66614C15.1262 4.8631 15.1263 4.86299 15.1262 4.8631L15.1257 4.86422L15.125 4.86588L15.1229 4.87079L15.1158 4.88684C15.1098 4.90026 15.1013 4.91907 15.0902 4.94286C15.068 4.99043 15.0355 5.05797 14.9926 5.14225C14.9067 5.31068 14.7784 5.5466 14.6057 5.82379C14.3219 6.27915 13.915 6.85125 13.3747 7.4196L14.0202 8.06515C14.2155 8.26041 14.2155 8.57699 14.0202 8.77226C13.8249 8.96752 13.5084 8.96752 13.3131 8.77226L12.646 8.1052C12.2063 8.47366 11.7019 8.8195 11.1301 9.10363L11.7524 10.0601C11.903 10.2916 11.8375 10.6013 11.606 10.7519C11.3746 10.9025 11.0648 10.837 10.9142 10.6055L10.1881 9.48957C9.66856 9.65925 9.10603 9.77455 8.49999 9.81589V10.9995C8.49999 11.2756 8.27613 11.4995 7.99999 11.4995C7.72385 11.4995 7.49999 11.2756 7.49999 10.9995V9.81589C6.91264 9.77583 6.3661 9.66628 5.85992 9.50508L5.14388 10.6055C4.99327 10.837 4.68355 10.9026 4.45209 10.7519C4.22063 10.6013 4.15509 10.2916 4.30569 10.0602L4.91397 9.12532C4.33771 8.84391 3.82925 8.49959 3.38566 8.13165L2.745 8.7723C2.54974 8.96756 2.23316 8.96756 2.0379 8.7723C1.84263 8.57704 1.84263 8.26046 2.0379 8.06519L2.65374 7.44935C2.10403 6.87623 1.69021 6.29718 1.40189 5.83592C1.2266 5.5555 1.09644 5.31657 1.0093 5.14594C0.965695 5.06056 0.932776 4.99211 0.910288 4.9439C0.899041 4.91979 0.890394 4.90073 0.884317 4.88713L0.877121 4.87087L0.87496 4.86591L0.874236 4.86423L0.873964 4.8636C0.873913 4.86348 0.873751 4.8631 1.33332 4.66614L0.873964 4.8636C0.765186 4.60978 0.882549 4.31535 1.13636 4.20657C1.38997 4.09788 1.68363 4.21518 1.79263 4.46856C1.79259 4.46847 1.79266 4.46865 1.79263 4.46856L1.79326 4.47002L1.79731 4.47916C1.80124 4.48796 1.80764 4.50208 1.81652 4.52113C1.8343 4.55924 1.86202 4.61698 1.89988 4.69113C1.97568 4.83954 2.09178 5.05299 2.24986 5.30588C2.56693 5.81313 3.04775 6.47087 3.70378 7.08054C4.28105 7.61701 4.98843 8.11118 5.83447 8.43668C6.4708 8.6815 7.19029 8.83281 7.99999 8.83281C8.8278 8.83281 9.56141 8.67465 10.2083 8.42002C11.0492 8.08903 11.7518 7.59164 12.3245 7.05414C12.9708 6.44745 13.4446 5.79625 13.7569 5.29495C13.9127 5.04501 14.0271 4.83432 14.1017 4.68792C14.139 4.61478 14.1663 4.55786 14.1838 4.52031C14.1926 4.50154 14.1989 4.48763 14.2028 4.47897L14.2067 4.46998L14.2071 4.46918C14.2071 4.46925 14.2071 4.46912 14.2071 4.46918M14.8636 4.20657C14.6099 4.09782 14.3159 4.2155 14.2071 4.46918L14.8636 4.20657ZM1.79263 4.46856C1.79259 4.46847 1.79266 4.46865 1.79263 4.46856V4.46856Z"
                        fill="#6B7280"
                      />
                    </svg>
                  </q-btn>
                </div>
              </q-td>
            </template>

            <template v-slot:body-cell-score="props">
              <q-td :props="props">
                <slot name="body-cell-score" :row="props.row">
                  <q-input
                    v-model="props.row.score"
                    :ref="(el) => (scoreInputs[props.rowIndex] = el)"
                    @keydown.tab.prevent="focusNext(props.rowIndex)"
                    dense
                    outlined
                    @blur="handleChangeScore(props.row)"
                    class="score-input"
                    type="number"
                  />
                </slot>
              </q-td>
            </template>

            <template v-slot:body-cell-noteType="props">
              <q-td :props="props">
                <q-badge
                  class="state"
                  :class="{
                    'important-status': props.row.note_type === 'important',
                    'warning-status': props.row.note_type === 'warn',
                    'info-status': props.row.note_type === 'info',
                  }"
                >
                  {{ props.row.note_type }}
                </q-badge>
              </q-td>
            </template>

            <template v-slot:body-cell-note="props">
              <q-td :props="props" class="note-cell">
                {{ props.row.note }}
              </q-td>
            </template>

            <template v-slot:body-cell-direction="props">
              <q-td :props="props">
                <q-badge
                  class="state"
                  :class="{
                    'stock-in': props.row.direction_label === 'Stock In',
                    'stock-out': props.row.direction_label === 'Stock Out',
                  }"
                >
                  {{ props.row.direction_label }}
                </q-badge>
              </q-td>
            </template>

            <template v-slot:body-cell-type="props">
              <q-td :props="props">
                <div
                  :class="props.row.typeClass"
                  class="type-cell row items-center no-wrap"
                >
                  <svg
                    width="6"
                    height="6"
                    viewBox="0 0 6 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    class="q-mr-xs"
                  >
                    <circle cx="3" cy="3" r="3" fill="currentColor" />
                  </svg>
                  {{ props.row.type }}
                </div>
              </q-td>
            </template>
            <template v-slot:body-cell-stu_transaction_type="props">
              <q-td :props="props">
                <div
                  :class="props.row.jtype.name"
                  class="type-cell row items-center no-wrap"
                >
                  <svg
                    width="6"
                    height="6"
                    viewBox="0 0 6 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    class="q-mr-xs"
                  >
                    <circle cx="3" cy="3" r="3" fill="currentColor" />
                  </svg>
                  {{ props.row.jtype.name }}
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

            <template v-slot:body-cell-transfer="props">
              <q-td :props="props">
                <div class="transfer-cell">
                  <div class="transfer-from">
                    {{ props.row.from_account.name }}
                  </div>
                  <div class="transfer-to">{{ props.row.to_account.name }}</div>
                </div>
              </q-td>
            </template>

            <template v-slot:body-cell-transType="props">
              <q-td :props="props">
                <span
                  :class="{
                    'transaction-reversal': props.row.is_reversed === true,
                    'text-grey-8': !props.row.is_reversed,
                  }"
                  class="trans-type-text"
                >
                  {{ props.row.jtype.name }}
                </span>
              </q-td>
            </template>

            <template v-slot:body-cell-courseFinaceStatus="props">
              <q-td :props="props">
                <q-badge
                  class="state"
                  :class="{
                    'important-status': props.row.status === 'Finished',
                    'active-status': props.row.status === 'Active',
                    'pending-status': props.row.status === 'Pending',
                  }"
                >
                  {{ props.row.status }}
                </q-badge>
              </q-td>
            </template>

            <template v-slot:body-cell-reports="props">
              <q-td :props="props">
                <div
                  class="view-link cursor-pointer"
                  @click="viewCourseReport(props.row)"
                >
                  View
                </div>
              </q-td>
            </template>

            <template v-slot:body-cell-duration="props">
              <q-td :props="props">
                <div class="duration-cell">
                  <div class="date-text">{{ props.row.startdate }}</div>
                  <div class="enddate-text">{{ props.row.enddate }}</div>
                </div>
              </q-td>
            </template>

            <template v-slot:body-cell-shift="props">
              <q-td :props="props">
                <div class="shift-cell">
                  <div class="date-text">{{ props.row.name }}</div>
                  <div class="enddate-text">{{ props.row.shiftName }}</div>
                </div>
              </q-td>
            </template>

            <template v-slot:body-cell-paidRemaining="props">
              <q-td :props="props">
                <div class="paid-remaining-cell">
                  <div class="paid-amount">
                    {{ formatNumber(props.row.total_payed) }}
                  </div>
                  <div class="remaining-amount">
                    {{ formatNumber(props.row.remaining) }}
                  </div>
                </div>
              </q-td>
            </template>

            <template v-slot:body-cell-actions="props">
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
                    <q-list>
                      <slot name="action-menu-items" :row="props.row"></slot>
                      <q-item
                        v-if="student || staff || profiles"
                        clickable
                        class="action-menu-item"
                        @click="EditEvent(props.row)"
                      >
                        <q-item-section>Edit</q-item-section>
                      </q-item>
                      <q-item
                        v-if="
                          student ||
                          bookStock ||
                          Notes ||
                          courses ||
                          profiles ||
                          staff ||
                          transactions
                        "
                        clickable
                        class="action-menu-item"
                        @click="details(props.row)"
                      >
                        <q-item-section>View</q-item-section>
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

                      <!-- <q-item clickable class="action-menu-item" v-if="student">
                        <q-item-section>Reports</q-item-section>
                      </q-item> -->
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
    tableRows: {
      type: Array,
      default: () => [],
    },
    tableColumns: {
      type: Array,
      default: () => [],
    },
    tablePagination: {
      type: Object,
      default: () => ({}),
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
    showStatusFilter: {
      type: Boolean,
      default: false,
    },
    showStatusFilterInCourse: {
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
    showTypeFilterInTransation: {
      type: Boolean,
      default: false,
    },
    typeOptions: {
      type: Array,
      default: () => [],
    },
    showShiftFilter: {
      type: Boolean,
      default: false,
    },
    shiftOptions: {
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
    courses: {
      type: Boolean,
      default: false,
    },
    profiles: {
      type: Boolean,
      default: false,
    },
    studentCourse: {
      type: Boolean,
      default: false,
    },
    staff: {
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
    profiles: {
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
    transactions: {
      type: Boolean,
      default: false,
    },
    showStatusFilterInCourseFinance: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const searchResult = ref("");
    const pagination = ref({});
    const sorting = ref("");
    const searchFilter = ref("");
    const departmentFilter = ref(null);
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
    const shiftFilter = ref(null);
    const fromNo = ref("");
    const toNo = ref("");

    const onFilterSearch = (val) => {
      emit("filterSearch", val);
    };

    const onFilterChange = (type, val) => {
      emit("filterChange", { type, val });
    };

    const onFilterTransaction = () => {
      emit(
        "filterTransaction",
        fromNo.value,
        toNo.value,
        typeFilter.value,
        statusFilter.value,
        shiftFilter.value,
      );
    };

    const clearFilters = () => {
      searchFilter.value = "";
      departmentFilter.value = null;
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
      shiftFilter.value = null;
      fromNo.value = "";
      toNo.value = "";
      emit("clearFilters");
    };

    const scoreInputs = ref([]);
    const focusNext = (index) => {
      const next = scoreInputs.value[index + 1];
      if (next) {
        next.focus();
      }
    };
    const handleChangeScore = (row) => {
      emit("scoreChanged", row);
    };

    const formatNumber = (value) => {
      return new Intl.NumberFormat("en-US").format(value);
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

    const viewCourseReport = (row) => {
      emit("viewCourseReport", row);
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
      emit("getPagFun", [props.apiCall, item.page, pagination.value]);
    };

    const visibleBalances = ref(new Set());

    const toggleBalance = (row) => {
      const key = row.id || row;
      const set = visibleBalances.value;
      set.has(key) ? set.delete(key) : set.add(key);
    };

    const isBalanceVisible = (row) => visibleBalances.value.has(row.id || row);

    const getPagination = (item) => {
      emit("getPagFun", [props.apiCall, item.page, pagination.value]);
    };

    return {
      visibleBalances,
      toggleBalance,
      isBalanceVisible,
      getPagination,
      sorting,
      searchResult,
      onSearch,
      openDialogDelete,
      details,
      viewCourseReport,
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
      shiftFilter,
      fromNo,
      toNo,
      handleDropdownAction,
      AddDiscount,
      DeleteEvent,
      CertificateEvent,
      onFilterSearch,
      onFilterChange,
      clearFilters,
      AddDiscount,
      handleChangeScore,
      scoreInputs,
      focusNext,
      formatNumber,
      onFilterTransaction,
    };
  },
};
</script>
<style scoped>
.note-cell {
  white-space: normal !important;
  word-break: break-word;
  max-width: 300px;
}
</style>
