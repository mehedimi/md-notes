<template>
  <div class="mt-6 overflow-y-auto">
    <ul>
      <li
          class="flex align-center rounded-lg text-gray-400 hover:text-gray-900 transition"
          :class="{
            'folder-active shadow': ((folder.route.query === undefined && $route.query.folderId === undefined) || (folder.route.query?.folderId === Number($route.query.folderId)))
          }"
          v-for="(folder, index) in allFolders"
          :key="index + 2"
      >
        <router-link :to="folder.route" class="px-4 py-3 block w-full text-sm">
          <i :class="`las text-xl la-${folder.icon}`"></i>
          <span class="ml-3">{{ folder.name }}</span>
        </router-link>
        <Menu as="div" v-if="folder.id" class="relative flex">
          <MenuButton class="mr-3">
            <i class="las la-ellipsis-h text-xl"></i>
          </MenuButton>

          <transition
              enter-active-class="transition duration-100 ease-out"
              enter-from-class="transform scale-95 opacity-0"
              enter-to-class="transform scale-100 opacity-100"
              leave-active-class="transition duration-75 ease-in"
              leave-from-class="transform scale-100 opacity-100"
              leave-to-class="transform scale-95 opacity-0"
          >
            <MenuItems
                class="absolute w-56 mt-2 top-[50%] right-1 bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
            >
              <div class="p-1 px-1">
                <MenuItem v-slot="{ active }">
                  <button :class="[active ? 'bg-gray-300 text-gray-900' : 'text-gray-900','group flex rounded-md items-center w-full px-2 py-1 text-sm']">
                    <i class="las la-pen mr-3 text-xl"></i>
                    Edit
                  </button>
                </MenuItem>
              </div>
              <div class="px-1 py-1">
                <MenuItem v-slot="{ active }">
                  <button
                    @click="$refs.deleteFolder.openModal(folder.id)"
                    :class="[active ? 'bg-red-500 text-white' : 'text-red-500','group flex rounded-md items-center w-full px-2 py-1 text-sm',]">
                      <i class="las la-trash mr-3 text-xl"></i>
                      Delete
                  </button>
                </MenuItem>
              </div>
            </MenuItems>
          </transition>
        </Menu>
      </li>
    </ul>
    
    <DeleteConfirm ref="deleteFolder" @ok="deleteFolder">
      <template v-slot:title>
        Confirmation!
      </template>
      Are you sure you want to delete this folder and all associated notes?
    </DeleteConfirm>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Confirm from './Confirm.vue';
import toast from '../mixins/toast'

import {
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
  TransitionRoot,
  TransitionChild,
} from '@headlessui/vue'

import Api from '../api/api'

export default {
  mixins: [toast],
  components: {
    Menu,
    MenuItem,
    MenuButton,
    MenuItems,
    TransitionRoot,
    TransitionChild,
    DeleteConfirm: Confirm
  },
  computed: mapGetters('folder', ['allFolders']),
  methods: {
    ...mapActions('folder', ['delete']),
    deleteFolder(id) {
      this.delete(id).then(({ message }) => {
        this.toast.success('Success', message)
      })
    }
  }
}
</script>

<style lang="postcss">
  .folder-active {
    @apply text-gray-900 bg-white
  }
</style>