<template>
    <div class="pt-2">
      <input type="search" v-model="search" placeholder="Search notes..." class="rounded-md w-full border-0 focus:ring-gray-400 focus:ring-2 py-3 px-5">
    </div>
</template>

<script>
import { mapActions } from "vuex"
import debounce from 'lodash/debounce'

export default {
    data() {
        return {
            search: ''
        }
    },
    methods: mapActions('note', ['get']),
    watch: {
        search: debounce(function(s) {
            this.get({
                folderId: this.$route.params.folder,
                s
            })
        }, 400)
    }
}
</script>