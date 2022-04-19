<template>
  <div class="flex flex-col flex-col-reverse justify-between bg-sidebar shadow">
    <div class="p-4">
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-bold">MD Notes</h2>
      </div>
    </div>

    <div class="pt-2 text-sm">
      <div class="mb-1 flex items-center justify-between px-4">
        <a href="#"
          ><i class="las la-angle-down mr-3 text-dark"></i>All Folders</a
        >
        <Tooltip @click="$refs.resourceCreate.openModal()">
          <i class="las la-plus"></i>
          <template v-slot:content>Add Folder</template>
        </Tooltip>
      </div>
      <Disclosure as="div" v-slot="{ open }" v-for="folder in folderWithNotes">
        <DisclosureButton
          class="group flex w-full items-center border-l-4 border-l-transparent px-4 py-1 text-gray-400 hover:border-l-emerald-400"
        >
          <i
            class="las la-angle-right transition group-hover:text-emerald-400"
            :class="open ? 'rotate-90 transform' : ''"
          ></i>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="ml-1 h-5 w-5 text-gray-300 group-hover:text-emerald-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
            />
          </svg>

          <span class="ml-1 group-hover:text-emerald-400">{{
            folder.name
          }}</span>
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
            class="note-list block truncate border-l-4 border-l-transparent pl-8 text-gray-400 hover:border-l-emerald-400 hover:text-emerald-400"
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
      <Create ref="resourceCreate" />
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
  },
};
</script>

<style lang="postcss">
.note-list.router-link-active {
  @apply border-l-emerald-400 text-emerald-400;
}
</style>
