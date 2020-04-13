<template>
  <div class="searchWrapper">
    <input
      placeholder="Wpisz nazwę i naciśnij enter"
      id="text"
      name="search"
      type="search"
      @keyup.enter="$emit('filter', $event.target.value)"
      :disabled="disabled"
    />
  </div>
</template>

<script>
export default {
  name: "SearchInput",
  props: {
    value: { type: String, required: true },
    disabled: { type: Boolean, required: false, default:false }
  }
};
</script>

<style lang="scss" scoped>
.searchWrapper {
  text-align: center;

  label {
    font-family: Montserrat, sans-serif;
  }

  input {
    margin-top: 20px;
    text-align: center;
    font-weight: 400;
    font-size: 16px;
    height: 30px;
    border: 0;
    border-bottom: 1px solid black;
    background: none;
    transition: box-shadow 0.3s ease-out;

    @media (min-width: 768px) {
      font-size: 18px;
    }
    @media (min-width: 1024px) {
      font-weight: 400;
    }
    &:focus {
      outline: none;
      box-shadow: 0 10px 20px -8px rgba(0, 0, 0, 0.4);
    }
    &.dark {
      color: #1e3d4a;
      border-bottom-color: #1e3d4a;
      &:focus {
        outline: none;
        box-shadow: 0 10px 20px -8px rgba(#1e3d4a, 0.4);
      }
    }
  }
}
</style>
