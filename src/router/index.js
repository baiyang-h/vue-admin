import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

/* Layout */
import Layout from '@/layout'

/*
hidden: 用于表示该路由是否显示与菜单中，即是否是菜单路由，hidden: true为其他路由，false或者不写为菜单路由
meta: {
  title: String         菜单标题
  icon: String          菜单图标
  roles: Array          角色
  isSubmenu: Boolean    是否是多级菜单，即是否有子菜单，true是，false不是
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
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
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
          icon: 'el-icon-menu'
        },
        component: () => import('@/views/home')
      }
    ]
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
  {
    path: '/components',
    component: Layout,
    redirect: '/components/tinymce',
    name: 'components',
    meta: {
      title: 'Components',
      icon: 'el-icon-menu',
      isSubmenu: true
    },
    children: [
      {
        path: 'tinymce',
        component: () => import('@/views/components/tinymce'),
        name: 'Tinymce',
        meta: { title: 'Tinymce' }
      },
      {
        path: 'markdown',
        component: () => import('@/views/components/markdown'),
        name: 'Markdown',
        meta: { title: 'Markdown' }
      },
      {
        path: 'json-editor',
        component: () => import('@/views/components/json-editor'),
        name: 'JsonEditor',
        meta: { title: 'JSON Editor' }
      },
      {
        path: 'upload',
        component: () => import('@/views/components/upload'),
        name: 'Upload',
        meta: { title: '文件上传' }
      },
      {
        path: 'count-to',
        component: () => import('@/views/components/count-to'),
        name: 'CountTo',
        meta: { title: '计数' }
      },
      {
        path: 'back-to-top',
        component: () => import('@/views/components/back-to-top'),
        name: 'BackToTop',
        meta: { title: '回到顶部' }
      },
      {
        path: 'drag-list',
        component: () => import('@/views/components/drag-list'),
        name: 'DragList',
        meta: { title: '拖拽 List' }
      },
    ]
  },
  {
    path: '/table',
    component: Layout,
    redirect: '/table/dynamic-table',
    name: 'Table',
    meta: {
      title: 'Table',
      icon: 'el-icon-menu',
      isSubmenu: true
    },
    children: [
      {
        path: 'dynamic-table',
        component: () => import('@/views/table/dynamic-table'),
        name: 'DynamicTable',
        meta: { title: '选择列' }
      },
      {
        path: 'drag-table',
        component: () => import('@/views/table/drag-table'),
        name: 'DragTable',
        meta: { title: '拖拽 Table' }
      },
      {
        path: 'inline-edit-table',
        component: () => import('@/views/table/inline-edit-table'),
        name: 'InlineEditTable',
        meta: { title: 'Table 内编辑' }
      },
      {
        path: 'complex-table',
        component: () => import('@/views/table/complex-table'),
        name: 'ComplexTable',
        meta: { title: '综合 Table' }
      },
      {
        path: 'scroll-table',
        component: () => import('@/views/table/scroll-table'),
        name: 'ScrollTable',
        meta: { title: '滚动加载' }
      }
    ]
  },
  {
    path: '/dialog',
    component: Layout,
    redirect: '/dialog/drag-dialog',
    name: 'Dialog',
    meta: {
      title: 'Dialog',
      icon: 'el-icon-menu',
      isSubmenu: true
    },
    children: [
      {
        path: 'drag-dialog',
        component: () => import('@/views/dialog/drag-dialog'),
        name: 'DragDialog',
        meta: { title: '拖拽 Dialog' }
      },
    ]
  },
  {
    path: '/form',
    component: Layout,
    redirect: '/form/base-form',
    name: 'Form',
    meta: {
      title: 'Form',
      icon: 'el-icon-menu',
      isSubmenu: true
    },
    children: [
      {
        path: 'base-form',
        component: () => import('@/views/form/base-form'),
        name: 'BaseForm',
        meta: { title: '基础 Form' }
      },
    ]
  },
  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1/menu1-1',
    name: 'Nested',
    meta: {
      title: '路由嵌套',
      icon: 'el-icon-menu',
      isSubmenu: true
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: '菜单 1', isSubmenu: true },
        redirect: '/nested/menu1/menu1-1',
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: '菜单 1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            redirect: '/nested/menu1/menu1-2/menu1-2-1',
            meta: { title: '菜单 1-2', isSubmenu: true },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: '菜单 1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: '菜单 1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: '菜单 1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        name: 'Menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: '菜单 2' }
      }
    ]
  },
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
  mode: 'history',
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
