<template>
  <ul class="flex">
    <li
      v-for="(note, index) in notes"
      class="border-b-2 px-2"
      :class="
        note.id === +$route.params.noteId
          ? 'border-b-indigo-500 text-white'
          : 'border-b-sidebar text-gray-200'
      "
    >
      <router-link
        class="inline-block px-2 py-2 text-sm"
        :to="{
          name: 'notes.show',
          query: $route.query,
          params: { noteId: note.id },
        }"
        :class="
          note.id === +$route.params.noteId ? 'text-white' : 'text-gray-400'
        "
      >
        {{ note.title }}
      </router-link>
      <button
        class="text-gray-400 hover:text-white"
        @click.stop="remove(index)"
      >
        <i class="las la-times"></i>
      </button>
    </li>
  </ul>
</template>

<script>
import { mapGetters, mapMutations, mapState } from "vuex";

export default {
  computed: {
    ...mapGetters("tab", ["notes"]),
    ...mapState("tab", ["noteIds"]),
  },
  methods: {
    ...mapMutations("tab", ["REMOVE"]),
    remove(index) {
      let noteId = this.noteIds[index - 1];
      if (!noteId) {
        noteId = this.noteIds[index + 1];
      }

      if (this.$route.params.noteId !== this.noteIds[index]) {
        this.REMOVE(index);
        return;
      } else {
        this.REMOVE(index);
      }

      if (noteId === undefined) {
        this.$router.push({
          name: "notes.index",
        });
      } else {
        this.$router.push({
          name: "notes.show",
          params: {
            noteId,
          },
          query: this.$route.query,
        });
      }
    },
  },
};
</script>
