<template>
  <div class="block">
    <Caruosel />
    <div class="block">
      <span class="title">Товары</span>
    </div>
    <div class="block grid-wrapper">
      <Card v-for="(el, idx) in products" :key="idx" :product="el" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Card from "../components/Card.vue";
import Caruosel from "../components/Carusel.vue";
export default {
  name: "Home",
  computed: {
    ...mapGetters({
      products: "products",
    }),
  },
  components: {
    Card,
    Caruosel,
  },
  mounted() {
    this.fetchProducts();
  },
  methods: {
    ...mapActions({
      fetchProducts: "fetchProducts",
    }),
  },
};
</script>

<style lang="scss" scoped>
.grid-wrapper {
  padding-top: 1rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
</style>
