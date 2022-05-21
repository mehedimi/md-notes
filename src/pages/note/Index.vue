<template>
  <router-view v-if="$route.name !== 'notes.index'"></router-view>
  <div v-else class="flex flex-col items-center justify-center p-10 text-white">
    <i class="las la-comment-slash mb-10 text-8xl text-indigo-500"></i>
    <h2 class="text-2xl font-medium">Nothing opened here</h2>
    <p></p>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { computed, onMounted, watch } from "vue";
import { TransitionRoot } from "@headlessui/vue";
import SidePanel from "../../components/SidePanel.vue";

export default {
  components: {
    SidePanel,
    TransitionRoot,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    watch(
      () => route,
      (next) => {
        store.dispatch("note/get", next.query);
      }
    );

    return {
      visibleSidebar: computed(() => store.state.option.visibleSidebar),
    };
  },
};
</script>
