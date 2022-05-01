<template>
  <div v-if="fetchDone">
    <div><Question /></div>
  </div>
</template>

<script>
import Question from './Question.vue';

// copy-pasted from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}


export default {
    data: {
      fetchDone = false,
      idx: 0,
      selectedAnswer: "",
      correctAnswers: 0,
      wrongAnswers: 0,
      count: 10,
      difficulty = "easy",
      questions: null
      /*
      formal data format
      question:
        "Rolex is a company that specializes in what type of product?",
      answers: { a: "Bags", b: "Watches", c: "Shoes", d: "Laptops" },
      correctAnswer: "b",
      */
    },
    setup() {
      // get questions for quiz
      fetch("https://opentdb.com/api.php?amount="+this.count+"&category=27&difficulty="+this.difficulty)
        .then(response => { 
            if(response.ok) {
                return response.json()
            } else {
                alert("Server returned " + response.status + " : " + response.statusText);
            }                
        })
        .then(response => {
            this.fetchDone = true;
            for(let i = 0; i < this.count; i++) {
                let tmp = [];
                tmp.answers = [];
                let q = response.result.shift();
                tmp.question = q.question;
                tmp.answers.push(q.correct_answer);
                tmp.answers.push(...q.incorrect_answers);
                tmp.correctAnswers = q.correct_answer;
                shuffle(tmp.answers)
                this.questions[i] = tmp;
            }
      })
        .catch(err => {
            console.log(err);
        });
      
    },
    methods: {
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
      },
    },
};

</script>

<style scoped>
</style>