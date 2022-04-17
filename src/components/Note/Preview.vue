<template>
  <article
    class="prose prose-emerald font-encode"
    v-html="renderedContent"
  ></article>
</template>

<script>
import { mapState } from "vuex";
import { marked } from "marked";

export default {
  computed: {
    ...mapState("note", ["note"]),
    renderedContent() {
      return marked.parse(this.note.content || "");
    },
  },
};
</script>
