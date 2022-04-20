<template>
  <form @submit.prevent="submit">
    <div class="mb-6">
      <label for="folder" class="text-sm text-gray-400">Folder</label>
      <select
        id="folder"
        class="w-full border-0 border-b border-b-sidebar pl-0 text-gray-500 placeholder-gray-400 placeholder:text-sm focus:border-b-gray-300 focus:ring-0"
        v-model="data.folder_id"
      >
        <option value="" selected>Select any folder</option>
        <option :value="folder.id" v-for="folder in folders.data">
          {{ folder.name }}
        </option>
      </select>
      <p
        class="mt-0.5 text-xs text-red-500"
        v-if="errors.hasOwnProperty('folder_id')"
      >
        {{ errors.folder_id.message }}
      </p>
    </div>
    <div>
      <input
        type="text"
        id="name"
        placeholder="Title"
        class="w-full border-0 border-b border-b-sidebar pl-0 text-gray-500 placeholder-gray-400 placeholder:text-sm focus:border-b-gray-300 focus:ring-0"
        v-model="data.title"
      />
      <p
        class="mt-0.5 text-xs text-red-500"
        v-if="errors.hasOwnProperty('title')"
      >
        {{ errors.title.message }}
      </p>
    </div>
    <div class="mt-6 grid grid-cols-2 gap-x-4">
      <button
        class="w-full rounded-lg border py-3 text-center text-xs font-semibold uppercase text-gray-600 shadow-sidebar hover:bg-gray-100"
        @click="closeModal"
        type="button"
      >
        Cancel
      </button>
      <button
        class="w-full rounded-lg bg-emerald-400 text-xs font-semibold uppercase text-white hover:bg-emerald-500"
        type="submit"
      >
        Create
      </button>
    </div>
  </form>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import Resource from "./Resource.vue";

export default {
  extends: Resource,
  data() {
    return {
      errors: {},
      data: {
        title: "",
        folder_id: "",
      },
    };
  },
  computed: mapState("folder", ["folders"]),
  methods: {
    ...mapActions("note", ["create"]),
    ...mapMutations("note", ["UNSHIFT_NOTE"]),
    submit() {
      this.create(this.data)
        .then((note) => {
          this.errors = {};
          this.data.name = "";
          this.closeModal();
          this.UNSHIFT_NOTE(note);
          this.$router.push({
            name: "notes.edit",
            params: {
              noteId: note.id,
            },
            query: {
              page: "edit",
            },
          });
        })
        .catch((errors) => {
          this.errors = errors;
        });
    },
  },
};
</script>
