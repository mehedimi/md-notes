<template>
  <div class="flex w-100 h-screen font-lato">
    <Sidebar />
    <Notes />
    <Note/>
  </div>
</template>

<script setup>
import Api from './api/api.js'
import Sidebar from './components/Sidebar.vue'
import Notes from './components/Notes.vue'
import Note from './components/Note.vue'

Api.get('/').then((response) => {
  console.log(response);
})

</script>