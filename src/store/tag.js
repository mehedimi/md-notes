import Api from "../api/api";

export default {
    namespaced: true,
    state: {
        tags: {
            data: []
        },
        tag: {}
    },
    actions: {
        get({commit}) {
            Api.get('/tags').then(({ data }) => {
                commit('SET_TAGS', data)
            })
        },
        create({ commit }, name) {
            return new Promise((resolve, reject) => {
                Api.post('/tags', {
                    name
                }).then(({ data }) => {
                    commit('CREATE', data)
                    resolve(data)
                }).catch(({ response }) => {
                    reject(response)
                })
            })
        },
        assign({ commit, state }, { noteId, tagId }) {
            return new Promise((resolve, reject) => {
                Api.post(`/notes/${noteId}/tags`, {
                    tag_id: tagId
                }).then(() => {
                    resolve(state.tags.data.find(t => t.id === Number(tagId)))
                }).catch(({ response }) => {
                    reject(response)
                })
            })
        },
        detach({ commit }, { noteId, tagId }) {
            return new Promise((resolve, reject) => {
                Api.delete(`/notes/${noteId}/tags/${tagId}`).then(() => {
                    resolve(tagId)
                }).catch(({ response }) => {
                    reject(response)
                })
            })
        }
    },
    mutations: {
        CREATE(state, tag) {
            state.tags.data.push(tag)
        },
        SET_TAGS(state, tags) {
            state.tags = tags
        }
    }
}