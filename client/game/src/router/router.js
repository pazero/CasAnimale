import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";
import QuizItem from "../components/QuizItem.vue";
import HangmanItem from "../components/HangmanItem.vue";
import FunnyVideo from "../components/FunnyVideo.vue";
import Facts from "../components/Facts.vue";
import Memory from "../components/Memory.vue";

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
  ],
});

export default router;
