<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="setIsOpen">
      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="min-h-screen px-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <DialogOverlay class="fixed inset-0 bg-gray-700/70" />
          </TransitionChild>

          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <div
              class="mt-10 inline-block w-full max-w-md transform overflow-y-auto rounded-xl bg-sidebar text-left shadow-xl transition-all"
              :class="term ? 'pb-3' : ''"
            >
              <Combobox
                class="font-encode"
                as="div"
                @update:modelValue="handleEnter"
              >
                <div
                  class="flex items-center justify-center pl-3"
                  :class="term ? 'mb-3 border-b border-b-gray-700' : ''"
                >
                  <i class="las la-search text-xl text-light"></i>
                  <ComboboxInput
                    class="h-12 w-full border-0 bg-transparent pl-2 text-gray-300 focus:ring-0"
                    placeholder="Search by note title"
                    @change="setTerm($event.target.value)"
                    :value="term"
                  />
                </div>
                <ComboboxOptions
                  static
                  class="max-h-72 overflow-y-auto px-3"
                  v-if="term"
                >
                  <ComboboxOption
                    v-for="note in notes"
                    v-slot="{ selected, active }"
                    :value="note.id"
                    ><li
                      class="cursor-pointer py-2 px-4 text-light"
                      :class="active ? 'rounded bg-gray-800 text-gray-200' : ''"
                    >
                      <i class="las la-file-alt mr-2"></i>
                      {{ note.title }} -
                      <span class="text-sm">{{
                        folders[note.folder_id].name
                      }}</span>
                    </li></ComboboxOption
                  >

                  <li class="text-center text-white" v-if="!notes.length">
                    <i class="las la-exclamation-circle"></i> No notes found!
                  </li>
                </ComboboxOptions>
              </Combobox>
            </div>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script>
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogOverlay,
  Combobox,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
} from "@headlessui/vue";
import { mapState } from "vuex";
import keyBy from "lodash/keyBy";
import FuzzySearch from "fuzzy-search";

export default {
  components: {
    Dialog,
    DialogOverlay,
    TransitionChild,
    TransitionRoot,
    Combobox,
    ComboboxInput,
    ComboboxOptions,
    ComboboxOption,
  },
  data() {
    return {
      isOpen: false,
      term: "",
    };
  },
  computed: {
    ...mapState("note", {
      notes(state) {
        return new FuzzySearch(state.notes.data, ["title"]).search(this.term);
      },
    }),
    ...mapState("folder", {
      folders(state) {
        return keyBy(state.folders.data, "id");
      },
    }),
  },
  mounted() {
    window.addEventListener("keydown", (event) => {
      if (!event.metaKey || event.key !== "p") return;
      this.isOpen = !this.isOpen;
    });
  },
  methods: {
    setIsOpen(state) {
      this.isOpen = state;
    },
    setTerm(value) {
      this.term = value;
    },
    handleEnter(noteId) {
      this.$router
        .push({
          name: "notes.show",
          query: this.$route.query,
          params: {
            noteId,
          },
        })
        .then(() => {
          this.setIsOpen(false);
          this.term = "";
        });
    },
  },
};
</script>
