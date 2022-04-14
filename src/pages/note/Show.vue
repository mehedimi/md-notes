<template>
  <Note v-if="isLoaded" />
</template>

<script>
import Note from "../../components/Note.vue";

export default {
  components: {
    Note
  },
  data() {
    return {
      isLoaded: false
    }
  },
  methods: {
    find() {
      const { noteId } = this.$route.params;
      this.$store.dispatch('note/show', noteId).then(() => {
        this.isLoaded = true
      })
    }
  },
  watch: {
    '$route.params.note': {
      handler() {
        this.find()
      },
      immediate: true
    }
  }
}
</script>