<template>
  <v-form class="block">
    <v-text-field
      :error-messages="emailErrors"
      @input="$v.email.$touch()"
      @blur="$v.email.$touch()"
      v-model="email"
      label="Email"
    ></v-text-field>
    <v-text-field
      :error-messages="nameErrors"
      @input="$v.username.$touch()"
      @blur="$v.username.$touch()"
      v-model="username"
      label="Никнейм"
    />
    <v-text-field
      :error-messages="fnameErrors"
      @input="$v.firstname.$touch()"
      @blur="$v.firstname.$touch()"
      v-model="firstname"
      label="Имя"
    />
    <v-text-field
      :error-messages="snameErrors"
      @input="$v.secondname.$touch()"
      @blur="$v.secondname.$touch()"
      v-model="secondname"
      label="Фамилия"
    />
    <v-text-field
      :error-messages="lnameErrors"
      @input="$v.lastname.$touch()"
      @blur="$v.lastname.$touch()"
      v-model="lastname"
      label="Отчество"
    />
    <v-text-field
      :error-messages="passwordErrors"
      @input="$v.password.$touch()"
      @blur="$v.password.$touch()"
      type="password"
      v-model="password"
      label="Пароль"
    ></v-text-field>
    <v-text-field
      :error-messages="passwordErrors"
      @input="$v.repassword.$touch()"
      @blur="$v.repassword.$touch()"
      type="password"
      v-model="repassword"
      label="Повторите пароль"
    />
    <v-text-field v-model="phone" label="Номер телефона" />
    <div class="block is-flex is-justify-content-space-between">
      <v-btn @click="signup">Зарегистрироваться</v-btn>
    </div>
  </v-form>
</template>

<script>
import { mapActions } from "vuex";
import { validationMixin } from "vuelidate";
import { required, email, minLength } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],
  validations: {
    email: { required, email },
    username: { required },
    firstname: { required },
    secondname: { required },
    lastname: { required },
    password: { required, minLength: minLength(6) },
    repassword: { required },
    phone: { required },
  },
  computed: {
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
    nameErrors() {
      const errors = [];
      if (!this.$v.username.$dirty) return errors;
      !this.$v.username.required && errors.push("Введите ваш никнейм");
      return errors;
    },
    fnameErrors() {
      const errors = [];
      if (!this.$v.firstname.$dirty) return errors;
      !this.$v.firstname.required && errors.push("Введите ваше имя");
      return errors;
    },
    snameErrors() {
      const errors = [];
      if (!this.$v.secondname.$dirty) return errors;
      !this.$v.secondname.required && errors.push("Введите вашу фамилию");
      return errors;
    },
    lnameErrors() {
      const errors = [];
      if (!this.$v.lastname.$dirty) return errors;
      !this.$v.lastname.required && errors.push("Введите ваше отчество");
      return errors;
    },
  },
  data() {
    return {
      email: "",
      username: "",
      firstname: "",
      secondname: "",
      lastname: "",
      password: "",
      repassword: "",
      phone: "",
      errorMessage: "",
    };
  },
  methods: {
    ...mapActions({
      fetchSignUp: "fetchSignUp",
    }),
    signup() {
      if (
        this.password == this.repassword &&
        this.emailErrors.length == 0 &&
        this.passwordErrors.length == 0 &&
        this.nameErrors.length == 0 &&
        this.fnameErrors.length == 0 &&
        this.snameErrors.length == 0 &&
        this.lnameErrors.length == 0
      ) {
        this.fetchSignUp({
          email: this.email,
          password: this.password,
          username: this.username,
          firstname: this.firstname,
          secondname: this.secondname,
          lastname: this.lastname,
          phone: this.phone,
        });
        this.$router.push("/");
      } else {
        this.errorMessage = "Повторите пароль верно!";
      }
    },
  },
};
</script>
