<template>
  <div class="note-area h-fit overflow-y-auto px-6">
    <h2 class="mb-6 text-4xl font-bold text-indigo-500">{{ note.title }}</h2>
    <Preview @checked="HANDLE_CHECKBOX" />
  </div>
</template>
<script>
import Preview from "../../components/Note/Preview.vue";
import { mapMutations, mapState } from "vuex";

export default {
  components: {
    Preview,
  },
  computed: mapState("note", ["note"]),
  methods: {
    ...mapMutations("note", ["HANDLE_CHECKBOX"]),
  },
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
