<ul class="rubrique cf">
<?php $first=true; 
	foreach($pages->children() as $entry): ?>
		<li id="<?php echo $entry->hash() ?>" class="item" style="background-color:<?php echo $entry->parent()->color() ?>">
			<?php if($image = $entry->images()->sortBy('sort', 'asc')->first()): ?>
				<figure class="head">
					<a href="<?php echo $entry->url() ?>">
						<img src="<?php echo $image->url() ?>" alt="<?php echo $entry->title()->html() ?>" >
					</a>
				</figure>
			<?php elseif(!$first): ?>
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