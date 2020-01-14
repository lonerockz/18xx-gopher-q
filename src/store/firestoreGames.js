import { firestoreAction } from 'vuexfire'

import 'firebase/firestore'

// import firebaseConfig from '../../firebaseConfig'
// const db = firebase.initializeApp(firebaseConfig).firestore()

import { Firebase } from 'boot/firebase'

const db = Firebase.firestore()

const state = {
  games: []
}
const getters = {
  // games: state => state.activeGame.games
}
const mutations = {

}

const actions = {
  bindGames: firestoreAction(({ bindFirestoreRef }) => {
    return bindFirestoreRef('games', db.collection('games'))
  })
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
