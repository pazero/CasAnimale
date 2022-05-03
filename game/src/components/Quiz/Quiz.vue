<template class="antialiased text-gray-700 bg-gray-100">
  <div>
    <div v-if="!fetchDone">
      <button
        v-if="!fetchDone"
        type="button"
        id="get-quiz"
        @click="getQuestion"
        class="getQuizButton"
      >
        Get some questions!
      </button>
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
            <p class="text-2xl font-bold">{{ questions[idx]["question"] }}</p>
            <label
              v-for="(answer, index) in questions[idx].answers"
              :key="index"
              :for="index"
              class="block mt-4 border border-gray-300 rounded-lg py-2 px-6 text-lg"
              :class="
                ({ 'hover:bg-gray-100 cursor-pointer': selectedAnswer == '' },
                {
                  'bg-green-200':
                    index == questions[idx].correctAnswer &&
                    selectedAnswer != '',
                },
                { 'bg-red-200': selectedAnswer == index })
              "
            >
              <input
                :id="index"
                type="radio"
                class="hidden"
                :value="index"
                @change="answered($event)"
                :disabled="selectedAnswer != ''"
              />
              {{ answer }}
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
            <h2 class="text-bold text-3xl">Results</h2>
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
export default {
  data() {
    return {
      fetchDone: false,
      idx: 0,
      selectedAnswer: "",
      correctAnswers: 0,
      wrongAnswers: 0,
      count: 5,
      difficulty: "easy",
      questions: [
        {
          question: "",
          answers: { a: "", b: "", c: "", d: "" },
          correctAnswer: "",
        },
        {
          question: "",
          answers: { a: "", b: "", c: "", d: "" },
          correctAnswer: "",
        },
        {
          question: "",
          answers: { a: "", b: "", c: "", d: "" },
          correctAnswer: "",
        },
        {
          question: "",
          answers: { a: "", b: "", c: "", d: "" },
          correctAnswer: "",
        },
        {
          question: "",
          answers: { a: "", b: "", c: "", d: "" },
          correctAnswer: "",
        },
      ],
    };
  },
  methods: {
    async getQuestion() {
      // get questions for quiz
      await fetch(
        "https://opentdb.com/api.php?amount=" +
          this.count +
          "&category=27&type=multiple&difficulty=" +
          this.difficulty
      )
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
          //adjust every question
          for (let i = 0; i < this.count; i++) {
            let q = response.results[i];
            this.questions[i].question = q.question; // set questions
            switch (Math.floor(Math.random() * 4)) {
              case 0:
                this.questions[i].answers.a = q.correct_answer;
                this.questions[i].answers.b = q.incorrect_answers.shift();
                this.questions[i].answers.c = q.incorrect_answers.shift();
                this.questions[i].answers.d = q.incorrect_answers.shift();
                this.questions[i].correctAnswer = "a";
                break;
              case 1:
                this.questions[i].answers.a = q.incorrect_answers.shift();
                this.questions[i].answers.b = q.correct_answer;
                this.questions[i].answers.c = q.incorrect_answers.shift();
                this.questions[i].answers.d = q.incorrect_answers.shift();
                this.questions[i].correctAnswer = "b";
                break;
              case 2:
                this.questions[i].answers.a = q.incorrect_answers.shift();
                this.questions[i].answers.b = q.incorrect_answers.shift();
                this.questions[i].answers.c = q.correct_answer;
                this.questions[i].answers.d = q.incorrect_answers.shift();
                this.questions[i].correctAnswer = "c";
                break;
              case 3:
                this.questions[i].answers.a = q.incorrect_answers.shift();
                this.questions[i].answers.b = q.incorrect_answers.shift();
                this.questions[i].answers.c = q.incorrect_answers.shift();
                this.questions[i].answers.d = q.correct_answer;
                this.questions[i].correctAnswer = "d";
                break;
            }

            console.log(this.questions);
          }
          this.fetchDone = true;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    answered(e) {
      this.selectedAnswer = e.target.value;
      if (this.selectedAnswer == this.questions[this.idx].correctAnswer) {
        this.correctAnswers++;
      } else {
        this.wrongAnswers++;
      }
    },
    nextQuestion() {
      this.idx++;
      this.selectedAnswer = "";
      document.querySelectorAll("input").forEach((el) => (el.checked = false));
    },
    showResults() {
      this.idx++;
    },
    resetQuiz() {
      this.idx = 0;
      this.selectedAnswer = "";
      this.correctAnswers = 0;
      this.wrongAnswers = 0;
      this.questions = [
        {
          question: "",
          answers: { a: "", b: "", c: "", d: "" },
          correctAnswer: "",
        },
        {
          question: "",
          answers: { a: "", b: "", c: "", d: "" },
          correctAnswer: "",
        },
        {
          question: "",
          answers: { a: "", b: "", c: "", d: "" },
          correctAnswer: "",
        },
        {
          question: "",
          answers: { a: "", b: "", c: "", d: "" },
          correctAnswer: "",
        },
        {
          question: "",
          answers: { a: "", b: "", c: "", d: "" },
          correctAnswer: "",
        },
      ];
      this.fetchDone = false;
    },
  },
};
</script>

<style>
@import "./style.css";

.getQuizButton {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  background-color: #4338CA;
  border-radius: 25px;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
}

</style>