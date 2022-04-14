<template>
    <div class="grid h-screen grid-cols-10">
        <Sidebar class="col-span-2"/>
        <Notes class="col-span-2"/>
        <div class="col-span-6">
          <p v-if="$route.name === 'notes.index'">Open any note by clicking over a note</p>
          <router-view v-else></router-view>
        </div>
    </div>
</template>

<script>
import { onMounted, watch } from 'vue'
import { useStore } from 'vuex'
import Notes from '../../components/Notes.vue'
import Sidebar from '../../components/Sidebar.vue'
import { useRoute } from "vue-router";

export default {
    components: {
        Sidebar,
        Notes
    },
    setup() {
        const store = useStore();
        const route = useRoute()

        onMounted(() => {
            store.dispatch('note/get', route.query)
            store.dispatch('folder/get')
        })

        watch(() => route.query, (next) => {
          store.dispatch('note/get', next)
        })
    }
}
</script>