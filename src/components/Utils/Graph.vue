<template>
  <div>
    <svg id="graph" width="200" height="200" v-html="graph"></svg>
    <div v-if="carbs || protein || fat">
      <div class="dark-blue-text ">Węglowodany: {{ Math.round(carbs * 100) / 100 }}%</div>
      <div class="turquoise-text">Białko: {{ Math.round(protein * 100) / 100 }}%</div>
      <div class="orange-text">Tłuszcz: {{ Math.round(fat * 100) / 100 }}%</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Graph",
  props: {
    carbs: { type: Number, required: false },
    fat: { type: Number, required: false },
    protein: { type: Number, required: false },
    kcal: { type: Number, required: false },
    kJ: { type: Number, required: false },
    GI: { type: Number, required: false }
  },
  data: () => ({
    centerX: 100,
    centerY: 100,
    radius: 70
  }),
  computed: {
    graph() {
      if (this.carbs || this.protein || this.fat) {
        let array = [];
        const data = [
          { value: this.carbs, color: "#08629E" },
          { value: this.protein, color: "#00aa9c" },
          { value: this.fat, color: "#FF8627" },
          { value: 100 - this.carbs - this.protein - this.fat, color: "#ccc" }
        ];
        let total = 0;
        let beg = 0;
        let end = 0;
        let count = 0;

        for (let i = 0; i < data.length; i++) total += data[i].value;
        for (let i = 0; i < data.length; i++) {
          let item = data[i];
          if (Math.round(item.value * 100) / 100 > 0.5) {
            let p = Math.floor(((item.value + 1) / total) * 100 * 100) / 100;
            count += p;

            if (i === length - 1 && count < 100) p = p + (100 - count);

            end = beg + (360 / 100) * p;

            let b = this.arcradius(this.centerX, this.centerY, this.radius, end);
            let e = this.arcradius(this.centerX, this.centerY, this.radius, beg);
            let la = end - beg <= 180 ? 0 : 1;

            const d = [
              "M",
              Math.floor(b.x * 10000) / 10000,
              Math.floor(b.y * 10000) / 10000,
              "A",
              this.radius,
              this.radius,
              0,
              la,
              0,
              Math.floor(e.x * 10000) / 10000,
              Math.floor(e.y * 10000) / 10000
            ].join(" ");
            beg = end;
            array.push(`<g>
                  <path d="${d}" stroke="${item.color}" fill="none" stroke-width="50" />
             </g>`);
          }
        }
        array.push(`
          <switch>
            <foreignObject
              v-if="kcal || kJ"
              x="0"
              y="${this.GI ? 67 : 85}"
              width="200"
              height="200"
            >
              <div class="d-flex justify-content-center align-items-center flex-column graph-labels">
               <h5 style='line-height: 19.5px'  class="mb-0 font-weight-bold grey-text">${Math.round(
                 this.kcal ? this.kcal : this.kJ / 4.1858
               )}<span class="font-weight-normal grey-text smaller-text"> kcal</span></h5>
                 <h5 style='line-height: 19.5px' class='mb-0 font-weight-bold ${
                   this.GI < 40 ? "text-success" : this.GI < 55 ? "text-warning" : "text-danger"
                 } ${!this.GI ? "d-none" : ""} '>GI: ${Math.round(this.GI)}</h5>
                  <h5  style='line-height: 19.5px' class='mb-0 font-weight-bold ${
                    this.LG < 10 ? "text-success" : this.GI < 20 ? "text-warning" : "text-danger"
                  } ${!this.LG ? "d-none" : ""} '>ŁG: ${Math.round(this.LG)}</h5>
               <span style='line-height: 15px' class="grey-text smaller-text">w 100g</span>
              </div>
            </foreignObject>
          </switch>
        `);
        return array.join(" ");
      } else {
        return "";
      }
    },
    LG() {
      return this.GI ? (this.GI * this.carbs) / 100 : 0;
    }
  },
  methods: {
    arcradius(cx, cy, radius, degrees) {
      const radians = ((degrees - 90) * Math.PI) / 180.0;
      return { x: cx + radius * Math.cos(radians), y: cy + radius * Math.sin(radians) };
    }
  }
};
</script>

<style lang="scss" type="text/scss" scoped>
@import "./../../styles/colors";
.graph-labels {
  h5 {
    line-height: 19.5px;
  }
}
</style>
