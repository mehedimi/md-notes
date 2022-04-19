<script>
import focusTrap from "../../mixins/focus-trap";
export default {
  mixins: [focusTrap],
  props: {
    closeModal: {
      type: Function,
    },
  },
  methods: {
    setPayload(payload = {}) {
      Object.keys(payload).forEach((key) => {
        this.data[key] = payload[key];
      });
    },
  },
};
</script>
