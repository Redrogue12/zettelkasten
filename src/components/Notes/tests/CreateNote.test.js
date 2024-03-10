import { shallowMount } from "@vue/test-utils";
import { createPinia } from "pinia";

import CreateNote from "@/components/Notes/CreateNote.vue";

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
  });
});
