<template>
  <div class="node-admin">
    <h1 id="form" class="uk-h1 tm-heading-fragment">
      <a href="#">Control panel</a>
    </h1>
    <div class="node-list-container uk-accordion-content">
      <ul>
        <li v-for="node in nodes" v-bind:key="node._id">
          <router-link :to="`/node/${node._id}`" uk-tooltip="go to node view">{{
            node.title
          }}</router-link>
          <router-link
            :to="`/editNode/${node._id}`"
            uk-tooltip="go to edit node"
          >
            <span uk-icon="icon: pencil"></span>
          </router-link>
          <span
            uk-tooltip="delete node"
            class="icon"
            uk-icon="icon: close"
            @click="deleteNode(node._id)"
          >
          </span>
        </li>
        <li>
          <input class="custom-small-input" v-model="newNode" />
          <button class="custom-small-button" @click="createNode">
            Add node
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="less" scoped>
.node-admin {
  padding: 50px;
  width: 100%;
}

.log-container,
.node-list-container {
  max-height: 500px;
  overflow-y: auto;
}

.tm-heading-fragment > a {
  color: inherit;
  text-decoration: none;
  font-weight: 300;
}
</style>

<script>
// @ is an alias to /src
import axios from "axios";
import UIkit from "uikit";

export default {
  name: "ControlPanel",
  data: () => ({
    apiNode: "",
    newNode: "",
    logs: [],
    nodes: []
  }),
  beforeMount() {
    this.apiNode = process.env.VUE_APP_BACKEND_API + "/node";
  },
  mounted() {
    this.refreshNodes();
  },
  methods: {
    createNode() {
      const newNode = { title: this.newNode };
      axios
        .post(this.apiNode, newNode)
        .then(response => {
          this.logs.push({
            type: "uk-text-success",
            message: JSON.stringify(response)
          });
          UIkit.notification(`Node created`, "success");
          this.refreshNodes();
        })
        .catch(err => {
          this.logs.push({
            type: "uk-text-danger",
            message: JSON.stringify(err)
          });
          UIkit.notification("Fail to create node", "danger");
        });
    },
    refreshNodes() {
      axios
        .get(this.apiNode + "/all/titleAndId")
        .then(response => {
          this.nodes = response.data;
        })
        .catch(err => {
          this.logs.push(JSON.stringify(err));
        });
    },
    deleteNode(nodeId) {
      let confirmDelete = confirm("are you sure you want to delete this node");
      if (confirmDelete) {
        axios
          .delete(this.apiNode + "/id/" + nodeId)
          .then(response => {
            UIkit.notification("Gutten", "success");
            this.refreshNodes();
            this.logs.push({
              type: "uk-text-success",
              message: JSON.stringify(response)
            });
          })
          .catch(err => {
            UIkit.notification("not gutten", "danger");
            this.logs.push({
              type: "uk-text-danger",
              message: JSON.stringify(err)
            });
          });
      }
    }
  }
};
</script>

<style scoped>
ul {
  list-style-type: none;
}

.icon {
  cursor: pointer;
}
</style>
