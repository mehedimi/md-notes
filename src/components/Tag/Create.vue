<template>
  <Popover v-slot="{ open }" class="relative">
    <PopoverButton
        :class="open ? '' : 'text-opacity-90'"
        class="inline-flex items-center px-2 py-1 bg-gray-300 rounded-md group bg-stone-100 rounded text-stone-500 text-sm leading-5 hover:bg-stone-200 transition focus:ring-stone-200 focus:ring-offset-2 focus:ring-2"
    >
      <i class="las la-plus mr-2"></i>
      <span>Add new Tag</span>
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
          class="absolute z-10 w-64 mt-3 transform -translate-x-1/2 left-1/2 sm:px-0 lg:max-w-3xl"
      >
        <div
            class="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5"
        >
          <div class="relative bg-white">
            <Combobox v-model="selected">
              <div class="relative mt-1">
                <div
                    class="relative w-full text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-teal-300 focus-visible:ring-offset-2 sm:text-sm overflow-hidden"
                >
                  <ComboboxInput
                      class="w-full border-none focus:ring-0 py-2 pl-3 pr-10 text-sm leading-5 text-gray-900"
                      :displayValue="(tag) => tag.name"
                      autocomplete="off"
                      placeholder="Type tag name"
                      @change="search = $event.target.value"
                  />
                  <ComboboxButton
                      class="absolute inset-y-0 right-0 flex items-center pr-2"
                  ></ComboboxButton>
                </div>
                <TransitionRoot
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    @after-leave="search = ''"
                >
                  <ComboboxOptions
                      class="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                  >
                    <button
                        v-if="tags.length === 0 && search !== ''"
                        class="select-none relative py-2 px-4 text-gray-700 hover:bg-stone-100 w-full"
                        @click="createTag"
                    >
                      Add <span class="bg-stone-200 px-2 py-1 rounded">{{ search }}</span> as a new tag
                    </button>

                    <ComboboxOption
                        v-for="t in tags"
                        as="template"
                        :key="t.id"
                        :value="t"
                        v-slot="{ selected, active }"
                    >
                      <li class="cursor-default select-none relative py-2 pl-4 pr-4" :class="{
                        'text-white bg-stone-400': active,
                          'text-gray-900': !active,
                        }"
                      >
                      <span
                          class="block truncate"
                          :class="{ 'font-medium': selected, 'font-normal': !selected }"
                      >
                        {{ t.name }}
                      </span>
                        <span
                            v-if="selected"
                            class="absolute inset-y-0 left-0 flex items-center pl-3"
                            :class="{ 'text-white': active, 'text-teal-600': !active }"
                        ></span>
                      </li>
                    </ComboboxOption>
                  </ComboboxOptions>
                </TransitionRoot>
              </div>
            </Combobox>
          </div>
        </div>
      </PopoverPanel>
    </transition>
  </Popover>
</template>

<script>
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
  TransitionRoot,
} from '@headlessui/vue'
import {mapActions, mapState} from "vuex";

export default {
  components: {
    Popover,
    PopoverPanel,
    PopoverButton,
    Combobox,
    ComboboxInput,
    ComboboxButton,
    ComboboxOptions,
    ComboboxOption,
    TransitionRoot,
  },
  data() {
    return {
      search: '',
      selected: {
        name: ''
      }
    }
  },
  computed: {
    ...mapState('note', ['note']),
    ...mapState('tag', {
      tags(state) {
        return state.tags.data.filter((tag) => {
          return tag.name.toLowerCase().startsWith(this.search.toLowerCase()) && ! this.note.tags.map(t => t.id).includes(tag.id)
        });
      }
    })
  },
  methods: {
    ...mapActions('tag', ['create', 'assign']),
    createTag() {
      this.create(this.search).then((tag) => {
        this.assignTag(tag.id)
      })
    },
    assignTag(tagId) {
      const { noteId } = this.$route.params;

      this.assign({
        noteId,
        tagId
      }).then((tag) => {
        this.$store.commit('note/ASSIGN_TAG', tag)
        this.$store.commit('note/ADD_TAG_TO_LIST', {
          noteId,
          tag
        })
        this.search = ''
      }).catch(() => {
        //
      })
    }
  },
  watch: {
    selected(value) {
      if (value.id) {
        this.assignTag(value.id)
      }
    }
  }
}
</script>