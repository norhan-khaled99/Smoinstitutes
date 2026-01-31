<template>
  <q-item clickable :to="link">
    <q-item-section v-if="icon" avatar>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          :d="icon"
          :fill="fillOne"
          :stroke="stroke"
          :opacity="opacityOne"
        />
        <path
          :d="iconTwo"
          :fill="fillTwo"
          :opacity="opacityTwo"
          fill-rule="evenodd"
          clip-rule="evenodd"
          v-if="iconTwo"
          :stroke="stroke"
        />
        <path
          :d="iconThree"
          :fill="fillThree"
          :opacity="opacityThree"
          fill-rule="evenodd"
          clip-rule="evenodd"
          v-if="iconThree"
          :stroke="stroke"
        />
        <path
          :d="iconFour"
          :opacity="opacityFour"
          :fill="fillFour"
          fill-rule="evenodd"
          clip-rule="evenodd"
          v-if="iconFour"
          :stroke="stroke"
        />
        <path
          :d="iconFive"
          :opacity="opacityFive"
          :fill="fillFive"
          fill-rule="evenodd"
          clip-rule="evenodd"
          v-if="iconFive"
          :stroke="stroke"
        />
        <path
          :d="iconSix"
          :opacity="opacitySix"
          :fill="fillSix"
          fill-rule="evenodd"
          clip-rule="evenodd"
          v-if="iconSix"
          :stroke="stroke"
        />
      </svg>
    </q-item-section>

    <q-item-section v-if="!mini">
      <q-item-label>{{ title }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "EssentialLink",
  props: {
    title: {
      type: String,
      required: true,
    },
    link: {
      type: Object,
      required: true,
    },
    icon: {
      type: String,
      default: "",
    },
    iconTwo: {
      type: String,
      default: "",
    },
    iconThree: {
      type: String,
      default: "",
    },
    iconFour: {
      type: String,
      default: "",
    },
    iconFive: {
      type: String,
      default: "",
    },
    iconSix: {
      type: String,
      default: "",
    },
    fillOne: {
      type: String,
      default: "",
    },
    fillTwo: {
      type: String,
      default: "",
    },
    fillThree: {
      type: String,
      default: "",
    },
    fillFour: {
      type: String,
      default: "",
    },
    fillFive: {
      type: String,
      default: "",
    },
    fillSix: {
      type: String,
      default: "",
    },
    opacityOne: {
      type: String,
      default: "",
    },
    opacityTwo: {
      type: String,
      default: "",
    },
    opacityThree: {
      type: String,
      default: "",
    },
    opacityFour: {
      type: String,
      default: "",
    },
    opacityFive: {
      type: String,
      default: "",
    },
    opacitySix: {
      type: String,
      default: "",
    },
    mini: {
      type: Boolean,
      default: false,
    },
    stroke: {
      type: String,
      default: "",
    },
  },
});
</script>
