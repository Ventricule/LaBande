
<nav  role="navigation">
	<div id="bande1" class="swiper-container">
		<ul id="menu" class="swiper-wrapper">
			<?php foreach($pages->visible() as $p): ?>
			<li class="swiper-slide" data-hash="<?php echo $p->hash() ?>" data-uid="<?php echo $p->uid() ?>" data-id="<?php echo $p->id() ?>" style="background-color:<?php echo $p->color() ?>; border-left-color:<?php echo $p->color() ?>; ">
				<div class="box">
					<span style="background-color:<?php echo $p->color() ?>" ><?php echo $p->title()->html() ?></span>
				</div>
			</li>
			<?php endforeach ?>
		</ul>
	</div>

	<div id="bande2" class="swiper-container2">
		<ul id="submenu" class="swiper-wrapper">
			<?php foreach($pages->visible() as $p): ?>
				<?php if($p->hasVisibleChildren()): ?>
					<?php foreach($p->children()->visible() as $p): ?>
					<li class="swiper-slide" data-hash="<?php echo $p->hash() ?>" data-p-hash="<?php echo $p->parent()->hash() ?>" data-uid="<?php echo $p->uid() ?>" data-parent-uid="<?php echo $p->parent()->uid() ?>" data-id="<?php echo $p->parent() ?>" data-num="<?php echo $p->num() ?>">
						<div class="box">
							<span><?php echo $p->title()->html() ?></span>
						</div>
					</li>
					<?php endforeach ?>
				<?php endif ?>
			<?php endforeach ?>
		</ul>
	</div>
	<div id="prev"></div>
</nav> 