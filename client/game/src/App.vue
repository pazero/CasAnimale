<script setup>
import { RouterView } from "vue-router";
import NavBar from "./components/NavBar.vue";
</script>

<template>
  <div class="flex flex-1 flex-auto flex-col h-screen bg-white">
    <NavBar />
    <RouterView />
  </div>
</template>

<style scoped></style>
