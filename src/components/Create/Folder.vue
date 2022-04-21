<template>
  <form @submit.prevent="submit">
    <div>
      <input
        type="text"
        id="name"
        placeholder="Name"
        class="w-full rounded border border-dark bg-sidebar text-light placeholder-light placeholder:text-sm focus:border-dark focus:ring-0"
        v-model="data.name"
      />
      <p
        class="mt-0.5 text-xs text-red-500"
        v-if="errors.hasOwnProperty('name')"
      >
        {{ errors.name.message }}
      </p>
    </div>
    <ActionButton />
  </form>
</template>

<script>
import Resource from "./Resource.vue";
import ActionButton from "./ActionButton.vue";
import { mapActions } from "vuex";

export default {
  extends: Resource,
  components: {
    ActionButton,
  },
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
