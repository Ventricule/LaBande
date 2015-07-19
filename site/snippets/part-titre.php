<div class="entry-title" >
	<h4 class="collapse" >
		<?php 
		$date = (string)$entry->date('d.m.y');
		$begin = (string)$entry->date('d.m.y', 'begin_date');
		$end = (string)$entry->date('d.m.y', 'end_date');
		if ($begin && $end) {
			$date = $begin . ' > ' . $end ;
		} else if ($begin) {
			$date = $begin;
		}
		if ($date) {
			echo "<span class='entry-date icon-calendar icon-medium'>$date</span>";
		}

		$time = str_replace(":","h",$entry->time());
		if ($time) {
			echo " <span class='entry-time icon-clock icon-medium'>$time</span><br>";
		}
		?>
	</h4>
	<h3 class="collapse">
		<a href="<?php echo $entry->url() ?>"><?php echo $entry->title()->html() ?></a>
	</h3>
	<div class="circle icon-right-open-big top-right-button mapLink mapFit mapController" style="color:<?php echo $entry->parent()->color() ?>" data-type="manifestations" data-uid="<?php echo $entry->uid() ?>"></div>
</div>