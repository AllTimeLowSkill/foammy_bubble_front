import {
  getComments,
  createComments,
  updateComment,
} from "../services/comment.service";

const mutations = {
  SET_COMMENTS(state, payload) {
    state.comments = payload;
  },
};
const actions = {
  async fetchComments({ commit }, id) {
    try {
      const items = await getComments(id);
      commit("SET_COMMENTS", items.data);
    } catch (error) {
      console.log(error);
    }
  },
  async fetchCreateComment({ commit }, data) {
    try {
      const items = await createComments(data);
      commit("SET_COMMENTS", items.data);
    } catch (error) {
      console.log(error);
    }
  },
  async fetchUpdateComment({ commit }, data) {
    try {
      const items = await updateComment(data);
      commit("SET_COMMENTS", items.data);
    } catch (error) {
      console.log(error);
    }
  },
};
const getters = {
  comments: ({ comments }) => comments,
};
const state = () => ({
  comments: [],
});

export default {
  mutations,
  actions,
  getters,
  state,
};
