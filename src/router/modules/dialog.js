import Layout from '@/layout'

export default {
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
}
