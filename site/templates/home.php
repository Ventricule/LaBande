
<?php snippet('header') ?>
<body>
	<main class="main" role="main">

	<header class="header cf" role="banner">
		<a class="logo" href="<?php echo url() ?>">
			<h1>La Bande</h1>
		</a>
		<!--<?php snippet('menu') ?>-->
	</header>
		<div class="content">
			<div class="text">
				<h1><?php echo $page->title()->html() ?></h1>
				<?php echo $page->text()->kirbytext() ?>
			</div>
		</div>
		<div class="content">
			<?php snippet('projects') ?>
		</div>
	<?php snippet('footer') ?>
	<div class="timeline"></div>

	</main>

<iframe id="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d20993.92075722715!2d2.406530984484439!3d48.872699369491045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66d0aaf939ccb%3A0xedbd441dc1afe1c7!2sKhiasma!5e0!3m2!1sfr!2sfr!4v1428143410290" frameborder="0" style="border:0"></iframe>