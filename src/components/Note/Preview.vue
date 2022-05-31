<template>
  <article
    class="prose:prose-indigo prose min-w-full font-encode prose-headings:text-indigo-500 prose-p:text-light prose-a:text-indigo-500 prose-strong:text-light prose-code:rounded prose-code:bg-indigo-600 prose-code:py-0.5 prose-code:px-1 prose-code:font-normal prose-code:text-white prose-code:before:content-[''] prose-code:after:content-[''] prose-li:text-light prose-li:marker:text-light prose-img:rounded"
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

const aliases = {
  shell: "bash",
  zsh: "bash",
};

marked.use({
  renderer: {
    code(code, infostring) {
      let lang;

      if (infostring) {
        lang = aliases[infostring] || infostring;
      }

      return `<div class="overflow-x-auto"><div class="highlighted-code">${
        lang
          ? hljs.highlight(code, {
              language: hljs.getLanguage(lang) ? lang : "plaintext",
            }).value
          : hljs.highlightAuto(code).value
      }</div></div>`;
    },
    checkbox(checked) {
      return `<input type="checkbox"${
        checked ? 'checked=""' : ""
      } class="checkbox cursor-pointer"> `;
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
  mounted() {
    this.$el.addEventListener(
      "click",
      ({ target }) => {
        if (!target.classList.contains("checkbox")) return;
        this.$emit("checked", {
          text: target.parentNode.innerText.split("\n")[0].trim(),
          checked: target.checked,
        });
      },
      false
    );
  },
};
</script>

<style lang="scss">
.highlighted-code {
  white-space: pre;
  @apply inline-block;
}
</style>

<style lang="postcss">
.highlighted-code {
  @apply mb-3 rounded bg-sidebar p-3 font-fira-code text-sm leading-6 text-[#abb2bf];
}
input[type="checkbox"] {
  @apply rounded border-white;
}
input[type="checkbox"]:checked {
  @apply bg-indigo-600;
}
input[type="checkbox"]:checked:hover {
  @apply bg-indigo-600;
}
</style>
