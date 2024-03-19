import { shallowMount } from "@vue/test-utils";
import { createPinia } from "pinia";

import CreateNote from "@/components/Notes/CreateNote.vue";

const mockStore = {
  user: {
    username: "test",
    email: "abc@gmail.com",
    user_id: 1,
  },
  createNote: jest.fn(),
};

describe("Create Note.vue", () => {
  let wrapper;
  const pinia = createPinia();
  pinia.use(() => mockStore);
  beforeEach(() => {
    wrapper = shallowMount(CreateNote, {
      global: {
        plugins: [pinia],
      },
    });
  });
  it("Renders CreateNote.vue correctly", () => {
    expect(wrapper.find("div#createDialog")).toBeTruthy();
    expect(wrapper.find("#titleInput")).toBeTruthy();
    expect(wrapper.find("#textInput")).toBeTruthy();
    expect(wrapper.find("#referenceInput")).toBeTruthy();
  });

  it("Should emit a create event when the form is submitted", async () => {
    const titleInput = wrapper.find("#titleInput");
    const textInput = wrapper.find("#textInput");
    const referenceInput = wrapper.find("#referenceInput");

    await titleInput.setValue("Test Title");
    await textInput.setValue("Test Text");
    await referenceInput.setValue("Test Reference");

    await wrapper.find("button").trigger("click");
    expect(wrapper.find("div#create-note-error").exists()).toBe(false);
    expect(wrapper.emitted("created")).toBeTruthy();
    expect(mockStore.createNote).toHaveBeenCalledWith(
      {
        note_title: "Test Title",
        note_text: "Test Text",
        note_reference: "Test Reference",
      },
      1
    );
  });

  it("Should not emit a create event when the form is submitted with empty title", async () => {
    const titleInput = wrapper.find("#titleInput");
    const textInput = wrapper.find("#textInput");

    await titleInput.setValue("");
    await textInput.setValue("Test Text");

    await wrapper.find("button").trigger("click");
    expect(wrapper.emitted("created")).toBeFalsy();
    expect(wrapper.find("div#create-note-error").text()).toBe(
      "Please fill in all fields"
    );
  });
});
