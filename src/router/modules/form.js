import Layout from '@/layout'

export default {
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
}
