<template>
  <!-- Here the page where principal node is rendered -->
  <article class="article-container">
    <Node v-bind:nodeId="nodeId" />
  </article>
</template>

<script>
import Node from "../components/Node/Node.vue";
// @ is an alias to /src

export default {
  name: "NodeArticle",
  components: {
    Node
  },
  data: () => ({
    nodeId: ""
  }),
  beforeMount() {
    this.nodeId = this.$route.params.id;
  },
  // eslint-disable-next-line no-unused-vars
  beforeRouteUpdate(to, from, next) {
    this.nodeId = to.params.id;
  }
};
</script>

<style lang="less" scoped>
.article-container {
  padding: 50px;
}
</style>
