<template>
  <div class="tags">
    <div class="tag-form uk-nav uk-nav-default tm-nav">
      <h4 class="uk-nav-header">Add new tag | Admin only</h4>
      <TagForm @add-new-tag="addNewTag($event)"></TagForm>
    </div>

    <div class="uk-nav uk-nav-default tm-nav">
      <h4 class="uk-nav-header">Available tags</h4>
      <WiTag
        v-for="tag in tags"
        :has-delete="true"
        :tagInfo="tag"
        :key="tag.id"
        :arrayName="'tags'"
        :destinationArrayName="'selectedTags'"
        @move-tag="moveTag"
        @delete-tag="deleteTag"
      ></WiTag>
    </div>
    <div class="uk-nav uk-nav-default tm-nav">
      <h4 class="uk-nav-header">Selected Tags</h4>
      <WiTag
        v-for="tag in selectedTags"
        :has-delete="true"
        :tagInfo="tag"
        :key="tag.id"
        :arrayName="'selectedTags'"
        :destinationArrayName="'tags'"
        @move-tag="moveTag"
        @delete-tag="deleteTag"
      ></WiTag>
    </div>
    <button class="uk-button uk-button-primary uk-margin uk-width-1-1">
      Search
    </button>
  </div>
</template>

<script>
import WiTag from "./WiTag";
import TagForm from "./TagForm";

import axios from "axios";

export default {
  name: "Tags",
  components: {
    TagForm,
    WiTag
  },
  props: {
    allTags: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    // when all tags in props are loaded, refresh the tags
    allTags(newValue) {
      this.tags = newValue;
      this.selectedTags = [];
    }
  },
  data: () => ({
    selectedTags: [],
    tags: [],
    apiTag: ""
  }),
  beforeMount() {
    var url = process.env.VUE_APP_BACKEND_API;
    this.apiTag = url + "/tag";
    this.tags = this.allTags;
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
      }
    },
    addNewTag(newTag) {
      axios
        .post(this.apiTag, {
          name: newTag.name,
          description: newTag.description
        })
        .then(response => {
          this.tags.push(response.data);
          /* refresh tags from store */
          this.$store.dispatch("fetchTags");
        })
        .catch(error => {
          console.error("addnewtag failed: ", error);
        });
    },

    deleteTag(event) {
      const { tagId, arrayName } = event;
      let confDeleteNode = confirm("Confirm delete tag");
      if (confDeleteNode) {
        axios
          .delete(`${this.apiTag}/id/${tagId}`)
          .then(() => {
            const removeIndex = this[arrayName]
              .map(function(obj) {
                return obj._id;
              })
              .indexOf(tagId);

            if (removeIndex > -1) this[arrayName].splice(removeIndex, 1);
            /* refresh tags from store */
            this.$store.dispatch("fetchTags");
          })
          .catch(error => {
            console.error("addnewtag failed: ", error);
          });
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.tm-nav .uk-nav-header {
  padding: 8px 0;
  margin-bottom: 10px;
  border-bottom: 1px solid #e5e5e5;
}
</style>
