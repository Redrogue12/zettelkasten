import { shallowMount } from "@vue/test-utils";
import { createPinia } from "pinia";

import CreateNote from "@/components/Notes/CreateNote.vue";

const mockStore = {
  createNote: jest.fn(),
};

describe("Create Note", () => {
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
  it("renders correctly", () => {
    expect(wrapper.find("div#createDialog")).toBeTruthy();
    expect(wrapper.find("#titleInput")).toBeTruthy();
    expect(wrapper.find("#textInput")).toBeTruthy();
  });

  it("should emit a create event when the form is submitted", async () => {
    const titleInput = wrapper.find("#titleInput");
    const textInput = wrapper.find("#textInput");

    await titleInput.setValue("Test Title");
    await textInput.setValue("Test Text");

    await wrapper.find("button").trigger("click");
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("created")).toBeTruthy();
  });

  it("should not emit a create event when the form is submitted with empty title", async () => {
    const titleInput = wrapper.find("#titleInput");
    const textInput = wrapper.find("#textInput");

    await titleInput.setValue("");
    await textInput.setValue("Test Text");

    await wrapper.find("button").trigger("click");
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("created")).toBeFalsy();
  });
});
