<template>
  <b-container>
    <b-row class="my-5">
      <b-col>
        <h3 class="text-center font-weight-bold my-5">
          Czym właściwie jest indeks glikochemiczny?
        </h3>
        <p>
          Najprościej mówiąc, <strong>indeks glikochemiczny</strong> (IG) jest to wzrost poziomu
          glukozy we krwi, po zjedzeniu danego produktu. Jako podstawę (IG = 100) przyjmujemy
          spożycie 50g czystej glukozy.
        </p>
        <p>
          W różnej literaturze można zauważyć różne wartości graniczne dla IG, jednak w moim
          kalkulatorze sugerowałam się danymi na podstawie diety Montignaca, tj:
        </p>
        <ul>
          <li>
            <span class="text-success font-weight-bold">Niski indeks glikochemiczny</span> -
            produkty o IG niższym niz 40
          </li>
          <li>
            <span class="text-warning font-weight-bold">Średni indeks glikochemiczny</span> -
            produkty o IG pomiędzy 40 a 55
          </li>
          <li>
            <span class="text-danger font-weight-bold">Wysoki indeks glikochemiczny</span> -
            produkty o IG większym niż 55
          </li>
        </ul>
        <p>
          Poniższy wykres, przedstawia różnicę we wzroście poziomu glukozy po zjedzeniu produktu o
          niskim i wysokim IG.
          <b-col class="text-center mt-2">
            <img
              src="http://www.aptekarzpolski.pl/wp-content/uploads/2011/05/igwykres.jpg"
              alt="Wykres poziomu glukozy po zjedzeniu produktu o niskim i wysokim IG "
              title="Wykres poziomu glukozy po zjedzeniu produktu o niskim i wysokim IG "
            /><br />
            <small>źródło: <a href="http://www.aptekarzpolski.pl/">aptekarzpolski.pl</a></small>
          </b-col>
        </p>
        <p>
          Jeśli spojrzymy do przykładowej tabeli zobaczymy, że IG banana wynosi 60 i wiele osób
          będzie unikało tego produktu. Jednak nie musimy go wykluczać z diety. Wystarczy, że
          połączymy go z produktem o niski IG (np. z truskawkami, które mają IG = 25).
        </p>
        <h3 class="text-center font-weight-bold my-5">
          Jak obliczyć indeks glikochemiczny posiłku?
        </h3>
        <p>Mamy następujące składniki:</p>
        <b-col md="8" offset-md="2" class="text-center my-2">
          <table class="table-bordered text-center w-100">
            <thead>
              <tr>
                <th style="width: calc(200% / 9)">Składnik</th>
                <th style="width: calc(100% / 9)">IG</th>
                <th style="width: calc(200% / 9)">Węglowodany</th>
                <th style="width: calc(200% / 9)">Błonnik</th>
                <th style="width: calc(200% / 9)">Węglowodany przyswajalne</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Banan 100g</td>
                <td>60</td>
                <td>23,5g</td>
                <td>1,7g</td>
                <td>23,5 - 1,7 = 21,8g</td>
              </tr>
              <tr>
                <td>Truskawki 100g</td>
                <td>25</td>
                <td>7,2g</td>
                <td>1,8g</td>
                <td>7,2 - 1,8 = 5,4g</td>
              </tr>
              <tr>
                <td colspan="3"></td>
                <td>RAZEM</td>
                <td>27,2g</td>
              </tr>
            </tbody>
          </table>
        </b-col>
        <p>
          Zatem mamy 27,2g węglowodanów przyswajalnych w naszym 200g posiłku. Kolejnym krokiem jest
          obliczenie procentowego udziału węglowodanów z każdego składnika.
        </p>
        <p class="text-center">
          <strong>banan</strong><br />
          27,2g - 100%<br />
          21,8g - x<br />
          <strong>x =</strong> (21,8 / 27,2) * 100% = <strong>80,14 %</strong>
        </p>
        <p class="text-center">
          <strong>truskawki</strong><br />
          27,2g - 100%<br />
          5,4g - x<br />
          <strong>x =</strong> (5,4 / 27,2) * 100% = <strong>19,86 %</strong>
        </p>
        <p>Zatem IG całego posiłku wynosi:</p>
        <b-col md="8" offset-md="2" class="text-center my-2">
          <table class="table-bordered text-center w-100">
            <thead>
              <tr>
                <th style="width: calc(200% / 7)" class="flex">Składnik</th>
                <th style="width: calc(100% / 7)">IG</th>
                <th style="width: calc(200% / 7)">
                  procentowy udział węglowodanów przyswajalnych
                </th>
                <th style="width: calc(200% / 7)"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Banan 100g</td>
                <td>60</td>
                <td>80,14 %</td>
                <td>60 * 80,14 % = 48,08</td>
              </tr>
              <tr>
                <td>Truskawki 100g</td>
                <td>25</td>
                <td>19,86 %</td>
                <td>25 * 19,86 % = 4,96</td>
              </tr>
              <tr>
                <td colspan="2"></td>
                <td>RAZEM</td>
                <td>53,04</td>
              </tr>
            </tbody>
          </table>
        </b-col>
        <p>
          Zatem otrzymaliśmy posiłek o średnim (w niktórych źródłach niskim) indeksie
          glikochemicznym
        </p>
        <h3 class="text-center font-weight-bold my-5">Ładunek glikochemiczny</h3>
        <p>
          <strong>Ładunek glikochemiczny</strong> to miara zarówno ilości jak i jakości
          węglowodanów. Głównne założenie to: produkty o wysokim IG spożywane w małych ilościach
          powodują taki sam wyrzut insuliny jak produkt o niskim IG spożywany w dużej ilości
        </p>
        <p>
          Wartości ładunku glikochemicznego dzielimy na:
        </p>
        <ul>
          <li>
            <span class="text-success font-weight-bold">Niski ładunek glikochemiczny</span> - ŁG
            jest niższe niz 10
          </li>
          <li>
            <span class="text-warning font-weight-bold">Średni ładunek glikochemiczny</span> - ŁG
            pomiędzy 10 a 20
          </li>
          <li>
            <span class="text-danger font-weight-bold">Wysoki ładunek glikochemiczny</span> - ŁG
            wyższym niż 20
          </li>
        </ul>
        <p>
          Dobowy niski ładunek glikochemiczny wynosi w przybliżeniu &lt; 80, a wysoki &#8805; 120
        </p>
        <h3 class="text-center font-weight-bold my-5">Jak obliczyć ładunek glikochemiczny?</h3>
        <p>
          Wzór: <strong>ŁG = IG x zawartość węglowodanów przyswajalnych w porcji (g) / 100</strong>
        </p>
        <p>
          Obliczymy ŁG dla 100g gotowanej marchewki.
        </p>
        <b-col md="8" offset-md="2" class="text-center my-2">
          <table class="table-bordered text-center w-100">
            <thead>
              <tr>
                <th style="width: calc(200% / 7)" class="flex">Składnik</th>
                <th style="width: calc(100% / 7)">IG</th>
                <th style="width: calc(200% / 7)">
                  zawartość węglowodanów przyswajalnych
                </th>
                <th style="width: calc(200% / 7)">ŁG</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Gotowana marchewka 100g</td>
                <td>80</td>
                <td>8,7g (węglowodany ogólem)<br />- 3,6g (błonnik) =<br />5,1g</td>
                <td>80 x 5,1 / 100 =<br />408 / 100 = <strong>4,08</strong></td>
              </tr>
            </tbody>
          </table>
        </b-col>
        <p>
          IG gotowanej marchewnki jest wysokie (80), jednak po obliczeniu ładunku widzimy, że
          spożycie 100g nie spowoduje szybkiego wzrostu poposiłkowego stężenia glukozy. Jest to
          idealany przykład ukazujacy niedokonałość indeksu glikochemicznego.
        </p>
        <p>Wielu dietetyków wskazuje, że</p>
        <h2 class="text-center font-weight-bold">
          posiłki z niskim ładunkiem glikochemicznym to najzdrowszy model żywieniowy.
        </h2>
        <p>
          Niestety, szukanie wartości IG, węglowodanów itp oraz obliczenia są czasochłonne. Dlatego
          też powstała ta strona, aby pomóc przy komponowaniu posiłków, obliczaniu ładunku
          glikochemicznego.
        </p>
        <p>
          Jeśli chcesz dowiedzieć się więcej o indeksie i ładunku glikochemicznym polecam blog
          <a href="https://insulinoopornosc.com" target="_blank">insulinoopornosc.com</a>.
        </p>
        <p>
          A teraz zapraszam do użycia wyszukiwarki i kalkulatora.
        </p>
        <router-link :to="{ name: 'search' }">
          <h2 class="text-center font-weight-bold">
            Zobacz, jakie to proste!
          </h2></router-link
        >

        <p></p>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "MoreInfo"
};
</script>

<style scoped></style>
