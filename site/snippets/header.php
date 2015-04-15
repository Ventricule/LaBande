<!DOCTYPE html>
<html lang="en">
<head>

  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1.0">

  <title><?php echo $site->title()->html() ?> | <?php echo $page->title()->html() ?></title>
  <meta name="description" content="<?php echo $site->description()->html() ?>">
  <meta name="keywords" content="<?php echo $site->keywords()->html() ?>">
  

	<?php echo css(array(
		'assets/css/main.css',
		'assets/swiper/css/swiper.min.css',
    'https://api.tiles.mapbox.com/mapbox.js/v2.1.8/mapbox.css'
	)) ?>
	<?php echo js(array(
		'assets/js/jquery-1.11.2.min.js',
		'assets/js/jquery-ui.min.js',
		'assets/js/jquery.pep.js',
		'assets/js/script.js',
    '//cdnjs.cloudflare.com/ajax/libs/modernizr/2.6.2/modernizr.min.js',
		'//f.vimeocdn.com/js/froogaloop2.min.js',
		'assets/swiper/js/swiper.jquery.min.js',
    'https://api.tiles.mapbox.com/mapbox.js/v2.1.8/mapbox.js'
	)) ?>


</head>
