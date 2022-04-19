<template>
  <article
    class="prose prose-emerald font-encode prose-img:rounded"
    v-html="renderedContent"
  ></article>
</template>

<script>
import { marked } from "marked";
import { mapState } from "vuex";
import hljs from "highlight.js/lib/common";
import bash from "highlight.js/lib/languages/bash";

hljs.registerLanguage("bash", bash);

import "highlight.js/scss/github.scss";

marked.use({
  renderer: {
    code(code, infostring, escaped) {
      if (infostring) {
        return `<div class="highlighted-code">${
          hljs.highlight(code, {
            language: infostring.match(/shell|bash/) ? "bash" : infostring,
          }).value
        }</div>`;
      }
      return hljs.highlightAuto(code).value;
    },
  },
});

export default {
  computed: {
    ...mapState("note", ["note"]),
    renderedContent() {
      return marked.parse(this.note.content || "");
    },
  },
};
</script>

<style lang="scss">
.highlighted-code {
  white-space: pre;
}
</style>

<style lang="postcss">
.highlighted-code {
  @apply mb-3 rounded border p-3 font-fira-code text-sm leading-6;
}
</style>
