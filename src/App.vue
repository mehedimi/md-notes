<template>
  <div class="flex h-screen font-encode">
    <keep-alive>
      <SidePanel class="w-[250px] min-w-[250px]" v-if="visibleSidebar" />
    </keep-alive>
    <router-view class="w-full bg-dark"></router-view>
  </div>
</template>

<script>
import SidePanel from "./components/SidePanel.vue";
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState("option", ["visibleSidebar"]),
  },
  components: {
    SidePanel,
  },
  mounted() {
    this.$store.dispatch("folder/get");
    this.$store.dispatch("note/get");
  },
};
</script>
