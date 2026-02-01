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
      {
        path: "view/:id",
        name: "viewCourse",
        component: () => import("../pages/viewCourses.vue"),
        meta: {
          mainTitel: "Courses",
          pageTitel: "View Course",
          titleOfSubTitel: "Courses Lists",
          name: "View Course",
        },
      },
    ],
  },
];
