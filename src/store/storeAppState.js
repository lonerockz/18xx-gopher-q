// import Vue from 'vue'

const state = {
  navMenu: false
}
const mutations = {
  toggleNavMenu (state) {
    state.navMenu = !state.navMenu
  }
}

const actions = {
  toggleNavMenu ({ commit }) {
    commit('toggleNavMenu')
  }
}

const getters = {
  navMenu: state => {
    return state.navMenu
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
