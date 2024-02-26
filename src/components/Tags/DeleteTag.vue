<template>
  <h3>Delete a Tag</h3>
  <p>{{ tag.id }}</p>
</template>

<script>
export default {
  name: "DeleteTag",
  props: {
    tag: {
      type: Object,
      required: true,
    },
  },
};
</script>
