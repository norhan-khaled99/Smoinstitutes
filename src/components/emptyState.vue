<template>
  <div class="empty-state-container">
    <div class="empty-state-content">
      <!-- Title -->
      <h2 class="empty-state-title" v-if="title">
        {{ title }}
      </h2>

      <!-- Description -->
      <p class="empty-state-description" v-if="description">
        {{ description }}
      </p>

      <!-- Action Button -->
      <q-btn
        v-if="showButton"
        class="empty-state-btn"
        unelevated
        no-caps
        @click="$emit('action-click')"
      >
        <template v-if="buttonIcon">
          <q-icon :name="buttonIcon" size="20px" class="q-mr-sm" />
        </template>
        <template v-else>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            class="q-mr-sm"
          >
            <g clip-path="url(#clip0_empty)">
              <circle cx="9" cy="9" r="7.5" stroke="white" stroke-width="1.5" />
              <path
                d="M11.25 9.00002L9 9.00002L6.75 9.00002M9 9.00002L9 6.75M9 9.00002L9 11.25"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_empty">
                <rect width="18" height="18" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </template>
        {{ buttonLabel }}
      </q-btn>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: "No data found",
  },
  description: {
    type: String,
    default: "",
  },
  buttonLabel: {
    type: String,
    default: "Add New",
  },
  showButton: {
    type: Boolean,
    default: true,
  },
  buttonIcon: {
    type: String,
    default: "",
  },
});

defineEmits(["action-click"]);
</script>
