<template>
  <div class="h-fit overflow-y-auto px-6">
    <input
      type="text"
      class="w-full border-0 border-b-transparent px-0 text-2xl focus:ring-0"
      placeholder="Enter your note title here"
      v-model="note.title"
      @blur="updateTitle"
    />
    <Editor class="mt-6" />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import updateTitle from "../../mixins/update-title";
import Editor from "../../components/Note/Editor.vue";

export default {
  mixins: [updateTitle],
  components: {
    Editor,
  },
  computed: mapState("note", ["note"]),
  methods: {
    ...mapActions("note", ["update"]),
  },
};
</script>
