<template>
    <div class="flex h-screen">

    </div>
</template>

<script>
import { useStore } from 'vuex'
import { useRoute } from "vue-router";
import { onMounted, watch } from 'vue'

export default {
    components: {
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