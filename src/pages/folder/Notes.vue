<template>
    <Notes :folder-id.number="$route.params.folder"/>
    <router-view></router-view>
</template>
<script>
import { mapActions } from 'vuex'
import Notes from '../../components/Notes.vue'

export default {
  components: {
    Notes
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