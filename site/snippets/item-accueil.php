
<p><?php echo kirbytext($entry->text())  ?></p>


<h3 class="avenir-title">Événements à venir :</h3>

<ul class="avenir">
	<?php 
	foreach( page('manifestations')->children()->visible()->filterBy('date', '>', time())->sortBy('date', 'asc') as $manifestation): 
		$parcours = $color = '';
		if ( $manifestation->parcours() != '' ) {
			$parcours = yaml($manifestation->parcours());
			foreach($parcours as $thisParcours) {
				$parcours = page('parcours')->children()->find($thisParcours['parcours']);
				$color = $parcours->color();
			}
		}
		date_default_timezone_set('Europe/Paris');
		$m_time = explode(":",$manifestation->time());
		$m_sec = $m_time[0]*60*60+$m_time[1]*60;
		$dateStamp = strftime($manifestation->date())+$m_sec;
		$count = $dateStamp - time(); 

		$min_count = $count / 60; // Minutes restantes
		$hour_count = $min_count / 60; // Heures restantes
		$day_count = $hour_count / 24; // Jours restants

		$min_count = floor($min_count % 60); // Minutes restantes
		$hour_count = floor($hour_count % 24); // Heures restantes
		$day_count = floor($day_count); // Jours restants

		$subj_count = $manifestation->date('z') - date('z'); // perception subjective des jours

		if ( $day_count <= $entry->number()->int()  ): ?>
			<li class='item-avenir'>

				<span class="dateBloc">
					<div class="dateWrap">
					<?php if ($subj_count > 1 ){ 
						echo 'Dans '.$subj_count.' jours'; 
					} elseif ($subj_count == 1){
						if ($m_time[0] >= 18){
							echo 'Demain soir!';
						} elseif ($m_time[0] > 12 && $m_time[0] < 18){
							echo 'Demain!';
						} else {
							echo 'Demain!';
						}
					} else {
						if ($hour_count > 3 && $m_time[0] >= 18){
							echo 'Ce&nbsp;soir!';
						} else {
							if ($hour_count > 1){
								echo 'Dans '.$hour_count.'&nbsp;heures';
							} else {
								echo 'Dans '.$min_count.'&nbsp;minutes';
							}
						} 
					}?>
					</div>
				</span>
				<span class="sideBloc">
					<h4><?php echo html($manifestation->title()) ?></h4>
					<!--<span class="scroll-button"><span class="small-circle" style="background-color:<?php echo $entry->parent()->color(); ?>">⬂</span></span>-->
					<span class="scroll-button" data-uid="<?php echo $manifestation->uid() ?>">Go⤵</span>
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
		<?php endif ?>
	<?php endforeach ?>
</ul>
