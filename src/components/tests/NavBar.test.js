import { shallowMount } from "@vue/test-utils";
import { createPinia } from "pinia";
// import { createPinia, defineStore } from "pinia";
// import { createTestingPinia } from "@pinia/testing";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
// import { useUserStore } from "../../stores/userStore";

import NavBar from "@/components/NavBar.vue";

// const user = {
//   user_id: 1,
//   username: "testuser",
//   email: "abc@gmail.com",
// };
// const useUserStore = defineStore("userStore", {
//   state: () => ({ user }),
//   getters: {
//     getuser: (state) => state.user,
//   },
//   actions: {
//     logout() {
//       jest.fn();
//     },
//   },
// });

describe("NavBar", () => {
  let wrapper;
  // let userStore;

  beforeEach(() => {
    const pinia = createPinia();
    // userStore = useUserStore(pinia);

    wrapper = shallowMount(NavBar, {
      global: {
        plugins: [pinia],
        stubs: {
          "router-link": true,
        },
        components: {
          FontAwesomeIcon,
        },
      },
    });
  });

  it("renders correctly", () => {
    expect(wrapper.find("nav").exists()).toBe(true);
  });

  // it("calls logout when logout link is clicked", () => {
  //   console.log("wrapper user:", wrapper.vm.user);
  //   wrapper.find(".logout").trigger("click");
  //   expect(wrapper.vm.$userStore.actions.logout).toHaveBeenCalled();
  // });
});
