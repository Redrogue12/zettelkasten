import { shallowMount } from "@vue/test-utils";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import Dialog from "@/components/Dialog.vue";

library.add(faTimes);

describe("Dialog", () => {
  it("renders dialog", () => {
    const wrapper = shallowMount(Dialog, {
      propsData: {
        open: true,
      },
      global: {
        components: {
          FontAwesomeIcon,
        },
      },
    });

    expect(wrapper.find("div.dialog")).toBeTruthy();
  });

  it("when clicking close button emits 'close-dialog'", () => {
    const wrapper = shallowMount(Dialog, {
      propsData: {
        open: true,
      },
      global: {
        components: {
          FontAwesomeIcon,
        },
      },
    });
    wrapper.find(".close-icon").trigger("click");

    expect(wrapper.emitted("close-dialog")).toBeTruthy();
  });

  it("closes the dialog when a click is done outside", async () => {
    const wrapper = shallowMount(Dialog, {
      propsData: {
        open: true,
      },
      global: {
        components: {
          FontAwesomeIcon,
        },
      },
    });
    const closeDialog = jest.spyOn(wrapper.vm, "closeDialog");

    await wrapper.vm.$nextTick();
    document.body.click();

    expect(closeDialog).toHaveBeenCalled();
  });
});
