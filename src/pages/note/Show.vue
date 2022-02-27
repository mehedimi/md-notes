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
  created() {
    const { note } = this.$route.params;

    this.$store.dispatch('note/show', note).then((note) => {
      this.isLoaded = true
    })
  }
}
</script>