<template>
  <header id="header">
    <div class="mainInfoWapper text-shadow">
      <h1 class="mainInfoTitle">
        Oblicz ładunek glikochemicznym swojego posiłku
      </h1>
      <p class="mainInfoSubtitle">
        Ten prosty kalkulator pomoże Ci w planowaniu posiłków.
      </p>
      <p class="mainInfoSubtitle">
        Dostrzeż pierwsze efekty spożywania posiłków z niskim ładunkiem glikochemicznym
      </p>
      <b-button @click="$emit('scroll-to-more')" class="btn-more mt-5">Dowiedz się więcej</b-button>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header"
};
</script>

<style scoped lang="scss">
header {
  color: white;
  width: 100%;
  max-width: 100vw;
  min-height: 100vh;
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("/images/smoothies.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
}
.mainInfoWapper {
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  padding: 30px;
  .mainInfoTitle {
    font-size: 30px;
    margin: 0;
    text-align: center;
    font-weight: 800;
    @media (min-width: 768px) {
      font-size: 40px;
    }
    @media (min-width: 768px) {
      font-size: 40px;
    }
  }
  .mainInfoSubtitle {
    text-align: center;
    margin: 25px 0 0;
    font-size: 15px;
    @media (min-width: 768px) {
      font-size: 20px;
    }
  }
}
</style>
