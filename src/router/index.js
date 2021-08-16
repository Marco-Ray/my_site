import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';
import Resume from '../views/Resume.vue';
import Portfolio from '../views/Portfolio.vue';
import Blog from '../views/Blog.vue';
import Contact from '../views/Contact.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      enter: 'animate__animated animate__fadeIn ',
      leave: 'animate__animated animate__fadeOut',
    },
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: About,
    meta: {
      enter: 'animate__animated animate__fadeIn ',
      leave: 'animate__animated animate__fadeOut',
    },
  },
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
    path: '/blog',
    name: 'Blog',
    component: Blog,
    // meta: { transition: 'left-slide' },
    meta: {
      enter: 'animate__animated animate__fadeIn ',
      leave: 'animate__animated animate__fadeOut',
    },
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
    // meta: { transition: 'left-slide' },
    meta: {
      enter: 'animate__animated animate__fadeIn ',
      leave: 'animate__animated animate__fadeOut',
    },
  },
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

export default router;
