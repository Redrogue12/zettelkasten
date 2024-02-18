import { shallowMount } from "@vue/test-utils";
import NoteCard from "@/components/NoteCard.vue";

describe("NoteCard", () => {
  it("renders note title and text correctly", () => {
    const note = {
      id: 1,
      note_title: "Test Note",
      note_text: "This is a test note",
      date_created: "2021-01-01",
      date_modified: "2021-01-01",
    };
    const wrapper = shallowMount(NoteCard, {
      propsData: {
        note,
      },
    });

    expect(wrapper.find("h5").text()).toBe(note.note_title);
    expect(wrapper.find("p").text()).toBe(note.note_text);
  });

  it("when note is clicked, emit click event and pass correct value", () => {
    const note = {
      id: 1,
      note_title: "Test Note",
      note_text: "This is a test note",
      date_created: "2021-01-01",
      date_modified: "2021-01-01",
    };
    const wrapper = shallowMount(NoteCard, {
      propsData: {
        note,
      },
    });

    wrapper.trigger("click");

    expect(wrapper.emitted("click")).toBeTruthy();
    expect(wrapper.emitted("click")[0][0]).toEqual(note);
  });
});
