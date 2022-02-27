<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal">
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
            <div
              class="font-encode inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl"
            >
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900"
              >
                <slot name="title"></slot>
              </DialogTitle>
              <div class="mt-2">
                <p class="text-sm text-gray-500">
                  <slot></slot>
                </p>
              </div>

              <div class="mt-4 text-right text-sm">
                <button
                  type="button"
                  class="px-5 py-2 border font-medium rounded-md text-gray-900 bg-white hover:bg-indigo-50 mr-4"
                  @click="closeModal"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  class="px-5 py-2 font-medium rounded-md bg-red-500 text-white border border-red-500 hover:bg-red-600"
                  @click="ok"
                >
                  OK
                </button>
              </div>
            </div>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
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
  components: {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogOverlay,
    DialogTitle,
  },
  data() {
    return {
      isOpen: false,
      payload: undefined
    }
  },
  methods: {
    closeModal() {
      this.isOpen = false
      this.payload = undefined
    },
    openModal(payload = {}) {
      this.isOpen = true
      this.payload = payload
    },
    ok() {
      this.$emit('ok', this.payload)
      this.closeModal()
    }
  }
}
</script>
