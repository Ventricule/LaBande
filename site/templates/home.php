
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

	<div id='map'>
    <nav class='menu-ui'>
      <a href='#' id='autoFit' class='active'>Auto Fit</a>
    </nav>
  </div>

	<div id='splash'>
		<div id="splashContainer">
			<div id="splashWrapper" class="swiper-wrapper"></div>
			<div class="nav pagination">
				<span class="number">1</span><span class="slash">/</span><span class="total"></span>
			</div>
			<div class="nav nomobile prev-slide"><div class="icon-left-open-big"></div></div>
			<div class="nav nomobile next-slide"><div class="icon-right-open-big"></div></div>
		</div>
		<div id="splashCross" class="icon-cancel-circled"></div>
	</div>

<div id='errors'></div>