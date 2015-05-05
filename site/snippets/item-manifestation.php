			
<h4 class="collapse" >
	<span class="entry-date icon-calendar icon-medium"><?php echo $entry->date('d.m.y') ?></span> 
	<span class="entry-time icon-clock icon-medium"><?php echo $entry->time() ?></span><br>
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
?>
<h5 class="collapse">
	<?php if($lieuName){ ?><span class="icon-home"><?php echo $lieuName ?></span><br><?php } ?>
	<?php if($adress){ ?><span class="icon-map"><?php echo $adress ?></span><br><?php } ?>
	<?php if($transport){ ?><span class="icon-bus"><?php echo $transport ?></span><br><?php } ?>
	<?php if($price){ ?><span class="icon-ticket"><?php echo $price ?></span><?php } ?>
	<?php if($coordinates){ ?><span class="icon-direction button-gps" data-coordinates="<?php echo $coordinates ?>">GPS</span><?php } ?>
</h5>