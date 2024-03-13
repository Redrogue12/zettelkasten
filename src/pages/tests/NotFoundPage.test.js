import { shallowMount } from "@vue/test-utils";

import NotFoundPage from "../NotFoundPage.vue";

describe("NotFoundPage", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(NotFoundPage);
  });

  it("renders NotFoundPage", () => {
    expect(wrapper.find("#not-found-page")).toBeTruthy();
  });
});
