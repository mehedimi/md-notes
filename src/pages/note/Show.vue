<template>
  <Notes/>
  <Note/>
</template>

<script>
import Note from "../../components/Note.vue";
import Notes from "../../components/Notes.vue";

export default {
  components: {
    Notes,
    Note
  },
  created() {
    const { note } = this.$route.params;

    this.$store.dispatch('note/show', note)
  }
}
</script>