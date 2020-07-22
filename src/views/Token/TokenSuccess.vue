<template>
  <b-col class="pt-5 mt-56" md="4" offset-md="4" sm="6" offset-sm="3">
    <b-alert show variant="success"
      >Email został potwierdzony. <router-link to="/zaloguj">Zaloguj się</router-link> i korzystaj z
      pełnych możliwości serwisu.
    </b-alert>
  </b-col>
</template>

<script>
export default {
  name: "TokenIsInvalid"
};
</script>

<style scoped></style>
