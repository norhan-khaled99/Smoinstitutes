export default [
  {
    path: "reports",
    component: () => import("../pages/indexPage.vue"),
    children: [
      {
        path: "",
        name: "reports",
        component: () => import("../pages/reportsList.vue"),
        meta: {
          mainTitel: "Reports",
          pageTitel: "Reports",
          name: "Reports",
        },
      },
    ],
  },
];
