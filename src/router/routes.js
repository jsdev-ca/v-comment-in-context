import Home from '../pages/home/Home.vue';

export default [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/blog-post',
    name: 'BlogPost',
    component: () => import(
      /* webpackChunkName: "blog-post" */ '../pages/blog-post/BlogPost.vue'
    )
  }
];
