<template>
    <div class="flex w-100 h-screen font-lato">
        <Sidebar />
        <Notes />
        <router-view></router-view>
    </div>
</template>

<script>
import Sidebar from '../../components/Sidebar.vue'
import Notes from '../../components/Notes.vue'
import { onMounted } from 'vue'
import { useStore } from 'vuex'

export default {
    components: {
        Sidebar,
        Notes
    },
    setup() {
        const store = useStore();

        onMounted(() => {
            store.dispatch('note/get')    
        })
    }
}
</script>