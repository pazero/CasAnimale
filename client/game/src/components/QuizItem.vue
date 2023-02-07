<template class="antialiased text-gray-700 bg-gray-100">
  <div class="">
    <div v-if="!fetchDone">
      <div
        class="flex flex-col items-center justify-center h-[calc(100vh-5rem)] m-2"
      >
        <div v-if="!isLoggedIn()">
          <label
            for="questions"
            class="block mb-3 text-sm font-medium text-gray-900"
            >Name</label
          >
          <input
            aria-label="Player name input field"
            @change="(event) => (playerName = event.target.value)"
            type="text"
            id="name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>
        <div>
          <label
            for="questions"
            class="block mt-3 text-sm font-medium text-gray-900"
            >Number of questions</label
          >
          <input
            aria-label="Number of questions input field field"
            @input="(event) => (count = event.target.value)"
            type="number"
            min="1"
            max="20"
            id="question"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="5"
            default="5"
          />
        </div>
        <button
          class="btn btn-primary mt-3"
          v-if="!fetchDone"
          type="button"
          id="get-quiz"
          @click="getQuestion"
        >
          Get some questions!
        </button>
      </div>
    </div>
    <div v-else class="flex w-full h-screen justify-center items-center">
      <div class="w-full max-w-xl p-3">
        <h1 class="font-bold text-5xl text-center text-indigo-700">
          Simple Quiz
        </h1>
        <div
          ref="gameState"
          class="bg-white p-12 rounded-lg shadow-lg w-full mt-8"
        >
          <div v-if="idx < count">
            <p
              class="text-2xl font-bold"
              v-html="questions[idx]['question']"
            ></p>
            <label
              v-for="(answer, index) in questions[idx].answers"
              ref="items"
              :key="index"
              :for="index"
              class="block mt-4 border border-gray-300 rounded-lg py-2 px-6 text-lg"
              :class="{ 'bg-red-200': selectedAnswer == index }"
            >
              <input
                :id="index"
                type="radio"
                class="hidden"
                :value="index"
                @change="answered($event)"
                :disabled="selectedAnswer != ''"
              />
              <span v-html="answer"></span>
            </label>
            <div class="mt-6 flow-root">
              <button
                @click="nextQuestion"
                v-show="selectedAnswer != '' && idx < count - 1"
                class="float-right bg-indigo-600 text-white text-sm font-bold tracking-wide rounded-full px-5 py-2"
              >
                Next &gt;
              </button>
              <button
                @click="showResults"
                v-show="selectedAnswer != '' && idx == count - 1"
                class="float-right bg-indigo-600 text-white text-sm font-bold tracking-wide rounded-full px-5 py-2"
              >
                Finish
              </button>
            </div>
          </div>
          <div v-else>
            <h1 class="text-bold text-3xl">Results</h1>
            <div class="flex justify-start space-x-4 mt-6">
              <p>
                Correct Answers:
                <span class="text-2xl text-green-700 font-bold">{{
                  correctAnswers
                }}</span>
              </p>
              <p>
                Wrong Answers:
                <span class="text-2xl text-red-700 font-bold">{{
                  wrongAnswers
                }}</span>
              </p>
              <p>
                Points:
                <span class="text-2xl text-blue-700 font-bold">{{
                  totalPoints
                }}</span>
              </p>
            </div>
            <div class="mt-6 flow-root">
              <button
                @click="resetQuiz"
                class="float-right bg-indigo-600 text-white text-sm font-bold tracking-wide rounded-full px-5 py-2"
              >
                Play again
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Const from "../router/utils";

export default {
  data() {
    return {
      playerName: "",
      timer: "",
      token: "",
      totalPoints: 0,
      fetchDone: false,
      idx: 0,
      selectedAnswer: "",
      correctAnswers: 0,
      wrongAnswers: 0,
      count: 5,
      difficulty: "easy",
      questions: [],
    };
  },
  methods: {
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
    async getQuestion() {
      // get questions for quiz
      await fetch(
        "https://opentdb.com/api.php?amount=" +
          this.count +
          "&category=27&type=multiple"
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            console.log(
              "Status " + response.status + " : " + response.statusText
            );
          }
        })
        .then((response) => {
          this.resetQuiz();
          //adjust every question
          for (let i = 0; i < this.count; i++) {
            let q = response.results[i];
            this.questions[i].question = q.question; // set questions
            let correctQuestionIndex = Math.floor(Math.random() * 4);

            this.questions[i].correctAnswer = correctQuestionIndex;
            this.questions[i].answers[correctQuestionIndex] = q.correct_answer;
            for (let j = 0; j < 4; j++) {
              if (j != correctQuestionIndex) {
                this.questions[i].answers[j] = q.incorrect_answers.shift();
              }
            }
          }
          this.fetchDone = true;
          let time = new Date();
          this.timer = time.getTime();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    answered(e) {
      this.selectedAnswer = e.target.value;
      this.$refs.items[
        this.questions[this.idx].correctAnswer
      ].style.backgroundColor = "lightgreen";
      if (this.selectedAnswer == this.questions[this.idx].correctAnswer) {
        this.correctAnswers++;
        // calcolo il punteggio
        let time = new Date();
        var time_passed = time.getTime() - this.timer;
        this.totalPoints += Math.round(100000000 / time_passed);
      } else {
        this.wrongAnswers++;
      }
    },
    nextQuestion() {
      let time = new Date();
      this.timer = time.getTime();
      this.$refs.items[
        this.questions[this.idx].correctAnswer
      ].style.backgroundColor = "";
      this.idx++;
      this.selectedAnswer = "";
      document.querySelectorAll("input").forEach((el) => (el.checked = false));
    },
    showResults() {
      this.idx++;
      this.sendResult();
    },
    resetQuiz() {
      this.idx = 0;
      this.selectedAnswer = "";
      this.correctAnswers = 0;
      this.wrongAnswers = 0;
      this.fetchDone = false;
      this.questions = [];
      for (let i = 0; i < this.count; i++) {
        this.questions.push({
          question: "",
          answers: { 0: "", 1: "", 2: "", 3: "" },
          correctAnswer: "",
        });
      }
    },
    sendResult() {
      if (this.totalPoints > 0) {
        fetch(Const.BEURL + "/api/leaderboard/quiz/add", {
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

<style></style>
