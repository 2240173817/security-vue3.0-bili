import {
  createRouter,
  createWebHistory
} from 'vue-router'
import Home from '../views/Home.vue'
import Login from "../views/Login"

import axios from 'axios'
import store from "../store";

const routes = [{
    path: '/',
    name: 'Home',
    component: Home,
    children: [{
        path: '/index',
        name: 'Index',
        component: () => import('../views/Index.vue')
      },
      /*       {
              path: '/sys/users',
              name: 'User',
              component: User
            },
            {
              path: '/sys/menus',
              name: 'Menu',
              component: Menu
            },
            {
              path: '/sys/roles',
              name: 'Role',
              component: Role
            } */

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

router.beforeEach((to, from, next) => {
  let hasRoute = store.state.menus.hasRoute
  if (!hasRoute) {
    axios.get("/sys/menu/nav", {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    }).then((res) => {
      //拿到menulist
      store.commit("setMenuList", res.data.data.nav)
      //拿到用户权限
      store.commit("setPermList", res.data.data.authoritys)

      //动态路由绑定
      let newRouters = router.options.routes

      res.data.data.nav.forEach(menu => {
        if (menu.children) {
          menu.children.forEach(e => {
            //转换成路由
            let route = menuToRoute(e)
            //转换的路由添加到路由管理器中
            if (route) {
              newRouters[0].children.push(route)
            }

          })
        }
      })
      newRouters.forEach((item) => {
        router.addRoute(item)
      })

      hasRoute = true
      store.commit("changeRouteStatus", hasRoute)
      

    })
  }


  if (to.path) {
    next()
  }

})

const menuToRoute = (menu) => {
  /*     console.log("正在添加menu--》") 
      console.log(menu)  */
  if (!menu.component) {
    return null
  } // 复制属性  
  let route = {
    name: menu.name,
    path: menu.path,
    meta: {
      icon: menu.icon,
      title: menu.title
    }
  }
  route.component = () => import('@/views/' + menu.component + '.vue')
  return route
}

export default router