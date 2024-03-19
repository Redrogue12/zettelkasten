import { shallowMount } from "@vue/test-utils";
import { createPinia } from "pinia";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faEdit,
  faTags,
  faTrash,
  faLink,
} from "@fortawesome/free-solid-svg-icons";

import ViewNote from "../ViewNote.vue";

library.add(faEdit, faTags, faTrash, faLink);

const mockStore = {
  fetchRelatedNotes: jest.fn(),
};

const note = {
  note_id: 1,
  note_title: "Test Note",
  note_text: "This is a test note",
  note_reference: "This is a test reference",
  date_created: "2021-01-01",
  date_modified: "2021-01-01",
  tags: [
    { tag_id: 1, tag_name: "tag1" },
    { tag_id: 2, tag_name: "tag2" },
  ],
};

describe("ViewNote.vue", () => {
  let wrapper;
  beforeEach(() => {
    const pinia = createPinia();
    pinia.use(() => mockStore);

    wrapper = shallowMount(ViewNote, {
      propsData: {
        note,
      },
      global: {
        plugins: [pinia],
        components: {
          FontAwesomeIcon,
        },
        mocks: {
          $route: {
            params: { id: 1 },
          },
          $router: {
            push: jest.fn(),
          },
        },
        stubs: {
          RouterLink: true,
        },
      },
    });
  });

  it("Renders ViewNote.vue correctly", () => {
    expect(wrapper.find("#viewNote")).toBeTruthy();
  });

  it("Should display the note title and text", () => {
    expect(wrapper.find("h2").text()).toBe(note.note_title);
    expect(wrapper.find("p").text()).toBe(note.note_text);
    expect(wrapper.find("p.reference").text()).toBe(note.note_reference);
  });

  it("Should display the note tags", () => {
    expect(wrapper.findAll("tag-pill-stub").length).toBe(2);
  });

  it("Should display icons for tags, editing, deleting, and linking notes", () => {
    expect(wrapper.find("#view-note-tag-icon").exists()).toBeTruthy();
    expect(wrapper.find("#view-note-edit-icon").exists()).toBeTruthy();
    expect(wrapper.find("#view-note-trash-icon").exists()).toBeTruthy();
    // expect(wrapper.find("#view-note-link-icon").exists()).toBeTruthy();
    // I have to figure out how to test the link icon, the reason it fails is because it is inside a router-link which is mocked in the wrapper configuration
  });

  it("Should display the note creation and modification dates", () => {
    expect(wrapper.find("#view-note-date-created").text()).toBe(
      `Created: ${new Date(note.date_created).toLocaleDateString()}`
    );
    expect(wrapper.find("#view-note-date-modified").text()).toBe(
      `Modified: ${new Date(note.date_modified).toLocaleDateString()}`
    );
  });

  it("Should fetch related notes when mounted", () => {
    expect(mockStore.fetchRelatedNotes).toHaveBeenCalledWith(1);
  });

  it("Should emit a delete event when the delete button is clicked", async () => {
    await wrapper.find("#view-note-trash-icon").trigger("click");
    expect(wrapper.emitted("deleted")).toBeTruthy();
  });

  it("Should open an edit dialog the edit button is clicked", async () => {
    await wrapper.find("#view-note-edit-icon").trigger("click");
    expect(wrapper.find(".dialog")).toBeTruthy();
  });
});
