import { shallowMount } from "@vue/test-utils";
import { createPinia } from "pinia";

import CreateNote from "@/components/Notes/CreateNote.vue";
import { nextTick } from "vue";

describe("Create Note", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(CreateNote, {
      global: {
        plugins: [createPinia()],
      },
    });
  });
  it("renders correctly", () => {
    expect(wrapper.find("div#createDialog")).toBeTruthy();
    expect(wrapper.vm.$refs.titleInput).toBeTruthy();
    expect(wrapper.vm.$refs.textInput).toBeTruthy();
  });

  it("should emit a create event when the form is submitted", async () => {
    const title = "Test Title";
    const text = "Test Text";
    wrapper.vm.$refs.titleInput.value = title;
    wrapper.vm.$refs.textInput.value = text;
    await wrapper.find("button").trigger("click");
    nextTick();
    expect(wrapper.emitted("created")).toBeTruthy();
  });
});
