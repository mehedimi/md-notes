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
import { defaultHighlightStyle } from "@codemirror/highlight";
import { indentWithTab, defaultKeymap } from "@codemirror/commands";

import { EditorState } from "@codemirror/state";
import { markdown } from "@codemirror/lang-markdown";
import codeLanguages from "../../utils/code-languages";
import debounce from "lodash/debounce";

let view;

export default {
  components: {},
  computed: mapState("note", ["note", "loaded"]),
  methods: {
    ...mapMutations("note", ["SET_CONTENT"]),
    ...mapActions("note", ["updateContent"]),
    updateContentState() {
      if (!view) return;

      view.dispatch({
        changes: {
          from: 0,
          to: view.state.doc.length,
          insert: this.note.content || "",
        },
      });
    },
    updateDocContent: debounce(function () {
      this.SET_CONTENT(view.state.doc.toString());
      this.updateContent();
    }, 500),
  },
  mounted() {
    const state = EditorState.create({
      doc: this.note.content || "",
      extensions: [
        keymap.of([indentWithTab]),
        drawSelection(),
        defaultHighlightStyle.fallback,
        highlightActiveLine(),
        markdown({
          codeLanguages,
        }),
        keymap.of([...defaultKeymap]),
        EditorView.lineWrapping,
        EditorView.updateListener.of((v) => {
          if (v.docChanged) {
            this.updateDocContent();
          }
        }),
      ],
    });

    view = new EditorView({
      state,
      parent: this.$el,
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
