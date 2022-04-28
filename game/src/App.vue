<script setup>
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'

function log() {
  console.log("ciao")
}

</script>

<template>
  <h1 v-on:click="log()"> HelloWorld </h1>
</template>

<style>
@import "./index.css"
</style>