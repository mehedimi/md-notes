<template>
    <div class="min-w-[20rem] w-80 px-4 flex flex-col border-r border-gray-200">
        <div class="pt-4">
            <h2 class="text-3xl mb-5">My Notes</h2>
            <button @click="$refs.createNote.open" class="px-4 py-3 w-full bg-stone-100 rounded-lg flex items-center text-sm hover:bg-stone-200 transition">
                <i class="las la-plus mr-2 text-lg"></i>
                <span>Add new note</span>
            </button>
        </div>
        <ul class="mt-5 overflow-y-auto h-full notes">
          <li>
            <router-link active-class="is-active" :to="{name: routeName, params: routeParams(note.id)}" class="mb-3 bg-stone-50 p-3 rounded note inline-block w-full transition" v-for="(note, index) in notes.data" :key="index">
                <span class="text-stone-400 font-light text-xs">{{ moment(note.created_at).calendar() }}</span>
                <h2 class="text-gray-400 mb-1">{{ note.title }}</h2>
                <p class="text-gray-400 font-light text-sm" v-if="note.content">{{ note.content.substr(0, 75) }}</p>
                <em class="text-xs text-gray-400 font-light" v-else>No Content</em>
                <!-- <ul class="flex tags gap-2 mt-4" v-if="note.tags.length">
                <li v-for="tag, index in note.tags" :key="index" class="px-2 bg-stone-100 rounded text-gray-400 text-xs leading-6">{{ tag }}</li>
                </ul> -->
            </router-link>
          </li>
        </ul>
      <Create ref="createNote"></Create>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import Create from './Note/Create.vue'
import moment from 'moment'

export default {
  components: {
    Create
  },
  props: {
    folderId: {
      type: [Number, String]
    }
  },
  computed: {
    ...mapState('note', ['notes']),
    routeName() {
      if (this.folderId) {
        return 'folder.note.show'
      }
      return 'note.show'
    }
  },
  mounted() {
    this.$store.dispatch('note/get', {
      folderId: this.folderId
    })
  },
  setup() {
    return {
      moment
    }
  },
  methods: {
    routeParams(noteId) {
      if (this.folderId) {
        return {
          folder: this.folderId,
          note: noteId
        }
      }
      return {
        note: noteId
      }
    }
  }
}
</script>

<style lang="postcss">
    .notes .note.is-active {
        @apply bg-stone-200
    }
    .notes .note.is-active span{
        @apply text-gray-600
    }
    .notes .note.is-active h2{
        @apply text-gray-700
    }
    .notes .note.is-active p{
        @apply text-gray-600
    }

    .notes .note.is-active .tags li{
        @apply text-gray-500 bg-stone-200
    }
</style>