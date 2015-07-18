<ul class="rubrique cf">
<?php $first = true; 
	foreach($pages->visible() as $p): 

		if($first):?>
			<li class="item" style="background:<?php echo $p->color() ?>" data-uid="titre-<?php echo $p->uid() ?>" data-parent-uid="<?php echo $p->uid() ?>">
				<header class="header cf" role="banner">
					<img id="logo" src="<?php echo url('assets/images/labande-logo.svg') ?>" alt="<?php echo $site->title()->html() ?>" />
				</header>
			</li>
		<?php else :?>
			<?php snippet('header-section', array('section' => $p)) ?>
		<?php endif;

		foreach($p->children() as $entry): ?>
			<li id="<?php echo $entry->hash() ?>" data-uid="<?php echo $entry->uid() ?>" data-parent-uid="<?php echo $entry->parent()->uid() ?>" class="item" style="background-color:<?php echo $entry->parent()->color() ?>">
				<?php if($images = $entry->images()->sortBy('sort', 'asc')): ?>
					<?php if($images->count() > 1): ?>
						<section class="gallery " data-slide-uid="<?php echo $entry->uid() ?>" style="color:<?php echo $entry->parent()->color() ?>">
							<div class="swiper-wrapper">
								<?php foreach($images as $image): ?>
									<figure class="swiper-slide" data-index="">
										<img src="<?php echo thumb($image, array('width' => 500, 'crop' => false))->url(); ?>" data-src="<?php echo thumb($image, array('width' => 1600, 'crop' => false))->url(); ?>" alt="<?php echo $entry->title()->html() ?>" >
										<?php $caption = $image->caption();
										if ($caption != ""): ?>
											<figcaption class="mobile"><?php echo $caption ?></figcaption>
										<?php endif ?>
									</figure>
								<?php endforeach ?>
							</div>
							<div class="nav pagination">
								<span class="number">1</span><span class="slash">/</span><span class="total"></span>
							</div>
							<div class="nav nomobile prev-slide"><div class="icon-left-open-big"></div></div>
							<div class="nav nomobile next-slide"><div class="icon-right-open-big"></div></div>
							<div class="nav icon-search mobile fullscreen"></div>
						</section>
					<?php elseif($images->count() == 1): ?>
						<figure>
							<img src="<?php echo $images->first()->url() ?>" alt="<?php echo $entry->title()->html() ?>" >
							<?php $caption = $image->caption();
							if ($caption != ""): ?>
								<figcaption class="mobile"><?php echo $caption ?></figcaption>
							<?php endif ?>
							<div class="nav icon-search mobile fullscreen" style="color:<?php echo $entry->parent()->color() ?>"></div>
						</figure>
					<?php elseif(!$first): ?>
						<hr>
					<?php endif ?>
				<?php endif ?>
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
		<?php $first = false;
		endforeach;
		?>
	
		<?php snippet('footer-section', array('section' => $p)) ?>
	
	<?php
	endforeach;
	?>
</ul>