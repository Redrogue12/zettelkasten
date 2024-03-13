import { shallowMount } from "@vue/test-utils";

import LoginPage from "../LoginPage.vue";

describe("LoginPage", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(LoginPage);
  });

  it("renders LoginPage", () => {
    expect(wrapper.find("#login-page")).toBeTruthy();
  });

  it("renders login-form", () => {
    expect(wrapper.find("form")).toBeTruthy();
    expect(wrapper.find("input[type='email']")).toBeTruthy();
    expect(wrapper.find("input[type='password']")).toBeTruthy();
    expect(wrapper.find("button[type='submit']")).toBeTruthy();
  });
});
