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
  <div class="d-flex flex-wrap">
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
  <div class="d-flex flex-wrap">
    <router-link
      class="mr-3 mb-3"
      :to="`links/${rn.id}`"
      v-for="rn in relatedNotes"
      :key="rn.id"
      >{{ rn.note_title }}</router-link
    >
  </div>

  <Dialog v-if="tag" @close-dialog="tag = false">
    <NoteTags :note="note" @tag-linked="tag = false" />
  </Dialog>
</template>

<script>
import NoteTags from "./NoteTags";
import TagPill from "../Tags/TagPill.vue";
import Dialog from "../Dialog";
import { useNotesStore as notesStore } from "../../stores/notesStore";

import { mapState, mapActions } from "pinia";

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
      tag: false,
    };
  },
  emits: ["click", "edit-dialog", "deleted"],
  mounted() {
    this.fetchRelatedNotes(this.note.id);
  },
  computed: {
    ...mapState(notesStore, ["relatedNotes"]),
  },
  methods: {
    ...mapActions(notesStore, ["fetchRelatedNotes"]),
    clickTag() {
      this.tag = true;
    },
    editDialog() {
      this.$emit("edit-dialog", this.note);
    },
  },
};
</script>
