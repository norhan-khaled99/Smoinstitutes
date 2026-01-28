export default [
  {
    path: "transactions",
    component: () => import("../pages/indexPage.vue"),
    children: [
      {
        path: "",
        name: "transactions",
        component: () => import("../pages/transactionsList.vue"),
        meta: {
          mainTitel: "Transactions",
          pageTitel: "Transactions",
          name: "Transactions",
        },
      },
    ],
  },
];
