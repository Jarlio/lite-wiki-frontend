import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import NodeArticle from "@/views/NodeArticle";
import ContentForm from "@/components/Node/Content/ContentForm";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/nodeAdmin",
    name: "NodeAdmin",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "nodeAdmin" */ "../views/NodeAdmin.vue")
  },
  {
    path: "/node/:id",
    name: "nodeArticle",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: NodeArticle,
    props: true
  },
  {
    path: "/nodeEditContent",
    name: "NodeEditContent",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: ContentForm,
    props: true
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
