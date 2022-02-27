<template>
    <article class="prose prose-red w-6/12 pl-2 font-encode h-screen" v-html="renderedContent"></article>
</template>

<script>
import { mapState } from 'vuex'
import { marked } from 'marked'

export default {
    computed: {
        ...mapState('note', ['note']),
        renderedContent() {
            return marked.parse(this.note.content || '')
        }
    }
}
</script>