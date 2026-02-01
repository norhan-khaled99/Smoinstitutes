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
          pageTitel: "Profiles Lists",
          name: "Profiles",
        },
      },
      {
        path: "add",
        name: "addProfile",
        component: () => import("../pages/addProfile.vue"),
        meta: {
          mainTitel: "Profiles",
          pageTitel: "Add Profile",
          name: "Add Profile",
        },
      },
    ],
  },
];
