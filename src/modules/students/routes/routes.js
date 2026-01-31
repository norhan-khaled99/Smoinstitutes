export default [
  {
    path: "students",
    component: () => import("../pages/indexPage.vue"),
    children: [
      {
        path: "",
        name: "students",
        component: () => import("../pages/studentList.vue"),
        meta: {
          mainTitel: "Students",
          pageTitel: "Students",
          name: "Students",
        },
      },
      {
        path: "add",
        name: "addStudent",
        component: () => import("../pages/addEditStudents.vue"),
        meta: {
          mainTitel: "Students",
          pageTitel: "Add New Student",
          titleOfSubTitel: "Student",
          name: "Add Student",
        },
      },
      {
        path: "edit/:id",
        name: "editStudent",
        component: () => import("../pages/addEditStudents.vue"),
        meta: {
          mainTitel: "Students",
          pageTitel: "Edit Student",
          name: "Edit Student",
        },
      },
      {
        path: "details/:id",
        name: "studentDetails",
        component: () => import("../pages/viewStudent.vue"),
        meta: {
          mainTitel: "Students",
          pageTitel: "View Student",
          titleOfSubTitel: "Students Lists",
          name: "Student Details",
        }
      }
    ],
  },
];
