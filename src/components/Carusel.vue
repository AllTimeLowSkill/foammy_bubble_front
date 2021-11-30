<template>
  <div class="block">
    <span class="title block">Лучшие товары!</span>
    <v-carousel class="block" v-model="model">
      <v-carousel-item v-for="(color, idx) in colors" :key="idx">
        <v-sheet :color="color" height="100%" tile>
          <v-row class="fill-height" align="center" justify="center">
            <div>Slide {{ idx + 1 }}</div>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: 0,
      colors: ["primary", "secondary", "yellow darken-2", "red", "orange"],
    };
  },
};
</script>

<style lang="scss" scoped></style>
