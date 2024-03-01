<template>
  <div class="d-flex flex-column justify-content-between h-100 flex-grow-1">
    <h2>
      Are you sure you want to delete this tag:
      <strong>"{{ tag?.tag_name }}"</strong>?
    </h2>
    <div class="d-flex justify-content-center">
      <button
        class="btn btn-danger"
        @click.stop="
          deleteTag(tag.tag_id);
          $emit('deleted');
        "
      >
        Yes
      </button>
    </div>
  </div>
</template>

<script>
import { useTagsStore as tagsStore } from "@/stores/tagsStore";
import { mapActions } from "pinia";
export default {
  name: "DeleteTag",
  props: {
    tag: {
      type: Object,
      required: true,
    },
  },
  methods: {
    ...mapActions(tagsStore, ["deleteTag"]),
  },
};
</script>
