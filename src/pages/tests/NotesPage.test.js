import { shallowMount } from "@vue/test-utils";
import { createPinia } from "pinia";

import NotesPage from "../NotesPage.vue";

const mockStore = {
  notes: [
    {
      note_id: "1",
      title: "Test Note",
    },
    {
      note_id: "2",
      title: "Test Note 2",
    },
  ],
  user: {
    user_id: "1",
    username: "John Doe",
  },
  fetchNotes: jest.fn(),
};

describe("NotesPage", () => {
  let wrapper;
  beforeEach(() => {
    const pinia = createPinia();
    pinia.use(() => mockStore);

    wrapper = shallowMount(NotesPage, {
      global: {
        plugins: [pinia],
      },
    });
  });
  it("renders NotesPage", () => {
    expect(wrapper.find("#notes-page")).toBeTruthy();
  });

  it("fetches notes on mount", () => {
    expect(mockStore.fetchNotes).toHaveBeenCalled();
  });

  it("renders notes-container", () => {
    expect(wrapper.find(".notes-container")).toBeTruthy();
  });
});
