import { LocalStorage } from 'quasar'

const state = {
  settings: {
    loadGames: true
  }
}

const mutations = {

  setSettings (state, settings) {
    Object.assign(state.settings, settings)
  }
}

const actions = {
  saveSettings ({ state }) {
    LocalStorage.set('settings', state.settings)
  },
  getSettings ({ commit }) {
    const settings = LocalStorage.getItem('settings')
    if (settings) {
      commit('setSettings', settings)
    }
  }
}

const getters = {
  settings: state => {
    return state.settings
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
