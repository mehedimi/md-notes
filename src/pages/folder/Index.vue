<template>
  <div class="flex w-100 h-screen font-lato">
    <Sidebar />
    <router-view></router-view>
  </div>
</template>

<script>
import Sidebar from '../../components/Sidebar.vue'
import NoNoteSelected from '../../components/Note/NoNoteSelected.vue'

export default {
  components: {
    Sidebar,
    NoNoteSelected
  },
  mounted() {
    this.$store.dispatch('folder/get')
  }
}
</script>