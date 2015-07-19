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
			<?php $caption = $images->caption();
			if ($caption != ""): ?>
				<figcaption class="mobile"><?php echo $caption ?></figcaption>
			<?php endif ?>
			<div class="nav icon-search mobile fullscreen" style="color:<?php echo $entry->parent()->color() ?>"></div>
		</figure>
	<?php else : ?>
		<hr>
	<?php endif ?>
<?php else: ?>
		
<?php endif ?>