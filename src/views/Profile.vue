<template>
  <div class="block">
    <v-form @submit.prevent="fetchUpdateUser(user)">
      <div class="field-block">
        <v-text-field
          class="mr-4"
          v-model="user.username"
          label="Никнейм"
          :disabled="!isUpdateName"
        />
        <v-btn @click="isUpdateName = !isUpdateName">Изменить имя</v-btn>
      </div>
      <div class="field-block">
        <v-text-field
          class="mr-4"
          v-model="user.firstname"
          label="Имя"
          :disabled="!isUpdateFirstname"
        />
        <v-btn @click="isUpdateFirstname = !isUpdateFirstname"
          >Изменить имя</v-btn
        >
      </div>
      <div class="field-block">
        <v-text-field
          class="mr-4"
          v-model="user.secondname"
          label="Фамилия"
          :disabled="!isUpdateSecondname"
        />
        <v-btn @click="isUpdateSecondname = !isUpdateSecondname"
          >Изменить фамилию</v-btn
        >
      </div>
      <div class="field-block">
        <v-text-field
          class="pr-4"
          v-model="user.lastname"
          label="Отчество"
          :disabled="!isUpdatelastname"
        />
      </div>
      <div class="field-block">
        <v-text-field
          class="mr-4"
          v-model="user.email"
          label="Почта"
          :disabled="!isUpdateEmail"
        />
        <v-btn @click="isUpdateEmail = !isUpdateEmail">Изменить почту</v-btn>
      </div>
      <div class="field-block">
        <v-text-field
          class="mr-4"
          v-model="user.phone"
          label="Телефон"
          :disabled="!isUpdatePhone"
        />
        <v-btn @click="isUpdateEmail = !isUpdateEmail"
          >Изменить номер телефона</v-btn
        >
      </div>
      <v-btn type="submit">Сохранить</v-btn>
    </v-form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      isUpdateName: false,
      isUpdateFirstname: false,
      isUpdateSecondname: false,
      isUpdatelastname: false,
      isUpdateEmail: false,
      isUpdatePhone: false,
    };
  },
  computed: {
    ...mapGetters({
      user: "user",
    }),
  },
  mounted() {},
  methods: {
    ...mapActions({
      fetchUpdateUser: "fetchUpdateUser",
    }),
  },
};
</script>

<style lang="scss" scoped>
.field-block {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
}
</style>
