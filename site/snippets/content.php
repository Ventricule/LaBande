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

		foreach($p->children() as $entry):
			snippet('item', array('entry' => $entry));
			$first = false;
		endforeach;
		?>
	
		<?php snippet('footer-section', array('section' => $p)) ?>
	
	<?php
	endforeach;
	?>
</ul>