// create unit tests for NoteDialog component in src/tests/notedialog.test.js. The tests should: check if the open and close emitters are called and if the dialog is rendered correctly. The NoteDialog component should be imported from "@/components/NoteDialog.vue". The NoteDialog component should have a prop named note. The NoteDialog component should emit an "open" event when the dialog is opened. The NoteDialog component should emit a "close" event when the dialog is closed

import { shallowMount } from "@vue/test-utils";
import NoteDialog from "@/components/NoteDialog.vue";

describe("NoteDialog", () => {
  it("renders dialog correctly", () => {
    const selectedNote = {
      note_title: "Test Note",
      note_text: "This is a test note",
    };

    const wrapper = shallowMount(NoteDialog, {
      propsData: {
        selectedNote,
      },
    });

    expect(wrapper.vm.$refs.titleInput.value).toBe(selectedNote.note_title);
    expect(wrapper.vm.$refs.textInput.value).toBe(selectedNote.note_text);
  });

  it('emits "close-dialog" event when closed', () => {
    const selectedNote = {
      note_title: "Test Note",
      note_text: "This is a test note",
    };

    const wrapper = shallowMount(NoteDialog, {
      propsData: {
        selectedNote,
      },
    });

    wrapper.vm.closeDialog();

    expect(wrapper.emitted("close-dialog")).toBeTruthy();
  });

  it('emits "edit-dialog" event when submitted', () => {
    const selectedNote = {
      note_title: "Test Note",
      note_text: "This is a test note",
    };

    const wrapper = shallowMount(NoteDialog, {
      propsData: {
        selectedNote,
      },
    });

    wrapper.find("#dialog-submit-button").trigger("click");

    expect(wrapper.emitted("edit-note")).toBeTruthy();
    expect(wrapper.emitted("edit-note")[0][0]).toEqual(selectedNote);
  });
});
