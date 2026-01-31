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
              <svg
                v-if="note.type === 'Warning'"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="q-mr-sm"
              >
                <path
                  d="M10.0001 6.04167C10.3452 6.04167 10.6251 6.32149 10.6251 6.66667V10.8333C10.6251 11.1785 10.3452 11.4583 10.0001 11.4583C9.65489 11.4583 9.37507 11.1785 9.37507 10.8333V6.66667C9.37507 6.32149 9.65489 6.04167 10.0001 6.04167Z"
                  fill="#F2994A"
                />
                <path
                  d="M10.0001 14.1667C10.4603 14.1667 10.8334 13.7936 10.8334 13.3333C10.8334 12.8731 10.4603 12.5 10.0001 12.5C9.53983 12.5 9.16673 12.8731 9.16673 13.3333C9.16673 13.7936 9.53983 14.1667 10.0001 14.1667Z"
                  fill="#F2994A"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M6.91208 3.73036C7.80534 2.59577 8.7516 1.875 10.0001 1.875C11.2485 1.875 12.1948 2.59577 13.088 3.73036C13.9665 4.8462 14.8975 6.49685 16.0886 8.60878L16.4515 9.25223C17.4362 10.998 18.2139 12.3769 18.6224 13.4837C19.0399 14.6147 19.1391 15.6416 18.5076 16.5474C17.8947 17.4265 16.8723 17.7861 15.5827 17.9559C14.2981 18.125 12.5705 18.125 10.3541 18.125H9.64606C7.42968 18.125 5.70207 18.125 4.41743 17.9559C3.12784 17.7861 2.10539 17.4265 1.49257 16.5474C0.861064 15.6416 0.960234 14.6147 1.37769 13.4837C1.7862 12.3769 2.5639 10.998 3.54857 9.25225L3.91143 8.60889C5.10258 6.49691 6.03357 4.84622 6.91208 3.73036ZM7.89423 4.5036C7.08255 5.53457 6.19762 7.0999 4.97087 9.27495L4.66782 9.81226C3.64597 11.624 2.91981 12.9155 2.55036 13.9165C2.18566 14.9046 2.23623 15.4284 2.51798 15.8326C2.81843 16.2635 3.38236 16.5589 4.58057 16.7166C5.7739 16.8737 7.41892 16.875 9.69701 16.875H10.3031C12.5812 16.875 14.2262 16.8737 15.4196 16.7166C16.6178 16.5589 17.1817 16.2635 17.4821 15.8326C17.7639 15.4284 17.8145 14.9046 17.4498 13.9165C17.0803 12.9155 16.3542 11.624 15.3323 9.81226L15.0292 9.27494C13.8025 7.09989 12.9176 5.53456 12.1059 4.5036C11.3018 3.48221 10.6772 3.125 10.0001 3.125C9.32291 3.125 8.69836 3.48221 7.89423 4.5036Z"
                  fill="#F2994A"
                />
              </svg>
              <svg
                v-else-if="note.type === 'Important'"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="q-mr-sm"
              >
                <path
                  d="M10.0001 5.20817C10.3453 5.20817 10.6251 5.48799 10.6251 5.83317V10.8332C10.6251 11.1783 10.3453 11.4582 10.0001 11.4582C9.6549 11.4582 9.37508 11.1783 9.37508 10.8332V5.83317C9.37508 5.48799 9.6549 5.20817 10.0001 5.20817Z"
                  fill="#C81E1E"
                />
                <path
                  d="M10.0001 14.1665C10.4603 14.1665 10.8334 13.7934 10.8334 13.3332C10.8334 12.8729 10.4603 12.4998 10.0001 12.4998C9.53984 12.4998 9.16675 12.8729 9.16675 13.3332C9.16675 13.7934 9.53984 14.1665 10.0001 14.1665Z"
                  fill="#C81E1E"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M1.04175 9.99984C1.04175 5.05229 5.05253 1.0415 10.0001 1.0415C14.9476 1.0415 18.9584 5.05229 18.9584 9.99984C18.9584 14.9474 14.9476 18.9582 10.0001 18.9582C5.05253 18.9582 1.04175 14.9474 1.04175 9.99984ZM10.0001 2.2915C5.74289 2.2915 2.29175 5.74264 2.29175 9.99984C2.29175 14.257 5.74289 17.7082 10.0001 17.7082C14.2573 17.7082 17.7084 14.257 17.7084 9.99984C17.7084 5.74264 14.2573 2.2915 10.0001 2.2915Z"
                  fill="#C81E1E"
                />
              </svg>
              <svg
                v-else-if="note.type === 'Information'"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="q-mr-sm"
              >
                <path
                  d="M10.8334 6.6665C10.8334 6.20627 10.4603 5.83317 10.0001 5.83317C9.53984 5.83317 9.16675 6.20627 9.16675 6.6665C9.16675 7.12674 9.53984 7.49984 10.0001 7.49984C10.4603 7.49984 10.8334 7.12674 10.8334 6.6665Z"
                  fill="#1565C0"
                />
                <path
                  d="M10.0001 14.7915C10.3453 14.7915 10.6251 14.5117 10.6251 14.1665V9.1665C10.6251 8.82133 10.3453 8.5415 10.0001 8.5415C9.6549 8.5415 9.37508 8.82133 9.37508 9.1665V14.1665C9.37508 14.5117 9.6549 14.7915 10.0001 14.7915Z"
                  fill="#1565C0"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M10.0479 1.0415H9.95227C8.02861 1.04149 6.52107 1.04149 5.34484 1.19963C4.14089 1.36149 3.19087 1.69928 2.4452 2.44495C1.69952 3.19063 1.36174 4.14065 1.19987 5.34459C1.04173 6.52083 1.04174 8.02835 1.04175 9.95201V10.0477C1.04174 11.9713 1.04173 13.4788 1.19987 14.6551C1.36174 15.859 1.69952 16.809 2.4452 17.5547C3.19087 18.3004 4.14089 18.6382 5.34484 18.8C6.52108 18.9582 8.02861 18.9582 9.95227 18.9582H10.0479C11.9716 18.9582 13.4791 18.9582 14.6553 18.8C15.8593 18.6382 16.8093 18.3004 17.555 17.5547C18.3006 16.809 18.6384 15.859 18.8003 14.6551C18.9584 13.4788 18.9584 11.9713 18.9584 10.0476V9.95203C18.9584 8.02836 18.9584 6.52083 18.8003 5.34459C18.6384 4.14065 18.3006 3.19063 17.555 2.44495C16.8093 1.69928 15.8593 1.36149 14.6553 1.19963C13.4791 1.04149 11.9715 1.04149 10.0479 1.0415ZM3.32908 3.32883C3.80379 2.85412 4.44606 2.58171 5.5114 2.43848C6.59471 2.29283 8.01823 2.2915 10.0001 2.2915C11.9819 2.2915 13.4055 2.29283 14.4888 2.43848C15.5541 2.58171 16.1964 2.85412 16.6711 3.32883C17.1458 3.80355 17.4182 4.44582 17.5614 5.51115C17.7071 6.59447 17.7084 8.01798 17.7084 9.99984C17.7084 11.9817 17.7071 13.4052 17.5614 14.4885C17.4182 15.5539 17.1458 16.1961 16.6711 16.6708C16.1964 17.1456 15.5541 17.418 14.4888 17.5612C13.4055 17.7068 11.9819 17.7082 10.0001 17.7082C8.01823 17.7082 6.59471 17.7068 5.5114 17.5612C4.44606 17.418 3.80379 17.1456 3.32908 16.6708C2.85437 16.1961 2.58195 15.5539 2.43872 14.4885C2.29308 13.4052 2.29175 11.9817 2.29175 9.99984C2.29175 8.01798 2.29308 6.59447 2.43872 5.51115C2.58195 4.44582 2.85437 3.80355 3.32908 3.32883Z"
                  fill="#1565C0"
                />
              </svg>
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
