<template>
  <router-view class="bg-dark font-encode"></router-view>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch("tag/get");
  },
};
</script>
