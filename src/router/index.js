
import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [

  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    redirect: '/courseware',
    children: [
      // 实训课件
      {
        path: "/courseware",
        component: () => import("../components/Courseware.vue"),
      },
      {
        path: "/emergencyTeam",
        component: () => import("../views/informationManagement/EmergencyTeam"),
      },
      {
        path: "/emergencyExperts",
        component: () =>
          import("../views/informationManagement/EmergencyExperts"),
      },
      {
        path: "/baseMaterials",
        component: () =>
          import("../views/informationManagement/baseMaterials.vue"),
      },
      {
        path: "/emergencyTeamInfo",
        component: () =>
          import("../views/informationManagement/EmergencyTeamInfo"),
      },
      {
        path: "/baseEquip",
        component: () => import("../views/informationManagement/baseEquip.vue"),
      },
      {
        path: "/videoDeploy",
        component: () => import("../views/videoDeploy/videoDeploy.vue"),
      },
      {
        path: "/videodetail",
        component: () => import("../views/videoDeploy/VideoDetail.vue"),
      },
      {
        path: "/trainfiles", // 实训档案
        component: () =>
          import("../components/trainingfiles/Trainingfiles.vue"),
      },
      {
        path: "/filesdetail", // 实训档案详情
        component: () =>
          import("../components/trainingfiles/FilesDetails.vue"),
      },
      {
        path: "/firescript", // 真火脚本
        component: () => import("../components/trainscript/FireScript.vue"),
      },
      {
        path: "/printpage", // 真火脚本
        component: () => import("../components/trainingfiles/PrintPage.vue"),
      },
    ],
    meta: true
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  // 综合大屏
  {
    path: '/integratedScreen',
    component: () => import('../components/IntegratedScreen.vue'),
    meta: true
  },
  {
    path: "/visualization", // 可视化 Visualization
    component: () =>
      import("../components/Visualization.vue"),
      meta: true
  },
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});
router.beforeEach((to, from, next) => {
  const session = localStorage.getItem("fire-token");
  if (!session && to.name !== 'Login') {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router;
