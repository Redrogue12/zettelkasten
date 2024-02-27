<template>
  <div ref="dialog" class="dialog">
    <slot />
    <font-awesome-icon
      icon="times"
      class="close-icon fa-lg"
      @click.stop="closeDialog"
    />
  </div>
</template>

<script>
export default {
  name: "Simple-Dialog",
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
    handleClickOutside(e) {
      if (!this.$el.contains(e.target)) {
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
  min-width: 350px;
  min-height: 250px;
  justify-content: space-between;
}
.close-icon {
  position: absolute;
  top: 10px;
  right: 20px;
  cursor: pointer;
}
</style>
