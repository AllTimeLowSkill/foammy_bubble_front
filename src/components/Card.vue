<template>
  <v-card class="mx-auto mb-4 p-4" max-width="350">
    <v-img
      src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
      height="200"
    ></v-img>
    <v-card-title>{{ product.title }}</v-card-title>
    <v-card-actions>
      <v-btn text color="orange lighten-2">
        <router-link :to="{ path: `product/${product.id}` }"
          >Описание</router-link
        >
      </v-btn>
      <v-btn
        v-if="!inCard"
        text
        color="orange lighten-2"
        @click="addToCart(product)"
        >В корзину</v-btn
      >
      <v-btn
        v-if="inCard"
        text
        color="red darken-3"
        @click="deleteItemCart(product.id)"
        >Удалить</v-btn
      >
      <v-spacer></v-spacer>
      <v-btn icon @click="isShow = !isShow">
        <v-icon>{{ isShow ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
      </v-btn>
    </v-card-actions>
    <v-expand-transition>
      <div v-show="isShow">
        <v-divider></v-divider>
        <v-card-text>
          {{ product.description }}
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  props: ["product"],
  data() {
    return {
      inCard: false,
      isShow: false,
    };
  },
  methods: {
    ...mapMutations({
      setCart: "SET_CART",
      deleteCartItem: "DELETE_CART",
    }),
    addToCart(product) {
      this.setCart(product);
      this.inCard = !this.inCard;
    },
    deleteItemCart(id) {
      this.deleteCartItem(id);
      this.inCard = !this.inCard;
    },
  },
};
</script>

<style lang="scss" scoped>
.shadow {
  transition: 0.3s;
}
.shadow:hover {
  box-shadow: 0 0 1rem 0 hsl(171, 100%, 41%);
  transition: 0.3s;
}
</style>
