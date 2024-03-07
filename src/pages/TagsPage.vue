<template>
  <div class="container" v-if="error">
    <h3>Error fetching tags</h3>
  </div>
  <div class="container h-100" v-else>
    <p class="mt-3 mb-0 ml-3">Welcome, {{ user?.username }}!</p>
    <div class="d-flex align-items-baseline">
      <h1 class="m-3">Tags</h1>
      <font-awesome-icon
        class="pointer fa-xl"
        icon="plus"
        @click.stop="create = true"
      />
    </div>
    <div class="d-flex flex-wrap" v-if="tags.length > 0">
      <tag-pill
        class="tag-pill"
        :style="{ animationDelay: `${i * 0.1}s` }"
        v-for="(tag, i) in tags"
        :key="tag.tag_id"
        :tag="tag"
        @click.stop="
          selectedTag = { ...tag, index: i };
          edit = true;
        "
      />
    </div>
    <div class="center-content" v-else>
      <h3 class="ml-3 text-muted">Click + to start writing your first tag</h3>
    </div>
    <Dialog v-if="create" @close-dialog="create = false">
      <CreateTag @created="create = false" />
    </Dialog>
    <Dialog v-if="edit" @close-dialog="edit = false">
      <EditTag
        :tag="selectedTag"
        @delete="deleteTag = true"
        @edited="
          edit = false;
          selectedTag = null;
        "
      />
    </Dialog>
    <Dialog v-if="deleteTag" @close-dialog="deleteTag = false">
      <DeleteTag :tag="selectedTag" @deleted="onDelete" />
    </Dialog>
  </div>
</template>

<script>
import { TagPill, CreateTag, DeleteTag, EditTag } from "@/components/Tags";
import Dialog from "@/components/Dialog";

import { useTagsStore as tagsStore } from "@/stores/tagsStore";
import { useUserStore as userStore } from "@/stores/userStore";
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
      create: false,
      edit: false,
      deleteTag: false,
      selectedTag: null,
    };
  },
  computed: {
    ...mapState(tagsStore, { tags: "getTags", error: "error" }),
    ...mapState(userStore, { user: "getUser" }),
  },
  async created() {
    this.fetchTags(this.user?.user_id);
  },
  methods: {
    ...mapActions(tagsStore, ["fetchTags"]),
    onDelete() {
      this.deleteTag = false;
      this.edit = false;
      this.selectedTag = null;
    },
  },
};
</script>

<style scoped>
.tag-pill {
  opacity: 0;
  transition: transform 0.3s ease, scale 0.1s ease;
  animation: dropIn 0.5s ease-out forwards;
}

.tag-pill:hover {
  transform: scale(1.1) !important;
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.2);
}
</style>
