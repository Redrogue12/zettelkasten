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
      <div class="d-flex" v-else>
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
      <CreateTag />
    </Dialog>
    <Dialog v-if="edit" @close-dialog="edit = false">
      <EditTag
        :tag="selectedTag"
        @edited="
          edit = false;
          this.tags[selectedTag.index] = $event;
          selectedTag = null;
        "
      />
    </Dialog>
    <!-- eslint-disable -->
    <Dialog v-if="deleteTag" @close-dialog="deleteTag = false">
      <DeleteTag :tag="selectedTag" />
    </Dialog>
  </div>
</template>

<script>
import { TagPill, CreateTag, DeleteTag, EditTag } from "@/components/Tags";
import Dialog from "@/components/Dialog";
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
      tags: [],
    };
  },
  async created() {
    try {
      const response = await fetch("http://localhost:3000/tags");

      if (!response.ok) {
        this.error = true;
        throw new Error("Failed to fetch tags");
      }

      this.tags = await response.json();
    } catch (error) {
      console.error(error);
      this.error = true;
    }
  },
};
</script>
