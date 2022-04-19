import moment from "moment";

export default {
  namespaced: true,
  state: {
    notes: {
      data: [],
    },
    note: {},
    mode: "1:1", // 1:0, 0:1,
    updating: false,
    loaded: false,
  },
  getters: {
    lastUpdatedAt(state) {
      if (state.note.updated_at) {
        return moment(state.note.updated_at).fromNow();
      }

      return "";
    },
  },
  actions: {
    get({ commit }, payload = {}) {
      notes.get(payload).then((data) => {
        commit("SET_NOTES", data);
      });
    },
    show({ commit }, noteId) {
      commit("SET_LOADING", false);
      notes.find(noteId).then(({ data }) => {
        commit("SET_NOTE", data);
        commit("SET_LOADING", true);
      });
    },
    create({ commit }, note = {}) {
      return new Promise((resolve, reject) => {
        notes.create(Object.assign({}, note)).then((response) => {
          if (response.hasOwnProperty("errors")) {
            reject(response.errors);
          } else {
            resolve(response);
          }
        });
      });
    },
    delete({ commit }, noteId) {
      return new Promise((resolve, reject) => {
        notes
          .delete(noteId)
          .then(() => {
            commit("DELETE_NOTE", noteId);
            resolve();
          })
          .catch(() => {
            reject();
          });
      });
    },
    update(context, { noteId, data }) {
      return window.notes.update(noteId, data);
    },
    updateContent({ state, commit }) {
      commit("SET_UPDATING", true);
      return window.notes
        .update(state.note.id, {
          content: state.note.content,
        })
        .then((data) => {
          commit("SET_ATTR", {
            attr: "updated_at",
            value: data.updated_at,
          });
        })
        .finally(() => {
          commit("SET_UPDATING", false);
        });
    },
  },
  mutations: {
    SET_NOTES(state, notes) {
      state.notes = notes;
    },
    SET_NOTE(state, note) {
      state.note = note;
    },
    UNSHIFT_NOTE(state, note) {
      state.notes.data.unshift(note);
    },
    DELETE_NOTE(state, noteId) {
      const index = state.notes.data.findIndex((n) => n.id === Number(noteId));
      if (index > -1) {
        state.notes.data.splice(index, 1);
      }
    },
    SET_CONTENT(state, content) {
      state.note.content = content;
    },
    SET_UPDATING(state, status) {
      state.updating = status;
    },
    SET_ATTR(state, { attr, value }) {
      state.note[attr] = value;
    },
    ASSIGN_TAG(state, tag) {
      state.note.tags.push(tag);
    },
    DETACH_TAG(state, tagId) {
      const index = state.note.tags.findIndex((t) => t.id === tagId);
      if (index > -1) {
        state.note.tags.splice(index, 1);
      }
    },
    REMOVE_TAG_FROM_LIST(state, { tagId, noteId }) {
      const noteIndex = state.notes.data.findIndex(
        (note) => note.id === Number(noteId)
      );
      if (noteIndex === -1) return;

      const tagIndex = state.notes.data[noteIndex].tags.findIndex(
        (tag) => tag.id === Number(tagId)
      );
      if (tagIndex === -1) return;
      state.notes.data[noteIndex].tags.splice(tagIndex, 1);
    },
    ADD_TAG_TO_LIST(state, { noteId, tag }) {
      const noteIndex = state.notes.data.findIndex(
        (note) => note.id === Number(noteId)
      );
      if (noteIndex === -1) return;

      state.notes.data[noteIndex].tags.push(tag);
    },
    SET_LOADING(state, status) {
      state.loaded = status;
    },
    UPDATE_TITLE_ON_LIST(state) {
      const note = state.notes.data.find((n) => n.id === state.note.id);
      if (!note) return;

      note.title = state.note.title;
    },
  },
};
