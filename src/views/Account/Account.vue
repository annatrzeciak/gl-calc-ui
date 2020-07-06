<template>
  <b-container class="mt-56">
    <b-nav tabs fill class="my-4">
      <b-nav-item :to="{ name: 'account' }" :active="$route.name === 'account'">Konto</b-nav-item>
      <b-nav-item :to="{ name: 'subscriptions' }" :active="$route.name === 'subscriptions'"
        >Subskrypcje</b-nav-item
      >
      <b-nav-item :to="{ name: 'calculations' }" :active="$route.name === 'calculations'"
        >Kalkulacje
      </b-nav-item>
      <b-nav-item :to="{ name: 'shop' }" :active="$route.name === 'shop'">Sklep</b-nav-item>
    </b-nav>
    <template v-if="$route.name === 'account'">
      <h1 class="text-center">Konto</h1>
      <div class="details">
        <div><strong>Imię i nazwisko / login: </strong>{{ userDetails.name }}</div>
        <div><strong>Email: </strong>{{ userDetails.email }}</div>
        <div><strong>Rola: </strong>{{ userDetails.role }}</div>
        <div><strong>Plan: </strong>{{ userPlan.type }}</div>
        <div v-if="userPlan.subscriptions.length">
          <strong>Subskrypcja wygasa: </strong
          >{{
            new Date(
              userPlan.subscriptions[userPlan.subscriptions.length - 1].endDate
            ).toLocaleString()
          }}
        </div>
      </div>
      <b-alert
        class="mt-4"
        show
        v-if="userDetails.name && !userDetails.emailConfirmed"
        variant="warning"
      >
        Nie potwierdziłeś adresu email. Tylko użytkownicy z potwierdzonym adresem email mogą
        korzystać z pełnych możliwości serwisu. <br />
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
    </template>
    <Subscriptions v-else-if="$route.name === 'subscriptions'"/>
    <Calculations v-else-if="$route.name === 'calculations'"/>
    <Shop v-else-if="$route.name === 'shop'"/>
  </b-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Subscriptions from "./Subscriptions";
import Calculations from "./Calculations";
import Shop from "./Shop";

export default {
  name: "Account",
  components: {Shop, Calculations, Subscriptions},
  data: () => ({
    successMessage: "",
    errorMessage: ""
  }),
  computed: {
    ...mapGetters("auth", ["userDetails", "loggedUserEmail", "userPlan"])
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
