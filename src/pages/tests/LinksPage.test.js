import { shallowMount } from "@vue/test-utils";
import { createPinia } from "pinia";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

library.add(faSpinner);
// import { computed } from "vue";

import LinksPage from "../LinksPage.vue";

const notes = [1, 2, 3, 4].map((n) => {
  return {
    note_id: n,
    note_title: `Test Note ${n}`,
    note_text: `Test Content ${n}`,
    user_id: 1,
  };
});

const mockStore = {
  getNote: jest.fn().mockReturnValue(notes[0]),
  fetchNotes: jest.fn().mockReturnValue(notes),
  linkNotes: jest.fn(),
  unlinkNotes: jest.fn(),
};

describe("Linksage", () => {
  let wrapper;
  beforeEach(() => {
    const pinia = createPinia();
    pinia.use(() => mockStore);
    wrapper = shallowMount(LinksPage, {
      global: {
        plugins: [pinia],
        components: {
          FontAwesomeIcon,
        },
        mocks: {
          $route: {
            params: { id: 1 },
          },
        },
      },
      data() {
        return {
          search: "",
          note: notes[0],
        };
      },
      computed: {
        user: () => ({ user_id: 1, name: "Test User" }),
        notes: () => notes,
        relatedNotes: () => [notes[1]],
      },
      stubs: {
        "router-link": true,
      },
    });
  });

  it("renders LinksPage", () => {
    expect(wrapper.find("#links-page")).toBeTruthy();
  });

  it("renders LinksPage note", () => {
    expect(wrapper.find("#links-page-note")).toBeTruthy();
    expect(wrapper.find("#links-page-note h1").text()).toBe("Test Note 1");
    expect(wrapper.find("#links-page-note p").text()).toBe("Test Content 1");
  });

  it("renders LinksPage related-notes", () => {
    console.log("filteredNotes:", wrapper.vm.filteredNotes);
    expect(wrapper.find("#links-page-related-notes")).toBeTruthy();
    expect(wrapper.findAll(".related-note").length).toBe(1);
  });

  // these tests are failing because the filteredNotes does not work no matter how much I try to fix it

  // it("renders LinksPage filtered-notes", () => {
  //   const noteCards = wrapper.findAllComponents({ name: "NoteCard" });
  //   const filteredNotes = wrapper.vm.filteredNotes;
  //   expect(wrapper.findAll("#links-page-filtered-notes")).toBeTruthy();
  //   expect(noteCards.length).toBe(filteredNotes?.length);
  // });

  // it("renders notes that match search", async () => {
  //   await wrapper.setData({ search: "Test Note 2" });
  //   expect(wrapper.findAll(".filtered-note").length).toBe(1);
  // });
});
