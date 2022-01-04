import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';

import Welcome from '../views/Welcome';
import Home from '../views/Home.vue';
import About from '../views/About.vue';
import Resume from '../views/Resume.vue';
import Portfolio from '../views/Portfolio.vue';
import BlogPost from '../views/BlogPost.vue';
import Blogs from '../views/Blogs';
import Contact from '../views/Contact.vue';
import BlogManage from '../views/BlogManage.vue';
import ImageManage from '../views/ImageManage.vue';

const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: Welcome,
    meta: {
      enter: 'animate__animated animate__fadeIn ',
      leave: 'animate__animated animate__fadeOut',
    },
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      enter: 'animate__animated animate__fadeIn ',
      leave: 'animate__animated animate__fadeOut',
    },
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: About,
  //   meta: {
  //     enter: 'animate__animated animate__fadeIn ',
  //     leave: 'animate__animated animate__fadeOut',
  //   },
  // },
  {
    path: '/resume',
    name: 'Resume',
    component: Resume,
    // meta: { transition: 'left-slide' },
    meta: {
      enter: 'animate__animated animate__fadeIn ',
      leave: 'animate__animated animate__fadeOut',
    },
  },
  {
    path: '/image-manage',
    name: 'ImageManage',
    component: ImageManage,
    // meta: { transition: 'left-slide' },
    meta: {
      requiresAuth: true,
      enter: 'animate__animated animate__fadeIn ',
      leave: 'animate__animated animate__fadeOut',
    },
  },
  {
    path: '/portfolio',
    name: 'Portfolio',
    component: Portfolio,
    // meta: { transition: 'left-slide' },
    meta: {
      enter: 'animate__animated animate__fadeIn ',
      leave: 'animate__animated animate__fadeOut',
    },
  },
  {
    path: '/blog-manage',
    name: 'BlogManage',
    component: BlogManage,
    // meta: { transition: 'left-slide' },
    meta: {
      requiresAuth: true,
      enter: 'animate__animated animate__fadeIn ',
      leave: 'animate__animated animate__fadeOut',
    },
  },
  {
    path: '/blogs',
    name: 'Blogs',
    component: Blogs,
    // meta: { transition: 'left-slide' },
    meta: {
      enter: 'animate__animated animate__fadeIn ',
      leave: 'animate__animated animate__fadeOut',
    },
  },
  {
    path: '/blogs/:id',
    name: 'BlogPost',
    component: BlogPost,
    // meta: { transition: 'left-slide' },
    meta: {
      enter: 'animate__animated animate__fadeIn ',
      leave: 'animate__animated animate__fadeOut',
    },
  },
  // {
  //   path: '/contact',
  //   name: 'Contact',
  //   component: Contact,
  //   // meta: { transition: 'left-slide' },
  //   meta: {
  //     enter: 'animate__animated animate__fadeIn ',
  //     leave: 'animate__animated animate__fadeOut',
  //   },
  // },
  {
    path: '/:catchAll(.*)*',
    redirect: { name: 'Home' },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkExactActiveClass: 'text-red-500',
});

router.beforeEach((to, from, next) => {
  if (!to.matched.some((record) => record.meta.requiresAuth)) {
    next();
    return;
  }

  if (store.state.auth.userLoggedIn) {
    next();
  } else {
    alert('Please Login First.');
    next({ name: 'Home' });
  }
});

export default router;
