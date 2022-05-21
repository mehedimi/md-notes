<template>
  <Modal ref="move">
    <form class="p-5" @submit.prevent="moveNote">
      <div class="mb-4">
        <label class="mb-1 inline-block text-sm text-light" for="move-folder"
          >Move to</label
        >
        <select
          id="move-folder"
          class="w-full rounded border border-dark bg-sidebar text-light placeholder-light placeholder:text-sm focus:border-dark focus:ring-0"
          v-model="folderId"
        >
          <option disabled selected value="">Select folder</option>
          <option v-for="folder in folders" :value="folder.id">
            {{ folder.name }}
          </option>
        </select>
      </div>
      <div>
        <div class="mt-6 grid grid-cols-2 gap-x-4">
          <button
            class="w-full rounded-lg border border-dark bg-dark py-3 text-center text-xs font-semibold uppercase text-light shadow-sidebar hover:text-white"
            type="button"
            @click="$refs.move.closeModal"
          >
            Cancel
          </button>
          <button
            class="w-full rounded-lg bg-indigo-500 text-xs font-semibold uppercase text-white hover:bg-indigo-600"
            type="submit"
          >
            Move
          </button>
        </div>
      </div>
    </form>
  </Modal>
</template>
<script>
import Modal from "../../components/Modal.vue";
import { mapActions, mapState } from "vuex";

export default {
  components: {
    Modal,
  },
  data() {
    return {
      noteId: undefined,
      folderId: "",
    };
  },
  computed: {
    ...mapState("folder", {
      folders(state) {
        return state.folders.data;
      },
    }),
  },
  methods: {
    ...mapActions("note", ["move"]),
    openModal(noteId) {
      this.noteId = noteId;
      this.$refs.move.openModal();
    },
    moveNote() {
      if (!this.folderId) return;
      this.move({
        folderId: this.folderId,
      }).then(() => {
        this.$refs.move.closeModal();
      });
    },
  },
};
</script>
