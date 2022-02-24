import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        redirect: '/folders'
    },
    {
        path: '/folders',
        component: () => import('./pages/folder/Index.vue'),
        children: [
            {
                path: '',
                name: 'folder.index',
                component: () => import('./pages/folder/All.vue')
            },
            {
                path: ':folder/notes',
                name: 'folder.notes.index',
                component: () => import('./pages/folder/Notes.vue'),
                children: [
                    {
                        path: ':note',
                        name: 'folder.note.show',
                        component: () => import('./pages/folder/NoteShow.vue')
                    }
                ]
            },
            {
                path: 'notes/:note',
                name: 'note.show',
                component: () => import('./pages/note/Show.vue')
            }
        ]
    }
]

export default createRouter({
    routes,
    history: createWebHashHistory()
})