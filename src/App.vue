<template>
  <router-view class="font-encode"></router-view>
</template>

<script>
import "flowbite";

export default {
  mounted() {
    this.$store.dispatch("tag/get");
  },
};
</script>
