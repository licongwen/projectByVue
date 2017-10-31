import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import Personal from '@/components/personal'
import Message from '@/components/message'
import Home from '@/components/home'
import Subscribe from '@/components/subscribe'

Vue.use(Router)

export default new Router({
  // mode:'history',
  // scrollBehavior(to,from,savedPosition){
  //   if(savedPosition){
  //     console.log(savedPosition);
  //     return savedPosition
  //   }else{
  //     return {x:0,y:0}
  //   }
  // },
  routes: [
    {
      path: '/',
      name: 'Hello',
      redirect:'/home'
      // component: HelloWorld
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
    },
    {
      path:'/message',
      name:'Message',
      component:Message
    },
    {
      path:'/home',
      name:'Home',
      component:Home
    },
    {
      path:'/subscribe',
      name:'Subscribe',
      component:Subscribe
    }
  ]
})
