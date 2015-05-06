<?php snippet('header') ?>

  <main class="main" role="main">

    <div class="text">
      <h1><?php echo $page->title()->html() ?></h1>
      <?php echo kirbytext($page->text()) ?>
    </div>

  </main>

<?php snippet('footer') ?>