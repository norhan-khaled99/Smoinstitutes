export default [
  {
    path: "bookStock",
    component: () => import("../pages/indexPage.vue"),
    children: [
      {
        path: "",
        name: "bookStock",
        component: () => import("../pages/bookStockList.vue"),
        meta: {
          mainTitel: "Book Stock",
          pageTitel: "Book Stock",
          name: "Book Stock",
        },
      },
    ],
  },
];
