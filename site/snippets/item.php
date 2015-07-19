<?php
$past = '';
	$last = max((int)$entry->date('Ymd'),(int)$entry->date('Ymd', 'end_date'), (int)$entry->date('Ymd', 'begin_date'));
if( $last < date('Ymd') ) {
	$past = 'past';
}

	?>
<li id="<?php echo $entry->hash() ?>" data-uid="<?php echo $entry->uid() ?>" data-parent-uid="<?php echo $entry->parent()->uid() ?>" class="item <?php echo $past; ?>" style="background-color:<?php echo $entry->parent()->color() ?>">

	<?php snippet('part-slider', array('entry'=>$entry)) ?>

	<?php snippet('part-titre', array('entry'=>$entry)) ?>

	<div class="entry-content">
		<?php
		if ($entry->intendedTemplate() == 'accueil'): 
			snippet('item-accueil', array('entry' => $entry));
		elseif ($entry->intendedTemplate() == 'lieu'): 
			snippet('item-lieu', array('entry' => $entry));
		elseif ($entry->intendedTemplate() == 'parcours'): 
			snippet('item-parcours', array('entry' => $entry));
		elseif ($entry->intendedTemplate() == 'manifestation'): 
			snippet('item-manifestation', array('entry' => $entry));
		else: 
			snippet('item-default', array('entry' => $entry));
		endif;
		?>
	</div>
</li>