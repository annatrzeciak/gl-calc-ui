<template>
  <b-container class="mt-56">
    <h1 class="text-center">Kalkulacje</h1>
    <div role="tablist" v-if="allCalculations">
      <b-card no-body class="mb-1" v-for="calculation of allCalculations" :key="calculation._id">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button class="text-left" block v-b-toggle="'accordion-' + calculation._id"
            >{{ new Date(calculation.date).toLocaleDateString() }}
            {{ calculation.meal_name }}</b-button
          >
        </b-card-header>
        <b-collapse :id="'accordion-' + calculation._id" accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <CalculatorTable :calculations="calculation.products" :deleteIsPossible="false" size="wide" />
          </b-card-body>
        </b-collapse>
      </b-card>
    </div>
  </b-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import CalculatorTable from "../components/Calculator/CalculatorTable";

export default {
  name: "Calculations",
  components: {CalculatorTable},
  computed: {
    ...mapGetters("calculation", ["allCalculations"]),
    ...mapGetters("auth", ["loggedUserEmail"])
  },
  methods: {
    ...mapActions("calculation", ["fetchCalculations"])
  },
  created() {
    this.fetchCalculations({ email: this.loggedUserEmail, page: 1, pageSize: 10 });
  }
};
</script>

<style scoped></style>
