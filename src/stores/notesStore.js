import { defineStore } from "pinia";
import { http } from "./http";

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
      const note = this.notes.find((note) => note.note_id === id);
      return note;
    },
    pushNote(note) {
      this.notes.push(note);
    },
    pushLinkedNote(note) {
      if (this.relatedNotes.find((n) => n.id === note.note_id)) return;
      this.relatedNotes.push(note);
    },
    removeLinkedNote(index) {
      this.relatedNotes.splice(index, 1);
    },
    async fetchNotes(user_id) {
      if (!user_id) return console.error("Invalid user id");

      if (this.notes.length > 0) return;
      try {
        const { data } = await http.get(`/notes/${user_id}`);
        this.notes = data;
        if (this.notesError) this.notesError = false;
      } catch (error) {
        console.error("Failed to fetch notes");
        this.notesError = true;
      }
    },
    async createNote(note_title, note_text, user_id) {
      if (!note_title || !note_text) return console.error("Invalid note");
      try {
        const response = await http.post(`/notes/${user_id}`, {
          note_title,
          note_text,
        });

        if (!response.ok) {
          this.notesError = "Failed to create note";
          throw new Error("Failed to creat enote");
        } else {
          console.log("Note created successfully");
          const note = await response.json();
          this.pushNote(note);
        }
      } catch (error) {
        this.noteError = "Failed to create note";
        console.error(error);
      }
    },
    async editNote(note) {
      const { id, note_title, note_text } = note;
      try {
        const response = await http.put(`/notes/${id}`, {
          note_title,
          note_text,
        });

        if (!response.ok) {
          throw new Error("Failed to update note");
        } else console.log("Note updated successfully");

        const result = await response.json();
        const index = this.notes.findIndex((n) => n.id === id);
        this.notes[index] = result;
      } catch (error) {
        console.error(error);
      }
    },
    async deleteNote(id) {
      try {
        const response = await http.delete(`/notes/${id}`);

        if (response.status === 204) {
          console.log("note deleted successfully");
          const index = this.notes.indexOf((note) => note.note_id === id);
          this.notes.splice(index, 1);
        }
      } catch (error) {
        console.error(error);
      }
    },
    async fetchRelatedNotes(id) {
      if (!id) return console.error("Invalid note id");
      try {
        const { data } = await http.get(`/links/${id}`);
        this.relatedNotes = data;
      } catch (error) {
        console.error(error);
      }
    },
    pushTagToNote(tag, note_id) {
      const note = this.getNote(note_id);
      note.tags.push(tag);
      const index = this.notes.findIndex((n) => n.id === note_id);
      this.notes[index] = note;
    },
    async linkNotes(id1, id2) {
      if (this.relatedNotes.find((note) => note.note_id === id2)) return;
      try {
        const response = await http.post(`/links`, {
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
    async unlinkNotes(id1, id2, index) {
      try {
        const response = await http.delete(`/links`, {
          params: {
            id1: id1,
            id2: id2,
          },
        });

        if (response.status === 204) {
          console.log("Notes unlinked successfully");
          this.removeLinkedNote(index);
        } else {
          console.log("Failed to link notes");
        }
      } catch (error) {
        console.error(error);
      }
    },
    resetNotesStore() {
      this.notes = [];
      this.notesError = false;
      this.relatedNotes = [];
    },
  },
});
