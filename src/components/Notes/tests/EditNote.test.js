import { shallowMount } from "@vue/test-utils";
import EditNote from "@/components/Notes/EditNote.vue";
import { createPinia } from "pinia";

jest.mock("@/stores/notesStore", () => ({
  useNotesStore: jest.fn().mockReturnValue({
    editNote: jest.fn().mockResolvedValueOnce(),
  }),
}));

describe("EditNote", () => {
  let selectedNote;
  beforeEach(() => {
    selectedNote = {
      note_id: 1,
      note_title: "Test Note",
      note_text: "This is a test note",
      date_created: "2021-01-01",
      date_modified: "2021-01-01",
    };
  });
  it("renders edit dialog correctly", () => {
    const wrapper = shallowMount(EditNote, {
      propsData: {
        selectedNote,
      },
    });

    expect(wrapper.vm.$refs.titleInput.value).toBe(selectedNote.note_title);
    expect(wrapper.vm.$refs.textInput.value).toBe(selectedNote.note_text);
    expect(wrapper.vm.$refs.editDateCreated.innerHTML).toBe(
      ` Created: ${new Date(selectedNote.date_created).toLocaleDateString()}`
    );
    expect(wrapper.vm.$refs.editDateModified.innerHTML).toBe(
      ` Modified: ${new Date(selectedNote.date_modified).toLocaleDateString()}`
    );
  });

  it('emits "edited" event when submitting form', () => {
    const pinia = createPinia();

    const wrapper = shallowMount(EditNote, {
      propsData: {
        selectedNote,
      },
      global: {
        plugins: [pinia],
      },
    });

    wrapper.find("#edit-submit-button").trigger("click");
    expect(wrapper.emitted("edited")).toBeTruthy();
  });
});
