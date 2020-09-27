<template>
  <div class="NodeForm">
    <div class="uk-form-horizontal uk-margin-large">
      <div class="uk-margin" v-if="existentNodes.length > 0 && edit">
        <label class="uk-form-label" for="parent-selection">Node to edit</label>
        <div class="uk-form-controls">
          <select
            v-model="editNodeId"
            class="uk-select"
            @change="getEditNodeInfo"
          >
            <option
              v-for="node in existentNodes"
              v-bind:value="node._id"
              v-bind:key="node._id"
              >{{ node.title }}</option
            >
          </select>
        </div>
      </div>

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

      <div class="uk-margin" v-if="existentNodes.length > 0">
        <label class="uk-form-label" for="parent-selection">Parent</label>
        <div class="uk-form-controls">
          <select v-model="parent" class="uk-select">
            <option
              v-bind:value="node._id"
              v-for="node in existentNodes"
              v-bind:key="node._id"
              >{{ node.title }}</option
            >
          </select>
        </div>
      </div>

      <div class="uk-margin">
        <label class="uk-form-label" for="parent-selection">Content edit</label>
        <div class="uk-form-controls">
          <router-link
            :to="{ name: `NodeEditContent`, params: { nodeId: editNodeId } }"
            >Go to edit content page
          </router-link>
        </div>
      </div>

      <div class="uk-margin">
        <div class="uk-form-controls">
          <button
            class="uk-button uk-button-primary"
            @click="$emit('custom-submit', formInfo)"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
    <hr />
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "NodeForm",
  data: () => ({
    nodes: "",
    title: "",
    parent: "",
    apiNode: "",
    editNodeId: "",
    editNodeInfo: ""
  }),
  beforeMount() {
    this.apiNode = this.$store.getters.getBackendAPI + "/node";
  },
  computed: {
    formInfo() {
      return {
        title: this.title,
        parent: this.parent,
        id: this.id
      };
    }
  },
  props: {
    existentNodes: {
      type: Array,
      default: () => {
        return [];
      }
    },
    edit: {
      type: Boolean,
      default: () => {
        return false;
      }
    }
  },
  methods: {
    getEditNodeInfo(event) {
      var id = event.target.value;
      axios
        .get(this.apiNode + "/id/" + id)
        .then(response => {
          this.title = response.data.title;
          this.parent = response.data.parent;
        })
        .catch(err => console.log(err));
    }
  }
};
</script>

<style lang="less" scoped>
.uk-textarea {
  resize: vertical; /* user can resize vertically, but width is fixed */
  height: 100px;
}
</style>
