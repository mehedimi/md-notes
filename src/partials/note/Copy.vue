<template>
  <Modal ref="copy">
    <form class="p-5" @submit.prevent="copy">
      <div class="my-4">
        <label class="mb-1 inline-block text-sm text-light" for="copy-folder"
          >Copy to</label
        >
        <select
          id="copy-folder"
          v-model="folderId"
          class="w-full rounded border border-dark bg-sidebar text-light placeholder-light placeholder:text-sm focus:border-dark focus:ring-0"
        >
          <option disabled value="">Select folder</option>
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
            @click="$refs.copy.closeModal"
          >
            Cancel
          </button>
          <button
            class="w-full rounded-lg bg-indigo-500 text-xs font-semibold uppercase text-white hover:bg-indigo-600"
            type="submit"
          >
            Copy
          </button>
        </div>
      </div>
    </form>
  </Modal>
</template>
<script>
import Modal from "../../components/Modal.vue";
import { mapState } from "vuex";

export default {
  props: {
    excludeFolderId: {
      type: Number,
    },
  },
  components: {
    Modal,
  },
  data() {
    return {
      folderId: "",
    };
  },
  computed: {
    ...mapState("folder", {
      folders(state) {
        return state.folders.data.filter((f) => f.id !== this.excludeFolderId);
      },
    }),
    ...mapState("note", ["note"]),
  },
  methods: {
    openModal() {
      return this.$refs.copy.openModal();
    },
    copy() {
      notes.create();
    },
  },
};
</script>
