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
                path: "statistics",
                name: "statistics",
                component: () => import("pages/StatisticsPage.vue"),
            },
            {
                path: ":key/statistics",
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
