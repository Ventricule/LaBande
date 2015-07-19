<li class="item section-footer" style="background:<?php echo $section->color() ?>" data-uid="footer-<?php echo $section->uid() ?>" data-parent-uid="<?php echo $section->uid() ?>">
  <h3 class="load-archives" data-parent-uid="<?php echo $section ?>"><span class="icon-back-in-time"></span></h3>
		<h2 class="text hidden">Archives</h2>
		<h3 class="text hidden"><?php echo $section->title() ?></h3>
</li>

<?php
	
$items = $section->children()->visible()->filter(function($entry) {
	$last = max((int)$entry->date('Ymd'),(int)$entry->date('Ymd', 'end_date'), (int)$entry->date('Ymd', 'begin_date'));
	return $last < date('Ymd');
});

foreach( $items as $entry ) :
?>
	<li class='archive-title hidden' style="background-color:<?php echo $entry->parent()->color() ?>" data-uid="<?php echo $entry->uid() ?>" data-parent-uid="<?php echo $entry->parent()->uid() ?>" data-uri='<?php echo $entry->uri() ?>'>

			<?php snippet('part-titre', array('entry'=>$entry, 'noMapLink'=>true)); ?>

	</li>

<?php
endforeach;
?>

</li>