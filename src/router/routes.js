import firebase from "firebase/app";
import "firebase/auth";
import Project from "../components/Project";



const routes = [{
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{
        path: '',
        component: () => import('pages/Index.vue')
      },
      {
        path: '/Board',
        name: 'Board',
        component: () => import('pages/Board.vue')
      },


      {
        path: '/Test',
        name: 'Test',
        component: () => import('pages/Test.vue')
      },
      {
        path: '/Login',
        name: 'Login',
        component: () => import('src/pages/LoginPage.vue')
      },
      {
        path: '/Register',
        name: 'Register',
        component: () => import('src/pages/RegisterPage.vue')
      },
      {
        path: '/ProjectCreationPage',
        meta: {
          requiresAuth: true
        },
        name: 'ProjectCreationPage',
        component: () => import('src/pages/ProjectCreationPage.vue')
      },
      /*       {
              path: '/TestingPurpose',
              name: 'TestingPurpose',
              component: () => import('src/pages/TestingPurpose.vue')
            }, */
      {
        path: "/Project",
        component: Project,
        props: route => ({
          name: route.query.name,
          description: route.query.description,
          hoursAllocated: route.query.hoursAllocated,
          tech: route.query.tech,
        })
      },

      {
        path: '/Secret',
        meta: {
          requiresAuth: true
        },
        name: 'Secret',
        component: () => import('src/pages/Secret.vue')
      },

    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]



export default routes
