<template>
  <div id="facts" class="">
    <div v-if="fetchDone" class="flex justify-center items-center">
      <div
        class="max-w-md rounded-md overflow-hidden shadow-lg m-16 bg-white border border-black border-2"
      >
        <div
          class="h-96 bg-cover"
          v-bind:style="{
            'background-image': 'url(' + fact.image + ')',
            'background-position': 'center center',
          }"
        ></div>
        <div class="mx-6 my-4 border-b border-gray-light text-black">
          <div class="font-medium text-xl text-gray-darker mb-4">
            {{ fact.title }}
          </div>
          <p class="font-normal text-gray-dark text-sm mb-2">
            {{ fact.body }}
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
      fact: {
        title: "",
        body: "",
        image: "",
      },
      api: [
        "https://zoo-animal-api.herokuapp.com/animals/rand", // fornisce informazioni su un animale randomico
        "https://meowfacts.herokuapp.com/", // fornisce una curiosità sui gatti
        "https://cataas.com/cat?json=true", // fornisce foto di gatti casuali
      ],
      fetchDone: false,
    };
  },
  methods: {
    getRandAnimal() {
      fetch("https://zoo-animal-api.herokuapp.com/animals/rand")
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            alert("Status " + response.status + " : " + response.statusText);
          }
        })
        .then((response) => {
          /*
            data_layout: {
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
            }
          */
          this.fact.title = `Discover the ${response.name}! (latin name: ${response.latin_name})`;
          this.fact.body = `This animal is a ${response.animal_type.toLowerCase()}. It's a ${response.active_time.toLowerCase()} animal. Its length is between
            ${Math.round(response.length_min * 0.3048 * 100) / 10} and ${Math.round(response.length_max * 0.3048 * 100) / 100} meters. Its weight is between
            ${Math.round(response.weight_min * 0.45359237 * 100) / 100} and ${Math.round(response.weight_max * 0.45359237 * 100) / 100} kg. Its lifespan is
            ${response.lifespan} years. Its natural habitat are the ${response.habitat.toLowerCase()}. Its diet is formed by ${response.diet.toLowerCase()}.
            Its tipical locations are ${response.geo_range}.`;
          this.fact.image = response.image_link;
          this.animal_fact = response;
          this.fetchDone = true;
        });
    },
    getCatFact() {
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
          this.fact.image = this.getCatImage();
          this.fact.body = response.data[0];
          this.fact.title = "Did you know?";
          this.fetchDone = true;
        });
    },
    getCatImage() {
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
          this.fact.image = "https://cataas.com" + response.url;
        });
    },
  },
};
</script>

<style scoped></style>
