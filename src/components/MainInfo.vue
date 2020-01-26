<template>
  <div class="mainInfoWapper">
    <h1 class="mainInfoTitle">
      Kalkulator ładunku glikochemicznego
    </h1>
    <p class="mainInfoSubtitle">
      Prosty kalkulator który pomoże Ci w planowaniu posiłków.
    </p>
    <p class="mainInfoSubtitle">
      Znajdź interesujące Cię produkty przy użyciu poniższej wyszukiwarki.
    </p>
  </div>
</template>

<script>
export default {
  name: "MainInfo"
};
</script>

<style scoped lang="scss">
.mainInfoWapper {
  width: 100%;
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
