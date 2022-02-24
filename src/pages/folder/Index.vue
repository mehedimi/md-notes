<template>
  <div class="flex w-100 h-screen font-lato">
    <Sidebar />
    <router-view></router-view>
  </div>
</template>

<script>
import Sidebar from '../../components/Sidebar.vue'
import Notes from '../../components/Notes.vue'

export default {
  components: {
    Notes,
    Sidebar
  },
  mounted() {
    this.$store.dispatch('folder/get')
  }
}
</script>