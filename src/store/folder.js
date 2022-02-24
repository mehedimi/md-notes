import Api from '../api/api'

export default {
    namespaced: true,
    state: {
        folders: {
            data: []
        }
    },
    getters: {
        allFolders(state) {
            return [
                {
                    route: {
                        name: 'folder.index'
                    },
                    name: 'All Notes',
                    icon: 'border-all'
                }
            ].concat(
                state.folders.data.map((folder) => {
                    return {
                        name: folder.name,
                        id: folder.id,
                        icon: folder.icon,
                        route: {
                            name: 'folder.notes.index',
                            params: {
                                folder: folder.id
                            }
                        }
                    }
                })
            )
        }
    },
    actions: {
        create({commit}, payload) {
            return new Promise((resolve, reject) => {
                Api.post('/folders', payload).then(({ data }) => {
                    commit('ADD_FOLDER', data.data)
                    resolve(data)
                }).catch(({ response }) => {
                    reject(response)
                })
            })
        },
        get({commit}) {
            Api.get('/folders').then(({ data }) => {
                commit('SET_FOLDERS', data)
            })
        },
        delete({ commit }, folderId) {
            return new Promise((resolve, reject) => {
                Api.delete(`/folders/${folderId}`).then(({ data }) => {
                    commit('DELETE_FOLDER', folderId)
                    resolve(data)
                }).catch(({ response }) => {
                    reject(response)
                })
            })
        }
    },
    mutations: {
        SET_FOLDERS(state, folders) {
            state.folders = folders
        },
        DELETE_FOLDER(state, folderId) {
            const folderIndex = state.folders.data.findIndex((folder) => {
                return folder.id == folderId
            })

            state.folders.data.splice(folderIndex, 1)
        },
        ADD_FOLDER(state, folder) {
            state.folders.data.push(folder)
        }
    }
}