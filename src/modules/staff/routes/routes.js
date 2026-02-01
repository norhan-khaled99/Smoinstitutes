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
          pageTitel: "Staff Lists",
          name: "staff",
        },
      },
      {
        path: "add",
        name: "addStaff",
        component: () => import("../pages/addStaff.vue"),
        meta: {
          mainTitel: "Staff",
          titleOfSubTitel: "Staff",
          pageTitel: "Add New Staff",
          name: "addStaff",
        },
      },
    ],
  },
];
