
import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";


Vue.use(Vuex);

export default new Vuex.Store({

    state: {
        likes: []
    },
    getters: {
        likes: (state) => {
            return state.likes
        }
    },
    mutations: {
        ADD_LIKE(state, id) {
            if (!state.likes.includes(id)) state.likes.push(id)
        },
        REMOVE_LIKE(state, id) {
            let index = state.likes.indexOf(id);
            if (index > -1) {
                state.likes.splice(index, 1);
            }
        },
    },

    actions: {
        addLike({ commit }, id) {
            commit("ADD_LIKE", id)
        },
        removeLike({ commit }, id) {
            commit("REMOVE_LIKE", id)
        },
    },
    modules: {},
    plugins: [createPersistedState()],

});
