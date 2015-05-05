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
		'assets/css/entypo.css',
		'assets/swiper/css/swiper.min.css',
    'https://api.tiles.mapbox.com/mapbox.js/v2.1.8/mapbox.css',
		'https://api.tiles.mapbox.com/mapbox.js/plugins/leaflet-markercluster/v0.4.0/MarkerCluster.css',
		'https://api.tiles.mapbox.com/mapbox.js/plugins/leaflet-markercluster/v0.4.0/MarkerCluster.Default.css',
		'https://api.tiles.mapbox.com/mapbox.js/plugins/leaflet-label/v0.2.1/leaflet.label.css',
		'https://api.tiles.mapbox.com/mapbox.js/plugins/leaflet-locatecontrol/v0.42.0/L.Control.Locate.css',
		'https://api.tiles.mapbox.com/mapbox.js/plugins/mapbox-directions.js/v0.1.0/mapbox.directions.css'
	)) ?>
	<?php echo js(array(
		'assets/js/jquery-1.11.2.min.js',
		'assets/js/jquery-ui.min.js',
		'assets/js/jquery.pep.js',
		'assets/js/script.js',
		'assets/js/jquery.history.js',
    '//cdnjs.cloudflare.com/ajax/libs/modernizr/2.6.2/modernizr.min.js',
		'//f.vimeocdn.com/js/froogaloop2.min.js',
		'assets/swiper/js/swiper.jquery.min.js',
    'https://api.tiles.mapbox.com/mapbox.js/v2.1.8/mapbox.js',
		'https://api.tiles.mapbox.com/mapbox.js/plugins/leaflet-markercluster/v0.4.0/leaflet.markercluster.js',
		'https://api.tiles.mapbox.com/mapbox.js/plugins/leaflet-label/v0.2.1/leaflet.label.js',
		'//rawgithub.com/domoritz/leaflet-locatecontrol/gh-pages/dist/L.Control.Locate.min.js',
		'https://api.tiles.mapbox.com/mapbox.js/plugins/mapbox-directions.js/v0.1.0/mapbox.directions.js'
	)) ?>


</head>
