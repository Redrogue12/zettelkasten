<template>
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
    class="btn btn-success"
    style="width: 100px; align-self: center"
    @click.stop="createNote"
  >
    Submit
  </button>
</template>

<script>
export default {
  name: "CreateNote",
  data() {
    return {
      note_title: "",
      note_text: "",
      error: null,
    };
  },
  emits: ["created"],
  methods: {
    created() {
      this.$emit("created");
      this.error = null;
    },
    async createNote() {
      try {
        const response = await fetch(`http://localhost:3000/notes`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            note_title: this.note_title,
            note_text: this.note_text,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to createnote");
        } else console.log("Note created successfully");
        this.created();
      } catch (error) {
        this.error = "Failed to create note";
        console.error(error);
      }
    },
  },
  mounted() {
    if (this.$refs.titleInput) {
      this.$refs.titleInput.focus();
    }
  },
};
</script>

<style scoped>
.form-group label {
  display: flex;
  width: 100%;
}

.form-group label span {
  width: 70px;
}
</style>
