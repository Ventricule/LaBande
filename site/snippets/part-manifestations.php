<?php 
$manifestations = array();
if ($entry->intendedTemplate() == 'parcours'):
	if ((string)$entry->manifestations()) :
		$manifestations = yaml($entry->manifestations());
		$manifestationsOrdered = [];
		foreach($manifestations as $manifestation):
			$manifestation = page('manifestations')->children()->find($manifestation['manifestation']);
			$manifestationsOrdered[$manifestation->date('Ymd')."-".$manifestation->time()] = $manifestation;
		endforeach;
		ksort($manifestationsOrdered);
		$manifestations = $manifestationsOrdered;
	endif;
elseif ($entry->intendedTemplate() == 'lieu'):
	$manifestations = page('manifestations')->children()->filterBy('lieu', $entry->uid());
endif;
?>
<?php if (count($manifestations) > 0) : ?>
	<ul class="manifestations-summary">
		<h4>Manifestations</h4>
		<?php	foreach($manifestations as $manifestation):	?>
			<li>
				<p class="synth">
					<span class="date"><?php echo $manifestation->date('d.m.y'); ?></span>
					<span class="titre">&nbsp;&nbsp;&nbsp;<?php echo $manifestation->title(); ?></span>
					<span class="cross"></span>
				</p>
				<div class="full-text">
					<h4><?php echo $manifestation->title(); ?></h4>
					<?php 
					$lieu = $manifestation->lieu();
					if ( (string)$lieu ) {
						$lieu = page('lieux')->children()->find($lieu);
						$lieuName = $lieu->title();
						$adress = $lieu->adress();
					} else {
						$lieuName = $manifestation->locationName();
					}
					?>
					<h5>
						<span class="icon-calendar"><?php echo ucfirst(strftime('%A %d %B %Y', $manifestation->date())) ?></span><br>
						<span class="icon-clock"><?php echo str_replace(':', 'h', $manifestation->time()) ?></span><br>
						<span class="icon-home"><?php echo $lieuName ?></span><br>
						<span class="icon-map"><?php echo $adress ?></span>
					</h5>
					<p class="text"><?php echo $manifestation->text() ?></p>
					
				</div>
			</li>
		<?php	endforeach;	?>
		<li class="past-entries">
			<span class="icon">⤾</span> <span>Manifestations passées</span>
		</li>
	</ul>
<?php endif; ?>