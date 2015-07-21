
<nav role="navigation">
	<div id="bande1" class="swiper-container">
		<ul id="menu" class="swiper-wrapper">
			<li id="search-slide" class="swiper-slide search" data-uid="search-slide">
				<span class="icon-search"></span>
			</li>
			<?php foreach($pages->visible() as $p): ?>
			<li class="swiper-slide" data-hash="<?php echo $p->hash() ?>" data-uid="<?php echo $p->uid() ?>" data-id="<?php echo $p->id() ?>" style="background-color:<?php echo $p->color() ?>; border-left-color:<?php echo $p->color() ?>; ">
				<div class="box">
					<span style="background-color:<?php echo $p->color() ?>" ><?php echo $p->title()->html() ?></span>
				</div>
			</li>
			<?php endforeach ?>
		</ul>
	</div>
</nav> 