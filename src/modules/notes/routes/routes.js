export default [
  {
    path: "notes",
    component: () => import("../pages/indexPage.vue"),
    children: [
      {
        path: "",
        name: "notes",
        component: () => import("../pages/notesList.vue"),
        meta: {
          mainTitel: "Notes",
          pageTitel: "Notes",
          name: "Notes",
        },
      },
    ],
  },
];
