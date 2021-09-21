import {
  createRouter,
  createWebHistory
} from 'vue-router'
import Home from '../views/Home.vue'
import Login from "../views/Login"
import Menu from "../views/sys/Menu.vue"
import User from "../views/sys/User.vue"
import Role from "../views/sys/Role.vue"

const routes = [{
    path: '/',
    name: 'Home',
    component: Home,
    children:[
      {
        path: '/index',
        name: 'Index',
        component: () => import('../views/Index.vue')
      },
      {
        path: '/sys/user',
        name: 'User',
        component: User
      },
      {
        path: '/sys/menus',
        name: 'Menu',
        component: Menu
      },
      {
        path: '/sys/role',
        name: 'Role',
        component: Role
      }
      
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router