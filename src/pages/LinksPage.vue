<template>
  <div id="links-page" class="container">
    <div id="links-page-note">
      <h1>{{ note?.note_title }}</h1>
      <div class="notes-container">
        <TagPill v-for="tag in note?.tags" :key="tag.tag_id" :tag="tag" />
      </div>
      <p>{{ note?.note_text }}</p>
    </div>
    <hr />
    <div id="links-page-related-notes">
      <h5>Related Notes</h5>
      <div class="related-notes-container">
        <NoteCard
          v-for="(n, i) in relatedNotes"
          class="related-note"
          :index="i"
          :key="n.note_id"
          :note="n"
          @click="unlinkNotes(note.note_id, n.note_id, i)"
        />
      </div>
    </div>
    <hr />
    <h5>All Notes</h5>
    <input
      placeholder="Filter Notes"
      class="m-2 input-group-text"
      type="text"
      v-model="search"
    />
    <div id="links-page-filtered-notes" class="notes-container">
      <NoteCard
        v-for="(n, i) in filteredNotes"
        class="filtered-note"
        :index="i"
        :key="n.note_id"
        :note="n"
        @click="linkNotes(note.note_id, n.note_id)"
      />
    </div>
  </div>
</template>

<script>
import { NoteCard } from "../components/Notes";
import TagPill from "../components/Tags/TagPill.vue";
import { useNotesStore as notesStore } from "../stores/notesStore";
import { useUserStore as userStore } from "../stores/userStore";
import { mapState, mapActions } from "pinia";

export default {
  name: "LinksPage",
  components: {
    NoteCard,
    TagPill,
  },
  data() {
    return {
      search: "",
      note: null,
    };
  },
  computed: {
    ...mapState(notesStore, {
      relatedNotes: "relatedNotes",
      notes: "getNotes",
    }),
    ...mapState(userStore, {
      user: "getUser",
    }),
    filteredNotes() {
      const { id } = this.$route?.params;
      return this.notes.filter(
        (n) =>
          n.note_id !== id &&
          !this.relatedNotes.some((rn) => rn.note_id === n.note_id) &&
          n.note_title?.toLowerCase().includes(this.search.toLowerCase())
      );
    },
  },
  async created() {
    try {
      const { id } = this.$route.params;
      const { user_id } = this.user;
      if (this.notes?.length === 0) {
        await this.fetchNotes(user_id, true);
      }
      this.note = await this.getNote(id);
    } catch (error) {
      console.error(error);
    }
  },
  methods: {
    ...mapActions(notesStore, [
      "fetchNotes",
      "getNote",
      "linkNotes",
      "unlinkNotes",
    ]),
  },
};
</script>
