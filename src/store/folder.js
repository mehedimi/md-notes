export default {
  namespaced: true,
  state: {
    folders: {
      data: [],
    },
  },
  getters: {
    folderWithNotes(state, getters, rootState) {
      return state.folders.data.map((folder) => {
        return {
          ...folder,
          notes: rootState.note.notes.data.filter(
            (note) => folder.id === note.folder_id
          ),
        };
      });
    },
  },
  actions: {
    create({ commit }, payload) {
      return new Promise((resolve, reject) => {
        window.folders.create(Object.assign({}, payload)).then((response) => {
          if (response.hasOwnProperty("errors")) {
            reject(response.errors);
          } else {
            commit("ADD_FOLDER", response.data);
            resolve(response.data);
          }
        });
      });
    },
    get({ commit }) {
      window.folders.get().then((data) => {
        commit("SET_FOLDERS", { data });
      });
    },
    delete({ commit }, folderId) {
      return new Promise((resolve, reject) => {
        window.folders.delete(folderId).then((response) => {
          commit("DELETE_FOLDER", folderId);
          resolve(response);
        });
      });
    },
  },
  mutations: {
    SET_FOLDERS(state, folders) {
      state.folders = folders;
    },
    DELETE_FOLDER(state, folderId) {
      const folderIndex = state.folders.data.findIndex((folder) => {
        return folder.id == folderId;
      });

      state.folders.data.splice(folderIndex, 1);
    },
    ADD_FOLDER(state, folder) {
      state.folders.data.push(folder);
    },
  },
};
