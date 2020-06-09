<template>
  <b-container class="mt-56">
    <h1 class="text-center">Kalkulacje</h1>
    <div role="tablist" v-if="allCalculations">
      <b-card no-body class="mb-1" v-for="calculation of allCalculations" :key="calculation._id">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button class="text-left" block v-b-toggle="'accordion-' + calculation._id">
            {{ new Date(calculation._id).toLocaleDateString() }}
            <span class="ml-5">{{ calculation.meals.length }} posiłki</span></b-button
          >
        </b-card-header>
        <b-collapse :id="'accordion-' + calculation._id" accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <div v-for="meal of calculation.meals" :key="calculation._id + meal.mealNumber">
              <h4 v-if="meal.mealNumber === 1">Śniadanie</h4>
              <h4 v-else-if="meal.mealNumber === 2">II Śniadanie</h4>
              <h4 v-else-if="meal.mealNumber === 3">Obiad</h4>
              <h4 v-else-if="meal.mealNumber === 4">Podwieczorek</h4>
              <h4 v-else-if="meal.mealNumber === 5">Kolacja</h4>

              <CalculatorTable
                :calculations="meal.products"
                :deleteIsPossible="false"
                size="wide"
              />
            </div>
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
  components: { CalculatorTable },
  computed: {
    ...mapGetters("calculation", ["allCalculations"]),
    ...mapGetters("auth", ["loggedUserEmail"])
  },
  methods: {
    ...mapActions("calculation", ["fetchCalculations"])
  },
  created() {
    this.fetchCalculations({ email: this.loggedUserEmail, page: 1, pageSize: 20 });
  }
};
</script>

<style scoped></style>
