import Layout from '@/layout'

export default  {
  path: '/components',
  component: Layout,
  redirect: '/components/tinymce',
  name: 'Components',
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
}
