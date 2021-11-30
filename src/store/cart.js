import { paymentIntent, successBuy } from "../services/payment.service";

const mutations = {
  SET_CART(state, payload) {
    state.cart.push(payload);
  },
  DELETE_CART(state, id) {
    state.cart.forEach(el => {
      if (el.id == id) {
        const idx = state.cart.indexOf(el);
        state.cart.splice(idx, 1);
      }
    });
  },
  DELETE_ALL_CART(state) {
    state.cart = [];
  },
};
const actions = {
  async handleBuy({ getters }, deliveryPrice) {
    try {
      const intent = await paymentIntent({
        amount: getters.totalPrice + deliveryPrice,
      });
      return intent.data;
    } catch (error) {
      console.log(error);
    }
  },
  async successBuy({ commit }, { secret, id }) {
    try {
      const item = await successBuy({ secret, id });
      return item;
    } catch (error) {
      console.log(error);
    }
  },
};
const getters = {
  cart: ({ cart }) => cart,
  cartCount: ({ cart }) => cart.length,
  totalPrice: ({ cart }) => {
    let sum = 0;
    cart.forEach(el => {
      sum += el.price * el.counter;
    });
    return sum;
  },
};
const state = () => ({
  cart: [],
  cartCount: 0,
  totalPrice: 0,
});

export default {
  mutations,
  actions,
  getters,
  state,
};
