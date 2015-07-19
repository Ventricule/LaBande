<?php $isArchivable = $entry->parent()->archivable()->bool() ?>
<?php if ($entry->uid() != 'a-propos') : ?>
<div class="entry-title" >
	
	<h3 class="collapse">
		<?php echo $entry->title()->html(); ?>
	</h3>
	
	<h4 class="collapse" >
		<?php
		$last = max((int)$entry->date('Ymd'),(int)$entry->date('Ymd', 'end_date'), (int)$entry->date('Ymd', 'begin_date'));
		$date = (string)$entry->date('d.m.y');
		$begin = (string)$entry->date('d.m.y', 'begin_date');
		$end = (string)$entry->date('d.m.y', 'end_date');
		if ($begin && $end) {
			$date = $begin . ' > ' . $end ;
		} else if ($begin) {
			$date = $begin;
		}
		if ($last<date('Ymd') && $isArchivable) {
			echo " <span class='icon-back-in-time'>Passé</span> ";
		}
		if ($date) {
			echo "<span class='entry-date icon-calendar icon-medium'>$date</span>";
		}

		$time = str_replace(":","h",$entry->time());
		if ($time) {
			echo " <span class='entry-time icon-clock icon-medium'>$time</span>";
		}
		
		?>
	</h4>
	
	<?php if ($entry->parent()->uid() == 'contact' || $entry->parent()->uid() == 'labande' ) { $noMapLink = true ; } ?>
	
	<?php if (! isset($noMapLink)) : ?>
	<div class="circle icon-right-open-big top-right-button mapLink mapFit mapController" style="color:<?php echo $entry->parent()->color() ?>" data-type="manifestations" data-uid="<?php echo $entry->uid() ?>"></div>
	<?php endif ?>
</div>
<?php endif; ?>