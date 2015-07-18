
<?php snippet('header') ?>
<body>
	<?php snippet('menu') ?>
	<main id="column" class="main" role="main">
		<div id="searchbox">
			<input class="navbar-search" placeholder="Rechercher"></input>
			<span class="search-compteur hidden"><span class="current"></span> sur <span class="total"></span></span>
			<span class="search-infos hidden"></span>
			<span class="search-nav">
				<a href="#" class="search-prev hidden"><</a>
				<a href="#" class="search-next hidden">></a>
			</span>
		</div>
		<div id="content">
			<?php snippet('content') ?>
		</div>
	</main>

	<div id='map'></div>

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

	<div id="fwButton" class="icon-left-open-big"></div>
	<div id="shade1" class="shadow"></div>
	<div id="shade2" class="shadow"></div>

<div id='errors'></div>