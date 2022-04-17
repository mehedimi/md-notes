<template>
  <div class="flex h-fit justify-between gap-x-4 overflow-y-auto p-3">
    <div class="w-6/12">
      <input
        type="text"
        class="mb-3 w-full border-0 text-2xl focus:ring-0"
        v-model="note.title"
        @blur="updateTitle"
      />
      <Editor />
    </div>
    <div class="w-6/12">
      <h2 class="mb-6 text-4xl font-bold">{{ note.title }}</h2>
      <Preview />
    </div>
  </div>
</template>
<script>
import Preview from "../../components/Note/Preview.vue";
import Editor from "../../components/Note/Editor.vue";
import { mapActions, mapState } from "vuex";
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
  },
};
</script>
