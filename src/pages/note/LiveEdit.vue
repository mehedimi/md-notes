<template>
  <div class="flex h-fit justify-between gap-x-4 overflow-y-auto p-3">
    <Editor />
    <Preview />
  </div>
</template>
<script>
import Preview from "../../components/Note/Preview.vue";
import Editor from "../../components/Note/Editor.vue";
import { mapState } from "vuex";

export default {
  components: {
    Preview,
    Editor,
  },
  computed: mapState("note", ["loaded"]),
};
</script>
