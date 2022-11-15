<template>
  <div id="facts" class="">
    <div v-if="fetchDone && !fetchCat" class="flex justify-center items-center">
      <div
        class="max-w-md rounded-md overflow-hidden shadow-lg m-16 bg-white border border-black border-2"
      >
        <div
          class="h-96 bg-cover"
          v-bind:style="{
            'background-image': 'url(' + animal.image_link + ')',
            'background-position': 'center center',
          }"
        ></div>
        <div class="mx-6 my-4 border-b border-gray-light text-black">
          <div class="font-medium text-xl text-gray-darker mb-4">
            Discover the {{ animal.name }}! (latin name:
            {{ animal.latin_name }})
          </div>
          <p class="font-normal text-gray-dark text-sm mb-2">
            This animal is a {{ animal.animal_type.toLowerCase() }}. It's a
            {{ animal.active_time.toLowerCase() }} animal. Its length is between
            {{ Math.round(animal.length_min * 0.304 * 100) / 100 }} and
            {{ Math.round(animal.length_max * 0.304 * 100) / 100 }} meters. Its
            weight is between
            {{ Math.round(animal.weight_min * 0.45359237 * 100) / 100 }} and
            {{ Math.round(animal.weight_max * 0.45359237 * 100) / 100 }} kg. Its
            lifespan is {{ animal.lifespan }} years. Its natural habitat are the
            {{ animal.habitat.toLowerCase() }}. Its diet is formed by
            {{ animal.diet.toLowerCase() }}. Its tipical locations are
            {{ animal.geo_range }}.
          </p>
        </div>
      </div>
    </div>
    <div v-if="fetchCat" class="flex justify-center items-center">
      <div
        class="max-w-md rounded-md overflow-hidden shadow-lg m-16 bg-white border border-black border-2"
      >
        <div
          class="h-96 bg-cover"
          v-bind:style="{
            'background-image': 'url(' + catimg + ')',
            'background-position': 'center center',
          }"
        ></div>
        <div class="mx-6 my-4 border-b border-gray-light text-black">
          <div class="font-medium text-xl text-gray-darker mb-4">
            Did you know?
          </div>
          <p class="font-normal text-gray-dark text-sm mb-2">
            {{ animal }}
          </p>
        </div>
      </div>
    </div>
    <div
      class="flex justify-center items-center"
      :class="{ 'h-[calc(100vh-4rem)]': !fetchDone }"
    >
      <div id="video" class="flex">
        <button class="btn btn-primary mr-2" @click="getRandAnimal">
          Get an animal fact
        </button>
        <button class="btn btn-primary" @click="getCatFact">
          Get a cat fact
        </button>
      </div>
    </div>
  </div>
</template>

<script scoped>
export default {
  data() {
    return {
      catimg: "",
      api: [
        "https://zoo-animal-api.herokuapp.com/animals/rand", // fornisce informazioni su un animale randomico
        "https://meowfacts.herokuapp.com/", // fornisce una curiosità sui gatti
        "https://cataas.com/cat?json=true", // fornisce foto di gatti casuali
      ],
      fetchDone: false,
      fetchCat: false,
      // data layout
      animal: {
        name: "",
        latin_name: "",
        animal_type: "",
        active_time: "",
        length_min: "",
        length_max: "",
        weight_min: "",
        weight_max: "",
        lifespan: "",
        habitat: "",
        diet: "",
        geo_range: "",
        image_link: "",
        id: 0,
      },
    };
  },
  methods: {
    getRandAnimal() {
      fetch("https://zoo-animal-api.herokuapp.com/animals/rand")
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            alert(
              "Server returned " + response.status + " : " + response.statusText
            );
          }
        })
        .then((response) => {
          this.animal = response;
          this.fetchDone = true;
          this.fetchCat = false;
        });
    },
    getCatFact() {
      fetch("https://cataas.com/cat?json=true")
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            alert(
              "Server returned " + response.status + " : " + response.statusText
            );
          }
        })
        .then((response) => {
          this.catimg = "https://cataas.com" + response.url;
        });

      fetch("https://meowfacts.herokuapp.com")
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            alert(
              "Server returned " + response.status + " : " + response.statusText
            );
          }
        })
        .then((response) => {
          this.animal = response.data[0];
          this.fetchDone = true;
          this.fetchCat = true;
        });
    },
  },
};
</script>

<style scoped></style>
