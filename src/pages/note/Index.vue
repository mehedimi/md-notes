<template>
  <router-view></router-view>
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
