<template>
  <div class="searchWrapper">
    <input id="text" name="search" type="search" @keyup="$emit('filter', $event.target.value)" />
  </div>
</template>

<script>
export default {
  name: "SearchInput",
  props:{
    value: {type: String, required:true}
  }
};
</script>

<style lang="scss" scoped>
.searchWrapper {
  display: flex;
  flex-direction: column;
  width: 300px;
  margin-top: 50px;

  label {
    font-family: Montserrat, sans-serif;
  }

  input {
    text-align: center;
    font-width: 300;
    color: white;
    font-size: 18px;
    height: 30px;
    border: 0;
    border-bottom: 1px solid white;
    background: none;
    transition: box-shadow 0.3s ease-out;

    @media (min-width: 768px) {
      font-size: 26px;
    }
    @media (min-width: 1024px) {
      font-weight: 600;
    }
    &:focus {
      outline: none;
      box-shadow: 0 10px 20px -8px rgba(255, 255, 255, 0.4);
    }
  }
}
</style>
