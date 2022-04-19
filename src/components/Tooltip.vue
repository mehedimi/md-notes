<template>
  <component :data-tooltip-target="`tooltip-${id}`" :is="as">
    <slot></slot>
    <div
      :id="`tooltip-${id}`"
      role="tooltip"
      class="tooltip invisible absolute z-20 inline-block rounded-lg bg-dark py-2 px-3 text-xs font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700"
    >
      <slot name="content"></slot>
      <div class="tooltip-arrow" data-popper-arrow></div>
    </div>
  </component>
</template>
<script>
import Tooltip from "flowbite/src/components/tooltip";

export default {
  props: {
    as: {
      type: String,
      default: "button",
    },
    placement: {
      type: String,
      default: "top",
    },
    triggerType: {
      type: String,
      default: "hover",
    },
  },
  data() {
    return {
      id: parseInt(Math.random() * 100),
    };
  },
  mounted() {
    new Tooltip(this.$el.querySelector(`#tooltip-${this.id}`), this.$el, {
      placement: this.placement,
      triggerType: this.triggerType,
    });
  },
};
</script>
