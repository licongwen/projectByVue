import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import Personal from '@/components/personal'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: HelloWorld
    },
    {
    	path:'/login',
    	name:'Login',
    	component:Login
    },
    {
      path:'/personal',
      name:'Personal',
      component:Personal
    }
  ]
})
