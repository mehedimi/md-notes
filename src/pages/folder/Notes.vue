<template>
    <Notes :folder-id="$route.params.folder"/>
    
    <router-view></router-view>
</template>
<script>
import { mapActions } from 'vuex'
import Notes from '../../components/Notes.vue'
import NoNoteSelected from '../../components/Note/NoNoteSelected.vue'

export default {
  components: {
    Notes,
    NoNoteSelected
  },
  methods: mapActions('note', ['get']),
  watch: {
    '$route.params.folder': {
      immediate: true,
      handler(folderId) {
        this.get({
          folderId
        })
      }
    }
  }
}
</script>