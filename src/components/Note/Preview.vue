<template>
  <article
    class="prose font-encode prose-headings:text-heading prose-p:text-light prose-a:text-heading prose-strong:text-light prose-li:text-light prose-li:marker:text-light prose-img:rounded"
    v-html="renderedContent"
  ></article>
</template>

<script>
import { marked } from "marked";
import { mapState } from "vuex";
import hljs from "highlight.js/lib/common";
import bash from "highlight.js/lib/languages/bash";

hljs.registerLanguage("bash", bash);

import "highlight.js/scss/atom-one-dark.scss";

marked.use({
  renderer: {
    code(code, infostring) {
      return `<div class="highlighted-code overflow-x-auto">${
        infostring
          ? hljs.highlight(code, {
              language: infostring.match(/shell|bash/) ? "bash" : infostring,
            }).value
          : hljs.highlightAuto(code).value
      }</div>`;
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
  @apply mb-3 rounded bg-sidebar p-3 font-fira-code text-sm leading-6 text-[#abb2bf];
}
input[type="checkbox"] {
  @apply rounded border-white;
}
</style>
