<template>
  <div id="facts" class="bg-white pb-6">
    <div
      v-show="fetchDone && !showLoader"
      class="flex justify-center items-center"
    >
      <div
        class="max-w-md rounded-md overflow-hidden shadow-lg m-10 mb-0 bg-white border border-black border-2"
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
    <div v-show="showLoader" class="flex justify-center items-center m-16 h-96">
      <svg
        class="animate-spin"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="96"
        height="96"
      >
        <path fill="none" d="M0 0h24v24H0z" />
        <path
          d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm4.82-4.924A7 7 0 0 0 9.032 5.658l.975 1.755A5 5 0 0 1 17 12h-3l2.82 5.076zm-1.852 1.266l-.975-1.755A5 5 0 0 1 7 12h3L7.18 6.924a7 7 0 0 0 7.788 11.418z"
        />
      </svg>
    </div>

    <div
      class="flex flex-col justify-center items-center mt-6"
      :class="{ 'h-[calc(100vh-4rem)]': !fetchDone && !showLoader }"
    >
      <div
        v-show="showInput"
        class="text-black max-w-sm rounded overflow-hidden shadow-lg p-3 m-4 border border-black"
      >
        <div class="flex">
          <div
            v-for="pet in ppets"
            class="flex flex-col justify-center items-center max-w-sm rounded overflow-hidden shadow-lg border border-blue-500 m-2 p-2"
          >
            <div class="font-bold">{{ pet.name }}</div>
            <div class="">{{ pet.species }}</div>
            <button
              class="m-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              @click="getSpecificAnimal(pet.species)"
            >
              Select
            </button>
          </div>
        </div>
        <div class="flex justify-center font-bold mb-2">or...</div>
        <input
          class="shadow appearance-none border border-blue-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          v-model="selectedPet"
          placeholder="Insert the spiecie of an animal here"
        />
        <div class="flex justify-center">
          <button
            @click="getSpecificAnimal(selectedPet)"
            class="m-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          >
            Get
          </button>
        </div>
      </div>

      <div class="text-black pb-4 font-bold">
        Get useful or funny facts about a random animal or your favorite pet
        with funny image also.
      </div>
      <div id="buttonsfacts" class="flex">
        <button class="btn btn-primary mr-2" @click="getRandAnimal">
          Random
        </button>
        <button id="show-modal" class="btn btn-primary mr-2" @click="getPets">
          Specific
        </button>
        <button class="btn btn-primary" @click="getCatFact">FunnyCats</button>
      </div>
    </div>
  </div>
</template>

<script scoped>
import animals from "./animals.json";
import Const from "../router/utils";

export default {
  data() {
    return {
      pptes: [],
      selectedPet: "",
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
      showInput: false,
      showLoader: false,
    };
  },

  methods: {
    async getPets() {
      var user = await fetch(Const.BEURL + "/api/user/getInfo", {
        credentials: "include",
      });

      user = await user.json();

      var ret = await fetch(Const.BEURL + "/api/pet?owner=" + user._id, {
        credentials: "include",
      });
      this.ppets = await ret.json();
      // console.log(this.ppets);
      this.showInput = !this.showInput;
    },

    async getSpecificAnimal(name) {
      this.showLoader = true;
      this.fact = {};
      var ret = await fetch(
        "https://api.api-ninjas.com/v1/animals?name=" + name,
        {
          headers: {
            "X-Api-Key": "fjDpcgl3aF8JvD12ocs3Cg==GPPteCMGOw04HdFw",
          },
        }
      );
      ret = await ret.json();
      // console.log(ret)
      if (ret.length > 0) {
        let animal = ret[Math.floor(Math.random() * ret.length)];
        this.setFactAnimal(animal);
      } else {
        this.fact.title = "No animal found :(";
        this.fetchDone = true;
        this.showLoader = false;
      }
    },

    async setFactAnimal(animal) {
      this.showLoader = true;
      const charact = animal.characteristics;
      // console.log(animal); // uncomment for debug
      this.fact.title = `Discover the ${animal.name}!
      ${
        animal.taxonomy.scientific_name !== undefined
          ? `(latin name: ${animal.taxonomy.scientific_name})`
          : ""
      }`;
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
      // var ret = await fetch("https://meme-api.com/gimme/AnimalsBeingDerps", {
      //   responseType: "application/json",
      // });
      // ret = await ret.json(); //TODO CONTROLLARE
      this.fact.image = "leone.jpg";
      this.animal_fact = animal;
      this.fetchDone = true;
      this.showLoader = false;
    },
    async getRandAnimal() {
      const animal = animals[Math.floor(Math.random() * animals.length)]; // get random animal
      this.setFactAnimal(animal);
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
