<template>
  <b-col class="login-form mt-56" xl="2" offset-xl="5" md="4" offset-md="4" sm="6" offset-sm="3">
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

      show: true
    };
  },
  methods: {
    ...mapActions("auth", ["authenticationUser"]),
    login() {
      if (this.form.email && this.form.password) {
        this.authenticationUser({
          email: this.form.email,
          password: this.form.password
        })
          .then(() => {
            this.$router.push({ name: "account" });
          })
          .catch(e => {
            console.error(e);
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
