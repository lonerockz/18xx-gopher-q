import Vue from 'vue'
import Vuex from 'vuex'

// import example from './module-example'

import auth from './storeAuth'
import settings from './storeSettings'
import appState from './storeAppState'
// import appState from './store-appState'
import games from './firestoreGames'
import { vuexfireMutations } from 'vuexfire'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function ({ store }) {
  const Store = new Vuex.Store({
    state: {},
    modules: {
      settings,
      auth,
      appState,
      games
    },
    mutations: {
      ...vuexfireMutations
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })
  store = Store
  return Store
}
