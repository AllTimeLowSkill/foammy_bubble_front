<template>
  <v-app>
    <v-navigation-drawer v-model="isDrawer" absolute temporary bottom>
      <v-list>
        <v-list-item-group>
          <v-list-item>
            <v-list-item-title>
              <router-link v-if="token == ''" to="/signin">Войти</router-link>
              <div v-else>
                <router-link class="mr-4" to="/profile">Профиль</router-link>
                <v-btn @click="logout" class="red darken-2">
                  <v-icon small>mdi-location-exit </v-icon>
                </v-btn>
              </div>
            </v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <v-subheader>Товары</v-subheader>
      <v-list>
        <v-list-item-group>
          <v-list-item @click="fetchProducts">
            <v-list-item-title>
              <router-link to="/">Все товары</router-link>
            </v-list-item-title>
          </v-list-item>
          <v-list-item
            v-for="(el, idx) in categories"
            :key="idx"
            @click="fetchProductsCategory(el.id)"
          >
            <v-list-item-title>
              <router-link to="/">{{ el.title }}</router-link>
            </v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <v-subheader>Контакты</v-subheader>
      <v-list>
        <v-list-item-group>
          <v-list-item>
            <v-list-item-title>
              <a href="#">VK</a>
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>
              <a href="#">Instagram</a>
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>
              <a href="#">WhatsApp</a>
            </v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <Navbar @isopendrawer="openDrawer(isDrawer)" />
    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
export default {
  name: "App",

  data: () => ({
    isDrawer: false,
  }),
  computed: {
    ...mapGetters({
      categories: "categories",
      token: "token",
    }),
  },
  components: {
    Navbar,
    Footer,
  },
  mounted() {
    this.fetchCategories();
  },
  methods: {
    ...mapActions({
      fetchCategories: "fetchCategories",
      fetchProductsCategory: "fetchProductsCategory",
      fetchProducts: "fetchProducts",
    }),
    ...mapMutations({
      logout: "LOGOUT",
    }),
    openDrawer(isDrawer) {
      this.isDrawer = !isDrawer;
    },
  },
};
</script>
