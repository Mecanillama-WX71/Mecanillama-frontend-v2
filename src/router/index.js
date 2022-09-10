import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: 'sign-in'
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: "/about",
      name: 'about',
      component: AboutView
    },
    {
      path: '/home-view',
      name: 'home-view',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/sign-in',
      name: 'signin',
      component: () => import('../security/pages/sign-in.component.vue')
    },
    {
      path: '/sign-up',
      name: 'signup',
      component: () => import('../security/pages/sign-up.component.vue')
    },
    {
      path: '/home-customer',
      name: 'home-customer',
      component: () => import('../customer/pages/home-customer.component.vue')
    },
    {
      path: '/home-mechanic',
      name: 'home-mechanic',
      component: () => import('../mechanic/pages/home-mechanic.component.vue')
    },
    {
      path: '/mechanic-profile/:mechanicId',
      name: 'mechanic-profile',
      component: () => import('../mechanic/pages/mechanic-profile.component.vue')
    },
    {
      path:'/appointments-customer',
      name: 'appointments-customer',
      component: () => import('../appointments/pages/appointments-customer.component.vue')
    },
    {
      path:'/appointments-mechanic',
      name: 'appointments-mechanic',
      component: () => import('../appointments/pages/appointments-mechanic.component.vue')
    },
    {
      path:'/customer-profile',
      name: 'customer-profile',
      component: () => import('../customer/pages/customer-profile.component.vue')
    },
    {
      path: "/mechanic-admin/home",
      name: "mechanic-admin-home",
      component: () => import("../mechanic/pages/home-mechanic.component.vue"),
    }
  ]
})

export default router