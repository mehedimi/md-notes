<template>
  <Notes/>
  <Note v-if="isLoaded" />
</template>

<script>
import Note from "../../components/Note.vue";
import Notes from "../../components/Notes.vue";

export default {
  components: {
    Notes,
    Note
  },
  data() {
    return {
      isLoaded: false
    }
  },
  methods: {
    find() {
      const { note } = this.$route.params;

      this.$store.dispatch('note/show', note).then((note) => {
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