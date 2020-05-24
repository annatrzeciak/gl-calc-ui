<template>
  <b-col class="pt-5 mt-56" md="4" offset-md="4" sm="6" offset-sm="3">
    <b-alert show variant="danger" v-if="errorType == 'user-not-found'"
      >Nie znaleziono użytkownika o podanym adresie email. Kliknij, aby się
      <router-link to="/rejestracja">zarejestrować</router-link> i
    </b-alert>
    <b-alert show variant="danger" v-else-if="errorType == 'invalid-token'"
      >Podany link jest nieprawidłowy. <router-link to="/zaloguj">Zaloguj się</router-link> i
      kliknij "Wyślij ponownie", aby otrzymać emaila z nowym linkiem.
    </b-alert>
    <b-alert show variant="danger" v-else-if="errorType == 'token-assigned-to-another-user'"
      >Podany link jest przypisany do innego użytkownika.
      <router-link to="/zaloguj">Zaloguj się</router-link> i kliknij "Wyślij ponownie", aby otrzymać
      emaila z nowym linkiem.
    </b-alert>
    <b-alert show variant="warning" v-else-if="errorType == 'user-has-already-confirmed-email'"
      >Podany użytkownik już potwierdził email.
      <router-link to="/zaloguj">Zaloguj się</router-link> i korzystaj z pełnych możliwości serwisu.
    </b-alert>
  </b-col>
</template>

<script>
export default {
  name: "TokenError",
  data: () => ({
    errorType: ""
  }),
  created() {
    if (this.$route.query.errorType) {
      this.errorType = this.$route.query.errorType;
      this.$router.push({ query: {} });
    } else {
      this.$router.push({ name: "home" });
    }
  }
};
</script>

<style scoped></style>
