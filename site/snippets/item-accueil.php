<header class="header cf" role="banner">
	<img id="logo" src="<?php echo url('assets/images/labande-logo.svg') ?>" alt="<?php echo $site->title()->html() ?>" />
</header>
<p><?php echo $entry->text() ?></p>


<h3 class="avenir-title">Événements à venir :</h3>

<ul class="avenir">
	<?php foreach( page('manifestations')->children()->visible()->filterBy('date', '>', time())->sortBy('date', 'asc')->limit( $entry->number()->int() ) as $manifestation): ?>
		<li class='item-avenir'>
			<span class="dateBloc">
				<div class="dateWrap">
					<div class="day"><?php echo $manifestation->date('d') ?></div>
					<div class="month"><?php echo $manifestation->date('m') ?></div>	
				</div>			
			</span>
			<span class="sideBloc">
				<h4><?php echo html($manifestation->title()) ?></h4>
				
				<?php
					$journum = ucfirst(strftime('%d', $manifestation->date()));
					if ( $journum < 10 ){ 
						$journum = $journum[1];
					};
					if ($journum == 1){
						$journum = "1<sup>er</sup>";
					};
					$date =	ucfirst(strftime('%A '.$journum.' %B %Y', $manifestation->date()));
					$heure = str_replace(":","h",$manifestation->time());
				?>

				<div class="entry-date icon-calendar"><?php echo $date ?></div> 
				<div class="entry-time icon-clock"><?php echo $heure ?></div>


	<!--			<?php if($image = $manifestation->images()->sortBy('sort', 'asc')->first()): ?>
					<figure class="head preview">
						<img src="<?php echo $image->url() ?>" alt="<?php echo $manifestation->title()->html() ?>" >
					</figure>
				<?php endif ?>
	-->
				<?php 
					$lieu = $manifestation->lieu();
					$price = (string)$manifestation->price();
					$lieuName = $adress = $transport = '';
					if ( (string)$lieu ) {
						$lieu = page('lieux')->children()->find($lieu);
						$lieuName = (string)$lieu->title();
						$adress = (string)$lieu->adress();
						$transport = (string)$lieu->transport();
					} else {
						$adress = (string)$manifestation->locationName();
						$transport = (string)$manifestation->transport();
					}
				?>
				<?php if($lieuName){ ?><div class="icon-home"><?php echo $lieuName ?></div><?php } ?>
				<!--	<?php if($adress){ ?><div class="icon-map"><?php echo $adress ?></span><br><?php } ?> -->
				<?php if($transport){ ?><div class="icon-bus"><?php echo $transport ?></div><?php } ?>
				<?php if($price){ ?><div class="icon-ticket"><?php echo $price ?></div><?php } ?>
			</span>
		</li>

	<?php endforeach ?>
</ul>
