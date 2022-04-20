<template>
  <div class="note-area h-fit overflow-y-auto px-6 pb-6">
    <h2 class="mb-6 text-4xl font-bold text-heading">{{ note.title }}</h2>
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

<!--<style>-->
<!--.note-area {-->
<!--  background: linear-gradient(white 30%, transparent) top / 100% 40px no-repeat-->
<!--      local,-->
<!--    linear-gradient(transparent, white 70%) bottom/100% 40px no-repeat local,-->
<!--    /* Shadows */-->
<!--      radial-gradient(-->
<!--        farthest-side at top,-->
<!--        rgba(0, 0, 0, 0.2),-->
<!--        rgba(0, 0, 0, 0)-->
<!--      )-->
<!--      top / 100% 14px no-repeat,-->
<!--    radial-gradient(-->
<!--        farthest-side at bottom,-->
<!--        rgba(0, 0, 0, 0.2),-->
<!--        rgba(0, 0, 0, 0)-->
<!--      )-->
<!--      bottom / 100% 14px no-repeat;-->
<!--}-->
<!--</style>-->
