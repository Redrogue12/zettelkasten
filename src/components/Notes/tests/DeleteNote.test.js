import { shallowMount } from "@vue/test-utils";
import { createPinia } from "pinia";

import DeleteNote from "@/components/Notes/DeleteNote.vue";

const mockStore = {
  deleteNote: jest.fn(),
};

describe("Create Note.vue", () => {
  let wrapper;

  const note = {
    note_id: 1,
    note_title: "Test Note",
    note_text: "This is a test note",
    date_created: "2021-01-01",
    date_modified: "2021-01-01",
  };

  const pinia = createPinia();
  pinia.use(() => mockStore);

  beforeEach(() => {
    wrapper = shallowMount(DeleteNote, {
      propsData: {
        note,
      },
      global: {
        plugins: [pinia],
      },
    });
  });
  it("Renders DeleteNote.vue correctly", () => {
    const noteTitle = wrapper.props().note.note_title;

    expect(wrapper.find("div#deleteDialog")).toBeTruthy();
    expect(wrapper.find("h2").text()).toBe(
      `Are you sure you want to delete this note: "${noteTitle}"?`
    );
    expect(wrapper.find("button")).toBeTruthy();
  });

  it("Should emit a delete event when the form is submitted", async () => {
    await wrapper.find("button").trigger("click");
    expect(wrapper.emitted("deleted")).toBeTruthy();
    expect(mockStore.deleteNote).toHaveBeenCalledWith(1);
    expect(wrapper.find("div#delete-note-error").exists()).toBe(false);
  });

  it("Should not emit a delete event when submitting without note_id", async () => {
    await wrapper.vm.onDelete(null);
    expect(wrapper.emitted("deleted")).toBeFalsy();
    expect(wrapper.find("div#delete-note-error").exists()).toBe(true);
  });
});
