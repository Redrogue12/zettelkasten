import { shallowMount } from "@vue/test-utils";
import TagPill from "../TagPill.vue";

describe("TagPill.vue", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(TagPill, {
      propsData: {
        tag: {
          tag_id: 1,
          tag_name: "test tag",
        },
        size: "sm",
      },
    });
  });

  it("renders tag name", () => {
    expect(wrapper.text()).toContain("test tag");
  });

  it("renders small tag pill", () => {
    expect(wrapper.classes()).toContain("sm-tag-badge");
  });
});
