<!DOCTYPE html>
<html lang="en">
<head>

  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1.0">

  <title><?php echo $site->title()->html() ?> | <?php echo $page->title()->html() ?></title>
  <meta name="description" content="<?php echo $site->description()->html() ?>">
  <meta name="keywords" content="<?php echo $site->keywords()->html() ?>">

    <script src="//cdnjs.cloudflare.com/ajax/libs/modernizr/2.6.2/modernizr.min.js"></script>

	<?php echo css(array(
		'assets/css/main.css',
		'assets/swiper/css/swiper.min.css'
	)) ?>
	<?php echo js(array(
		'assets/js/jquery-1.11.2.min.js',
		'assets/js/jquery-ui.min.js',
		'assets/js/jquery.pep.js',
		'assets/js/script.js',
		'//f.vimeocdn.com/js/froogaloop2.min.js',
		'assets/swiper/js/swiper.jquery.min.js'
	)) ?>


</head>
