<template>
  <div class="bg-gray-100 h-full p-3 flex flex-col">
    <Search />
    <Folder class="h-full"/>
    <div class="h-[136px]">
      <CreateFolder></CreateFolder>
      <button class="px-5 py-3 w-full bg-white text-gray-700 text-sm rounded-lg flex items-center">
        <i class="las la-cog text-xl mr-4"></i>
        <span>Settings</span>
      </button>
    </div>
  </div>
</template>

<script>
import Folder from './Folder.vue'
import Search from './Search.vue';
import CreateFolder from './Folder/Create.vue'

export default {
  components: {
    Folder,
    Search,
    CreateFolder
  }
}
</script>