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
import animals from "./animals.json";

export default {
  data() {
    return {
      fact: {
        title: "",
        body: "",
        image: "",
      },
      api: [
        "https://zoo-animal-api.herokuapp.com/animals/rand", // fornisce informazioni su un animale randomico (non funiona in data 09/01)
        "https://meowfacts.herokuapp.com/", // fornisce una curiosità sui gatti
        "https://cataas.com/cat?json=true", // fornisce foto di gatti casuali
      ],
      fetchDone: false,
    };
  },

  methods: {
    async getRandAnimal() {
      const animal = animals[Math.floor(Math.random() * animals.length)]; // get random animal
      const charact = animal.characteristics;
      console.log(animal);
      this.fact.title = `Discover the ${animal.name}! (latin name: ${animal.taxonomy.scientific_name})`;
      this.fact.body = `This animal is a ${charact.diet}.
        ${
          charact.group_behavior !== undefined
            ? `Its group behavior is ${charact.group_behavior}.`
            : ""
        }
        ${
          charact.length !== undefined
            ? `Its length is about ${charact.length?.split("(")[0]}.`
            : ""
        }
        ${
          charact.height !== undefined
            ? `Its height is about ${charact.height?.split("(")[0]}.`
            : ""
        }
        ${
          charact.weight !== undefined
            ? `Its weight is about ${charact.weight?.split("(")[0]}.`
            : ""
        }
        ${
          charact.lifespan !== undefined
            ? `Its lifespan is ${charact.lifespan}.`
            : ""
        }
        ${
          charact.predators !== undefined
            ? `Its predators are ${charact.predators}.`
            : ""
        }
        ${charact.prey !== undefined ? `Its prey are ${charact.prey}.` : ""}`;
      var ret = await fetch("https://meme-api.com/gimme/AnimalsBeingDerps", {
        responseType: "application/json",
      });
      ret = await ret.json();
      this.fact.image = ret.url;
      this.animal_fact = animal;
      this.fetchDone = true;
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
