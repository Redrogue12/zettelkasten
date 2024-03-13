import { shallowMount } from "@vue/test-utils";
import { createPinia } from "pinia";

import NoteTags from "@/components/Notes/NoteTags.vue";

describe("NoteTags.vue", () => {
  let wrapper;
  beforeEach(() => {
    const mockStore = {
      user: {
        user_id: 1,
        username: "testuser",
        email: "abc@gmail.com",
      },
      tags: [
        { tag_id: 1, tag_name: "tag1" },
        { tag_id: 2, tag_name: "tag2" },
        { tag_id: 3, tag_name: "tag3" },
        { tag_id: 4, tag_name: "tag4" },
      ],
      fetchTags: jest.fn(),
      connectTags: jest.fn(),
    };

    const pinia = createPinia();
    pinia.use(() => mockStore);

    jest.spyOn(NoteTags.methods, "onConnect");

    wrapper = shallowMount(NoteTags, {
      propsData: {
        note: {
          note_id: 1,
          note_title: "Test Note",
          note_text: "This is a test note",
          date_created: "2021-01-01",
          date_modified: "2021-01-01",
          tags: [
            { tag_id: 1, tag_name: "tag1" },
            { tag_id: 2, tag_name: "tag2" },
          ],
        },
      },
      global: {
        plugins: [pinia],
      },
    });
  });
  it("Renders NoteTags.vue correctly", () => {
    expect(wrapper.find("div#noteTags")).toBeTruthy();
  });

  it("Should filter out tags already linked to note", () => {
    expect(wrapper.findAll("div#tags-container tag-pill-stub").length).toBe(2);
  });

  it("Should filter by tagSearch input", () => {
    wrapper.vm.tagSearch = "tag3";
    expect(wrapper.vm.filteredTags.length).toBe(1);
    expect(wrapper.vm.filteredTags[0].tag_name).toBe("tag3");
  });

  it("Should output array of tag_id from note in tagIds", () => {
    expect(wrapper.vm.tagIds).toStrictEqual([1, 2]);
  });

  it("Should call connectTags when tag is clicked", async () => {
    wrapper.vm.onConnect = jest.fn();
    await wrapper.find("div#tags-container tag-pill-stub").trigger("click");
    expect(wrapper.vm.onConnect).toHaveBeenCalled();
    expect(wrapper.find(".alert .alert-danger").exists()).toBe(false);
  });
});
