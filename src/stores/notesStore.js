import { defineStore } from "pinia";
import axios from "axios";

export const useNotesStore = defineStore("notes", {
  state: () => ({
    notes: [],
    notesError: false,
    relatedNotes: [],
  }),
  getters: {
    getNotes: (state) => state.notes,
    getError: (state) => state.notesError,
  },
  actions: {
    getNote(id) {
      return this.notes.find((note) => note.id === id);
    },
    pushNote(note) {
      this.notes.push(note);
    },
    pushLinkedNote(note) {
      this.relatedNotes.push(note);
    },
    removeLinkedNote(note) {
      const index = this.relatedNotes.indexOf((n) => n.id === note.id);
      this.relatedNotes.splice(index, 1);
    },
    async fetchNotes() {
      try {
        const response = await fetch("http://localhost:3000/notes");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        this.notes = await response.json();
        if (this.notesError) this.notesError = false;
      } catch (error) {
        console.error("Failed to fetch notes");
        this.notesError = true;
      }
    },
    async fetchRelatedNotes(id) {
      try {
        const response = await fetch(`http://localhost:3000/links/${id}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        this.relatedNotes = await response.json();
      } catch (error) {
        console.error(error);
      }
    },
    async linkNotes(id1, id2) {
      if (this.relatedNotes.find((note) => note.id === id2)) return;
      try {
        const response = await axios.post(`http://localhost:3000/links`, {
          id1,
          id2,
        });

        if (response.status === 201) {
          console.log("Notes linked successfully");
          const linkedNote = this.getNote(id2);
          this.pushLinkedNote(linkedNote);
        } else {
          console.log("Failed to link notes");
        }
      } catch (error) {
        console.error(error);
      }
    },
    async unlinkNotes(id1, id2) {
      try {
        const response = await axios.delete(`http://localhost:3000/links`, {
          params: {
            id1: id1,
            id2: id2,
          },
        });

        if (response.status === 204) {
          console.log("Notes unlinked successfully");
          const unlinkedNote = this.getNote(id2);
          this.removeLinkedNote(unlinkedNote);
        } else {
          console.log("Failed to link notes");
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
});
