<template>
  <div id="createNote" class="d-flex flex-column">
    <h2>Create Note</h2>
    <div class="form-group">
      <label class="mb-3">
        <span>Title:</span>
        <input class="form-control" id="titleInput" v-model="note_title" />
      </label>
      <label class="mb-3">
        <span>Note:</span>
        <textarea
          class="form-control"
          id="textInput"
          cols="50"
          rows="10"
          v-model="note_text"
        />
      </label>
      <label class="mb-3">
        <span>Reference:</span>
        <input
          class="form-control"
          id="referenceInput"
          v-model="note_reference"
        />
      </label>
    </div>
    <div v-if="error" id="create-note-error" class="alert alert-danger mt-3">
      {{ this.error }}
    </div>
    <button class="btn btn-success centered-btn" @click.stop="onCreate">
      Submit
    </button>
  </div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useNotesStore as notesStore } from "../../stores/notesStore";
import { useUserStore as userStore } from "../../stores/userStore";
export default {
  name: "CreateNote",
  data() {
    return {
      note_title: "",
      note_text: "",
      note_reference: "",
      error: "",
    };
  },
  emits: ["created"],
  computed: {
    ...mapState(userStore, { user: "getUser" }),
  },
  methods: {
    ...mapActions(notesStore, ["createNote"]),
    async onCreate() {
      const { note_title, note_text, note_reference, user } = this;
      if (!note_title || !note_text) {
        this.error = "Please fill in all fields";
        return;
      }
      await this.createNote(
        { note_title, note_text, note_reference },
        user?.user_id
      );
      this.$emit("created");
    },
  },
  mounted() {
    const input = document.getElementById("titleInput");
    if (input) {
      input.focus();
    }
  },
};
</script>
