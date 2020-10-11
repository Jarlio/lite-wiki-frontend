import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import NodeArticle from "@/views/NodeArticle";
import EditNode from "@/components/Node/EditNode";

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
    path: "/controlPanel",
    name: "ControlPanel",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "nodeAdmin" */ "../views/ControlPanel.vue")
  },
  {
    path: "/node/:id",
    name: "NodeArticle",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: NodeArticle,
    props: true
  },
  {
    path: "/editNode/:id",
    name: "EditNode",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: EditNode,
    props: true
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
