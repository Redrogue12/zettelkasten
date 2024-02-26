<template>
  <div class="container">
    <h1>Links</h1>
    <div>
      <h5>{{ note?.note_title }}</h5>
      <p>{{ note?.note_text }}</p>
    </div>
    <hr />
    <h5>Tags</h5>
    <div class="d-flex">
      <TagPill v-for="tag in note?.tags" :key="tag.tag_id" :tag="tag" />
    </div>
    <hr />
    <div>
      <h5>Related Notes</h5>
      <div class="d-flex flex-wrap">
        <NoteCard
          v-for="n in relatedNotes"
          :key="n.id"
          :note="n"
          @click="unlinkNotes(n.id)"
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
    <div class="d-flex flex-wrap">
      <NoteCard
        v-for="n in filteredNotes"
        :key="n.id"
        :note="n"
        @click="linkNotes(n.id)"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { NoteCard } from "../components/Notes";
import TagPill from "../components/Tags/TagPill.vue";

export default {
  name: "LinksPage",
  components: {
    NoteCard,
    TagPill,
  },
  data() {
    return {
      notes: [],
      note: null,
      relatedNotes: [],
      search: "",
    };
  },
  computed: {
    filteredNotes() {
      return this.notes.filter((n) =>
        // n.id !== this.note.id ||
        // this.relatedNotes.find((rn) => rn.id !== n.id) ||
        n.note_title?.toLowerCase().includes(this.search.toLowerCase())
      );
    },
  },
  async created() {
    try {
      this.fetchNotes();
      this.fetchRelatedNotes();
    } catch (error) {
      console.error(error);
    }
  },
  methods: {
    async fetchNotes() {
      const id = this.$route.params.id;
      const response = await axios.get(`http://localhost:3000/notes`);
      this.note = response.data.find((note) => note.id === id);
      this.notes = response.data.filter((note) => note.id !== id);
    },
    async linkNotes(id2) {
      const id1 = this.note.id;
      try {
        const response = await axios.post(`http://localhost:3000/links`, {
          id1,
          id2,
        });

        if (response.status === 201) {
          console.log("Notes linked successfully");
          this.fetchNotes();
          this.fetchRelatedNotes();
        } else {
          console.log("Failed to link notes");
        }
      } catch (error) {
        console.error(error);
      }
    },
    async unlinkNotes(id2) {
      const id1 = this.note.id;
      try {
        const response = await axios.delete(`http://localhost:3000/links`, {
          params: {
            id1: id1,
            id2: id2,
          },
        });

        if (response.status === 204) {
          console.log("Notes unlinked successfully");
          this.fetchNotes();
          this.fetchRelatedNotes();
        } else {
          console.log("Failed to link notes");
        }
      } catch (error) {
        console.error(error);
      }
    },
    async fetchRelatedNotes() {
      const id = this.$route.params.id;
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
