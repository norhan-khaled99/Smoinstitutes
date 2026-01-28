export default [
  {
    path: "profiles",
    component: () => import("../pages/indexPage.vue"),
    children: [
      {
        path: "",
        name: "profiles",
        component: () => import("../pages/profileList.vue"),
        meta: {
          mainTitel: "Profiles",
          pageTitel: "Profiles",
          name: "Profiles",
        },
      },
    ],
  },
];
