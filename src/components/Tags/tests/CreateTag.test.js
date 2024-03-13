import { shallowMount } from "@vue/test-utils";
import { createPinia } from "pinia";
import CreateTag from "../CreateTag.vue";

const mockStore = {
  user: {
    user_id: 1,
  },
  createTag: jest.fn().mockResolvedValue({}),
};

describe("CreateTag.vue", () => {
  let wrapper;
  beforeEach(() => {
    const pinia = createPinia();
    pinia.use(() => mockStore);

    wrapper = shallowMount(CreateTag, {
      global: {
        plugins: [pinia],
      },
    });
  });

  it("renders tag name", () => {
    expect(wrapper.find("h2").text()).toBe("Create Tag");
  });

  it("renders tag input", () => {
    expect(wrapper.find("input").exists()).toBe(true);
  });

  it("renders create tag button", () => {
    expect(wrapper.find("button").text()).toBe("Submit");
  });

  it("calls createTag method when button is clicked", async () => {
    const tag = "new tag";
    const { user_id } = wrapper.vm.user;
    wrapper.find("input").setValue(tag);
    await wrapper.find("button").trigger("click");
    expect(mockStore.createTag).toHaveBeenCalled();
    expect(mockStore.createTag).toHaveBeenCalledWith(tag, user_id);
    expect(wrapper.vm.error).toBe("");
  });

  it("displays error message when createTag is missing tag_name", async () => {
    await wrapper.find("button").trigger("click");
    expect(wrapper.vm.error).toBe("Tag name is required");
  });
});
