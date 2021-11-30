<template>
  <v-app-bar class="grey darken-3" app dark>
    <v-app-bar-nav-icon @click="$emit('isopendrawer', isDrawer)">
    </v-app-bar-nav-icon>
    <v-spacer></v-spacer>
    <router-link class="text-color" to="/">
      <h1>Foamy Bubble</h1>
    </router-link>
    <v-spacer></v-spacer>
    <router-link v-if="token != ''" to="/cart">
      <v-img width="32" height="32" src="../assets/shop_img.png"></v-img>
    </router-link>
  </v-app-bar>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      isDrawer: false,
    };
  },
  computed: {
    ...mapGetters({
      cartCount: "cartCount",
      token: "token",
    }),
  },
};
</script>

<style lang="scss" scoped>
.text-color {
  color: white;
}
</style>
