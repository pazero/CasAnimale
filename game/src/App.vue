<script setup>
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'

function log() {
  console.log("ciao")
}

</script>

<template>

<!DOCTYPE html>

<html>
	<head>
		<title>CasAnimale</title>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
		<link rel="stylesheet" href="./index.css" />
		<!-- <noscript><link rel="stylesheet" href="css/noscript.css" /></noscript> -->
	</head>
	<body class="is-preload">
		<!-- Wrapper -->
			<div id="wrapper">

				<!-- Header -->
					<header id="header">
						<div class="inner">

							<!-- Logo -->
								<a href="index.html" class="logo">
									<span class="symbol"><img src="images/logo.svg" alt="" /></span><span class="title">Phantom</span>
								</a>

							<!-- Nav -->
								<nav>
									<ul>
										<li><a href="#menu">Menu</a></li>
									</ul>
								</nav>

						</div>
					</header>

				<!-- Menu -->
					<nav id="menu">
						<h2>Menu</h2>
						<ul>
							<li><a href="index.html">Home</a></li>
							<li><a href="#">Ipsum veroeros</a></li>
							<li><a href="#">Tempus etiam</a></li>
							<li><a href="#">Consequat dolor</a></li>
							<li><a href="#">Elements</a></li>
						</ul>
					</nav>

				<!-- Main -->
					<div id="main">
						<div class="inner">
							<header>
								<h1>h1 ... </h1>
								<p>p ...</p>
							</header>
							<!-- caselle di gioco -->
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
								<article class="style4">
									<span class="image">
										<img src="images/pic04.jpg" alt="" />
									</span>
									<a href="#">
										<h2>Gioco4</h2>
										<div class="content">
											<p>p visualizzato quando avviene l'hover sulla "casella"</p>
										</div>
									</a>
								</article>
								<article class="style5">
									<span class="image">
										<img src="images/pic05.jpg" alt="" />
									</span>
									<a href="#">
										<h2>Gioco5</h2>
										<div class="content">
											<p>p visualizzato quando avviene l'hover sulla "casella"</p>
										</div>
									</a>
								</article>
								<article class="style6">
									<span class="image">
										<img src="images/pic06.jpg" alt="" />
									</span>
									<a href="#">
										<h2>Gioco6</h2>
										<div class="content">
											<p>Sed nisl arcu euismod sit amet nisi lorem etiam dolor veroeros et feugiat.</p>
										</div>
									</a>
								</article>
								<article class="style2">
									<span class="image">
										<img src="images/pic07.jpg" alt="" />
									</span>
									<a href="#">
										<h2>Gioco7</h2>
										<div class="content">
											<p>p visualizzato quando avviene l'hover sulla "casella"</p>
										</div>
									</a>
								</article>
								<article class="style3">
									<span class="image">
										<img src="images/pic08.jpg" alt="" />
									</span>
									<a href="#">
										<h2>Gioco8</h2>
										<div class="content">
											<p>p visualizzato quando avviene l'hover sulla "casella"</p>
										</div>
									</a>
								</article>
								<article class="style1">
									<span class="image">
										<img src="images/pic09.jpg" alt="" />
									</span>
									<a href="#">
										<h2>Gioco9</h2>
										<div class="content">
											<p>p visualizzato quando avviene l'hover sulla "casella"</p>
										</div>
									</a>
								</article>
								<article class="style5">
									<span class="image">
										<img src="images/pic10.jpg" alt="" />
									</span>
									<a href="#">
										<h2>Gioco10</h2>
										<div class="content">
											<p>p visualizzato quando avviene l'hover sulla "casella"</p>
										</div>
									</a>
								</article>
								<article class="style6">
									<span class="image">
										<img src="images/pic11.jpg" alt="" />
									</span>
									<a href="#">
										<h2>Gioco11</h2>
										<div class="content">
											<p>p visualizzato quando avviene l'hover sulla "casella"</p>
										</div>
									</a>
								</article>
								<article class="style4">
									<span class="image">
										<img src="images/pic12.jpg" alt="" />
									</span>
									<a href="#">
										<h2>Gioco12</h2>
										<div class="content">
											<p>p visualizzato quando avviene l'hover sulla "casella"</p>
										</div>
									</a>
								</article>
							</section>
							<!-- caselle di gioco -->
						</div>
					</div>

				<!-- Footer -->
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
									<ul class="actions">
										<li><input type="submit" value="Send" class="primary" /></li>
									</ul>
								</form>
							</section>
							<section>
								<h2>Follow</h2>
								<ul class="icons">
									<li><a href="#" class="icon brands style2 fa-twitter"><span class="label">Twitter</span></a></li>
									<li><a href="#" class="icon brands style2 fa-facebook-f"><span class="label">Facebook</span></a></li>
									<li><a href="#" class="icon brands style2 fa-instagram"><span class="label">Instagram</span></a></li>
									<li><a href="#" class="icon brands style2 fa-dribbble"><span class="label">Dribbble</span></a></li>
									<li><a href="#" class="icon brands style2 fa-github"><span class="label">GitHub</span></a></li>
									<li><a href="#" class="icon brands style2 fa-500px"><span class="label">500px</span></a></li>
									<li><a href="#" class="icon solid style2 fa-phone"><span class="label">Phone</span></a></li>
									<li><a href="#" class="icon solid style2 fa-envelope"><span class="label">Email</span></a></li>
								</ul>
							</section>
							<ul class="copyright">
								<li>&copy; Untitled. All rights reserved</li><li>Design: <a href="#">HTML5 UP</a></li>
							</ul>
						</div>
					</footer>

			</div>

		<!-- Scripts -->
			<script src="src/js/jquery.min.js"></script>
			<script src="src/js/browser.min.js"></script>
			<script src="src/js/breakpoints.min.js"></script>
			<script src="src/js/util.js"></script>
			<script src="src/js/main.js"></script>

	</body>
</html>

</template>

<style>
@import "./index.css"
</style>