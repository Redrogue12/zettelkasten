import { shallowMount } from "@vue/test-utils";
import { createPinia } from "pinia";
import EditTag from "../EditTag.vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

library.add(faTrash);

const mockStore = {
  editTag: jest.fn().mockResolvedValue({}),
};

describe("EditTag.vue", () => {
  let wrapper;
  beforeEach(() => {
    const pinia = createPinia();
    pinia.use(() => mockStore);

    wrapper = shallowMount(EditTag, {
      propsData: {
        tag: {
          tag_id: 1,
          tag_name: "new tag",
        },
      },
      global: {
        plugins: [pinia],
      },
      components: {
        FontAwesomeIcon,
      },
    });
  });

  it("renders tag name", () => {
    expect(wrapper.find("h2").text()).toBe("Edit Tag");
  });

  it("renders tag name input", () => {
    expect(wrapper.find("input").element.value).toBe("new tag");
  });

  it("renders submit button", () => {
    expect(wrapper.find("button").text()).toBe("Submit");
  });

  it("calls editTag method when button is clicked", async () => {
    await wrapper.find("button").trigger("click");
    expect(mockStore.editTag).toHaveBeenCalled();
    expect(wrapper.emitted("edited")).toBeTruthy();
    expect(wrapper.find("div.alert-danger").exists()).toBe(false);
  });

  it("renders error message when editTag method fails", async () => {
    mockStore.editTag.mockRejectedValue("Failed to edit tag");
    await wrapper.find("button").trigger("click");
    expect(wrapper.find("div.alert-danger").exists()).toBe(true);
  });

  it("emits close event when close button is clicked", async () => {
    await wrapper.find(".delete-icon").trigger("click");
    expect(wrapper.emitted("delete")).toBeTruthy();
  });
});
