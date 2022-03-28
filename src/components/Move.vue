<template>
  <FormModal ref="modal" submit-button-text="Move">
    <template v-slot:title>Move note</template>
  </FormModal>
</template>

<script>
import FormModal from "./Modal/FormModal.vue";

export default {
  components: {
    FormModal
  },
  methods: {
    open() {
      this.$refs.modal.open()
    },
    submit() {

    }
  }
}
</script>