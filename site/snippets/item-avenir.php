<h3 class="entry-title" ><a href="<?php echo $entry->url() ?>"><?php echo $entry->title()->html() ?></a></h3>


<ul>
  <?php foreach( page('manifestations')->children()->visible()->limit( $entry->number()->int() ) as $subpage): ?>
  <li>
    <a href="<?php echo $subpage->url() ?>">
      <?php echo html($subpage->title()) ?>
    </a>
  </li>
  <?php endforeach ?>
</ul>

<h5>
<?php 
if ((string)$entry->begin_date()):
	echo $entry->date('d.m.y', 'begin_date');
endif;
if ((string)$entry->end_date()):
	echo ' > ' . $entry->date('d.m.y', 'end_date');
endif; ?>
</h5>