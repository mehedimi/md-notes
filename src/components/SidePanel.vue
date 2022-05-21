<template>
  <div class="flex flex-col justify-between bg-sidebar shadow">
    <div class="overflow-y-auto pt-2 text-sm">
      <div class="mb-1 flex items-center justify-between px-4 text-[#F9FFFF]">
        <router-link :to="{ name: 'notes.index' }"
          ><i class="las la-angle-down mr-3"></i>All Folders</router-link
        >
        <Tooltip @click="$refs.resourceCreate.openModal()">
          <i class="las la-plus"></i>
          <template v-slot:content>Add Folder</template>
        </Tooltip>
      </div>
      <div>
        <Disclosure
          as="div"
          v-slot="{ open }"
          v-for="folder in folderWithNotes"
        >
          <DisclosureButton
            class="group flex w-full items-center px-4 py-1 text-[#C7CDD8] hover:bg-[#303947]"
          >
            <i
              class="las la-angle-right transition"
              :class="open ? 'rotate-90 transform' : ''"
            ></i>
            <svg
              v-if="open"
              xmlns="http://www.w3.org/2000/svg"
              class="ml-1 h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z"
                clip-rule="evenodd"
              />
              <path
                d="M6 12a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H2h2a2 2 0 002-2v-2z"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="ml-1 h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
              v-else
            >
              <path
                d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
              />
            </svg>

            <span class="ml-1">{{ folder.name }}</span>
            <Tooltip
              @click.stop="
                $refs.resourceCreate.openModal(1, { folder_id: folder.id })
              "
              class="ml-auto hidden group-hover:inline-block"
            >
              <i class="las la-plus"></i>
              <template v-slot:content>Add Note</template>
            </Tooltip>
          </DisclosureButton>
          <DisclosurePanel class="mb-1">
            <router-link
              class="note-list block truncate pl-8 text-[#C7CDD8] hover:bg-[#303947]"
              :to="{
                name: 'notes.show',
                params: { noteId: note.id },
                query: $route.query,
              }"
              v-for="note in folder.notes"
            >
              <i class="las la-file-alt text-lg"></i>
              {{ note.title }}
            </router-link>
          </DisclosurePanel>
        </Disclosure>
      </div>

      <Create ref="resourceCreate" />
    </div>
    <div class="p-4">
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-bold text-light">MD Notes</h2>
      </div>
    </div>
  </div>
</template>

<script>
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import { mapGetters, mapMutations, mapState } from "vuex";
import Tooltip from "./Tooltip.vue";
import Create from "../components/Create.vue";

export default {
  components: {
    DisclosurePanel,
    DisclosureButton,
    Disclosure,
    Tooltip,
    Create,
  },
  computed: {
    ...mapGetters("folder", ["folderWithNotes"]),
  },
  methods: {
    ...mapMutations("option", ["SHOW_SIDEBAR"]),
    ...mapMutations("tab", ["ADD"]),
  },
  watch: {
    $route(next, from) {
      if (next.name.match(/notes\.(view|edit|live-edit)/)) {
        this.ADD(next.params.noteId);
      }
    },
  },
};
</script>

<style lang="postcss">
.note-list.router-link-active {
  @apply !bg-indigo-500;
}
</style>
