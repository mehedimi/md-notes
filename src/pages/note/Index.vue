<template>
  <div class="flex h-screen">
    <keep-alive>
      <SidePanel class="w-[250px] min-w-[250px]" v-if="visibleSidebar" />
    </keep-alive>
    <div v-if="$route.name === 'notes.index'"></div>
    <router-view v-else></router-view>
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

    onMounted(() => {
      store.dispatch("note/get");
      store.dispatch("folder/get");
    });

    watch(
      () => route.query,
      (next) => {
        store.dispatch("note/get", next);
      }
    );

    return {
      visibleSidebar: computed(() => store.state.option.visibleSidebar),
    };
  },
};
</script>
