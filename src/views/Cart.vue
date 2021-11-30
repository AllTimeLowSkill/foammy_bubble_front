<template>
  <div class="container">
    <template v-if="cart.length != 0">
      <div class="block">
        <span class="title">Товары</span>
        <ul>
          <li v-for="(el, idx) in cart" :key="idx">
            <div class="box cart-list">
              <span>{{ el.title }}</span>
              <div class="block">
                <button class="button" @click="el.counter -= 1">-</button>
                <span class="title mr-4 ml-4">{{ el.counter }}</span>
                <button class="button" @click="el.counter += 1">+</button>
              </div>
              <div>
                <span class="mr-4">{{ el.price * el.counter }} руб.</span>
                <button
                  @click="deleteCartItem(el.id)"
                  class="button is-danger is-small"
                >
                  &times;
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="block is-flex is-justify-content-space-between">
        <button @click="isBuy = !isBuy" class="button is-primary">
          Оплатить
        </button>
        <button @click="deleteAllCart" class="button is-danger">
          Очистить корзину
        </button>
      </div>
      <v-form @submit.prevent="">
        <v-text-field v-model="firstname" label="Имя"></v-text-field>
        <v-text-field v-model="secondname" label="Фамилия"></v-text-field>
        <v-text-field v-model="lastname" label="Отчество"></v-text-field>
        <v-text-field v-model="phone" label="Номер телефона"></v-text-field>
        <v-text-field v-model="email" label="Email"></v-text-field>
        <v-text-field v-model="city" label="Город" />
        <v-text-field v-model="street" label="Улица" />
        <v-text-field v-model="house" label="Номер дома" />
        <v-text-field v-model="index" label="Индекс" />
        <v-select
          v-model="region"
          :items="regionsTitles"
          label="Выбрать область"
        ></v-select>
        <span v-if="region != ''" class="title">{{ deliveryPrice }}</span>
      </v-form>
      <div class="block">
        <span class="title"
          >Итоговая цена: {{ totalPrice + deliveryPrice }} руб.</span
        >
      </div>
      <template v-if="isBuy">
        <div class="modal" :class="{ 'is-active': isBuy }">
          <div class="modal-background"></div>
          <div class="modal-card">
            <div class="modal-card-head">
              <button
                @click="isBuy = !isBuy"
                class="delete"
                aria-label="close"
              ></button>
            </div>
            <section class="modal-card-body">
              <Card
                class="stripe-card block"
                :class="{ complete }"
                stripe="pk_test_51IYYN4F7CCFluXlQrFh3U92FwpLUd2fgIxLNHtoY667L4MSQm2FXWH9r9ctILFGjN7DwCmMwTBusp2YzrYlb5UKg00DiNVP8w2"
                :options="stripeOptions"
                @change="complete = $event.complete"
              />
            </section>
            <footer class="modal-card-foot">
              <v-btn
                class="light-green darken-1 block"
                @click="handlegetpaymentIntent"
                >Купить</v-btn
              >
            </footer>
          </div>
        </div>
      </template>
    </template>
    <template v-else>
      <img src="../assets/cart_emty.jpg" alt="" />
    </template>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import { Card, handleCardPayment } from "vue-stripe-elements-plus";

export default {
  data() {
    this.pk =
      "pk_test_51IYYN4F7CCFluXlQrFh3U92FwpLUd2fgIxLNHtoY667L4MSQm2FXWH9r9ctILFGjN7DwCmMwTBusp2YzrYlb5UKg00DiNVP8w2";
    return {
      region: "",
      isBuy: false,
      token: null,
      stripeOptions: {},
      complete: false,
      isDelivery: false,
      firstname: "",
      secondname: "",
      lastname: "",
      phone: "",
      email: "",
      index: "",
      city: "",
      street: "",
      house: "",
    };
  },
  components: {
    Card,
  },
  computed: {
    ...mapGetters({
      cart: "cart",
      totalPrice: "totalPrice",
      regions: "regions",
    }),
    regionsTitles() {
      return this.regions.map(el => el.regionName);
    },
    deliveryPrice() {
      const item = this.regions.find(el => {
        if (el.regionName == this.region) {
          return el;
        }
      });
      if (this.region == "") {
        return 0;
      }
      return item.baseCost;
    },
  },
  mounted() {
    this.fetchRegions();
  },
  methods: {
    ...mapMutations({
      deleteCartItem: "DELETE_CART",
      deleteAllCart: "DELETE_ALL_CART",
    }),

    ...mapActions({
      handleBuy: "handleBuy",
      fetchRegions: "fetchRegions",
      addDelivery: "fetchCreateDelivery",
    }),

    async handlegetpaymentIntent() {
      const intent = await this.handleBuy(this.deliveryPrice);
      this.paymentIntent = intent.client_secret;
      if (this.isDelivery) {
        await this.addDelivery({
          firstname: this.firstname,
          secondname: this.secondname,
          lastname: this.lastname,
          phone: this.phone,
          email: this.email,
          city: this.city,
          street: this.street,
          house: this.house,
          index: this.index,
        });
      }
      await handleCardPayment(this.paymentIntent);
      this.isBuy = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.cart-list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
}
</style>
