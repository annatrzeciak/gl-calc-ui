<template>
  <b-col class="login-form mt-56" xl="2" offset-xl="5" md="4" offset-md="4" sm="6" offset-sm="3">
    <h1 class="text-center">Rejestracja</h1>
    <b-form :novalidate="true" ref="registerForm" @submit.prevent="registerNewUser">
      <b-form-group id="input-group-name" label="Imię i nazwisko:" label-for="input-name">
        <b-form-input
          :state="$v.$dirty && $v.name.$invalid ? false : null"
          id="input-name"
          v-model="name"
          required
          placeholder="Wprowadź imię i nazwisko"
        ></b-form-input>
        <b-form-invalid-feedback :state="false" v-if="$v.$error && !$v.name.required">
          To pole jest wymagane
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.name.minLength"
          >Nazwa musi zawierać conajmniej {{ $v.name.$params.minLength.min }} znaki
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group id="input-group-email" label="Email:" label-for="input-email">
        <b-form-input
          :state="$v.$dirty && $v.email.$invalid ? false : null"
          id="input-email"
          v-model="email"
          type="email"
          required
          placeholder="Wprowadź email"
        ></b-form-input>
        <b-form-invalid-feedback :state="false" v-if="$v.$error && !$v.email.required">
          To pole jest wymagane
        </b-form-invalid-feedback>
        <b-form-invalid-feedback :state="false" v-if="$v.$error && !$v.email.email">
          Niepoprawny format adresu email
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group id="input-group-password" label="Hasło:" label-for="input-password">
        <b-form-input
          :state="$v.$dirty && $v.password.$invalid ? false : null"
          id="input-password"
          type="password"
          v-model="password"
          required
          placeholder="Wprowadź hasło"
        ></b-form-input>
        <b-form-invalid-feedback :state="false" v-if="$v.$error && !$v.password.required">
          To pole jest wymagane
        </b-form-invalid-feedback>
        <b-form-invalid-feedback :state="false" v-if="$v.$error && !$v.password.minLength">
          Hasło powinno zawierać conajmniej {{ $v.password.$params.minLength.min }} znaków
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group
        id="input-group-repeatPassword"
        label="Potwierdź hasło:"
        label-for="input-repeatPassword"
      >
        <b-form-input
          :state="$v.$dirty && $v.repeatPassword.$invalid ? false : null"
          id="input-repeatPassword"
          type="password"
          v-model="repeatPassword"
          required
          placeholder="Potwierdź hasło"
        ></b-form-input>
        <b-form-invalid-feedback :state="false" v-if="$v.$error && !$v.repeatPassword.required">
          To pole jest wymagane
        </b-form-invalid-feedback>
        <b-form-invalid-feedback
          :state="false"
          v-if="$v.$error && !$v.repeatPassword.sameAsPassword"
        >
          Podane hasła nie są identyczne
        </b-form-invalid-feedback>
      </b-form-group>
      <b-alert show v-if="isShowedSuccessInfo" variant="success"
        >Użytkownik zarejestrowany pomyślnie. Teraz możesz się
        <router-link to="/zaloguj">zalogować</router-link></b-alert
      >
      <b-alert show v-if="isShowedErrorInfo" variant="danger"
        >Użytkownik o podanym adresie email już istnieje. Zmień adres email lub
        <router-link to="/zaloguj">zaloguj się</router-link></b-alert
      >

      <b-button variant="primary" type="submit" class="">Zarejestruj</b-button>
    </b-form>
  </b-col>
</template>

<script>
import { mapActions } from "vuex";
import { required, minLength, email, sameAs } from "vuelidate/lib/validators";

export default {
  name: "Login",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      repeatPassword: "",
      isShowedSuccessInfo: false,
      isShowedErrorInfo: false
    };
  },
  validations: {
    name: {
      required,
      minLength: minLength(4)
    },
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(6)
    },
    repeatPassword: { required, sameAsPassword: sameAs("password") }
  },

  methods: {
    ...mapActions("auth", ["authenticationUser", "registerUser"]),
    registerNewUser() {
      this.isShowedErrorInfo = false;
      this.isShowedSuccessInfo = false;
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.registerUser({
          email: this.email,
          password: this.password,
          name: this.name
        })
          .then(() => {
            this.isShowedSuccessInfo = true;
            this.resetRegisterForm();
          })
          .catch(err => {
            this.isShowedErrorInfo = true;
          });
      }
    },
    resetRegisterForm() {
      this.name = "";
      this.email = "";
      this.password = "";
      this.repeatPassword = "";
      this.$v.$reset();
    }
  }
};
</script>

<style lang="scss" scoped>
.login-form {
  margin-top: 80px;
}
</style>
