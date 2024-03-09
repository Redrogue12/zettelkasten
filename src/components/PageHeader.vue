<template>
  <div class="container" v-if="error">
    <h3>Failed to fetch {{ pageType?.toLowerCase() }}</h3>
  </div>
  <div class="container h-100" v-else-if="!loading">
    <p class="mt-3 mb-0 ml-3">Welcome, {{ user?.username }}!</p>
    <div class="d-flex align-items-baseline">
      <h1 class="m-3">{{ pageType }}</h1>
      <font-awesome-icon
        class="pointer fa-xl"
        icon="plus"
        @click.stop="$emit('create-clicked')"
      />
    </div>
    <slot />
  </div>
  <div class="center-content" v-else>
    <font-awesome-icon class="fa-3x fa-spin" icon="spinner" />
  </div>
</template>

<script>
export default {
  name: "PageHeader",
  props: {
    error: Boolean,
    user: Object,
    pageType: String,
    loading: Boolean,
  },
  emits: ["create-clicked"],
};
</script>
