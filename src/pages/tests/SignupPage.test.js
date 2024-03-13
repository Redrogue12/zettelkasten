import { shallowMount } from "@vue/test-utils";

import SignupPage from "../SignupPage.vue";

describe("SignupPage", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(SignupPage);
  });

  it("renders signupPage", () => {
    expect(wrapper.find("#signup-page")).toBeTruthy();
  });

  it("renders signup-form", () => {
    expect(wrapper.find("form")).toBeTruthy();
    expect(wrapper.find("input[placeholder='username']")).toBeTruthy();
    expect(wrapper.find("input[type='email']")).toBeTruthy();
    expect(wrapper.find("input[type='password']")).toBeTruthy();
    expect(wrapper.find("button[type='submit']")).toBeTruthy();
  });
});
