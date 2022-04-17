<template>
  <div class="note-area mx-auto h-fit w-11/12 overflow-y-auto pb-6 md:w-9/12">
    <h2 class="mb-6 text-4xl font-bold">{{ note.title }}</h2>
    <Preview />
  </div>
</template>
<script>
import Preview from "../../components/Note/Preview.vue";
import { mapState } from "vuex";

export default {
  components: {
    Preview,
  },
  computed: mapState("note", ["note"]),
};
</script>

<style>
.note-area {
  background: linear-gradient(white 30%, transparent) top / 100% 40px no-repeat
      local,
    linear-gradient(transparent, white 70%) bottom/100% 40px no-repeat local,
    /* Shadows */
      radial-gradient(
        farthest-side at top,
        rgba(0, 0, 0, 0.2),
        rgba(0, 0, 0, 0)
      )
      top / 100% 14px no-repeat,
    radial-gradient(
        farthest-side at bottom,
        rgba(0, 0, 0, 0.2),
        rgba(0, 0, 0, 0)
      )
      bottom / 100% 14px no-repeat;
}
</style>
