import { shallowMount } from "@vue/test-utils";
import { createPinia } from "pinia";
import DeleteTag from "../DeleteTag.vue";

const mockStore = {
  deleteTag: jest.fn().mockResolvedValue({}),
};

describe("DeleteTag.vue", () => {
  let wrapper;
  beforeEach(() => {
    const pinia = createPinia();
    pinia.use(() => mockStore);

    wrapper = shallowMount(DeleteTag, {
      propsData: {
        tag: {
          tag_id: 1,
          tag_name: "new tag",
        },
      },
      global: {
        plugins: [pinia],
      },
    });
  });

  it("renders tag name", () => {
    const { tag_name } = wrapper.vm.tag;
    expect(wrapper.find("h2").text()).toBe(
      `Are you sure you want to delete this tag: "${tag_name}"?`
    );
  });

  it("renders delete tag button", () => {
    expect(wrapper.find("button").text()).toBe("Yes");
  });

  it("calls deleteTag method when button is clicked", async () => {
    await wrapper.find("button").trigger("click");
    expect(mockStore.deleteTag).toHaveBeenCalled();
    expect(wrapper.emitted("close")).toBeTruthy();
    expect(wrapper.find("div.alert-danger").exists()).toBe(false);
  });

  it("renders error message when deleteTag method fails", async () => {
    mockStore.deleteTag.mockRejectedValue("Failed to delete tag");
    await wrapper.find("button").trigger("click");
    expect(wrapper.find("div.alert-danger").exists()).toBe(true);
  });
});
