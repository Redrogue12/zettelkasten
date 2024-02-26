<template>
  <div>
    <h2>
      Are you sure you want to delete this note: "{{ note?.note_title }}"?
    </h2>
    <div class="d-flex justify-content-center">
      <button class="btn btn-danger" @click.stop="deleteNote">Yes</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "DeleteNote",
  props: {
    note: {
      type: Object,
      required: true,
    },
  },
  methods: {
    async deleteNote() {
      console.log("deleted");
      try {
        const response = await axios.delete(
          `http://localhost:3000/notes/${this.note.id}`
        );
        console.log("response.status:", response.status);
        if (response.status === 204) {
          this.$emit("deleted");
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
