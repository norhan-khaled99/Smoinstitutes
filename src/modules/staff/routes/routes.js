export default [
  {
    path: "staff",
    component: () => import("../pages/indexPage.vue"),
    children: [
      {
        path: "",
        name: "staff",
        component: () => import("../pages/staffList.vue"),
        meta: {
          mainTitel: "Staff",
          pageTitel: "Staff",
          name: "Staff",
        },
      },
    ],
  },
];
