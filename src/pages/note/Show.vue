<template>
  <div class="flex w-full flex-col">
    <div class="m-3 flex items-center justify-between">
      <Tooltip as="a" href="#" @click.prevent="SHOW_SIDEBAR(!visibleSidebar)">
        <i
          class="las la-angle-left text-xl text-gray-400 transition hover:text-sidebar"
          :class="visibleSidebar ? '' : 'rotate-180 transform'"
        ></i>
        <template v-slot:content
          >{{ visibleSidebar ? "Hide" : "Show" }} Sidebar
        </template>
      </Tooltip>

      <div
        class="note-actions flex items-center gap-x-1 rounded-full bg-gray-700 px-1 py-0.5"
      >
        <Tooltip as="div" v-for="page in pages">
          <router-link
            :to="{ name: `notes.${page.name}`, query: { page: page.name } }"
            class="rounded rounded-full px-1.5 text-xl text-gray-400"
          >
            <i class="las" :class="page.icon"></i>
          </router-link>
          <template v-slot:content>{{ page.text }}</template>
        </Tooltip>
      </div>
      <Menu as="div" class="relative inline-block text-left" v-slot="{ open }">
        <div>
          <MenuButton
            :class="open ? 'bg-gray-700' : ''"
            class="inline-flex justify-center rounded-full px-1.5 py-0.5 text-2xl text-white transition-colors hover:bg-gray-700"
          >
            <i class="las la-ellipsis-h"></i>
          </MenuButton>
        </div>

        <transition
          enter-active-class="transition duration-100 ease-out"
          enter-from-class="transform scale-95 opacity-0"
          enter-to-class="transform scale-100 opacity-100"
          leave-active-class="transition duration-75 ease-in"
          leave-from-class="transform scale-100 opacity-100"
          leave-to-class="transform scale-95 opacity-0"
        >
          <MenuItems
            class="absolute right-0 z-20 mt-2 w-52 origin-top-right divide-y divide-[rgb(80,80,80)] rounded-md border border-[rgb(80,80,80)] bg-dark shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          >
            <div class="py-2">
              <MenuItem v-slot="{ active }">
                <button
                  :class="[
                    active ? 'bg-[#303947]' : '',
                    'flex w-full items-center px-2 py-1 text-sm text-gray-50',
                  ]"
                >
                  <i class="las la-folder-open mr-2"></i>
                  Copy to
                </button>
              </MenuItem>
              <MenuItem v-slot="{ active }">
                <button
                  :class="[
                    active ? 'bg-[#303947]' : '',
                    'flex w-full items-center px-2 py-1 text-sm text-gray-50',
                  ]"
                >
                  <i class="las la-folder mr-2"></i>
                  Move to
                </button>
              </MenuItem>
              <MenuItem v-slot="{ active }">
                <button
                  :class="[
                    active ? 'bg-[#303947]' : '',
                    'flex w-full items-center px-2 py-1 text-sm text-gray-50',
                  ]"
                >
                  <i class="lab la-js mr-2"></i>
                  Export as JSON
                </button>
              </MenuItem>
              <MenuItem v-slot="{ active }">
                <button
                  :class="[
                    active ? 'bg-[#303947]' : '',
                    'flex w-full items-center px-2 py-1 text-sm text-gray-50',
                  ]"
                >
                  <i class="lab la-markdown mr-2"></i>
                  Export as Markdown
                </button>
              </MenuItem>
            </div>
            <div class="py-1">
              <MenuItem v-slot="{ active }">
                <button
                  :class="[
                    active ? 'bg-red-500 text-gray-50' : 'text-red-500',
                    'flex w-full items-center px-2 py-1 text-sm',
                  ]"
                >
                  <i class="las la-trash mr-2"></i>
                  Delete
                </button>
              </MenuItem>
            </div>
          </MenuItems>
        </transition>
      </Menu>
    </div>
    <router-view class="mb-2"></router-view>
  </div>
</template>

<script>
import Note from "../../components/Note.vue";
import Tooltip from "../../components/Tooltip.vue";
import { mapMutations, mapState, mapActions } from "vuex";
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Menu,
  MenuItems,
  MenuItem,
  MenuButton,
} from "@headlessui/vue";

export default {
  components: {
    Note,
    Tooltip,
    PopoverPanel,
    PopoverButton,
    Popover,
    Menu,
    MenuItems,
    MenuItem,
    MenuButton,
  },
  computed: {
    ...mapState("note", ["loaded", "note"]),
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
  @apply bg-dark text-light;
}
</style>
