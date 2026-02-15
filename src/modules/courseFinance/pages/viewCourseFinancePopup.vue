<template>
  <q-dialog v-model="model">
    <q-card class="custom-popup">
      <q-card-section>
        <div class="popup-header">
          <div class="row items-center q-gutter-x-sm">
            <p class="popup-title">
              {{ course.name }} ({{ course.shift }})
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
          Course Serial : {{ course.courseserial }}
        </div>

        <div class="popup-divider"></div>

        <div class="row q-col-gutter-y-lg">
          <!-- Row 1 -->
          <div class="col-6">
            <div class="form-group">
              <label class="form-group-label">Total Fees</label>
              <div class="form-group-value">
                {{ formatNumber(course.total_fees) }}
              </div>
            </div>
          </div>
          <div class="col-6">
            <div class="form-group">
              <label class="form-group-label">Discounts</label>
              <div class="form-group-value">
                {{ formatNumber(course.total_discounts) }}
              </div>
            </div>
          </div>

          <!-- Row 2 -->
          <div class="col-6">
            <div class="form-group">
              <label class="form-group-label">Paid</label>
              <div class="paid-text">
                {{ formatNumber(course.total_payed) }}
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
                {{ formatNumber(course.total_expences) }}
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
              <div class="form-group-value">{{ course.startdate }}</div>
            </div>
          </div>
          <div class="col-6">
            <div class="form-group">
              <label class="form-group-label">End Date</label>
              <div class="form-group-value">{{ course.enddate }}</div>
            </div>
          </div>
        </div>

        <div class="popup-actions">
          <q-btn label="Close" flat v-close-popup class="btn-cancel" no-caps />
          <q-btn label="View Full Report" flat class="btn-save-close" @click="handleAction()" no-caps />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>

  <q-dialog v-model="pdfDialog" persistent>
    <q-card class="pdf-card">
      <q-bar class="pdf-bar">
        <div>Preview</div>
        <q-space />
        <q-btn dense flat icon="close" v-close-popup @click="pdfDialog = false" class="pdf-close-btn" aria-label="Close preview" />
      </q-bar>

      <q-card-section class="q-pa-none pdf-card-section">
        <iframe
          v-if="pdfUrl"
          :src="pdfUrl"
          style="width: 100%; height: calc(100% - 56px); border: 0"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import services from "../service/service.js";
import { useQuasar } from "quasar";

const $q = useQuasar();

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
  if (props.course.status === "Pending") return "pending-status";
  return "";
});

const formatNumber = (value) => {
  return new Intl.NumberFormat("en-US").format(value);
};

const pdfDialog = ref(false);
const pdfUrl = ref(null);

const handleAction = async () => {
  try {
    $q.loading.show();

    // Attempt to execute the action on the backend. The service expects an action object
    // similar to other modules; here we request the full report for the course.
    const action = { link: "view_full_report" };

    const res = await services.executeAction(props.course.courseid);

    $q.loading.hide();

    const contentType = res.headers["content-type"];

    if (contentType?.includes("application/pdf")) {
      const blob = new Blob([res.data], { type: "application/pdf" });
      pdfUrl.value = URL.createObjectURL(blob);
      pdfDialog.value = true;
    } else if (contentType?.includes("text/html")) {
      const blob = new Blob([res.data], { type: "text/html" });
      pdfUrl.value = URL.createObjectURL(blob);
      pdfDialog.value = true;
    } else {
      $q.notify({ type: "warning", message: "Unsupported file type" });
    }
  } catch (error) {
    $q.loading.hide();
    $q.notify({
      badgeStyle: "display:none",
      classes: "custom-Notify",
      textColor: "black-1",
      icon: "img:/images/Error.png",
      position: "bottom-right",
      message:
        error.response?.data?.errors?.__all__?.[0] || "An error occurred.",
    });
  }
};

watch(pdfDialog, (val) => {
  if (!val && pdfUrl.value) {
    URL.revokeObjectURL(pdfUrl.value);
    pdfUrl.value = null;
  }
});
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

.pdf-card {
  width: 90vw;
  max-width: 1000px;
  height: 80vh;
  display: flex;
  flex-direction: column;
  border-radius: 6px;
}

.pdf-card-section {
  flex: 1 1 auto;
  overflow: hidden;
  padding: 0 !important;
}

.pdf-bar {
  background-color: #ef4444;
  color: #ffffff;
}

.pdf-bar :deep(.q-btn) {
  min-width: 44px;
  height: 44px;
}

.pdf-bar :deep(.q-icon) {
  font-size: 20px;
  color: #ffffff;
}

.pdf-close-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
</style>
