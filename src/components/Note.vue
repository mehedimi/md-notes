<template>
    <div class="w-full flex flex-col h-full px-6 bg-white">
        <div class="overflow-x-auto h-screen flex flex-col mt-3">
            <div class="border-b border-gray-200 pb-3 mb-4">
                <div class="flex justify-between">
                  <input type="text" @keyup.enter="isEditTitle = false" v-model="note.title" ref="noteTitle" @blur="isEditTitle = false" class="rounded-md w-full border-gray-200 focus:border-gray-200 focus:ring-gray-300 transition py-2 px-4" v-if="isEditTitle">
                  <h1 class="text-xl text-gray-500" @click="isEditTitle = true" v-else>{{ note.title  }} <em class="text-xs" v-show="updating">Saving</em></h1>
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
                          class="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
                      >
                        <div class="px-1 py-1">
                          <MenuItem v-slot="{ active }" @click="toggleFullScreen">
                            <button
                                :class="[
                                    active ? 'bg-stone-200' : 'text-gray-900',
                                    'group flex rounded-md items-center w-full px-2 py-1 text-sm transition',
                                    ]"
                            >
                              <i :class="`las la-${isFullScreen ? 'compress' : 'expand' } text-xl mr-2`"></i> {{ isFullScreen ? 'Leave ': '' }}Full Screen
                            </button>
                          </MenuItem>
                          <MenuItem v-slot="{ active }" @click="$refs.move.open">
                            <button
                                :class="[
                                    active ? 'bg-stone-200' : 'text-gray-900',
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
                                @click="$refs.deleteNoteModal.openModal"
                            >
                              <i class="las la-trash text-xl mr-2"></i> Delete
                            </button>
                          </MenuItem>
                        </div>
                      </MenuItems>
                    </transition>
                  </Menu>
                </div>
                
                <table class="text-xs">
                    <tbody>
                        <tr>
                            <td class="w-36 text-stone-400 font-light py-2">Last Updated</td>
                            <td class="py-2 text-gray-700" :title="note.updated_at">{{ lastUpdatedAt }}</td>
                        </tr>
                        <tr>
                            <td class="w-36 text-stone-400 font-light py-2">Tags</td>
                            <td class="py-2">
                                <div class="flex gap-3 flex-wrap">
                                  <Tag @click.prevent="detachTag(tag.id)" as="a" href="#" class="hover:bg-red-500 hover:text-white transition" v-for="(tag, index) in note.tags" :key="index">
                                      {{ tag.name }}
                                  </Tag>
                                  <TagCreate />
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <Editor v-if="hasNote"/>
        </div>
        <DeleteNote ref="deleteNoteModal" @ok="deleteNote">
            <template v-slot:title>Warning!</template>
            Are your sure, you want to delete this note?
        </DeleteNote>
        <Move ref="move"></Move>
    </div>
</template>

<script>
import Tag from './Tag.vue'
import TagCreate from './Tag/Create.vue'
import Editor from './Note/Editor.vue'
import DeleteNote from './Confirm.vue'
import Move from './Move.vue'
import { mapGetters, mapState } from 'vuex'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'

import isEmpty from "lodash/isEmpty";

export default {
    components: {
      Tag,
      TagCreate,
      Editor,
      Menu,
      Move,
      MenuButton,
      MenuItems,
      MenuItem,
      DeleteNote,
    },
    computed: {
      ...mapState('note', ['note', 'updating']),
      ...mapGetters('note', ['lastUpdatedAt']),
      hasNote() {
        return ! isEmpty(this.note)
      }
    },
    data() {
        return {
          isFullScreen: false,
          isEditTitle: false
        }
    },
    mounted() {
        this.$el.addEventListener('fullscreenchange', () => {
            this.isFullScreen = Boolean(document.fullscreenElement)
        })
    },
    watch: {
      isEditTitle(value) {
        if (value) {
          this.$nextTick(() => {
            this.$refs.noteTitle.focus()
          })
        } else {
          this.$store.dispatch('note/update', {
            noteId: this.note.id,
            data: {
              title: this.note.title
            }
          })
        }
      }
    },
    methods: {
      toggleFullScreen() {
        if(this.isFullScreen) {
            document.exitFullscreen()
        } else {
            this.$el.requestFullscreen()
        }
      },
      deleteNote() {
        this.$store.dispatch('note/delete', this.note.id).then(() => {
          if (this.$route.name === 'note.show') {
            this.$router.push({
              name: 'folder.index'
            })
          } else {
            this.$router.push({
              name: 'folder.notes.index',
              params: {
                folder: this.$route.params.folder
              }
            })
          }
        })
      },
      detachTag(tagId) {
        const { noteId } = this.$route.params

        this.$store.dispatch('tag/detach', {
          tagId,
          noteId
        }).then(() => {
          this.$store.commit('note/DETACH_TAG', tagId)
          this.$store.commit('note/REMOVE_TAG_FROM_LIST', {
            tagId,
            noteId
          })
        })
      }
    }
}

</script>