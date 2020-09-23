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
        :tagInfo="tag"
        :key="tag.id"
        :arrayName="'tags'"
        :destinationArrayName="'selectedTags'"
        @move-tag="moveTag($event)"
        @delete-tag="deleteTag($event)"
      ></WiTag>
    </div>
    <div class="uk-nav uk-nav-default tm-nav">
      <h4 class="uk-nav-header">Selected Tags</h4>
      <WiTag
        v-for="tag in selectedTags"
        :tagInfo="tag"
        :key="tag.id"
        :arrayName="'selectedTags'"
        :destinationArrayName="'tags'"
        @move-tag="moveTag($event)"
        @delete-tag="deleteTag($event)"
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
  data: () => ({
    selectedTags: [],
    tags: [],
    apiTag: "",
    apiGetAllTags: ""
  }),
  beforeMount() {
    this.apiTag = this.$store.getters.getBackendAPI + "/tag";
    this.apiGetAllTags = this.$store.getters.getBackendAPI + "/tag/all";
    this.populateTags();
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

    populateTags() {
      axios
        .get(this.apiGetAllTags)
        .then(results => (this.tags = results.data))
        .catch(error => console.log(error));
    },

    addNewTag(newTag) {
      axios
        .post(this.apiTag, {
          name: newTag.name,
          description: newTag.description
        })
        .then(response => {
          this.tags.push(response.data);
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
