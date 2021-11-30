import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import Products from "./product";
import Category from "./category";
import Cart from "./cart";
import Regions from "./delivery";
import User from "./user";
import Comment from "./comment";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Products,
    Category,
    Cart,
    Regions,
    User,
    Comment,
  },
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
    }),
  ],
});
