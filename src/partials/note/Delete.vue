<template>
  <Modal ref="delete">
    <div class="p-6 text-white">
      <h2 class="mb-2 text-lg text-white">Confirmation!</h2>
      <p>Are you sure, you want to delete this note?</p>
      <div>
        <div class="mt-6 grid grid-cols-2 gap-x-4">
          <button
            class="w-full rounded-lg border border-dark bg-dark py-3 text-center text-xs font-semibold uppercase text-light shadow-sidebar hover:text-white"
            type="button"
            @click="$refs.delete.closeModal"
          >
            Cancel
          </button>
          <button
            class="w-full rounded-lg bg-red-500 text-xs font-semibold uppercase hover:bg-red-600"
            type="submit"
            @click="deleteNote"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script>
import Modal from "../../components/Modal.vue";

export default {
  props: {
    noteId: {
      type: Number,
    },
  },
  components: {
    Modal,
  },
  methods: {
    openModal() {
      this.$refs.delete.openModal();
    },
    deleteNote() {
      this.$store.dispatch("note/delete", this.noteId).then(() => {
        this.$refs.delete.closeModal();
      });
    },
  },
};
</script>
