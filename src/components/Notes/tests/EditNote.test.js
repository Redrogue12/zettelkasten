import { shallowMount } from "@vue/test-utils";
import EditNote from "@/components/Notes/EditNote.vue";
import { createPinia } from "pinia";

jest.mock("@/stores/notesStore", () => ({
  useNotesStore: jest.fn().mockReturnValue({
    editNote: jest.fn().mockResolvedValueOnce(),
  }),
}));

describe("EditNote:", () => {
  let selectedNote;
  let wrapper;
  beforeEach(() => {
    const pinia = createPinia();
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

  it('Emits "edited" event when submitting form', () => {
    wrapper.find("#edit-submit-button").trigger("click");
    expect(wrapper.emitted("edited")).toBeTruthy();
  });
});
