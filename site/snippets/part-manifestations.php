<?php 
$manifestations = array();
if ($entry->intendedTemplate() == 'parcours'):
	$manifestations = page('manifestations')->children()->filter(function($child) use ($entry) {
		$lookFor = $entry->uid();
		$lookAt = yaml($child->parcours());
		$parcoursList = array();
		foreach($lookAt as $parcours) {
			$parcoursList[] = $parcours['parcours'];
		}
		return in_array($lookFor,$parcoursList);
	});
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
					};
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
					<h5>
						<span class="icon-calendar"><?php echo $date ?></span><br>
						<span class="icon-clock"><?php echo $heure ?></span><br>
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