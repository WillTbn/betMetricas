const routes = [
    {
        path: "/",
        component: () => import("layouts/MainLayout.vue"),
        children: [
            {
                path: "",
                component: () => import("pages/HomePage.vue"),
            },
            {
                path: "created",
                name: "created",
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
            {
                path: "teams",
                name: "teams",
                component: () => import("pages/TeamsPage.vue"),
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
