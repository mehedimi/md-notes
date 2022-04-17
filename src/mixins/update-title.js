export default {
  methods: {
    updateTitle() {
      this.update({
        noteId: this.note.id,
        data: {
          title: this.note.title,
        },
      }).then(() => {
        this.$store.commit("note/UPDATE_TITLE_ON_LIST");
      });
    },
  },
};
