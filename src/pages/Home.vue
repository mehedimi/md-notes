<template>
    <div class="flex w-100 h-screen font-lato">
        <Sidebar />
        <Notes />
        <router-view></router-view>
    </div>
</template>

<script setup>
import Sidebar from '../components/Sidebar.vue'
import Notes from '../components/Notes.vue'
import { useStore } from "vuex";
const store = useStore();

store.dispatch('folder/get')
store.dispatch('note/get')
</script>