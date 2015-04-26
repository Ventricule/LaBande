<h3 class="entry-title" ><a href="<?php echo $entry->url() ?>"><?php echo $entry->title()->html() ?></a></h3>

<?php snippet('part-coordonnees', array('entry' => $entry)) ?>

<p><?php echo $entry->text() ?></p>

<?php snippet('part-manifestations', array('entry' => $entry)) ?>