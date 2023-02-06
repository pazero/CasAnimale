<template>
  <div id="memory" class="bg-white">
    <div v-show="!fetchDone && !start">
      <div
        class="flex flex-col items-center justify-center h-[calc(100vh-5rem)] m-2"
      >
        <div v-show="!isLoggedIn()">
          <label
            for="questions"
            class="block mb-3 text-sm font-medium text-gray-900 dark:text-white"
            >Name</label
          >
          <input
            @change="(event) => (playerName = event.target.value)"
            type="text"
            id="name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <button
          class="btn btn-primary mt-3"
          v-show="!fetchDone"
          type="button"
          id="get-quiz"
          @click="showMemory"
        >
          Start!
        </button>
      </div>
    </div>
    <div v-show="start" class="flex pt-2 w-full justify-center items-center">
      <div
        v-show="start && !showResult"
        class="p-4 grid lg:grid-rows-3 md:grid-rows-6 sm:grid-rows-9 grid-flow-col gap-4"
      >
        <div v-for="data in animal_img">
          <img
            tabindex="0"
            v-show="!data.revealed"
            class="box-content h-64 w-64 p-1 border-4"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Color_icon_green.svg/800px-Color_icon_green.svg.png"
            @click="reveal(data)"
            @keydown="
              (e) => {
                if (e.key === 'Enter') reveal(data);
              }
            "
            alt="face-down card"
            aria-roledescription="flipping
          card"
          />
          <img
            tabindex="0"
            v-show="data.revealed"
            v-bind:id="'img' + data.id"
            class="box-content h-64 w-64 p-1 border-4"
            v-bind:src="data.img"
            :alt="`animal ` + data.id"
            aria-roledescription="flipped card"
          />
        </div>
      </div>
      <div
        class="justify-center items-center bg-white p-12 rounded-lg shadow-lg w-64 mt-8"
        v-show="showResult"
      >
        <h1 class="text-bold text-black text-3xl">Results</h1>
        <div class="flex justify-start space-x-4 mt-6">
          <p>
            Points:
            <span class="text-2xl text-blue-700 font-bold">{{
              totalPoints
            }}</span>
          </p>
        </div>
        <div class="mt-6 flow-root">
          <button
            @click="reset"
            class="float-right bg-indigo-600 text-white text-sm font-bold tracking-wide rounded-full px-5 py-2"
          >
            Play again
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script scoped>
import Const from "../router/utils";

export default {
  data() {
    return {
      playerName: "",
      totalPoints: 0,
      flippedCard: 0,
      token: "",
      timer: 0,
      animal_img: [],
      isRevaled: false,
      revealed_img: {},
      fetchDone: false,
      start: false,
      showResult: false,
    };
  },
  beforeMount() {
    this.fetchImg();
  },
  methods: {
    showMemory() {
      this.start = true;
      let time = new Date();
      this.timer = time.getTime();
    },

    isLoggedIn() {
      let name = "token";
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) {
        this.token = parts.pop().split(";").shift();
        return true;
      }
      return false;
    },

    async fetchImg() {
      for (let i = 0; i < 9; i++) {
        const response = await fetch("https://dog.ceo/api/breeds/image/random");
        const animal = await response.json();
        this.animal_img.push({
          id: i,
          revealed: false,
          img: animal.message,
        });
        this.animal_img.push({
          id: i,
          revealed: false,
          img: animal.message,
        });
      }
      this.shuffle(this.animal_img);
      this.fetchDone = false;
    },

    reveal(data) {
      if (this.flippedCard < 2) {
        data.revealed = true;
        if (this.isRevaled) {
          this.flippedCard += 1;
          if (data.id !== this.revealed_img.id) {
            setTimeout(() => {
              this.revealed_img.revealed = false;
              data.revealed = false;
            }, 1000);
          }
          setTimeout(() => {
            this.flippedCard = 0;
          }, 1000);
          this.isRevaled = false;
        } else {
          this.flippedCard += 1;
          this.isRevaled = true;
          this.revealed_img = data;
        }
      }

      var endGame = true;
      this.animal_img.forEach(
        (element) => (endGame = endGame & element.revealed)
      );
      if (endGame) {
        let time = new Date();
        this.totalPoints = Math.round(
          100000000 / (time.getTime() - this.timer)
        );
        this.showResult = true;
        this.sendData();
      }
    },

    // Fisher-Yates (aka Knuth) Shuffle.
    shuffle(array) {
      let currentIndex = array.length,
        randomIndex;

      // While there remain elements to shuffle.
      while (currentIndex != 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex],
          array[currentIndex],
        ];
      }
      return array;
    },

    async sendData() {
      const msg = await fetch(Const.BEURL + "/api/leaderboard/memory/add", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          name: this.playerName,
          points: this.totalPoints,
          token: this.token,
        }),
      });
    },

    reset() {
      this.fetchImg();
      this.showResult = false;
      this.start = false;
      this.playerName = "";
      this.animal_img = [];
      this.totalPoints = 0;
    },
  },
};
</script>

<style scoped></style>
