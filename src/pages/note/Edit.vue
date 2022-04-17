<template>
  <div class="mx-auto h-fit w-11/12 overflow-y-auto">
    <input
      type="text"
      class="border- w-full border-0 border-b-transparent text-2xl focus:ring-0"
      placeholder="Enter your note title here"
      v-model="note.title"
    />
    <Editor class="mt-6" />
  </div>
</template>

<script>
import Editor from "../../components/Note/Editor.vue";
import { mapState } from "vuex";

export default {
  components: {
    Editor,
  },
  computed: mapState("note", ["note"]),
  data() {
    return {
      editorRender: true,
    };
  },
  beforeRouteUpdate() {
    this.editorRender = false;
    setTimeout(() => {
      this.editorRender = true;
    }, 0);
  },
};
</script>
