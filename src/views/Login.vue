<template>
  <b-col class="login-form" xl="2" offset-xl="5" md="4" offset-md="4" sm="6" offset-sm="3">
    <b-form @submit="login" v-if="show">
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

      <b-button variant="link" class="btn btn-blue no-shadow border-1">Zaloguj</b-button>
    </b-form>
  </b-col>
</template>

<script>
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
    login(e) {
      e.preventDefault();
      alert(JSON.stringify(this.form));
    }
  }
};
</script>

<style lang="scss" scoped>
.login-form {
  margin-top: 150px;
}
</style>
