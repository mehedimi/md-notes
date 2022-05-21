<template>
  <ul class="flex w-full overflow-x-auto">
    <li
      v-for="(note, index) in notes"
      class="border-b-2 px-1"
      :class="
        note.id === +$route.params.noteId
          ? 'border-b-indigo-500'
          : 'border-b-transparent'
      "
    >
      <router-link
        class="inline-block px-4 py-2 text-white"
        :to="{
          name: 'notes.show',
          query: $route.query,
          params: { noteId: note.id },
        }"
      >
        {{ note.title }}
      </router-link>
      <button class="text-white" @click.stop="remove(index)">
        <i class="las la-times"></i>
      </button>
    </li>
  </ul>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  computed: {
    ...mapGetters("tab", ["notes"]),
  },
  methods: {
    ...mapMutations("tab", ["REMOVE"]),
    remove(index) {
      this.REMOVE(index);
      if (!this.notes.length) {
        this.$router.push({
          name: "notes.index",
        });
      }
    },
  },
};
</script>
