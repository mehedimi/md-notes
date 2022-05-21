import keyBy from "lodash/keyBy";

export default {
  namespaced: true,
  state: {
    notes: [],
  },
  mutations: {
    ADD(state, noteId) {
      if (!state.notes.includes(noteId)) {
        state.notes.unshift(noteId);
      }
    },
    REMOVE(state, index) {
      state.notes.splice(index, 1);
    },
  },
  getters: {
    notes(state, getters, rootState) {
      const notes = keyBy(rootState.note.notes.data, "id");
      return state.notes.map((noteId) => {
        return notes[noteId];
      });
    },
  },
};
