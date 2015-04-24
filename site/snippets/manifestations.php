<h2>Manifestations</h2>

<ul class="teaser cf">
  <?php foreach($pages->children() as $entry): ?>
  <li>
    <h3 id="<?php echo $entry->hash() ?>" class="item" ><a href="<?php echo $entry->url() ?>"><?php echo $entry->title()->html() ?></a></h3>
    <p><?php echo $entry->text() ?></p>
    <?php if($image = $entry->images()->sortBy('sort', 'asc')->first()): ?>
    <a href="<?php echo $entry->url() ?>">
      <img src="<?php echo $image->url() ?>" alt="<?php echo $entry->title()->html() ?>" >
    </a>
		<?php if ($entry->manifestations()) :
		$manifestations = yaml($entry->manifestations());
		foreach($manifestations as $manifestation):
		?>
			<p class="manifestation"><?php echo page('manifestations')->children()->find($manifestation['manifestation'])->title(); ?></p>
		<?php
		endforeach;
		endif; ?>
    <?php endif ?>
  </li>
  <?php endforeach ?>
</ul>
