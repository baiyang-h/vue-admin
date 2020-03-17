import Layout from '@/layout'

export default {
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
      path: 'page-table',
      component: () => import('@/views/table/page-table'),
      name: 'PageTable',
      meta: { title: '分页 Table' }
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
}
