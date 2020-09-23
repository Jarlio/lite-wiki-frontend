<template>
  <article v-if="!error" class="uk-article">
    <h1 class="uk-article-title">
      <a class="uk-link-reset" href="">{{ node.title }}</a>
    </h1>

    <p>{{ node.introduction }}</p>
    <Content
      v-for="content in node.contents"
      v-bind:content="content"
      :key="content._id"
    ></Content>
  </article>

  <div v-if="error" class="uk-text-danger">
    <span>{{ error }}</span>
  </div>
</template>

<script>
import axios from "axios";
import Content from "./Content/Content";

export default {
  components: {
    Content
  },
  data: () => ({
    node: {},
    apiNode: "",
    error: null
  }),
  beforeMount() {
    const id = this.$route.params.id;
    this.apiNode = `${this.$store.getters.getBackendAPI}/node`;
    this.fetchNode(id);
  },
  // eslint-disable-next-line no-unused-vars
  beforeRouteUpdate(to, from, next) {
    const id = to.params.id;
    this.fetchNode(id);
  },
  methods: {
    fetchNode(id) {
      axios
        .get(`${this.apiNode}/id/${id}`)
        .then(response => {
          console.log(response.data);
          this.error = null;
          this.node = response.data;
        })
        .catch(err => {
          this.error = err;
        });
    }
  }
};
</script>
