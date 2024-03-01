<template>
  <div class="container" v-if="error">
    <h3>Error fetching tags</h3>
  </div>
  <div class="container" v-else>
    <div class="d-flex align-items-baseline">
      <h1 class="m-3">Tags</h1>
      <font-awesome-icon
        class="pointer fa-xl"
        icon="plus"
        @click.stop="create = true"
      />
    </div>
    <div>
      <div v-if="tags.length === 0">
        <h3>No tags found</h3>
      </div>
      <div class="d-flex flex-wrap" v-else>
        <tag-pill
          v-for="(tag, i) in tags"
          :key="tag.tag_id"
          :tag="tag"
          @click.stop="
            selectedTag = { ...tag, index: i };
            edit = true;
          "
        />
      </div>
    </div>
    <Dialog v-if="create" @close-dialog="create = false">
      <CreateTag @created="create = false" />
    </Dialog>
    <Dialog v-if="edit" @close-dialog="edit = false">
      <EditTag
        :tag="selectedTag"
        @edited="
          edit = false;
          selectedTag = null;
        "
      />
    </Dialog>
    <Dialog v-if="deleteTag" @close-dialog="deleteTag = false">
      <DeleteTag :tag="selectedTag" />
    </Dialog>
  </div>
</template>

<script>
import { TagPill, CreateTag, DeleteTag, EditTag } from "@/components/Tags";
import Dialog from "@/components/Dialog";

import { useTagsStore as tagsStore } from "@/stores/tagsStore";
import { mapActions, mapState } from "pinia";
export default {
  name: "TagsPage",
  components: {
    TagPill,
    CreateTag,
    DeleteTag,
    EditTag,
    Dialog,
  },
  data() {
    return {
      error: false,
      create: false,
      edit: false,
      deleteTag: false,
      selectedTag: null,
    };
  },
  computed: {
    ...mapState(tagsStore, ["tags", "error"]),
  },
  async created() {
    this.fetchTags();
  },
  methods: {
    ...mapActions(tagsStore, ["fetchTags"]),
  },
};
</script>
