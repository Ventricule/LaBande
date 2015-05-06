<h3 class="entry-title" ><a href="<?php echo $entry->url() ?>"><?php echo $entry->title()->html() ?></a></h3>

<div class="circle icon-right-open-big top-right-button mapLink mapFit mapController" style="background-color:<?php echo $entry->color() ?>" data-type="parcourd" data-uid="<?php echo $entry->uid() ?>"></div>

<h5>
<?php 
if ((string)$entry->begin_date()):
	echo $entry->date('d.m.y', 'begin_date');
endif;
if ((string)$entry->end_date()):
	echo ' > ' . $entry->date('d.m.y', 'end_date');
endif; ?>
</h5>

<p><?php echo kirbytext($entry->text()) ?></p>

<?php snippet('part-manifestations', array('entry' => $entry)) ?>