import Api from '../api/api'

export default {
    namespaced: true,
    state: {
        notes: {
            data: []
        },
        note: {}
    },
    actions: {
        get({ commit }, payload = {}) {
            const { folderId } = payload
            Api.get('notes', {
                params: {
                    folder_id: folderId,
                    s: payload.s
                }
            }).then(({ data }) => {
                commit('SET_NOTES', data)
            })
        },
        show({ commit }, noteId) {
            Api.get(`notes/${noteId}`).then(({ data }) => {
                commit('SET_NOTE', data.data)
            })
        },
        create({ commit }, note = {}) {
            return new Promise((resolve, reject) => {
                Api.post('/notes', note).then(({ data }) => {
                    resolve(data)
                }).catch(({ response }) => {
                    reject(response)
                })
            })
        }
    },
    mutations: {
        SET_NOTES(state, notes) {
            state.notes = notes
        },
        SET_NOTE(state, note) {
            state.note = note
        }
    }
}