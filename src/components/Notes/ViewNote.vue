<template>
  <div class="d-flex">
    <h2>{{ note?.note_title }}</h2>
    <router-link :to="`/links/${note.id}`">
      <font-awesome-icon
        class="dialog-link-icon fa-lg ml-3 mt-2 pointer"
        icon="link"
      />
    </router-link>
    <font-awesome-icon
      class="dialog-link-icon fa-lg ml-3 mt-2 pointer"
      icon="tags"
      @click.stop="clickTag"
    />
  </div>
  <div class="d-flex">
    <TagPill v-for="tag in note.tags" :key="tag.tag_id" :tag="tag" size="sm" />
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

  <Dialog v-if="tag" @close-dialog="tag = false">
    <NoteTags :note="note" />
  </Dialog>
</template>

<script>
import axios from "axios";
import NoteTags from "./NoteTags";
import TagPill from "../Tags/TagPill.vue";
import Dialog from "../Dialog";

export default {
  name: "ViewNote",
  components: {
    NoteTags,
    Dialog,
    TagPill,
  },
  props: {
    note: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      relatedNotes: [],
      tag: false,
    };
  },
  emits: ["click", "edit-dialog", "deleted"],
  mounted() {
    this.fetchRelatedNotes();
  },
  methods: {
    clickTag() {
      this.tag = true;
      console.log("clicked tag");
    },
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
