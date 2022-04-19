<template>
  <div class="flex w-full flex-col">
    <div class="mx-3 flex items-center justify-between py-2">
      <Tooltip as="a" href="#" @click.prevent="SHOW_SIDEBAR(!visibleSidebar)">
        <i
          class="las la-angle-left text-xl text-gray-400 transition hover:text-emerald-500"
          :class="visibleSidebar ? '' : 'rotate-180 transform'"
        ></i>
        <template v-slot:content
          >{{ visibleSidebar ? "Hide" : "Show" }} Sidebar
        </template>
      </Tooltip>

      <div class="note-actions flex items-center gap-x-3">
        <Tooltip as="div" v-for="page in pages">
          <router-link
            :to="{ name: `notes.${page.name}`, query: { page: page.name } }"
            class="rounded border border-sidebar py-1 px-2 text-xl text-gray-400 hover:border-emerald-400 hover:text-emerald-400"
          >
            <i class="las" :class="page.icon"></i>
          </router-link>
          <template v-slot:content>{{ page.text }}</template>
        </Tooltip>
      </div>

      <div class="note-actions flex items-center gap-x-2">
        <Tooltip
          as="a"
          href="#"
          class="rounded border border-sidebar px-2 py-0.5 text-xl text-gray-400 hover:border-emerald-400 hover:bg-emerald-400 hover:text-white"
        >
          <i class="las la-window-restore"></i>
          <template v-slot:content>Move</template>
        </Tooltip>
        <Popover class="relative">
          <PopoverButton as="template">
            <Tooltip
              as="a"
              href="#"
              @click.prevent
              class="rounded border border-sidebar px-2 py-0.5 text-xl text-red-500 hover:border-red-500 hover:bg-red-500 hover:text-white"
            >
              <i class="las la-trash"></i>
              <template v-slot:content>Delete</template>
            </Tooltip>
          </PopoverButton>

          <transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="translate-y-1 opacity-0"
            enter-to-class="translate-y-0 opacity-100"
            leave-active-class="transition duration-150 ease-in"
            leave-from-class="translate-y-0 opacity-100"
            leave-to-class="translate-y-1 opacity-0"
          >
            <PopoverPanel
              class="absolute top-10 right-0 z-10 w-80 rounded border border-sidebar bg-white shadow-lg shadow-sidebar"
              v-slot="{ close }"
            >
              <h2 class="border-b border-b-sidebar py-2 px-4 text-sm font-bold">
                Warning!
              </h2>
              <div class="p-4">
                <p class="mb-2 text-sm">
                  Are you sure you want to delete this note?
                </p>
                <div class="mt-4 text-right">
                  <button
                    class="mr-3 rounded border px-3 py-1 text-xs shadow shadow-sidebar hover:bg-gray-50"
                    @click="close"
                  >
                    Cancel
                  </button>
                  <button
                    class="rounded border border-red-500 bg-red-500 px-3 py-1 text-xs text-white hover:bg-red-600"
                    @click="handleDelete(close)"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </PopoverPanel>
          </transition>
        </Popover>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import Note from "../../components/Note.vue";
import Tooltip from "../../components/Tooltip.vue";
import { mapMutations, mapState, mapActions } from "vuex";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue";

export default {
  components: {
    Note,
    Tooltip,
    PopoverPanel,
    PopoverButton,
    Popover,
  },
  computed: {
    ...mapState("note", ["loaded"]),
    ...mapState("option", ["visibleSidebar"]),
  },
  data() {
    return {
      pages: [
        {
          name: "edit",
          icon: "la-pencil-alt",
          text: "Edit",
        },
        {
          name: "view",
          icon: "la-search",
          text: "Preview",
        },
        {
          name: "live-edit",
          icon: "la-columns",
          text: "Live Edit",
        },
      ],
    };
  },
  mounted() {
    window.addEventListener("keyup", this.handleMode);
  },
  methods: {
    ...mapMutations("option", ["SHOW_SIDEBAR"]),
    ...mapActions("note", ["delete"]),
    find() {
      this.$store.dispatch("note/show", this.$route.params.noteId);
    },
    handleMode(e) {
      if (!e.altKey) return;
      const currentModeIndex = this.pages.findIndex(
        (page) => "notes." + page.name === this.$route.name
      );

      switch (e.keyCode) {
        case 39:
          if (currentModeIndex < 2) {
            this.$router.push({
              name: `notes.${this.pages[currentModeIndex + 1].name}`,
            });
          }
          break;
        case 37:
          if (currentModeIndex > 0) {
            this.$router.push({
              name: `notes.${this.pages[currentModeIndex - 1].name}`,
            });
          }
          break;
      }
    },
    handleDelete(close) {
      this.delete(this.note.id).then(() => {
        close();
      });
    },
  },
  beforeUnmount() {
    window.removeEventListener("keydown", this.handleMode);
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
  @apply border-emerald-400 bg-emerald-400 text-white;
}
</style>
