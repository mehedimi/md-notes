<template>
  <FormModal ref="modal">
    <template v-slot:title>Create note</template>
    <div class="mt-2">
      <div class="mt-4">
        <label class="text-sm">Folder</label>
        <Listbox v-model="selectedFolder">
          <div class="relative mt-1">
            <ListboxButton
              class="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded cursor-default sm:text-sm border border-gray-200 focus:border-gray-200 focus:ring-gray-300 transition focus:ring-2"
            >
              <span class="block truncate">{{ selectedFolder.name || 'Please select folder' }}</span>
              <span
                class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
              >
                <i class="las la-sort-down"></i>
              </span>
            </ListboxButton>

            <transition
              leave-active-class="transition duration-100 ease-in"
              leave-from-class="opacity-100"
              leave-to-class="opacity-0"
            >
              <ListboxOptions
                class="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
              >
                <ListboxOption
                  v-slot="{ active, selected }"
                  v-for="folder in folders"
                  :key="folder.id"
                  :value="folder"
                  as="template"
                >
                  <li
                    :class="[
                      active ? 'text-amber-900 bg-amber-100' : 'text-gray-900',
                      'cursor-default select-none relative py-2 pl-10 pr-4',
                    ]"
                  >
                    <span
                      :class="[
                        selected ? 'font-medium' : 'font-normal',
                        'block truncate',
                      ]"
                      >
                        <i :class="`mr-1 las la-${folder.icon}`"></i>
                        {{ folder.name }}
                      </span
                    >
                    <span
                      v-if="selected"
                      class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
                    >
                      <i class="las la-check"></i>
                    </span>
                  </li>
                </ListboxOption>
              </ListboxOptions>
            </transition>
          </div>
        </Listbox>
      </div>
      <div class="mt-4">
        <label class="text-sm mb-1 block">Title</label>
        <input type="text" v-model="note.title" placeholder="Enter note title" class="rounded-md w-full border-gray-200 focus:border-gray-200 focus:ring-gray-300 transition focus:ring-2 py-2 px-4">
      </div>
    </div>
  </FormModal>
</template>

<script>
import { mapState } from 'vuex'
import {
  Listbox,
  ListboxLabel,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue'
import FormModal from '../Modal/FormModal.vue'

export default {
  components: {
    FormModal,
    Listbox,
    ListboxLabel,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
  },
  computed: {
    ...mapState('folder', {
      folders(state) {
        return state.folders.data;
      }
    }),
    selectedFolder: {
      get() {
        return this.folders.find(f => f.id == this.note.folder_id) || {}
      },
      set(folder) {
        this.note.folder_id = folder.id
      }
    }
  },
  data() {
    return {
      isOpen: false,
      note: {
        title: '',
        folder_id: null
      }
    }
  },
  mounted() {
    this.note.folder_id = this.$route.params.folder
  },
  methods: {
    open() {
      this.$refs.modal.open()
    },
    close() {
      this.$refs.modal.close()
    },
    submit() {
      this.$store.dispatch('note/create', this.note).then(({ data }) => {
        this.$refs.modal.close()
      })
    }
  }
}
</script>