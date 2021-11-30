import {
  getProduct,
  getProducts,
  getProductCategory,
} from "../services/products.service";

const mutations = {
  SET_PRODUCTS(state, payload) {
    state.products = payload;
  },
  SET_PRODUCT(state, payload) {
    state.product = payload;
  },
  SET_STATUS_PRODUCTS(state, payload) {
    state.productsStatus = payload;
  },
};
const actions = {
  async fetchProducts({ commit }) {
    try {
      const items = await getProducts();
      commit("SET_PRODUCTS", items.data);
      commit("SET_STATUS_PRODUCTS", items.status);
    } catch (error) {
      console.log(error);
    }
  },
  async fetchProduct({ commit }, id) {
    try {
      const item = await getProduct(id);
      commit("SET_PRODUCT", item.data);
    } catch (error) {
      console.log(error);
    }
  },
  async fetchProductsCategory({ commit }, id) {
    try {
      const items = await getProductCategory(id);
      commit("SET_PRODUCTS", items.data);
    } catch (error) {
      console.log(error);
    }
  },
};
const getters = {
  products: ({ products }) => products,
  product: ({ product }) => product,
  productsStatus: ({ productsStatus }) => productsStatus,
};
const state = () => ({
  products: [],
  product: {},
  productsStatus: 0,
});

export default {
  mutations,
  actions,
  getters,
  state,
};
