// create unit tests for EditNote component in src/tests/notedialog.test.js. The tests should: check if the open and close emitters are called and if the dialog is rendered correctly. The EditNote component should be imported from "@/components/EditNote.vue". The EditNote component should have a prop named note. The EditNote component should emit an "open" event when the dialog is opened. The EditNote component should emit a "close" event when the dialog is closed

import { shallowMount } from "@vue/test-utils";
import EditNote from "@/components/EditNote.vue";
// import axios from "axios";

// jest.mock("axios");

describe("EditNote", () => {
  it("renders dialog correctly", () => {
    const selectedNote = {
      id: 1,
      note_title: "Test Note",
      note_text: "This is a test note",
      date_created: "2021-01-01",
      date_modified: "2021-01-01",
    };

    const wrapper = shallowMount(EditNote, {
      propsData: {
        selectedNote,
      },
    });

    expect(wrapper.vm.$refs.titleInput.value).toBe(selectedNote.note_title);
    expect(wrapper.vm.$refs.textInput.value).toBe(selectedNote.note_text);
  });

  it('emits "edited" event when submitting form', () => {
    const selectedNote = {
      id: 1,
      note_title: "Test Note",
      note_text: "This is a test note",
      date_created: "2021-01-01",
      date_modified: "2021-01-01",
    };

    const wrapper = shallowMount(EditNote, {
      propsData: {
        selectedNote,
      },
    });

    wrapper.vm.edited();

    expect(wrapper.emitted("edited")).toBeTruthy();
  });
});
