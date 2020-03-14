import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import componentsRouter from "./modules/components";
import tableRouter from "./modules/table";
import dialogRouter from "./modules/dialog";
import formRouter from "./modules/form";
import nestedRouter from "./modules/nested";

/*
hidden: 用于表示该路由是否显示与菜单中，即是否是菜单路由，hidden: true为其他路由，false或者不写为菜单路由
meta: {
  title: String         菜单标题
  icon: String          菜单图标
  roles: Array          角色
  isSubmenu: Boolean    是否是多级菜单，即是否有子菜单，true是，false不是
  affix: Boolean        是否在tagsView中默认显示， 让首页默认显示
  noCache: Boolean      如果设置为true，则表示不需要缓存。主要用于tagsView中，用户缓存。  如果不设置或者false，因为keep-alive的原因会缓存。。
}
 */


// 不受权限影响的路由， 总是显示的
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login'),
    hidden: true
  },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect'),
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'Home',
        meta: {
          // hideInMenu: true,
          title: '首页',
          // notCache: true,
          icon: 'el-icon-menu',
          affix: true
        },
        component: () => import('@/views/home')
      }
    ]
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
];

// 需要根据用户角色动态加载的路由，即权限判断
export const asyncRoutes = [
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/page',
    name: 'Permission',
    meta: {
      title: 'Permission',
      icon: 'el-icon-menu',
      roles: ['admin', 'other'],
      isSubmenu: true
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/page'),
        name: 'PagePermission',
        meta: {
          title: 'Page Permission',
        }
      },
      {
        path: 'role',
        component: () => import('@/views/permission/role'),
        name: 'RolePermission',
        meta: {
          title: '角色管理',
          roles: ['admin']
        }
      }
    ]
  },
  componentsRouter,
  tableRouter,
  dialogRouter,
  formRouter,
  nestedRouter,
  {
    path: '/charts',
    component: Layout,
    redirect: '/charts/charts1',
    name: 'Charts',
    meta: {
      title: 'Charts',
      icon: 'el-icon-menu',
      isSubmenu: true
    },
    children: [
      {
        path: 'charts1',
        component: () => import('@/views/charts/charts1'),
        name: 'Charts1',
        meta: { title: 'Charts 1' }
      },
    ]
  },
  {
    path: '/excel',
    component: Layout,
    redirect: '/excel/export-excel',
    name: 'Excel',
    meta: {
      title: 'Excel',
      icon: 'el-icon-menu',
      isSubmenu: true
    },
    children: [
      {
        path: 'export-excel',
        component: () => import('@/views/excel/export-excel'),
        name: 'ExportExcel',
        meta: { title: '导出 Excel' }
      },
      {
        path: 'upload-excel',
        component: () => import('@/views/excel/upload-excel'),
        name: 'UploadExcel',
        meta: { title: '上传 Excel' }
      },
    ]
  },
  {
    path: '/zip',
    component: Layout,
    redirect: '/zip/download',
    name: 'Zip',
    meta: {
      title: 'Zip',
      icon: 'el-icon-menu',
      isSubmenu: true
    },
    children: [
      {
        path: 'download',
        component: () => import('@/views/zip'),
        name: 'ExportZip',
        meta: { title: 'Export Zip' }
      },
    ]
  },
  {
    path: '/icon',
    component: Layout,
    redirect: '/icon/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/icons'),
        name: 'Icons',
        meta: { title: 'Icons', icon: 'el-icon-menu' }
      }
    ]
  },
  {
    path: '/pdf',
    component: Layout,
    redirect: '/pdf/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/pdf'),
        name: 'PDF',
        meta: { title: 'PDF', icon: 'el-icon-menu' }
      }
    ]
  },
  {
    path: '/theme',
    component: Layout,
    redirect: '/theme/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/theme'),
        name: 'Theme',
        meta: { title: 'Theme', icon: 'el-icon-menu' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
];


const createRouter = () =>  new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: constantRoutes
});

const router =createRouter();

// 用于重置路由列表
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher
}

export default router
