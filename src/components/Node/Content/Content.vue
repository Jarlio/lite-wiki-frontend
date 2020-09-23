<template>
  <Image v-if="content.type == 'image'"></Image>
  <List v-if="content.type == 'list'"></List>
  <Paragraph v-if="content.type == 'Paragraph'"></Paragraph>
</template>

<script>
import Image from "./Image";
import List from "./List";
import Paragraph from "./Paragraph";

export default {
  data: () => ({
    content: Object
  }),
  components: {
    Image,
    List,
    Paragraph
  }
};
</script>
