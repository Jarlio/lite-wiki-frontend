<template>
  <section v-if="!error" class="uk-article">
    <h1 class="uk-article-title">
      <a class="uk-link-reset" href="">{{ node.title }}</a>
    </h1>
    <hr />

    <Content></Content>
  </section>

  <div v-if="error" class="uk-text-danger">
    <span>{{ error }}</span>
  </div>
</template>

<script>
import axios from "axios";
import Content from "./Content/Content";

export default {
  props: {
    nodeId: String
  },
  components: {
    Content
  },
  data: () => ({
    node: {},
    apiNode: "",
    error: null
  }),
  beforeMount() {
    this.apiNode = `${this.$store.getters.getBackendAPI}/node`;
    this.fetchNode(this.nodeId);
  },
  methods: {
    fetchNode(id) {
      axios
        .get(`${this.apiNode}/id/${id}`)
        .then(response => {
          this.error = null;
          this.node = response.data;
        })
        .catch(err => {
          this.error = err;
        });
    }
  },
  watch: {
    nodeId(newVal) {
      this.fetchNode(newVal);
    }
  }
};
</script>
