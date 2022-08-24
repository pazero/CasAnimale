// components API
<script setup>
import { ref } from 'vue'
</script>

<template>
  <div id="main">
    <div class="inner">
      <!-- PageDescription -->

      <section class="tiles">
        <article class="style1">
          <span class="image">
            <img src="images/pic01.jpg" alt="" />
          </span>
          <a href="#">
            <h2>Gioco1</h2>
            <div class="content">
              <p>p visualizzato quando avviene l'hover sulla "casella"</p>
            </div>
          </a>
        </article>
        <article class="style2">
          <span class="image">
            <img src="images/pic02.jpg" alt="" />
          </span>
          <a href="#">
            <h2>Gioco2</h2>
            <div class="content">
              <p>p visualizzato quando avviene l'hover sulla "casella"</p>
            </div>
          </a>
        </article>
        <article class="style3">
          <span class="image">
            <img src="images/pic03.jpg" alt="" />
          </span>
          <a href="#">
            <h2>Gioco3</h2>
            <div class="content">
              <p>p visualizzato quando avviene l'hover sulla "casella"</p>
            </div>
          </a>
        </article>
      </section>
    </div>
  </div>
</template>

<style scoped>
@import '../template/index.css';
</style>
