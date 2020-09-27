<template>
  <div class="node-admin">
    <h1 id="form" class="uk-h1 tm-heading-fragment">
      <a href="#">Node admin control panel</a>
    </h1>
    <ul uk-accordion>
      <li class="uk-close">
        <a class="uk-accordion-title" href="#">New node</a>
        <div class="uk-accordion-content">
          <NodeForm
            @custom-submit="createNode"
            v-bind:existent-nodes="nodes"
          ></NodeForm>
        </div>
      </li>
      <li class="uk-close">
        <a class="uk-accordion-title" href="#">Edit node</a>
        <div class="uk-accordion-content">
          <!-- edit: Boolean: tell if is edit form, if not is create -->
          <NodeForm
            v-bind:edit="true"
            @custom-submit="editNode"
            v-bind:existent-nodes="nodes"
          ></NodeForm>
        </div>
      </li>
      <li class="uk-close">
        <a class="uk-accordion-title" href="#">Log</a>
        <div class="log-container uk-accordion-content">
          <p
            v-for="(log, index) in logs"
            v-bind:class="[log.type]"
            v-bind:key="index"
          >
            {{ log.message }}
          </p>
        </div>
      </li>
      <li class="uk-close">
        <a class="uk-accordion-title" href="#">Nodes</a>
        <div class="node-list-container uk-accordion-content">
          <button @click="refreshNodes" class="uk-button uk-button-primary">
            Refresh buttons
          </button>
          <ul>
            <li v-for="node in nodes" v-bind:key="node._id">
              <router-link :to="`/node/${node._id}`">{{
                node.title
              }}</router-link>
              <span uk-icon="icon: close" @click="deleteNode(node._id)"></span>
            </li>
          </ul>
        </div>
      </li>
    </ul>
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
import NodeForm from "./../components/Node/NodeForm";
import axios from "axios";
import UIkit from "uikit";

export default {
  name: "Home",
  data: () => ({
    apiNode: "",
    node: "",
    logs: [],
    nodes: []
  }),
  beforeMount() {
    this.apiNode = this.$store.getters.getBackendAPI + "/node";
  },
  mounted() {
    this.refreshNodes();
  },
  components: {
    NodeForm
  },
  methods: {
    createNode(event) {
      axios
        .post(this.apiNode, event)
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
    editNode(event) {
      axios
        .put(`${this.apiNode}/id/${event.id}`, event)
        .then(response => {
          this.logs.push({
            type: "uk-text-success",
            message: JSON.stringify(response)
          });
          UIkit.notification("Gutten", "success");
          this.refreshNodes();
        })
        .catch(err => {
          this.logs.push({
            type: "uk-text-danger",
            message: JSON.stringify(err)
          });
          UIkit.notification("not gutten", "danger");
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
};
</script>
