<template>
  <div class="student-notes-container">
    <div class="header">
      <h2 class="title">Student Notes</h2>
      <q-btn class="add-note-btn q-px-md" flat @click="addNote">
        <q-icon name="add_circle_outline" class="q-mr-sm" size="18px" />
        Add Note
      </q-btn>
    </div>

    <div class="notes-list row">
      <div
        v-for="note in notes"
        :key="note.id"
        class="col-md-6 col-sm-12 col-12"
      >
        <div class="note-card" :class="note.type.toLowerCase()">
          <div class="note-status-border"></div>
          <div class="note-content">
            <div class="note-header items-center row no-wrap">
              <q-icon
                :name="getIcon(note.type)"
                :class="note.type.toLowerCase() + '-icon'"
                size="20px"
                class="q-mr-sm"
              />
              <span class="note-type-label">{{ note.type }} Note</span>
            </div>
            <p class="note-description q-mt-sm">{{ note.description }}</p>
            <div class="note-footer text-caption q-mt-sm">
              Added on {{ note.date }} <span class="bullet">•</span> by
              {{ note.author }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <addNotePopup v-model="showAddPopup" @save="handleSaveNote" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import addNotePopup from "./addNotePopup.vue";

const showAddPopup = ref(false);

const notes = ref([
  {
    id: 1,
    type: "Warning",
    description:
      "Student has been absent 3 times this week without any notice from the guardian.",
    date: "Oct 26, 2025, 9:25 AM",
    author: "Mohamed_Essam",
  },
  {
    id: 2,
    type: "Important",
    description:
      "Student has been absent 3 times this week without any notice from the guardian.",
    date: "Oct 22, 2025, 9:00 AM",
    author: "Mohamed_Essam",
  },
  {
    id: 3,
    type: "Information",
    description:
      "Student has been absent 3 times this week without any notice from the guardian.",
    date: "Oct 19, 2025, 8:25 AM",
    author: "Mohamed_Essam",
  },
  {
    id: 4,
    type: "Information",
    description:
      "Student has been absent 3 times this week without any notice from the guardian.",
    date: "Oct 17, 2025, 8:25 AM",
    author: "Mohamed_Essam",
  },
  {
    id: 5,
    type: "Important",
    description:
      "Student has been absent 3 times this week without any notice from the guardian.",
    date: "Oct 10, 2025, 9:55 AM",
    author: "Mohamed_Essam",
  },
]);

const getIcon = (type) => {
  switch (type) {
    case "Warning":
      return "report_problem";
    case "Important":
      return "error_outline";
    case "Information":
      return "info_outline";
    default:
      return "help_outline";
  }
};

const addNote = () => {
  showAddPopup.value = true;
};

const handleSaveNote = (newNote) => {
  notes.value.unshift({
    id: Date.now(),
    ...newNote,
  });
};
</script>
