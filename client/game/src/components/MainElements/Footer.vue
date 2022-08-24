// components API
<script setup>
import { ref } from 'vue'
</script>

<template>
  <footer id="footer">
    <div class="inner">
      <section>
        <h2>Get in touch</h2>
        <form method="post" action="#">
          <div class="fields">
            <div class="field half">
              <input type="text" name="name" id="name" placeholder="Name" />
            </div>
            <div class="field half">
              <input type="email" name="email" id="email" placeholder="Email" />
            </div>
            <div class="field">
              <textarea name="message" id="message" placeholder="Message"></textarea>
            </div>
          </div>

          <!-- DA INSERIRE LO ShortButton -->
        </form>
      </section>

      <section>
        <h2>Follow Us</h2>
        <ul class="icons">
          <!--<li><a href="#" class="icon brands style2 fa-twitter"><span class="label">Twitter</span></a></li>
					<li><a href="#" class="icon brands style2 fa-facebook-f"><span class="label">Facebook</span></a></li>
					<li><a href="#" class="icon brands style2 fa-instagram"><span class="label">Instagram</span></a></li>
					<li><a href="#" class="icon brands style2 fa-dribbble"><span class="label">Dribbble</span></a></li>-->
          <li>
            <a href="https://github.com/pazero/CasAnimale" class="icon brands style2 fa-github"
              ><span class="label">GitHub</span></a
            >
          </li>
          <!--<li><a href="#" class="icon brands style2 fa-500px"><span class="label">500px</span></a></li>
					<li><a href="#" class="icon solid style2 fa-phone"><span class="label">Phone</span></a></li>
					<li><a href="#" class="icon solid style2 fa-envelope"><span class="label">Email</span></a></li>-->
        </ul>
      </section>

      <ul class="copyright">
        <li>&copy; CasAnimale. All rights reserved</li>
        <li>Design: <a href="#">HTML5 UP</a></li>
      </ul>
    </div>
  </footer>
</template>

<style scoped>
@import '../template/index.css';
</style>
