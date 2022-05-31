import keyBy from "lodash/keyBy";

export default {
  namespaced: true,
  state: {
    noteIds: [],
  },
  mutations: {
    ADD(state, noteId) {
      if (!state.noteIds.includes(noteId)) {
        state.noteIds.unshift(noteId);
      }
    },
    REMOVE(state, index) {
      state.noteIds.splice(index, 1);
    },
  },
  getters: {
    notes(state, getters, rootState) {
      const notes = keyBy(rootState.note.notes.data, "id");
      return state.noteIds.map((noteId) => {
        return notes[noteId];
      });
    },
  },
};
