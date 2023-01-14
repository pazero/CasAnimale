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
    bg: "bg-gray-100",
  },
  {
    id: 2,
    name: "Offered services",
    href: "services",
    imageSrc: "services.png",
    imageAlt: "handshake img",
    bg: "bg-blue-100",
  },
  {
    id: 3,
    name: "Hangman",
    href: "hangman",
    imageSrc: "hangman.png",
    imageAlt: "hangman game icon",
    bg: "bg-gray-100",
  },
  {
    id: 4,
    name: "Interesting Facts",
    href: "facts",
    imageSrc: "interest.png",
    imageAlt: "interesting facts img",
    bg: "bg-gray-100",
  },
  {
    id: 5,
    name: "Create your account",
    href: "http://localhost:3000/register",
    imageSrc: "register.png",
    imageAlt: "new user img",
    bg: "bg-blue-100",
  },

  {
    id: 6,
    name: "Memory",
    href: "memory",
    imageSrc: "memory.png",
    imageAlt: "memory img",
    bg: "bg-gray-100",
  },
  {
    id: 7,
    name: "Info pet",
    href: "infopet",
    imageSrc: "infopet.png",
    imageAlt: "infopet img",
    bg: "bg-gray-100",
  },
  {
    id: 8,
    name: "e-commerce",
    href: "http://localhost:3000/compra",
    imageSrc: "shop.png",
    imageAlt: "ecommerce img",
    bg: "bg-blue-100",
  },
  {
    id: 9,
    name: "Funny Videos",
    href: "videos",
    imageSrc: "funny.png",
    imageAlt: "funny video img",
    bg: "bg-gray-100",
  },
  {
    id: 10,
    name: "Shop showcase",
    href: "shop",
    //todo: cambia
    imageSrc: "products.png",
    imageAlt: "shop showcase img",
    bg: "bg-gray-100",
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
  },
];
</script>

<template>
  <div
    class="flex xl:flex-row flex-col"
    style="flex: 1 1 auto"
    data-theme="lemonade"
  >
    <!-- adv left -->
    <div
      class="hidden xl:flex xl:flex-col xl:h-full xl:w-20 flex-row text-gray-600 font-semibold bg-[url(bgGame.jpg)] bg-right-top"
      style="flex: 1 1 auto; min-width: 10rem"
    >
      <a
        :key="advs[left].name1"
        :href="advs[left].href"
        class="flex p-1 px-5 self-center justify-center mt-20 mx-1 text-md leading-relaxed text-center bg-blue-100 hover:bg-gray-700 hover:text-white"
        style="border-radius: 0; flex: 0 1 auto"
        :aria-current="undefined"
      >
        {{ advs[left].name1 }}<br />{{ advs[left].name2 }}
      </a>
    </div>

    <!-- GAMES -->
    <div
      class="mx-auto max-w-2xl py-4 px-4 sm:py-8 sm:px-6 xl:max-w-7xl xl:px-8"
    >
      <div
        class="flex justify-center font-semibold normal-case text-6xl md:text-7xl xl:text-8xl md:pb-4"
        style="flex: 0 1 auto"
      >
        GAMES
      </div>

      <div class="grid grid-cols-2 xl:grid-cols-3">
        <a v-for="game in games" :key="game.id" :href="game.href" class="card">
          <div
            :class="[game.bg, 'card-body']"
            class="hover:animate-pulse"
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
    <div
      class="flex justify-center xl:justify-start xl:flex-col xl:h-full xl:w-20 flex-row font-semibold text-gray-600 bg-[url(bgGame.jpg)] bg-left-top"
      style="flex: 1 1 auto; min-width: 10rem"
    >
      <a
        :key="advs[right].name1"
        :href="advs[right].href"
        class="flex p-1 px-5 self-center justify-center xl:mt-20 xl:mx-1 text-md leading-relaxed text-center bg-blue-100 hover:bg-gray-700 hover:text-white my-20"
        style="border-radius: 0; flex: 0 1 auto"
        :aria-current="undefined"
      >
        {{ advs[right].name1 }}<br />{{ advs[right].name2 }}
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
