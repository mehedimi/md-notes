export default {
  namespaced: true,
  state: {
    tags: {
      data: [],
    },
    tag: {},
  },
  actions: {
    get({ commit }) {
      tags.get().then((data) => {
        commit("SET_TAGS", data);
      });
    },
    create({ commit }, name) {
      return new Promise((resolve, reject) => {
        tags
          .create({
            name,
          })
          .then(({ data }) => {
            commit("CREATE", data);
            resolve(data);
          })
          .catch(({ response }) => {
            reject(response);
          });
      });
    },
    assign({ commit, state }, { noteId, tagId }) {
      return new Promise((resolve, reject) => {
        tags.assign(noteId, tagId).then((response) => {
          if (response.success) {
            resolve(state.tags.data.find((t) => t.id === Number(tagId)));
          } else {
            reject();
          }
        });
      });
    },
    detach({ commit }, { noteId, tagId }) {
      return tags.unassign(noteId, tagId);
    },
  },
  mutations: {
    CREATE(state, tag) {
      state.tags.data.push(tag);
    },
    SET_TAGS(state, tags) {
      state.tags = tags;
    },
  },
};
