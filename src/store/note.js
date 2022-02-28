import Api from '../api/api';
import moment from 'moment';

export default {
    namespaced: true,
    state: {
        notes: {
            data: []
        },
        note: {},
        mode: '1:1', // 1:0, 0:1,
        updating: false
    },
    getters: {
        lastUpdatedAt(state) {
            if (state.note.updated_at) {
                return moment(state.note.updated_at).fromNow()
            }

            return '';
        }
    },
    actions: {
        get({ commit }, payload = {}) {
            const { folderId: folder_id, s } = payload
            return Api.get('notes', {
                params: {
                    folder_id,
                    s
                }
            }).then(({ data }) => {
                commit('SET_NOTES', data)
            })
        },
        show({ commit }, noteId) {
            commit('SET_NOTE', {})
            return new Promise((resolve, reject) => {
                Api.get(`notes/${noteId}`).then(({ data }) => {
                    commit('SET_NOTE', data.data)
                    resolve(data)
                }).catch(({ response }) => {
                    reject(response)
                })
            })
        },
        create({ commit }, note = {}) {
            return new Promise((resolve, reject) => {
                Api.post('/notes', note).then(({ data }) => {
                    commit('UNSHIFT_NOTE', data)
                    resolve(data)
                }).catch(({ response }) => {
                    reject(response)
                })
            })
        },
        delete({ commit }, noteId) {
            return Api.delete(`/notes/${noteId}`).then(() => {
                commit('DELETE_NOTE', noteId)
            })
        },
        update(context, { noteId, data }) {
            return Api.patch(`/notes/${noteId}`, data)
        },
        updateContent({ state, commit}) {
            commit('SET_UPDATING', true)
            Api.patch(`notes/${state.note.id}`, {
                content: state.note.content
            }).then(({ data }) => {
                commit('SET_ATTR', {
                    attr: 'updated_at',
                    value: data.updated_at
                })
            }).finally(() => {
                commit('SET_UPDATING', false)
            })
        }
    },
    mutations: {
        SET_NOTES(state, notes) {
            state.notes = notes
        },
        SET_NOTE(state, note) {
            state.note = note
        },
        UNSHIFT_NOTE(state, note) {
            state.notes.data.unshift(note)
        },
        DELETE_NOTE(state, noteId) {
            const index = state.notes.data.findIndex(n => n.id == noteId);
            if (index > -1) {
                state.notes.data.splice(index, 1)
            }
        },
        SET_CONTENT(state, content) {
            state.note.content = content
        },
        SET_UPDATING(state, status) {
            state.updating = status
        },
        SET_ATTR(state, { attr, value }) {
            state.note[attr] = value
        }
    }
}