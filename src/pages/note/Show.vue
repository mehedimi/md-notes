<template>
  <div class="flex w-full flex-col flex-col-reverse justify-between pt-4">
    <div class="m-3 flex items-center justify-between">
      <Tooltip
        as="a"
        href="#"
        @click.prevent="SHOW_SIDEBAR(true)"
        :class="visibleSidebar ? 'invisible' : ''"
      >
        <i
          class="las la-columns text-xl text-gray-400 hover:text-emerald-500"
        ></i>
        <template v-slot:content>Show Sidebar </template>
      </Tooltip>

      <div class="note-actions flex items-center gap-x-3">
        <Tooltip as="div">
          <router-link
            :to="{ name: 'notes.edit', query: { page: 'edit' } }"
            class="border-b-2 border-b-transparent pb-1 text-xl text-gray-400 hover:border-b-emerald-400 hover:text-emerald-400"
          >
            <i class="las la-pencil-alt"></i>
          </router-link>
          <template v-slot:content>Edit</template>
        </Tooltip>

        <Tooltip as="div">
          <router-link
            :to="{ name: 'notes.view', query: { page: 'view' } }"
            class="border-b-2 border-b-transparent pb-1 text-xl text-gray-400 hover:border-b-emerald-400 hover:text-emerald-400"
          >
            <i class="las la-search"></i>
          </router-link>
          <template v-slot:content>Preview</template>
        </Tooltip>
        <Tooltip as="div">
          <router-link
            :to="{ name: 'notes.live-edit', query: { page: 'live-edit' } }"
            class="border-b-2 border-b-transparent pb-1 text-xl text-gray-400 hover:border-b-emerald-400 hover:text-emerald-400"
          >
            <i class="las la-columns"></i>
          </router-link>
          <template v-slot:content>Live Edit</template>
        </Tooltip>
      </div>
      <div class="note-actions flex items-center gap-x-2">
        <Tooltip
          as="a"
          href="#"
          class="border-b-2 border-b-transparent pb-1 text-xl text-gray-400 hover:border-b-emerald-500 hover:text-emerald-500"
        >
          <i class="las la-window-restore"></i>
          <template v-slot:content>Move</template>
        </Tooltip>
        <Tooltip
          as="a"
          href="#"
          class="border-b-2 border-b-transparent pb-1 text-xl text-red-500 hover:border-b-red-500"
        >
          <i class="las la-trash"></i>
          <template v-slot:content>Delete</template>
        </Tooltip>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import Note from "../../components/Note.vue";
import Tooltip from "../../components/Tooltip.vue";
import { mapMutations, mapState } from "vuex";

export default {
  components: {
    Note,
    Tooltip,
  },
  computed: {
    ...mapState("note", ["loaded"]),
    ...mapState("option", ["visibleSidebar"]),
  },
  methods: {
    ...mapMutations("option", ["SHOW_SIDEBAR"]),
    find() {
      this.$store.dispatch("note/show", this.$route.params.noteId);
    },
  },
  watch: {
    "$route.params.noteId": {
      handler() {
        this.find();
      },
      immediate: true,
    },
  },
};
</script>

<style lang="postcss">
.note-actions .router-link-active {
  @apply border-b-emerald-400 text-emerald-400;
}
</style>
