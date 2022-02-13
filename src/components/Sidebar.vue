<template>
  <div class="min-w-[18rem] w-72 bg-gray-100 h-full p-3">
    <div class="pt-10">
      <input type="search" placeholder="Search notes..." class="rounded-md w-full border-0 focus:ring-gray-400 focus:ring-2 py-3">
    </div>
    <ul class="mt-6">
      <li :class="{'bg-white text-gray-900': folder.isActive}" class="flex items-center p-3 rounded mb-3 text-gray-400" v-for="(folder, index) in folders" :key="index">
        <i :class="`fa-solid fa-${folder.icon}`"></i>
        <a href="#" class="ml-3">{{ folder.name }}</a>
        <button class="ml-auto">
          <i class="fa-solid fa-ellipsis"></i>
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
  const folders = [
    {
      name: 'My Notes',
      icon: 'address-book',
    },
    {
      name: 'To-do List',
      icon: 'check',
      isActive: true
    }
  ]
</script>