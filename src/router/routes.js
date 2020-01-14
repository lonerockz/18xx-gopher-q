
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      // {
      //   path: '/settings',
      //   component: () => import('pages/PageSettings.vue')
      // },
      // {
      //   path: '/settings/help',
      //   component: () => import('pages/PageHelp.vue')
      // },
      // {
      //   path: '/games',
      //   component: () => import('pages/PageGames.vue')
      // },
      // {
      //   path: '/players',
      //   component: () => import('pages/PagePlayers.vue')
      // },
      {
        path: '/auth/logout',
        component: () => import('pages/PageAuth.vue'),
        props: { logout: true }
      },
      {
        path: '/auth',
        component: () => import('pages/PageAuth.vue'),
        props: { logout: false }
      }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
