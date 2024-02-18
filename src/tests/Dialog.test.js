import { shallowMount } from "@vue/test-utils";
import Dialog from "@/components/Dialog.vue";

describe("Dialog", () => {
  it("renders dialog", () => {
    const wrapper = shallowMount(Dialog, {
      propsData: {
        open: true,
      },
    });

    expect(wrapper.find("div.dialog")).toBeTruthy();
  });

  it("when clicking close button emits 'close-dialog'", () => {
    const wrapper = shallowMount(Dialog, {
      propsData: {
        open: true,
      },
    });
    wrapper.find("button").trigger("click");

    expect(wrapper.emitted("close-dialog")).toBeTruthy();
  });

  it("closes the dialog when a click is done outside", async () => {
    const wrapper = shallowMount(Dialog, {
      propsData: {
        open: true,
      },
    });
    const closeDialog = jest.spyOn(wrapper.vm, "closeDialog");

    await wrapper.vm.$nextTick();
    document.body.click();

    expect(closeDialog).toHaveBeenCalled();
  });
});
