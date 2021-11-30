import { getCategories } from "../services/category.service";

const mutations = {
  SET_CATEGORIES(state, payload) {
    state.categories = payload;
  },
};
const actions = {
  async fetchCategories({ commit }) {
    try {
      const items = await getCategories();
      commit("SET_CATEGORIES", items.data);
    } catch (error) {
      console.log(error);
    }
  },
};
const getters = {
  categories: ({ categories }) => categories,
};
const state = () => ({
  categories: [],
});

export default {
  mutations,
  actions,
  getters,
  state,
};
