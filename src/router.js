import Vue from 'vue';
import Router from 'vue-router';
import Meta from 'vue-meta';
import firebase from 'firebase';
import NProgress from 'nprogress';

import Home from './components/Home.vue';
import Outgoings from './components/Outgoings.vue';
import Invoices from './components/Invoices.vue';
import Reports from './components/Reports.vue';
import Employees from './components/Employees.vue';
import Login from './auth/Login.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
  linkExactActiveClass: 'exact-active',
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes: [
    {
      path: '*',
      redirect: '/login',
    },
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: { requiresAuth: true },
    },
    {
      path: '/saidas',
      name: 'outgoings',
      component: Outgoings,
      meta: { requiresAuth: true },
    },
    {
      path: '/entradas',
      name: 'invoices',
      component: Invoices,
      meta: { requiresAuth: true },
    },
    {
      path: '/funcionarios',
      name: 'employees',
      component: Employees,
      meta: { requiresAuth: true },
    },
    {
			path: '/relatorios',
			name: 'reports',
			component: Reports,
			meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const { currentUser } = firebase.auth();
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth && !currentUser) next('login');
  else if (!requiresAuth && currentUser) next('home');
  else next();
});

router.beforeResolve((to, from, next) => {
  if (to.name) {
    NProgress.start();
  }
  next();
});

router.afterEach(() => {
  NProgress.done();
});

Vue.use(Meta);

export default router;
