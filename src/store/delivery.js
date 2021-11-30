import { getRegions, addDelivery } from "../services/regions.service";

const mutations = {
  SET_REGIONS(state, payload) {
    state.regions = payload;
  },
};
const actions = {
  async fetchRegions({ commit }) {
    try {
      const items = await getRegions();
      commit("SET_REGIONS", items.data);
    } catch (error) {
      console.log(error);
    }
  },
  async fetchCreateDelivery(_, data) {
    try {
      await addDelivery(data);
    } catch (error) {
      console.log(error);
    }
  },
};
const getters = {
  regions: ({ regions }) => regions,
};
const state = () => ({
  regions: [],
});

export default {
  mutations,
  actions,
  getters,
  state,
};
