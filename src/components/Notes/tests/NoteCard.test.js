import { shallowMount } from "@vue/test-utils";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import NoteCard from "@/components/Notes/NoteCard.vue";

describe("NoteCard", () => {
  let wrapper;
  let note;
  beforeEach(() => {
    note = {
      note_id: 1,
      note_title: "Test Note",
      note_text: "This is a test note",
      date_created: "2021-01-01",
      date_modified: "2021-01-01",
    };
    wrapper = shallowMount(NoteCard, {
      propsData: {
        note,
      },
      global: {
        components: {
          FontAwesomeIcon,
        },
      },
    });
  });
  it("renders note title and text correctly", () => {
    expect(wrapper.find("h5").text()).toBe(note.note_title);
    expect(wrapper.find("p").text()).toBe(note.note_text);
  });

  it("when note is clicked, emit click event and pass correct value", () => {
    wrapper.trigger("click");

    expect(wrapper.emitted("click")).toBeTruthy();
    expect(wrapper.emitted("click")[0][0]).toEqual(note);
  });
});
