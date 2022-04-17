<template>
  <div class="mx-auto h-fit w-11/12 overflow-y-auto">
    <input
      type="text"
      class="border- w-full border-0 border-b-transparent text-2xl focus:ring-0"
      placeholder="Enter your note title here"
      v-model="note.title"
      @blur="updateTitle"
    />
    <Editor class="mt-6" />
  </div>
</template>

<script>
import Editor from "../../components/Note/Editor.vue";
import { mapActions, mapState } from "vuex";
import updateTitle from "../../mixins/update-title";

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
