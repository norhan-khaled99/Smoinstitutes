<template>
  <q-dialog v-model="model" persistent>
    <q-card class="pdf-card">
      <q-bar class="pdf-bar">
        <div>Course Finance Report</div>
        <q-space />
        <q-btn
          dense
          flat
          icon="close"
          v-close-popup
          @click="model = false"
          class="pdf-close-btn"
          aria-label="Close preview"
        />
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
import { ref, watch } from "vue";
import services from "../service/service.js";
import { useQuasar } from "quasar";

const $q = useQuasar();

const model = defineModel();

const props = defineProps({
  fromFilter: { type: String, default: "" },
  toFilter: { type: String, default: "" },
  statusFilter: { type: String, default: "" },
  shiftFilter: { type: String, default: "" },
});

const pdfUrl = ref(null);

const loadReport = async () => {
  try {
    $q.loading.show();

    const res = await services.executeFilters(
      props.fromFilter,
      props.toFilter,
      props.statusFilter,
      props.shiftFilter
    );

    $q.loading.hide();

    const contentType = res.headers["content-type"];

    if (contentType?.includes("application/pdf")) {
      const blob = new Blob([res.data], { type: "application/pdf" });
      pdfUrl.value = URL.createObjectURL(blob);
    } else if (contentType?.includes("text/html")) {
      const blob = new Blob([res.data], { type: "text/html" });
      pdfUrl.value = URL.createObjectURL(blob);
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
      message: error.response?.data?.errors?.__all__?.[0] || "An error occurred.",
    });
  }
};

watch(model, (val) => {
  if (val) {
    loadReport();
  } else if (pdfUrl.value) {
    URL.revokeObjectURL(pdfUrl.value);
    pdfUrl.value = null;
  }
});
</script>

<style lang="scss" scoped>
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
