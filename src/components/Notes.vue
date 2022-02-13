<template>
    <div class="min-w-[20rem] w-80 px-4 flex flex-col border-r border-gray-200">
        <div class="pt-4">
            <h2 class="text-3xl mb-5">My Notes</h2>
            <button class="p-3 w-full bg-stone-100 rounded-lg flex items-center">
                <i class="fa-solid fa-plus mr-3"></i>
                <span>Add new note</span>
            </button>
        </div>
        <ul class="mt-5 overflow-y-auto h-full notes">
            <li :class="{'is-active': note.isActive}" class="mb-3 bg-stone-50 p-3 rounded note" v-for="note, index in notes" :key="index">
                <a href="#">
                    <span class="text-stone-400 font-light text-xs">{{ note.date }}</span>
                    <h2 class="text-gray-400 mb-1">{{ note.title }}</h2>
                    <p class="text-gray-400 font-light text-sm">{{ note.content }}</p>
                    <ul class="flex tags gap-2 mt-4" v-if="note.tags.length">
                        <li v-for="tag, index in note.tags" :key="index" class="px-2 bg-stone-100 rounded text-gray-400 text-xs leading-6">{{ tag }}</li>
                    </ul>
                </a>
            </li>
        </ul>
    </div>
</template>

<script setup>
    const notes = [
        {
            title: 'Database Systems Week 4',
            date: '19 APR',
            content: 'Normalization Is the process or orderingbasic data structures to...',
            tags: ['College', 'Lecture', 'Daily']
        },
        {
            title: 'Grocery List',
            date: '19 APR',
            content: 'Blandit pharetra tellus metus fermentumDellentesque auque sit. Donec senectus',
            tags: ['vesion', 'Productivity', 'Daily'],
            isActive: true
        },
        {
            title: 'Database Systems Week 4',
            date: '19 APR',
            content: 'Normalization Is the process or orderingbasic data structures to...',
            tags: ['College', 'Lecture', 'Daily']
        },
        {
            title: 'Grocery List',
            date: '19 APR',
            content: 'Blandit pharetra tellus metus fermentumDellentesque auque sit. Donec senectus',
            tags: ['vesion', 'Productivity', 'Daily']
        },
        {
            title: 'Database Systems Week 4',
            date: '19 APR',
            content: 'Normalization Is the process or orderingbasic data structures to...',
            tags: ['College', 'Lecture', 'Daily'],
        
        },
        {
            title: 'Grocery List',
            date: '19 APR',
            content: 'Blandit pharetra tellus metus fermentumDellentesque auque sit. Donec senectus',
            tags: ['vesion', 'Productivity', 'Daily']
        },
        {
            title: 'Database Systems Week 4',
            date: '19 APR',
            content: 'Normalization Is the process or orderingbasic data structures to...',
            tags: ['College', 'Lecture', 'Daily']
        },
        {
            title: 'Grocery List',
            date: '19 APR',
            content: 'Blandit pharetra tellus metus fermentumDellentesque auque sit. Donec senectus',
            tags: ['Vesion', 'Productivity', 'Daily']
        },
        {
            title: 'Database Systems Week 4',
            date: '19 APR',
            content: 'Normalization Is the process or orderingbasic data structures to...',
            tags: ['College', 'Lecture', 'Daily']
        },
    ]
</script>

<style lang="postcss">
    .notes .note.is-active {
        @apply bg-stone-100
    }
    .notes .note.is-active span{
        @apply text-gray-600
    }
    .notes .note.is-active h2{
        @apply text-gray-600
    }
    .notes .note.is-active p{
        @apply text-gray-600
    }

    .notes .note.is-active .tags li{
        @apply text-gray-500 bg-stone-200
    }
</style>