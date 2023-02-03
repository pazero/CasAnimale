<template>
  <div id="hangman">
    <div class="bg-white h-screen" data-theme="lemonade">
      <NavBar />
      <!-- end play popup-->
      <div
        v-if="end"
        class="popup flex flex-1 flex-auto flex-col h-full w-full"
      >
        <div class="popup-inner rounded-md">
          <p v-if="gameOver" class="font-semibold normal-case text-md m-3">
            GAME OVER
          </p>
          <p v-if="win" class="font-semibold normal-case text-md m-3">
            YOU WIN!
          </p>
          <div class="m-2">
            <p class="m-2">
              The word was:
              <span class="text-xl text-blue-700 font-bold">{{ word }}</span>
            </p>
            <p class="m-2">
              Points:
              <span class="text-2xl text-blue-700 font-bold">{{
                totalPoints
              }}</span>
            </p>
            <button
              type="button"
              class="btn m-2"
              @click="initialize()"
              aria-label="newGame"
              style="display: inline-block"
            >
              New Game
            </button>
            <button
              type="button"
              class="btn m-2"
              @click="games()"
              aria-label="exit"
              style="display: inline-block"
            >
              Exit
            </button>
          </div>
        </div>
      </div>

      <!-- page title -->
      <div class="font-semibold normal-case text-xl m-4 pt-4">HANGMAN</div>

      <!-- hangman draw -->
      <div class="flex items-center justify-center mb-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          width="350px"
          height="260px"
          viewBox="0 0 350 275"
          preserveAspectRatio="xMidYMid meet"
        >
          <line
            v-if="strikes > 0"
            x1="80"
            y1="257"
            x2="260"
            y2="257"
            style="stroke: black; fill: none; stroke-width: 2px"
          />
          <line
            v-if="strikes > 1"
            x1="100"
            y1="257"
            x2="100"
            y2="40"
            style="stroke: black; fill: none; stroke-width: 2px"
          />
          <line
            v-if="strikes > 2"
            x1="100"
            y1="40"
            x2="230"
            y2="40"
            style="stroke: black; fill: none; stroke-width: 2px"
          />
          <line
            v-if="strikes > 3"
            x1="100"
            y1="80"
            x2="130"
            y2="40"
            style="stroke: black; fill: none; stroke-width: 2px"
          />
          <line
            v-if="strikes > 4"
            x1="230"
            y1="40"
            x2="230"
            y2="80"
            style="stroke: black; fill: none; stroke-width: 2px"
          />
          <circle
            v-if="strikes > 5"
            cx="230"
            cy="90"
            style="fill: khaki; stroke: black; stroke-width: 2px"
            r="20"
          />
          <line
            v-if="strikes > 6"
            x1="230"
            y1="110"
            x2="230"
            y2="170"
            style="stroke: black; fill: none; stroke-width: 2px"
          />
          <line
            v-if="strikes > 7"
            x1="230"
            y1="140"
            x2="250"
            y2="120"
            style="stroke: black; fill: none; stroke-width: 2px"
          />
          <line
            v-if="strikes > 8"
            x1="230"
            y1="140"
            x2="210"
            y2="120"
            style="stroke: black; fill: none; stroke-width: 2px"
          />
          <line
            v-if="strikes > 9"
            x1="230"
            y1="170"
            x2="250"
            y2="200"
            style="stroke: black; fill: none; stroke-width: 2px"
          />
          <line
            v-if="strikes > 10"
            x1="230"
            y1="170"
            x2="210"
            y2="200"
            style="stroke: black; fill: none; stroke-width: 2px"
          />
        </svg>
      </div>

      <!-- letters undescore -->
      <div class="mt-2 pb-2">
        <div
          class="letter"
          v-for="(letter, index) in wordDisplayLetters"
          v-bind:key="index"
        >
          {{ letter }}
        </div>
      </div>
      <template v-if="initialized">
        <div>
          <div
            @click="tryLetter(letter)"
            class="possibleLetter"
            :class="getStrikethroughClass(letter)"
            v-for="(letter, index) in possibleLetters1"
            v-bind:key="index"
          >
            {{ letter }}
          </div>
        </div>
        <div>
          <div
            @click="tryLetter(letter)"
            class="possibleLetter"
            :class="getStrikethroughClass(letter)"
            v-for="(letter, index) in possibleLetters2"
            v-bind:key="index"
          >
            {{ letter }}
          </div>
        </div>
        <div>
          <div
            @click="tryLetter(letter)"
            class="possibleLetter"
            :class="getStrikethroughClass(letter)"
            v-for="(letter, index) in possibleLetters3"
            v-bind:key="index"
          >
            {{ letter }}
          </div>
        </div>
      </template>

      <div v-if="!isLoggedIn() && !start" class="flex flex-col m-auto pt-4">
        <label
          for="questions"
          class="block mb-3 text-sm font-medium text-gray-900"
          >Name</label
        >
        <input
          aria-label="Player name"
          @change="(event) => (playerName = event.target.value)"
          type="text"
          id="name"
          class="mx-auto bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <button
        type="button"
        class="btn m-2 mx-auto"
        @click="initialize()"
        aria-label="newGame"
        style="display: inline-block"
      >
        New Game
      </button>
    </div>
  </div>
</template>

<script scoped>
import NavBar from "./NavBar.vue";
import Const from "../router/utils";

export default {
  name: "hangman",
  data: function () {
    return {
      start: false,
      playerName: "",
      token: "",
      totalPoints: 0,
      timer: 0,
      strikes: 0,
      word: "HANGMAN",
      wordLetters: ["H", "A", "N", "G", "M", "A", "N"],
      wordDisplayLetters: ["H", "A", "N", "G", "M", "A", "N"],
      usedLetters: [],
      possibleLetters1: ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
      possibleLetters2: ["J", "K", "L", "M", "N", "O", "P", "Q", "R", "S"],
      possibleLetters3: ["T", "U", "V", "W", "X", "Y", "Z"],
      initialized: false,
      wordBank: [
        "CANARY",
        "ZEBRA",
        "ELEPHANT",
        "DOGS",
        "CAT",
        "LION",
        "GIRAFFE",
        "ZOO",
        "PUPPY",
        "PETS",
        "COBRA",
        "PYTHON",
        "MONKEY",
        "SQUIRREL",
        "ARMADILLO",
        "LADYBUG",
        "PIG",
        "TURTLES",
        "BUFFALO",
        "TAPIR",
        "PENGUINS",
        "IGUANA",
        "ANTILOPE",
        "BLOBFISH",
        "MOUSES",
        "EAGLE",
        "SHARK",
        "SALAMANDER",
        "FOX",
        "RHINOCEROS",
        "OWL",
        "ORNITHORYNQUE",
        "CHIMPANZEE",
        "SEAL",
        "PARROT",
        "JAGUAR",
        "MAMMOTH",
        "PHACOCHERE",
        "CAMELS",
      ],
      gameOver: false,
      win: false,
      taken: 0,
      end: false,
    };
  },
  methods: {
    initialize() {
      this.totalPoints = 0;
      this.initialized = true;
      this.strikes = 0;
      this.word = this.getRandomWord();
      // console.log(this.word); //debug purpos, uncomment on needs
      this.wordLetters = this.word.split("");
      this.wordDisplayLetters = Array(this.word.length);
      this.usedLetters = [];
      this.taken = 0;
      this.end = false;
      this.gameOver = false;
      this.win = false;
      this.start = true;
      let time = new Date();
      this.timer = time.getTime();
    },
    getRandomWord() {
      let index = Math.random() * (this.wordBank.length - 0);
      index = Math.floor(index);

      let word = this.wordBank[index];
      this.wordBank.splice(index, 1); // remove the word so it won't be repeated

      return word;
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
    tryLetter(letter) {
      if (this.usedLetters.includes(letter)) {
        return;
      }

      this.usedLetters.push(letter);
      let match = false;
      for (let i = 0; i < this.wordDisplayLetters.length; i++) {
        if (letter === this.wordLetters[i]) {
          this.wordDisplayLetters.splice(i, 1, letter);
          this.taken += 1;
          match = true;
        }
      }

      if (!match) {
        this.strikes++;
        if (this.strikes == 11) {
          this.gameOver = true;
          this.wait(1000);
          this.end = true;
        }
      } else {
        if (this.taken == this.wordLetters.length) {
          this.win = true;
          // word points
          this.totalPoints += Math.round(this.word.length * 100);
          // console.log(this.totalPoints)
          // time points
          let now = new Date();
          this.totalPoints += Math.round(
            10000000 / (now.getTime() - this.timer)
          );
          this.wait(1000);
          this.end = true;
          this.sendResult();
        }
      }
    },
    getStrikethroughClass(letter) {
      if (this.usedLetters.includes(letter)) {
        return "diagonal-strike";
      }
      return null;
    },

    games() {
      this.$router.push("/");
    },

    wait(ms) {
      setTimeout(() => {
        console.log("timeout finished!");
      }, ms);
    },

    sendResult() {
      if (this.totalPoints > 0) {
        fetch(Const.BEURL + "/api/leaderboard/hangman/add", {
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
      }
    },
  },
};
</script>

<style scoped>
#hangman {
  text-align: center;
}

.letter {
  display: inline-block;
  border-bottom: 1px solid;
  margin: 0px 3px 0px 3px;
  font-size: 30px;
  min-width: 30px;
  vertical-align: bottom;
}

.possibleLetter {
  display: inline-block;
  margin: 10px 3px 0px 3px;
  font-size: 30px;
  min-width: 30px;
  cursor: pointer;
}

.diagonal-strike {
  background: linear-gradient(
    to left top,
    transparent 47.75%,
    currentColor 49.5%,
    currentColor 50.5%,
    transparent 52.25%
  );
  color: dimgrey;
}

button {
  margin-top: 20px;
  padding: 6px 12px;
  border-radius: 2rem;
  cursor: pointer;
  font-size: 15px;
}

button:hover {
  background-color: #e6e6e6;
  border-color: #adadad;
}

.popup {
  position: fixed;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: center;
}

.popup-inner {
  background: #e6e6e6;
  border-radius: 2rem;
}
</style>
