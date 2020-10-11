<template>
  <!-- Tags open canvas -->
  <div id="offcanvas-usage" uk-offcanvas>
    <div class="uk-offcanvas-bar">
      <button class="uk-offcanvas-close" type="button" uk-close></button>
      <h3>Tags</h3>
      <Tags :all-tags="this.$store.getters.allTags"></Tags>
    </div>
  </div>
  <!-- rest of the content -->
  <div>
    <Navbar></Navbar>
    <div class="main-page-container">
      <router-view />
    </div>
  </div>
</template>

<script>
import UIkit from "uikit";
import Icons from "uikit/dist/js/uikit-icons";
import Tags from "./components/Tags/Tags";
import Navbar from "./components/Navbar";

UIkit.use(Icons);
export default {
  name: "App",
  components: {
    Tags,
    Navbar
  },
  methos: {},
  beforeCreate() {
    this.$store.dispatch("fetchTags");
  }
};
</script>

<style lang="less">
@import "../node_modules/uikit/src/less/uikit.less";
.main-page-container {
  display: flex;
}

.tag-container {
  width: 400px;
  padding: 45px 45px 60px 45px;
}

.uk-input,
.uk-select,
.uk-textarea {
  border: 0 none;
  padding: 0 10px;
  background: #fff;
  color: #666;
  border: 1px solid #e5e5e5;
  transition: 0.2s ease-in-out;
  transition-property: color, background-color, border;
}

h1,
.uk-h1,
h2,
.uk-h2,
h3,
.uk-h3,
h4,
.uk-h4,
h5,
.uk-h5,
h6,
.uk-h6,
.uk-heading-small,
.uk-heading-medium,
.uk-heading-large,
.uk-heading-xlarge,
.uk-heading-2xlarge {
  margin: 0 0 20px 0;
  font-family: ProximaNova, -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-weight: 300;
  color: #222;
  text-transform: none;
}

.custom-small-input {
  background: transparent;
  margin: 0 10px 0 0;
}

.vl {
  width: 0px;
  border-left: solid 1px #e5e5e5;
}
</style>
