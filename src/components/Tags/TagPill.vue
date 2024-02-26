<template>
  <div :class="tagSize" class="badge tag-badge rounded-pill text-bg-primary">
    {{ tag.tag_name }}
  </div>
</template>

<script>
export default {
  name: "TagPill",
  props: {
    tag: {
      type: Object,
      required: true,
    },
    size: {
      type: String,
      default: "md",
    },
  },
  computed: {
    tagSize() {
      return this.size === "sm"
        ? "sm-tag-badge"
        : this.size === "lg"
        ? "lg-tag-badge"
        : "md-tag-badge";
    },
  },
};
</script>

<style scoped>
.tag-badge {
  margin: 0.5em;
  cursor: pointer;
}
.sm-tag-badge {
  font-size: 0.8em;
}
.md-tag-badge {
  font-size: 1.1em;
}
.lg-tag-badge {
  font-size: 1.2em;
}
</style>
