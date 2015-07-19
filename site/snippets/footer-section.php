<li class="item section-footer" style="background:<?php echo $section->color() ?>" data-uid="footer-<?php echo $section->uid() ?>" data-parent-uid="<?php echo $section->uid() ?>">
  <h3><span class="icon-back-in-time"></span></h3>
	<?php
		foreach( $section->children() as $item ) {
			echo $item->uri();
			echo '<br>';
		}
	?>
</li>