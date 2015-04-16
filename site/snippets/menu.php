
<nav  role="navigation">
	<div id="bande1" class="swiper-container">

		<ul id="menu" class="swiper-wrapper">
			<?php foreach($pages->visible() as $p): ?>
			<li class="swiper-slide" data-hash="<?php echo $p->hash() ?>" data-id="<?php echo $p->id() ?>">
				<?php echo $p->title()->html() ?>
			</li>
			<?php endforeach ?>
		</ul>
	</div>

	<div id="bande2" class="swiper-container2">
		<ul id="submenu" class="swiper-wrapper">
			<?php foreach($pages->visible() as $p): ?>
				<?php if($p->hasVisibleChildren()): ?>
					<?php foreach($p->children()->visible() as $p): ?>
					<li class="swiper-slide" data-hash="<?php echo $p->hash() ?>" data-parent="<?php echo $p->parent() ?>" data-num="<?php echo $p->num() ?>">
						<?php echo $p->title()->html() ?>
					</li>
					<?php endforeach ?>
				<?php endif ?>
			<?php endforeach ?>
		</ul>
	</div>
</nav>
<div id="shadow"></div>