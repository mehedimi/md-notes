<template>
    <div class="px-4 flex flex-col border-r border-gray-200">
        <div class="pt-4">
            <h2 class="text-3xl mb-5">My Notes</h2>
            <button @click="$refs.createNote.open" class="px-4 py-3 w-full bg-stone-100 rounded-lg flex items-center text-sm hover:bg-stone-200 transition">
                <i class="las la-plus mr-2 text-lg"></i>
                <span>Add new note</span>
            </button>
        </div>
        <ul class="mt-5 overflow-y-auto h-full notes">
          <li>
            <router-link active-class="is-active" :to="{ name: 'notes.show', params: {noteId: note.id}, query: $route.query }" class="mb-3 bg-stone-50 p-3 rounded note inline-block w-full transition" v-for="(note, index) in notes.data" :key="index">
                <span class="text-stone-400 font-light text-xs">{{ moment(note.created_at).calendar() }}</span>
                <h2 class="text-gray-400 mb-1">{{ note.title }}</h2>
                <p class="text-gray-400 font-light text-sm" v-if="note.content">{{ note.content.substr(0, 75) }}</p>
                <em class="text-xs text-gray-400 font-light" v-else>No Content</em>
                <ul class="flex tags gap-2 mt-4 flex-wrap" v-if="note.tags.length">
                  <Tag v-for="(tag, index) in tags(note.tags)">{{ tag.name }}</Tag>
                </ul>
            </router-link>
          </li>
        </ul>
      <Create ref="createNote"></Create>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import Create from './Note/Create.vue'
import Tag from './Tag.vue'
import moment from 'moment'

export default {
  components: {
    Create,
    Tag
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
    },
    tags(tags) {
      let length = 0;
      const newTags = []
      for (let i = 0; i < tags.length; i++) {
        length += tags[i].name.length
        newTags.push(tags[i])

        if (length >= 13 && (tags.length - (i + 1)) > 0) {
          newTags.push({
            name: `+${tags.length - (i + 1)} more`
          })
          break;
        }
      }
      return newTags;
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
        @apply text-gray-500 bg-stone-100
    }
</style>