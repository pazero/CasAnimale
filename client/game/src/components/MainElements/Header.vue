// components API
<script setup>
import { ref } from 'vue'
</script>

<template>
  <header id="header">
    <div class="inner">
      <!-- Logo -->
      <a href="index.html" class="logo">
        <span class="symbol"><img src="images/logo.svg" alt="" /></span><span class="title">CasAnimale</span>
      </a>

      <!-- Nav -->
      <nav>
        <ul>
          <li><a href="#menu"></a></li>
          <!-- navbar chiusa: tre righe -->
        </ul>
      </nav>

      <nav id="menu">
        <!-- navbar aperta: lista -->
        <h2>Menu</h2>
        <ul>
          <li><a href="index.html">Home</a></li>
          <li><a href="#">Ipsum veroeros</a></li>
          <li><a href="#">Tempus etiam</a></li>
          <li><a href="#">Consequat dolor</a></li>
          <li><a href="#">Elements</a></li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style scoped>
@import '../template/index.css';
</style>
