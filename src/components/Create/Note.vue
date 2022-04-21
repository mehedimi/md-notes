<template>
  <form @submit.prevent="submit">
    <div class="mb-6">
      <select
        id="folder"
        class="w-full rounded border border-dark bg-sidebar text-sm text-light placeholder-light placeholder:text-sm focus:border-dark focus:ring-0"
        v-model="data.folder_id"
      >
        <option disabled value="" selected>Select any folder</option>
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
        class="w-full rounded border border-dark bg-sidebar text-light placeholder-light placeholder:text-sm focus:border-dark focus:ring-0"
        v-model="data.title"
      />
      <p
        class="mt-0.5 text-xs text-red-500"
        v-if="errors.hasOwnProperty('title')"
      >
        {{ errors.title.message }}
      </p>
    </div>
    <ActionButton />
  </form>
</template>

<script>
import Resource from "./Resource.vue";
import ActionButton from "./ActionButton.vue";
import { mapActions, mapMutations, mapState } from "vuex";

export default {
  extends: Resource,
  components: {
    ActionButton,
  },
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
