import { shallowMount } from "@vue/test-utils";
import NoteCard from "@/components/NoteCard.vue";

describe("NoteCard", () => {
  it("renders note title and text correctly", () => {
    const note = {
      note_title: "Test Note",
      note_text: "This is a test note",
    };
    const wrapper = shallowMount(NoteCard, {
      propsData: {
        note,
      },
    });

    expect(wrapper.find("h2").text()).toBe(note.note_title);
    expect(wrapper.find("p").text()).toBe(note.note_text);
  });

  it('emits "open-dialog" event when clicked', () => {
    const note = {
      note_title: "Test Note",
      note_text: "This is a test note",
    };
    const wrapper = shallowMount(NoteCard, {
      propsData: {
        note,
      },
    });

    wrapper.trigger("click");

    expect(wrapper.emitted("open-dialog")).toBeTruthy();
    expect(wrapper.emitted("open-dialog")[0][0]).toStrictEqual(note);
  });
});
