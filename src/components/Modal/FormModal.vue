<template>
<div>
<TransitionRoot appear :show="isOpen" as="div">
    <Dialog as="div" @close="close">
      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="min-h-screen px-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <DialogOverlay class="fixed inset-0 bg-gray-600 bg-opacity-50" />
          </TransitionChild>

          <span class="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>

          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
          <div class="font-encode inline-block w-full max-w-md p-6 my-8 text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
            <form @submit.prevent="$parent.submit">
              <DialogTitle
                  as="h3"
                  class="text-lg font-medium leading-6 text-gray-900"
                >
                <slot name="title"></slot>
                </DialogTitle>
              <div class="mt-3">
                  <slot></slot>
              </div>
              <div class="mt-4 text-sm text-right">
                  <button
                      type="button"
                      class="px-5 py-2 border rounded-md text-gray-900 bg-white hover:bg-stone-100 mr-4"
                      @click="close"
                  >Cancel</button>

                  <button
                      type="submit"
                      class="px-5 py-2 transition text-white bg-stone-500 rounded-lg hover:bg-stone-400 border border-stone-100"
                  >
                  {{ submitButtonText }}
                  </button>    
              </div>
          </form>
          </div>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</div>
</template>

<script>
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogOverlay,
  DialogTitle,
} from '@headlessui/vue'

export default {
  props: {
    submitButtonText: {
      type: String,
      default: 'Create'
    }
  },
  components: {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogOverlay,
    DialogTitle,
  },
  data() {
    return {
      isOpen: false
    }
  },
  methods: {
    open() {
      this.isOpen = true
    },
    close() {
      this.isOpen = false
    }
  }
}
</script>