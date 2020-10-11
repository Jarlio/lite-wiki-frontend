<template>
  <div class="tag uk-label">
    <span
      :id="tagInfo._id"
      :uk-tooltip="tagInfo.description"
      @click="
        $emit('move-tag', {
          tagId: tagInfo._id,
          arrayName,
          destinationArrayName
        })
      "
      >{{ tagInfo.name }}</span
    >
    <span
      :v-if="hasDelete"
      uk-icon="icon: close;"
      @click="
        $emit('delete-tag', {
          tagId: tagInfo._id,
          arrayName
        })
      "
    ></span>
  </div>
</template>

<script>
export default {
  name: "WiTag",
  props: {
    tagInfo: Object,
    arrayName: String,
    destinationArrayName: String,
    hasDelete: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="less" scoped>
.tag {
  span {
    margin: 0 2px;
  }

  span.uk-icon {
    cursor: pointer;
  }

  margin: 5px;
}
</style>
