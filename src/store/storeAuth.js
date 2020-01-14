import { LocalStorage, Loading } from 'quasar'
import { firebaseAuth } from 'boot/firebase'
import { showErrorMessage } from 'src/functions/function-show-error-message'

const state = {
  loggedIn: false,
  user: false
}

const mutations = {
  UPDATE_USER (state, user) {
    console.log('user :', user)
    if (user) {
      state.user = {
        email: user.email,
        username: user.displayName,
        userID: user.uid
      }
    } else {
      state.user = false
    }
  },
  setLoggedIn (state, value) {
    state.loggedIn = value
  }

}

const actions = {
  registerUser (state, payload) {
    Loading.show()
    firebaseAuth.createUserWithEmailAndPassword(payload.email, payload.password)
      .then(response => {
        console.log('response: ', response)
        firebaseAuth.currentUser.updateProfile({
          displayName: payload.username
        }).then(response => {
          console.log('response: ', response)
        }).catch(error => {
          showErrorMessage(error.message)
        })
      })
      .catch(error => {
        showErrorMessage(error.message)
      })
  },
  loginUser (state, payload) {
    Loading.show()
    firebaseAuth.signInWithEmailAndPassword(payload.email, payload.password)
      .then(response => {
        console.log('response: ', response)
      })
      .catch(error => {
        showErrorMessage(error.message)
      })
  },
  logoutUser () {
    console.log('logoutUser')
    firebaseAuth.signOut()
  },
  handleAuthStateChange (state) {
    firebaseAuth.onAuthStateChanged(user => {
      // console.log('got auth state changed.')
      Loading.hide()
      if (user) {
        state.commit('setLoggedIn', true)
        state.commit('UPDATE_USER', user)
        LocalStorage.set('loggedIn', true)
        // console.log('state :', state)
        this.$router.push('/').catch(err => { console.log('err :', err) })
      } else {
        state.commit('setLoggedIn', false)
        state.commit('UPDATE_USER', false)
        LocalStorage.set('loggedIn', false)
        // console.log('state :', state)
        this.$router.replace('/auth').catch(err => { console.log('err :', err) })
      }
    })
  }
}

const getters = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
