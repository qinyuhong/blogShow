import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import Cookie from 'js-cookie'
Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Layout',
    component: () => import('@/components/CommonLayout.vue'),
    children: [{
        path: '',
        name: 'Home',
        component: () => import('@/components/CommonContent.vue'),
      }, {
        path: '/detail/:id',
        component: () => import('@/views/Detail.vue'),
      }, {
        path: '/person',
        component: () => import('@/views/Person.vue'),
        meta: {
          auth: true
        }
      },
      {
        path: '/blog',
        component: () => import('@/views/Myblog.vue'),
        meta: {
          auth: true
        }
      },
      {
        path: '/edit',
        component: () => import('@/views/blogAdd.vue'),
        meta: {
          auth: true
        }
      },
      {
        path: '/edit/:id',
        component: () => import('@/views/blogAdd.vue'),
        meta: {
          auth: true
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue')
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  let token = Cookie.get('token') || ''
  if (token) {
    store.commit('changeSignStatus', 1)
  }
  if(to.meta.auth){
    if(token){
      next()
    }else{
      next({path:'/login'})
    }
  }else{
    next()
  }
})
export default router