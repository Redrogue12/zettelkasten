<template>
  <div ref="dialog" class="dialog" @click.self="closeDialog" v-if="open">
    <slot />
    <button @click.stop="closeDialog">Close</button>
  </div>
</template>

<script>
export default {
  name: "Simple-Dialog",
  props: {
    open: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["close-dialog"],
  mounted() {
    document.addEventListener("click", this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  },
  methods: {
    closeDialog() {
      this.$emit("close-dialog");
    },
    handleClickOutside(event) {
      if (!this.$refs.dialog?.contains(event.target)) {
        // The click was outside the component, handle it
        this.closeDialog();
      }
    },
  },
};
</script>

<style scoped>
.dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
}
</style>
