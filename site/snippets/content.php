<ul class="rubrique cf">
<?php $first=true; 
	foreach($pages->children() as $entry): ?>
		<li id="<?php echo $entry->hash() ?>" data-uid="<?php echo $entry->uid() ?>" data-parent-uid="<?php echo $entry->uid() ?>" class="item" style="background-color:<?php echo $entry->parent()->color() ?>">
			<?php if($images = $entry->images()->sortBy('sort', 'asc')): ?>
				<?php if($images->count() > 1): ?>
					<section class="gallery " data-slide-uid="<?php echo $entry->uid() ?>" style="color:<?php echo $entry->parent()->color() ?>">
						<div class="swiper-wrapper">
							<?php foreach($images as $image): ?>
								<figure class="swiper-slide" data-index="">
									<img src="<?php echo $image->url() ?>" alt="<?php echo $entry->title()->html() ?>" >
									<?php if ($caption = $image->caption()): ?>
										<figcaption><?php echo $caption ?></figcaption>
									<?php endif ?>
								</figure>
							<?php endforeach ?>
						</div>
						<div class="nav pagination">
							<span class="number">1</span><span class="slash">/</span><span class="total"></span>
						</div>
						<div class="nav icon-left-open-big prev-slide"></div>
						<div class="nav icon-right-open-big next-slide"></div>
						<div class="nav icon-search"></div>
					</section>
				<?php elseif($images->count() == 1): ?>
					<figure>
						<img src="<?php echo $images->first()->url() ?>" alt="<?php echo $entry->title()->html() ?>" >
					</figure>
				<?php endif ?>
			<?php elseif(!$images): ?>
				<hr>
			<?php endif ?>
			<div class="entry-content">
				<?php
				if ($entry->intendedTemplate() == 'lieu'): 
					snippet('item-lieu', array('entry' => $entry));
				elseif ($entry->intendedTemplate() == 'parcours'): 
					snippet('item-parcours', array('entry' => $entry));
				elseif ($entry->intendedTemplate() == 'avenir'): 
					snippet('item-avenir', array('entry' => $entry));
				elseif ($entry->intendedTemplate() == 'manifestation'): 
					snippet('item-manifestation', array('entry' => $entry));
				else: 
					snippet('item-default', array('entry' => $entry));
				endif;
				?>
			</div>
		</li>
		<?php $first=false;
	endforeach ?>
</ul>