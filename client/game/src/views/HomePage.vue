<script setup>
import { onMounted } from "@vue/runtime-core";

const left = Math.floor(Math.random() * 5);
const right = Math.floor(Math.random() * 5);

const games = [
  {
    id: 1,
    name: "Quiz about animals",
    href: "quiz",
    imageSrc: "quiz.png",
    imageAlt: "quiz word icon",
  },
  {
    id: 2,
    name: "Hangman",
    href: "hangman",
    imageSrc: "hangman.png",
    imageAlt: "hangman game icon",
  },
  {
    id: 3,
    name: "Funny Videos",
    href: "videos",
    imageSrc: "https://pixy.org/src/80/806433.jpg",
    imageAlt: "funny video img",
  },
  {
    id: 4,
    name: "Interesting Facts",
    href: "facts",
    imageSrc: "https://cdn-icons-png.flaticon.com/512/5361/5361003.png",
    imageAlt: "interesting facts img",
  },
  {
    id: 5,
    name: "Memory",
    href: "memory",
    imageSrc:
      "https://image.api.playstation.com/vulcan/ap/rnd/202007/0210/1hTcaL0ZROBNuObezTudW9xx.png",
    imageAlt: "memory img",
  },
];

const advs = [
  {
    name1: "BUY SOME SUPPLIES",
    name2: "FOR YOUR PETS HERE!",
    href: "http://localhost:3000/compra",
    bg: "bg-red-100",
    current: false,
  },
  {
    name1: "PLAY WITH US,",
    name2: "A QUIZ IS WAITING FOR YOU!",
    href: "http://localhost:5173/quiz",
    bg: "bg-green-100",
    current: false,
  },
  {
    name1: "PLAY A HANGMAN",
    name2: "MATCH HERE!",
    href: "http://localhost:5173/hangman",
    bg: "bg-indigo-100",
    current: false,
  },
  {
    name1: "READ SOME USER'S",
    name2: "POSTS HERE",
    href: "http://localhost:3000/forum",
    bg: "bg-yellow-100",
    current: false,
  },
  {
    name1: "WATCH SOME FUNNY",
    name2: "ANIMALS VIDEO!",
    href: "http://localhost:5173/quiz",
    bg: "bg-blue-100",
    current: false,
  }
];

</script>

<template>
  <div class="flex xl:flex-row xl:h-screen flex-col" style="flex: 1 1 auto" data-theme="lemonade">

    <!-- adv left -->
    <div class="xl:flex xl:flex-col xl:h-full xl:w-20 flex-row text-gray-600 font-semibold hidden hidden" style="flex: 1 1 auto; min-width: 20rem;">
      <a :key="advs[left].name1" :href="advs[left].href"
        :class="[advs[left].bg, 'hover:bg-gray-700 hover:text-white py-8 pb-0 rounded-md text-md leading-relaxed text-center']"
        :style="[advs[left].height, 'border-radius:0', 'flex-grow:1']"
        :aria-current="undefined">
        {{ advs[left].name1 }}<br>{{ advs[left].name2 }}
      </a>
    </div>

    <!-- GAMES -->
    <div class="mx-auto max-w-2xl py-4 px-4 sm:py-8 sm:px-6 xl:max-w-7xl xl:px-8">
      <div class="py-4 pl-3 font-semibold normal-case text-xl">GAMES</div>

      <div class="grid grid-cols-3">
        <a v-for="game in games" :key="game.id" :href="game.href" class="card">
          <div
            class="card-body bg-gray-100"
            style="padding: 2rem; margin: 1rem"
          >
            <p class="card-title hidden">{{ game.name }}</p>
            <img
              :src="game.imageSrc"
              :alt="game.imageAlt"
              class="h-full w-full object-cover object-center group-hover:opacity-75"
            />
          </div>
        </a>
      </div>
    </div>

    <!-- adv right -->
    <div class="flex xl:flex-col xl:h-full xl:w-20 flex-row font-semibold text-gray-600 " style="flex: 1 1 auto; min-width: 20rem;" >
      <a :key="advs[right].name1" :href="advs[right].href"
        :class="[advs[right].bg, 'hover:bg-gray-700 hover:text-white py-8 pb-0 rounded-md text-md leading-relaxed text-center']"
        :style="[advs[right].height, 'border-radius:0', 'flex-grow:1']"
        :aria-current="undefined">
        {{ advs[right].name1 }}<br>{{ advs[right].name2 }}
      </a>
    </div>
  </div>
</template>

<!--
  - applicazione a se stante
  - scopo: presentare l'azienda
  - offre momenti di svago e istruzione ai proprietari degli animali
  - deve invogliare ad usare i servizi a pagamento!

  TODO LIST:
  
  - NO autenticazione obbligatoria

  - permettere all'utente di descrivere i propri pet con specie, nome, sesso, età, eventuali condizioni mediche. Non solo cani e gatti!

  - ampia disponibilità di semplici giochi a tema animale

  - pagine informative e di curiosità specifiche sugli animali dell'utente (API REST)

  - pagine di visualizzazione dei prodotti di e-commerce acquistabili
  
  - pagine di visualizzazione dei servizi commerciali offerti da CasAnimale

  - permette di passare velocemente all'app front-office per accedere ai servizi e all'e-commerce
-->
