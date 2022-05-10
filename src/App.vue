<template>
  <div class="flex h-screen font-encode">
    <keep-alive>
      <SidePanel class="w-[250px] min-w-[250px]" v-if="visibleSidebar" />
    </keep-alive>
    <router-view class="w-full bg-dark"></router-view>
    <Spotlight />
  </div>
</template>

<script>
import { mapState } from "vuex";
import SidePanel from "./components/SidePanel.vue";
import Spotlight from "./components/Spotlight.vue";

export default {
  computed: {
    ...mapState("option", ["visibleSidebar"]),
  },
  components: {
    SidePanel,
    Spotlight,
  },
  mounted() {
    this.$store.dispatch("folder/get");
    this.$store.dispatch("note/get");
  },
};
</script>
