<template>
  <div v-if="show" ref="dialog">
    <div class="dialog">
      <slot />
      <font-awesome-icon
        icon="times"
        class="close-icon fa-lg"
        @click.stop="closeDialog"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "Simple-Dialog",
  emits: ["close-dialog"],
  props: {
    show: {
      type: Boolean,
      required: true,
    },
  },
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
@keyframes fallIn {
  from {
    opacity: 0;
    transform: translate(-50%, calc(-50% - 50px));
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
}
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

  transition: transform 0.3s ease;
  animation: fallIn 0.5s ease-out forwards;
}

.close-icon {
  position: absolute;
  top: 10px;
  right: 20px;
  cursor: pointer;
}
</style>
