<template>
  <div class="d-flex">
    <h3>{{ note?.note_title }}</h3>
    <router-link :to="`/links/${note.id}`">
      <font-awesome-icon
        class="dialog-link-icon fa-lg ml-3 mt-2 pointer"
        icon="link"
      />
    </router-link>
  </div>
  <p class="d-inline">{{ note?.note_text }}</p>
  <div class="d-flex justify-content-end">
    <font-awesome-icon
      class="dialog-edit-icon fa-lg pointer mr-3"
      icon="edit"
      @click.stop="editDialog(note)"
    />
    <font-awesome-icon
      class="dialog-edit-icon fa-lg pointer"
      icon="trash"
      @click.stop="deleteNote"
    />
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ViewNote",
  props: {
    note: {
      type: Object,
      required: true,
    },
  },
  emits: ["click", "edit-dialog", "deleted"],
  methods: {
    editDialog() {
      this.$emit("edit-dialog", this.note);
    },
    async deleteNote() {
      try {
        await axios.delete(`http://localhost:3000/notes/${this.note.id}`);
        this.$emit("deleted");
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
