<template>
    <component :is="as" class="px-2 py-1 bg-stone-100 rounded text-stone-500 text-sm leading-5">
        <slot></slot>
    </component>
</template>
<script setup>
    defineProps({
        as: {
            type: String,
            default: 'li'
        }
    })
</script>