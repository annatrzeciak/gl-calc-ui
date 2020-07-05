<template>
  <b-container class="mt-56">
    <h1 class="text-center">Subskrypcje</h1>
    <div role="tablist" v-if="allSubscriptions">
      <b-card
        no-body
        class="mb-1"
        v-for="(subscription, index) of allSubscriptions"
        :key="subscription.id"
      >
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button
            class="text-left d-flex justify-content-between"
            :variant="
              subscription.status.includes('success')
                ? 'success'
                : subscription.status.includes('errors')
                ? 'danger'
                : ''
            "
            block
            v-b-toggle="'accordion-' + subscription.id"
          >
            <span
              ><strong class="mr-3">{{ index + 1 }}: </strong>
              <font-awesome-icon icon="credit-card" />

              {{
                new Date(
                  subscription.paymentDate ? subscription.paymentDate : subscription.startDate
                ).toLocaleString()
              }}
            </span>
            <span>
              {{ getStatusMessage(subscription.status) }}
            </span>
          </b-button>
        </b-card-header>
        <b-collapse :id="'accordion-' + subscription.id" accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <b-row>
              <b-col md="6">
                <h4>Subskrypcja:</h4>
                <p v-if="subscription.paymentDate">
                  <strong>Data płatności:</strong>
                  {{ new Date(subscription.paymentDate).toLocaleString() }}
                </p>
                <p v-if="subscription.startDate">
                  <strong>Data rozpoczęcia:</strong>
                  {{ new Date(subscription.startDate).toLocaleString() }}
                </p>
                <p v-if="subscription.endDate">
                  <strong>Data zakończenia:</strong>
                  {{ new Date(subscription.endDate).toLocaleString() }}
                </p>
                <p v-if="subscription.amount && subscription.currency">
                  <strong>Koszt:</strong>
                  {{ subscription.amount / 100 }} {{ subscription.currency.toUpperCase() }}
                </p>
                <p v-if="subscription.id">
                  <strong>ID:</strong>
                  {{ subscription.id }}
                </p>
              </b-col>
              <b-col md="6">
                <template v-if="subscription.cardDetails">
                  <h4>Karta:</h4>
                  <p v-if="subscription.cardDetails.last4">
                    <strong>Numer:</strong>
                    **** **** **** {{ subscription.cardDetails.last4 }}
                  </p>
                  <p v-if="subscription.cardDetails.brand">
                    <strong>Typ:</strong>
                    {{ subscription.cardDetails.brand.toUpperCase() }}
                  </p>
                  <p v-if="subscription.cardDetails.exp_month && subscription.cardDetails.exp_year">
                    <strong>Data ważności:</strong>
                    {{ subscription.cardDetails.exp_month }}/{{ subscription.cardDetails.exp_year }}
                  </p>
                </template>
              </b-col>
            </b-row>
          </b-card-body>
        </b-collapse>
      </b-card>
    </div>
    <Spinner v-if="subscriptionsAreLoaded" />
  </b-container>
</template>

<script>
import Spinner from "@/components/Utils/Spinner.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Subscriptions",
  components: { Spinner },
  data: () => ({
    subscriptionsAreLoaded: false
  }),
  computed: {
    ...mapGetters("subscription", ["allSubscriptions"]),
    ...mapGetters("auth", ["loggedUserEmail"])
  },
  methods: {
    ...mapActions("subscription", ["fetchSubscriptions"]),
    getStatusMessage(message) {
      if (message.includes("Payment completed successfully")) {
        return "Aktywna";
      } else if (message.includes("Payment completed with errors")) {
        if (message.includes("payment_intent_authentication_failure")) {
          return "Błąd podczas uwierzytelniania płatności";
        } else if (message.includes("card_declined:insufficient_funds")) {
          return "Brak wystarczającej ilości środków";
        }
        return "Błąd podczas płatności";
      } else if (message.includes("Subscription expired")) {
        return "Subskrypcja wygasła";
      }
      return "";
    }
  },
  async created() {
    this.subscriptionsAreLoaded = true;
    this.fetchSubscriptions({ email: this.loggedUserEmail }).then(() => {
      this.subscriptionsAreLoaded = false;
    });
  }
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
