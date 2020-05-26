<template>
  <b-container class="mt-56">
    <h1 class="text-center">Konto</h1>

    <div class="details">
      <div><strong>Imię i nazwisko / login: </strong>{{ userDetails.name }}</div>
      <div><strong>Email: </strong>{{ userDetails.email }}</div>
      <div><strong>Rola: </strong>{{ userDetails.role }}</div>
    </div>
    <b-alert class="mt-4" show v-if="userDetails.name && !userDetails.emailConfirmed" variant="warning">
      Nie potwierdziłeś adresu email. Tylko użytkownicy z potwierdzonym adresem email mogą korzystać
      z pełnych możliwości serwisu. <br />
      <strong>Nie otrzymałeś/aś emaila?</strong>
      <b-link @click="sendConfirmationEmail">
        Wyślij ponownie
      </b-link>
      wiadomość.
    </b-alert>
    <b-alert class="mt-4" show v-if="successMessage" variant="success">
      {{ successMessage }}
    </b-alert>
    <b-alert class="mt-4" show v-if="errorMessage" variant="danger">
      {{ errorMessage }}
    </b-alert>
  </b-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Account",
  data: () => ({
    successMessage: "",
    errorMessage: ""
  }),
  computed: {
    ...mapGetters("auth", ["userDetails", "loggedUserEmail"])
  },
  methods: {
    ...mapActions("auth", ["fetchUserDetails", "sendAgainConfirmationEmail"]),
    async sendConfirmationEmail() {
      await this.sendAgainConfirmationEmail()
        .then(r => {
          this.successMessage = r.message;
        })
        .catch(e => {
          this.errorMessage = e.data.message;
        });
    }
  },

  async created() {
    await this.fetchUserDetails();
  }
};
</script>

<style scoped></style>
