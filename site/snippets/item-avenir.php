<h3 class="entry-title" ><a href="<?php echo $entry->url() ?>"><?php echo $entry->title()->html() ?></a></h3>


<ul class="avenir">
	<?php foreach( page('manifestations')->children()->visible()->filterBy('date', '>', time())->sortBy('date', 'asc')->limit( $entry->number()->int() ) as $subpage): ?>
		<li class='item-avenir'>
			<h4><?php echo html($subpage->title()) ?></h4>

			<div class="meta-avenir entry-date icon-calendar icon-medium"><?php echo $subpage->date('d.m.Y') ?></spdivan> 

<!--			<?php if($image = $subpage->images()->sortBy('sort', 'asc')->first()): ?>
				<figure class="head preview">
					<img src="<?php echo $image->url() ?>" alt="<?php echo $subpage->title()->html() ?>" >
				</figure>
			<?php endif ?>
-->
			<?php 
				$lieu = $subpage->lieu();
				$price = (string)$subpage->price();
				$lieuName = $adress = $transport = '';
				if ( (string)$lieu ) {
					$lieu = page('lieux')->children()->find($lieu);
					$lieuName = (string)$lieu->title();
					$adress = (string)$lieu->adress();
					$transport = (string)$lieu->transport();
				} else {
					$adress = (string)$subpage->locationName();
					$transport = (string)$subpage->transport();
				}
			?>
			<?php if($lieuName){ ?><div class="icon-home"><?php echo $lieuName ?></div><?php } ?>
			<!--	<?php if($adress){ ?><div class="icon-map"><?php echo $adress ?></span><br><?php } ?> -->
			<?php if($transport){ ?><div class="icon-bus"><?php echo $transport ?></div><?php } ?>
			<?php if($price){ ?><div class="icon-ticket"><?php echo $price ?></div><?php } ?>
		</li>
	<?php endforeach ?>
</ul>
