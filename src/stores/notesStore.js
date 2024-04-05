import { defineStore } from "pinia";
import axios from "axios";

export const useNotesStore = defineStore("notes", {
  state: () => ({
    notes: [],
    relatedNotes: [],
  }),
  getters: {
    getNotes: (state) => state.notes,
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
      if (!user_id) return Promise.reject("Invalid user id");

      if (this.notes.length > 0) return Promise.resolve(this.notes);
      try {
        const token = localStorage.getItem("zettelkasten_token");
        const response = await fetch(
          `${process.env.VUE_APP_SERVER}/notes/${user_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          return Promise.reject("Failed to fetch notes");
        }

        this.notes = await response.json();

        return Promise.resolve(this.notes);
      } catch (error) {
        return Promise.reject("Failed to fetch notes");
      }
    },
    async createNote(note, user_id) {
      const { note_title, note_text, note_reference } = note;

      if (!note_title || !note_text) return Promise.reject("Invalid note data");
      try {
        const token = localStorage.getItem("zettelkasten_token");
        const response = await fetch(
          `${process.env.VUE_APP_SERVER}/notes/${user_id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              note_title,
              note_text,
              note_reference,
            }),
          }
        );

        if (!response.ok) {
          return Promise.reject("Failed to create note");
        } else {
          const note = await response.json();
          this.pushNote(note);
          return Promise.resolve(note);
        }
      } catch (error) {
        return Promise.reject("Failed to create note");
      }
    },
    async editNote(note) {
      const { note_id, note_title, note_text, note_reference } = note;
      if (!note_id || !note_title || !note_text) {
        return Promise.reject("Invalid note data");
      }
      try {
        const token = localStorage.getItem("zettelkasten_token");
        const response = await fetch(
          `${process.env.VUE_APP_SERVER}/notes/${note_id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              note_title,
              note_text,
              note_reference,
            }),
          }
        );

        if (!response.ok) {
          return Promise.reject("Failed to update note");
        }

        const result = await response.json();
        const index = this.notes.findIndex((n) => n.note_id === note_id);
        this.notes[index] = result;
        return Promise.resolve(result);
      } catch (error) {
        return Promise.reject("Failed to update note");
      }
    },
    async deleteNote(id) {
      try {
        const token = localStorage.getItem("zettelkasten_token");
        const response = await axios.delete(
          `${process.env.VUE_APP_SERVER}/notes/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 204) {
          const index = this.notes.indexOf((note) => note.note_id === id);
          this.notes.splice(index, 1);
          return Promise.resolve("Note deleted successfully");
        }
      } catch (error) {
        console.error(error);
        return Promise.reject("Failed to delete note");
      }
    },
    async fetchRelatedNotes(id) {
      if (!id) return Promise.reject("Invalid note id");
      try {
        const token = localStorage.getItem("zettelkasten_token");
        const response = await fetch(
          `${process.env.VUE_APP_SERVER}/links/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          return Promise.reject("Failed to fetch related notes");
        }

        this.relatedNotes = await response.json();
        return Promise.resolve(this.relatedNotes);
      } catch (error) {
        return Promise.reject("Failed to fetch related notes");
      }
    },
    pushTagToNote(tag, note_id) {
      const note = this.getNote(note_id);
      note.tags.push(tag);
      const index = this.notes.findIndex((n) => n.id === note_id);
      this.notes[index] = note;
    },
    async linkNotes(id1, id2) {
      if (!id1 || !id2) return Promise.reject("Invalid note ids");
      if (this.relatedNotes.find((note) => note.note_id === id2))
        return Promise.resolve("Notes already linked");
      try {
        const token = localStorage.getItem("zettelkasten_token");
        const response = await axios.post(
          `${process.env.VUE_APP_SERVER}/links`,
          {
            id1,
            id2,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 201) {
          const linkedNote = this.getNote(id2);
          this.pushLinkedNote(linkedNote);
          return Promise.resolve("Notes linked successfully");
        } else {
          return Promise.reject("Failed to link notes");
        }
      } catch (error) {
        return Promise.reject("Failed to link notes");
      }
    },
    async unlinkNotes(id1, id2, index) {
      if (!id1 || !id2 || !index === undefined)
        return Promise.reject("Invalid note ids");
      try {
        const token = localStorage.getItem("zettelkasten_token");
        const response = await axios.delete(
          `${process.env.VUE_APP_SERVER}/links`,
          {
            params: {
              id1,
              id2,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 204) {
          this.removeLinkedNote(index);
          return Promise.resolve("Notes unlinked successfully");
        } else {
          return Promise.reject("Failed to unlink notes");
        }
      } catch (error) {
        return Promise.reject("Failed to unlink notes");
      }
    },
    resetNotesStore() {
      this.notes = [];
      this.relatedNotes = [];
    },
  },
});
