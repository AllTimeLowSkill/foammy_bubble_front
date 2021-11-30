import jwt from "jsonwebtoken";
import { signIn, signUp, updateUser } from "../services/user.service";

const mutations = {
  SET_TOKEN(state, payload) {
    state.token = payload;
  },
  SET_USER(state, payload) {
    state.user = payload;
  },
  SET_ERROR(state, payload) {
    state.messageError = payload;
  },
  SET_STATUS(state, payload) {
    state.status = payload;
  },
  LOGOUT(state) {
    state.token = "";
  },
};
const actions = {
  async fetchSignIn({ commit }, data) {
    try {
      const token = await signIn(data);
      commit("SET_TOKEN", token.data.token);
      commit("SET_USER", jwt.verify(token.data.token, "Q9hi"));
    } catch (error) {
      console.log(error);
      commit("SET_ERROR", error);
    }
  },
  async fetchSignUp({ commit }, data) {
    try {
      const token = await signUp(data);
      console.log(token);
      commit("SET_TOKEN", token.data.token);
      commit("SET_USER", jwt.verify(token.data.token, "Q9hi"));
    } catch (error) {
      console.log(error);
      commit("SET_ERROR", error);
    }
  },
  async fetchUpdateUser({ commit }, data) {
    try {
      const item = await updateUser(data);
      commit("SET_TOKEN", item);
      commit("SET_USER", jwt.verify(item.data.token, "Q9hi"));
    } catch (error) {
      console.log(error);
    }
  },
};
const getters = {
  user: ({ user }) => user,
  token: ({ token }) => token,
  messageError: ({ messageError }) => messageError,
};
const state = () => ({
  user: {},
  token: "",
  messageError: "",
});

export default {
  mutations,
  actions,
  getters,
  state,
};
