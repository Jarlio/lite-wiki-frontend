<template>
  <div class="node-form">
    <div class="uk-form-horizontal uk-margin-large">
      <div class="uk-margin">
        <label class="uk-form-label" for="form-horizontal-text">Title</label>
        <div class="uk-form-controls">
          <input
            class="uk-input"
            type="text"
            v-model="title"
            placeholder="Title of the node..."
          />
        </div>
      </div>
      <hr />
      <div class="editor-container">
        <p>
          Here you can edit the content of the node: '+' to select content type:
          list, paragraph, etc...
        </p>
        <Editor
          v-if="dataReady"
          :initial-data="initialContent"
          @update-content="updateContent"
        ></Editor>
      </div>
      <hr />
      <EditorTags
        @update-tag="updateTag"
        :all-tags="$store.getters.allTags"
        :props-tags="initialTags"
      ></EditorTags>
      <hr />

      <div class="uk-margin">
        <div class="uk-form-controls">
          <button class="uk-button uk-button-primary" @click="saveNode">
            Submit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Editor from "./Editor/Editor.vue";
import EditorTags from "./Editor/EditorTags.vue";
import UIkit from "uikit";

export default {
  name: "EditNode",
  components: {
    Editor,
    EditorTags
  },
  data: () => ({
    title: "", // you can search the node by this title
    id: "",
    initialContent: {},
    content: {}, // paragraph, images, headers and lists interpreted by editor.js
    parent: "", // id of perent
    availableParents: [], // available potential parents of this node
    tags: [], // tags of this node
    initialTags: [],
    existentTags: [], // available potential tags for this node
    logs: [], // for debuging use
    dataReady: false
  }),
  created() {
    this.apiNode = process.env.VUE_APP_BACKEND_API + "/node";
    this.id = this.$route.params.id;
    this.getEditNodeInfo(this.id);
  },
  // eslint-disable-next-line no-unused-vars
  beforeRouteUpdate(to, from, next) {
    this.id = to.params.id;
    this.getEditNodeInfo(this.id);
  },
  computed: {
    formInfo() {
      return {
        title: this.title,
        parent: this.parent,
        id: this.id,
        content: this.content,
        tags: this.tags
      };
    }
  },
  methods: {
    updateContent(event) {
      this.content = event;
    },
    updateTag(event) {
      console.log("event:", event);
      this.tags = event;
    },
    getEditNodeInfo(id) {
      axios
        .get(this.apiNode + "/id/" + id)
        .then(response => {
          this.title = response.data.title;
          this.content = response.data.content;
          this.initialContent = response.data.content;
          this.initialTags = response.data.tags;
          this.dataReady = true;
          console.log("getEditNodeInfo:", response);
        })
        .catch(err => console.log(err));
    },
    saveNode() {
      console.log("this.formInfo", this.formInfo);
      axios
        .put(`${this.apiNode}/id/${this.id}`, this.formInfo)
        .then(response => {
          this.logs.push({
            type: "uk-text-success",
            message: JSON.stringify(response)
          });
          UIkit.notification("Gutten", "success");
          this.initialContent = this.content;
          this.initialTags = this.tags.map(el => el._id);
        })
        .catch(err => {
          this.logs.push({
            type: "uk-text-danger",
            message: JSON.stringify(err)
          });
          UIkit.notification("not gutten", "danger");
        });
    }
  }
};
</script>

<style lang="less" scoped>
.uk-textarea {
  resize: vertical; /* user can resize vertically, but width is fixed */
  height: 100px;
}

.editor-container {
  width: 100%;
  position: relative;
}

.node-form {
  padding: 50px;
  width: 100%;
}
</style>
