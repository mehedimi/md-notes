import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/folders",
    component: () => import("./pages/folder/Index.vue"),
    name: "folders.index",
  },
  {
    path: "/",
    redirect: "/notes",
  },
  {
    path: "/notes",
    name: "notes.index",
    component: () => import("./pages/note/Index.vue"),
    children: [
      {
        path: ":noteId",
        name: "notes.show",
        component: () => import("./pages/note/Show.vue"),
        redirect: (to) => {
          return `/notes/${to.params.noteId}/${to.query.page || "view"}`;
        },
        children: [
          {
            path: "view",
            component: () => import("./pages/note/View.vue"),
            name: "notes.view",
          },
          {
            path: "edit",
            component: () => import("./pages/note/Edit.vue"),
            name: "notes.edit",
          },
          {
            path: "live-edit",
            name: "notes.live-edit",
            component: () => import("./pages/note/LiveEdit.vue"),
          },
        ],
      },
    ],
  },
];

export default createRouter({
  routes,
  history: createWebHashHistory(),
});
