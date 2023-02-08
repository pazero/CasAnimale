<template>
  <div class="bg-white h-[calc(100vh-4rem)]">
    <div class="flex">
      <button
        tabindex="0"
        class="place-self-center flex-none justify-left"
        @click="prev"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="64"
          height="64"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path
            d="M10.828 12l4.95 4.95-1.414 1.414L8 12l6.364-6.364 1.414 1.414z"
          />
        </svg>
      </button>

      <div
        class="place-self-center flex justify-center flex-auto text-black mt-16"
      >
        <div class="max-w-sm rounded overflow-hidden shadow-lg">
          <!-- in production comment /g from ? '/g/compra.png' -->
          <img
            class="w-full"
            v-bind:src="
              selectedProd.photo === '' ? '/compra.png' : selectedProd.photo
            "
            alt=""
          />
          <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2">{{ selectedProd.name }}</div>
            <p class="text-gray-700 text-base">
              {{ selectedProd.description }}
            </p>
          </div>
        </div>
      </div>
      <button
        tabindex="0"
        class="place-self-center flex-none justify-end"
        @click="next"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="64"
          height="64"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path
            d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z"
          />
        </svg>
      </button>
    </div>

    <div class="flex justify-center">
      <a
        tabindex="0"
        class="mt-4 bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-auto"
        :href="c.FOURL + '/compra'"
      >
        Visit out shop
      </a>
    </div>
  </div>
</template>

<script>
import Const from "../router/utils";

export default {
  setup() {
    const c = Const;
    return { c };
  },
  data() {
    return {
      fetchDone: false,
      products: {},
      selectedProd: {},
      i: 0,
    };
  },
  mounted() {
    this.getProducts();
  },
  methods: {
    async getProducts() {
      var ret = await fetch(Const.BEURL + "/api/product/");
      ret = await ret.json();
      // console.log(ret);
      this.products = ret;
      this.updateProd();
    },
    updateProd() {
      this.selectedProd = this.products[this.i];
    },
    next() {
      if (this.i == this.products.length - 1) this.i = 0;
      else this.i++;

      this.updateProd();
    },
    prev() {
      if (this.i == 0) this.i = this.products.length - 1;
      else this.i--;

      this.updateProd();
    },
  },
};
</script>

<style scoped></style>
