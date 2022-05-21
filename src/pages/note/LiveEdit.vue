<template>
  <div class="flex h-fit justify-between gap-x-4 overflow-y-auto p-3">
    <div class="w-6/12">
      <input
        type="text"
        class="mb-3 w-full border-0 bg-dark text-2xl text-indigo-500 focus:ring-0"
        v-model="note.title"
        @blur="updateTitle"
      />
      <Editor ref="editor" />
    </div>
    <div class="w-6/12 pr-4">
      <h2 class="mb-6 text-4xl font-bold text-indigo-500">{{ note.title }}</h2>
      <Preview @checked="handleCheck" />
    </div>
  </div>
</template>
<script>
import Preview from "../../components/Note/Preview.vue";
import Editor from "../../components/Note/Editor.vue";
import { mapActions, mapMutations, mapState } from "vuex";
import updateTitle from "../../mixins/update-title";

export default {
  mixins: [updateTitle],
  components: {
    Preview,
    Editor,
  },
  computed: mapState("note", ["loaded", "note"]),
  methods: {
    ...mapActions("note", ["update"]),
    ...mapMutations("note", ["HANDLE_CHECKBOX"]),
    handleCheck(payload) {
      this.HANDLE_CHECKBOX(payload);
      this.$refs.editor.updateContentState();
    },
  },
};
</script>
