const routes = [
    {
        path: "/",
        component: () => import("layouts/MainLayout.vue"),
        children: [
            {
                path: "",
                component: () => import("pages/IndexPage.vue"),
            },
            {
                path: "times",
                name: "team",
                component: () => import("pages/TimesSaved.vue"),
            },
            {
                path: ":key/edit",
                name: "Edit",
                component: () => import("pages/EditablePage.vue"),
            },
        ],
    },

    // Always leave this as last one,
    // but you can also remove it
    {
        path: "/:catchAll(.*)*",
        component: () => import("pages/ErrorNotFound.vue"),
    },
];

export default routes;
