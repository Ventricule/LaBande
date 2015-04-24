<ul class="rubrique cf">
  <?php foreach($pages->children() as $entry): ?>
  <li>
    <h3 id="<?php echo $entry->hash() ?>" class="item" ><a href="<?php echo $entry->url() ?>"><?php echo $entry->title()->html() ?></a></h3>
    <p><?php echo $entry->text() ?></p>
    <?php if($image = $entry->images()->sortBy('sort', 'asc')->first()): ?>
      <figure>
				<a href="<?php echo $entry->url() ?>">
					<img src="<?php echo $image->url() ?>" alt="<?php echo $entry->title()->html() ?>" >
				</a>
			</figure>
		<?php if ($entry->manifestations()) : ?>
		<h4>Manifestations</h4>
		<?php $manifestations = yaml($entry->manifestations());
		foreach($manifestations as $manifestation):
		$manifestation = page('manifestations')->children()->find($manifestation['manifestation']);
		?>
			<div class="manifestations">
				<p class="synth">
					<span class="date"><?php echo $manifestation->date('d.m.y'); ?></span>
					<span class="time"><?php echo str_replace('h00','h',str_replace(':', 'h', $manifestation->time())); ?></span>
					<span class="titre"><?php echo $manifestation->title(); ?></span>
				</p>
				<div class="full">
					<p class="text"><?php echo $manifestation->text() ?></p>
					<?php 
					$lieu = $manifestation->lieu();
					if ($lieu!='') {
						$lieu = page('lieux')->children()->find($lieu);
						$lieuName = $lieu->title();
					} else {
						$lieuName = $manifestation->locationName();
					}
					?>
					<p class="emplacement">lieu : <?php echo $lieuName ?></p>
				</div>
			</div>
		<?php
		endforeach;
		endif; ?>
    <?php endif ?>
  </li>
  <?php endforeach ?>
</ul>
