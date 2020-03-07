import router from './router'
import store from './store'
import { Message } from 'element-ui';

import { getToken } from '@/utils/token'

router.beforeEach(async (to, from, next) => {
  const hasToken = getToken();
  if (hasToken) {
    if(to.path === '/login') {
      next('/')
    } else {
      // 是否有登录角色信息
      const hasRoles = store.getters.roles && store.getters.roles.length > 0;
      if(hasRoles) {
        next()
      } else {
        try {
          const roles = await store.dispatch('user/getInfo');
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles);
          router.addRoutes(accessRoutes);
          next()
        } catch (e) {
          await store.dispatch('user/resetToken');
          Message.error(e);
          next(`/login`)
        }
      }
    }
  } else {
    // 如果直接写跳转到next('/login')，会发现死循环, /login 一直重定向到 /login
    if(to.path === '/login') {
      next();
    } else {
      next('/login');
    }
  }
});
