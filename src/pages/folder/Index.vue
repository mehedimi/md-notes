<template>
  <div class="p-4">
    <div class="mx-4 grid h-full grid-cols-4 place-content-center gap-8">
      <div
        class="group flex h-60 flex-col items-center justify-center rounded-md border border-gray-700 bg-sidebar shadow-md shadow-sidebar delay-500"
        v-for="folder in folders.data"
      >
        <h2 class="text-2xl text-light">{{ folder.name }}</h2>
        <div
          class="mt-6 flex w-full gap-x-4 px-4 opacity-0 transition-opacity group-hover:opacity-100"
        >
          <button
            class="w-full rounded-lg bg-indigo-500 py-3 text-xs font-semibold uppercase text-white hover:bg-indigo-600"
          >
            Edit
          </button>
          <button
            class="w-full rounded-lg border border-dark bg-dark py-3 text-center text-xs font-semibold uppercase text-light shadow-sidebar hover:text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: mapState("folder", ["folders"]),
};
</script>
