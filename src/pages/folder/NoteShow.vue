<template>
  <Note/>
</template>
<script setup>
import { useStore } from 'vuex';
import Note from '../../components/Note.vue'
const store = useStore();

store.dispatch('note/show')

console.log('sdfdsfh');

</script>