<template>
    <div class="w-full flex flex-col h-full px-6 bg-white">
        <div class="overflow-x-auto h-screen flex flex-col mt-3">
            <div class="border-b border-gray-200 pb-3 mb-4">
                <div class="flex justify-between">
                  <h1 class="text-2xl text-gray-500">{{ note.title  }}</h1>
                  <Menu as="div" class="relative inline-block text-left">
                    <div>
                      <MenuButton class="inline-flex justify-center text-stone-600 hover:text-stone-800 transition">
                        <i class="las la-ellipsis-h text-3xl"></i>
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
                          class="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                      >
                        <div class="px-1 py-1">
                          <MenuItem v-slot="{ active }" @click="toggleFullScreen">
                            <button
                                :class="[
                                    active ? 'bg-gray-300' : 'text-gray-900',
                                    'group flex rounded-md items-center w-full px-2 py-1 text-sm transition',
                                    ]"
                            >
                              <i :class="`las la-${isFullScreen ? 'compress' : 'expand' } text-xl mr-2`"></i> {{ isFullScreen ? 'Leave ': '' }}Full Screen
                            </button>
                          </MenuItem>
                          <MenuItem v-slot="{ active }">
                            <button
                                :class="[
                                    active ? 'bg-gray-300' : 'text-gray-900',
                                    'group flex rounded-md items-center w-full px-2 py-1 text-sm transition',
                                    ]"
                            >
                              <i class="las la-external-link-alt text-xl mr-2"></i> Move
                            </button>
                          </MenuItem>
                        </div>

                        <div class="px-1 py-1">
                          <MenuItem v-slot="{ active }">
                            <button
                                :class="[
                                active ? 'bg-red-500 text-white' : 'text-red-500',
                                'group flex rounded-md items-center w-full px-2 py-1 text-sm transition',
                                ]"
                            >
                              <i class="las la-trash text-xl mr-2"></i> Delete
                            </button>
                          </MenuItem>
                        </div>
                      </MenuItems>
                    </transition>
                  </Menu>
                </div>
                
                <table class="mt-4">
                    <tbody>
                        <tr>
                            <td class="w-36 text-stone-400 font-light py-2">Last Updated</td>
                            <td class="py-2 text-gray-700">{{ lastUpdatedAt }}</td>
                        </tr>
                        <!-- <tr>
                            <td class="w-36 text-stone-400 font-light py-2">Tags</td>
                            <td class="py-2">
                                <ul class="flex gap-3">
                                    <Tag as="a" href="#" v-for="tag, index in note.tags" :key="index">
                                        {{ tag }}
                                    </Tag>
                                    <Tag as="button">
                                        <i class="fa-solid fa-plus mr-3"></i>
                                        <span>Add new Tag</span>
                                    </Tag>
                                </ul>
                            </td>
                        </tr> -->
                    </tbody>
                </table>
            </div>
            <Editor v-if="hasNote"/>
        </div>
        <!-- <DeleteNote/> -->
    </div>
</template>

<script>
import Tag from './Tag.vue'
import Editor from './Note/Editor.vue'
import DeleteNote from './Confirm.vue'
import { mapGetters, mapState } from 'vuex'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import isEmpty from "lodash/isEmpty";

export default {
    components: {
        Tag,
        Editor,
        Menu,
        MenuButton,
        MenuItems,
        MenuItem,
        DeleteNote,
    },
    computed: {
      ...mapState('note', ['note']),
      ...mapGetters('note', ['lastUpdatedAt']),
      hasNote() {
        return ! isEmpty(this.note)
      }
    },
    data() {
        return {
            isFullScreen: false
        }
    },
    mounted() {
        this.$el.addEventListener('fullscreenchange', () => {
            this.isFullScreen = Boolean(document.fullscreenElement)
        })
    },
    methods: {
        toggleFullScreen() {
            if(this.isFullScreen) {
                document.exitFullscreen()
            } else {
                this.$el.requestFullscreen()
            }
        }
    }
}

</script>