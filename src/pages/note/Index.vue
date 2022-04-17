<template>
  <div class="flex h-screen">
    <SidePanel class="w-[250px] min-w-[250px]" />
    <router-view></router-view>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { onMounted, watch } from "vue";
import SidePanel from "../../components/SidePanel.vue";

export default {
  components: {
    SidePanel,
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
  },
};
</script>
