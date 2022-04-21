<template>
  <div class="mt-6 grid grid-cols-2 gap-x-4">
    <button
      class="w-full rounded-lg border border-dark bg-dark py-3 text-center text-xs font-semibold uppercase text-light shadow-sidebar hover:text-white"
      @click="$parent.closeModal"
      type="button"
    >
      Cancel
    </button>
    <button
      class="w-full rounded-lg bg-indigo-500 text-xs font-semibold uppercase text-white hover:bg-indigo-600"
      type="submit"
    >
      Create
    </button>
  </div>
</template>
