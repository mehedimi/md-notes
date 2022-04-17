<template>
  <div></div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import {
  EditorView,
  drawSelection,
  highlightActiveLine,
  keymap,
} from "@codemirror/view";
import { indentWithTab, defaultKeymap } from "@codemirror/commands";
import { defaultHighlightStyle } from "@codemirror/highlight";
import { LanguageSupport, LanguageDescription } from "@codemirror/language";

import { EditorState } from "@codemirror/state";
import { markdown } from "@codemirror/lang-markdown";
import debounce from "lodash/debounce";

let view;

export default {
  components: {},
  computed: mapState("note", ["note", "loaded"]),
  methods: {
    ...mapMutations("note", ["SET_CONTENT"]),
    ...mapActions("note", ["updateContent"]),
    updateContentState() {
      view.dispatch({
        changes: {
          from: 0,
          to: view.state.doc.length,
          insert: this.note.content || "",
        },
      });
    },
  },
  mounted() {
    const state = EditorState.create({
      doc: "",
      extensions: [
        keymap.of([indentWithTab]),
        drawSelection(),
        defaultHighlightStyle.fallback,
        highlightActiveLine(),
        markdown({
          codeLanguages: [
            LanguageDescription.of({
              name: "javascript",
              alias: ["js", "jsx"],
              async load() {
                const { javascriptLanguage } = await import(
                  "@codemirror/lang-javascript"
                );
                return new LanguageSupport(javascriptLanguage);
              },
            }),
            LanguageDescription.of({
              name: "css",
              async load() {
                const { cssLanguage } = await import("@codemirror/lang-css");
                return new LanguageSupport(cssLanguage);
              },
            }),
            LanguageDescription.of({
              name: "html",
              alias: ["htm"],
              async load() {
                const { htmlLanguage } = await import("@codemirror/lang-html");
                return new LanguageSupport(htmlLanguage);
              },
            }),
            LanguageDescription.of({
              name: "json",
              async load() {
                const { jsonLanguage } = await import("@codemirror/lang-json");
                return new LanguageSupport(jsonLanguage);
              },
            }),
            LanguageDescription.of({
              name: "php",
              async load() {
                const { phpLanguage } = await import("@codemirror/lang-php");
                return new LanguageSupport(phpLanguage);
              },
            }),
          ],
        }),
        keymap.of([...defaultKeymap]),
        EditorView.lineWrapping,
        EditorView.theme({
          $: {
            fontSize: "46pt",
          },
        }),
      ],
    });

    view = new EditorView({
      state,
      parent: this.$el,
      lineWrapping: true,
    });
  },
  watch: {
    loaded: {
      immediate: true,
      handler(status) {
        if (status) {
          this.updateContentState();
        }
      },
    },
  },
};
</script>

<style lang="postcss">
.note-edit > div {
  height: 100%;
  border-radius: 3px;
}
.cm-editor.cm-focused {
  outline: none !important;
}
</style>
