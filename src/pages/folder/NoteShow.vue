<template>
  <Note/>
</template>
<script>
import Note from '../../components/Note.vue'

export default {
  components: {
    Note
  },
  methods: {
    find() {
      const {note: noteId} = this.$route.params;
      this.$store.dispatch('note/show', noteId)
    }
  },
  watch: {
    '$route.params.note': {
      immediate: true,
      handler() {
        this.find()
      }
    }
  }
}
</script>