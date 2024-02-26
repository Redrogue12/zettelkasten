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
      @click.stop="$emit('deleted')"
    />
  </div>
  <hr />
  <h5>Linked Notes</h5>
  <router-link :to="`links/${rn.id}`" v-for="rn in relatedNotes" :key="rn.id">{{
    rn.note_title
  }}</router-link>
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
  data() {
    return {
      relatedNotes: [],
    };
  },
  emits: ["click", "edit-dialog", "deleted"],
  mounted() {
    this.fetchRelatedNotes();
  },
  methods: {
    editDialog() {
      this.$emit("edit-dialog", this.note);
    },
    async fetchRelatedNotes() {
      const id = this.note.id;
      try {
        const response = await axios.get(`http://localhost:3000/links/${id}`);

        if (response.status === 200) {
          this.relatedNotes = response.data;
        } else {
          console.log("Failed to fetch related notes");
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
