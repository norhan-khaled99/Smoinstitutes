export default [
  {
    path: "courses",
    component: () => import("../pages/indexPage.vue"),
    children: [
      {
        path: "",
        name: "courses",
        component: () => import("../pages/coursestList.vue"),
        meta: {
          mainTitel: "Courses",
          pageTitel: "Courses Lists",
          name: "Courses",
        },
      },
    ],
  },
];
