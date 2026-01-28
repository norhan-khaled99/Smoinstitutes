export default [
  {
    path: '/login',
    component: () => import('../pages/indexPage.vue'),
    children: [
      {
        path: '',
        name: 'login',
        component: () => import('../pages/logIn.vue'),
        meta: {
          name: 'login',
        },
      },
    ],
  },
]
