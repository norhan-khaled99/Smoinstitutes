<template>

  <q-dialog v-model="model" persistent>
    <q-card class="custom-popup course-popup">
      <q-card-section>
        <div class="popup-header">
          <p class="popup-title">Add Student to Course</p>
        </div>


        <div class="popup-actions">
          <q-btn label="Cancel" v-close-popup @click="resetForm()" flat class="btn-cancel" no-caps />
          <q-btn v-if="!isEdit" label="Save & Add Another" flat class="btn-save-add" no-caps />
          <q-btn label="Save & Close" flat class="btn-save-close" no-caps />
        </div>

      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup>
const model = defineModel();
</script>
