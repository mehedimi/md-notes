<template>
    <div class="flex overflow-y-auto">
        <div class="w-6/12 note-edit h-screen" ref="textarea"></div>
        <Preview />
    </div>
</template>

<script>
import {mapActions, mapMutations, mapState} from 'vuex'

import debounce from 'lodash/debounce'
import Preview from "./Preview.vue"
import CodeMirror from 'codemirror/lib/codemirror'
import 'codemirror/mode/markdown/markdown'
import 'codemirror/addon/edit/continuelist'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/dracula.css'
import 'codemirror/theme/mdn-like.css'

export default {
    components: {
        Preview
    },
    computed: mapState('note', ['note']),
    methods: {
      ...mapMutations('note', ['SET_CONTENT']),
      ...mapActions('note', ['updateContent'])
    },
    mounted() {
      const editor = CodeMirror(this.$refs.textarea, {
        mode: 'markdown',
        theme: 'mdn-like',
        value: this.note.content || '',
        lineNumbers: true,
        lineWrapping: true,
        extraKeys: {
          Enter: 'newlineAndIndentContinueMarkdownList'
        }
      })

      editor.on('change', debounce((instance) => {
        this.SET_CONTENT(instance.getDoc().getValue())
        this.updateContent()
      }, 500))
    }
}
</script>

<style lang="postcss">
.note-edit > div{
    height: 100%;
    border-radius: 3px;
}
</style>