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
import axios from "axios";
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
    apiTags: "",
    availableTags: [],
    updatedTags: []
  }),
  watch: {
    propsTags() {
      console.log("watch:propsTags:");
      // this.refreshTags(newTags);
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
    refreshTags(newTags) {
      let tags = newTags ? newTags : this.allTags;
      /* reset tags */
      this.availableTags = [];
      this.updatedTags = [];
      axios
        .get(this.apiTags)
        .then(response => {
          console.log(response.data);
          response.data.forEach(tag => {
            if (tags.indexOf(tag._id) != -1) {
              this.updatedTags.push(tag);
            } else {
              this.availableTags.push(tag);
            }
          });
        })
        .catch(err => {
          console.error(err);
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
