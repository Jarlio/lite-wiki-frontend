<template>
  <div class="tags-container">
    <!-- tags that are already associated with this node -->
    <div class="existent-tags tags">
      <p>Taguri existente</p>
      <WiTag
        v-for="tag in updatedTags"
        :has-delete="false"
        :tagInfo="tag"
        :key="tag.id"
        :arrayName="'updatedTags'"
        :destinationArrayName="'availableTags'"
        @move-tag="moveTag"
        @delete-tag="deleteTag"
      ></WiTag>
    </div>
    <div class="vl"></div>
    <!-- tags that can be added to the article -->
    <div class="available-tags tags">
      <p>Taguri valabile</p>
      <WiTag
        v-for="tag in availableTags"
        :has-delete="false"
        :tagInfo="tag"
        :key="tag.id"
        :arrayName="'availableTags'"
        :destinationArrayName="'updatedTags'"
        @move-tag="moveTag"
        @delete-tag="deleteTag"
      ></WiTag>
    </div>
  </div>
</template>

<script>
import WiTag from "../../Tags/WiTag";

export default {
  props: {
    allTags: {
      type: Array,
      default: () => []
    },
    propsTags: {
      type: Array,
      default: () => []
    }
  },
  components: {
    WiTag
  },
  data: () => ({
    availableTags: [],
    updatedTags: []
  }),
  watch: {
    propsTags(newValue) {
      console.log("watch:propsTags:");
      this.refreshTags(null, newValue);
    },
    allTags(newValue) {
      console.log("watch:propsTags:");
      this.refreshTags(newValue);
    }
  },
  created() {
    console.log("mounted:");
    this.refreshTags();
  },
  beforeUnmount() {
    this.availableTags = [];
    this.updatedTags = [];
  },
  methods: {
    moveTag(event) {
      const { tagId, arrayName, destinationArrayName } = event;
      const removeIndex = this[arrayName]
        .map(function(obj) {
          return obj._id;
        })
        .indexOf(tagId);

      if (removeIndex > -1) {
        const searchEl = this[arrayName].find(obj => tagId == obj._id);
        this[arrayName].splice(removeIndex, 1);
        this[destinationArrayName].push(searchEl);
        this.$emit("update-tag", this.updatedTags);
      }
    },
    deleteTag() {
      return false;
    },
    refreshTags(newTags, propsTagsParam) {
      let tags = newTags ? newTags : this.allTags;
      let propsTags = propsTagsParam ? propsTagsParam : this.propsTags;
      console.log("refreshTags:tags", tags);
      console.log("refreshTags:propsTags", propsTags);
      /* reset tags */
      this.availableTags = [];
      this.updatedTags = [];
      tags.forEach(tag => {
        if (propsTags.indexOf(tag._id) !== -1) {
          this.updatedTags.push(tag);
        } else {
          this.availableTags.push(tag);
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.tags-container {
  display: flex;
  justify-content: space-evenly;
  > div.tags {
    width: 40%;
  }
}
</style>
