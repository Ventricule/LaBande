
<?php snippet('header') ?>
<body>
	<?php snippet('menu') ?>
	<main class="main" role="main">
		<div class="content">
			<div class="text">
				<h1><?php echo $page->title()->html() ?></h1>
				<?php echo $page->text()->kirbytext() ?>
			</div>
		</div>
		<div class="content">
			<?php snippet('manifestations') ?>
		</div>
	<?php snippet('footer') ?>
	<div class="timeline"></div>

	</main>
	
  <div id='map'></div>