<template>
  <div
    :class="`note-card animation-delay-${index}`"
    :style="{ animationDelay: `${index * 0.2}s` }"
    @click.stop="handleClick"
  >
    <h5>{{ truncatedNoteTitle }}</h5>
    <p class="mb-0">{{ truncatedNoteText }}</p>
  </div>
</template>

<script>
export default {
  name: "NoteCard",
  props: {
    note: {
      type: Object,
      required: true,
    },
    index: {
      // index will help us stagger the animation
      type: Number,
      required: false,
    },
  },
  emits: ["click"],
  computed: {
    truncatedNoteText() {
      return this.note.note_text?.length > 150
        ? this.note.note_text.substring(0, 150) + "..."
        : this.note.note_text;
    },
    truncatedNoteTitle() {
      return this.note.note_title?.length > 22
        ? this.note.note_title.substring(0, 22) + "..."
        : this.note.note_title;
    },
  },
  methods: {
    handleClick() {
      this.$emit("click", this.note);
    },
  },
};
</script>

<style scoped>
.note-card {
  position: relative;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  margin: 10px;
  width: 300px;
  height: 175px;
  cursor: pointer;
  word-wrap: break-word;
}

.note-dates {
  font-size: 0.8em;
  color: #888;
}
</style>
