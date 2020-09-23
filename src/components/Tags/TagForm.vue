<template>
  <div>
    <input
      class="uk-input uk-margin"
      v-model="name"
      placeholder="the name of the new tag"
    />
    <textarea
      class="uk-textarea uk-margin"
      v-model="description"
      placeholder="description for new tag (optional)"
    ></textarea>
    <button
      @click="$emit('add-new-tag', newTag)"
      class="uk-button uk-button-primary uk-margin uk-width-1-1"
    >
      Add tag
    </button>
  </div>
</template>

<script>
export default {
  name: "TagForm",
  data: () => ({
    name: "",
    description: ""
  }),
  computed: {
    newTag() {
      return {
        name: this.name,
        description: this.description
      };
    }
  }
};
</script>

<style lang="less" scoped>
.uk-margin {
  margin: 5px 0;
}
</style>
