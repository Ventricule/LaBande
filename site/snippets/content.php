<ul class="rubrique cf">
<?php $first = true; 
	foreach($pages->visible() as $p): 

		if($first):?>
			<li class="item" style="background:<?php echo $p->color() ?>" data-uid="titre-<?php echo $p->uid() ?>" data-parent-uid="<?php echo $p->uid() ?>">
				<header class="header cf" role="banner">
					<img id="logo" src="<?php echo url('assets/images/labande-logo.svg') ?>" alt="<?php echo $site->title()->html() ?>" />
				</header>

				<div id="scrollMe">
					<img id="ver" src="<?php echo url('assets/images/ver2.png') ?>" alt="scroll me" />
				</div>
				<?php $first = false; ?>
			</li>
		<?php else :?>
			<?php snippet('header-section', array('section' => $p)) ?>
		<?php endif;
		
		if ( $p->archivable()->bool() ) :
			$items = $p->children()->visible()->filter(function($entry) {
				$last = max((int)$entry->date('Ymd'),(int)$entry->date('Ymd', 'end_date'), (int)$entry->date('Ymd', 'begin_date'));
				return $last > date('Ymd');
			});
		else:
			$items = $p->children()->visible();
		endif;

		foreach($items as $entry):
			snippet('item', array('entry' => $entry));
		endforeach;


		if ( $p->archivable()->bool() ) :
			snippet('footer-section', array('section' => $p)) ;
		endif;

	endforeach;
	?>
</ul>