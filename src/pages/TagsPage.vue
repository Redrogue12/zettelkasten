<template>
  <div id="tags-page">
    <PageHeader
      :error="error"
      :user="user"
      pageType="Tags"
      :loading="loading"
      @create-clicked="create = true"
    >
      <div
        id="tags-page-tags-container"
        class="d-flex flex-wrap"
        v-if="tags.length > 0"
      >
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
    </PageHeader>
  </div>
</template>

<script>
import { TagPill, CreateTag, DeleteTag, EditTag } from "@/components/Tags";
import Dialog from "@/components/Dialog";
import PageHeader from "@/components/PageHeader";

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
    PageHeader,
  },
  data() {
    return {
      create: false,
      edit: false,
      deleteTag: false,
      selectedTag: null,
      loading: true,
      error: false,
    };
  },
  computed: {
    ...mapState(tagsStore, { tags: "getTags" }),
    ...mapState(userStore, { user: "getUser" }),
  },
  async created() {
    if (!this.user?.user_id) {
      this.error = true;
      return;
    }
    await this.fetchTags(this.user?.user_id)
      ?.then(() => {
        this.loading = false;
      })
      .catch(() => {
        this.error = true;
      });
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
