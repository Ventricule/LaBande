<h4 class="collapse" >
	<span class="entry-date icon-calendar icon-medium"><?php echo $entry->date('d.m.y') ?></span> 
	<span class="entry-time icon-clock icon-medium"><?php echo str_replace(":","h",$entry->time()) ?></span><br>
</h4>
<h3 class="collapse">
	<a href="<?php echo $entry->url() ?>"><?php echo $entry->title()->html() ?></a>
</h3>

<p><?php echo $entry->text() ?></p>

<?php 
$lieu = $entry->lieu();
$price = (string)$entry->price();
$lieuName = $adress = $transport = '';
if ( (string)$lieu ) {
	$lieu = page('lieux')->children()->find($lieu);
	$lieuName = (string)$lieu->title();
	$adress = (string)$lieu->adress();
	$transport = (string)$lieu->transport();
	$coordinates = (string)$lieu->location();
} else {
	$adress = (string)$entry->locationName();
	$transport = (string)$entry->transport();
	$coordinates = (string)$entry->location();
}
$parcours = $color = '';
if ( $entry->parcours() != '' ) {
	$parcours = yaml($entry->parcours());
	foreach($parcours as $thisParcours) {
		$parcours = page('parcours')->children()->find($thisParcours['parcours']);
		$color = $parcours->color();
	}
}
//
?>
<!--
<?php if($parcours){ 
	$parc = $entry->parcours()->split(':'); ?>
	<div class="parcours-meta">
		<span class="small-circle mapLink mapFit mapController" style="background-color:<?php echo $color; ?>" data-type="manifestations" data-uid="<?php echo $entry->uid() ?>"></span>
		<span class="parcours-name">Dans le cadre de <?php echo $parc[1]; ?></span>
	</div>
<?php } ?> -->
<div class="circle icon-right-open-big top-right-button mapLink mapFit mapController" style="background-color:<?php echo $color; ?>" data-type="manifestations" data-uid="<?php echo $entry->uid() ?>"></div>

<h5 class="collapse">
	<?php if($lieuName){ ?><span class="icon-home"><?php echo $lieuName ?></span><br><?php } ?>
	<?php if($adress){ ?><span class="icon-map"><?php echo $adress ?></span><br><?php } ?>
	<?php if($transport){ ?><span class="icon-bus"><?php echo $transport ?></span><br><?php } ?>
	<?php if($price){ ?><span class="icon-ticket"><?php echo $price ?></span><?php } ?>
</h5>

<div class="bottom-buttons-bar">
	<?php if($coordinates){ ?>
		<div class="circle mapLink mapGPS mapController" data-coordinates="<?php echo $coordinates ?>" data-manifestation="<?php echo $entry->uid() ?>">GPS</div>
	<?php } ?>
	<div class="circle icon-share"></div>
</div>
