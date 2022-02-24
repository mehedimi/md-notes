<template>
    <div class="w-full flex flex-col h-full p-6">
        <div>
            <div class="flex text-lg justify-between border-b border-gray-200 pb-3">
                <h3 class="font-normal text-gray-700">
                    <span class="mr-3">My Notes</span>
                    <i class="fa-solid fa-angle-right"></i>
                    <span class="ml-5">System Database Week 4</span>
                </h3>
                <button>
                    <i class="fa-solid fa-ellipsis"></i>
                </button>
            </div>
        </div>
        <div class="overflow-x-auto h-screen flex flex-col mt-3">
            <div class="border-b border-gray-200 pb-3 mb-4">
                <h1 class="text-xl text-gray-800">{{ note.title }}</h1>
                <table class="mt-4">
                    <tbody>
                        <!-- <tr>
                            <td class="w-36 text-stone-400 font-light py-2">Last Updated</td>
                            <td class="py-2 text-gray-700">{{ note.updated_at.calendar() }}</td>
                        </tr> -->
                        <!-- <tr>
                            <td class="w-36 text-stone-400 font-light py-2">Tags</td>
                            <td class="py-2">
                                <ul class="flex gap-3">
                                    <Tag as="a" href="#" v-for="tag, index in note.tags" :key="index">
                                        {{ tag }}
                                    </Tag>
                                    <Tag as="button">
                                        <i class="fa-solid fa-plus mr-3"></i>
                                        <span>Add new Tag</span>
                                    </Tag>
                                </ul>
                            </td>
                        </tr> -->
                    </tbody>
                </table>
            </div>
            <textarea placeholder="Start typing..." v-model="note.content" id="note-editor" class="h-full w-full border-none focus:border-none outline-none focus:outline-none"></textarea>
        </div>
    </div>
</template>

<script>
import Tag from './Tag.vue'
import { mapState } from 'vuex'

export default {
    components: {
        Tag
    },
    computed: mapState('note', ['note'])
}

</script>