<template>
  <b-col class="login-form mt-56" xl="4" offset-xl="4" md="6" offset-md="3" sm="8" offset-sm="2">
    <h1 class="text-center">Zaloguj</h1>
    <b-form ref="loginForm" @submit.prevent="login" v-if="show">
      <b-form-group id="input-group-email" label="Email:" label-for="input-email">
        <b-form-input
          id="input-email"
          v-model="form.email"
          type="email"
          required
          placeholder="Wprowadź email"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-password" label="Hasło:" label-for="input-password">
        <b-form-input
          id="input-password"
          type="password"
          v-model="form.password"
          required
          placeholder="Wprowadź hasło"
        ></b-form-input>
      </b-form-group>
      <b-alert class="mt-4" show v-if="errorMessage" variant="danger">
        {{ errorMessage }}
      </b-alert>
      <p>Nie masz konta? <router-link to="/rejestracja">Załóż je</router-link></p>
      <b-button :disabled="!form.email || !form.password" variant="primary" type="submit" class=""
        >Zaloguj</b-button
      >
    </b-form>
  </b-col>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      form: {
        email: "",
        password: ""
      },

      errorMessage: "",
      show: true
    };
  },
  methods: {
    ...mapActions("auth", ["authenticationUser"]),
    login() {
      this.errorMessage = "";
      // TODO: Add validation
      if (this.form.email && this.form.password) {
        this.authenticationUser({
          email: this.form.email,
          password: this.form.password
        })
          .then(() => {
            this.$router.push({ name: "account" });
          })
          .catch(e => {
            this.errorMessage = e.body.message;
          });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.login-form {
  margin-top: 150px;
}
</style>
