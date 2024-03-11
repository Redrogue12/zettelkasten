import { shallowMount } from "@vue/test-utils";
import EditNote from "@/components/Notes/EditNote.vue";
import { createPinia } from "pinia";

const mockStore = {
  editNote: jest.fn(),
};

describe("EditNote:", () => {
  let selectedNote;
  let wrapper;
  beforeEach(() => {
    const pinia = createPinia();
    pinia.use(() => mockStore);
    selectedNote = {
      note_id: 1,
      note_title: "Test Note",
      note_text: "This is a test note",
      date_created: "2021-01-01",
      date_modified: "2021-01-01",
    };
    wrapper = shallowMount(EditNote, {
      propsData: {
        selectedNote,
      },
      global: {
        plugins: [pinia],
      },
    });
  });

  it("Renders edit dialog correctly", () => {
    expect(wrapper.vm.$refs.titleInput.value).toBe(selectedNote.note_title);
    expect(wrapper.vm.$refs.textInput.value).toBe(selectedNote.note_text);
    expect(wrapper.vm.$refs.editDateCreated.innerHTML).toBe(
      ` Created: ${new Date(selectedNote.date_created).toLocaleDateString()}`
    );
    expect(wrapper.vm.$refs.editDateModified.innerHTML).toBe(
      ` Modified: ${new Date(selectedNote.date_modified).toLocaleDateString()}`
    );
  });

  it('Emits "edited" event when submitting form', async () => {
    await wrapper.find("#edit-submit-button").trigger("click");
    expect(wrapper.find("div#edit-note-error").exists()).toBe(false);
    expect(wrapper.emitted("edited")).toBeTruthy();
    expect(mockStore.editNote).toHaveBeenCalledWith({
      note_title: "Test Note",
      note_text: "This is a test note",
      note_id: 1,
      date_created: "2021-01-01",
      date_modified: "2021-01-01",
    });
  });

  it("Does not emit an event when submitting form with empty title", async () => {
    wrapper.vm.localNote.note_title = "";
    await wrapper.find("#edit-submit-button").trigger("click");
    expect(wrapper.vm.$refs.titleInput.value).toBe("");
    expect(wrapper.emitted("edited")).toBeFalsy();
    expect(wrapper.find("div#edit-note-error").text()).toBe(
      "Title and note are required."
    );
  });
});
