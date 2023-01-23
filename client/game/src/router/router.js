import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";
import QuizItem from "../components/QuizItem.vue";
import HangmanItem from "../components/HangmanItem.vue";
import FunnyVideo from "../components/FunnyVideo.vue";
import Facts from "../components/Facts.vue";
import Memory from "../components/Memory.vue";
import InfoPet from "../components/InfoPet.vue";
import Services from "../components/Services.vue";
import Shop from "../components/Shop.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
    },
    {
      path: "/quiz",
      name: "quiz",
      component: QuizItem,
    },
    {
      path: "/hangman",
      name: "hangman",
      component: HangmanItem,
    },
    {
      path: "/videos",
      name: "video",
      component: FunnyVideo,
    },
    {
      path: "/facts",
      name: "facts",
      component: Facts,
    },
    {
      path: "/memory",
      name: "memory",
      component: Memory,
    },
    {
      path: "/infopet",
      name: "infopet",
      component: InfoPet,
    },
    {
      path: "/services",
      name: "services",
      component: Services,
    },
    {
      path: "/shop",
      name: "shop",
      component: Shop,
    },
  ],
});

export default router;
