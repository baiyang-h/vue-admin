export default {
  sidebar: state => state.app.sidebar,
  roles: state => state.user.roles,
  admin: state => state.user.admin,
  permission_routes: state => state.permission.routes,
  cachedViews: state => state.tagsView.cachedViews
}
