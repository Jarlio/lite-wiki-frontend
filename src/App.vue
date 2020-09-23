<template>
  <!-- Tags open canvas -->
  <div id="offcanvas-usage" uk-offcanvas>
    <div class="uk-offcanvas-bar">
      <button class="uk-offcanvas-close" type="button" uk-close></button>
      <h3>Tags</h3>
      <Tags></Tags>
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
</style>
