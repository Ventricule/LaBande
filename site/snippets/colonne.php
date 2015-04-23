<?php foreach($pages->visible() as $p): ?>
	<div class="rubrique-container" data-hash="<?php echo $p->hash() ?>" data-id="<?php echo $p->id() ?>"  > <!-- style="background-color:<?php echo $p->color() ?>" -->
		<h2><?php echo $p->title()->html() ?></h2>
		<ul>
			<?php foreach($p->children() as $child): ?>
				<li>
					<h3 id="<?php echo $child->hash() ?>" class="item" ><a href="<?php echo $child->url() ?>"><?php echo $child->title()->html() ?></a></h3>
					<p><?php echo $child->text()->excerpt(80) ?> <a href="<?php echo $child->url() ?>">read&nbsp;more&nbsp;→</a></p>
					<?php if($image = $child->images()->sortBy('sort', 'asc')->first()): ?>
					<a href="<?php echo $child->url() ?>">
						<img src="<?php echo $image->url() ?>" alt="<?php echo $child->title()->html() ?>" >
					</a>
					<?php endif ?>
				</li>
			<?php endforeach ?>
		</ul>
	</div>
<?php endforeach ?>