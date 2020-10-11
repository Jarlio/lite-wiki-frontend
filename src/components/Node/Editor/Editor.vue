<template>
  <div class="content-container">
    <div class="content">
      <div class="editor uk-card uk-card-default" id="editorjs"></div>
    </div>
  </div>
</template>

<script>
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import Paragraph from "@editorjs/paragraph";
import List from "@editorjs/list";

export default {
  props: {
    nodeId: {
      type: String,
      default: () => null
    },
    initialData: {
      type: Object,
      default: () => {}
    }
  },
  data: () => ({
    editorConfig: {
      holder: "editorjs",
      tools: {
        header: Header,
        list: List,
        paragraph: Paragraph
      }
    }
  }),
  mounted() {
    this.initializeEditor();
  },
  beforeUnmount() {
    this.editor.destroy();
  },
  watch: {
    initialData: function() {
      console.log("watch:initialData");
      this.editor.destroy();
      console.log("watch:initialData:initializeEditor");
      this.initializeEditor();
    }
  },
  methods: {
    initializeEditor() {
      console.log("initializeEditor");
      this.editorConfig.onChange = () => {
        this.editor.save().then(result => {
          this.$emit("update-content", result);
        });
      };
      this.editorConfig.data = this.initialData;
      this.editor = new EditorJS(this.editorConfig);
    }
  }
};
</script>

<style scoped>
.content-container {
  display: flex;
  justify-content: center;
  width: calc(100% - 100px);
  margin: 50px;
}
.content {
  position: relative;
  max-width: 1000px;
  width: 100%;
}
.editor {
  overflow: auto;
  width: 1000px;
  height: calc(100vh - 500px);
}

* + hr,
* + .uk-hr {
  width: 100%;
  margin-top: 20px;
}

/* width */
::-webkit-scrollbar {
  width: 8px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: transparent;
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #e5e5e5;
  border-radius: 10px;
}

.info-icon {
  /* position: absolute; */
  right: 5px;
  top: 5px;
  z-index: 1;
}
</style>
