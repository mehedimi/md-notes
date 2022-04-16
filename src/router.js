import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        redirect: '/notes'
    },
    {
        path: '/notes',
        name: 'notes.index',
        component: () => import('./pages/note/Index.vue'),
        children: [
            {
                path: ':noteId',
                name: 'notes.show',
                component: () => import('./pages/note/Show.vue')
            }
        ]
    }
]

export default createRouter({
    routes,
    history: createWebHashHistory()
})