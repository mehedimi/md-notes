const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('notes', {
    get(query) {
        return ipcRenderer.invoke('get:notes', query)
    },
    find(noteId, query) {
        return ipcRenderer.invoke('get:notes/:note', noteId, query)
    },
    create(payload) {
        return ipcRenderer.invoke('post:notes', payload)
    },
    delete(id) {
        return ipcRenderer.invoke('delete:notes/:note', id)
    },
    update(id, data) {
        return ipcRenderer.invoke('patch:notes/:note', id, data)
    }
})

contextBridge.exposeInMainWorld('folders', {
    get(query) {
        return ipcRenderer.invoke('get:folders', query)
    },
    create(payload) {
        return ipcRenderer.invoke('post:folders', payload)
    },
    delete(folderId) {
        return ipcRenderer.invoke('delete:folders/:folder', folderId)
    }
})

contextBridge.exposeInMainWorld('tags', {
    get(query) {
        return ipcRenderer.invoke('get:tags', query)
    },
    assign(noteId, tagId) {
        return ipcRenderer.invoke('post:notes/:note/tags/:tag', noteId, tagId)
    },
    unassign(noteId, tagId) {
        return ipcRenderer.invoke('delete:notes/:note/tags/:tag', noteId, tagId)
    },
    create(tag) {
        return ipcRenderer.invoke('post:tags', tag)
    }
})