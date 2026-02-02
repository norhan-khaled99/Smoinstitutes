import authRoutes from "src/modules/auth/routes/routes";
import students from "src/modules/students/routes/routes";
import reports from "src/modules/reports/routes/routes";
import staff from "src/modules/staff/routes/routes";
import transactions from "src/modules/transactions/routes/routes";
import notes from "src/modules/notes/routes/routes";
import courses from "src/modules/courses/routes/routes";
import profile from "src/modules/profiles/routes/routes";
import bookStock from "src/modules/bookStock/routes/routes";

const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    meta: { requiresAuth: true }, 
    children: [
      {
        path: "",
        redirect: "/students",
      },
      ...students,
      ...reports,
      ...staff,
      ...transactions,
      ...notes,
      ...courses,
      ...profile,
      ...bookStock,
    ],
  },

  {
    path: "/login",
    component: () => import("src/modules/auth/pages/logIn.vue"),
    meta: { guestOnly: true },
    ...authRoutes,
  },

  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
