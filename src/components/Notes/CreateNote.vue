<template>
  <div id="createNote">
    <h2>Create Note</h2>
    <div class="form-group">
      <label class="mb-3">
        <span>Title:</span>
        <input class="form-control" ref="titleInput" v-model="note_title" />
      </label>
      <label class="mb-3">
        <span>Note:</span>
        <textarea
          class="form-control"
          cols="50"
          rows="10"
          ref="textInput"
          v-model="note_text"
        />
      </label>
    </div>
    <div v-if="error" class="alert alert-danger mt-3">{{ this.error }}</div>
    <button
      class="btn btn-success centered-btn"
      @click.stop="
        createNote(note_title, note_text, user?.user_id);
        created();
      "
    >
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
    };
  },
  emits: ["created"],
  computed: {
    ...mapState(notesStore, { error: "getError" }),
    ...mapState(userStore, { user: "getUser" }),
  },
  methods: {
    ...mapActions(notesStore, ["createNote"]),
    created() {
      this.$emit("created");
    },
  },
  mounted() {
    if (this.$refs.titleInput) {
      this.$refs.titleInput.focus();
    }
  },
};
</script>
