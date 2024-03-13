import { shallowMount } from "@vue/test-utils";
import { createPinia } from "pinia";

import TagsPage from "../TagsPage.vue";

const mockStore = {
  tags: [
    { tag_id: 1, name: "Test Tag" },
    { tag_id: 2, name: "Test Tag 2" },
  ],
  user: {
    user_id: "1",
    username: "John Doe",
  },
  fetchTags: jest.fn(),
};

describe("TagsPage", () => {
  let wrapper;
  beforeEach(() => {
    const pinia = createPinia();
    pinia.use(() => mockStore);

    wrapper = shallowMount(TagsPage, {
      global: {
        plugins: [pinia],
      },
    });
  });

  it("renders TagsPage", () => {
    expect(wrapper.find("#tags-page")).toBeTruthy();
  });

  it("fetches tags on mount", () => {
    expect(mockStore.fetchTags).toHaveBeenCalled();
  });

  it("renders tags-container", () => {
    expect(wrapper.find(".tags-page-tags-container")).toBeTruthy();
  });
});
