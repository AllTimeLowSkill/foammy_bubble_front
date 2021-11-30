<template>
  <v-form class="block">
    <v-text-field
      :error-messages="emailErrors"
      v-model="email"
      label="Email"
      @input="$v.email.$touch()"
      @blur="$v.email.$touch()"
    ></v-text-field>
    <v-text-field
      :error-messages="passwordErrors"
      v-model="password"
      type="password"
      label="Пароль"
      @input="$v.password.$touch()"
      @blur="$v.password.$touch()"
    ></v-text-field>
    <div class="block is-flex is-justify-content-space-between pt-4">
      <v-btn @click="signin">Войти</v-btn>
      <router-link to="/signup">Регистрация &#5125;</router-link>
    </div>
    <v-snackbar v-model="snackbar">
      {{ messageError }}
      <template v-slot:actions="{ attrs }">
        <v-btn color="pink" text :v-bind="attrs" @click="snackbar = false">
          Закрыть
        </v-btn>
      </template>
    </v-snackbar>
  </v-form>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],
  validations: {
    email: { required, email },
    password: { required },
  },
  data() {
    return {
      email: "",
      password: "",
      snackbar: false,
    };
  },
  computed: {
    ...mapGetters({
      messageError: "messageError",
      user: "user",
    }),
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Введите корректный email");
      !this.$v.email.required && errors.push("Введите email");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push("Введите пароль");
      return errors;
    },
  },
  methods: {
    ...mapActions({
      fetchSignIn: "fetchSignIn",
    }),
    signin() {
      if (this.passwordErrors.length == 0 && this.emailErrors.length == 0) {
        this.fetchSignIn({
          email: this.email,
          password: this.password,
        });
        if (this.messageError == "") {
          this.$router.push("/");
        } else {
          this.snackbar = true;
        }
      }
    },
  },
};
</script>
