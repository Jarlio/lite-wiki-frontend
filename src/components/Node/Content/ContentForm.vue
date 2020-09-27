<template>
  <div class="content-container">
    <div class="content">
      <h1>Here you can edit the content {{ nodeId }}</h1>
      <p>
        Aici poti edita content-ul nodului. Poti adauga imagini, crea liste si
        paragrafe. Contentul core-ul de informatie al acestui articol wiki.
        Recomand sa ramai la un singur subiect pe nod scris cat mai concis si pe
        scurt. Daca subiectul este detaliat si se poate impartii pe mai multe
        subiecte recomand sa creezi alte noduri.
      </p>
      <hr class="uk-margin" />
      <div class="editor" id="editorjs"></div>
      <hr class="uk-margin" />
      <button @click="saveContent" class="uk-button uk-button-primary">
        Save
      </button>
    </div>
  </div>
</template>

<script>
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import Paragraph from "@editorjs/paragraph";
import List from "@editorjs/list";

var editorConfig = {
  holder: "editorjs",
  autofocus: true,
  /**
   * This Tool will be used as default
   */
  initialBlock: "paragraph",
  tools: {
    header: {
      class: Header,
      shortcut: "CMD+SHIFT+H"
    },
    list: {
      class: List,
      data: {
        style: "unordered"
      }
    },
    paragraph: {
      class: Paragraph,
      config: {
        placeholder: "."
      }
    }
  },
  onReady: function() {
    console.log("ready");
  },
  onChange: function() {
    console.log("change");
  }
};

export default {
  props: {
    nodeId: {
      type: String,
      default: () => null
    }
  },
  data: () => ({
    data: Object,
    editor: Object,
    value: Object
  }),
  mounted: function() {
    this.initializeEditor();
  },
  methods: {
    saveContent() {
      this.editor.save().then(savedData => {
        console.log(savedData);
        this.value = savedData;
      });
    },
    initializeEditor() {
      this.editor = new EditorJS(editorConfig);
    }
  }
};
</script>

<style scoped>
.content-container {
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 50px;
}
.content {
  max-width: 1000px;
  width: 100%;
  /* display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column; */
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
</style>
