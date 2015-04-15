<?php
header('Content-type: application/json; charset=utf-8');

$data = $pages->find('manifestations')->children()->visible()->flip()->paginate(10);
$json = array();

foreach($data as $article) {

  $json[] = array(
    'type'   => "Feature",
    'geometry' => array(
      'type' => 'Point',
      'coordinates' => array_reverse( explode( ',', (string)$article->location() ) )
    ),
    'properties' => array(
      "title" => (string)$article->title(),
      "description" => (string)$article->text(),
      "marker-color" => "#fc4353",
      "marker-size" => "large",
      "marker-symbol" => "monument"
    )
  );

}

echo json_encode($json);

?>