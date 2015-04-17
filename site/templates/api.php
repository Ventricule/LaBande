<?php
header('Content-type: application/json; charset=utf-8');

$data = $pages->find('manifestations')->children()->visible()->flip()->paginate(10);
$json = array();

foreach($data as $article) {
  
  $coordinates;
  $lieu = (string)$article->lieu();
  $emplacement = (string)$article->location();
  if ( $lieu ) {
    $coordinates = (string)$pages->index()->findBy('uid', $lieu)->location();
  } else {
    $coordinates = $emplacement;
  }

  $json[] = array(
    'type'   => "Feature",
    'geometry' => array(
      'type' => 'Point',
      'coordinates' => array_reverse( explode( ',', $coordinates ) )
    ),
    'properties' => array(
      "title" => (string)$article->title(),
      "description" => (string)$article->text(),
      "lieu-uid" => $lieu,
      "marker-color" => "#fc4353",
      "marker-size" => "small",
    )
  );

}

echo json_encode($json);

?>