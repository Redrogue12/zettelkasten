<template>
  <div class="badge tag-badge rounded-pill text-bg-primary">
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
  },
};
</script>

<style scoped>
.tag-badge {
  font-size: 1.1em;
  margin: 0.5em;
  cursor: pointer;
}
</style>
