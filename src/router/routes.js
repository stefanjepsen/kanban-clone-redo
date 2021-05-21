import firebase from "firebase/app";
import "firebase/auth";


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
        path: '/TestPage',
        name: 'TestPage',
        component: () => import('src/pages/TestPage.vue')
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
