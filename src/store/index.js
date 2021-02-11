
import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";


Vue.use(Vuex);

export default new Vuex.Store({

    state: {
        likes: [],
        user: null,
        loginPending: false,
    },
    getters: {
        likes: (state) => {
            return state.likes
        },        
        user: (state) => {
            return state.user
        },        
        loginPending: (state) => {
            return state.loginPending
        }
    },
    mutations: {
        TOGGLE_LIKE(state, id) {
            let index = state.likes.indexOf(id);
            if (index > -1) {
                state.likes.splice(index, 1);
            } else {
                state.likes.push(id)
            }
        },
        LOGIN(state, user) {
            state.user = user
        },
        LOGOUT(state) {
            state.user = null
        },
        LOGIN_PENDING(state, loginPending) {
            state.loginPending = loginPending
        },
    },

    actions: {
        toggleLike({ commit, getters }, id) {
            return new Promise(resolve => {
                commit("TOGGLE_LIKE", id)
                resolve(getters.likes.indexOf(id))
            })
        },
        login({ commit, getters }, user) {
            return new Promise(resolve => {
                commit("LOGIN", user)
                resolve(getters.user)
            })
        },
        loginPending({ commit, getters }, loginPending) {
            return new Promise(resolve => {
                commit("LOGIN_PENDING", loginPending)
                resolve(getters.loginPending)
            })
        },
        logout({commit}) {
            commit("LOGOUT")
        }
    },
    modules: {},
    plugins: [createPersistedState()],

});
