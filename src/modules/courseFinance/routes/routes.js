export default [
  {
    path: "course-finance",
    component: () => import("../pages/indexPage.vue"),
    children: [
      {
        path: "",
        name: "courseFinance",
        component: () => import("../pages/courseFinanceList.vue"),
        meta: {
          mainTitel: "Course Finance",
          pageTitel: "Course Finance",
          name: "Course Finance",
        },
      },
    ],
  },
];
