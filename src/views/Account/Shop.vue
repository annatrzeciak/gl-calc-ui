<template>
  <b-container class="mt-56">
    <h1 class="text-center">Sklep</h1>
    <div class="text-center mt-5">
      <table class="table table-hover">
        <thead>
          <tr>
            <th></th>
            <th>Podstawowy</th>
            <th>Rozszerzony</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Brak reklam</td>
            <td>❌</td>
            <td>✅</td>
          </tr>
          <tr class="disabled">
            <td>
              Export kalkulacji do pliku cvs
              <font-awesome-icon icon="info-circle" title="Opcja będzie dostępna wkrótce" />
            </td>
            <td>❌</td>
            <td>✅</td>
          </tr>
          <tr class="disabled">
            <td>
              Export kalkulacji do pliku pdf
              <font-awesome-icon icon="info-circle" title="Opcja będzie dostępna wkrótce" />
            </td>
            <td>❌</td>
            <td>✅</td>
          </tr>
          <tr>
            <td>
              Cena
            </td>
            <td>Darmowy</td>
            <td>5 zł/msc</td>
          </tr>
        </tbody>

        <tfoot>
          <tr>
            <td></td>
            <td></td>
            <td><b-button @click="buyExtendedPlan" variant="success">Kup</b-button></td>
          </tr>
        </tfoot>
      </table>
      <b-alert
        show
        v-if="errorMessage || ($route.query.status && $route.query.status.includes('error'))"
        variant="danger"
        >Wystąpił błąd podczas płatności.
        {{ $route.query.status ? "Kod błędu:" + $route.query.status.split(":")[1] : "" }}</b-alert
      >
      <b-alert
        show
        v-if="$route.query.status && $route.query.status.includes('success')"
        variant="success"
        >Płatność zakończona pomyślnie</b-alert
      >
    </div>
  </b-container>
</template>

<script>
import { loadStripe } from "@stripe/stripe-js";

import { mapActions, mapGetters } from "vuex";

export default {
  name: "Shop",
  data: () => ({
    errorMessage: ""
  }),
  computed: {
    ...mapGetters("auth", ["loggedUserEmail"])
  },
  methods: {
    ...mapActions("subscription", ["createPayment"]),

    async buyExtendedPlan() {
      const stripe = await loadStripe(process.env.VUE_APP_STRIPE_KEY);

      this.createPayment({ email: this.loggedUserEmail }).then(async res => {
        const { error } = await stripe.redirectToCheckout({
          // Make the id field from the Checkout Session creation API response
          // available to this file, so you can provide it as parameter here
          // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
          sessionId: res.session.id
        });
        if (error) this.errorMessage = error;
      });
    }
  },
  async created() {}
};
</script>

<style lang="scss" scoped>
table {
  margin-right: auto;
  margin-left: auto;
  td,
  th {
    text-align: center;
  }
  tr.disabled {
    opacity: 0.4;
    &:after {
    }
  }
}
</style>
