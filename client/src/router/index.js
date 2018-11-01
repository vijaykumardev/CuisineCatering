import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Cuisine from '@/components/Cuisines/Index'
import CreateCuisine from '@/components/CreateCuisine'
import ViewCuisine from '@/components/ViewCuisine'
import EditCuisine from '@/components/EditCuisine'
import CuisineCart from '@/components/CuisineCart'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/cuisines',
      name: 'cuisines',
      component: Cuisine
    },
    {
      path: '/cuisines/create',
      name: 'cuisine-create',
      component: CreateCuisine
    },
    {
      path: '/cuisine/:cuisineId',
      name: 'cuisine',
      component: ViewCuisine
    },
    {
      path: '/cuisine/:cuisineId/edit',
      name: 'cuisine-edit',
      component: EditCuisine
    },
    {
      path: '/shopping-cart',
      name: 'shopping-cart',
      component: CuisineCart
    },
    {
      path: '*',
      redirect: '/cuisines'
    }
  ]
})
