
<?php snippet('header') ?>
<body>
	<?php snippet('menu') ?>
	<main id="column" class="main" role="main">
		<div class="content">
			<?php snippet('content') ?>
		</div>
		<?php snippet('footer') ?>
		<div class="timeline"></div>
	</main>

	<div id='map'></div>

	<div id='splash'>
		<div id="splashContainer">
			<div id="splashWrapper" class="swiper-wrapper"></div>
			<div class="nav pagination">
				<span class="number">1</span><span class="slash">/</span><span class="total"></span>
			</div>
			<div class="nav icon-left-open-big prev-slide"></div>
			<div class="nav icon-right-open-big next-slide"></div>
		</div>
		<div id="splashCross" class="icon-cancel"></div>
	</div>

<div id='errors'></div>