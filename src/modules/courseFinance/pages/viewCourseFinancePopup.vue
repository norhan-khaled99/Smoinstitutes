<template>
  <q-dialog v-model="model">
    <q-card class="custom-popup">
      <q-card-section>
        <div class="popup-header">
          <div class="row items-center q-gutter-x-sm">
            <p class="popup-title">
              {{ course.name }} ({{ course.shiftName }})
            </p>
            <span class="popup-badge" :class="statusClass">
              {{ course.status }}
            </span>
          </div>
          <q-btn flat dense v-close-popup class="close-btn">
            <q-icon name="close" size="20px" />
          </q-btn>
        </div>
        <div class="popup-subtitle q-mt-xs">
          Course Serial : {{ course.courseId }}
        </div>

        <div class="popup-divider"></div>

        <div class="row q-col-gutter-y-lg">
          <!-- Row 1 -->
          <div class="col-6">
            <div class="form-group">
              <label class="form-group-label">Total Fees</label>
              <div class="form-group-value">
                {{ formatNumber(course.totalFees) }}
              </div>
            </div>
          </div>
          <div class="col-6">
            <div class="form-group">
              <label class="form-group-label">Discounts</label>
              <div class="form-group-value">
                {{ formatNumber(course.discounts) }}
              </div>
            </div>
          </div>

          <!-- Row 2 -->
          <div class="col-6">
            <div class="form-group">
              <label class="form-group-label">Paid</label>
              <div class="paid-text">
                {{ formatNumber(course.paid) }}
              </div>
            </div>
          </div>
          <div class="col-6">
            <div class="form-group">
              <label class="form-group-label">Remaining</label>
              <div class="remaining-text">
                {{ formatNumber(course.remaining) }}
              </div>
            </div>
          </div>

          <!-- Row 3 -->
          <div class="col-6">
            <div class="form-group">
              <label class="form-group-label">Expenses</label>
              <div class="form-group-value">
                {{ formatNumber(course.expenses) }}
              </div>
            </div>
          </div>
          <div class="col-6">
            <div class="form-group">
              <label class="form-group-label">Students</label>
              <div class="form-group-value">{{ course.students }} Students</div>
            </div>
          </div>

          <!-- Row 4 -->
          <div class="col-6">
            <div class="form-group">
              <label class="form-group-label">Start Date</label>
              <div class="form-group-value">{{ course.startDate }}</div>
            </div>
          </div>
          <div class="col-6">
            <div class="form-group">
              <label class="form-group-label">End Date</label>
              <div class="form-group-value">{{ course.endDate }}</div>
            </div>
          </div>
        </div>

        <div class="popup-actions">
          <q-btn label="Close" flat v-close-popup class="btn-cancel" no-caps />
          <q-btn label="View Full Report" flat class="btn-save-close" no-caps />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { computed } from "vue";

const model = defineModel();

const props = defineProps({
  course: {
    type: Object,
    default: () => ({}),
  },
});

const statusClass = computed(() => {
  if (props.course.status === "Active") return "active-status";
  if (props.course.status === "Finished") return "important-status";
  return "";
});

const formatNumber = (value) => {
  return new Intl.NumberFormat("en-US").format(value);
};
</script>

<style lang="scss" scoped>
.custom-popup {
  width: 37.5rem !important;

  .form-group {
    margin-bottom: 0.5rem;
  }

  .popup-actions {
    .btn-save-close {
      width: 100% !important;
      max-width: 100% !important;
    }

    .btn-cancel {
      width: 100% !important;
      max-width: 100% !important;
    }
  }

  .active-status {
    border: 1px solid #4caf50;
    color: #4caf50;
    background-color: #e8f5e9;
  }

  .important-status {
    border: 1px solid #c81e1e;
    color: #c81e1e;
    background-color: #fde8e8;
  }
}
</style>
