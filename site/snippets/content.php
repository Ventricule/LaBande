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
				
				<?php snippet('part-slider', array('entry'=>$entry)) ?>
				
				<?php snippet('part-titre', array('entry'=>$entry)) ?>
				
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