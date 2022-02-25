import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';

import Welcome from '../views/Welcome';
import Home from '../views/Home.vue';
import About from '../views/About.vue';
import Resume from '../views/Resume.vue';
import Portfolio from '../views/Portfolio.vue';
import BlogPost from '../views/BlogPost.vue';
import Blogs from '../views/Blogs';
import Kits from '../views/Kits/index';
// import Contact from '../views/Contact.vue';
import BlogManage from '../views/BlogManage.vue';
import ImageManage from '../views/ImageManage.vue';


// 路由自动化注册
const modules = require.context('@/components/Kits/modules', true, /index.vue$/);
const autoRoutes = modules.keys().map((item) => {
  const cmpName = item.slice(2);
  const KitName = item.slice(1).replace('.vue', '').replace('index', '').replace('/', '').replace('/', '');
  const KitModule = () => import(`@/components/Kits/modules/${cmpName}`);
  return {
    path: KitName,
    name: KitName,
    component: KitModule,
  };
});


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
  {
    path: '/about',
    name: 'About',
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
  {
    path: '/kits',
    name: 'Kits',
    component: Kits,
    meta: {
      enter: 'animate__animated animate__fadeIn ',
      leave: 'animate__animated animate__fadeOut',
    },
    children: [
      ...autoRoutes
    ]
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
