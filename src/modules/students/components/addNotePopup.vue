<template>
  <q-dialog v-model="model" persistent>
    <q-card class="custom-popup">
      <q-card-section>
        <div class="popup-header">
          <p class="popup-title">Add Note to Student</p>
          <q-btn flat dense v-close-popup @click="resetForm()" class="close-btn">
            <svg
              width="13"
              height="12"
              viewBox="0 0 13 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0.292787 0.305288C0.480314 0.117817 0.734622 0.0125018 0.999786 0.0125018C1.26495 0.0125018 1.51926 0.117817 1.70679 0.305288L5.99979 4.59829L10.2928 0.305288C10.385 0.209778 10.4954 0.133596 10.6174 0.0811869C10.7394 0.0287779 10.8706 0.00119157 11.0034 3.77571e-05C11.1362 -0.00111606 11.2678 0.0241854 11.3907 0.0744663C11.5136 0.124747 11.6253 0.199 11.7192 0.292893C11.8131 0.386786 11.8873 0.498438 11.9376 0.621334C11.9879 0.744231 11.9833 0.87591 12.012 1.00869C12.0109 1.14147 11.9833 1.27269 11.9309 1.39469C11.8785 1.5167 11.8023 1.62704 11.7068 1.71929L7.41379 6.01229L11.7068 10.3053C11.8889 10.4939 11.9897 10.7465 11.9875 11.0087C11.9852 11.2709 11.88 11.5217 11.6946 11.7071C11.5092 11.8925 11.2584 11.9977 10.9962 12C10.734 12.0022 10.4814 11.9014 10.2928 11.7193L5.99979 7.42629L1.70679 11.7193C1.51818 11.9014 1.26558 12.0022 1.00339 12C0.741188 11.9977 0.490376 11.8925 0.304968 11.7071C0.11956 11.5217 0.0143906 11.2709 0.0121121 11.0087C0.00983372 10.7465 0.110629 10.4939 0.292787 10.3053L4.58579 6.01229L0.292787 1.71929C0.105316 1.53176 0 1.27745 0 1.01229C0 0.747124 0.105316 0.492816 0.292787 0.305288Z"
                fill="#9CA3AF"
              />
            </svg>
          </q-btn>
        </div>

        <q-form ref="formRef" greedy class="form-content">
          <div class="form-group persopn_label">
            <label>Person <span>*</span></label>
            <q-select
              v-model="form.person"
              :options="personOptions"
              option-label="label"
              option-value="id"
              outlined
              dense
              emit-value
              map-options
              fill-input
              use-input
              hide-selected
              clearable
              input-debounce="400"
              class="custom-select"
              :loading="personLoading"
              @filter="serachForPerson"
              placeholder="Select Person After Searching..."
              :rules="rules.required"
              disable
            />
          </div>

          <div class="form-group">
            <label>Note <span>*</span></label>
            <q-input
              v-model="form.noteText"
              type="textarea"
              outlined
              dense
              placeholder="Type the student note here..."
              class="custom-input"
              :rules="rules.required"
            />
          </div>

          <div class="form-group">
            <label>Note type <span>*</span></label>
            <div class="row q-gutter-md">
              <q-radio
                v-model="form.noteType"
                val="info"
                label="Information"
                color="teal-10"
                dense
              />
              <q-radio
                v-model="form.noteType"
                val="warn"
                label="Warning"
                color="teal-10"
                dense
              />
              <q-radio
                v-model="form.noteType"
                val="important"
                label="Important"
                color="teal-10"
                dense
              />
            </div>
          </div>

          <div class="popup-actions justify-end">
            <q-btn label="Cancel" v-close-popup @click="resetForm()" flat class="btn-cancel" />
            <q-btn
              label="Save & Add Another"
              class="btn-save-add"
              no-caps
              type="submit"
              @click.prevent="saveNote(false)"
            />
            <q-btn
              label="Save & Close"
              class="btn-save-close"
              no-caps
              type="submit"
              @click.prevent="saveNote(true)"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import {onMounted, ref} from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import services from "../../notes/services/service.js";
import rules from "src/config/rules.js";

const $q = useQuasar();
const router = useRouter();
const personOptions = ref([]);
const formRef = ref(null);
const props = defineProps({
  student: {
    type: Object,
    default: {},
  },
});
const model = defineModel();

const emit = defineEmits(["save"]);

const form = ref({
  person: props.student.globalid || "",
  noteText: "",
  noteType: "info",
});

const saveNote = async (closeModal = false) => {
  // Validate form before saving
  const isValid = await formRef.value.validate();

  if (!isValid) {
    return;
  }

  const data = {
    person: form.value.person,
    note: form.value.noteText,
    note_type: form.value.noteType,
  };

  emit("save", data);

  // Close modal if closeModal is true
  if (closeModal) {
    // Clear form
    form.value.noteText = "";
    form.value.noteType = "info";
    model.value = false;
  }
};


const resetForm = () => {
  form.value.person = props.student.globalid || "";
  form.value.noteText = "";
  form.value.noteType = "info";
};

const personLoading = ref(false);

const serachForPerson = async (val, update) => {
  if (!val || val.length < 2) {
    update(() => {
      personOptions.value = [];
    });
    return;
  }

  personLoading.value = true;

  try {
    const res = await services.serachForPerson(val);

    update(() => {
      personOptions.value = res.data.data;
    });
  } catch (e) {
    $q.notify({
      badgeStyle: "display:none",
      classes: "custom-Notify",
      textColor: "black-1",
      icon: "img:/images/Error.png",
      position: "bottom-right",
      message: e.response?.data?.result || "An error occurred.",
    });
  } finally {
    personLoading.value = false;
  }
};

onMounted(()=>{
  if (props.student && props.student.globalid) {
    personOptions.value = [{
      id: props.student.globalid,
      label: props.student.full_name
    }];
    form.value.person = props.student.globalid;
  }
})
</script>
<style scoped>
.persopn_label {
  margin-top: 10px;
}
</style>
