<template>
  <q-dialog v-model="model" persistent>
    <q-card class="reverse-dialog-card">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Reverse Transaction</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section class="q-pt-md">
        <div class="confirmation-text">
          Are you sure you want to reverse this transaction?
        </div>

      </q-card-section>

      <q-card-actions align="right" class="q-pa-md">
        <q-btn
          flat
          label="No"
          color="grey-7"
          v-close-popup
          class="action-btn cancel-btn"
          no-caps
        />
        <q-btn
          unelevated
          label="Yes"
          color="negative"
          @click="confirmReverse"
          class="action-btn confirm-btn"
          no-caps
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
const model = defineModel();
const emit = defineEmits(["confirm"]);

const confirmReverse = () => {
  emit("confirm");
  model.value = false;
};
</script>

<style lang="scss" scoped>
.reverse-dialog-card {
  width: 100%;
  max-width: 400px;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);

  .text-h6 {
    font-weight: 700;
    color: #1f2937;
  }

  .confirmation-text {
    font-size: 1.1rem;
    font-weight: 500;
    color: #374151;
    line-height: 1.5;
  }

  .warning-subtext {
    font-size: 0.875rem;
    color: #6b7280;
    margin-top: 8px;
  }

  .action-btn {
    padding: 8px 24px;
    font-weight: 600;
    border-radius: 8px;
  }

  .confirm-btn {
    background-color: #2f5d6a !important;
  }
  .cancel-btn {
      background-color: #f9fafb;
      color: #4b5563;
      border: 1px solid #e5e7eb;
  }
}
</style>
