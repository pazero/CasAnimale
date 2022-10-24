
<script setup>
import NavBar from "../components/NavBar.vue";
console.log("Ciao dalla console!");

const games = [
  {
    id: 1,
    name: 'Quiz about animals',
    href: 'quiz',
    imageSrc: 'quiz.png',
    imageAlt: 'quiz word icon',
  },
  {
    id: 2,
    name: 'Hangman',
    href: '#',
    imageSrc: 'hangman.png',
    imageAlt: 'hangman game icon',
  },
  /*{
    id: 3,
    name: 'Game3',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg',
    imageAlt: 'img alt.',
  },*/
]
</script>

<template>
  <div>
    <NavBar/>

    <div data-theme="lemonade" class="bg-white">
    <div class="mx-auto max-w-2xl py-4 px-4 sm:py-8 sm:px-6 lg:max-w-7xl lg:px-8">
      <div class="py-4 pl-3 font-semibold normal-case text-xl">GAMES</div>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <a v-for="game in games" :key="game.id" :href="game.href" class="card">
            <div class="card-body bg-gray-100" style="padding:2rem; margin:1rem;">
              <p class="card-title hidden" >{{ game.name }}</p>
              <img :src="game.imageSrc" :alt="game.imageAlt" class=" h-full w-full object-cover object-center group-hover:opacity-75" />
            </div>
        </a>
      </div>
    </div>
  </div>
  </div>
</template>

<style scoped>
</style>


<!--
  - applicazione a se stante
  - scopo: presentare l'azienda
  - offre momenti di svago e istruzione ai proprietari degli animali
  - deve invogliare ad usare i servizi a pagamento!

  TODO LIST:
  
  -  NO autenticazione obbligatoria

  - permettere all'utente di descrivere i propri pet con specie, nome, sesso, età, eventuali condizioni mediche. Non solo cani e gatti!

  - ampia disponibilità di semplici giochi a tema animale

  - pagine informative e di curiosità specifiche sugli animali dell'utente (API REST)

  - pagine di visualizzazione dei prodotti di e-commerce acquistabili
  
  - pagine di visualizzazione dei servizi commerciali offerti da CasAnimale

  - permette di passare velocemente all'app front-office per accedere ai servizi e all'e-commerce
-->