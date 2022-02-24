<template>
  <FormModal ref="modal">
    <template v-slot:title>Create Folder</template>
    <div class="mt-4">
      <input placeholder="Type folder name here" type="text" v-model="form.name" class="rounded-md w-full border-gray-200 focus:border-gray-200 focus:ring-gray-300 transition focus:ring-2 py-2 px-4">
      <p class="mt-1 text-sm text-red-500" v-if="errors.hasOwnProperty('name')">{{ errors.name.message }}</p>
    </div>
  </FormModal>

  <button @click="$refs.modal.open" class="my-4 px-5 py-3 w-full bg-white text-gray-700 text-sm rounded-lg flex items-center border border-transparent hover:border-gray-200 ring-0">
      <i class="las la-plus text-xl mr-4"></i>
      <span>Add new folder</span>
  </button>
</template>

<script>
import FormModal from '../Modal/FormModal.vue'
import icons from '../../helpers/icons'
import {
  Combobox,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
  ComboboxButton,
  TransitionRoot,
  DialogOverlay,
  TransitionChild,
  DialogTitle,
  Dialog
} from '@headlessui/vue'

export default {
  components: {
    FormModal,
    Combobox,
    ComboboxInput,
    ComboboxButton,
    ComboboxOptions,
    ComboboxOption,
    TransitionRoot,
    DialogOverlay,
    TransitionChild,
    DialogTitle,
    Dialog
  },
  data() {
    return {
      form: {
        name: '',
        icon: 'sticky-note'
      },
      errors: {},
    }
  },
  methods: {
    submit() {
      this.$store.dispatch('folder/create', this.form).then(() => {
        this.reset()  
      }).catch(({ data }) => {
        this.errors = data;
      })
    },
    reset() {
      this.form.name = ''
      this.errors = {}
      this.$refs.modal.close()
    }
  }
}
</script>
