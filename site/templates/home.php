
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
			<?php snippet('projects') ?>
		</div>
	<?php snippet('footer') ?>
	<div class="timeline"></div>

	</main>
	
<iframe id="map" frameBorder="0" src="https://a.tiles.mapbox.com/v4/pierrepierrepierre.301b5f73.html?access_token=pk.eyJ1IjoicGllcnJlcGllcnJlcGllcnJlIiwiYSI6IkdXdE5CRFEifQ.3zLbKVYfHituW8BVU-bl5g"></iframe>