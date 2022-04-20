<template>
  <form @submit.prevent="submit">
    <div>
      <input
        type="text"
        id="name"
        placeholder="Name"
        class="w-full border-0 border-b border-b-sidebar pl-0 text-gray-500 placeholder-gray-400 placeholder:text-sm focus:border-b-gray-300 focus:ring-0"
        v-model="data.name"
      />
      <p
        class="mt-0.5 text-xs text-red-500"
        v-if="errors.hasOwnProperty('name')"
      >
        {{ errors.name.message }}
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
import Resource from "./Resource.vue";
import { mapActions } from "vuex";

export default {
  extends: Resource,
  data() {
    return {
      errors: {},
      data: {
        name: "",
        icon: "demo",
      },
    };
  },
  methods: {
    ...mapActions("folder", ["create"]),
    submit() {
      this.create(this.data)
        .then(() => {
          this.errors = {};
          this.data.name = "";
          this.closeModal();
        })
        .catch((errors) => {
          this.errors = errors;
        });
    },
  },
};
</script>
