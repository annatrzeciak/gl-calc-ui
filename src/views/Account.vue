<template>
  <b-container class="mt-56">
    <h1>Konto</h1>
    <div class="details">
      <div><strong>Imię i nazwisko / login: </strong>{{ this.userDetails.name }}</div>
      <div><strong>Email: </strong>{{ this.userDetails.email }}</div>
      <div><strong>Rola: </strong>{{ this.userDetails.role }}</div>
    </div>
  </b-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Account",
  computed: {
    ...mapGetters("auth", ["userDetails", "loggedUserEmail"])
  },
  methods: {
    ...mapActions("auth", ["fetchUserDetails"])
  },
  async created() {
    await this.fetchUserDetails();
  }
};
</script>

<style scoped></style>
