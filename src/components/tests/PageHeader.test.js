import { shallowMount } from "@vue/test-utils";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

library.add(faPlus);

import PageHeader from "@/components/PageHeader.vue";

describe("PageHeader", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(PageHeader, {
      propsData: {
        error: false,
        user: {
          username: "John Doe",
        },
        pageType: "Notes",
        loading: false,
      },
      global: {
        components: {
          FontAwesomeIcon,
        },
      },
    });
  });
  it("renders PageHeader", () => {
    const { username } = wrapper.vm.user;
    const { pageType } = wrapper.vm;
    expect(wrapper.find("#page-header")).toBeTruthy();
    expect(wrapper.find("#page-header p").text()).toBe(`Welcome, ${username}!`);
    expect(wrapper.find("#page-header h1").text()).toBe(`${pageType}`);
    expect(wrapper.find("#page-header-error").exists()).toBeFalsy();
    expect(wrapper.find("#page-header-plus-icon").exists()).toBeTruthy();
  });

  it("renders PageHeader with error", async () => {
    await wrapper.setProps({ error: true });
    expect(wrapper.find("#page-header-error").exists()).toBeTruthy();
  });

  it("renders PageHeader with loading", async () => {
    await wrapper.setProps({ loading: true });
    expect(wrapper.find("#page-header-loading").exists()).toBeTruthy();
    expect(wrapper.find("#page-header").exists()).toBeFalsy();
  });

  it("emits create-clicked when plus icon is clicked", () => {
    wrapper.find("#page-header-plus-icon").trigger("click");
    expect(wrapper.emitted("create-clicked")).toBeTruthy();
  });
});
