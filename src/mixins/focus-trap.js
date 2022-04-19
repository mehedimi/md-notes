export default {
  mounted() {
    const input = this.$el.querySelector("input");
    if (!input) return;

    input.focus();
  },
};
